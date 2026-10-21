import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas, faqSchema } from "@/lib/JsonLd";
import AccueilContent from "@/components/accueil/AccueilContent";

export const metadata: Metadata = createMetadata("fr", {
  title: "Création de site internet, SEO et référencement IA | MKZ",
  description:
    "Sites internet, SEO et référencement IA pour artisans, commerçants et TPE. Être trouvé sur Google et cité par ChatGPT. Audit gratuit de 30 minutes.",
  path: "/",
});

// Accueil à la nouvelle charte (maquette codée du 20/10/2026), intégré le 19/10/2026.
// L'ancien accueil (HomeContent, Hero) reste dans le dépôt tant que celui-ci n'est pas validé.
// Préchargements (polices, GSAP) : composant client Prechargements, posé par ChartePage.
export default function Home() {
  return (
    <>
      {serviceSchemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <JsonLd data={faqSchema} />
      <AccueilContent />
    </>
  );
}
