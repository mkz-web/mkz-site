import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PillarContent from "@/components/PillarContent";
import pillar from "@/content/pillars/referencement-seo";

const URL = `${SITE}/referencement-seo/`;

export const metadata: Metadata = createMetadata({
  title: pillar.metaTitle,
  description: pillar.metaDescription,
  keywords: pillar.keywords,
  alternates: { canonical: URL },
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "Référencement naturel (SEO) pour artisans, commerçants et TPE",
  description: pillar.metaDescription,
  serviceType: "Référencement naturel SEO",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: [
    { "@type": "State", name: "Seine-et-Marne" },
    { "@type": "State", name: "Île-de-France" },
    { "@type": "Country", name: "France" },
  ],
};

export default function ReferencementSeoPage() {
  const faq = faqSchema(pillar.faq);
  return (
    <>
      <JsonLd data={serviceSchema} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Référencement SEO" },
        ])}
      />
      <PillarContent
        data={{
          badge: pillar.heroBadge,
          title: pillar.title,
          lead: pillar.heroLead,
          blocks: pillar.blocks,
          faq: pillar.faq,
          finalCta: {
            title: "Et si on regardait votre visibilité Google ?",
            text: "Audit gratuit de 30 minutes : où vous en êtes, ce que font vos concurrents, et les actions qui rapporteraient le plus — expliqué sans jargon.",
            button: "Réserver mon audit SEO gratuit",
          },
        }}
      />
    </>
  );
}
