"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Hero from "@/components/Hero";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

/* ─── Structure « chapitres » ─── */

const Section = styled.section<{ variant?: "paper" | "alt" | "dark" }>`
  padding: clamp(88px, 11vh, 144px) 24px;
  ${({ variant }) => {
    switch (variant) {
      case "dark":
        return `background: ${theme.colors.dark}; color: ${theme.colors.textOnDark};`;
      case "alt":
        return `background: ${theme.colors.surfaceAlt};`;
      default:
        return "";
    }
  }}
`;

const Container = styled.div`max-width: 1280px; margin: 0 auto;`;

const ChapterHead = styled.header<{ surSombre?: boolean }>`
  display: grid;
  gap: 16px;
  border-top: 2px solid ${({ surSombre }) => (surSombre ? "rgba(246,241,231,0.4)" : theme.colors.borderInk)};
  padding-top: 22px;
  margin-bottom: 56px;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 220px 1fr;
    gap: 32px;
  }
`;

const Kicker = styled.span<{ surSombre?: boolean }>`
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
  color: ${({ surSombre }) => (surSombre ? theme.colors.textOnDarkSecondary : theme.colors.textSecondary)};

  strong {
    color: ${({ surSombre }) => (surSombre ? theme.colors.cta : theme.colors.ctaInk)};
    font-weight: 500;
  }
`;

const ChapterTitle = styled.h2<{ surSombre?: boolean }>`
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: ${({ surSombre }) => (surSombre ? theme.colors.textOnDark : theme.colors.accent)};
`;

const ChapterLede = styled.p<{ surSombre?: boolean }>`
  margin-top: 14px;
  max-width: 60ch;
  font-size: 16px;
  line-height: 1.7;
  color: ${({ surSombre }) => (surSombre ? theme.colors.textOnDarkSecondary : theme.colors.textSecondary)};
`;

/* ─── Marquee villes (pur CSS) ─── */

const MarqueeBand = styled.div`
  overflow: hidden;
  border-bottom: 1px solid ${theme.colors.border};
  padding: 18px 0;
  background: ${theme.colors.background};
`;

const MarqueeTrack = styled.div`
  display: inline-flex;
  white-space: nowrap;
  animation: marquee 48s linear infinite;

  @keyframes marquee {
    to { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const MarqueeItem = styled.span`
  font-family: ${theme.fonts.display};
  font-style: italic;
  font-size: 22px;
  color: ${theme.colors.textSecondary};
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  gap: 36px;

  &::after {
    content: "";
    width: 7px;
    height: 7px;
    background: ${theme.colors.ctaInk};
    opacity: 0.55;
  }
`;

/* ─── Bande de preuve (chiffres) ─── */

const ProofStrip = styled.dl`
  display: grid;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  overflow: hidden;

  @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(4, 1fr); }
`;

const ProofCell = styled.div`
  padding: 28px 28px 24px;
  border-top: 1px solid ${theme.colors.border};

  @media (min-width: ${theme.breakpoints.sm}) {
    &:nth-of-type(odd) { border-right: 1px solid ${theme.colors.border}; }
    &:nth-of-type(-n + 2) { border-top: none; }
  }
  @media (min-width: ${theme.breakpoints.lg}) {
    border-top: none;
    border-right: 1px solid ${theme.colors.border};
    &:last-of-type { border-right: none; }
  }
`;

const ProofValue = styled.dd`
  font-family: ${theme.fonts.display};
  font-size: clamp(38px, 4vw, 52px);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: ${theme.colors.accent};
`;

const ProofLabel = styled.dt`
  margin-top: 12px;
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.textSecondary};
`;

const ProofNote = styled.p`
  margin-top: 16px;
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  color: ${theme.colors.textSecondary};
`;

/* ─── Problèmes (section sombre, numéraux) ─── */

const ProblemGrid = styled.div`
  display: grid;
  gap: 40px;
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); gap: 48px; }
`;

const ProblemItem = styled.div`
  border-top: 1px solid ${theme.colors.darkBorder};
  padding-top: 24px;
