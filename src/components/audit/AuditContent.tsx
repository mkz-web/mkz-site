"use client";

// Gabarit de la page outil d'audit (/audit-seo/ et /en/seo-audit/).
// Le chrome interactif du scan vit dans AuditScan (textes : dictionnaire ui) ;
// le contenu éditorial de chaque langue est passé en props par sa page :
// deux discours, pas deux traductions.

import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/lib/theme";
import { CALENDLY, type Locale } from "@/lib/i18n";
import AuditScan from "./AuditScan";

export interface AuditFaqItem {
  q: string;
  a: string;
}

export interface AuditPageContent {
  kicker: string;
  h1Before: string;
  h1Em: string;
  h1After: string;
  sub: string;
  measuresTitle: string;
  measures: { title: string; text: string }[];
  methodTitle: string;
  methodParagraphs: string[];
  faqTitle: string;
  /** Maillage contextuel sortant : la page outil ne doit pas être un
   *  cul-de-sac (mesuré le 21/08/2026 : 0 lien sortant dans le corps). */
  nextLinks: { intro: string; links: { label: string; href: string }[] };
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

const Page = styled.div`
  background: ${theme.colors.background};
`;

const Shell = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${theme.spacing["2xl"]} ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing["3xl"]} ${theme.spacing.lg};
  }
`;

const Kicker = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.ctaInk};
`;

const H1 = styled.h1`
  margin-top: ${theme.spacing.md};
  font-family: ${theme.fonts.display};
  font-size: clamp(30px, 6vw, 48px);
  line-height: 1.15;
  color: ${theme.colors.accent};

  em {
    font-style: italic;
    color: ${theme.colors.ctaInk};
  }
`;

const Sub = styled.p`
  margin-top: ${theme.spacing.md};
  max-width: 640px;
  font-size: 17px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
`;

const ToolZone = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const H2 = styled.h2`
  margin-top: ${theme.spacing["3xl"]};
  font-family: ${theme.fonts.display};
  font-size: clamp(24px, 4vw, 32px);
  color: ${theme.colors.accent};
`;

const Cards = styled.div`
  margin-top: ${theme.spacing.lg};
  display: grid;
  gap: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
`;

const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
`;

const CardText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
`;

const Paragraph = styled.p`
  margin-top: ${theme.spacing.md};
  max-width: 700px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.text};
`;

const NextReads = styled.p`
  margin-top: ${theme.spacing.md};
  max-width: 700px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.text};

  a {
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover {
      color: ${theme.colors.ctaInk};
    }
  }
`;

const FaqList = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const FaqItem = styled.details`
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};

  summary {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  p {
    padding: 0 ${theme.spacing.lg} ${theme.spacing.md};
    font-size: 14px;
    line-height: 1.7;
    color: ${theme.colors.textSecondary};
  }
`;

const CtaBand = styled.div`
  margin-top: ${theme.spacing["3xl"]};
  background: ${theme.colors.dark};
  border: 1px solid ${theme.colors.darkBorder};
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: clamp(24px, 4vw, 32px);
  color: ${theme.colors.textOnDark};
`;

const CtaText = styled.p`
  margin: ${theme.spacing.md} auto 0;
  max-width: 560px;
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.colors.textOnDarkSecondary};
`;

const CtaButton = styled.a`
  display: inline-block;
  margin-top: ${theme.spacing.lg};
  min-height: 52px;
  padding: 14px 32px;
  background: ${theme.colors.cta};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: ${theme.radius.md};
  text-decoration: none;

  &:hover {
    background: ${theme.colors.ctaHover};
  }
`;

export default function AuditContent({
  locale,
  content,
  faq,
}: {
  locale: Locale;
  content: AuditPageContent;
  faq: AuditFaqItem[];
}) {
  return (
    <Page>
      <Shell>
        <Kicker>{content.kicker}</Kicker>
        <H1>
          {content.h1Before}
          <em>{content.h1Em}</em>
          {content.h1After}
        </H1>
        <Sub>{content.sub}</Sub>

        <ToolZone>
          <AuditScan locale={locale} />
        </ToolZone>

        <H2>{content.measuresTitle}</H2>
        <Cards>
          {content.measures.map((m) => (
            <Card key={m.title}>
              <CardTitle>{m.title}</CardTitle>
              <CardText>{m.text}</CardText>
            </Card>
          ))}
        </Cards>

        <H2>{content.methodTitle}</H2>
        {content.methodParagraphs.map((p, i) => (
          <Paragraph key={i}>{p}</Paragraph>
        ))}
        <NextReads>
          {content.nextLinks.intro}{" "}
          {content.nextLinks.links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && " · "}
              <Link href={l.href}>{l.label}</Link>
            </span>
          ))}
        </NextReads>

        <H2>{content.faqTitle}</H2>
        <FaqList>
          {faq.map((f) => (
            <FaqItem key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </FaqItem>
          ))}
        </FaqList>

        <CtaBand>
          <CtaTitle>{content.ctaTitle}</CtaTitle>
          <CtaText>{content.ctaText}</CtaText>
          <CtaButton href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">
            {content.ctaButton}
          </CtaButton>
        </CtaBand>
      </Shell>
    </Page>
  );
}
