import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import AuditContent, { type AuditFaqItem, type AuditPageContent } from "@/components/audit/AuditContent";

// Page de CONVERSION assumée, pas une page SEO : décision MESURÉE du
// 21/08/2026. Volumes anglais testés via DataForSEO (US) : « french seo
// audit », « seo audit france », « seo audit french website », « website
// audit france » absents de la base ; « french seo agency » 10/mois. Même
// logique que /en/website-design/ : la page existe pour convertir le trafic
// EN du site et les visiteurs venus des moteurs de réponse IA, pas pour
// ranker de face. Pendant hreflang de /audit-seo/ (déclaré dans pagePairs).
//
// Le discours n'est pas une traduction : il vise une entreprise étrangère qui
// vend vers la France et veut savoir si son site est lisible par Google et
// par les moteurs IA.

const URL = `${SITE}/en/seo-audit/`;

export const metadata: Metadata = createMetadata("en", {
  title: "Free SEO & AI visibility audit",
  description:
    "Run 17 real checks on your site in 60 seconds: HTTPS, AI crawlers, llms.txt, structured data, real 404. A clear score and your priorities. Free, no signup.",
  path: "/en/seo-audit/",
});

const faq: AuditFaqItem[] = [
  {
    q: "What does this audit actually check?",
    a: "Seventeen real measurements, taken on your site the moment you click: HTTPS and redirects, indexability, a real 404 test, title and description lengths as Google actually displays them, heading structure, mobile viewport, security headers, plus the AI layer: whether GPTBot, ClaudeBot, PerplexityBot and three other AI crawlers can read your site, whether you serve an llms.txt file, and whether your structured data parses.",
  },
  {
    q: "Is it really free?",
    a: "Yes. The scan is free with no signup, and so is the detailed report sent within 24 business hours. The full audit is a separate paid service (490 €, or 690 € including the real measurement of how ChatGPT, Perplexity and Gemini talk about you), and it is deducted from your first invoice if we start working together within 30 days.",
  },
  {
    q: "Why does AI readability matter for the French market?",
    a: "Because French buyers already ask ChatGPT and Perplexity for recommendations, and those engines answer with companies they can read and verify. If an AI crawler is blocked on your site, and many hosts block them by default, you simply do not exist in that answer. Checking this takes the tool a few seconds; fixing it is often one line in a robots.txt.",
  },
  {
    q: "What happens to my data?",
    a: "The scan asks for nothing but a public website address. Your email is only collected if you request the report, with an explicit consent checkbox, and is used to send it and follow up about it. Details and your rights are in the privacy policy.",
  },
  {
    q: "I want a human, not a tool.",
    a: "Fair. Book a free 30-minute review: we look at your scan together, in English, and you leave with a concrete plan for your French visibility, whether or not you work with us.",
  },
];

const content: AuditPageContent = {
  kicker: "Free tool",
  h1Before: "Is your site ",
  h1Em: "readable",
  h1After: " by Google and by AI engines?",
  sub: "Enter your address. In one minute the tool runs 17 real checks: your technical layer, your Google readability, and the part nobody shows you, whether AI engines like ChatGPT and Perplexity can read and cite you. A clear score, your priorities, no signup.",
  measuresTitle: "What the tool measures",
  measures: [
    {
      title: "Technical and SEO hygiene",
      text: "HTTPS and redirects, indexability, a real 404 page, title and description at the lengths Google actually displays, headings, mobile viewport, security headers.",
    },
    {
      title: "Readability by AI engines",
      text: "Can the 6 main AI crawlers (GPTBot, ClaudeBot, PerplexityBot...) read your site? Do you serve an llms.txt? Does your structured data parse? A blocked crawler is an answer engine that cannot cite you.",
    },
    {
      title: "Authority and rankings",
      text: "Referring domains, ranked keywords, estimated traffic: these need specialised databases and land in the free full report.",
    },
  ],
  methodTitle: "Measured, never estimated",
  methodParagraphs: [
    "Most free tools serve you a grade from a three-week-old database. Here, every check runs against your site the moment you click: the tool connects, reads the robots.txt you actually serve, requests a made-up URL to see whether your 404 page does its job, and dissects your homepage. What you read on screen is what your site answered seconds ago.",
    "The scan is the express version of our audit method. The full version goes further: competitor analysis, the keywords worth targeting in French search, the real measurement of what ChatGPT, Perplexity and Gemini say about you, and a prioritised action plan. The scan tells you where you stand. The full audit tells you what to do, in what order, and why.",
  ],
  faqTitle: "Frequently asked questions",
  nextLinks: {
    intro: "Keep reading:",
    links: [
      { label: "French SEO, the service", href: "/en/french-seo/" },
      { label: "AI search optimisation", href: "/en/ai-search-optimization/" },
      { label: "field notes on French search", href: "/en/insights/" },
    ],
  },
  ctaTitle: "Rather talk to a human?",
  ctaText: "A free 30-minute review with Mickaël, in English: we go through your scan together and you leave with a concrete plan for the French market, whether or not you work with us.",
  ctaButton: "Book a free 30-min review",
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${URL}#app`,
  name: "Free SEO + AI visibility audit",
  url: URL,
  description:
    "Free online SEO audit tool: 17 real checks run on the site at test time (HTTPS, AI crawlers, llms.txt, JSON-LD structured data, real 404, SERP tags), a score out of 100 and the priorities to fix.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "en",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  provider: { "@id": `${SITE}/#organization` },
};

export default function SeoAuditPage() {
  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema(faq)!} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/en/" },
          { name: "Free SEO audit" },
        ])}
      />
      <AuditContent locale="en" content={content} faq={faq} />
    </>
  );
}
