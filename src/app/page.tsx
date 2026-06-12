import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas, faqSchema } from "@/lib/JsonLd";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = createMetadata({
  title: "Création de site internet & SEO pour artisans et TPE | MKZ",
  description:
    "Votre site web visible sur Google, enfin. Création de sites internet et référencement SEO pour artisans, commerçants et TPE. Audit gratuit de 30 minutes.",
  alternates: { canonical: "https://mkz-consulting.fr/" },
});

export default function Home() {
  return (
    <>
      {serviceSchemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <JsonLd data={faqSchema} />
      <HomeContent />
    </>
  );
}
