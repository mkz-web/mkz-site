import type { MetadataRoute } from "next";
import { articles, articlesByCategory, articleUrl, categories } from "@/lib/articles";

// Sitemap généré au build depuis le registre de contenu (jamais à la main).

export const dynamic = "force-static";

const SITE = "https://mkz-consulting.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/services/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/creation-site-internet/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/referencement-seo/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/agence-web-77/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/about/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/contact/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/mentions-legales/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/politique-confidentialite/`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const hubLastMod = articles.length
    ? articles.map((a) => a.dateModified).sort().at(-1)
    : undefined;

  const conseils: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/conseils/`,
      changeFrequency: "weekly",
      priority: 0.8,
      ...(hubLastMod ? { lastModified: hubLastMod } : {}),
    },
    ...categories.map((c) => {
      const list = articlesByCategory(c.slug);
      const lastMod = list.length
        ? list.map((a) => a.dateModified).sort().at(-1)
        : undefined;
      return {
        url: `${SITE}/conseils/${c.slug}/`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
        ...(lastMod ? { lastModified: lastMod } : {}),
      };
    }),
    ...articles.map((a) => ({
      url: `${SITE}${articleUrl(a)}`,
      lastModified: a.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...conseils];
}
