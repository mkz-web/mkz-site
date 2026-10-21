import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { articles, categories, articlesByCategory } from "@/lib/articles";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import ConseilsCharte from "@/components/charte/pages/ConseilsCharte";
import { versCarte } from "@/components/charte/contenu";

export const metadata: Metadata = createMetadata("fr", {
  title: "Conseils & tutoriels web pour artisans, commerçants et TPE",
  description:
    "Guides SEO, référencement IA, tutoriels et création de site pour artisans, commerçants et TPE. Les méthodes appliquées chez nos clients, en accès libre.",
  path: "/conseils/",
});

export default function ConseilsPage() {
  const lastModified = articles.length
    ? articles
        .map((a) => a.dateModified)
        .sort()
        .at(-1)
    : undefined;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "Conseils & tutoriels MKZ",
          description:
            "Guides SEO, tutoriels pas à pas et conseils création de site pour artisans, commerçants et TPE.",
          url: "/conseils/",
          dateModified: lastModified,
        })}
      />
      <JsonLd
        data={articleListSchema(articles, {
          name: "Conseils & tutoriels MKZ",
          url: "/conseils/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Conseils" },
        ])}
      />
      <ConseilsCharte
        rubriques={categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
          url: `/conseils/${c.slug}/`,
          articles: articlesByCategory(c.slug).map(versCarte),
        }))}
        derniers={articles.slice(0, 3).map(versCarte)}
      />
    </>
  );
}
