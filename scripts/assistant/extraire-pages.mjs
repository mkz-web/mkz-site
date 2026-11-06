#!/usr/bin/env node
/*
 * Pages du site, lues dans le HTML servi (out/), pour l'index de l'assistant : françaises par défaut, anglaises (/en/)
 * avec --langue en (index anglais séparé depuis le 06/11/2026).
 * Commande : node scripts/assistant/extraire-pages.mjs [out] [--langue en] [--sortie pages.json]
 * Runtime : Node >= 14 (modules ES natifs). Dépendances : aucune.
 *
 * Le llms-full.txt du site ne couvre pas toutes les pages (ni /tarifs/, ni /contact/, ni les hubs) et ne suit pas le
 * format « une page par bloc » attendu par le build de l'index : la source fidèle est le HTML rendu, ce que le visiteur
 * lit. Pour chaque page : le <main>, sans la navigation (fil d'Ariane, sommaires), la barre « Résumer avec l'IA », les
 * encadrés d'appel à l'action, les formulaires et les scripts ; intertitres rendus en « ## », listes en « - »,
 * tableaux en lignes « cellule | cellule ». 404 et _not-found écartées ; chaque langue ne lit que ses pages.
 * Articles (/conseils/<rubrique>/<slug>/, /en/insights/<rubrique>/<slug>/) : fiche = chapô, date de mise à jour et
 * encadré « L'essentiel ».
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const NOMMEES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", laquo: "«", raquo: "»", hellip: "…", eacute: "é", egrave: "è", agrave: "à", ccedil: "ç", euro: "€" };
const ESPACES_INSECABLES = new RegExp("[" + String.fromCharCode(0xa0) + String.fromCharCode(0x202f) + "]", "g");

export function decoder(t) {
  return String(t)
    .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => (n.toLowerCase() in NOMMEES ? NOMMEES[n.toLowerCase()] : m));
}

// Retire un élément entier repéré par son ouverture (motif), en comptant les balises du même nom imbriquées.
function retirerElements(html, ouverture, nom) {
  let out = html;
  for (let garde = 0; garde < 500; garde++) {
    const m = ouverture.exec(out);
    ouverture.lastIndex = 0;
    if (!m) break;
    const re = new RegExp(`<(/?)${nom}\\b[^>]*>`, "gi");
    re.lastIndex = m.index + m[0].length;
    let profondeur = 1;
    let fin = -1;
    let x;
    while ((x = re.exec(out))) {
      profondeur += x[1] ? -1 : 1;
      if (profondeur === 0) { fin = x.index + x[0].length; break; }
    }
    out = out.slice(0, m.index) + (fin < 0 ? "" : out.slice(fin));
  }
  return out;
}

export function texteDuHtml(fragment) {
  let h = String(fragment)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|svg|noscript|template|form|button|select|textarea)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(img|input|br|hr)\b[^>]*>/gi, (m, t) => (t.toLowerCase() === "br" ? "\n" : " "));
  h = retirerElements(h, /<nav\b[^>]*>/i, "nav");
  h = retirerElements(h, /<aside\b[^>]*class="[^"]*\bart-cote\b[^"]*"[^>]*>/i, "aside");
  h = retirerElements(h, /<aside\b[^>]*class="[^"]*\bencadre--appel\b[^"]*"[^>]*>/i, "aside");
  h = retirerElements(h, /<div\b[^>]*class="[^"]*\bart-ia\b[^"]*"[^>]*>/i, "div");
  // Deux éléments en ligne collés (« </strong><span> ») sont deux mots : sans espace, le prix et son libellé se
  // soudaient (« Pro »1 490 €5 à 8 pages, mesuré sur /tarifs/). Une balise suivie de texte (« mesuré<em>,</em> ») reste
  // collée.
  h = h.replace(/(<\/[a-z][a-z0-9]*>)(<[a-z])/gi, "$1 $2");
  h = h
    .replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi, "\n")
    .replace(/<h2\b[^>]*>/gi, "\n\n## ").replace(/<h3\b[^>]*>/gi, "\n\n### ").replace(/<h[4-6]\b[^>]*>/gi, "\n\n#### ")
    .replace(/<\/h[2-6]>/gi, "\n")
    .replace(/<summary\b[^>]*>/gi, "\n\n### ").replace(/<\/summary>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "\n- ").replace(/<\/li>/gi, "\n")
    .replace(/<tr\b[^>]*>/gi, "\n").replace(/<\/t[dh]>/gi, " | ").replace(/<t[dh]\b[^>]*>/gi, "")
    .replace(/<\/?(p|div|section|article|header|footer|figure|figcaption|blockquote|ul|ol|table|thead|tbody|tfoot|caption|details|aside|dl|dt|dd|main)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  return decoder(h)
    .replace(ESPACES_INSECABLES, " ")
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").replace(/\s*\|\s*$/, "").trim())
    .join("\n")
    .replace(/^(#{2,4}) *\n+/gm, "$1 ")
    .replace(/^#{2,4} *$/gm, "")
    .replace(/^- *$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function premier(html, motif) {
  const m = html.match(motif);
  return m ? texteDuHtml(m[0]).replace(/\s+/g, " ").trim() : "";
}

// Page HTML → { url, titre, texte, fiche? }
export function lirePage(html, url) {
  const main = (html.match(/<main\b[\s\S]*<\/main>/i) || [""])[0];
  if (!main) return null;
  const h1 = main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const titreBalise = (html.match(/<title>([^<]*)<\/title>/i) || ["", ""])[1].replace(/\s*\|\s*MKZ\s*$/, "");
  // Balises en ligne retirées sans espace (« mesuré<em>,</em> » ne doit pas devenir « mesuré , ») ; <br> vaut une espace.
  const titre = decoder((h1 ? h1[1] : titreBalise).replace(/<br\b[^>]*>/gi, " ").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, "")).replace(ESPACES_INSECABLES, " ").replace(/\s+/g, " ").trim();
  const page = { url, titre, texte: texteDuHtml(main) };
  if (/^\/conseils\/[^/]+\/[^/]+$/.test(url) || /^\/en\/insights\/[^/]+\/[^/]+$/.test(url)) {
    const chapo = premier(main, /<p\b[^>]*class="[^"]*\bart-chapo\b[^"]*"[^>]*>[\s\S]*?<\/p>/i);
    const meta = premier(main, /<p\b[^>]*class="[^"]*\bart-meta\b[^"]*"[^>]*>[\s\S]*?<\/p>/i);
    const ess = main.match(/<aside\b[^>]*class="[^"]*\bencadre--essentiel\b[^"]*"[^>]*>[\s\S]*?<\/aside>/i);
    const essentiel = ess ? texteDuHtml(ess[0]) : "";
    page.fiche = { texte: [chapo, meta, essentiel].filter(Boolean).join("\n") };
  }
  return page;
}

function estDossier(e, p) {
  return e.isDirectory() || (e.isSymbolicLink() && fs.lstatSync(p).isDirectory());
}

// langue : « fr » (défaut) = pages hors /en/, « en » = pages sous /en/ (assistant anglais, 06/11/2026).
export function extrairePages(dossierOut, langue) {
  const en = langue === "en";
  const fichiers = [];
  (function parcourir(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (estDossier(e, p)) { if (!e.name.startsWith("_")) parcourir(p); }
      else if (e.name === "index.html") fichiers.push(p);
    }
  })(dossierOut);
  const pages = [];
  for (const f of fichiers) {
    const rel = path.relative(dossierOut, path.dirname(f)).split(path.sep).join("/");
    const url = "/" + rel;
    const anglaise = url === "/en" || url.startsWith("/en/");
    if (anglaise !== en || url === "/404") continue;
    const p = lirePage(fs.readFileSync(f, "utf8"), url === "/" ? "/" : url.replace(/\/+$/, ""));
    if (p && p.texte) pages.push(p);
  }
  return pages.sort((a, b) => a.url.localeCompare(b.url));
}

const estPrincipal = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (estPrincipal) {
  const args = process.argv.slice(2);
  const i = args.indexOf("--sortie");
  const sortie = i >= 0 ? args[i + 1] : "";
  const j = args.indexOf("--langue");
  const langue = j >= 0 ? args[j + 1] : "fr";
  const out = args.find((a, k) => !a.startsWith("--") && args[k - 1] !== "--sortie" && args[k - 1] !== "--langue") || "out";
  const pages = extrairePages(out, langue);
  if (sortie) fs.writeFileSync(sortie, JSON.stringify(pages, null, 1));
  for (const p of pages) console.log(`${p.url} | ${p.texte.length} car. | ${p.titre}${p.fiche ? " | fiche " + p.fiche.texte.length : ""}`);
  console.log(`${pages.length} pages, ${pages.reduce((s, p) => s + p.texte.length, 0)} caractères`);
}
