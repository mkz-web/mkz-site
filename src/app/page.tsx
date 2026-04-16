import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas, faqSchema } from "@/lib/JsonLd";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = createMetadata({
  title: "Création de site internet & SEO pour artisans et TPE | MKZ",
  description:
    "Votre site web visible sur Google, enfin. MKZ crée des sites internet professionnels et optimise votre référencement SEO. Artisans, commerçants, indépendants en Île-de-France et partout en France. Audit gratuit 30 min.",
  alternates: { canonical: "https://mkz.fr/" },
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
