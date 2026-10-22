import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PilierAgence77 from "@/components/charte/pages/PilierAgence77";
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
  name: "Consultant web en Seine-et-Marne (77) : création de site internet et SEO local",
  description: pillar.metaDescription,
  serviceType: "Création de site internet et référencement local",
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
      <PilierAgence77 />
    </>
  );
}
