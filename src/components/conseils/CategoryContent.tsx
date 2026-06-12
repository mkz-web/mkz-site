"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
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
  padding: 64px 24px 48px;
  background: ${theme.colors.surfaceAlt};
  border-bottom: 1px solid ${theme.colors.border};
`;
const HeroInner = styled.div`max-width: 860px; margin: 0 auto;`;

const Crumbs = styled.nav`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
`;
const CrumbLink = styled(Link)`
  color: ${theme.colors.textSecondary};
  &:hover { color: ${theme.colors.accent}; text-decoration: underline; }
`;

const HeroIcon = styled.div`font-size: 36px;`;
const HeroTitle = styled.h1`
  margin-top: 12px;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${theme.colors.text};
  @media (min-width: ${theme.breakpoints.md}) { font-size: 40px; }
`;
const HeroIntro = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.8;
  color: ${theme.colors.textSecondary};
  p + p { margin-top: 12px; }
`;

const Section = styled.section`padding: 56px 24px 80px;`;
const Container = styled.div`max-width: 1280px; margin: 0 auto;`;

const PillarBand = styled.div`
  max-width: 860px;
  margin: 48px auto 0;
  padding: 28px 32px;
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.dark};
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const PillarText = styled.p`font-size: 15.5px; font-weight: 600;`;

export default function CategoryContent({
  category,
  articles,
}: {
  category: CategoryPageData;
  articles: ArticleCardData[];
}) {
  return (
    <>
      <Hero>
        <HeroInner>
          <Crumbs aria-label="Fil d'Ariane">
            <CrumbLink href="/">Accueil</CrumbLink>
            <span>›</span>
            <CrumbLink href="/conseils/">Conseils</CrumbLink>
            <span>›</span>
            <span>{category.name}</span>
          </Crumbs>
          <HeroIcon aria-hidden>{category.icon}</HeroIcon>
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
              <ArticleCard key={a.url} article={a} />
            ))}
          </CardsGrid>
          <PillarBand>
            <PillarText>Envie de d&eacute;l&eacute;guer plut&ocirc;t que de tout faire vous-m&ecirc;me ?</PillarText>
            <Button href={category.pillar.href}>{category.pillar.label}</Button>
          </PillarBand>
        </Container>
      </Section>
    </>
  );
}
