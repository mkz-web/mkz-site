import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = createMetadata({
  title: "Mickaël Leclerc — Fondateur MKZ, ingénieur IT & expert SEO",
  description:
    "Mickaël Leclerc, ingénieur IT avec +20 ans d’expérience. Création de sites web et SEO pour artisans, commerçants et indépendants. Basé en Seine-et-Marne (77), Dammartin-en-Goële.",
  alternates: { canonical: "https://mkz.fr/about/" },
});

export default function AboutPage() {
  return <AboutContent />;
}
