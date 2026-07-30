"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { ui, type Locale } from "@/lib/i18n";

// Cartes partagées entre les hubs /conseils/ et /en/insights/ et leurs
// pages catégories.

export interface ArticleCardData {
  title: string;
  excerpt: string;
  url: string;
  categoryName: string;
  dateLabel: string;
  readingMinutes: number;
}

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 28px;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  transition: all 0.18s ${theme.easing};

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 rgba(34, 31, 26, 0.16);

    .go { color: ${theme.colors.cta}; }
    .go::after { transform: translateX(5px); }
  }
`;

const CardTag = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.cta};
`;

const CardTitle = styled.h3`
  margin-top: 12px;
  font-family: ${theme.fonts.display};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: ${theme.colors.accent};
`;

const CardExcerpt = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  flex: 1;
`;

const CardMeta = styled.p`
  margin-top: 16px;
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  color: ${theme.colors.textSecondary};
`;

const CardRead = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text};
  transition: color 0.18s ${theme.easing};

  &::after { content: "→"; transition: transform 0.18s ${theme.easing}; }
`;

export function ArticleCard({
  article,
  locale = "fr",
}: {
  article: ArticleCardData;
  locale?: Locale;
}) {
  const t = ui[locale].article;
  return (
    <Card href={article.url}>
      <CardTag>{article.categoryName}</CardTag>
      <CardTitle>{article.title}</CardTitle>
      <CardExcerpt>{article.excerpt}</CardExcerpt>
      <CardMeta>
        {article.dateLabel} · {article.readingMinutes} {t.readingSuffix}
      </CardMeta>
      <CardRead className="go">
        {locale === "en" ? "Read the article" : "Lire l’article"}
      </CardRead>
    </Card>
  );
}

export const CardsGrid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }
`;
