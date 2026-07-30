import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  AUTHOR_EN,
  articlesEn,
  articleUrl,
  categoryUrl,
  formatDateEn,
  getArticle,
  getCategory,
  relatedArticles,
} from "@/lib/articles";
import { articleFaqSchema, articleSchema, breadcrumbSchema, SITE } from "@/lib/schema";
import ArticleRenderer from "@/components/article/ArticleRenderer";

export function generateStaticParams() {
  return articlesEn.map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug, "en");
  if (!article) return {};
  const path = articleUrl(article);
  return createMetadata("en", {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    path,
    openGraph: {
      type: "article",
      locale: "en_GB",
      url: `${SITE}${path}`,
      siteName: "MKZ",
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [AUTHOR_EN.name],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: article.title }],
    },
  });
}

export default async function EnArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(category, slug, "en");
  if (!article) notFound();

  const cat = getCategory(article.category, "en")!;
  const faq = articleFaqSchema(article);

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/en/" },
          { name: "Insights", url: "/en/insights/" },
          { name: cat.name, url: categoryUrl(cat.slug, "en") },
          { name: article.title },
        ])}
      />
      <ArticleRenderer
        locale="en"
        article={article}
        categoryName={cat.name}
        categoryUrl={categoryUrl(cat.slug, "en")}
        datePublishedLabel={formatDateEn(article.datePublished)}
        dateModifiedLabel={formatDateEn(article.dateModified)}
        related={relatedArticles(article).map((r) => ({
          title: r.title,
          url: articleUrl(r),
          categoryName: getCategory(r.category, "en")?.name ?? r.category,
        }))}
        author={AUTHOR_EN}
      />
    </>
  );
}
