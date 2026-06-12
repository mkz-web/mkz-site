import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  AUTHOR,
  articles,
  articleUrl,
  formatDateFr,
  getArticle,
  getCategory,
  relatedArticles,
} from "@/lib/articles";
import { articleFaqSchema, articleSchema, breadcrumbSchema } from "@/lib/schema";
import ArticleRenderer from "@/components/article/ArticleRenderer";

export function generateStaticParams() {
  return articles.map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  const url = `https://mkz-consulting.fr${articleUrl(article)}`;
  return createMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url,
      siteName: "MKZ",
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [AUTHOR.name],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: article.title }],
    },
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const cat = getCategory(article.category)!;
  const faqSchema = articleFaqSchema(article);

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Conseils", url: "/conseils/" },
          { name: cat.name, url: `/conseils/${cat.slug}/` },
          { name: article.title },
        ])}
      />
      <ArticleRenderer
        article={article}
        categoryName={cat.name}
        categoryUrl={`/conseils/${cat.slug}/`}
        datePublishedLabel={formatDateFr(article.datePublished)}
        dateModifiedLabel={formatDateFr(article.dateModified)}
        related={relatedArticles(article).map((r) => ({
          title: r.title,
          url: articleUrl(r),
          categoryName: getCategory(r.category)?.name ?? r.category,
        }))}
        author={AUTHOR}
      />
    </>
  );
}
