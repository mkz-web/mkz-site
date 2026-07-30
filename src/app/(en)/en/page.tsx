import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd, { serviceSchemasEn, faqSchemaEn } from "@/lib/JsonLd";
import HomeContentEn from "@/components/en/HomeContentEn";

// Le suffixe « | MKZ » est ajouté par le template du layout parent : ne jamais
// l'écrire ici (sinon il apparaît deux fois). Seule /(fr)/page.tsx doit le
// porter, parce qu'une page du MÊME segment que le layout n'hérite pas du
// template Next.
export const metadata: Metadata = createMetadata("en", {
  title: "French SEO & AI search visibility consultant",
  description:
    "Make the French market work for your site. French SEO and AI search visibility run by a native French consultant near Paris. Free 30-minute review.",
  path: "/en/",
});

export default function EnHome() {
  return (
    <>
      {serviceSchemasEn.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <JsonLd data={faqSchemaEn} />
      <HomeContentEn />
    </>
  );
}
