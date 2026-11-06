#!/usr/bin/env node
/*
 * Construit l'index de l'assistant d'un site statique : <dist>/_assistant/index.json, lu par assistant-worker.mjs.
 * Commande : node construire-index-assistant.mjs --pages <llms-full.txt | pages.json> --config <assistant.config.json>
 *            --sortie <dossier dist> [--date AAAA-MM-JJ] [--balise <src du script de la fenêtre>]
 * Runtime : Node >= 14 (modules ES natifs). Dépendances : aucune.
 *
 * Entrée : le llms-full.txt que le build du site produit déjà (pages séparées par une ligne « --- », chaque page ouverte
 * par « # Titre » puis « URL : ... »), ou un pages.json [{ url, titre, texte, fiche?, detail?, noms? }].
 * Les règles de la config (premier motif d'adresse qui correspond) disent ce que chaque page apporte :
 *   fiche  : "integral" (texte entier dans la fiche), ["Section", ...] (sections « ## » dont le titre commence ainsi),
 *            ou { "texte": "..." } (pages.json seulement) ; absent : la page n'est dans la fiche que par son titre et son adresse ;
 *   detail : mêmes formes, texte joint à la question quand la conversation vise la page ;
 *   nom    : expression appliquée au titre, le groupe 1 donne le nom cherché dans les questions (« ^Chauffagiste à (.+)$ »).
 * Le texte entier de chaque page alimente l'index BM25 (blocs d'environ 1 200 caractères, sections ignorées exclues).
 *
 * Refuse d'écrire (code 1) : fiche au-delà de son plafond, pire requête estimée au-delà du palier de prix, interdit dans
 * un fait, tiret long dans les consignes ou les faits, règle qui ne vise aucune page, section demandée absente de toutes
 * les pages d'une règle, gabarit non rempli, adresse en double, index trop maigre, paramètre d'échantillonnage dans la
 * config du modèle. Les estimations de jetons utilisent caracteresParJeton (2,2 mesurés sur un site français chiffré,
 * le 26/10/2026 : la première fiche de 270 Ko pesait 122 930 jetons, pas les 71 000 d'une estimation à 3,8).
 * Le ratio se remesure par la recette en ligne (questionner-assistant.mjs), jamais à l'estime.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normaliser, termes, VIDES } from "../../functions/api/_assistant.mjs";

const TAILLE_BLOC = 1200;
const TIRETS = new RegExp("[" + String.fromCharCode(0x2014) + String.fromCharCode(0x2013) + "]");

// Intitulés de la fiche, selon config.langue (« fr » par défaut). Ajoutés le 06/11/2026 pour l'assistant anglais de
// MKZ ; la fiche française est restée identique au caractère près.
const LIBELLES_FICHE = {
  fr: {
    regles: "Règles :",
    donnees: (site, date) => `# Données du site ${site} (générées le ${date})`,
    faits: "## Faits",
    plan: "## Plan du site (adresses citables)",
    contenu: "## Contenu des pages",
    detail: (t, u) => `Détail de la page ${t} (${u})`,
    repli: "Je préfère ne pas répondre précisément à cette question ici, pour ne pas vous donner une information inexacte. {sources}{prenom} peut vous répondre directement au {telephone}.",
  },
  en: {
    regles: "Rules:",
    donnees: (site, date) => `# Data from the ${site} website (generated on ${date})`,
    faits: "## Facts",
    plan: "## Site map (citable addresses)",
    contenu: "## Page content",
    detail: (t, u) => `Detail of the page ${t} (${u})`,
    repli: "I would rather not answer this precisely here, so as not to give you inaccurate information. {sources}{prenom} can answer you directly on {telephone}.",
  },
};

const DEFAUTS = {
  modele: { id: "claude-haiku-5-5", versionApi: "2026-10-21", effort: "low", maxJetons: 1500 },
  reglages: { passages: 4, caracteresPassages: 6000, detailsMax: 3, historiqueMax: 10, questionMax: 600, reponseMax: 2500, dureeMinMs: 3000, pagesBlocGaranti: "" },
  caracteresParJeton: 2.2,
  palierJetons: 100000,
  plafondFicheCaracteres: 163840,
  blocsMin: 10,
};

// Date du poste, jamais toISOString (date UTC : un build entre minuit et 2 h glisserait d'un jour).
export function dateLocale(d) {
  const x = d || new Date();
  const z = (n) => String(n).padStart(2, "0");
  return `${x.getFullYear()}-${z(x.getMonth() + 1)}-${z(x.getDate())}`;
}

export function texteSimple(t) {
  return String(t == null ? "" : t)
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|__/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

// ---------- Lecture des pages
function lireLlmsFull(texte, origine, avertir) {
  const morceaux = String(texte).replace(/\r\n/g, "\n").split(/\n-{3,}[ \t]*\n/);
  const pages = [];
  const hote = origine ? new URL(origine).host : "";
  for (const m of morceaux) {
    const lignes = m.replace(/^\n+/, "").split("\n");
    const iUrl = lignes.findIndex((l, i) => i > 0 && i <= 3 && /^(URL|Adresse|Source)\s*:\s*\S+/i.test(l));
    if (!/^# /.test(lignes[0] || "") || iUrl < 0) {
      // Morceau sans en-tête de page : préambule du fichier, ou trait horizontal à l'intérieur d'une page (rattaché à elle).
      if (pages.length && m.trim()) pages[pages.length - 1].texte += "\n\n" + m.trim();
      continue;
    }
    const brute = lignes[iUrl].replace(/^[^:]+:\s*/, "").trim();
    let u;
    try { u = new URL(brute, origine || "https://exemple.invalid"); } catch (e) { avertir(`adresse illisible ignorée : ${brute}`); continue; }
    if (hote && /^https?:/i.test(brute) && u.host !== hote) avertir(`page ${brute} : hôte différent de la config (${hote}), chemin gardé`);
    let chemin = decodeURIComponent(u.pathname);
    if (chemin.length > 1) chemin = chemin.replace(/\/+$/, "");
    const corps = lignes.filter((l, i) => i !== 0 && i !== iUrl).join("\n").trim();
    pages.push({ url: chemin, titre: lignes[0].slice(2).trim(), texte: corps });
  }
  return pages;
}