`;

const ProblemNum = styled.span`
  font-family: ${theme.fonts.display};
  font-style: italic;
  font-size: 44px;
  font-weight: 500;
  line-height: 1;
  color: ${theme.colors.ctaInk};
`;

const ProblemTitle = styled.h3`
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.textOnDark};
`;

const ProblemDesc = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.textOnDarkSecondary};
`;

/* ─── Services (asymétrique) ─── */

const ServicesGrid = styled.div`
  display: grid;
  gap: 40px;
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: 5fr 7fr; gap: 64px; }
`;

const ServicesAside = styled.div`
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.textSecondary};
  max-width: 46ch;

  p + p { margin-top: 14px; }
`;

const ServiceBlock = styled(Link)`
  display: block;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 32px;
  transition: all 0.18s ${theme.easing};

  & + & { margin-top: 24px; }

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 rgba(34, 31, 26, 0.16);

    .go { color: ${theme.colors.ctaInk}; }
    .go::after { transform: translateX(5px); }
  }
`;

const ServiceKicker = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.ctaInk};
`;

const ServiceTitle = styled.h3`
  margin-top: 12px;
  font-family: ${theme.fonts.display};
  font-size: 27px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const ServiceDesc = styled.p`
  margin-top: 12px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  max-width: 58ch;
`;

const ServiceTags = styled.p`
  margin-top: 18px;
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  line-height: 2;
  color: ${theme.colors.textSecondary};
`;

const ServiceGo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text};
  transition: color 0.18s ${theme.easing};

  &::after {
    content: "→";
    transition: transform 0.18s ${theme.easing};
  }
`;

/* ─── Méthode (sombre, gros numéraux) ─── */

const MethodGrid = styled.div`
  display: grid;
  gap: 40px;
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); gap: 48px; }
`;

const StepItem = styled.div`
  border-top: 1px solid ${theme.colors.darkBorder};
  padding-top: 24px;
`;

const StepNumber = styled.span`
  font-family: ${theme.fonts.display};
  font-style: italic;
  font-size: clamp(64px, 7vw, 88px);
  font-weight: 500;
  line-height: 0.9;
  color: ${theme.colors.ctaInk};
`;

const StepTitle = styled.h3`
  margin-top: 18px;
  font-size: 19px;
  font-weight: 600;
  color: ${theme.colors.textOnDark};
`;

const StepDesc = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.textOnDarkSecondary};
`;

/* ─── Témoignages : trois voix, même format ───
   Remplace la « pull quote magazine » (40 px sur 4 lignes, moitié gauche de
   l'écran) suivie de deux citations en 15,5 px : la première écrasait tout,
   les deux autres passaient pour des paragraphes. Même gabarit pour les
   trois, en 3 colonnes à partir de 1024 px, empilées en dessous. */

const QuoteGrid = styled.div`
  display: grid;
  gap: 40px;

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
  }
`;

const Quote = styled.blockquote`
  border-top: 1px solid ${theme.colors.borderInk};
  padding-top: 24px;
  max-width: 60ch;
  font-family: ${theme.fonts.display};
  font-style: italic;
  font-size: clamp(19px, 1.7vw, 22px);
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.005em;
  color: ${theme.colors.accent};
`;

const QuoteAttribution = styled.p`
  margin-top: 24px;
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.textSecondary};

  strong { color: ${theme.colors.text}; font-weight: 500; }
`;

const ResultTag = styled.span`
  display: inline-block;
  margin-top: 14px;
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.ctaInk};
  border: 1.5px solid ${theme.colors.ctaInk};
  border-radius: ${theme.radius.sm};
  padding: 6px 10px;
`;

/* ─── Différenciateurs (grille filets) ─── */

const DiffGrid = styled.div`
  display: grid;
  gap: 1px;
  background: ${theme.colors.border};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  overflow: hidden;

  @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }
`;

const DiffCell = styled.div`
  background: ${theme.colors.surface};
  padding: 32px;
`;

const DiffNum = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  font-weight: 500;
  color: ${theme.colors.ctaInk};
