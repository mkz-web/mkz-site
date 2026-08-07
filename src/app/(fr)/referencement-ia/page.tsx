import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PillarContent from "@/components/PillarContent";
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
      <PillarContent
        data={{
          badge: pillar.heroBadge,
          title: pillar.title,
          lead: pillar.heroLead,
          blocks: pillar.blocks,
          faq: pillar.faq,
          finalCta: {
            title: "ChatGPT cite déjà quelqu'un à votre place.",
            text: "Audit gratuit de 30 minutes : on interroge les moteurs IA sur vos requêtes métier devant vous, et vous repartez avec la liste de ce qui vous empêche d'être cité.",
            button: "Réserver mon audit IA gratuit",
          },
        }}
      />
    </>
  );
}
