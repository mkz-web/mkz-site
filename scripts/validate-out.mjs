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
// 7. AUCUN tiret long « — » / demi-cadratin « – » (règle d'écriture Mickaël, 12/06/2026),
//    y compris dans llms.txt et llms-full.txt.

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

for (const file of htmlFiles(outDir)) {
  pages++;
  const rel = relative(outDir, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const isErrorPage = rel === "404.html" || rel.startsWith("404/");

  // 7. Tirets longs interdits
  const dashes = (html.match(/—|–|&mdash;|&ndash;/g) ?? []).length;
  if (dashes > 0) errors.push(`${rel} : ${dashes} tiret(s) long(s) « — / – » (interdits)`);

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

  // 5. Liens internes
  for (const m of html.matchAll(/href="(\/[^"#?]*)["#?]/g)) {
    const href = m[1];
    if (href.startsWith("/_next/") || href.startsWith("/images/")) continue;
    if (/\.(xml|txt|ico|svg|png|jpg|webp|css|js)$/.test(href)) {
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

for (const txt of ["llms.txt", "llms-full.txt", "sitemap.xml"]) {
  const p = join(outDir, txt);
  if (!existsSync(p)) {
    errors.push(`${txt} : fichier absent de out/`);
    continue;
  }
  const dashes = (readFileSync(p, "utf8").match(/—|–/g) ?? []).length;
  if (dashes > 0) errors.push(`${txt} : ${dashes} tiret(s) long(s) « — / – » (interdits)`);
}

console.log(`Pages analysées : ${pages} · blocs JSON-LD valides reparsés : ${jsonLdBlocks}`);
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
