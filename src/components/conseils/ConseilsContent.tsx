"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { ui, type Locale } from "@/lib/i18n";
import Button from "@/components/Button";
import { ArticleCard, CardsGrid, type ArticleCardData } from "./cards";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

export interface CategoryCardData {
  slug: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  count: number;
}

const Hero = styled.header`
  padding: 96px 24px 56px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const HeroInner = styled.div`max-width: 1280px; margin: 0 auto;`;

const Kicker = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background: ${theme.colors.cta};
  }
`;

const HeroTitle = styled.h1`
  margin-top: 20px;
  font-size: clamp(38px, 5.5vw, 64px);
  font-weight: 600;
  line-height: 1.06;
  color: ${theme.colors.accent};

  em { font-style: italic; color: ${theme.colors.cta}; }
`;

const HeroSub = styled.p`
  margin-top: 18px;
  max-width: 60ch;
  font-size: 16.5px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const Section = styled.section`padding: 64px 24px;`;
const Container = styled.div`max-width: 1280px; margin: 0 auto;`;

const GroupHead = styled.div`
  border-top: 2px solid ${theme.colors.borderInk};
  padding-top: 18px;
  margin-bottom: 32px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
`;

const GroupTitle = styled.h2`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const CatGrid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(3, 1fr); }
`;

const CatCard = styled(Link)`
  display: block;
  padding: 30px;
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

const CatCount = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.cta};
`;

const CatName = styled.h2`
  margin-top: 12px;
  font-family: ${theme.fonts.display};
  font-size: 23px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const CatDesc = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const CatGo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text};
  transition: color 0.18s ${theme.easing};

  &::after { content: "→"; transition: transform 0.18s ${theme.easing}; }
`;

const CtaBand = styled.section`
  margin-top: 32px;
  padding: 88px 24px;
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
`;

const CtaInner = styled.div`max-width: 1280px; margin: 0 auto;`;

const CtaTitle = styled.h2`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 600;
  color: ${theme.colors.textOnDark};

  em { font-style: italic; color: ${theme.colors.cta}; }
`;

const CtaText = styled.p`
  margin: 14px 0 28px;
  max-width: 54ch;
  font-size: 15.5px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

export default function ConseilsContent({
  categories,
  latest,
  locale = "fr",
}: {
  categories: CategoryCardData[];
  latest: ArticleCardData[];
  locale?: Locale;
}) {
  const t = ui[locale].newsroom;
  return (
    <>
      <Hero>
        <HeroInner>
          <Kicker>{t.kicker}</Kicker>
          <HeroTitle>
            {t.titleBefore}
            <em>{t.titleEm}</em>
            {t.titleAfter}
          </HeroTitle>
          <HeroSub>{t.sub}</HeroSub>
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          <GroupHead>
            <GroupTitle>{t.byTopic}</GroupTitle>
          </GroupHead>
          <CatGrid>
            {categories.map((c) => (
              <CatCard key={c.slug} href={c.url}>
                <CatCount>{t.articleCount(c.count)}</CatCount>
                <CatName>{c.name}</CatName>
                <CatDesc>{c.description}</CatDesc>
                <CatGo className="go">{t.explore}</CatGo>
              </CatCard>
            ))}
          </CatGrid>
        </Container>
      </Section>

      <Section style={{ paddingTop: 16 }}>
        <Container>
          <GroupHead>
            <GroupTitle>{t.latest}</GroupTitle>
          </GroupHead>
          <CardsGrid>
            {latest.map((a) => (
              <ArticleCard key={a.url} article={a} locale={locale} />
            ))}
          </CardsGrid>
        </Container>
      </Section>

      <CtaBand>
        <CtaInner>
          <CtaTitle>
            {t.ctaTitleBefore}
            <em>{t.ctaTitleEm}</em>
            {t.ctaTitleAfter}
          </CtaTitle>
          <CtaText>{t.ctaText}</CtaText>
          <Button href={CALENDLY}>{t.ctaButton}</Button>
        </CtaInner>
      </CtaBand>
    </>
  );
}
