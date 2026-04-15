import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import MentionsContent from "@/components/MentionsContent";

export const metadata: Metadata = createMetadata({
  title: "Mentions l\u00e9gales",
  description:
    "Mentions l\u00e9gales du site MKZ. SAS \u00e0 associ\u00e9 unique, SIRET 983 662 784 00013, RCS Meaux.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://mkz.fr/mentions-legales/" },
});

export default function MentionsLegalesPage() {
  return <MentionsContent />;
}
