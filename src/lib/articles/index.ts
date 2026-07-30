import type { Article, CategorySlug, Inline, Category } from "./types";
import { categories as categoriesFr, getCategory as getCategoryFr, AUTHOR } from "./categories";
import { categoriesEn, AUTHOR_EN } from "./categories-en";
import { registry } from "@/content/articles/_registry";
import { registryEn } from "@/content/en/articles/_registry";
import type { Locale } from "@/lib/i18n";

// Registre central de la newsroom, désormais bilingue.
// Les articles français vivent dans src/content/articles/ (générés par
// scripts/ingest-content.mjs), les anglais dans src/content/en/articles/.
// Sitemap, llms.txt et llms-full.txt sont générés au build depuis ces registres.

const byDateDesc = (a: Article, b: Article) =>
  b.datePublished.localeCompare(a.datePublished);

/** Locale d'un article ; les articles français historiques n'ont pas le champ. */
export const localeOf = (a: Article | Category): Locale => a.locale ?? "fr";

export const articles: Article[] = [...registry].sort(byDateDesc);
export const articlesEn: Article[] = [...registryEn].sort(byDateDesc);

/** Tous les articles, toutes langues (sitemap, contrôles globaux). */
export const allArticles: Article[] = [...articles, ...articlesEn].sort(byDateDesc);

export function articlesOf(locale: Locale): Article[] {
  return locale === "en" ? articlesEn : articles;
}

export function categoriesOf(locale: Locale): Category[] {
  return locale === "en" ? categoriesEn : categoriesFr;
}

export function authorOf(locale: Locale) {
  return locale === "en" ? AUTHOR_EN : AUTHOR;
}

export function getArticle(
  category: string,
  slug: string,
  locale: Locale = "fr"
): Article | undefined {
  return articlesOf(locale).find((a) => a.category === category && a.slug === slug);
}

export function getArticleBySlug(slug: string, locale: Locale = "fr"): Article | undefined {
  return articlesOf(locale).find((a) => a.slug === slug);
}

export function articlesByCategory(category: CategorySlug, locale: Locale = "fr"): Article[] {
  return articlesOf(locale).filter((a) => a.category === category);
}

export function getCategory(slug: string, locale: Locale = "fr"): Category | undefined {
  return locale === "en" ? categoriesEn.find((c) => c.slug === slug) : getCategoryFr(slug);
}

/** Racine de la newsroom pour une locale. */
export function hubPath(locale: Locale): string {
  return locale === "en" ? "/en/insights/" : "/conseils/";
}

export function categoryUrl(category: CategorySlug, locale: Locale = "fr"): string {
  return `${hubPath(locale)}${category}/`;
}

export function articleUrl(a: Article): string {
  return `${hubPath(localeOf(a))}${a.category}/${a.slug}/`;
}

export function relatedArticles(a: Article): Article[] {
  const locale = localeOf(a);
  return a.related
    .map((slug) => getArticleBySlug(slug, locale))
    .filter((x): x is Article => Boolean(x));
}

export { categoriesFr as categories, AUTHOR, categoriesEn, AUTHOR_EN };

// ── Utilitaires texte ────────────────────────────────────────────────────────

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_FR[m - 1]} ${y}`;
}

export function formatDateEn(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_EN[m - 1]} ${y}`;
}

export function formatDate(iso: string, locale: Locale): string {
  return locale === "en" ? formatDateEn(iso) : formatDateFr(iso);
}

/** Retire le mini-markdown inline (**gras**, [lien](url), `code`). */
export function stripInline(text: Inline): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

const PLAIN_LABELS = {
  fr: {
    url: "URL",
    published: "Publié le",
    updated: "Mis à jour le",
    author: "Auteur",
    essentials: "L'essentiel :",
    faq: "Questions fréquentes :",
    callouts: {
      retenir: "À retenir",
      astuce: "Astuce",
      attention: "Attention",
      definition: "Définition",
    },
  },
  en: {
    url: "URL",
    published: "Published",
    updated: "Updated",
    author: "Author",
    essentials: "The short version:",
    faq: "Frequently asked questions:",
    callouts: {
      retenir: "Key takeaway",
      astuce: "Tip",
      attention: "Watch out",
      definition: "Definition",
    },
  },
} as const;

/** Aplatissement d'un article en texte brut citable (llms-full.txt). */
export function articleToPlainText(a: Article, siteUrl: string): string {
  const locale = localeOf(a);
  const L = PLAIN_LABELS[locale];
  const author = authorOf(locale);
  const lines: string[] = [];

  lines.push(`## ${a.title}`);
  lines.push("");
  lines.push(
    `${L.url} : ${siteUrl}${articleUrl(a)} · ${L.published} ${formatDate(a.datePublished, locale)} · ${L.updated} ${formatDate(a.dateModified, locale)} · ${L.author} : ${author.name} (${author.role})`
  );
  lines.push("");
  lines.push(stripInline(a.excerpt));
  lines.push("");
  lines.push(L.essentials);
  for (const t of a.tldr) lines.push(`- ${stripInline(t)}`);
  lines.push("");

  for (const block of a.blocks) {
    switch (block.type) {
      case "h2":
        lines.push(`### ${block.text}`);
        lines.push("");
        break;
      case "h3":
        lines.push(`#### ${block.text}`);
        lines.push("");
        break;
      case "p":
        lines.push(stripInline(block.text));
        lines.push("");
        break;
      case "ul":
        for (const item of block.items) lines.push(`- ${stripInline(item)}`);
        lines.push("");
        break;
      case "ol":
        block.items.forEach((item, i) => lines.push(`${i + 1}. ${stripInline(item)}`));
        lines.push("");
        break;
      case "table": {
        if (block.caption) lines.push(block.caption + " :");
        for (const row of block.rows) {
          lines.push(
            `- ${row.map((cell, i) => (block.headers[i] ? `${block.headers[i]} : ${cell}` : cell)).join(" · ")}`
          );
        }
        lines.push("");
        break;
      }
      case "callout": {
        const title = block.title ?? L.callouts[block.variant];
        const body = [
          ...(block.text ? [stripInline(block.text)] : []),
          ...(block.items ?? []).map((i) => `- ${stripInline(i)}`),
        ];
        lines.push(`${title} : ${body.join(" ")}`);
        lines.push("");
        break;
      }
      case "quote":
        lines.push(`« ${block.text} »${block.author ? ` (${block.author})` : ""}`);
        lines.push("");
        break;
      case "screenshot":
      case "cta":
      case "code":
        break;
    }
  }

  if (a.faq.length) {
    lines.push(L.faq);
    for (const f of a.faq) lines.push(`- ${f.q} ${f.a}`);
    lines.push("");
  }

  return lines.join("\n");
}

/** Nombre de mots approximatif (contrôle qualité interne). */
export function articleWordCount(a: Article): number {
  const text = articleToPlainText(a, "");
  return text.split(/\s+/).filter(Boolean).length;
}
