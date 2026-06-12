"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const PageHeader = styled.section`
  padding: 96px 24px 56px;
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
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${theme.colors.accent};
`;

const Subtitle = styled.p`
  margin-top: 18px;
  max-width: 56ch;
  color: ${theme.colors.textSecondary};
  font-size: 17px;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  gap: 24px;
  padding: 24px 24px 64px;
  max-width: 1280px;
  margin: 0 auto;
  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.div`
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 36px;
`;

const CardKicker = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.cta};
`;

const CardTitle = styled.h2`
  margin-top: 12px;
  font-size: 28px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const CardDesc = styled.p`
  margin-top: 14px;
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.textSecondary};
`;

const CardTags = styled.p`
  margin-top: 18px;
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  line-height: 2;
  color: ${theme.colors.textSecondary};
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  font-size: 15px;
  font-weight: 600;
  color: ${theme.colors.text};
  transition: color 0.18s ${theme.easing};

  &::after { content: "→"; transition: transform 0.18s ${theme.easing}; }
  &:hover { color: ${theme.colors.cta}; &::after { transform: translateX(5px); } }
`;

const MoreBand = styled.div`
  max-width: 1280px;
  margin: 0 auto 96px;
  padding: 0 24px;
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }
`;

const MoreCard = styled(Link)`
  display: block;
  padding: 28px 32px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surfaceAlt};
  transition: all 0.18s ${theme.easing};
  &:hover { border-color: ${theme.colors.borderInk}; }
`;

const MoreTitle = styled.span`
  display: block;
  font-family: ${theme.fonts.display};
  font-size: 19px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const MoreDesc = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const CTASection = styled.section`
  padding: 96px 24px;
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
`;

const CTAInner = styled.div`max-width: 1280px; margin: 0 auto;`;

const CTATitle = styled.h2`
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 600;
  color: ${theme.colors.textOnDark};
`;

const CTAText = styled.p`
  margin-top: 14px;
  max-width: 54ch;
  font-size: 15.5px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

export default function ServicesContent() {
  return (
    <>
      <PageHeader>
        <Kicker>Nos services</Kicker>
        <Title>Deux expertises, un objectif : du business.</Title>
        <Subtitle>
          Cr&eacute;ation de site et r&eacute;f&eacute;rencement Google se renforcent l&rsquo;un l&rsquo;autre.
          Vous pouvez commencer par l&rsquo;un, l&rsquo;autre, ou les deux.
        </Subtitle>
      </PageHeader>

      <Grid>
        <Card>
          <CardKicker>Service 01</CardKicker>
          <CardTitle>Cr&eacute;ation de site web</CardTitle>
          <CardDesc>
            Un site qui vous ressemble et qui convertit. Design sur-mesure, UX optimis&eacute;e,
            et performances au top pour transformer vos visiteurs en clients.
          </CardDesc>
          <CardTags>image de marque · direction artistique · responsive · branding · optimisation vitesse</CardTags>
          <CardLink href="/creation-site-internet/">D&eacute;couvrir la cr&eacute;ation de site internet</CardLink>
        </Card>

        <Card>
          <CardKicker>Service 02</CardKicker>
          <CardTitle>SEO &amp; r&eacute;f&eacute;rencement</CardTitle>
          <CardDesc>
            Montez sur le podium Google. Strat&eacute;gie de mots-cl&eacute;s, optimisation technique,
            contenu optimis&eacute; et netlinking pour un trafic qualifi&eacute; et durable.
          </CardDesc>
          <CardTags>audit SEO complet · strat&eacute;gie de contenu · SEO technique · cocon s&eacute;mantique · suivi mensuel</CardTags>
          <CardLink href="/referencement-seo/">D&eacute;couvrir le r&eacute;f&eacute;rencement SEO</CardLink>
        </Card>
      </Grid>

      <MoreBand>
        <MoreCard href="/agence-web-77/">
          <MoreTitle>Votre agence web en Seine-et-Marne (77)</MoreTitle>
          <MoreDesc>
            Bas&eacute;s &agrave; Dammartin-en-Go&euml;le, nous accompagnons artisans, commer&ccedil;ants
            et TPE &agrave; Meaux, Melun, Chelles et dans tout le 77.
          </MoreDesc>
        </MoreCard>
        <MoreCard href="/conseils/">
          <MoreTitle>Conseils &amp; tutoriels gratuits</MoreTitle>
          <MoreDesc>
            Guides SEO, tutoriels pas &agrave; pas (Search Console, fiche Google, WordPress)&hellip;
            Les m&eacute;thodes que nous appliquons pour nos clients, en acc&egrave;s libre.
          </MoreDesc>
        </MoreCard>
      </MoreBand>

      <CTASection>
        <CTAInner>
          <CTATitle>Un projet en t&ecirc;te ?</CTATitle>
          <CTAText>
            R&eacute;servez votre audit gratuit de 30 minutes. C&rsquo;est gratuit, sans engagement,
            et vous repartez avec un plan d&rsquo;action concret.
          </CTAText>
          <div style={{ marginTop: 32 }}>
            <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
          </div>
        </CTAInner>
      </CTASection>
    </>
  );
}
