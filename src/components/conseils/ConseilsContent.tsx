"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
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
  padding: 72px 24px 56px;
  background: ${theme.colors.accent};
  color: white;
  text-align: center;
`;
const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  @media (min-width: ${theme.breakpoints.md}) { font-size: 46px; }
`;
const HeroSub = styled.p`
  margin: 16px auto 0;
  max-width: 680px;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
`;

const Section = styled.section`padding: 64px 24px;`;
const Container = styled.div`max-width: 1280px; margin: 0 auto;`;

const CatGrid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(3, 1fr); }
`;
const CatCard = styled(Link)`
  display: block;
  padding: 32px;
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.25s;
  &:hover { box-shadow: ${theme.shadows.lg}; transform: translateY(-3px); border-color: ${theme.colors.cta}40; }
`;
const CatIcon = styled.div`font-size: 32px;`;
const CatName = styled.h2`margin-top: 14px; font-size: 19px; font-weight: 700; color: ${theme.colors.text};`;
const CatDesc = styled.p`margin-top: 10px; font-size: 14px; line-height: 1.7; color: ${theme.colors.textSecondary};`;
const CatCount = styled.span`display: inline-block; margin-top: 14px; font-size: 13px; font-weight: 600; color: ${theme.colors.accentLight};`;

const GroupTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: 28px;
  color: ${theme.colors.text};
`;

const CtaBand = styled.section`
  padding: 72px 24px;
  background: ${theme.colors.accent};
  color: white;
  text-align: center;
`;
const CtaTitle = styled.h2`font-size: 28px; font-weight: 800; @media (min-width: ${theme.breakpoints.md}) { font-size: 34px; }`;
const CtaText = styled.p`margin: 14px auto 28px; max-width: 560px; font-size: 15.5px; line-height: 1.7; color: rgba(255,255,255,0.8);`;

export default function ConseilsContent({
  categories,
  latest,
}: {
  categories: CategoryCardData[];
  latest: ArticleCardData[];
}) {
  return (
    <>
      <Hero>
        <HeroTitle>Conseils &amp; tutoriels</HeroTitle>
        <HeroSub>
          Guides pratiques, tutoriels pas &agrave; pas et conseils SEO pour artisans,
          commer&ccedil;ants et TPE. Les m&ecirc;mes m&eacute;thodes que nous appliquons
          pour nos clients — en acc&egrave;s libre.
        </HeroSub>
      </Hero>

      <Section>
        <Container>
          <GroupTitle>Explorez par th&eacute;matique</GroupTitle>
          <CatGrid>
            {categories.map((c) => (
              <CatCard key={c.slug} href={c.url}>
                <CatIcon aria-hidden>{c.icon}</CatIcon>
                <CatName>{c.name}</CatName>
                <CatDesc>{c.description}</CatDesc>
                <CatCount>{c.count} article{c.count > 1 ? "s" : ""} →</CatCount>
              </CatCard>
            ))}
          </CatGrid>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <GroupTitle>Derniers articles</GroupTitle>
          <CardsGrid>
            {latest.map((a) => (
              <ArticleCard key={a.url} article={a} />
            ))}
          </CardsGrid>
        </Container>
      </Section>

      <CtaBand>
        <CtaTitle>Besoin d&apos;un coup de main ?</CtaTitle>
        <CtaText>
          R&eacute;servez un audit gratuit de 30 minutes : on analyse votre visibilit&eacute;
          Google et on repart avec un plan d&apos;action concret, que vous travailliez
          avec nous ou non.
        </CtaText>
        <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
      </CtaBand>
    </>
  );
}
