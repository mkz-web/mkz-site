"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import ContactForm from "@/components/ContactForm";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const PageHeader = styled.section`
  padding: 96px 24px 48px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
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
    background: ${theme.colors.cta};
  }
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 600;
  line-height: 1.08;
  color: ${theme.colors.accent};
`;

const Subtitle = styled.p`
  margin-top: 16px;
  max-width: 54ch;
  color: ${theme.colors.textSecondary};
  font-size: 16.5px;
  line-height: 1.7;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 32px;
  padding: 24px 24px 96px;
  max-width: 1280px;
  margin: 0 auto;
  align-items: start;
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: 2fr 1fr; gap: 48px; }
`;

const FormCard = styled.div`
  padding: 36px;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.md};
`;

const SideStack = styled.div`
  display: grid;
  gap: 1px;
  background: ${theme.colors.border};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
`;

const InfoCell = styled.div`
  background: ${theme.colors.surface};
  padding: 22px 24px;
`;

const InfoLabel = styled.h3`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.textSecondary};
`;

const InfoValue = styled.p`
  font-size: 14.5px;
  color: ${theme.colors.text};
  margin-top: 8px;
  line-height: 1.6;
`;

const InfoLink = styled.a`
  display: block;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.accent};
  &:hover { color: ${theme.colors.cta}; }
`;

const CalendlyCell = styled.a`
  display: block;
  background: ${theme.colors.accent};
  color: white;
  padding: 24px;
  text-decoration: none;
  transition: background 0.18s ${theme.easing};
  &:hover { background: ${theme.colors.accentLight}; }
`;

const CalendlyTitle = styled.span`
  display: block;
  font-family: ${theme.fonts.display};
  font-size: 19px;
  font-weight: 600;
`;

const CalendlyDesc = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.78);
`;

export default function ContactContent() {
  return (
    <>
      <PageHeader>
        <Kicker>Contact</Kicker>
        <Title>Parlons de votre projet.</Title>
        <Subtitle>
          Remplissez le formulaire ou contactez-moi directement. Je r&eacute;ponds sous 24 h,
          et c&rsquo;est bien moi qui d&eacute;croche.
        </Subtitle>
      </PageHeader>

      <ContentGrid>
        <FormCard><ContactForm /></FormCard>
        <SideStack>
          <CalendlyCell href={CALENDLY} target="_blank" rel="noopener noreferrer">
            <CalendlyTitle>R&eacute;server un cr&eacute;neau</CalendlyTitle>
            <CalendlyDesc>Audit gratuit de 30 min, sans engagement</CalendlyDesc>
          </CalendlyCell>
          <InfoCell>
            <InfoLabel>T&eacute;l&eacute;phone</InfoLabel>
            <InfoLink href="tel:0769093909">07 69 09 39 09</InfoLink>
          </InfoCell>
          <InfoCell>
            <InfoLabel>Email</InfoLabel>
            <InfoLink href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</InfoLink>
          </InfoCell>
          <InfoCell>
            <InfoLabel>Adresse</InfoLabel>
            <InfoValue>1 rue Fran&ccedil;oise Sagan<br />77230 Dammartin-en-Go&euml;le</InfoValue>
            <InfoLink href="https://maps.app.goo.gl/8afecUcXiR92QEAm6" target="_blank" rel="noopener noreferrer">
              Voir sur Google Maps
            </InfoLink>
          </InfoCell>
          <InfoCell>
            <InfoLabel>Horaires</InfoLabel>
            <InfoValue>Lundi - vendredi : 9h - 18h<br />R&eacute;ponse sous 24 h garantie</InfoValue>
          </InfoCell>
        </SideStack>
      </ContentGrid>
    </>
  );
}
