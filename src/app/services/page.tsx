import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas } from "@/lib/JsonLd";
import ServicesContent from "@/components/ServicesContent";

export const metadata: Metadata = createMetadata({
  title: "Cr\u00e9ation de site web & SEO pour artisans et TPE",
  description:
    "Cr\u00e9ation de site internet professionnel et r\u00e9f\u00e9rencement Google pour artisans, commer\u00e7ants et ind\u00e9pendants. Design sur-mesure, SEO technique, audit gratuit. MKZ, Seine-et-Marne (77).",
  alternates: { canonical: "https://mkz.fr/services/" },
});

export default function ServicesPage() {
  return (
    <>
      <head>
        {serviceSchemas.map((s, i) => (
          <JsonLd key={i} data={s} />
        ))}
      </head>
      <ServicesContent />
    </>
  );
}
