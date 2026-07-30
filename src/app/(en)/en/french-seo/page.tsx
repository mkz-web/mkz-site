import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PillarContent from "@/components/PillarContent";
import pillar from "@/content/en/pillars/french-seo";

const PATH = "/en/french-seo/";
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
  name: "French SEO for companies selling into France",
  description: pillar.metaDescription,
  serviceType: "French SEO",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: { "@type": "Country", name: "France" },
  availableLanguage: ["en", "fr"],
  inLanguage: "en",
};

export default function FrenchSeoPage() {
  const faq = faqSchema(pillar.faq);
  return (
    <>
      <JsonLd data={serviceSchema} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/en/" },
          { name: "French SEO" },
        ])}
      />
      <PillarContent
        locale="en"
        data={{
          badge: pillar.heroBadge,
          title: pillar.title,
          lead: pillar.heroLead,
          blocks: pillar.blocks,
          faq: pillar.faq,
          finalCta: {
            title: "Let's find out where you stand in France",
            text: "Thirty minutes on a call: we look at your French pages, your hreflang and whether French AI answers cite you. You leave with a concrete plan, whether or not you work with me.",
            button: "Book a free 30-min review",
          },
        }}
      />
    </>
  );
}
