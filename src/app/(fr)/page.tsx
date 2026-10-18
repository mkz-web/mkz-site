import type { Metadata } from "next";
import { preload } from "react-dom";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas, faqSchema } from "@/lib/JsonLd";
import AccueilContent from "@/components/accueil/AccueilContent";

export const metadata: Metadata = createMetadata("fr", {
  title: "Création de site internet, SEO et référencement IA | MKZ",
  description:
    "Sites internet, SEO et référencement IA pour artisans, commerçants et TPE. Être trouvé sur Google et cité par ChatGPT. Audit gratuit de 30 minutes.",
  path: "/",
});

// Accueil à la nouvelle charte (maquette codée du 18/10/2026), intégré le 19/10/2026.
// L'ancien accueil (HomeContent, Hero) reste dans le dépôt tant que celui-ci n'est pas validé.
export default function Home() {
  preload("/fonts/montserrat-latin-var.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/inter-latin-var.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/vendor/gsap/3.13.0/gsap.min.js", { as: "script" });
  preload("/vendor/gsap/3.13.0/ScrollTrigger.min.js", { as: "script" });

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
