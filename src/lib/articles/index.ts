import type { Article, CategorySlug, Inline } from "./types";
import { categories, getCategory, AUTHOR } from "./categories";
import { registry } from "@/content/articles/_registry";

// Registre central des articles de la newsroom.
// Les articles vivent dans src/content/articles/ (générés par scripts/ingest-content.mjs).
// Le sitemap, llms.txt et llms-full.txt sont générés au build depuis ce registre.

export const articles: Article[] = [...registry].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished)
);

export function getArticle(category: string, slug: string): Article | undefined {
  return articles.find((a) => a.category === category && a.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function articlesByCategory(category: CategorySlug): Article[] {
  return articles.filter((a) => a.category === category);
}

export function articleUrl(a: Article): string {
  return `/conseils/${a.category}/${a.slug}/`;
}

export function relatedArticles(a: Article): Article[] {
  return a.related
    .map((slug) => getArticleBySlug(slug))
    .filter((x): x is Article => Boolean(x));
}

export { categories, getCategory, AUTHOR };

// ── Utilitaires texte ────────────────────────────────────────────────────────

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_FR[m - 1]} ${y}`;
}

/** Retire le mini-markdown inline (**gras**, [lien](url), `code`). */
export function stripInline(text: Inline): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

/** Aplatissement d'un article en texte brut citable (llms-full.txt). */
export function articleToPlainText(a: Article, siteUrl: string): string {
  const lines: string[] = [];
  lines.push(`## ${a.title}`);
  lines.push("");
  lines.push(
    `URL : ${siteUrl}${articleUrl(a)} · Publié le ${formatDateFr(a.datePublished)} · Mis à jour le ${formatDateFr(a.dateModified)} · Auteur : ${AUTHOR.name} (${AUTHOR.role})`
  );
  lines.push("");
  lines.push(stripInline(a.excerpt));
  lines.push("");
  lines.push("L'essentiel :");
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
        const title =
          block.title ??
          { retenir: "À retenir", astuce: "Astuce", attention: "Attention", definition: "Définition" }[
            block.variant
          ];
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
    lines.push("Questions fréquentes :");
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
