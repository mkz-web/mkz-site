"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const PageHeader = styled.section`padding: 96px 24px 64px; text-align: center; max-width: 1280px; margin: 0 auto;`;
const Tag = styled.span`font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${theme.colors.accent};`;
const Title = styled.h1`font-size: 40px; font-weight: 700; margin-top: 12px; @media (min-width: ${theme.breakpoints.md}) { font-size: 48px; }`;
const Subtitle = styled.p`margin-top: 16px; max-width: 640px; margin-left: auto; margin-right: auto; color: ${theme.colors.textSecondary}; line-height: 1.7;`;
const Container = styled.div`max-width: 800px; margin: 0 auto; padding: 0 24px;`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 64px;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const PhotoWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: ${theme.radius.xl};
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: ${theme.shadows.lg};
  border: 3px solid ${theme.colors.surface};
`;

const BioContent = styled.div`flex: 1;`;
const BioName = styled.h2`font-size: 24px; font-weight: 700; margin-bottom: 4px;`;
const BioRole = styled.p`font-size: 14px; color: ${theme.colors.accent}; font-weight: 600; margin-bottom: 16px;`;
const BioText = styled.p`font-size: 15px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 16px;`;
const TagsRow = styled.div`display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px;`;
const TagItem = styled.span`padding: 6px 14px; font-size: 13px; border-radius: ${theme.radius.full}; background: ${theme.colors.hoverSurface}; color: ${theme.colors.textSecondary}; border: 1px solid ${theme.colors.border};`;

const ArgsGrid = styled.div`
  display: grid; gap: 24px; margin-top: 64px; margin-bottom: 96px;
  @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }
`;

const ArgCard = styled.div`padding: 24px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm};`;
const ArgIcon = styled.div`font-size: 24px; margin-bottom: 8px;`;
const ArgTitle = styled.h3`font-size: 15px; font-weight: 600; margin-bottom: 4px;`;
const ArgDesc = styled.p`font-size: 13px; color: ${theme.colors.textSecondary};`;

const CTASection = styled.section`padding: 96px 24px; text-align: center; background: ${theme.colors.surface}; border-top: 1px solid ${theme.colors.border};`;

const args = [
  { icon: "\uD83D\uDCCD", title: "Bas\u00e9 en \u00cele-de-France", desc: "Dammartin-en-Go\u00eble (77)" },
  { icon: "\u26A1", title: "Disponible & r\u00e9actif", desc: "R\u00e9ponse sous 24h garantie" },
  { icon: "\uD83D\uDD11", title: "Solutions cl\u00e9 en main", desc: "De A \u00e0 Z, je g\u00e8re tout" },
  { icon: "\uD83D\uDCCA", title: "Reporting transparent", desc: "Vous voyez vos r\u00e9sultats" },
];

export default function AboutContent() {
  return (
    <>
      <PageHeader>
        <Tag>&Agrave; propos</Tag>
        <Title>Micka&euml;l Leclerc</Title>
        <Subtitle>Pr&eacute;sident de MKZ &mdash; Ing&eacute;nieur IT, +20 ans d&rsquo;exp&eacute;rience</Subtitle>
      </PageHeader>

      <Container>
        <ProfileSection>
          <PhotoWrapper>
            <Image
              src="/images/mickael-leclerc.jpg"
              alt="Micka&euml;l Leclerc - Fondateur de MKZ"
              width={200}
              height={200}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              priority
            />
          </PhotoWrapper>
          <BioContent>
            <BioName>Micka&euml;l Leclerc</BioName>
            <BioRole>Ing&eacute;nieur IT | Expert SEO | Automatisation | DevOps</BioRole>
            <BioText>
              Apr&egrave;s plus de 20 ans dans les grandes entreprises &mdash; infrastructure,
              automatisation, syst&egrave;mes complexes &mdash; j&rsquo;ai voulu mettre cette expertise
              technique au service des entrepreneurs qui n&rsquo;ont ni le temps ni les moyens
              des grands groupes.
            </BioText>
            <BioText>
              <strong>Ma promesse :</strong> des solutions professionnelles, un langage simple,
              et des r&eacute;sultats mesurables. Pas de blabla, que du concret. Je g&egrave;re tout
              de A &agrave; Z pour que vous puissiez vous concentrer sur ce que vous faites de
              mieux : votre m&eacute;tier.
            </BioText>
            <BioText>
              Que vous soyez artisan, commer&ccedil;ant, coach ou profession lib&eacute;rale,
              je comprends vos enjeux et je m&rsquo;adapte &agrave; votre r&eacute;alit&eacute;.
            </BioText>
            <TagsRow>
              {["Ing\u00e9nieur IT", "Expert SEO", "Automatisation", "DevOps"].map((t) => (
                <TagItem key={t}>{t}</TagItem>
              ))}
            </TagsRow>
          </BioContent>
        </ProfileSection>

        <ArgsGrid>
          {args.map((a) => (
            <ArgCard key={a.title}>
              <ArgIcon>{a.icon}</ArgIcon>
              <ArgTitle>{a.title}</ArgTitle>
              <ArgDesc>{a.desc}</ArgDesc>
            </ArgCard>
          ))}
        </ArgsGrid>
      </Container>

      <CTASection>
        <Title as="h2" style={{ fontSize: 32 }}>Envie d&rsquo;en discuter ?</Title>
        <Subtitle>R&eacute;servez un cr&eacute;neau de 30 min. C&rsquo;est gratuit et sans engagement.</Subtitle>
        <div style={{ marginTop: 32 }}>
          <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
        </div>
      </CTASection>
    </>
  );
}
