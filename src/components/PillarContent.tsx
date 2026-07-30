"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";
import {
  BlocksRenderer,
  FaqList,
  renderInline,
} from "@/components/article/ArticleRenderer";
import type { Block } from "@/lib/articles/types";
import { ui, CALENDLY, type Locale } from "@/lib/i18n";

// Gabarit des pages piliers transactionnelles, dans les deux langues
// (/creation-site-internet/, /referencement-seo/, /agence-web-77/ côté français ;
// /en/french-seo/, /en/ai-search-optimization/, /en/website-design/ côté anglais).

const Hero = styled.header`
  padding: 72px 24px 56px;
  background: ${theme.colors.accent};
  color: white;
`;
const HeroInner = styled.div`max-width: 860px; margin: 0 auto;`;
const Crumbs = styled.nav`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: rgba(246, 241, 231, 0.7);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;
const CrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  &:hover { color: white; text-decoration: underline; }
`;
const Badge = styled.span`
  display: inline-flex;
  padding: 6px 12px;
  border-radius: ${theme.radius.sm};
  border: 1.5px solid rgba(246, 241, 231, 0.5);
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
const HeroTitle = styled.h1`
  margin-top: 20px;
  font-size: clamp(34px, 4.5vw, 50px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.1;
`;
const HeroLead = styled.p`
  margin-top: 16px;
  max-width: 720px;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
  a { color: white; text-decoration: underline; text-underline-offset: 3px; }
`;
const HeroCtas = styled.div`
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`;
const HeroPhone = styled.a`
  color: white;
  font-weight: 600;
  font-size: 15px;
  &:hover { text-decoration: underline; }
`;

const Main = styled.section`padding: 24px 24px 64px;`;
const Inner = styled.div`max-width: 760px; margin: 0 auto;`;

const FaqSection = styled.section`
  max-width: 760px;
  margin: 56px auto 0;
`;
const FaqTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const FinalCta = styled.section`
  margin-top: 72px;
  padding: 72px 24px;
  background: ${theme.colors.accent};
  color: white;
  text-align: center;
`;
const FinalTitle = styled.h2`font-size: 28px; font-weight: 800; @media (min-width: ${theme.breakpoints.md}) { font-size: 34px; }`;
const FinalText = styled.p`margin: 14px auto 28px; max-width: 560px; font-size: 15.5px; line-height: 1.7; color: rgba(255,255,255,0.8);`;
const FinalFallback = styled.p`margin-top: 20px; font-size: 14px; color: rgba(255,255,255,0.7); a { color: white; font-weight: 600; &:hover { text-decoration: underline; } }`;

export interface PillarData {
  badge: string;
  title: string;
  lead: string;
  blocks: Block[];
  faq: { q: string; a: string }[];
  finalCta: { title: string; text: string; button: string };
}

export default function PillarContent({
  data,
  locale = "fr",
}: {
  data: PillarData;
  locale?: Locale;
}) {
  const t = ui[locale];
  const homeHref = locale === "en" ? "/en/" : "/";

  return (
    <>
      <Hero>
        <HeroInner>
          <Crumbs aria-label={t.pillar.breadcrumbAria}>
            <CrumbLink href={homeHref}>{t.pillar.home}</CrumbLink>
            <span>›</span>
            <span>{data.badge}</span>
          </Crumbs>
          <Badge>{data.badge}</Badge>
          <HeroTitle>{data.title}</HeroTitle>
          <HeroLead>{renderInline(data.lead)}</HeroLead>
          <HeroCtas>
            <Button href={CALENDLY}>{t.pillar.ctaPrimary}</Button>
            <HeroPhone href={t.header.phoneHref}>
              {t.pillar.phonePrefix} {t.header.phoneLabel}
            </HeroPhone>
          </HeroCtas>
        </HeroInner>
      </Hero>

      <Main>
        <Inner>
          <BlocksRenderer blocks={data.blocks} locale={locale} />
        </Inner>

        {data.faq.length > 0 && (
          <FaqSection id="faq">
            <FaqTitle>{t.pillar.faqTitle}</FaqTitle>
            <FaqList faq={data.faq} />
          </FaqSection>
        )}
      </Main>

      <FinalCta>
        <FinalTitle>{data.finalCta.title}</FinalTitle>
        <FinalText>{data.finalCta.text}</FinalText>
        <Button href={CALENDLY}>{data.finalCta.button}</Button>
        <FinalFallback>
          {t.pillar.fallbackPrefix}{" "}
          <a href={t.header.phoneHref}>{t.header.phoneLabel}</a>. {t.pillar.fallbackSuffix}
        </FinalFallback>
      </FinalCta>
    </>
  );
}
