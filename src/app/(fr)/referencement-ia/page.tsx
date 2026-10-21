import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PilierIa from "@/components/charte/pages/PilierIa";
import pillar from "@/content/pillars/referencement-ia";

const URL = `${SITE}/referencement-ia/`;

export const metadata: Metadata = createMetadata("fr", {
  title: pillar.metaTitle,
  description: pillar.metaDescription,
  keywords: pillar.keywords,
  path: "/referencement-ia/",
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "Référencement IA (GEO) pour artisans, commerçants et TPE",
  description: pillar.metaDescription,
  serviceType: "Generative Engine Optimization",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: [
    { "@type": "State", name: "Seine-et-Marne" },
    { "@type": "State", name: "Île-de-France" },
    { "@type": "Country", name: "France" },
  ],
};

export default function ReferencementIaPage() {
  const faq = faqSchema(pillar.faq);
  return (
    <>
      <JsonLd data={serviceSchema} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Référencement IA" },
        ])}
      />
      <PilierIa />
    </>
  );
}
