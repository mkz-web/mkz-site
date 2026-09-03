import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = createMetadata("fr", {
  // Retitrage du 03/09/2026 (analyse des intentions du 02/09) : « devis site
  // internet » 590/mois (+126 % sur le semestre, CPC 21 €) est l'intention la
  // plus chaude du dossier ; l'audit gratuit vit désormais sur /audit-seo/.
  title: "Devis site internet et référencement : réponse sous 24 h",
  description:
    "Devis de site internet ou de référencement : réponse sous 24 h, devis fixe écrit. Tél. 07 69 09 39 09, contact@mkz-consulting.fr, Dammartin-en-Goële (77).",
  path: "/contact/",
});

export default function ContactPage() {
  return <ContactContent />;
}
