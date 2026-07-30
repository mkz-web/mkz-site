"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import ContactForm from "@/components/ContactForm";
import { ui, CALENDLY, type Locale } from "@/lib/i18n";

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
  &:hover { color: ${theme.colors.ctaInk}; }
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

export default function ContactContent({ locale = "fr" }: { locale?: Locale }) {
  const t = ui[locale].contact;
  const phone = ui[locale].header;
  return (
    <>
      <PageHeader>
        <Kicker>{t.kicker}</Kicker>
        <Title>{t.title}</Title>
        <Subtitle>{t.subtitle}</Subtitle>
      </PageHeader>

      <ContentGrid>
        <FormCard><ContactForm locale={locale} /></FormCard>
        <SideStack>
          <CalendlyCell href={CALENDLY} target="_blank" rel="noopener noreferrer">
            <CalendlyTitle>{t.calendlyTitle}</CalendlyTitle>
            <CalendlyDesc>{t.calendlyDesc}</CalendlyDesc>
          </CalendlyCell>
          <InfoCell>
            <InfoLabel>{t.labels.phone}</InfoLabel>
            <InfoLink href={phone.phoneHref}>{phone.phoneLabel}</InfoLink>
          </InfoCell>
          <InfoCell>
            <InfoLabel>{t.labels.email}</InfoLabel>
            <InfoLink href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</InfoLink>
          </InfoCell>
          <InfoCell>
            <InfoLabel>{t.labels.address}</InfoLabel>
            <InfoValue>
              {t.addressLines.map((l, i) => (
                <span key={i}>{i > 0 && <br />}{l}</span>
              ))}
            </InfoValue>
            <InfoLink href="https://maps.app.goo.gl/8afecUcXiR92QEAm6" target="_blank" rel="noopener noreferrer">
              {t.mapsLabel}
            </InfoLink>
          </InfoCell>
          <InfoCell>
            <InfoLabel>{t.labels.hours}</InfoLabel>
            <InfoValue>
              {t.hoursLines.map((l, i) => (
                <span key={i}>{i > 0 && <br />}{l}</span>
              ))}
            </InfoValue>
          </InfoCell>
        </SideStack>
      </ContentGrid>
    </>
  );
}