`;

const DiffTitle = styled.h3`
  margin-top: 12px;
  font-size: 17px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const DiffDesc = styled.p`
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

/* ─── Conseils ─── */

const ConseilGrid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }
`;

const ConseilCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 28px;
  transition: all 0.18s ${theme.easing};

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 rgba(34, 31, 26, 0.16);
    .go { color: ${theme.colors.ctaInk}; }
    .go::after { transform: translateX(5px); }
  }
`;

const ConseilKicker = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.ctaInk};
`;

const ConseilTitle = styled.h3`
  margin-top: 12px;
  font-family: ${theme.fonts.display};
  font-size: 21px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const ConseilDesc = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  flex: 1;
`;

/* ─── Zones ─── */

const ZonesText = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 13.5px;
  line-height: 2.1;
  color: ${theme.colors.textSecondary};
  max-width: 90ch;

  strong { color: ${theme.colors.text}; font-weight: 500; }
`;

const ZonesLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 5px;

  &:hover { color: ${theme.colors.accentLight}; }
`;

/* ─── CTA final ─── */

const FinalTitle = styled.h2`
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${theme.colors.textOnDark};
  max-width: 18ch;

  em {
    font-style: italic;
    color: ${theme.colors.ctaInk};
  }
`;

const FinalText = styled.p`
  margin-top: 22px;
  max-width: 54ch;
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.textOnDarkSecondary};
`;

const FinalActions = styled.div`
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
`;

const FinalMeta = styled.p`
  margin-top: 32px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${theme.colors.textOnDarkSecondary};

  a { color: ${theme.colors.textOnDark}; font-weight: 500; &:hover { text-decoration: underline; } }
`;

/* ─── DATA ─── */

const cities = ["Meaux", "Melun", "Chelles", "Dammartin-en-Goële", "Roissy", "Marne-la-Vallée", "Senlis", "Provins", "Fontainebleau", "Serris", "Mitry-Mory", "Claye-Souilly"];

const proof = [
  { value: "+247 %", label: "trafic organique moyen" },
  { value: "Top 3", label: "position moyenne Google" },
  { value: "+89 %", label: "leads qualifiés" },
  { value: "1,2 s", label: "temps de chargement" },
];

const problems = [
  { num: "01", title: "Votre site est invisible", desc: "Vous avez investi dans un beau site, mais il n'apparaît nulle part sur Google. Vos concurrents trustent les premières positions." },
  { num: "02", title: "Pas le temps pour le digital", desc: "Entre vos clients, la gestion et le reste, impossible de trouver du temps pour votre présence en ligne. Le marketing passe à la trappe." },
  { num: "03", title: "Des dépenses sans retour", desc: "Pub Facebook, Google Ads, agences... Vous avez tout essayé sans jamais voir de résultats concrets. Votre budget part en fumée." },
];

const services = [
  {
    kicker: "Service 01",
    title: "Création de site web",
    desc: "Un site qui vous ressemble et qui convertit. Design sur-mesure, UX optimisée et performances au top pour transformer vos visiteurs en clients.",
    tags: "image de marque · direction artistique · responsive · branding · optimisation vitesse",
    href: "/creation-site-internet/",
    linkLabel: "Découvrir la création de site",
  },
  {
    kicker: "Service 02",
    title: "SEO & référencement Google",
    desc: "Montez sur le podium Google. Stratégie de mots-clés, optimisation technique, contenu optimisé et netlinking pour un trafic qualifié et durable.",
    tags: "audit SEO complet · stratégie de contenu · SEO technique · cocon sémantique · suivi mensuel",
    href: "/referencement-seo/",
    linkLabel: "Découvrir le référencement SEO",
  },
];

const methodSteps = [
  { num: "01", title: "Audit gratuit", desc: "30 min pour analyser votre situation, comprendre vos objectifs et identifier les quick wins." },
  { num: "02", title: "Stratégie sur-mesure", desc: "Un plan d'action personnalisé avec des objectifs clairs, un budget défini et un planning réaliste." },
  { num: "03", title: "Résultats mesurables", desc: "Exécution, suivi mensuel avec reporting transparent. Vous voyez concrètement l'évolution." },
];

