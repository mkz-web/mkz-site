import type { Category } from "./types";

// Cocons anglais de /en/insights/.
//
// Deux cocons seulement, et ce ne sont PAS les trois cocons français traduits.
// Raison mesurée (DataForSEO, juillet 2026) :
// - Les cocons FR « tutoriels » et « création de site » ciblent une demande
//   locale française (artisan, TPE, prix d'un site) qui n'a pas d'équivalent en
//   anglais : "web designer france" plafonne à 10 recherches/mois en France, et
//   "website design france" à 10 également. Traduire ces cocons produirait des
//   pages sans demande.
// - En revanche deux intentions anglaises existent réellement : le SEO du
//   marché français vu de l'étranger (french seo, seo agency france, seo
//   services france : environ 500 à 700 recherches/mois cumulées US + UK, KD 1
//   à 9) et la visibilité dans les moteurs de réponse IA (ai search
//   optimization 1 300, llm seo 880, ai visibility 720, llm optimization 720,
//   KD 16 à 22 sur la traîne).

export const categoriesEn: Category[] = [
  {
    slug: "french-seo",
    locale: "en",
    name: "French SEO",
    title: "French SEO: making the French market work for a foreign site",
    metaTitle: "French SEO guides: rank in France from abroad",
    metaDescription:
      "Practical guides on ranking in France when your site was built in English: French keyword research, hreflang, French content, and choosing a French SEO partner.",
    description:
      "Ranking in France when your site was built for English. Keyword research in French, hreflang, and what translation alone will never fix.",
    intro: [
      "Most foreign sites that fail in France fail for the same reason: they were **translated, not researched**. Translation carries your English keywords into French. It does not carry French search demand, because French users do not phrase things the way your English users do.",
      "These guides cover what actually moves the needle: doing keyword research in French before writing a word, getting hreflang right, and judging a French SEO partner on measurement rather than promises. If you would rather hand it over, see the [French SEO service](/en/french-seo/).",
    ],
    icon: "🇫🇷",
    pillar: { href: "/en/french-seo/", label: "Our French SEO service" },
  },
  {
    slug: "ai-search",
    locale: "en",
    name: "AI search",
    title: "AI search: getting cited instead of just ranking",
    metaTitle: "AI search optimisation guides: GEO, AEO and LLM visibility",
    metaDescription:
      "How to get cited by ChatGPT, Perplexity, Gemini and Google AI answers: crawler access, citable content, llms.txt, schema.org, and how to measure share of voice.",
    description:
      "Being the source an AI answer quotes, not the tenth blue link. GEO, AEO, llms.txt and how to measure whether it worked.",
    intro: [
      "Search is splitting in two. One half still returns a list of links. The other half returns **an answer, with a handful of sources**. Ranking eleventh in the first half is survivable. Not being cited in the second half is invisibility.",
      "These guides cover the concrete work: letting AI crawlers reach you, publishing facts that can be quoted with a figure and a date, clean structured data, and measuring your actual share of voice instead of assuming. For the service version, see [AI search optimisation](/en/ai-search-optimization/).",
    ],
    icon: "🤖",
    pillar: { href: "/en/ai-search-optimization/", label: "Our AI search service" },
  },
];

export const AUTHOR_EN = {
  name: "Mickaël Leclerc",
  role: "Founder of MKZ",
  bio: "IT engineer for over 20 years (infrastructure, automation, DevOps), now a French SEO and AI search consultant. Based near Paris, working with companies that need the French market to perform.",
  image: "/images/mickael-leclerc.jpg",
  href: "/en/about/",
};
