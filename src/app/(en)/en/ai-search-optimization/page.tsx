import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PillarContent from "@/components/PillarContent";
import pillar from "@/content/en/pillars/ai-search-optimization";

const PATH = "/en/ai-search-optimization/";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = createMetadata("en", {
  title: pillar.metaTitle,
  description: pillar.metaDescription,
  keywords: pillar.keywords,
  path: PATH,
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "AI search optimisation (GEO / AEO)",
  description: pillar.metaDescription,
  serviceType: "Generative Engine Optimization",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: { "@type": "Country", name: "France" },
  availableLanguage: ["en", "fr"],
  inLanguage: "en",
};

export default function AiSearchPage() {
  const faq = faqSchema(pillar.faq);
  return (
    <>
      <JsonLd data={serviceSchema} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/en/" },
          { name: "AI search optimisation" },
        ])}
      />
      <PillarContent
        locale="en"
        data={{
          badge: "AI search",
          title: pillar.title,
          lead: pillar.heroLead,
          blocks: pillar.blocks,
          faq: pillar.faq,
          finalCta: {
            title: "Get your AI visibility baseline",
            text: "Thirty minutes: we check whether AI crawlers can reach you at all, then count how often French and English AI answers cite you today. You keep the numbers either way.",
            button: "Book a free 30-min review",
          },
        }}
      />
    </>
  );
}
