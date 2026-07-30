import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PillarContent from "@/components/PillarContent";
import pillar from "@/content/en/pillars/website-design";

const PATH = "/en/website-design/";
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
  name: "Website design for the French market",
  description: pillar.metaDescription,
  serviceType: "Website design and development",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: { "@type": "Country", name: "France" },
  availableLanguage: ["en", "fr"],
  inLanguage: "en",
};

export default function WebsiteDesignPage() {
  const faq = faqSchema(pillar.faq);
  return (
    <>
      <JsonLd data={serviceSchema} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/en/" },
          { name: "Website design" },
        ])}
      />
      <PillarContent
        locale="en"
        data={{
          badge: "Website design",
          title: pillar.title,
          lead: pillar.heroLead,
          blocks: pillar.blocks,
          faq: pillar.faq,
          finalCta: {
            title: "Rebuild, or just better French pages?",
            text: "Thirty minutes and an honest answer. If you do not need a rebuild, I will tell you so and point you at the cheaper fix instead.",
            button: "Book a free 30-min review",
          },
        }}
      />
    </>
  );
}
