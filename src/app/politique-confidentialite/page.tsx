import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ConfidentialiteContent from "@/components/ConfidentialiteContent";

export const metadata: Metadata = createMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site MKZ. Informations sur la collecte, l’utilisation et la protection de vos données personnelles. Conforme RGPD.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://mkz-consulting.fr/politique-confidentialite/" },
});

export default function PolitiqueConfidentialitePage() {
  return <ConfidentialiteContent />;
}
