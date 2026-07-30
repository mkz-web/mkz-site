import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { personSchemaEn } from "@/lib/JsonLd";
import { breadcrumbSchema, SITE } from "@/lib/schema";
import AboutContentEn from "@/components/en/AboutContentEn";

export const metadata: Metadata = createMetadata("en", {
  title: "Mickaël Leclerc: French SEO & AI search consultant",
  description:
    "Native French SEO consultant based near Paris, 20+ years as an IT engineer. Who does the work on your French market, how it is measured, and what is never promised.",
  path: "/en/about/",
});

// ProfilePage : signale explicitement aux moteurs (et aux moteurs de réponse)
// que cette page EST la page d'entité de Mickaël Leclerc. C'est la page E-E-A-T
// citée quand une IA doit attribuer une affirmation à quelqu'un.
const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE}/en/about/#profilepage`,
  url: `${SITE}/en/about/`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE}/#website` },
  mainEntity: { "@id": `${SITE}/#mickael-leclerc` },
};

export default function EnAboutPage() {
  return (
    <>
      <JsonLd data={personSchemaEn} />
      <JsonLd data={profileSchema} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Home", url: "/en/" }, { name: "About" }])}
      />
      <AboutContentEn />
    </>
  );
}