export function lirePages(contenu, nomFichier, origine, avertir) {
  const av = avertir || (() => {});
  if (/\.json$/i.test(nomFichier || "")) {
    const j = JSON.parse(contenu);
    if (!Array.isArray(j)) throw new Error("pages.json : un tableau de pages est attendu");
    return j.map((p) => Object.assign({}, p, { texte: String(p.texte || "").replace(/\r\n/g, "\n").replace(/^# .*\n/, "") }));
  }
  return lireLlmsFull(contenu, origine, av);
}

// ---------- Sections et contenu
function sectionsDe(texte) {
  const out = [{ titre: "", lignes: [] }];
  for (const l of String(texte).split("\n")) {
    if (/^## /.test(l)) out.push({ titre: l.slice(3).trim(), lignes: [] });
    else out[out.length - 1].lignes.push(l);
  }
  return out.map((s) => ({ titre: s.titre, texte: s.lignes.join("\n").trim() }));
}

function estIgnoree(titre, ignorees) {
  const n = normaliser(titre);
  return ignorees.some((x) => n === x || n === x + "s");
}

// Contenu d'une page selon une spécification (fiche ou détail) : { texte, manquantes }.
function contenu(page, spec, ignorees) {
  if (!spec) return { texte: "", manquantes: [] };
  if (typeof spec === "object" && !Array.isArray(spec) && typeof spec.texte === "string") return { texte: spec.texte.trim(), manquantes: [] };
  const secs = sectionsDe(page.texte);
  if (spec === "integral") {
    return { texte: secs.filter((s) => !s.titre || !estIgnoree(s.titre, ignorees)).map((s) => (s.titre ? "## " + s.titre + "\n" : "") + s.texte).join("\n\n").trim(), manquantes: [] };
  }
  if (!Array.isArray(spec)) return { texte: "", manquantes: [String(spec)] };
  const morceaux = [];
  const manquantes = [];
  for (const nom of spec) {
    const n = normaliser(nom);
    const trouvees = secs.filter((s) => s.titre && normaliser(s.titre).startsWith(n));
    if (!trouvees.length) manquantes.push(nom);
    for (const s of trouvees) morceaux.push("## " + s.titre + "\n" + s.texte);
  }
  return { texte: morceaux.join("\n\n").trim(), manquantes };
}

// Intertitres de page descendus de deux niveaux sous « ### Titre (adresse) ».
function abaisser(t) {
  return String(t).replace(/^(#{1,4}) /gm, (m, h) => "#".repeat(Math.min(6, h.length + 2)) + " ");
}

// Une ligne de 40 caractères ou plus déjà écrite plus haut (texte de gabarit, avis repris d'une page à l'autre) n'est
// gardée qu'une fois.
function dedoublonner(texte, vues) {
  return texte.split("\n").filter((l) => {
    const k = l.trim();
    if (k.length < 40 || /^#{1,6} /.test(k)) return true;
    if (vues.has(k)) return false;
    vues.add(k);
    return true;
  }).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// ---------- Index BM25
function decouper(pages, ignorees) {
  const lignesDe = pages.map((p) => String(p.texte).split("\n"));
  const compte = new Map();
  for (const ls of lignesDe) {
    const vues = new Set();
    for (const brute of ls) { const l = brute.trim(); if (!l || vues.has(l)) continue; vues.add(l); compte.set(l, (compte.get(l) || 0) + 1); }
  }
  const emises = new Set();
  const blocs = [];
  pages.forEach((p, pi) => {
    let section = "";
    let tampon = [];
    let taille = 0;
    let ignorer = false;
    const vider = (reporter) => {
      // Un intertitre (### question de FAQ) resté seul en fin de bloc passe au bloc suivant, avec sa réponse.
      let report = null;
      if (reporter && tampon.length && /^#{3,4} /.test(tampon[tampon.length - 1])) report = tampon.pop();
      const x = tampon.join("\n").replace(/\n{3,}/g, "\n\n").trim();
      if (x.length >= 60) blocs.push({ p: pi, s: section, x });
      tampon = report ? [report] : [];
      taille = report ? report.length : 0;
    };
    for (const brute of lignesDe[pi]) {
      const l = brute.trim();
      // Listes de références et de liens : du bruit pour la recherche (mesuré sur le prototype : quatre blocs « Sources »
      // sur six extraits pour une question de prix).
      if (/^## /.test(l)) { vider(false); section = l.slice(3).trim(); ignorer = estIgnoree(section, ignorees); continue; }
      if (ignorer) continue;
      if (!l) { if (tampon.length && tampon[tampon.length - 1] !== "") tampon.push(""); continue; }
      // Ligne présente sur trois pages ou plus (texte de gabarit) : gardée à sa première apparition seulement.
      if (compte.get(l) >= 3) { if (emises.has(l)) continue; emises.add(l); }
      if (taille + l.length > TAILLE_BLOC && taille > 0) vider(true);
      tampon.push(texteSimple(l));
      taille += l.length + 1;
    }
    vider(false);
  });
  return blocs;
}

function gabarit(t, valeurs, erreurs, ou) {
  const r = String(t || "").replace(/\{(site|prenom|telephone)\}/g, (m, k) => (valeurs[k] != null ? valeurs[k] : m));
  const reste = r.match(/\{[a-z]+\}/gi);
  if (reste && reste.some((x) => x !== "{sources}")) erreurs.push(`${ou} : gabarit non rempli (${reste.filter((x) => x !== "{sources}").join(", ")})`);
  return r;
}

function regexp(s, f, ou, erreurs) {
  try { return new RegExp(s, String(f || "").replace(/[gy]/g, "")); } catch (e) { erreurs.push(`${ou} : expression invalide (${e.message})`); return null; }
}

// ---------- Construction
export function construireIndex(pagesBrutes, configBrute, date) {
  const erreurs = [];
  const avertissements = [];
  const config = Object.assign({}, DEFAUTS, configBrute, {
    modele: Object.assign({}, DEFAUTS.modele, configBrute.modele || {}),
    reglages: Object.assign({}, DEFAUTS.reglages, configBrute.reglages || {}),
  });
  const contact = config.contact || {};
  const valeurs = { site: config.site, prenom: contact.prenom, telephone: contact.telephone };
  if (!config.site) erreurs.push("config : nom du site (site) manquant");
  for (const k of ["temperature", "top_p", "top_k"]) if (k in config.modele) erreurs.push(`config.modele.${k} : refusé par l'API (version 2026-10-21 : erreur 400 quelle que soit la valeur)`);
  if (!config.modele.id) erreurs.push("config.modele.id manquant");
  const ignorees = (config.sectionsIgnorees || []).map((x) => normaliser(x));
  const vides = new Set(VIDES.concat((config.vides || []).map((m) => normaliser(m))));
  // videsRetires : mots vides du français qui portent du sens dans la langue du site (« ai », « j'ai » en français, est
  // « AI » sur un site anglais : sans ce retrait, « AI search » ne cherchait plus que « search », MKZ le 06/11/2026).
  for (const m of config.videsRetires || []) vides.delete(normaliser(m));

  // Pages et règles
  const pages = pagesBrutes.map((p) => Object.assign({}, p, { titre: texteSimple(p.titre), texte: String(p.texte || "") }));
  if (!pages.length) erreurs.push("aucune page lue");
  const vuesUrl = new Set();
  for (const p of pages) {
    if (!/^\//.test(p.url || "")) erreurs.push(`page « ${p.titre} » : adresse ${p.url} (une adresse relative commençant par / est attendue)`);
    if (vuesUrl.has(p.url)) erreurs.push(`adresse en double : ${p.url}`);
    vuesUrl.add(p.url);
  }
  const regles = (config.regles || []).map((r, i) => Object.assign({}, r, { i, re: regexp(r.motif, "", `règle ${i + 1}`, erreurs) }));
  for (const p of pages) {
    const r = regles.find((x) => x.re && x.re.test(p.url));
    p.regle = r ? r.i : -1;
    if (p.fiche === undefined && r) p.fiche = r.fiche;
    if (p.detail === undefined && r) p.detail = r.detail;
    if (!p.noms && r && r.nom) {
      const re = regexp(r.nom, "i", `règle ${r.i + 1} (nom)`, erreurs);
      const m = re ? p.titre.match(re) : null;
      p.noms = m ? [m[1] || m[0]] : [];
      if (!m) avertissements.push(`page ${p.url} : le nom n'a pas pu être tiré du titre « ${p.titre} »`);
    }
  }
  // Une règle qui ne vise aucune page, ou une section qu'aucune de ses pages ne porte, est un trou silencieux dans ce
  // que sait le modèle (le prototype répondait « je n'ai pas les règles » sur deux communes dont la page les publiait).
  for (const r of regles) {
    const visees = pages.filter((p) => p.regle === r.i);
    if (!visees.length) { erreurs.push(`règle ${r.i + 1} (${r.motif}) : aucune page ne correspond`); continue; }
    for (const champ of ["fiche", "detail"]) {
      if (!Array.isArray(r[champ])) continue;
      for (const nom of r[champ]) {
        const sans = visees.filter((p) => contenu(p, [nom], ignorees).manquantes.length);
        if (sans.length === visees.length) erreurs.push(`règle ${r.i + 1} (${r.motif}), ${champ} : section « ${nom} » absente des ${visees.length} pages visées`);
        else if (sans.length) avertissements.push(`règle ${r.i + 1}, ${champ} : section « ${nom} » absente de ${sans.map((p) => p.url).join(", ")}`);
      }
    }
  }

  // Langue du site (« fr » par défaut) : intitulés de la fiche et du message envoyé au modèle, textes de la fenêtre.
  const langue = config.langue || "fr";
  if (!LIBELLES_FICHE[langue]) erreurs.push(`config.langue « ${langue} » inconnue (langues prévues : ${Object.keys(LIBELLES_FICHE).join(", ")})`);
  const LF = LIBELLES_FICHE[langue] || LIBELLES_FICHE.fr;

  // Consignes, faits, repli
  const consignes = gabarit(config.role, valeurs, erreurs, "role") + "\n\n" + LF.regles + "\n" + (config.consignes || []).map((c, i) => `${i + 1}. ${gabarit(c, valeurs, erreurs, "consigne " + (i + 1))}`).join("\n");
  if (!(config.consignes || []).length || !config.role) erreurs.push("config : role et consignes sont obligatoires");
  const faits = (config.faits || []).map((f) => gabarit(f, valeurs, erreurs, "fait"));
  const repli = gabarit(config.repli || LF.repli, valeurs, erreurs, "repli");
  for (const [ou, t] of [["consignes", consignes], ["repli", repli], ...faits.map((f, i) => ["fait " + (i + 1), f])]) if (TIRETS.test(t)) erreurs.push(`${ou} : tiret long ou demi-cadratin (le modèle imite ce qu'il lit)`);

  const interdits = [];
  for (const [i, x] of (config.interdits || []).entries()) {
    const re = regexp(x.motif, x.drapeaux, `interdit ${i + 1}`, erreurs);
    if (re) interdits.push({ s: re.source, f: re.flags, pourquoi: x.pourquoi || "", bloquant: x.bloquant !== false, re });
  }
  const gardes = [];
  for (const [i, g] of (config.gardes || []).entries()) {
    const q = regexp(g.question, g.drapeaux || "i", `garde ${i + 1} (question)`, erreurs);
    const r = regexp(g.reponse, g.drapeaux || "i", `garde ${i + 1} (réponse)`, erreurs);
    if (q && r) gardes.push({ nom: g.nom || "garde " + (i + 1), q: { s: q.source, f: q.flags }, r: { s: r.source, f: r.flags } });
  }
  for (const f of faits) for (const x of interdits) if (x.bloquant && x.re.test(f)) erreurs.push(`fait refusé par l'interdit « ${x.pourquoi || x.s} » : ${f.slice(0, 80)}`);

  // Fiche de connaissances
  const ordre = pages.slice().sort((a, b) => (a.regle < 0 ? 1e9 : a.regle) - (b.regle < 0 ? 1e9 : b.regle));
  const parts = [LF.donnees(config.site, date), "", LF.faits, ...faits.map((f) => "- " + f), "", LF.plan, ...pages.map((p) => `- ${p.titre} (${p.url})`), "", LF.contenu];
  for (const p of ordre) {
    const c = contenu(p, p.fiche, ignorees);
    if (c.texte) parts.push("", `### ${p.titre} (${p.url})`, abaisser(texteSimple(c.texte)));
  }
  const connaissances = dedoublonner(parts.join("\n"), new Set()) + "\n";
  // Chaque occurrence est signalée, pas seulement la première (06/11/2026 : sur MKZ, la première phrase « agence »
  // masquait les autres, et trois endroits du site se disaient encore agence sans un mot du build).
  const AVERTISSEMENTS_MAX = 20;
  for (const x of interdits) {
    if (!x.bloquant) continue;
    const re = new RegExp(x.re.source, x.re.flags.includes("g") ? x.re.flags : x.re.flags + "g");
    const trouves = [...connaissances.matchAll(re)];
    for (const m of trouves.slice(0, AVERTISSEMENTS_MAX)) avertissements.push(`fiche : « ${x.pourquoi || x.s} » sur « ${connaissances.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, " ")} »`);
    if (trouves.length > AVERTISSEMENTS_MAX) avertissements.push(`fiche : « ${x.pourquoi || x.s} » : ${trouves.length - AVERTISSEMENTS_MAX} occurrence(s) de plus`);
  }

  // Détails
  const details = [];
  const proprietaire = new Map();
  for (const p of pages) {
    const noms = [...new Set((p.noms || []).map((n) => normaliser(n)).filter((n) => n.length >= 3))];
    for (const n of noms) { if (proprietaire.has(n) && proprietaire.get(n) !== p.url) avertissements.push(`nom « ${n} » porté par ${proprietaire.get(n)} et ${p.url}`); proprietaire.set(n, p.url); }
    if (!p.detail) continue;
    const c = contenu(p, p.detail, ignorees);
    if (!c.texte) continue;
    details.push({ u: p.url, noms, texte: dedoublonner(LF.detail(p.titre, p.url) + "\n" + abaisser(texteSimple(c.texte)), new Set()) });
  }

  // Index BM25
  const blocs = decouper(pages, ignorees);
  const termesIdx = {};
  let somme = 0;
  blocs.forEach((bl, bi) => {
    const tf = {};
    for (const t of termes(pages[bl.p].titre + " " + bl.s, vides)) tf[t] = (tf[t] || 0) + 2;
    for (const t of termes(bl.x, vides)) tf[t] = (tf[t] || 0) + 1;
    let n = 0;
    for (const [t, f] of Object.entries(tf)) { (termesIdx[t] = termesIdx[t] || []).push(bi, f); n += f; }
    bl.n = n;
    somme += n;
  });
  if (blocs.length < config.blocsMin) erreurs.push(`index trop maigre : ${blocs.length} blocs (minimum ${config.blocsMin})`);
  const synonymes = {};
  for (const [cle, liste] of Object.entries(config.synonymes || {})) {
    const k = termes(cle, vides)[0];
    if (!k) continue;
    const v = [...new Set(liste.map((m) => termes(m, vides)[0]).filter((m) => m && m !== k))];
    if (v.length) synonymes[k] = v;
  }

  // Palier de prix : au-delà de palierJetons de requête (cache compris), le tarif du modèle change de grille (Claude
  // Haiku 5.5 : cinq fois plus cher). La pire requête = préfixe + détails les plus longs + passages + historique plein.
  const R = config.reglages;
  const ratio = config.caracteresParJeton;
  const prefixe = consignes.length + connaissances.length;
  const detailsPlusLongs = details.map((d) => d.texte.length).sort((a, b) => b - a).slice(0, R.detailsMax).reduce((s, n) => s + n, 0);
  const historique = Math.ceil(R.historiqueMax / 2) * R.questionMax + Math.floor(R.historiqueMax / 2) * R.reponseMax;
  const pire = prefixe + detailsPlusLongs + R.caracteresPassages + historique + 1000;
  if (connaissances.length > config.plafondFicheCaracteres) erreurs.push(`fiche de connaissances de ${connaissances.length} caractères, au-delà du plafond de ${config.plafondFicheCaracteres} (environ ${Math.round(connaissances.length / ratio)} jetons à ${ratio} caractères par jeton)`);
  if (pire / ratio > config.palierJetons) erreurs.push(`pire requête estimée à ${Math.round(pire / ratio)} jetons, au-delà du palier de ${config.palierJetons} (${pire} caractères à ${ratio} par jeton)`);

  const index = {
    v: 1,
    genere: date,
    site: config.site,
    modele: { id: config.modele.id, versionApi: config.modele.versionApi, effort: config.modele.effort, maxJetons: config.modele.maxJetons },
    reglages: R,
    consignes,
    connaissances,
    details,
    repli,
    vides: [...vides],
    synonymes,
    interdits: interdits.map((x) => ({ s: x.s, f: x.f, pourquoi: x.pourquoi, bloquant: x.bloquant })),
    gardes,
    pages: pages.map((p) => ({ u: p.url, t: p.titre })),
    blocs,
    termes: termesIdx,
    moy: blocs.length ? Math.round((somme / blocs.length) * 10) / 10 : 0,
  };
  // Posée seulement hors français : l'index d'un site français reste celui d'avant, champ pour champ.
  if (langue !== "fr") index.langue = langue;
  const stats = {
    pages: pages.length, blocs: blocs.length, termes: Object.keys(termesIdx).length, details: details.length,
    ficheCaracteres: connaissances.length, prefixeCaracteres: prefixe, jetonsPrefixe: Math.round(prefixe / ratio), jetonsPire: Math.round(pire / ratio), ratio, palier: config.palierJetons,
  };
  return { index, erreurs, avertissements, stats, config };
}

// Balise de la fenêtre, à poser dans le gabarit du site. data-delai-ms suit le filtre anti-robots du Worker : une
// suggestion cliquée dans les 3 premières secondes attend au lieu d'afficher « Rechargez la page » (vu sur le prototype).
export function baliseFenetre(configBrute, src, surcharge) {
  const config = Object.assign({}, configBrute, { reglages: Object.assign({}, DEFAUTS.reglages, configBrute.reglages || {}) });
  const c = config.contact || {};
  const remplir = (t) => String(t || "").replace(/\{site\}/g, config.site || "").replace(/\{prenom\}/g, c.prenom || "");
  const brute = config.fenetre || {};
  const f = Object.assign({}, brute, { titre: remplir(brute.titre), accueil: remplir(brute.accueil), mention: remplir(brute.mention), consentement: remplir(brute.consentement), rappelSujet: remplir(brute.rappelSujet), suggestions: (brute.suggestions || []).map(remplir) });
  const s = surcharge || {};
  const a = {
    src, defer: true, "data-assistant": true,
    "data-titre": f.titre || "Assistant", "data-accueil": f.accueil || "", "data-mention": f.mention || "", "data-suggestions": JSON.stringify(f.suggestions || []),
    "data-prenom": c.prenom || "", "data-telephone": c.telephone || "", "data-telephone-brut": c.telephoneBrut || "", "data-whatsapp": c.whatsapp || "",
    "data-delai-ms": String(s.delaiMs != null ? s.delaiMs : config.reglages.dureeMinMs + 200),
    "data-question-max": String(config.reglages.questionMax), "data-historique": String(config.reglages.historiqueMax),
    "data-rappel-api": f.rappelApi || "", "data-consentement": f.consentement || "", "data-donnees-personnelles": f.donneesPersonnelles || "",
  };
  // Facultatifs, posés seulement quand la config les porte (balise inchangée pour les sites qui ne s'en servent pas).
  if (f.rappelFormat) a["data-rappel-format"] = f.rappelFormat;
  if (f.rappelCle) a["data-rappel-cle"] = f.rappelCle;
  if (f.rappelSujet) a["data-rappel-sujet"] = f.rappelSujet;
  if (f.barreFinale) a["data-barre-finale"] = "1";
  // Langue des textes de la fenêtre (« fr » par défaut) et adresse de la route quand une langue a son propre index
  // (MKZ, 06/11/2026 : /api/chat?langue=en sur les pages anglaises).
  if (config.langue && config.langue !== "fr") a["data-langue"] = config.langue;
  if (f.api) a["data-api"] = f.api;
  const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return "<script " + Object.entries(a).map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`)).join(" ") + "></script>";
}

export function construireDepuisFichiers(cheminPages, cheminConfig, date) {
  const config = JSON.parse(fs.readFileSync(cheminConfig, "utf8"));
  const lus = [];
  const pages = lirePages(fs.readFileSync(cheminPages, "utf8"), cheminPages, config.adresse, (m) => lus.push(m));
  const r = construireIndex(pages, config, date || dateLocale());
  r.avertissements.unshift(...lus);
  return r;
}

// ---------- Ligne de commande
const estPrincipal = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (estPrincipal) {
  const args = process.argv.slice(2);
  const opt = (n) => { const i = args.indexOf("--" + n); return i >= 0 ? args[i + 1] : undefined; };
  const cheminPages = opt("pages"), cheminConfig = opt("config"), sortie = opt("sortie");
  if (!cheminPages || !cheminConfig || (!sortie && !opt("balise"))) {
    console.error("Usage : node construire-index-assistant.mjs --pages <llms-full.txt | pages.json> --config <assistant.config.json> --sortie <dist> [--date AAAA-MM-JJ] [--balise <src>]");
    process.exit(2);
  }
  const r = construireDepuisFichiers(cheminPages, cheminConfig, opt("date"));
  for (const a of r.avertissements) console.log("attention : " + a);
  if (r.erreurs.length) {
    for (const e of r.erreurs) console.error("ERREUR : " + e);
    console.error(`${r.erreurs.length} erreur(s) : index non écrit.`);
    process.exit(1);
  }
  if (sortie) {
    const dossier = path.join(sortie, "_assistant");
    fs.mkdirSync(dossier, { recursive: true });
    const brut = JSON.stringify(r.index);
    fs.writeFileSync(path.join(dossier, "index.json"), brut);
    const s = r.stats;
    console.log(`index écrit : ${path.join(dossier, "index.json")} (${(brut.length / 1024).toFixed(0)} Ko)`);
    console.log(`  ${s.pages} pages, ${s.blocs} blocs, ${s.termes} termes, détail de ${s.details} pages`);
    console.log(`  préfixe mis en cache (consignes + fiche) : ${s.prefixeCaracteres} caractères, environ ${s.jetonsPrefixe} jetons à ${s.ratio} caractères par jeton (à remesurer en ligne)`);
    console.log(`  pire requête estimée : ${s.jetonsPire} jetons, palier ${s.palier}`);
  }
  if (opt("balise")) console.log(baliseFenetre(r.config, opt("balise")));
}
