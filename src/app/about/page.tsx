import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = createMetadata({
  title: "Micka\u00ebl Leclerc \u2014 Fondateur MKZ, ing\u00e9nieur IT & expert SEO",
  description:
    "Micka\u00ebl Leclerc, ing\u00e9nieur IT avec +20 ans d\u2019exp\u00e9rience. Cr\u00e9ation de sites web et SEO pour artisans, commer\u00e7ants et ind\u00e9pendants. Bas\u00e9 en Seine-et-Marne (77), Dammartin-en-Go\u00eble.",
  alternates: { canonical: "https://mkz.fr/about/" },
});

export default function AboutPage() {
  return <AboutContent />;
}
