import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ConfidentialiteCharte from "@/components/charte/pages/ConfidentialiteCharte";

export const metadata: Metadata = createMetadata("fr", {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site MKZ. Informations sur la collecte, l’utilisation et la protection de vos données personnelles. Conforme RGPD.",
  // Indexable volontairement (décision du 30/07/2026) : cohérence avec le sitemap
  // (src/app/sitemap.ts) et signaux d'entité RGPD. Ne pas y remettre de noindex sans
  // sortir l'URL du sitemap.
  // `path` pilote canonical ET hreflang vers /en/privacy-policy/ (src/lib/i18n.ts).
  path: "/politique-confidentialite/",
});

export default function PolitiqueConfidentialitePage() {
  return <ConfidentialiteCharte />;
}
