import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas } from "@/lib/JsonLd";
import ServicesContent from "@/components/ServicesContent";

export const metadata: Metadata = createMetadata({
  title: "Création de site web & SEO pour artisans et TPE",
  description:
    "Création de site internet professionnel et référencement Google pour artisans, commerçants et indépendants. Design sur-mesure, SEO technique, audit gratuit. MKZ, Seine-et-Marne (77).",
  alternates: { canonical: "https://mkz-consulting.fr/services/" },
});

export default function ServicesPage() {
  return (
    <>
      {serviceSchemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <ServicesContent />
    </>
  );
}
