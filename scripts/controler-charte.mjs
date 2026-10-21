#!/usr/bin/env node
/**
 * controler-charte.mjs : vérifie, après le build, que chaque texte des contenus du site
 * (src/content/pillars/*.ts et src/content/articles/*.ts : titres, paragraphes, listes,
 * tableaux, encadrés, légendes, FAQ, et pour un article son chapeau et « L'essentiel ») est bien
 * affiché mot pour mot sur la page correspondante de out/.
 *
 * Commande : node scripts/controler-charte.mjs        (après npm run build)
 * Runtime  : Node >= 18. Dépendances : aucune.
 * Sortie   : une ligne par page (textes attendus, textes absents) ; code 1 au premier absent.
 *
 * POURQUOI (21/10/2026) : les pages métier à la nouvelle charte (maquette codée du 20/10/2026) sont
 * des composants écrits page par page, alors que leur texte vit aussi dans les fichiers de
 * contenu, qui alimentent le JSON-LD (FAQPage) et llms-full.txt. Deux copies d'un même texte
 * dérivent en silence : ce contrôle refuse le build dès qu'une phrase du contenu n'est plus
 * affichée telle quelle. Une phrase changée dans le .ts se change aussi dans le composant.
 * Comparaison sur le texte seulement : balises retirées, entités décodées, espaces (insécables
 * comprises), apostrophes et guillemets typographiques ramenés à une forme unique.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Pages sur mesure de la charte et leur fichier de contenu (à compléter famille par famille)
const PAGES = [
  { contenu: "src/content/pillars/creation-site-internet.ts", page: "out/creation-site-internet/index.html" },
  { contenu: "src/content/pillars/referencement-seo.ts", page: "out/referencement-seo/index.html" },
  { contenu: "src/content/pillars/referencement-ia.ts", page: "out/referencement-ia/index.html" },
  { contenu: "src/content/pillars/agence-web-77.ts", page: "out/agence-web-77/index.html" },
  // Piliers anglais (gabarit PilierCharteEn, 22/10/2026)
  { contenu: "src/content/en/pillars/french-seo.ts", page: "out/en/french-seo/index.html" },
  { contenu: "src/content/en/pillars/ai-search-optimization.ts", page: "out/en/ai-search-optimization/index.html" },
  { contenu: "src/content/en/pillars/website-design.ts", page: "out/en/website-design/index.html" },
];
// Articles (gabarit ArticleCharte, rendu depuis les données) : tous, français et anglais, y compris
// ceux que la veille publiera, la page étant lue à l'adresse que donne l'article lui-même.
for (const [dossier, hub] of [["src/content/articles", "out/conseils/"], ["src/content/en/articles", "out/en/insights/"]]) {
  for (const f of fs.readdirSync(path.join(racine, dossier)).sort()) {
    if (!f.endsWith(".ts") || f.startsWith("_")) continue;
    const contenu = dossier + "/" + f;
    const a = chargerContenu(contenu);
    PAGES.push({ contenu, page: hub + a.category + "/" + a.slug + "/index.html", article: true });
  }
}

// Lit un fichier de contenu TypeScript (objet littéral typé) sans compilateur : on retire les
// imports de types et l'annotation, puis on évalue l'objet.
function chargerContenu(fichier) {
  const ts = fs.readFileSync(path.join(racine, fichier), "utf8");
  const js = ts
    .replace(/^import type[^\n]*\n/gm, "")
    .replace(/const (\w+): \w+ =/, "const $1 =")
    .replace(/export default (\w+);/, "return $1;");
  return new Function(js)();
}

const ENTITES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "'", lsquo: "'", hellip: "...", laquo: '"', raquo: '"', eacute: "é", egrave: "è", agrave: "à", ccedil: "ç", euro: "€" };
const decoder = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITES[n.toLowerCase()] ?? m);

// Forme unique : espaces (dont U+00A0 et U+202F) réduites, apostrophes et guillemets droits
const APOS = new RegExp("[" + String.fromCharCode(0x2019, 0x2018, 0x02bc) + "]", "g");
const GUIL = new RegExp("[" + String.fromCharCode(0xab, 0xbb, 0x201c, 0x201d) + "]", "g");
const ESP = new RegExp("[\\s" + String.fromCharCode(0xa0, 0x202f) + "]+", "g");
const normaliser = (s) =>
  s
    .replace(APOS, "'")
    .replace(GUIL, '"')
    .replace(new RegExp(String.fromCharCode(0x2026), "g"), "...")
    .replace(ESP, " ")
    .replace(/ ([:;?!»%€])/g, "$1")
    .replace(/" /g, '"')
    .trim();

// Mini-markdown du contenu : **gras**, *italique*, [lien](/url/), `code`
const enTexte = (inline) => inline.replace(/\*/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/`/g, "");

function textesAttendus(c, article) {
  const t = [c.title];
  if (article) t.push(c.excerpt, ...(c.tldr || []));
  for (const b of c.blocks || []) {
    if (b.type === "p" || b.type === "h2" || b.type === "h3" || b.type === "quote") t.push(b.text);
    else if (b.type === "ul" || b.type === "ol") t.push(...b.items);
    else if (b.type === "table") t.push(...(b.headers || []), ...b.rows.flat());
    else if (b.type === "callout") t.push(...(b.text ? [b.text] : []), ...(b.items || []));
    else if (b.type === "cta") t.push(b.title, b.text, b.button);
    else if (b.type === "screenshot") t.push(b.caption);
    else if (b.type === "code") t.push(b.code);
  }
  for (const f of c.faq || []) t.push(f.q, f.a);
  return t.filter(Boolean).map((x) => normaliser(enTexte(String(x))));
}

function texteDeLaPage(html) {
  const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  if (!main) return "";
  const brut = main
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "");
  return normaliser(decoder(brut));
}

let echecs = 0;
for (const { contenu, page, article } of PAGES) {
  const cheminPage = path.join(racine, page);
  if (!fs.existsSync(cheminPage)) {
    console.log("PANNE  " + page + " : absente (lancer npm run build d'abord)");
    echecs++;
    continue;
  }
  const attendus = textesAttendus(chargerContenu(contenu), article);
  const texte = texteDeLaPage(fs.readFileSync(cheminPage, "utf8"));
  if (attendus.length === 0 || texte.length < 1000) {
    console.log("PANNE  " + page + " : " + attendus.length + " textes attendus, " + texte.length + " caractères lus");
    echecs++;
    continue;
  }
  const absents = attendus.filter((a) => !texte.includes(a));
  console.log((absents.length ? "ÉCART  " : "OK     ") + page + " : " + attendus.length + " textes du contenu, " + absents.length + " absent(s)");
  for (const a of absents.slice(0, 12)) console.log("         - " + a.slice(0, 160));
  if (absents.length) echecs++;
}
process.exit(echecs ? 1 : 0);
