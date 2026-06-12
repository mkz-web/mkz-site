import type { Article } from "./articles/types";
import { articleUrl, formatDateFr, stripInline, AUTHOR } from "./articles";

// Générateurs JSON-LD de la newsroom.
// Règles GSC à respecter impérativement (vérifiées par scripts/validate-out.mjs) :
// - BreadcrumbList : chaque maillon porte `item`, SAUF le dernier.
// - ItemList : CHAQUE itemListElement porte un objet `item` complet
//   (@type concret + name + url + propriétés disponibles).

const SITE = "https://mkz-consulting.fr";

const authorRef = { "@id": `${SITE}/#mickael-leclerc` };
const orgRef = { "@id": `${SITE}/#organization` };

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      // `item` sur tous les maillons sauf le dernier (page courante)
      ...(i < items.length - 1 && it.url ? { item: `${SITE}${it.url}` } : {}),
    })),
  };
}

export function articleSchema(a: Article) {
  const url = `${SITE}${articleUrl(a)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.title,
    description: a.metaDescription,
    inLanguage: "fr-FR",
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: `${SITE}/og-image.png`,
    author: { ...authorRef },
    publisher: { ...orgRef },
    keywords: a.keywords.join(", "),
    articleSection: a.category,
    isPartOf: { "@id": `${SITE}/#website` },
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleFaqSchema(a: Article) {
  return faqSchema(a.faq);
}

/** ItemList d'articles (hub + pages catégories) — item COMPLET obligatoire. */
export function articleListSchema(list: Article[], opts: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: `${SITE}${opts.url}`,
    numberOfItems: list.length,
    itemListElement: list.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        name: a.title,
        url: `${SITE}${articleUrl(a)}`,
        description: stripInline(a.excerpt),
        datePublished: a.datePublished,
        dateModified: a.dateModified,
        author: { "@type": "Person", name: AUTHOR.name, url: `${SITE}${AUTHOR.href}` },
        inLanguage: "fr-FR",
      },
    })),
  };
}

export function collectionPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE}${opts.url}`,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE}/#website` },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export { SITE, formatDateFr };
