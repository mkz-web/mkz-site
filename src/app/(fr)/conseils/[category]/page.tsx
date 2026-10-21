import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  articlesByCategory,
  categories,
  getCategory,
} from "@/lib/articles";
import type { CategorySlug } from "@/lib/articles/types";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import RubriqueCharte from "@/components/charte/pages/RubriqueCharte";
import { versCarte } from "@/components/charte/contenu";

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
      <RubriqueCharte
        slug={cat.slug}
        url={url}
        name={cat.name}
        title={cat.title}
        intro={cat.intro}
        pillar={cat.pillar}
        articles={list.map(versCarte)}
        autres={categories
          .filter((c) => c.slug !== cat.slug)
          .map((c) => ({ slug: c.slug, name: c.name, url: `/conseils/${c.slug}/`, count: articlesByCategory(c.slug).length }))}
      />
    </>
  );
}
