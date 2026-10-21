import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import {
  articlesEn,
  articlesByCategory,
  categoriesEn,
  categoryUrl,
} from "@/lib/articles";
import { articleListSchema, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import ConseilsCharte from "@/components/charte/pages/ConseilsCharte";
import { versCarte } from "@/components/charte/contenu";

const PATH = "/en/insights/";

export const metadata: Metadata = createMetadata("en", {
  title: "Insights: French SEO and AI search, measured",
  description:
    "Field notes on ranking in France and getting cited by AI answers, from inside the French market, with the figures behind each claim and the date measured.",
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
      <ConseilsCharte
        locale="en"
        rubriques={categoriesEn.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
          url: categoryUrl(c.slug, "en"),
          articles: articlesByCategory(c.slug, "en").map(versCarte),
        }))}
        derniers={articlesEn.slice(0, 3).map(versCarte)}
      />
    </>
  );
}
