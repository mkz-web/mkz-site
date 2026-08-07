import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas, faqSchema } from "@/lib/JsonLd";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = createMetadata("fr", {
  title: "Création de site internet, SEO et référencement IA | MKZ",
  description:
    "Sites internet, SEO et référencement IA pour artisans, commerçants et TPE. Être trouvé sur Google et cité par ChatGPT. Audit gratuit de 30 minutes.",
  path: "/",
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
