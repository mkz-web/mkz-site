"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { ui, type Locale } from "@/lib/i18n";
import Button from "@/components/Button";
import { renderInline } from "@/components/article/ArticleRenderer";
import { ArticleCard, CardsGrid, type ArticleCardData } from "./cards";

export interface CategoryPageData {
  name: string;
  title: string;
  intro: string[];
  icon: string;
  pillar: { href: string; label: string };
}

const Hero = styled.header`
  padding: 88px 24px 56px;
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.surfaceAlt};
`;

const HeroInner = styled.div`max-width: 880px; margin: 0 auto;`;

const Crumbs = styled.nav`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const CrumbLink = styled(Link)`
  color: ${theme.colors.textSecondary};
  &:hover { color: ${theme.colors.accent}; text-decoration: underline; text-underline-offset: 3px; }
`;

const HeroTitle = styled.h1`
  font-size: clamp(32px, 4.5vw, 50px);
  font-weight: 600;
  line-height: 1.1;
  color: ${theme.colors.accent};
`;

const HeroIntro = styled.div`
  margin-top: 18px;
  font-size: 16px;
  line-height: 1.8;
  color: ${theme.colors.textSecondary};
  p + p { margin-top: 12px; }
`;

const Section = styled.section`padding: 56px 24px 80px;`;
const Container = styled.div`max-width: 1280px; margin: 0 auto;`;

const PillarBand = styled.div`
  max-width: 880px;
  margin: 56px auto 0;
  padding: 28px 32px;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const PillarText = styled.p`
  font-family: ${theme.fonts.display};
  font-size: 19px;
  font-weight: 600;
`;

export default function CategoryContent({
  category,
  articles,
  locale = "fr",
}: {
  category: CategoryPageData;
  articles: ArticleCardData[];
  locale?: Locale;
}) {
  const t = ui[locale];
  return (
    <>
      <Hero>
        <HeroInner>
          <Crumbs aria-label={t.article.breadcrumbAria}>
            <CrumbLink href={locale === "en" ? "/en/" : "/"}>{t.article.home}</CrumbLink>
            <span>/</span>
            <CrumbLink href={t.article.hubHref}>{t.article.hub}</CrumbLink>
            <span>/</span>
            <span>{category.name}</span>
          </Crumbs>
          <HeroTitle>{category.title}</HeroTitle>
          <HeroIntro>
            {category.intro.map((p, i) => (
              <p key={i}>{renderInline(p)}</p>
            ))}
          </HeroIntro>
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          <CardsGrid>
            {articles.map((a) => (
              <ArticleCard key={a.url} article={a} locale={locale} />
            ))}
          </CardsGrid>
          <PillarBand>
            <PillarText>{t.newsroom.pillarPrompt}</PillarText>
            <Button href={category.pillar.href}>{category.pillar.label}</Button>
          </PillarBand>
        </Container>
      </Section>
    </>
  );
}
