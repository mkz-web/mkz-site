import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemas, faqSchema } from "@/lib/JsonLd";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = createMetadata({
  title: "Cr\u00e9ation de site internet & SEO pour artisans et TPE | MKZ",
  description:
    "Votre site web visible sur Google, enfin. MKZ cr\u00e9e des sites internet professionnels et optimise votre r\u00e9f\u00e9rencement SEO. Artisans, commer\u00e7ants, ind\u00e9pendants en \u00cele-de-France et partout en France. Audit gratuit 30 min.",
  alternates: { canonical: "https://mkz.fr/" },
});

export default function Home() {
  return (
    <>
      <head>
        {serviceSchemas.map((s, i) => (
          <JsonLd key={i} data={s} />
        ))}
        <JsonLd data={faqSchema} />
      </head>
      <HomeContent />
    </>
  );
}
