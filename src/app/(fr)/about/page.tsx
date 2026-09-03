import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = createMetadata("fr", {
  // Retitrage du 03/09/2026 (analyse des intentions du 02/09) : « consultant seo »
  // fait +186 % sur le semestre (2 900/mois, DataForSEO) et MKZ sortait déjà en
  // position 6,6 sur « consultant seo 77 » sans jamais écrire le mot.
  title: "Mickaël Leclerc, consultant SEO en Seine-et-Marne (MKZ)",
  description:
    "Mickaël Leclerc, consultant SEO et ingénieur IT (+20 ans), fondateur de MKZ à Dammartin-en-Goële. Sites internet et référencement pour artisans et TPE du 77.",
  path: "/about/",
});

export default function AboutPage() {
  return <AboutContent />;
}
