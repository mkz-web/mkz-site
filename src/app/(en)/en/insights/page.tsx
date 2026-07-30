import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  articlesEn,
  articlesByCategory,
  articleUrl,
  categoriesEn,
  categoryUrl,
  formatDateEn,
} from "@/lib/articles";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import ConseilsContent from "@/components/conseils/ConseilsContent";

const PATH = "/en/insights/";

export const metadata: Metadata = createMetadata("en", {
  title: "Insights: French SEO and AI search, measured",
  description:
    "Field notes on ranking in France and getting cited by AI answers, written from inside the French market, with the figures behind each claim and the date measured.",
  path: PATH,
});

export default function EnInsightsPage() {
  const lastModified = articlesEn.length
    ? articlesEn.map((a) => a.dateModified).sort().at(-1)
    : undefined;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "Insights: French SEO and AI search",
          description:
            "Guides on ranking in France and getting cited by AI answers, with measured figures and dates.",
          url: PATH,
          dateModified: lastModified,
          locale: "en",
        })}
      />
      {articlesEn.length > 0 && (
        <JsonLd
          data={articleListSchema(articlesEn, { name: "MKZ insights", url: PATH })}
        />
      )}
      <JsonLd
        data={breadcrumbSchema([{ name: "Home", url: "/en/" }, { name: "Insights" }])}
      />
      <ConseilsContent
        locale="en"
        categories={categoriesEn.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
          icon: c.icon,
          url: categoryUrl(c.slug, "en"),
          count: articlesByCategory(c.slug, "en").length,
        }))}
        latest={articlesEn.map((a) => ({
          title: a.title,
          excerpt: a.excerpt,
          url: articleUrl(a),
          categoryName: categoriesEn.find((c) => c.slug === a.category)?.name ?? a.category,
          dateLabel: formatDateEn(a.datePublished),
          readingMinutes: a.readingMinutes,
        }))}
      />
    </>
  );
}
