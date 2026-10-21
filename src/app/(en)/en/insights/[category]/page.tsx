import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  articlesByCategory,
  categoriesEn,
  categoryUrl,
  getCategory,
} from "@/lib/articles";
import type { CategorySlug } from "@/lib/articles/types";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import RubriqueCharte from "@/components/charte/pages/RubriqueCharte";
import { versCarte } from "@/components/charte/contenu";

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
      <RubriqueCharte
        locale="en"
        slug={cat.slug}
        url={url}
        name={cat.name}
        title={cat.title}
        intro={cat.intro}
        pillar={cat.pillar}
        articles={list.map(versCarte)}
        autres={categoriesEn
          .filter((c) => c.slug !== cat.slug)
          .map((c) => ({ slug: c.slug, name: c.name, url: categoryUrl(c.slug, "en"), count: articlesByCategory(c.slug, "en").length }))}
      />
    </>
  );
}
