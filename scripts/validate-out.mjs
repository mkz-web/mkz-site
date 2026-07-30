// Validation programmatique du build statique (out/) avant publication.
//
// Usage   : node scripts/validate-out.mjs
// Runtime : Node 18+. Dépendances : aucune (fs/path natifs).
//
// Contrôles (règles vécues GSC, voir CLAUDE.md global) :
// 1. Chaque bloc <script type="application/ld+json"> doit reparser en JSON valide.
// 2. ItemList : CHAQUE itemListElement porte un objet `item` complet (@type, name, url).
// 3. BreadcrumbList : `item` requis sur tous les maillons SAUF le dernier.
// 4. <title> ≤ 65 caractères ; meta description ≤ 165 et ≥ 80 caractères.
// 5. Tous les liens internes href="/…" pointent vers un fichier existant de out/.
// 6. Présence de canonical sur chaque page indexable.
// 7. AUCUN tiret cadratin (U+2014) ni demi-cadratin (U+2013) (règle d'écriture Mickaël, 12/06/2026),
//    y compris dans llms.txt et llms-full.txt.
// 8. Bilingue (ajouté le 30/07/2026, création de la version anglaise) :
//    a. <html lang> cohérent avec l'emplacement de la page (/en/… => en).
//    b. hreflang réciproque : si A déclare B comme alternative, B doit déclarer A.
//       Sans réciprocité, Google ignore la paire et choisit lui-même la version.
//    c. x-default présent dès qu'une page déclare des alternatives.
//    d. Chaque cible hreflang existe réellement dans out/ (pas d'alternative en 404).
//    Note : Next émet l'attribut sous la forme `hrefLang` (nom de prop React).
//    HTML étant insensible à la casse des attributs, c'est valide ; les regex
//    ci-dessous doivent donc être insensibles à la casse.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "out");

if (!existsSync(outDir)) {
  console.error("❌ out/ introuvable. Lance `npm run build` d'abord.");
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      if (entry === "_next") continue;
      yield* htmlFiles(p);
    } else if (entry.endsWith(".html")) {
      yield p;
    }
  }
}

const errors = [];
const warnings = [];
let pages = 0;
let jsonLdBlocks = 0;

const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

// Cadratin (U+2014) et demi-cadratin (U+2013) interdits dans tout texte genere.
// Le motif est construit a l'execution : ce fichier ne contient donc pas les
// caracteres qu'il traque, ce qui evite que le hook lint-livrables sonne sur
// son propre detecteur.
const EM_DASH = String.fromCharCode(0x2014);
const EN_DASH = String.fromCharCode(0x2013);
const FORBIDDEN_DASHES_HTML = new RegExp(
  [EM_DASH, EN_DASH, "&mdash;", "&ndash;"].join("|"),
  "g"
);
const FORBIDDEN_DASHES_TXT = new RegExp([EM_DASH, EN_DASH].join("|"), "g");

const SITE = "https://mkz-consulting.fr";

// 8. Collecte bilingue : chemin de page -> lang declare + alternates hreflang.
// La reciprocite ne peut se verifier qu'apres avoir lu toutes les pages, donc on
// accumule ici et on controle apres la boucle.
const localeGraph = new Map();