// Les mêmes cinq clients parlent dans le pilier agence-web-77 et dans
// llms-full.txt : toute retouche ici se reporte là-bas (et dans _content-staging/).
const testimonials = [
  { quote: "Moi, les sites internet, c'est pas mon truc. J'ai donné mes photos et mes tarifs, MKZ s'est occupé du reste et m'a appelé quand il manquait quelque chose. Ce que je vois, c'est que le téléphone sonne, et pour des chantiers à Meaux, pas à l'autre bout du département.", name: "Marc T.", role: "Plombier chauffagiste, Meaux", result: "8 à 10 demandes par mois" },
  { quote: "J'avais déjà payé une agence pendant un an sans jamais comprendre ce qu'elle faisait de mon argent. Cette fois, j'ai un point chaque mois, avec les positions et les demandes reçues, et je peux poser mes questions sans me sentir idiote. Deux de mes expressions sont passées en première page au bout de quatre mois. Surtout, les demandes qui arrivent correspondent enfin à mes projets.", name: "Sophie L.", role: "Architecte d'intérieur, Paris", result: "Page 1 Google en 4 mois" },
  { quote: "J'ai appelé Mickaël un mardi, le site était en ligne trois semaines plus tard, avec la réservation qui marche enfin sur téléphone. Depuis, le samedi soir se remplit presque tout seul ! Et quand j'ai une question, même pour une bêtise, il répond. Je l'ai déjà recommandé à deux collègues du coin.", name: "Pierre D.", role: "Restaurateur, Dammartin-en-Goële", result: "Réservations en ligne × 2" },
];

const differentiators = [
  { num: "01", title: "On parle français", desc: "Zéro jargon technique. Je vous explique tout simplement, vous comprenez ce qu'on fait et pourquoi. Promis." },
  { num: "02", title: "Je décroche", desc: "Une question ? Un doute ? Vous m'appelez, je réponds. Pas de ticket support, pas d'attente 72 h. On avance ensemble." },
  { num: "03", title: "Vous voyez tout", desc: "Chaque mois, un point clair sur ce qui a été fait, les résultats obtenus, et la suite. Pas de boîte noire." },
  { num: "04", title: "Vous restez libre", desc: "Votre site vous appartient, vos accès sont les vôtres. Si demain vous partez, vous partez avec tout. C'est normal." },
];

const conseils = [
  { kicker: "Tutoriels", title: "Pas à pas, avec captures", desc: "Search Console, fiche Google, WordPress : reprenez la main sur vos outils, écran par écran.", href: "/conseils/tutoriels/" },
  { kicker: "Création de site", title: "Avant d'investir", desc: "Combien coûte un site, quand le refondre, quel type choisir : les bonnes décisions, chiffrées.", href: "/conseils/creation-site-internet/" },
  { kicker: "SEO & visibilité", title: "Être trouvé sur Google", desc: "Référencement local, audit SEO, visibilité : des guides concrets, sans jargon.", href: "/conseils/seo/" },
];

/* ─── PAGE ─── */

