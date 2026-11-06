#!/usr/bin/env node
/*
 * Assistant du site : index, fenêtre et balises, écrits dans out/ APRÈS next build (dernier maillon de npm run build).
 * Commande : node scripts/assistant/construire-assistant.mjs   (n'agit que si MKZ_ASSISTANT=1)
 * Runtime : Node >= 14 (modules ES natifs). Dépendances : aucune.
 *
 * Sans MKZ_ASSISTANT=1 (build de production de GitHub Actions) : n'écrit rien, out/ reste identique à l'octet.
 * Avec MKZ_ASSISTANT=1 (préproduction d'abord), pour chaque langue (français, puis anglais depuis le 06/11/2026) :
 *   1. lit les pages de la langue dans le HTML servi (extraire-pages.mjs) et construit son index
 *      (out/_assistant/index.json pour le français, index-en.json pour l'anglais) avec construire-index-assistant.mjs
 *      (copie du skill assistant-site-statique), qui refuse d'écrire sur une quinzaine de motifs (fiche trop grosse,
 *      palier de prix, interdit dans un fait, règle qui ne vise aucune page...) ;
 *   2. copie la fenêtre dans out/assistant/ (script du skill, feuille du skill suivie de l'habillage MKZ), nom versionné
 *      par empreinte pour qu'un changement ne reste pas en cache ; un seul script pour les deux langues, ses textes
 *      suivent data-langue ;
 *   3. pose la feuille avant </head> et la balise de la langue avant </body> de chaque page dont <html lang> est la
 *      langue (les pages anglaises sont sous /en/), une seule fois par page, et s'arrête si une page n'a pas exactement
 *      une de chaque, ou si une langue a moins de pages que prévu.
 * L'index n'est jamais servi au public : functions/_assistant/[[chemin]].js répond 404 sur /_assistant/*.
 * La route choisit l'index par ?langue=en (functions/api/chat.js) : la balise anglaise porte data-api="/api/chat?langue=en".
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { extrairePages } from "./extraire-pages.mjs";
import { construireIndex, baliseFenetre, dateLocale } from "./construire-index-assistant.mjs";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(ICI, "..", "..");
const OUT = path.join(RACINE, "out");
const SOURCES = path.join(RACINE, "assistant");

const LANGUES = [
  { langue: "fr", config: "assistant.config.json", index: "index.json", pagesMin: 40 },
  { langue: "en", config: "assistant.en.config.json", index: "index-en.json", pagesMin: 15 },
];

if (process.env.MKZ_ASSISTANT !== "1") {
  console.log("assistant : non ouvert sur ce build (MKZ_ASSISTANT absent), rien écrit dans out/");
  process.exit(0);
}

function arreter(message) {
  console.error("ERREUR assistant : " + message);
  process.exit(1);
}

if (!fs.existsSync(path.join(OUT, "index.html"))) arreter("out/index.html absent : lancer next build d'abord");

// 2. Fenêtre (commune aux deux langues)
const empreinte = (t) => crypto.createHash("sha256").update(t).digest("hex").slice(0, 10);
const js = fs.readFileSync(path.join(SOURCES, "assistant-fenetre.js"), "utf8");
const css = fs.readFileSync(path.join(SOURCES, "assistant-fenetre.css"), "utf8") + "\n" + fs.readFileSync(path.join(SOURCES, "assistant-mkz.css"), "utf8");
const lien = `<link rel="stylesheet" href="/assistant/fenetre.css?v=${empreinte(css)}"/>`;
const srcJs = `/assistant/fenetre.js?v=${empreinte(js)}`;

// 1. Index, un par langue, tous construits avant toute écriture dans les pages
const balises = {};
const ecrits = [];
for (const L of LANGUES) {
  const config = JSON.parse(fs.readFileSync(path.join(SOURCES, L.config), "utf8"));
  if ((config.langue || "fr") !== L.langue) arreter(`${L.config} : langue « ${config.langue || "fr"} », « ${L.langue} » attendue`);
  const pages = extrairePages(OUT, L.langue);
  const r = construireIndex(pages, config, dateLocale());
  for (const a of r.avertissements) console.log(`attention assistant (${L.langue}) : ${a}`);
  if (r.erreurs.length) {
    for (const e of r.erreurs) console.error(`ERREUR assistant (${L.langue}) : ${e}`);
    arreter(`${r.erreurs.length} erreur(s) sur l'index ${L.langue}, rien écrit`);
  }
  ecrits.push({ L, brut: JSON.stringify(r.index), stats: r.stats });
  balises[L.langue] = baliseFenetre(r.config, srcJs);
}
fs.mkdirSync(path.join(OUT, "_assistant"), { recursive: true });
for (const { L, brut, stats: s } of ecrits) {
  fs.writeFileSync(path.join(OUT, "_assistant", L.index), brut);
  console.log(`assistant (${L.langue}) : ${L.index} écrit (${(brut.length / 1024).toFixed(0)} Ko), ${s.pages} pages, ${s.blocs} blocs, détail de ${s.details} pages`);
  console.log(`  préfixe en cache : ${s.prefixeCaracteres} caractères, environ ${s.jetonsPrefixe} jetons ; pire requête estimée ${s.jetonsPire} jetons (palier ${s.palier})`);
}
fs.mkdirSync(path.join(OUT, "assistant"), { recursive: true });
fs.writeFileSync(path.join(OUT, "assistant", "fenetre.js"), js);
fs.writeFileSync(path.join(OUT, "assistant", "fenetre.css"), css);

// 3. Balises dans les pages, selon <html lang>
const fichiers = [];
(function parcourir(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    const dossier = e.isDirectory() || (e.isSymbolicLink() && fs.lstatSync(p).isDirectory());
    if (dossier) { if (!(d === OUT && e.name.startsWith("_"))) parcourir(p); }
    else if (e.name.endsWith(".html")) fichiers.push(p);
  }
})(OUT);
const posees = { fr: 0, en: 0 };
for (const f of fichiers) {
  const html = fs.readFileSync(f, "utf8");
  const rel = path.relative(OUT, f).split(path.sep).join("/");
  if (/data-assistant/.test(html)) arreter(`${rel} porte déjà la balise : build relancé sur un out/ déjà traité`);
  const m = html.match(/<html[^>]*\blang="([a-z]{2})"/);
  const langue = m ? m[1] : "";
  if (!balises[langue]) continue;
  const anglaise = rel === "en/index.html" || rel.startsWith("en/");
  if ((langue === "en") !== anglaise) arreter(`${rel} : <html lang="${langue}"> hors de son dossier de langue`);
  const tetes = html.split("</head>").length - 1;
  const corps = html.split("</body>").length - 1;
  if (tetes !== 1 || corps !== 1) arreter(`${rel} : ${tetes} </head> et ${corps} </body>, une seule de chaque attendue`);
  fs.writeFileSync(f, html.replace("</head>", lien + "</head>").replace("</body>", balises[langue] + "</body>"));
  posees[langue]++;
}
for (const L of LANGUES) if (posees[L.langue] < L.pagesMin) arreter(`fenêtre ${L.langue} posée sur ${posees[L.langue]} pages seulement (${L.pagesMin} au moins attendues)`);
console.log(`assistant : fenêtre posée sur ${posees.fr} pages françaises et ${posees.en} pages anglaises`);
