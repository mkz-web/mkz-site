import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  articlesByCategory,
  articleUrl,
  categoriesEn,
  categoryUrl,
  formatDateEn,
  getCategory,
} from "@/lib/articles";
import type { CategorySlug } from "@/lib/articles/types";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import CategoryContent from "@/components/conseils/CategoryContent";

export function generateStaticParams() {
  return categoriesEn.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category, "en");
  if (!cat) return {};
  return createMetadata("en", {
    title: cat.metaTitle,
    description: cat.metaDescription,
    path: categoryUrl(cat.slug, "en"),
  });
}

export default async function EnCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category, "en");
  if (!cat) notFound();

  const list = articlesByCategory(cat.slug as CategorySlug, "en");
  const url = categoryUrl(cat.slug, "en");
  const lastModified = list.length
    ? list.map((a) => a.dateModified).sort().at(-1)
    : undefined;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: cat.title,
          description: cat.metaDescription,
          url,
          dateModified: lastModified,
          locale: "en",
        })}
      />
      {list.length > 0 && (
        <JsonLd data={articleListSchema(list, { name: cat.title, url })} />
      )}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/en/" },
          { name: "Insights", url: "/en/insights/" },
          { name: cat.name },
        ])}
      />
      <CategoryContent
        locale="en"
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
          dateLabel: formatDateEn(a.datePublished),
          readingMinutes: a.readingMinutes,
        }))}
      />
    </>
  );
}
