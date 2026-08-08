"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const PageHeader = styled.section`
  padding: 96px 24px 48px;
  max-width: 880px;
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
    background: ${theme.colors.ctaInk};
  }
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: clamp(38px, 5vw, 58px);
  font-weight: 600;
  line-height: 1.06;
  color: ${theme.colors.accent};
`;

const Subtitle = styled.p`
  margin-top: 14px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${theme.colors.textSecondary};
`;

const Container = styled.div`max-width: 880px; margin: 0 auto; padding: 0 24px;`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin: 24px 0 64px;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const PhotoWrapper = styled.div`
  width: 220px;
  flex-shrink: 0;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
`;

const PhotoCaption = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
  margin-top: 10px;
`;

const BioContent = styled.div`flex: 1;`;

const BioText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: ${theme.colors.text};
  margin-bottom: 18px;

  strong { color: ${theme.colors.accent}; }
`;

const BioLink = styled(Link)`
  color: ${theme.colors.accent};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover { text-decoration: none; }
`;

const BioTags = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  line-height: 2;
  color: ${theme.colors.textSecondary};
  border-top: 1px solid ${theme.colors.border};
  padding-top: 16px;
`;

const ArgsGrid = styled.div`
  display: grid;
  gap: 1px;
  background: ${theme.colors.border};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  margin: 0 0 96px;

  @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }
`;

const ArgCell = styled.div`
  background: ${theme.colors.surface};
  padding: 26px;
`;

const ArgNum = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.ctaInk};
`;

const ArgTitle = styled.h3`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const ArgDesc = styled.p`
  margin-top: 6px;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

const CTASection = styled.section`
  padding: 96px 24px;
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
`;

const CTAInner = styled.div`max-width: 880px; margin: 0 auto;`;

const CTATitle = styled.h2`
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 600;
  color: ${theme.colors.textOnDark};

  em { font-style: italic; color: ${theme.colors.ctaInk}; }
`;

const CTAText = styled.p`
  margin-top: 14px;
  max-width: 50ch;
  font-size: 15.5px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

const args = [
  { num: "01", title: "Basé en Île-de-France", desc: "Dammartin-en-Goële, Seine-et-Marne (77)" },
  { num: "02", title: "Disponible & réactif", desc: "Réponse sous 24 h garantie, on décroche" },
  { num: "03", title: "Clé en main", desc: "De A à Z : je gère tout, vous gardez tout" },
  { num: "04", title: "Reporting transparent", desc: "Chaque mois, vous voyez vos résultats" },
];

export default function AboutContent() {
  return (
    <>
      <PageHeader>
        <Kicker>&Agrave; propos</Kicker>
        <Title>Micka&euml;l Leclerc</Title>
        <Subtitle>Pr&eacute;sident de MKZ · ing&eacute;nieur IT, +20 ans d&rsquo;exp&eacute;rience</Subtitle>
      </PageHeader>

      <Container>
        <ProfileSection>
          <div>
            <PhotoWrapper>
              <Image
                src="/images/mickael-leclerc.jpg"
                alt="Micka&euml;l Leclerc, fondateur de MKZ"
                width={220}
                height={220}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
                priority
              />
            </PhotoWrapper>
            <PhotoCaption>Micka&euml;l Leclerc, fondateur<br />Dammartin-en-Go&euml;le (77)</PhotoCaption>
          </div>
          <BioContent>
            <BioText>
              Apr&egrave;s plus de 20 ans dans les grandes entreprises (infrastructure,
              automatisation, syst&egrave;mes complexes), j&rsquo;ai voulu mettre cette expertise
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
            {/* La page ne renvoyait vers aucune autre : elle recevait 15 liens et
                n'en rendait aucun. Trois ancres descriptives vers les piliers,
                dans une phrase qui a sa place ici de toute façon. */}
            <BioText>
              Concr&egrave;tement, j&rsquo;interviens sur trois terrains :{" "}
              <BioLink href="/creation-site-internet/">la cr&eacute;ation de site internet</BioLink>,{" "}
              <BioLink href="/referencement-seo/">le r&eacute;f&eacute;rencement naturel</BioLink> et{" "}
              <BioLink href="/referencement-ia/">le r&eacute;f&eacute;rencement IA</BioLink>, celui qui
              vous rend citable par ChatGPT et Perplexity. Le d&eacute;tail est sur la page{" "}
              <BioLink href="/services/">prestations et tarifs</BioLink>.
            </BioText>
            <BioTags>ing&eacute;nieur IT · expert SEO · automatisation · DevOps</BioTags>
          </BioContent>
        </ProfileSection>

        <ArgsGrid>
          {args.map((a) => (
            <ArgCell key={a.num}>
              <ArgNum>{a.num}</ArgNum>
              <ArgTitle>{a.title}</ArgTitle>
              <ArgDesc>{a.desc}</ArgDesc>
            </ArgCell>
          ))}
        </ArgsGrid>
      </Container>

      <CTASection>
        <CTAInner>
          <CTATitle>Envie d&rsquo;en <em>discuter</em> ?</CTATitle>
          <CTAText>R&eacute;servez un cr&eacute;neau de 30 minutes. C&rsquo;est gratuit et sans engagement.</CTAText>
          <div style={{ marginTop: 32 }}>
            <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
          </div>
        </CTAInner>
      </CTASection>
    </>
  );
}
