import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { articles, categories, articlesByCategory, articleUrl, formatDateFr } from "@/lib/articles";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import ConseilsContent from "@/components/conseils/ConseilsContent";

export const metadata: Metadata = createMetadata("fr", {
  title: "Conseils & tutoriels web pour artisans, commerçants et TPE",
  description:
    "Guides SEO, tutoriels pas à pas et conseils création de site pour artisans, commerçants et TPE. Les méthodes que nous appliquons pour nos clients, en accès libre.",
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
      <ConseilsContent
        categories={categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
          icon: c.icon,
          url: `/conseils/${c.slug}/`,
          count: articlesByCategory(c.slug).length,
        }))}
        latest={articles.map((a) => ({
          title: a.title,
          excerpt: a.excerpt,
          url: articleUrl(a),
          categoryName: categories.find((c) => c.slug === a.category)?.name ?? a.category,
          dateLabel: formatDateFr(a.datePublished),
          readingMinutes: a.readingMinutes,
        }))}
      />
    </>
  );
}
