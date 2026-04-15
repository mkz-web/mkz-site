"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const PageHeader = styled.section`padding: 96px 24px 64px; text-align: center; max-width: 1280px; margin: 0 auto;`;
const Tag = styled.span`font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${theme.colors.accent};`;
const Title = styled.h1`font-size: 40px; font-weight: 700; margin-top: 12px; @media (min-width: ${theme.breakpoints.md}) { font-size: 48px; }`;
const Subtitle = styled.p`margin-top: 16px; max-width: 640px; margin-left: auto; margin-right: auto; color: ${theme.colors.textSecondary}; line-height: 1.7;`;

const Grid = styled.div`display: grid; gap: 32px; padding: 0 24px 96px; max-width: 1280px; margin: 0 auto; @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }`;
const Card = styled.div`padding: 40px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm};`;
const CardIcon = styled.div`font-size: 36px; margin-bottom: 16px;`;
const CardTitle = styled.h2`font-size: 24px; font-weight: 700; margin-bottom: 16px;`;
const CardDesc = styled.p`font-size: 15px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 24px;`;
const TagsRow = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const TagItem = styled.span`padding: 6px 14px; font-size: 13px; border-radius: ${theme.radius.full}; background: ${theme.colors.hoverSurface}; color: ${theme.colors.textSecondary}; border: 1px solid ${theme.colors.border};`;

const CTASection = styled.section`padding: 96px 24px; text-align: center; background: ${theme.colors.surface}; border-top: 1px solid ${theme.colors.border};`;

export default function ServicesContent() {
  return (
    <>
      <PageHeader>
        <Tag>Nos solutions</Tag>
        <Title>Des services pens&eacute;s pour vous</Title>
        <Subtitle>
          Deux expertises compl&eacute;mentaires pour une pr&eacute;sence digitale qui g&eacute;n&egrave;re du business.
        </Subtitle>
      </PageHeader>

      <Grid>
        <Card>
          <CardIcon>&#128187;</CardIcon>
          <CardTitle>Cr&eacute;ation de Site Web</CardTitle>
          <CardDesc>
            Un site qui vous ressemble et qui convertit. Design sur-mesure, UX optimis&eacute;e,
            et performances au top pour transformer vos visiteurs en clients.
          </CardDesc>
          <TagsRow>
            {["Image de marque", "Direction artistique", "Responsive design", "Branding complet", "Optimisation vitesse"].map((t) => (
              <TagItem key={t}>{t}</TagItem>
            ))}
          </TagsRow>
        </Card>

        <Card>
          <CardIcon>&#128269;</CardIcon>
          <CardTitle>SEO &amp; R&eacute;f&eacute;rencement</CardTitle>
          <CardDesc>
            Montez sur le podium Google. Strat&eacute;gie de mots-cl&eacute;s, optimisation technique,
            contenu optimis&eacute; et netlinking pour un trafic qualifi&eacute; et durable.
          </CardDesc>
          <TagsRow>
            {["Audit SEO complet", "Strat\u00e9gie de contenu", "SEO technique", "Cocon s\u00e9mantique", "Suivi mensuel"].map((t) => (
              <TagItem key={t}>{t}</TagItem>
            ))}
          </TagsRow>
        </Card>
      </Grid>

      <CTASection>
        <Title as="h2" style={{ fontSize: 32 }}>Un projet en t&ecirc;te ?</Title>
        <Subtitle>R&eacute;servez votre audit gratuit de 30 minutes. C&rsquo;est gratuit et sans engagement.</Subtitle>
        <div style={{ marginTop: 32 }}>
          <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
        </div>
      </CTASection>
    </>
  );
}
