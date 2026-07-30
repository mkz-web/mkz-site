import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ConfidentialiteContent from "@/components/ConfidentialiteContent";

export const metadata: Metadata = createMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site MKZ. Informations sur la collecte, l’utilisation et la protection de vos données personnelles. Conforme RGPD.",
  // Indexable volontairement (décision du 30/07/2026) : cohérence avec le sitemap
  // (src/app/sitemap.ts) et signaux d'entité RGPD. Ne pas y remettre de noindex sans
  // sortir l'URL du sitemap.
  alternates: { canonical: "https://mkz-consulting.fr/politique-confidentialite/" },
});

export default function PolitiqueConfidentialitePage() {
  return <ConfidentialiteContent />;
}
