// Ingestion des articles de la newsroom : _content-staging/*.json → src/content/articles/*.ts
//
// Usage   : node scripts/ingest-content.mjs
// Runtime : Node 18+. Dépendances : aucune (fs/path natifs).
//
// Valide chaque article (format, longueurs SEO, liens internes, ids H2, FAQ)
// puis génère un module TS typé par article + le registre _registry.ts.
// Les fichiers PILIER-like (creation-site-internet, referencement-seo,
// agence-web-77) sont ignorés : intégrés à la main dans leurs pages.

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const stagingDir = resolve(root, "_content-staging");
const outDir = resolve(root, "src", "content", "articles");

const PILLAR_SLUGS = new Set(["creation-site-internet", "referencement-seo", "agence-web-77"]);
const CATEGORIES = new Set(["tutoriels", "creation-site-internet", "seo"]);
const BLOCK_TYPES = new Set(["p", "h2", "h3", "ul", "ol", "table", "callout", "screenshot", "quote", "cta", "code"]);
const CALLOUT_VARIANTS = new Set(["retenir", "astuce", "attention", "definition"]);

const INTERNAL_ALLOWED = new Set([
  "/", "/services/", "/about/", "/contact/",
  "/mentions-legales/", "/politique-confidentialite/",
  "/creation-site-internet/", "/referencement-seo/", "/agence-web-77/",
  "/conseils/", "/conseils/tutoriels/", "/conseils/creation-site-internet/", "/conseils/seo/",
]);

const allJson = readdirSync(stagingDir).filter((f) => f.endsWith(".json"));
const files = allJson.filter((f) => !PILLAR_SLUGS.has(basename(f, ".json")));
const pillarFiles = allJson.filter((f) => PILLAR_SLUGS.has(basename(f, ".json")));

// 1re passe : parse + collecte des slugs (pour valider `related` et les liens articles)
const parsed = [];
const errors = [];
for (const f of files) {
  try {
    const data = JSON.parse(readFileSync(resolve(stagingDir, f), "utf8"));
    parsed.push({ file: f, data });
  } catch (e) {
    errors.push(`${f} : JSON invalide : ${e.message}`);
  }
}
const knownSlugs = new Map(parsed.map(({ data }) => [data.slug, data.category]));
for (const [slug, cat] of knownSlugs) {
  INTERNAL_ALLOWED.add(`/conseils/${cat}/${slug}/`);
}

const collectInline = (a) => {
  const texts = [];
  texts.push(a.excerpt ?? "");
  for (const t of a.tldr ?? []) texts.push(t);
  for (const b of a.blocks ?? []) {
    if (b.text) texts.push(b.text);
    for (const i of b.items ?? []) texts.push(i);
    for (const row of b.rows ?? []) for (const c of row) texts.push(c);
    if (b.type === "cta" && b.href) texts.push(`[cta](${b.href})`);
  }
  return texts;
};

for (const { file, data: a } of parsed) {
  const err = (msg) => errors.push(`${file} : ${msg}`);

  for (const field of ["slug", "category", "title", "metaTitle", "metaDescription", "datePublished", "dateModified", "readingMinutes", "excerpt", "tldr", "blocks", "faq", "related", "keywords"]) {
    if (a[field] === undefined) err(`champ manquant « ${field} »`);
  }
  if (!CATEGORIES.has(a.category)) err(`catégorie inconnue « ${a.category} »`);
  if ((a.metaTitle ?? "").length > 59) err(`metaTitle ${a.metaTitle.length} car. (> 59)`);
  if ((a.metaDescription ?? "").length > 165) err(`metaDescription ${a.metaDescription.length} car. (> 165)`);
  if ((a.metaDescription ?? "").length < 110) err(`metaDescription ${a.metaDescription.length} car. (< 110)`);
  if ((a.title ?? "").length > 80) err(`title ${a.title.length} car. (> 80)`);
  for (const d of [a.datePublished, a.dateModified]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d ?? "")) err(`date invalide « ${d} »`);
  }

  const h2Ids = new Set();
  let screenshots = 0;
  for (const [i, b] of (a.blocks ?? []).entries()) {
    if (!BLOCK_TYPES.has(b.type)) { err(`bloc #${i} : type inconnu « ${b.type} »`); continue; }
    if (b.type === "h2") {
      if (!b.id || !/^[a-z0-9-]+$/.test(b.id)) err(`bloc #${i} h2 : id manquant ou non kebab-case « ${b.id} »`);
      if (h2Ids.has(b.id)) err(`bloc #${i} h2 : id dupliqué « ${b.id} »`);
      h2Ids.add(b.id);
    }
    if (b.type === "callout" && !CALLOUT_VARIANTS.has(b.variant)) err(`bloc #${i} callout : variant « ${b.variant} »`);
    if (b.type === "screenshot") {
      screenshots++;
      if (!b.caption || !b.alt) err(`bloc #${i} screenshot : caption/alt requis`);
    }
    if (b.type === "table" && (!Array.isArray(b.headers) || !Array.isArray(b.rows))) err(`bloc #${i} table : headers/rows requis`);
  }
  if (a.category === "tutoriels" && screenshots < 3) err(`tutoriel avec seulement ${screenshots} screenshots (≥ 3 attendus)`);

  for (const text of collectInline(a)) {
    for (const m of String(text).matchAll(/\]\(([^)\s]+)\)/g)) {
      const url = m[1];
      if (url.startsWith("#")) continue;
      if (/^https?:\/\//.test(url)) continue;
      if (!INTERNAL_ALLOWED.has(url)) err(`lien interne non autorisé : ${url}`);
    }
  }

  for (const r of a.related ?? []) {
    if (!knownSlugs.has(r)) err(`related inconnu : « ${r} »`);
  }
  for (const [i, f] of (a.faq ?? []).entries()) {
    if (!f.q || !f.a) err(`faq #${i} : q/a requis`);
    if (/\*\*|\]\(/.test(f.a ?? "")) err(`faq #${i} : markdown interdit dans la réponse`);
  }
}

