import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import MentionsContent from "@/components/MentionsContent";

export const metadata: Metadata = createMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site MKZ. SAS à associé unique, SIRET 983 662 784 00013, RCS Meaux.",
  // Indexable volontairement (décision du 30/07/2026) : identité éditeur et hébergeur =
  // signaux d'entité (E-E-A-T) citables par les moteurs génératifs. La page est dans le
  // sitemap (src/app/sitemap.ts) : ne pas y remettre de noindex sans la sortir du sitemap.
  alternates: { canonical: "https://mkz-consulting.fr/mentions-legales/" },
});

export default function MentionsLegalesPage() {
  return <MentionsContent />;
}
