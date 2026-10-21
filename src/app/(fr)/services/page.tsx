import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas } from "@/lib/JsonLd";
import ServicesCharte from "@/components/charte/pages/ServicesCharte";

export const metadata: Metadata = createMetadata("fr", {
  title: "Création de site web & SEO pour artisans et TPE",
  description:
    "Création de site internet et référencement Google pour artisans, commerçants et TPE. Design sur-mesure, SEO technique. Audit gratuit 30 min. MKZ (77).",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      {serviceSchemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <ServicesCharte />
    </>
  );
}