/** out/en/french-seo/index.html -> /en/french-seo/ ; out/index.html -> / */
function pathOf(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel.replace(/\.html$/, "")}/`;
}

/** URL absolue du site -> chemin, sinon null (alternate externe). */
function pathOfUrl(url) {
  if (!url.startsWith(SITE)) return null;
  const p = url.slice(SITE.length);
  return p === "" ? "/" : p;
}

for (const file of htmlFiles(outDir)) {
  pages++;
  const rel = relative(outDir, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const isErrorPage = rel === "404.html" || rel.startsWith("404/");

  // 7. Tirets longs interdits
  const dashes = (html.match(FORBIDDEN_DASHES_HTML) ?? []).length;
  if (dashes > 0) errors.push(`${rel} : ${dashes} tiret(s) cadratin/demi-cadratin (U+2014 / U+2013) interdit(s)`);

  // 1-3. JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLdBlocks++;
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${rel} : JSON-LD invalide : ${e.message}`);
      continue;
    }
    const nodes = Array.isArray(data) ? data : [data];
    for (const node of nodes) {
      if (node["@type"] === "ItemList") {
        for (const el of node.itemListElement ?? []) {
          if (!el.item || typeof el.item !== "object") {
            errors.push(`${rel} : ItemList, itemListElement #${el.position} sans objet item`);
          } else if (!el.item["@type"] || !el.item.name || !el.item.url) {
            errors.push(`${rel} : ItemList, item #${el.position} incomplet (@type/name/url requis)`);
          }
        }
      }
      if (node["@type"] === "BreadcrumbList") {
        const els = node.itemListElement ?? [];
        els.forEach((el, i) => {
          const isLast = i === els.length - 1;
          if (!isLast && !el.item) {
            errors.push(`${rel} : BreadcrumbList, maillon #${i + 1} (non terminal) sans item`);
          }
        });
      }
    }
  }

  if (isErrorPage) continue;

  // 4. Title / meta description
  const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  if (!title) errors.push(`${rel} : <title> manquant`);
  else if (title.length > 65) errors.push(`${rel} : title ${title.length} car. (> 65) : « ${title} »`);
  const desc = decodeEntities(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  if (!desc) errors.push(`${rel} : meta description manquante`);
  else {
    if (desc.length > 165) errors.push(`${rel} : meta description ${desc.length} car. (> 165)`);
    if (desc.length < 80) warnings.push(`${rel} : meta description courte (${desc.length} car.)`);
  }

  // 6. Canonical
  if (!/<link rel="canonical" href="https:\/\/mkz-consulting\.fr/.test(html)) {
    warnings.push(`${rel} : canonical absent`);
  }

  // 8a. <html lang> coherent avec l'emplacement de la page
  const pagePath = pathOf(rel);
  const expectedLang = pagePath.startsWith("/en/") || pagePath === "/en" ? "en" : "fr";
  const declaredLang = html.match(/<html[^>]*\slang="([^"]*)"/i)?.[1] ?? "";
  if (!declaredLang) {
    errors.push(`${rel} : attribut lang absent sur <html>`);
  } else if (declaredLang !== expectedLang) {
    errors.push(
      `${rel} : <html lang="${declaredLang}"> alors que l'emplacement implique "${expectedLang}"`
    );
  }

  // 8b-d. Collecte des alternates (Next emet `hrefLang`, donc regex insensible
  // a la casse : HTML ignore la casse des noms d'attributs).
  const alternates = new Map();
  for (const m of html.matchAll(
    /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi
  )) {
    alternates.set(m[1].toLowerCase(), m[2]);
  }
  localeGraph.set(pagePath, { rel, lang: declaredLang, alternates });

  // 5. Liens internes
  for (const m of html.matchAll(/href="(\/[^"#?]*)["#?]/g)) {
    const href = m[1];
    if (href.startsWith("/_next/") || href.startsWith("/images/")) continue;
    if (/\.(xml|txt|ico|svg|png|jpg|webp|css|js|woff2?)$/.test(href)) {
      if (!existsSync(join(outDir, href))) errors.push(`${rel} : lien fichier cassé ${href}`);
      continue;
    }
    const target = join(outDir, href, "index.html");
    const targetFlat = join(outDir, `${href.replace(/\/$/, "")}.html`);
    if (!existsSync(target) && !existsSync(targetFlat)) {
      errors.push(`${rel} : lien interne cassé ${href}`);
    }
  }
}

// ── 8b-d. Controles hreflang, une fois toutes les pages lues ────────────────
let hreflangPairs = 0;

for (const [pagePath, page] of localeGraph) {
  const langAlternates = [...page.alternates].filter(([lang]) => lang !== "x-default");
  if (langAlternates.length === 0) continue; // page monolingue assumee

  // 8c. x-default obligatoire des qu'il y a des alternatives
  if (!page.alternates.has("x-default")) {
    errors.push(`${page.rel} : declare des alternates hreflang sans x-default`);
  }

  for (const [lang, url] of langAlternates) {
    const targetPath = pathOfUrl(url);
    if (!targetPath) continue; // alternative hors site : hors perimetre
    // Auto-reference (la page se declare dans sa propre langue) : correct et
    // attendu, mais ce n'est pas une paire inter-langues a verifier.
    if (targetPath === pagePath) continue;

    // 8d. La cible existe-t-elle vraiment dans out/ ?
    const target = localeGraph.get(targetPath);
    if (!target) {
      errors.push(
        `${page.rel} : alternate hreflang="${lang}" pointe vers ${targetPath}, absent de out/`
      );
      continue;
    }

    // 8b. Reciprocite : la cible doit renvoyer vers la page courante.
    const backLinks = [...target.alternates.values()].map(pathOfUrl);
    if (!backLinks.includes(pagePath)) {
      errors.push(
        `${page.rel} : hreflang non reciproque, ${targetPath} ne renvoie pas vers ${pagePath} ` +
          `(Google ignore la paire et choisit lui-meme la version)`
      );
    } else {
      hreflangPairs++;
    }
  }
}

for (const txt of ["llms.txt", "llms-full.txt", "sitemap.xml"]) {
  const p = join(outDir, txt);
  if (!existsSync(p)) {
    errors.push(`${txt} : fichier absent de out/`);
    continue;
  }
  const dashes = (readFileSync(p, "utf8").match(FORBIDDEN_DASHES_TXT) ?? []).length;
  if (dashes > 0) errors.push(`${txt} : ${dashes} tiret(s) cadratin/demi-cadratin (U+2014 / U+2013) interdit(s)`);
}

const frPages = [...localeGraph.values()].filter((p) => p.lang === "fr").length;
const enPages = [...localeGraph.values()].filter((p) => p.lang === "en").length;

console.log(
  `Pages analysées : ${pages} · blocs JSON-LD valides reparsés : ${jsonLdBlocks}\n` +
    `Locales : ${frPages} page(s) fr · ${enPages} page(s) en · ${hreflangPairs} paire(s) hreflang réciproque(s)`
);
if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} avertissement(s) :`);
  for (const w of warnings) console.log(`  - ${w}`);
}
if (errors.length) {
  console.error(`\n❌ ${errors.length} erreur(s) :`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("\n✅ Validation OK : JSON-LD conformes, titles/metas dans les clous, maillage interne sain.");
