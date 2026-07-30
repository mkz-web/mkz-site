import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PillarContent from "@/components/PillarContent";
import pillar from "@/content/pillars/agence-web-77";

const URL = `${SITE}/agence-web-77/`;

export const metadata: Metadata = createMetadata("fr", {
  title: pillar.metaTitle,
  description: pillar.metaDescription,
  keywords: pillar.keywords,
  path: "/agence-web-77/",
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "Agence web en Seine-et-Marne (77) : création de site internet et SEO local",
  description: pillar.metaDescription,
  serviceType: "Agence web",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: [
    { "@type": "State", name: "Seine-et-Marne" },
    { "@type": "City", name: "Meaux" },
    { "@type": "City", name: "Melun" },
    { "@type": "City", name: "Chelles" },
    { "@type": "City", name: "Dammartin-en-Goële" },
  ],
};

export default function AgenceWeb77Page() {
  const faq = faqSchema(pillar.faq);
  return (
    <>
      <JsonLd data={serviceSchema} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Agence web Seine-et-Marne (77)" },
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
            title: "Une agence web près de chez vous, dans le 77",
            text: "Basés à Dammartin-en-Goële, nous nous déplaçons partout en Seine-et-Marne. Audit gratuit de 30 minutes, par téléphone ou autour d'un café.",
            button: "Réserver mon audit gratuit",
          },
        }}
      />
    </>
  );
}
