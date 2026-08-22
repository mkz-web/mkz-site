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
const Inner = styled.div`max-width: 680px; margin: 0 auto;`;

// Rappel d'action à mi-parcours et avant la FAQ, porté par le GABARIT : mesuré le 21/08/2026,
// un pilier pouvait enchaîner 8 800 caractères (10 écrans mobiles) sans aucun lien d'action,
// et sa FAQ en ajoutait 6 600 avant le bloc final. Règle parcours de livraison-web : jamais
// plus de 8 000 caractères sans action (erreur), 5 000 souhaités.
const MidCta = styled.aside`
  margin: 36px 0 8px;
  padding: 20px 22px;
  border: 1px solid ${theme.colors.borderInk};
  border-left: 4px solid ${theme.colors.ctaInk};
  background: ${theme.colors.surface};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 22px;
  p { flex: 1 1 260px; margin: 0; font-size: 15.5px; line-height: 1.55; }
  small { display: block; margin-top: 4px; font-size: 13.5px; color: ${theme.colors.textSecondary}; a { color: ${theme.colors.accent}; font-weight: 600; } }
`;

// Découpe la liste de blocs à chaque titre de section qui suit ~4 000 caractères de texte
// cumulés depuis la coupe précédente (≈ 5 écrans mobiles), au plus `maxCoupes` fois, pour y
// glisser un rappel d'action. Mesuré le 21/08/2026 : avec une seule coupe, un pilier de
// 15 000 caractères gardait 6 100 px (7,5 écrans) entre deux rappels.
function decouperBlocs(blocks: PillarData["blocks"], seuil: number, maxCoupes: number): PillarData["blocks"][] {
  const morceaux: PillarData["blocks"][] = [];
  let debut = 0, cumul = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i] as { type: string };
    if (cumul >= seuil && (b.type === "h2" || b.type === "h3") && i > debut && morceaux.length < maxCoupes) {
      morceaux.push(blocks.slice(debut, i));
      debut = i;
      cumul = 0;
    }
    cumul += JSON.stringify(blocks[i]).length;
  }
  morceaux.push(blocks.slice(debut));
  return morceaux;
}

// Sommaire ancré : un pilier fait 10 000 à 16 000 caractères (13 à 20 écrans mobiles) ;
// règle parcours de livraison-web : sommaire au-delà de 10 000 (erreur au-delà de 16 000).
// Construit depuis les titres h2 du contenu, ids générés quand le contenu n'en porte pas.
const Toc = styled.nav`
  margin: 0 0 32px;
  padding: 16px 20px 18px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surfaceAlt};
  p { margin: 0 0 8px; font-family: ${theme.fonts.mono}; font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase; color: ${theme.colors.textSecondary}; }
  ol { margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 6px; }
  li { font-size: 14.5px; line-height: 1.45; }
  a { color: ${theme.colors.accent}; text-decoration: none; &:hover { text-decoration: underline; } }
`;

function slugDe(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";
}

// Pose un id sur chaque h2 qui n'en a pas, unique dans la page, et rend la liste des sections.
function titrerBlocs(blocks: PillarData["blocks"]): { blocs: PillarData["blocks"]; sections: { id: string; text: string }[] } {
  const vus: Record<string, number> = {};
  const sections: { id: string; text: string }[] = [];
  const blocs = blocks.map((b) => {
    if (b.type !== "h2") return b;
    let id = b.id || slugDe(b.text);
    vus[id] = (vus[id] || 0) + 1;
    if (vus[id] > 1) id = id + "-" + vus[id];
    sections.push({ id, text: b.text });
    return { ...b, id };
  });
  return { blocs, sections };
}

const FaqSection = styled.section`
  max-width: 680px;
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
  const { blocs, sections } = titrerBlocs(data.blocks);
  // ~3 000 caractères de blocs ≈ 4 à 5 écrans mobiles (mesuré le 21/08/2026 : 4 000 donnaient
  // encore 6 200 px entre deux actions sur /referencement-ia/). Chaque rappel cite le titre de
  // la section qu'il précède : contextuel pour le lecteur, et jamais deux blocs identiques.
  const morceaux = decouperBlocs(blocs, 3000, 8);
  const titreDe = (bloc: PillarData["blocks"]) => {
    const b = bloc[0] as { type: string; text?: string };
    return b && typeof b.text === "string" ? b.text.replace(/\s*[?:.!]+\s*$/, "") : "";
  };
  const rappelDe = (texte: string) => (
    <MidCta>
      <p>
        {texte}
        <small>
          {t.pillar.fallbackPrefix} <a href={t.header.phoneHref}>{t.header.phoneLabel}</a>. {t.pillar.fallbackSuffix}
        </small>
      </p>
      <Button href={CALENDLY}>{t.pillar.ctaPrimary}</Button>
    </MidCta>
  );
  const rappelFaq = rappelDe(t.pillar.preFaqCtaText);

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
          {sections.length >= 3 && (
            <Toc aria-label={t.article.tocTitle}>
              <p>{t.article.tocTitle}</p>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}><a href={"#" + s.id}>{s.text}</a></li>
                ))}
                {data.faq.length > 0 && <li><a href="#faq">{t.pillar.faqTitle}</a></li>}
              </ol>
            </Toc>
          )}
          {morceaux.map((bloc, i) => (
            <div key={i}>
              {i > 0 && rappelDe(t.pillar.midCtaBefore + titreDe(bloc) + t.pillar.midCtaAfter)}
              <BlocksRenderer blocks={bloc} locale={locale} />
            </div>
          ))}
        </Inner>

        {data.faq.length > 0 && (
          <FaqSection id="faq">
            <Inner>{rappelFaq}</Inner>
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
