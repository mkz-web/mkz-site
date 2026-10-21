import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import PilierCreation from "@/components/charte/pages/PilierCreation";
import pillar from "@/content/pillars/creation-site-internet";

const URL = `${SITE}/creation-site-internet/`;

export const metadata: Metadata = createMetadata("fr", {
  title: pillar.metaTitle,
  description: pillar.metaDescription,
  keywords: pillar.keywords,
  path: "/creation-site-internet/",
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "Création de site internet pour artisans, commerçants et TPE",
  description: pillar.metaDescription,
  serviceType: "Création de site web",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: [
    { "@type": "State", name: "Seine-et-Marne" },
    { "@type": "State", name: "Île-de-France" },
    { "@type": "Country", name: "France" },
  ],
};

export default function CreationSiteInternetPage() {
  const faq = faqSchema(pillar.faq);
  return (
    <>
      <JsonLd data={serviceSchema} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Création de site internet" },
        ])}
      />
      <PilierCreation />
    </>
  );
}
