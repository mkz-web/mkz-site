"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button, { baseStyles, primaryStyles } from "./Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const Section = styled.section`
  padding: 88px 24px 72px;
  border-bottom: 1px solid ${theme.colors.border};

  /* 80px et pas 128px : à 128px, le bouton principal chevauchait le pli d'un
     viewport de 720px (mesuré le 28/08/2026 : bouton de 671 à 726px). */
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 80px 24px 96px;
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

/* Formulaire de scan dans le premier écran (14/09/2026). Relevé sur 15 accueils
   d'agences et de consultants SEO (US, UK, AU, CA) : les mieux placés mettent
   l'adresse du site à saisir DANS le hero (First Rank, First Place SEO, Luca
   Tagliaferro), pas un bouton vers une page d'outil. Formulaire GET natif : il
   marche sans JavaScript et /audit-seo/?site= lance le scan à l'arrivée. */
const ScanForm = styled.form`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 600px;
`;

const ScanLabel = styled.label`
  flex: 1 1 100%;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.textSecondary};
`;

const ScanInput = styled.input`
  flex: 1 1 240px;
  min-height: 52px;
  padding: 0 16px;
  font-size: 16px;
  font-family: inherit;
  color: ${theme.colors.text};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.sm};

  &::placeholder { color: ${theme.colors.textSecondary}; opacity: 0.8; }
  &:focus { outline: 2px solid ${theme.colors.ctaInk}; outline-offset: 1px; }
`;

const ScanButton = styled.button`
  ${baseStyles}
  ${primaryStyles}
  font-family: inherit;
  min-height: 52px;
`;

const Actions = styled.div`
  margin-top: 22px;
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

/* Le portrait, à la place d'une carte-citation (14/09/2026). Mickaël : « se
   citer soi-même entre guillemets, c'est cringe ». Ce que font les consultants
   du benchmark (Adam Collins, Paul Teitelman) : la photo, le nom, et la page
   qui parle à la première personne dans le sous-titre. */
const Portrait = styled.figure`
  max-width: 340px;

  img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid ${theme.colors.borderInk};
    border-radius: ${theme.radius.lg};
    box-shadow: ${theme.shadows.lg};
  }

  figcaption {
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.5;
    color: ${theme.colors.text};
  }

  figcaption span {
    display: block;
    font-family: ${theme.fonts.mono};
    font-size: 13px;
    color: ${theme.colors.textSecondary};
  }

  figcaption a {
    display: inline-block;
    margin-top: 8px;
    font-size: 15px;
    font-weight: 600;
    color: ${theme.colors.text};
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 4px;
  }

  figcaption a:hover { color: ${theme.colors.ctaInk}; }

  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: none;
    justify-self: end;
    width: 100%;
  }
`;

export default function Hero() {
  return (
    <Section>
      <Grid>
        <div>
          <Kicker>Cr&eacute;ation de site internet &amp; r&eacute;f&eacute;rencement · Seine-et-Marne (77)</Kicker>
          {/* 14/09/2026 : le H1 porte le résultat pour le client (le téléphone qui
              sonne), comme les accueils les mieux placés du benchmark (« Get more
              buyers to your website », « Finally, an SEO company that delivers
              results »). Les mots-clés vivent dans le kicker, le sous-titre et le
              title de la page. */}
          <Title>
            Un site internet qui fait <em>sonner le t&eacute;l&eacute;phone</em>.
          </Title>
          <Subtitle>
            Visible sur Google, cit&eacute; par ChatGPT, et &agrave; vous. Je le cr&eacute;e, je le
            r&eacute;f&eacute;rence et je vous explique en fran&ccedil;ais ce que je fais. Pour les
            artisans, commer&ccedil;ants et TPE d&rsquo;&Icirc;le-de-France qui veulent des clients,
            pas un joli site qui dort.
          </Subtitle>

          <ScanForm action="/audit-seo/" method="get">
            <ScanLabel htmlFor="hero-site">O&ugrave; en est votre site ? Une minute, sans inscription.</ScanLabel>
            <ScanInput
              id="hero-site"
              name="site"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="votre-site.fr"
              required
            />
            <ScanButton type="submit">Tester mon site</ScanButton>
          </ScanForm>

          <Actions>
            <Button href={CALENDLY} variant="secondary">30 min avec Micka&euml;l, gratuites</Button>
            <QuietLink href="/tarifs/">Voir les prix</QuietLink>
          </Actions>
          <MetaLine>
            Dammartin-en-Go&euml;le (77) · lun-ven 9h-18h · <a href="tel:0769093909">07 69 09 39 09</a> (on d&eacute;croche)
          </MetaLine>
        </div>

        <Portrait>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mickael-leclerc.jpg" alt="Mickaël Leclerc, fondateur de MKZ" width={1024} height={1024} fetchPriority="high" />
          <figcaption>
            Micka&euml;l Leclerc, fondateur de MKZ
            <span>Consultant SEO &middot; Dammartin-en-Go&euml;le (77) &middot; devis gratuit, r&eacute;ponse sous 24 h</span>
            {/* Note mesurée le 14/09/2026 sur la SERP Maps en direct (cid 6891196325972723134) :
                5,0 sur 5, 5 avis. À remesurer à chaque compte rendu mensuel. */}
            <a href="https://maps.google.com/?cid=6891196325972723134" target="_blank" rel="noopener">&#9733;&nbsp;5,0 sur Google &middot; 5 avis</a>
          </figcaption>
        </Portrait>
      </Grid>
    </Section>
  );
}
