import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import MentionsContent from "@/components/MentionsContent";

export const metadata: Metadata = createMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site MKZ. SAS à associé unique, SIRET 983 662 784 00013, RCS Meaux.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://mkz-consulting.fr/mentions-legales/" },
});

export default function MentionsLegalesPage() {
  return <MentionsContent />;
}