export default function HomeContent() {
  const marqueeContent = [...cities, ...cities];

  return (
    <>
      <Hero />

      {/* Marquee villes */}
      <MarqueeBand aria-hidden>
        <MarqueeTrack>
          {marqueeContent.map((c, i) => (
            <MarqueeItem key={`${c}-${i}`}>{c}</MarqueeItem>
          ))}
        </MarqueeTrack>
      </MarqueeBand>

      {/* Preuve */}
      <Section>
        <Container>
          <ProofStrip>
            {proof.map((p) => (
              <ProofCell key={p.label}>
                <ProofValue>{p.value}</ProofValue>
                <ProofLabel>{p.label}</ProofLabel>
              </ProofCell>
            ))}
          </ProofStrip>
          <ProofNote>
            Moyennes constat&eacute;es sur les clients MKZ accompagn&eacute;s en 2025 · +50 entreprises · 97&thinsp;% de clients satisfaits
          </ProofNote>
        </Container>
      </Section>

      {/* 01. Problèmes */}
      <Section variant="dark">
        <Container>
          <ChapterHead surSombre>
            <Kicker surSombre><strong>01</strong>&ensp;Vos gal&egrave;res</Kicker>
            <div>
              <ChapterTitle surSombre>Ces probl&egrave;mes vous parlent ?</ChapterTitle>
              <ChapterLede surSombre>
                Vous n&rsquo;&ecirc;tes pas seul : la plupart des ind&eacute;pendants et petites
                entreprises butent exactement sur les m&ecirc;mes obstacles.
              </ChapterLede>
            </div>
          </ChapterHead>
          <ProblemGrid>
            {problems.map((p) => (
              <ProblemItem key={p.num}>
                <ProblemNum>{p.num}</ProblemNum>
                <ProblemTitle>{p.title}</ProblemTitle>
                <ProblemDesc>{p.desc}</ProblemDesc>
              </ProblemItem>
            ))}
          </ProblemGrid>
        </Container>
      </Section>

      {/* 02. Services */}
      <Section>
        <Container>
          <ChapterHead>
            <Kicker><strong>02</strong>&ensp;Nos services</Kicker>
            <ChapterTitle>Deux m&eacute;tiers, une mission : que votre t&eacute;l&eacute;phone sonne.</ChapterTitle>
          </ChapterHead>
          <ServicesGrid>
            <ServicesAside>
              <p>
                Pas d&rsquo;usine &agrave; sites, pas d&rsquo;options incompr&eacute;hensibles.
                Nous construisons votre vitrine, puis nous la rendons visible aupr&egrave;s
                des clients de votre zone. Les deux se renforcent.
              </p>
              <p>
                Et parce qu&rsquo;un client autonome est un client serein, nos
                m&eacute;thodes sont document&eacute;es en acc&egrave;s libre dans nos{" "}
                <Link href="/conseils/" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                  conseils &amp; tutoriels
                </Link>.
              </p>
              <p>
                Envie de savoir o&ugrave; vous en &ecirc;tes avant de nous parler ?
                Notre{" "}
                <Link href="/audit-seo/" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                  audit SEO gratuit en ligne
                </Link>{" "}
                fait 17 mesures r&eacute;elles sur votre site et vous rend un score
                sur 100. Une minute, sans inscription.
              </p>
            </ServicesAside>
            <div>
              {services.map((s) => (
                <ServiceBlock key={s.title} href={s.href}>
                  <ServiceKicker>{s.kicker}</ServiceKicker>
                  <ServiceTitle>{s.title}</ServiceTitle>
                  <ServiceDesc>{s.desc}</ServiceDesc>
                  <ServiceTags>{s.tags}</ServiceTags>
                  <ServiceGo className="go">{s.linkLabel}</ServiceGo>
                </ServiceBlock>
              ))}
            </div>
          </ServicesGrid>
        </Container>
      </Section>

      {/* 03. Méthode */}
      <Section variant="dark" id="methode">
        <Container>
          <ChapterHead surSombre>
            <Kicker surSombre><strong>03</strong>&ensp;La m&eacute;thode</Kicker>
            <div>
              <ChapterTitle surSombre>Trois &eacute;tapes, z&eacute;ro jargon.</ChapterTitle>
              <ChapterLede surSombre>
                Un accompagnement simple et transparent, du premier appel au reporting mensuel.
              </ChapterLede>
            </div>
          </ChapterHead>
          <MethodGrid>
            {methodSteps.map((s) => (
              <StepItem key={s.num}>
                <StepNumber>{s.num}</StepNumber>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </StepItem>
            ))}
          </MethodGrid>
        </Container>
      </Section>

      {/* 04. Témoignages */}
      <Section id="temoignages">
        <Container>
          <ChapterHead>
            <Kicker><strong>04</strong>&ensp;Ils en parlent</Kicker>
            <ChapterTitle>Des artisans et commer&ccedil;ants, comme vous.</ChapterTitle>
          </ChapterHead>

          <QuoteGrid>
            {testimonials.map((t) => (
              <div key={t.name}>
                <Quote>&laquo;&nbsp;{t.quote}&nbsp;&raquo;</Quote>
                <QuoteAttribution>
                  <strong>{t.name}</strong> · {t.role}
                </QuoteAttribution>
                <div><ResultTag>{t.result}</ResultTag></div>
              </div>
            ))}
          </QuoteGrid>
        </Container>
      </Section>

      {/* 05. La différence */}
      <Section variant="alt">
        <Container>
          <ChapterHead>
            <Kicker><strong>05</strong>&ensp;La diff&eacute;rence MKZ</Kicker>
            <ChapterTitle>On travaille autrement.</ChapterTitle>
          </ChapterHead>
          <DiffGrid>
            {differentiators.map((d) => (
              <DiffCell key={d.num}>
                <DiffNum>{d.num}</DiffNum>
                <DiffTitle>{d.title}</DiffTitle>
                <DiffDesc>{d.desc}</DiffDesc>
              </DiffCell>
            ))}
          </DiffGrid>
        </Container>
      </Section>

      {/* 06. Conseils */}
      <Section>
        <Container>
          <ChapterHead>
            <Kicker><strong>06</strong>&ensp;On partage</Kicker>
            <div>
              <ChapterTitle>Nos m&eacute;thodes, en acc&egrave;s libre.</ChapterTitle>
              <ChapterLede>
                Guides SEO, tutoriels pas &agrave; pas et conseils cr&eacute;ation de site :
                exactement ce que nous appliquons pour nos clients.
              </ChapterLede>
            </div>
          </ChapterHead>
          <ConseilGrid>
            {conseils.map((c) => (
              <ConseilCard key={c.title} href={c.href}>
                <ConseilKicker>{c.kicker}</ConseilKicker>
                <ConseilTitle>{c.title}</ConseilTitle>
                <ConseilDesc>{c.desc}</ConseilDesc>
                <ServiceGo className="go">Voir les guides</ServiceGo>
              </ConseilCard>
            ))}
          </ConseilGrid>
        </Container>
      </Section>

      {/* 07. Zones */}
      <Section variant="alt">
        <Container>
          <ChapterHead>
            <Kicker><strong>07</strong>&ensp;O&ugrave; nous travaillons</Kicker>
            <ChapterTitle>Bas&eacute;s dans le 77, partout en France.</ChapterTitle>
          </ChapterHead>
          <ZonesText>
            <strong>Seine-et-Marne :</strong> {cities.join(" · ")}
            <br />
            <strong>&Icirc;le-de-France :</strong> Paris · Val-de-Marne (94) · Seine-Saint-Denis (93) · Val-d&rsquo;Oise (95) · Hauts-de-Seine (92) · Yvelines (78) · Essonne (91)
            <br />
            <strong>Et au-del&agrave; :</strong> toute la France, &agrave; distance, avec le m&ecirc;me suivi.
          </ZonesText>
          <ZonesLink href="/agence-web-77/">Votre agence web en Seine-et-Marne</ZonesLink>
        </Container>
      </Section>

      {/* CTA final */}
      <Section variant="dark">
        <Container>
          <FinalTitle>
            Pr&ecirc;t &agrave; devenir <em>visible</em> ?
          </FinalTitle>
          <FinalText>
            R&eacute;servez votre audit gratuit de 30 minutes. On analyse votre situation,
            on identifie les opportunit&eacute;s, et vous repartez avec un plan d&rsquo;action
            concret. Gratuit, sans engagement, plan d&rsquo;action offert.
          </FinalText>
          <FinalActions>
            <Button href={CALENDLY}>R&eacute;server mon cr&eacute;neau</Button>
            <Button href="/contact/" variant="onDark">M&rsquo;&eacute;crire un message</Button>
          </FinalActions>
          <FinalMeta>
            Ou directement : <a href="tel:0769093909">07 69 09 39 09</a> · r&eacute;ponse sous 24 h
            <br />
            Pas encore pr&ecirc;t &agrave; appeler ? Lancez d&rsquo;abord
            l&rsquo;<a href="/audit-seo/">audit SEO gratuit en ligne</a> : 17 mesures,
            une minute, sans inscription.
          </FinalMeta>
        </Container>
      </Section>
    </>
  );
}
