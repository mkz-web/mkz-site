"use client";

// Gabarit du hub « Outils gratuits » (/outils/ et /en/tools/), créé le
// 22/08/2026. Constat mesuré ce jour-là sur l'accueil en prod à 1 280 × 720 :
// premier lien vers l'audit à 2 067 px du haut (près de trois écrans), aucun
// lien vers l'empreinte IA, aucun outil dans la barre. Le hub donne aux outils
// une entrée de barre, une page qui les présente tous, et un point d'arrivée
// pour le maillage. Le contenu éditorial de chaque langue est passé en props
// par sa page : deux discours, pas deux traductions.

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";
import { CALENDLY, ui, type Locale } from "@/lib/i18n";

export interface ToolCard {
  kicker: string;
  title: string;
  desc: string;
  /** Faits vérifiés, repris de la page de l'outil : jamais une promesse neuve. */
  facts: string[];
  cta: string;
  href: string;
  note?: string;
}

export interface ToolsPageContent {
  kicker: string;
  h1Before: string;
  h1Em: string;
  h1After: string;
  sub: string;
  /** Action du premier écran : l'outil principal, en bouton. */
  primary: { label: string; href: string };
  phonePrefix: string;
  tools: ToolCard[];
  whyTitle: string;
  whyParagraphs: string[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

const PageHeader = styled.section`
  padding: 96px 24px 40px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const Kicker = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
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
    background: ${theme.colors.ctaInk};
    flex-shrink: 0;
  }
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${theme.colors.accent};

  em {
    font-style: italic;
    color: ${theme.colors.ctaInk};
  }
`;

const Subtitle = styled.p`
  margin-top: 18px;
  max-width: 58ch;
  color: ${theme.colors.textSecondary};
  font-size: 17px;
  line-height: 1.7;
`;

const Actions = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
`;

const MetaLine = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${theme.colors.textSecondary};

  a {
    color: ${theme.colors.text};
    font-weight: 500;
    &:hover { text-decoration: underline; text-underline-offset: 3px; }
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 24px;
  padding: 24px 24px 72px;
  max-width: 1280px;
  margin: 0 auto;
  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 36px;
  box-shadow: ${theme.shadows.md};
`;

const CardKicker = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.ctaInk};
`;

const CardTitle = styled.h2`
  margin-top: 12px;
  font-size: 28px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const CardDesc = styled.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.textSecondary};
`;

const Facts = styled.ul`
  margin-top: 18px;
  padding-left: 18px;
  font-size: 15px;
  line-height: 1.7;
  color: ${theme.colors.text};

  li + li { margin-top: 4px; }
`;

const CardActions = styled.div`
  margin-top: auto;
  padding-top: 24px;
`;

const CardNote = styled.p`
  margin-top: 12px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
`;

const Why = styled.section`
  background: ${theme.colors.surfaceAlt};
  padding: 72px 24px;
`;

const WhyInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const WhyTitle = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: clamp(26px, 3.5vw, 38px);
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const WhyText = styled.p`
  margin-top: 16px;
  max-width: 64ch;
  font-size: 16.5px;
  line-height: 1.75;
  color: ${theme.colors.text};

  a {
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover { color: ${theme.colors.ctaInk}; }
  }
`;

const CtaSection = styled.section`
  padding: 96px 24px;
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
`;

const CtaInner = styled.div`max-width: 1280px; margin: 0 auto;`;

const CtaTitle = styled.h2`
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 600;
  color: ${theme.colors.textOnDark};
`;

const CtaText = styled.p`
  margin-top: 14px;
  max-width: 54ch;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

/** Mini-rendu des liens [texte](/chemin/) dans les paragraphes « pourquoi ». */
function renderLinks(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={m.index} href={m[2]}>
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function ToolsContent({
  locale,
  content,
}: {
  locale: Locale;
  content: ToolsPageContent;
}) {
  const phone = ui[locale].header;
  return (
    <>
      <PageHeader>
        <Kicker>{content.kicker}</Kicker>
        <Title>
          {content.h1Before}
          <em>{content.h1Em}</em>
          {content.h1After}
        </Title>
        <Subtitle>{content.sub}</Subtitle>
        <Actions>
          <Button href={content.primary.href}>{content.primary.label}</Button>
          <MetaLine>
            {content.phonePrefix} <a href={phone.phoneHref}>{phone.phoneLabel}</a>
          </MetaLine>
        </Actions>
      </PageHeader>

      <Grid>
        {content.tools.map((tool) => (
          <Card key={tool.href}>
            <CardKicker>{tool.kicker}</CardKicker>
            <CardTitle>{tool.title}</CardTitle>
            <CardDesc>{tool.desc}</CardDesc>
            <Facts>
              {tool.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </Facts>
            <CardActions>
              <Button href={tool.href} variant="secondary">{tool.cta}</Button>
              {tool.note && <CardNote>{tool.note}</CardNote>}
            </CardActions>
          </Card>
        ))}
      </Grid>

      <Why>
        <WhyInner>
          <WhyTitle>{content.whyTitle}</WhyTitle>
          {content.whyParagraphs.map((p, i) => (
            <WhyText key={i}>{renderLinks(p)}</WhyText>
          ))}
        </WhyInner>
      </Why>

      <CtaSection>
        <CtaInner>
          <CtaTitle>{content.ctaTitle}</CtaTitle>
          <CtaText>{content.ctaText}</CtaText>
          <div style={{ marginTop: 32 }}>
            <Button href={CALENDLY}>{content.ctaButton}</Button>
          </div>
        </CtaInner>
      </CtaSection>
    </>
  );
}
