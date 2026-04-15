"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import ContactForm from "@/components/ContactForm";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const PageHeader = styled.section`padding: 96px 24px 64px; text-align: center; max-width: 1280px; margin: 0 auto;`;
const Tag = styled.span`font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${theme.colors.accent};`;
const Title = styled.h1`font-size: 40px; font-weight: 700; margin-top: 12px; @media (min-width: ${theme.breakpoints.md}) { font-size: 48px; }`;
const Subtitle = styled.p`margin-top: 16px; max-width: 640px; margin-left: auto; margin-right: auto; color: ${theme.colors.textSecondary}; line-height: 1.7;`;

const ContentGrid = styled.div`
  display: grid; gap: 48px; padding: 0 24px 96px; max-width: 1280px; margin: 0 auto;
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: 2fr 1fr; }
`;

const FormCard = styled.div`padding: 32px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm};`;
const InfoCard = styled.div`padding: 24px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm};`;
const InfoIcon = styled.div`font-size: 20px; margin-bottom: 12px;`;
const InfoLabel = styled.h3`font-size: 14px; font-weight: 600;`;
const InfoValue = styled.p`font-size: 14px; color: ${theme.colors.textSecondary}; margin-top: 4px;`;
const InfoLink = styled.a`font-size: 14px; color: ${theme.colors.accent}; text-decoration: none; display: block; margin-top: 4px; &:hover { text-decoration: underline; }`;

const CalendlyCard = styled.a`
  display: block; padding: 24px; border-radius: ${theme.radius.lg};
  background: ${theme.colors.accent}0D; border: 1px solid ${theme.colors.accent}33;
  text-decoration: none; transition: all 0.2s;
  &:hover { background: ${theme.colors.accent}1A; }
`;
const CalendlyTitle = styled.div`font-size: 15px; font-weight: 600; color: ${theme.colors.accent}; margin-bottom: 4px;`;
const CalendlyDesc = styled.div`font-size: 13px; color: ${theme.colors.textSecondary};`;

export default function ContactContent() {
  return (
    <>
      <PageHeader>
        <Tag>Contact</Tag>
        <Title>Parlons de votre projet</Title>
        <Subtitle>
          Remplissez le formulaire ci-dessous ou contactez-moi directement. Je r&eacute;ponds sous 24h.
        </Subtitle>
      </PageHeader>

      <ContentGrid>
        <FormCard><ContactForm /></FormCard>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <CalendlyCard href={CALENDLY} target="_blank" rel="noopener noreferrer">
            <CalendlyTitle>&#128197; R&eacute;server un cr&eacute;neau</CalendlyTitle>
            <CalendlyDesc>Audit gratuit de 30 min &mdash; sans engagement</CalendlyDesc>
          </CalendlyCard>
          <InfoCard>
            <InfoIcon>&#128222;</InfoIcon>
            <InfoLabel>T&eacute;l&eacute;phone</InfoLabel>
            <InfoLink href="tel:0769093909">07 69 09 39 09</InfoLink>
          </InfoCard>
          <InfoCard>
            <InfoIcon>&#9993;</InfoIcon>
            <InfoLabel>Email</InfoLabel>
            <InfoLink href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</InfoLink>
          </InfoCard>
          <InfoCard>
            <InfoIcon>&#128205;</InfoIcon>
            <InfoLabel>Adresse</InfoLabel>
            <InfoValue>1 rue Fran&ccedil;oise Sagan</InfoValue>
            <InfoValue>77230 Dammartin-en-Go&euml;le</InfoValue>
            <InfoLink href="https://maps.app.goo.gl/8afecUcXiR92QEAm6" target="_blank" rel="noopener noreferrer">
              Voir sur Google Maps &rarr;
            </InfoLink>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Horaires</InfoLabel>
            <InfoValue>Lundi - Vendredi : 9h - 18h</InfoValue>
            <InfoValue>R&eacute;ponse sous 24h garantie</InfoValue>
          </InfoCard>
        </div>
      </ContentGrid>
    </>
  );
}
