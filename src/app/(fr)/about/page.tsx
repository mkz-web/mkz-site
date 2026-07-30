import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = createMetadata("fr", {
  title: "Mickaël Leclerc, fondateur MKZ : ingénieur IT & expert SEO",
  description:
    "Mickaël Leclerc, ingénieur IT avec +20 ans d’expérience, fondateur de MKZ. Création de sites web et SEO pour artisans et TPE en Seine-et-Marne (77).",
  path: "/about/",
});

export default function AboutPage() {
  return <AboutContent />;
}
