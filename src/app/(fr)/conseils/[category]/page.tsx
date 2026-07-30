import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  articlesByCategory,
  articleUrl,
  categories,
  formatDateFr,
  getCategory,
} from "@/lib/articles";
import type { CategorySlug } from "@/lib/articles/types";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import CategoryContent from "@/components/conseils/CategoryContent";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return createMetadata("fr", {
    title: cat.metaTitle,
    description: cat.metaDescription,
    path: `/conseils/${cat.slug}/`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const list = articlesByCategory(cat.slug as CategorySlug);
  const url = `/conseils/${cat.slug}/`;
  const lastModified = list.length
    ? list
        .map((a) => a.dateModified)
        .sort()
        .at(-1)
    : undefined;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: cat.title,
          description: cat.metaDescription,
          url,
          dateModified: lastModified,
          locale: "fr",
        })}
      />
      <JsonLd data={articleListSchema(list, { name: cat.title, url })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Conseils", url: "/conseils/" },
          { name: cat.name },
        ])}
      />
      <CategoryContent
        category={{
          name: cat.name,
          title: cat.title,
          intro: cat.intro,
          icon: cat.icon,
          pillar: cat.pillar,
        }}
        articles={list.map((a) => ({
          title: a.title,
          excerpt: a.excerpt,
          url: articleUrl(a),
          categoryName: cat.name,
          dateLabel: formatDateFr(a.datePublished),
          readingMinutes: a.readingMinutes,
        }))}
      />
    </>
  );
}
