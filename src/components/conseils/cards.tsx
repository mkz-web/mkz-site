"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

// Cartes partagées entre le hub /conseils/ et les pages catégories.

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
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.25s;
  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-3px);
    border-color: ${theme.colors.cta}40;
  }
`;

const CardTag = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.cta};
`;

const CardTitle = styled.h3`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: ${theme.colors.text};
`;

const CardExcerpt = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  flex: 1;
`;

const CardMeta = styled.div`
  margin-top: 16px;
  font-size: 12.5px;
  color: ${theme.colors.textSecondary};
  display: flex;
  gap: 12px;
`;

const CardRead = styled.span`
  margin-top: 14px;
  font-size: 13.5px;
  font-weight: 600;
  color: ${theme.colors.accentLight};
`;

export function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <Card href={article.url}>
      <CardTag>{article.categoryName}</CardTag>
      <CardTitle>{article.title}</CardTitle>
      <CardExcerpt>{article.excerpt}</CardExcerpt>
      <CardMeta>
        <span>📅 {article.dateLabel}</span>
        <span>⏱️ {article.readingMinutes} min</span>
      </CardMeta>
      <CardRead>Lire l&apos;article →</CardRead>
    </Card>
  );
}

export const CardsGrid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }
`;
