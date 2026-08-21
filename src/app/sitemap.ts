import type { MetadataRoute } from "next";
import {
  articles,
  articlesEn,
  articlesByCategory,
  articleUrl,
  categories,
  categoriesEn,
  categoryUrl,
} from "@/lib/articles";
import { SITE, counterpartOf, hreflangOf, type Locale } from "@/lib/i18n";

// Sitemap généré au build depuis les registres de contenu (jamais à la main).
// Bilingue : chaque URL qui possède un équivalent dans l'autre langue déclare
// ses alternates, ce qui double le signal hreflang déjà présent dans le <head>.

export const dynamic = "force-static";

/** Bloc `alternates.languages` du sitemap pour un chemin, s'il a un pendant. */
function alternates(path: string, locale: Locale) {
  const counterpart = counterpartOf(path, locale);
  if (!counterpart) return {};
  const other: Locale = locale === "fr" ? "en" : "fr";
  return {
    alternates: {
      languages: {
        [hreflangOf[locale]]: `${SITE}${path}`,
        [hreflangOf[other]]: `${SITE}${counterpart}`,
      },
    },
  };
}

function entry(
  path: string,
  locale: Locale,
  opts: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified?: string }
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE}${path}`,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    ...(opts.lastModified ? { lastModified: opts.lastModified } : {}),
    ...alternates(path, locale),
  };
}

const latest = (list: { dateModified: string }[]) =>
  list.length ? list.map((a) => a.dateModified).sort().at(-1) : undefined;

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Français ──
  const frStatic: MetadataRoute.Sitemap = [
    entry("/", "fr", { priority: 1.0, changeFrequency: "monthly" }),
    entry("/services/", "fr", { priority: 0.8, changeFrequency: "monthly" }),
    // Page tarifs française uniquement : décision MESURÉE du 20/08/2026
    // (8 requêtes anglaises « pricing/cost france » testées via DataForSEO,
    // zéro volume ; détail dans src/app/(fr)/tarifs/page.tsx). Volumes FR :
    // « prix site internet » 1 000/mois, « devis site internet » 590.
    entry("/tarifs/", "fr", { priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-20" }),
    entry("/creation-site-internet/", "fr", { priority: 0.9, changeFrequency: "monthly" }),
    // Outil d'audit SEO + IA en libre-service (Pages Function /api/scan).
    // Cible « audit seo (gratuit) », 1 600 + 880/mois (DataForSEO 20/08/2026) ;
    // détail et échelle commerciale en tête de src/app/(fr)/audit-seo/page.tsx.
    entry("/audit-seo/", "fr", { priority: 0.9, changeFrequency: "monthly", lastModified: "2026-08-21" }),
    entry("/referencement-seo/", "fr", { priority: 0.9, changeFrequency: "monthly" }),
    entry("/referencement-ia/", "fr", { priority: 0.9, changeFrequency: "monthly" }),
    entry("/agence-web-77/", "fr", { priority: 0.9, changeFrequency: "monthly" }),
    // Page outil « Empreinte d'une requête IA », générée hors Next (dépôt
    // Projet/Mon empreinte ia, copiée dans public/empreinte-ia/ avec son
    // llms.txt dédié). Pas de version anglaise : décision MESURÉE du
    // 15/08/2026 (volumes US en chute de ~75 % entre S2 2025 et S1 2026,
    // SERP tenue par Epoch AI/IEEE/grands médias, intention hors doctrine
    // de la section EN). Détail : CLAUDE.md du projet source.
    entry("/empreinte-ia/", "fr", { priority: 0.8, changeFrequency: "monthly", lastModified: "2026-08-15" }),
    entry("/about/", "fr", { priority: 0.7, changeFrequency: "monthly" }),
    entry("/contact/", "fr", { priority: 0.6, changeFrequency: "monthly" }),
    // Les deux pages légales françaises sont passées en index, follow le
    // 30/07/2026 : elles reviennent donc dans le sitemap. Ne les y laisser
    // qu'aussi longtemps qu'elles restent indexables, sinon GSC remonte
    // « URL envoyée avec balise noindex ».
    entry("/mentions-legales/", "fr", { priority: 0.3, changeFrequency: "yearly" }),
    entry("/politique-confidentialite/", "fr", { priority: 0.3, changeFrequency: "yearly" }),
  ];

  const frNewsroom: MetadataRoute.Sitemap = [
    entry("/conseils/", "fr", {
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: latest(articles),
    }),
    ...categories.map((c) =>
      entry(categoryUrl(c.slug, "fr"), "fr", {
        priority: 0.7,
        changeFrequency: "weekly",
        lastModified: latest(articlesByCategory(c.slug, "fr")),
      })
    ),
    ...articles.map((a) =>
      entry(articleUrl(a), "fr", {
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: a.dateModified,
      })
    ),
  ];

  // ── Anglais ──
  // Pas d'équivalent de /agence-web-77/ ni de /services/ : décision fondée sur
  // les volumes mesurés, pas un oubli (voir src/content/en/pillars/*).
  const enStatic: MetadataRoute.Sitemap = [
    entry("/en/", "en", { priority: 0.9, changeFrequency: "monthly" }),
    entry("/en/french-seo/", "en", { priority: 0.9, changeFrequency: "monthly" }),
    entry("/en/ai-search-optimization/", "en", { priority: 0.9, changeFrequency: "monthly" }),
    entry("/en/website-design/", "en", { priority: 0.7, changeFrequency: "monthly" }),
    // Pendant hreflang de /audit-seo/ : page de conversion assumée, volumes
    // anglais mesurés à zéro le 21/08/2026 (en-tête de la page pour le détail).
    entry("/en/seo-audit/", "en", { priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-21" }),
    entry("/en/about/", "en", { priority: 0.7, changeFrequency: "monthly" }),
    entry("/en/contact/", "en", { priority: 0.6, changeFrequency: "monthly" }),
    // Pendants anglais des deux pages légales : même indexabilité que le
    // français, sinon une paire hreflang déclarerait une alternative que Google
    // n'a pas le droit d'indexer.
    entry("/en/legal-notice/", "en", { priority: 0.3, changeFrequency: "yearly" }),
    entry("/en/privacy-policy/", "en", { priority: 0.3, changeFrequency: "yearly" }),
  ];

  const enNewsroom: MetadataRoute.Sitemap = [
    entry("/en/insights/", "en", {
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: latest(articlesEn),
    }),
    ...categoriesEn.map((c) =>
      entry(categoryUrl(c.slug, "en"), "en", {
        priority: 0.7,
        changeFrequency: "weekly",
        lastModified: latest(articlesByCategory(c.slug, "en")),
      })
    ),
    ...articlesEn.map((a) =>
      entry(articleUrl(a), "en", {
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: a.dateModified,
      })
    ),
  ];

  // Les pages légales anglaises restent en noindex (la version française fait
  // foi) : elles n'entrent pas dans le sitemap, contrairement aux françaises.
  return [...frStatic, ...frNewsroom, ...enStatic, ...enNewsroom];
}
