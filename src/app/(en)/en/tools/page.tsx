import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, collectionPageSchema, SITE } from "@/lib/schema";
import ToolsContent, { type ToolsPageContent } from "@/components/ToolsContent";

// English hub of the free tools, created 22/08/2026. A NAVIGATION and
// conversion page, not an SEO page: no English query was targeted or measured
// for the hub itself (the audit page is already a conversion page by decision,
// see (en)/en/seo-audit/page.tsx). It exists so that the English nav has a
// "Free tools" entry and so that the tools get a landing spot in the EN
// internal linking. Counterpart of /outils/ (declared in pagePairs).
//
// The footprint simulator is published in French only (measured decision of
// 15/08/2026, see empreinte-ia/CLAUDE.md): the card says so, rather than
// hiding the tool from English readers who read French.

const URL = `${SITE}/en/tools/`;

export const metadata: Metadata = createMetadata("en", {
  title: "Free tools: SEO & AI audit, AI query footprint",
  description:
    "Two free tools, no signup: an SEO & AI visibility audit that measures your site in one minute, and a simulator of the energy, CO2 and water behind one AI query.",
  path: "/en/tools/",
});

const content: ToolsPageContent = {
  kicker: "Free tools",
  h1Before: "Measure first. ",
  h1Em: "Then decide",
  h1After: ".",
  sub: "Two self-service tools, no signup, built on the rule we apply to client work: measure, never estimate. They tell you where you stand. What you do next is up to you.",
  primary: { label: "Test my site in 1 minute", href: "/en/seo-audit/" },
  phonePrefix: "A question? Call:",
  tools: [
    {
      kicker: "Tool 01 · one minute",
      title: "Free SEO & AI audit",
      desc: "Enter your address. The tool connects to the site you actually serve, runs 20 real checks the moment you click, and returns a score out of 100 with your priorities, each one explained.",
      facts: [
        "Technical layer: HTTPS and redirects, a real 404 page, title and description tags, security headers.",
        "Readability by AI engines: GPTBot, ClaudeBot, PerplexityBot and Google-Extended allowed or blocked, llms.txt, structured data.",
        "Nothing is estimated: what you read is what your site answered seconds ago.",
      ],
      cta: "Run the free audit",
      href: "/en/seo-audit/",
      note: "No signup. The detailed report, also free, arrives within 24 business hours if you ask for it.",
      img: { src: "/images/outils/scan-apercu-en.webp", w: 1400, h: 343, alt: "A real scan result: mkz-consulting.fr, 89/100, technical 35/35, AI readability 35/35, authority and Google rankings 19/30" },
    },
    {
      kicker: "Tool 02 · simulator, in French",
      title: "Footprint of one AI query",
      desc: "How much energy, CO2 and water does one question to an AI cost? Type a query, pick the model class and the region: the simulator gives a figure with its uncertainty range and its sources.",
      facts: [
        "Versioned, sourced dataset (Google, Mistral AI, OpenAI, Ember, Boavizta, ADEME...) with a public changelog.",
        "The message is not \"stop using AI\": the choice of model weighs a hundred times more than using AI or not.",
        "Citable figures in a dedicated llms.txt, for AI answer engines.",
      ],
      cta: "Open the simulator (French)",
      href: "/empreinte-ia/",
      note: "Published in French only, by a measured decision. Educational estimates, not an enforceable measurement.",
      img: { src: "/images/outils/empreinte-apercu.webp", w: 1400, h: 901, alt: "The simulator (in French): query, model class, region, and the result in energy, CO2 and water with uncertainty ranges" },
    },
  ],
  whyTitle: "Why free tools?",
  whyParagraphs: [
    "Because giving before selling is how we work. A company selling into France does not need a pitch, it needs a number about its own site. The tool gives it in one minute, and you stay free to fix things yourself, ask for the report, or book a call.",
    "Both tools apply what we sell: this site publishes its own structured data, its llms.txt, and an audit that measures the live site at test time. Check all of it before you hand over your [French SEO](/en/french-seo/) or your [AI search optimisation](/en/ai-search-optimization/).",
  ],
  ctaTitle: "Rather talk to a human?",
  ctaText: "A free 30-minute review with Mickaël, in English: we go through your results together and you leave with a concrete plan for the French market, whether or not you work with us.",
  ctaButton: "Book a free 30-min review",
};

const toolsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MKZ free tools",
  url: URL,
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebApplication",
        "@id": `${SITE}/en/seo-audit/#app`,
        name: "Free SEO + AI visibility audit",
        url: `${SITE}/en/seo-audit/`,
        description:
          "Free online SEO audit tool: 20 real checks run on the site at test time, a score out of 100 and the priorities to fix. No signup.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        inLanguage: "en",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebApplication",
        name: "Footprint of one AI query (simulator, in French)",
        url: `${SITE}/empreinte-ia/`,
        description:
          "Simulator of the energy, CO2 emissions and water behind one query to an AI, with uncertainty ranges and a versioned, sourced dataset. Published in French.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        inLanguage: "fr-FR",
      },
    },
  ],
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "MKZ free tools",
          description: content.sub,
          url: "/en/tools/",
          dateModified: "2026-08-22",
          locale: "en",
        })}
      />
      <JsonLd data={toolsListSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/en/" },
          { name: "Free tools" },
        ])}
      />
      <ToolsContent locale="en" content={content} />
    </>
  );
}