// Validation des piliers (format PillarPage)
const pillars = [];
for (const f of pillarFiles) {
  let a;
  try {
    a = JSON.parse(readFileSync(resolve(stagingDir, f), "utf8"));
  } catch (e) {
    errors.push(`${f} : JSON invalide : ${e.message}`);
    continue;
  }
  const err = (msg) => errors.push(`${f} : ${msg}`);
  for (const field of ["slug", "title", "metaTitle", "metaDescription", "heroBadge", "heroLead", "blocks", "faq", "keywords"]) {
    if (a[field] === undefined) err(`champ manquant « ${field} »`);
  }
  if ((a.metaTitle ?? "").length > 59) err(`metaTitle ${a.metaTitle.length} car. (> 59)`);
  if ((a.metaDescription ?? "").length > 165) err(`metaDescription ${a.metaDescription.length} car. (> 165)`);
  const h2Ids = new Set();
  for (const [i, b] of (a.blocks ?? []).entries()) {
    if (!BLOCK_TYPES.has(b.type)) err(`bloc #${i} : type inconnu « ${b.type} »`);
    if (b.type === "h2") {
      if (!b.id || !/^[a-z0-9-]+$/.test(b.id)) err(`bloc #${i} h2 : id manquant ou non kebab-case`);
      if (h2Ids.has(b.id)) err(`bloc #${i} h2 : id dupliqué « ${b.id} »`);
      h2Ids.add(b.id);
    }
    if (b.type === "callout" && !CALLOUT_VARIANTS.has(b.variant)) err(`bloc #${i} callout : variant « ${b.variant} »`);
  }
  for (const text of collectInline({ excerpt: a.heroLead, tldr: [], blocks: a.blocks })) {
    for (const m of String(text).matchAll(/\]\(([^)\s]+)\)/g)) {
      const url = m[1];
      if (url.startsWith("#") || /^https?:\/\//.test(url)) continue;
      if (!INTERNAL_ALLOWED.has(url)) err(`lien interne non autorisé : ${url}`);
    }
  }
  for (const [i, q] of (a.faq ?? []).entries()) {
    if (!q.q || !q.a) err(`faq #${i} : q/a requis`);
    if (/\*\*|\]\(/.test(q.a ?? "")) err(`faq #${i} : markdown interdit dans la réponse`);
  }
  pillars.push(a);
}

if (errors.length) {
  console.error(`❌ ${errors.length} erreur(s) de validation :\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

// Génération des modules piliers
if (pillars.length) {
  const pillarDir = resolve(root, "src", "content", "pillars");
  mkdirSync(pillarDir, { recursive: true });
  for (const p of pillars) {
    const ts = `// Contenu généré depuis _content-staging/${p.slug}.json par scripts/ingest-content.mjs.
import type { PillarPage } from "@/lib/articles/types";

const pillar: PillarPage = ${JSON.stringify(p, null, 2)};

export default pillar;
`;
    writeFileSync(resolve(pillarDir, `${p.slug}.ts`), ts, "utf8");
  }
  console.log(`✅ ${pillars.length} pages piliers générées → src/content/pillars/`);
}

// Génération des modules TS
mkdirSync(outDir, { recursive: true });
const ordered = [...parsed].sort((x, y) => x.data.slug.localeCompare(y.data.slug));
for (const { data } of ordered) {
  const ts = `// Article généré depuis _content-staging/${data.slug}.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = ${JSON.stringify(data, null, 2)};

export default article;
`;
  writeFileSync(resolve(outDir, `${data.slug}.ts`), ts, "utf8");
}

const imports = ordered
  .map(({ data }, i) => `import a${i} from "./${data.slug}";`)
  .join("\n");
const registry = `// Registre généré par scripts/ingest-content.mjs ; ne pas éditer à la main.
import type { Article } from "@/lib/articles/types";
${imports}

export const registry: Article[] = [${ordered.map((_, i) => `a${i}`).join(", ")}];
`;
writeFileSync(resolve(outDir, "_registry.ts"), registry, "utf8");

console.log(`✅ ${ordered.length} articles ingérés → src/content/articles/ (+ _registry.ts)`);
for (const { data } of ordered) {
  console.log(`   - [${data.category}] ${data.slug} : « ${data.title} »`);
}
