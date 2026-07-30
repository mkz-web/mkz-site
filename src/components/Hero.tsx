"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "./Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const Section = styled.section`
  padding: 88px 24px 72px;
  border-bottom: 1px solid ${theme.colors.border};

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 128px 24px 96px;
  }
`;

const Grid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  gap: 56px;
  align-items: end;

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 7fr 4fr;
    gap: 64px;
  }
`;

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
    background: ${theme.colors.ctaInk};
    flex-shrink: 0;
  }
`;

const Title = styled.h1`
  margin-top: 24px;
  font-size: clamp(42px, 6.5vw, 78px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.015em;
  color: ${theme.colors.accent};

  em {
    font-style: italic;
    font-weight: 550;
    color: ${theme.colors.ctaInk};
  }
`;

const Subtitle = styled.p`
  margin-top: 28px;
  font-size: 17.5px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  max-width: 56ch;
`;

const Actions = styled.div`
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
`;

const QuietLink = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 5px;
  transition: color 0.18s ${theme.easing};

  &:hover {
    color: ${theme.colors.accentLight};
  }
`;

const MetaLine = styled.p`
  margin-top: 36px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${theme.colors.textSecondary};

  a {
    color: ${theme.colors.text};
    font-weight: 500;
    &:hover { text-decoration: underline; text-underline-offset: 3px; }
  }
`;

/* Fiche de résultats : le bloc « devis » signature */

const Sheet = styled.aside`
  position: relative;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.lg};
  padding: 28px;
`;

const SheetLabel = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.textSecondary};
  padding-bottom: 14px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const SheetRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;

  & + & {
    border-top: 1px solid ${theme.colors.border};
  }
`;

const SheetValue = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 34px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${theme.colors.accent};
  white-space: nowrap;
`;

const SheetDesc = styled.span`
  font-size: 13.5px;
  line-height: 1.5;
  color: ${theme.colors.textSecondary};
  text-align: right;
`;

const SheetNote = styled.p`
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid ${theme.colors.border};
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
`;

const Stamp = styled.span`
  position: absolute;
  top: -16px;
  right: 18px;
  transform: rotate(-2deg);
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.ctaInk};
  background: ${theme.colors.background};
  border: 1.5px solid ${theme.colors.ctaInk};
  border-radius: ${theme.radius.sm};
  padding: 7px 12px;
`;

export default function Hero() {
  return (
    <Section>
      <Grid>
        <div>
          <Kicker>Agence web &amp; SEO · Seine-et-Marne (77)</Kicker>
          <Title>
            Votre site web <em>visible sur Google</em>, enfin.
          </Title>
          <Subtitle>
            Nous cr&eacute;ons des sites internet qui ram&egrave;nent des clients aux artisans,
            commer&ccedil;ants et TPE. Vous restez propri&eacute;taire de tout, vous voyez
            tout, et vous parlez directement &agrave; celui qui fait le travail.
          </Subtitle>
          <Actions>
            <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
            <QuietLink href="/#methode">Voir la m&eacute;thode</QuietLink>
          </Actions>
          <MetaLine>
            Dammartin-en-Go&euml;le (77) · lun-ven 9h-18h · <a href="tel:0769093909">07 69 09 39 09</a> (on d&eacute;croche)
          </MetaLine>
        </div>

        <Sheet aria-label="Résultats moyens constatés chez les clients MKZ">
          <Stamp>Devis gratuit · R&eacute;ponse 24 h</Stamp>
          <SheetLabel>R&eacute;sultats clients · 2025</SheetLabel>
          <div>
            <SheetRow>
              <SheetValue>+247&thinsp;%</SheetValue>
              <SheetDesc>de trafic organique en moyenne</SheetDesc>
            </SheetRow>
            <SheetRow>
              <SheetValue>Top 3</SheetValue>
              <SheetDesc>position moyenne sur Google</SheetDesc>
            </SheetRow>
            <SheetRow>
              <SheetValue>1,2&thinsp;s</SheetValue>
              <SheetDesc>de chargement (Core Web Vitals valid&eacute;s)</SheetDesc>
            </SheetRow>
          </div>
          <SheetNote>
            Moyennes constat&eacute;es sur +50 entreprises accompagn&eacute;es en 2025 · 97&thinsp;% de clients satisfaits
          </SheetNote>
        </Sheet>
      </Grid>
    </Section>
  );
}
