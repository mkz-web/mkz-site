"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { homeFaqFr } from "@/content/home-faq";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

/* ─── Structure « chapitres » ─── */

/* clamp resserré le 29/08/2026 (lot 2 du check UX : jusqu'à 370 px de vide
   continu entre deux sections, accueil à 15 307 px sur mobile). */
const Section = styled.section<{ variant?: "paper" | "alt" | "dark" }>`
  padding: clamp(64px, 8vh, 104px) 24px;
  scroll-margin-top: 72px;
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
  font-size: 13px;
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
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
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
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.textSecondary};
`;

const ProofBand = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px 8px;
`;

const ProofNote = styled.p`
  margin-top: 16px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
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
  font-size: 13px;
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
  font-size: 13px;
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
  font-size: 13px;
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
  font-size: 13px;
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
  font-size: 13px;
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

// Deux outils, deux colonnes : les cartes reprennent le gabarit des conseils.
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
  font-size: 13px;
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

/* ─── Ajouts du 14/09/2026 (refonte de l'accueil sur le benchmark de 15 accueils
   d'agences et consultants SEO, US, UK, AU, CA : _research/benchmark-accueil-2026-09-14/) ─── */

/* L'outil d'audit seul, en grand : le simulateur d'empreinte IA a quitté
   l'accueil le 14/09/2026 (décision de Mickaël : aucun rapport avec le SEO). */
const ToolSolo = styled(Link)`
  display: grid;
  gap: 24px;
  padding: 24px;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.lg};
  color: inherit;
  text-decoration: none;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1.15fr 1fr;
    align-items: center;
    gap: 40px;
    padding: 32px;
  }

  &:hover .go { text-decoration: underline; text-underline-offset: 4px; }
`;

const ToolShotSolo = styled.span`
  display: block;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
  overflow: hidden;

  img { display: block; width: 100%; height: auto; }
`;

const ServicePrice = styled.p`
  margin-top: 12px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  line-height: 1.6;
  color: ${theme.colors.ctaInk};
`;

const WhoGrid = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(4, 1fr); }
`;

const FaqList = styled.dl`
  max-width: 880px;
  border-top: 1px solid ${theme.colors.borderInk};
`;

const FaqItem = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid ${theme.colors.border};
`;

const FaqQ = styled.dt`
  font-family: ${theme.fonts.display};
  font-size: clamp(19px, 1.6vw, 22px);
  font-weight: 600;
  line-height: 1.3;
  color: ${theme.colors.accent};
`;

const FaqA = styled.dd`
  margin: 10px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  max-width: 70ch;
`;

const JumpNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 22px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 14px 24px;
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  letter-spacing: 0.04em;

  span {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${theme.colors.textSecondary};
  }

  a {
    color: ${theme.colors.text};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  a:hover { color: ${theme.colors.ctaInk}; }
`;

const Manifesto = styled.p`
  max-width: 62ch;
  font-family: ${theme.fonts.display};
  font-size: clamp(19px, 1.7vw, 23px);
  line-height: 1.5;
  color: ${theme.colors.accent};
  margin-bottom: 36px;
`;

// Chiffres pertinents sous le hero (14/09/2026, demande de Mickaël). Un chiffre =
// une source + une date : Ifop pour Guest Suite (janvier 2026, 1 003 répondants,
// fait R1 du dossier avis Google), grille et relevés de marché 2026 de /tarifs/,
// outil d'audit du site. Jamais un résultat client non mesuré.
const chiffres = [
  { valeur: "93 %", label: "des Français lisent les avis en ligne avant de choisir un prestataire" },
  { valeur: "1 490 € HT", label: "le site vitrine complet, textes et référencement inclus. En agence : 3 000 à 8 000 €" },
  { valeur: "24 h", label: "pour recevoir un devis fixe, écrit ligne par ligne" },
  { valeur: "1 min", label: "pour mesurer votre site, sans inscription, score sur 100" },
];

const cities = ["Meaux", "Melun", "Chelles", "Dammartin-en-Goële", "Roissy", "Marne-la-Vallée", "Senlis", "Provins", "Fontainebleau", "Serris", "Mitry-Mory", "Claye-Souilly"];

// 01. Les pièges. Sur les 15 accueils du benchmark, les plus convaincants ouvrent
// sur ce que l'industrie ne dit pas (« SEO is broken », « the problem most
// agencies won't admit », « been burned before? »), puis répondent. Dans la voix
// de Mickaël : cash, une analogie, une réponse par piège.
const pieges = [
  { num: "01", title: "On vous vend un site. Pas des clients.", desc: "Un site sans référencement, c'est comme une vitrine dans une rue sans passage : belle, mais personne ne passe devant. Chez moi, le référencement est inclus dans chaque site livré." },
  { num: "02", title: "Vous payez, et le rapport est incompréhensible.", desc: "Des courbes, des positions, du jargon. La seule question qui compte : est-ce que ça ramène des clients ? Chaque mois, je vous réponds en français, avec les demandes reçues, pas avec un PDF de quarante pages." },
  { num: "03", title: "Le site ne vous appartient pas.", desc: "Abonnement, hébergement captif, accès que vous n'avez jamais eus : le jour où vous partez, vous repartez de zéro. Chez MKZ, le nom de domaine, le code et les contenus sont à vous. Coût de sortie : 0 €." },
];

// Les prix sont ceux de /tarifs/ (relevés sur la page servie le 14/09/2026).
// Septième endroit où ils vivent : tout changement de prix se répercute ici.
const services = [
  {
    kicker: "Service 01",
    title: "Création de site internet",
    desc: "Un site qui vous ressemble, rapide, lisible sur téléphone, et déjà référencé le jour de sa mise en ligne. Vous donnez vos photos et vos tarifs, je fais le reste.",
    prix: "Site vitrine 5 à 8 pages, textes inclus : 1 490 € HT",
    tags: "design sur mesure · textes rédigés · responsive · vitesse · référencement inclus",
    href: "/creation-site-internet/",
    linkLabel: "Découvrir la création de site",
  },
  {
    kicker: "Service 02",
    title: "SEO & référencement Google",
    desc: "Être trouvé par les gens qui cherchent ce que vous faites, dans votre ville. Mots-clés en langage client, technique propre, contenus utiles, liens choisis à la main : du référencement qui dure, pas un feu de paille.",
    prix: "Audit complet 490 € · accompagnement de 390 à 1 190 € HT par mois",
    tags: "audit SEO · référencement local · contenus · netlinking · point mensuel",
    href: "/referencement-seo/",
    linkLabel: "Découvrir le référencement SEO",
  },
  {
    kicker: "Service 03",
    title: "Référencement IA (GEO)",
    desc: "Être cité par ChatGPT, Perplexity et Gemini quand un client leur demande un artisan ou un commerce près de chez lui. Robots autorisés, faits citables, données structurées, citations mesurées avant et après.",
    prix: "Socle technique IA 390 €, déjà inclus dans tout site créé par MKZ",
    tags: "robots IA · llms.txt · JSON-LD · contenu citable · part de voix mesurée",
    href: "/referencement-ia/",
    linkLabel: "Découvrir le référencement IA",
  },
];

const methodSteps = [
  { num: "01", title: "30 minutes, gratuites", desc: "On regarde votre site, votre marché et vos concurrents ensemble. Vous repartez avec les trois choses à faire en premier, que vous signiez ou non." },
  { num: "02", title: "Un plan, un prix, une date", desc: "Un devis fixe, écrit. Le prix posé est le prix payé, et vous savez quand c'est livré. Pas d'option cachée qui arrive à la deuxième facture." },
  { num: "03", title: "Chaque mois, un point en français", desc: "Ce qui a été fait, ce que ça a donné en demandes reçues, et la suite. Si ça ne bouge pas, on change de plan. C'est la réalité du référencement : on mesure, on corrige." },
];

// Les mêmes cinq clients parlent dans le pilier agence-web-77 et dans
// llms-full.txt : toute retouche ici se reporte là-bas (et dans _content-staging/).
// Conservés en l'état le 14/09/2026 (décision de Mickaël : « on garde les avis »).
const testimonials = [
  { quote: "Moi, les sites internet, c'est pas mon truc. J'ai donné mes photos et mes tarifs, MKZ s'est occupé du reste et m'a appelé quand il manquait quelque chose. Ce que je vois, c'est que le téléphone sonne, et pour des chantiers à Meaux, pas à l'autre bout du département.", name: "Marc T.", role: "Plombier chauffagiste, Meaux", result: "8 à 10 demandes par mois" },
  { quote: "J'avais déjà payé une agence pendant un an sans jamais comprendre ce qu'elle faisait de mon argent. Cette fois, j'ai un point chaque mois, avec les positions et les demandes reçues, et je peux poser mes questions sans me sentir idiote. Deux de mes expressions sont passées en première page au bout de quatre mois. Surtout, les demandes qui arrivent correspondent enfin à mes projets.", name: "Sophie L.", role: "Architecte d'intérieur, Paris", result: "Page 1 Google en 4 mois" },
  { quote: "J'ai appelé Mickaël un mardi, le site était en ligne trois semaines plus tard, avec la réservation qui marche enfin sur téléphone. Depuis, le samedi soir se remplit presque tout seul ! Et quand j'ai une question, même pour une bêtise, il répond. Je l'ai déjà recommandé à deux collègues du coin.", name: "Pierre D.", role: "Restaurateur, Dammartin-en-Goële", result: "Réservations en ligne × 2" },
];

// 05. Pour qui. Relevé sur Mediaforce et Dnovo : une entrée par métier, avec sa
// promesse et son action. Ici, chaque carte mène au guide déjà écrit pour ce métier.
const metiers = [
  { kicker: "Artisans du bâtiment", title: "Des chantiers près de chez vous", desc: "Plombier, électricien, maçon : le client tape « dépannage » ou « devis » avec le nom de sa ville. C'est là qu'il faut apparaître.", href: "/conseils/seo/trouver-des-chantiers/", go: "Comment trouver des chantiers" },
  { kicker: "Commerces et restaurants", title: "Une fiche Google qui remplit la salle", desc: "Horaires justes, photos récentes, avis auxquels on répond, réservation qui marche sur téléphone. Sur Maps, on vous compare souvent avant d'ouvrir votre site.", href: "/conseils/seo/avis-google/", go: "Bien gérer ses avis Google" },
  { kicker: "Professions libérales et cabinets", title: "Être trouvé dans votre ville, et rassurer", desc: "Ostéopathe, avocat, expert-comptable : on vous cherche par métier et par ville, puis on se fait une idée en dix secondes. Le référencement local joue sur les deux.", href: "/conseils/seo/referencement-local/", go: "Le référencement local, expliqué" },
  { kicker: "Vous partez de zéro", title: "Un site vitrine qui rapporte", desc: "Pas de site, ou un site qui dort ? Ce qu'il faut dedans, ce que ça coûte, par quoi commencer : écrit noir sur blanc, chiffres à l'appui.", href: "/conseils/creation-site-internet/site-vitrine/", go: "Ce qu'il faut dans un site vitrine" },
];

const differentiators = [
  { num: "01", title: "On parle français", desc: "Quand je dis « données structurées », je vous explique dans la phrase d'après ce que ça change pour vous. Vous comprenez ce qu'on fait, et pourquoi." },
  { num: "02", title: "Je décroche", desc: "Une question, un doute, un détail ? Vous m'appelez, je réponds. Pas de ticket, pas de chef de projet entre nous, pas d'attente de 72 heures." },
  { num: "03", title: "Vous voyez tout", desc: "Chaque mois, un point clair : ce qui a été fait, ce que ça a donné, la suite. Vos accès Search Console et Analytics sont les vôtres, vous pouvez vérifier sans moi." },
  { num: "04", title: "Vous restez libre", desc: "Votre site vous appartient, vos accès aussi. Si demain vous partez, vous partez avec tout. C'est normal, et c'est écrit dans le devis." },
];

const conseils = [
  { kicker: "Tutoriels", title: "Pas à pas, avec captures", desc: "Search Console, fiche Google, WordPress : reprenez la main sur vos outils, écran par écran.", href: "/conseils/tutoriels/" },
  { kicker: "Création de site", title: "Avant d'investir", desc: "Combien coûte un site, quand le refondre, quel type choisir : les bonnes décisions, chiffrées.", href: "/conseils/creation-site-internet/" },
  { kicker: "SEO & visibilité", title: "Être trouvé sur Google", desc: "Référencement local, audit SEO, visibilité : des guides concrets, sans jargon.", href: "/conseils/seo/" },
];

const DiffLayout = styled.div`
  display: grid;
  gap: 32px;

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 220px 1fr;
    gap: 48px;
    align-items: start;
  }
`;

/* Le portrait (la vraie photo de /about/) : le site promet « vous parlez
   directement à celui qui fait le travail » sans jamais le montrer. */
const PortraitFigure = styled.figure`
  max-width: 220px;

  img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid ${theme.colors.borderInk};
    border-radius: ${theme.radius.lg};
    box-shadow: ${theme.shadows.lg};
  }

  figcaption {
    margin-top: 10px;
    font-family: ${theme.fonts.mono};
    font-size: 13px;
    line-height: 1.6;
    color: ${theme.colors.textSecondary};
  }
`;

// L'outil d'audit. Les faits viennent de sa page (mesures faites sur le site au
// moment du clic, une minute, sans inscription, score sur 100 ; rapport complet
// envoyé par Mickaël sous 24 h) : rien n'est promis ici qui ne soit tenu là-bas.
const outil = {
  kicker: "Outil gratuit · une minute",
  title: "L'audit SEO + IA de votre site",
  desc: "Entrez votre adresse : des mesures réelles sur votre site (HTTPS, vraie page 404, balises, robots des IA, llms.txt, données structurées, autorité), un score sur 100 et vos priorités. Le rapport complet, c'est moi qui vous l'envoie, sous 24 h.",
  href: "/audit-seo/",
  go: "Tester mon site maintenant",
  img: { src: "/images/outils/scan-apercu.webp", w: 1400, h: 343, alt: "Résultat d'un scan réel : mkz-consulting.fr, score 89 sur 100, technique 35/35, lisibilité par les IA 35/35, autorité et positions Google 19/30" },
};

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

      {/* Chiffres pertinents : sourcés et datés, jamais un résultat client inventé. */}
      <ProofBand>
        <ProofStrip>
          {chiffres.map((c) => (
            <ProofCell key={c.valeur}>
              <ProofLabel>{c.label}</ProofLabel>
              <ProofValue>{c.valeur}</ProofValue>
            </ProofCell>
          ))}
        </ProofStrip>
        <ProofNote>
          Sources : Ifop pour Guest Suite, janvier 2026, 1 003 r&eacute;pondants · grille et relev&eacute;s de march&eacute; 2026 sur la{" "}
          <Link href="/tarifs/" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>page tarifs</Link> · outil d&rsquo;audit de ce site.
        </ProofNote>
      </ProofBand>

      {/* Sommaire ancré : la page passe 10 000 caractères de texte depuis la
          refonte du 14/09/2026 (règle parcours de livraison-web). */}
      <JumpNav aria-label="Sur cette page">
        <span>Sur cette page</span>
        <a href="#pieges">Les pi&egrave;ges</a>
        <a href="#outils">L&rsquo;outil gratuit</a>
        <a href="#services">Les prix</a>
        <a href="#methode">La m&eacute;thode</a>
        <a href="#pour-qui">Pour qui</a>
        <a href="#questions">Vos questions</a>
      </JumpNav>

      {/* 01. Les pièges */}
      <Section variant="dark" id="pieges">
        <Container>
          <ChapterHead surSombre>
            <Kicker surSombre><strong>01</strong>&ensp;Ce qu&rsquo;on ne vous dit pas</Kicker>
            <div>
              <ChapterTitle surSombre>Trois pi&egrave;ges que personne ne vous explique avant de signer.</ChapterTitle>
              <ChapterLede surSombre>
                Ce n&rsquo;est pas de la mauvaise foi, c&rsquo;est le mod&egrave;le des agences.
                Voici ce que je fais autrement.
              </ChapterLede>
            </div>
          </ChapterHead>
          <ProblemGrid>
            {pieges.map((p) => (
              <ProblemItem key={p.num}>
                <ProblemNum>{p.num}</ProblemNum>
                <ProblemTitle>{p.title}</ProblemTitle>
                <ProblemDesc>{p.desc}</ProblemDesc>
              </ProblemItem>
            ))}
          </ProblemGrid>
        </Container>
      </Section>

      {/* 02. L'outil */}
      <Section variant="alt" id="outils">
        <Container>
          <ChapterHead>
            <Kicker><strong>02</strong>&ensp;L&rsquo;outil gratuit</Kicker>
            <div>
              <ChapterTitle>Un &eacute;tat des lieux de votre site, gratuit, en une minute.</ChapterTitle>
              <ChapterLede>
                Le m&ecirc;me outil que j&rsquo;utilise pour mes clients, en libre-service et sans
                inscription. Il mesure, il n&rsquo;estime pas.{" "}
                <Link href="/outils/" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                  Tous les outils gratuits
                </Link>.
              </ChapterLede>
            </div>
          </ChapterHead>
          <ToolSolo href={outil.href}>
            <ToolShotSolo>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={outil.img.src} width={outil.img.w} height={outil.img.h} alt={outil.img.alt} loading="lazy" />
            </ToolShotSolo>
            <div>
              <ConseilKicker>{outil.kicker}</ConseilKicker>
              <ConseilTitle>{outil.title}</ConseilTitle>
              <ConseilDesc>{outil.desc}</ConseilDesc>
              <ServiceGo className="go">{outil.go}</ServiceGo>
            </div>
          </ToolSolo>
        </Container>
      </Section>

      {/* 03. Services */}
      <Section id="services">
        <Container>
          <ChapterHead>
            <Kicker><strong>03</strong>&ensp;Ce que je fais</Kicker>
            <ChapterTitle>Trois m&eacute;tiers, une mission : que votre t&eacute;l&eacute;phone sonne.</ChapterTitle>
          </ChapterHead>
          <ServicesGrid>
            <ServicesAside>
              <p>
                Pas d&rsquo;usine &agrave; sites, pas d&rsquo;options incompr&eacute;hensibles.
                Je construis votre vitrine, je la rends visible sur Google et cit&eacute;e par
                les IA aupr&egrave;s des clients de votre zone. Les trois se renforcent.
              </p>
              <p>
                <strong>Le prix est le prix.</strong> La grille est publique, en euros HT, et
                le montant du devis est celui de la facture.{" "}
                <Link href="/tarifs/" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                  Voir tous les tarifs
                </Link>.
              </p>
              <p>
                Et parce qu&rsquo;un client autonome est un client serein, mes
                m&eacute;thodes sont document&eacute;es en acc&egrave;s libre dans les{" "}
                <Link href="/conseils/" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                  conseils et tutoriels
                </Link>.
              </p>
            </ServicesAside>
            <div>
              {services.map((s) => (
                <ServiceBlock key={s.title} href={s.href}>
                  <ServiceKicker>{s.kicker}</ServiceKicker>
                  <ServiceTitle>{s.title}</ServiceTitle>
                  <ServiceDesc>{s.desc}</ServiceDesc>
                  <ServicePrice>{s.prix}</ServicePrice>
                  <ServiceTags>{s.tags}</ServiceTags>
                  <ServiceGo className="go">{s.linkLabel}</ServiceGo>
                </ServiceBlock>
              ))}
            </div>
          </ServicesGrid>
        </Container>
      </Section>

      {/* 04. Méthode */}
      <Section variant="dark" id="methode">
        <Container>
          <ChapterHead surSombre>
            <Kicker surSombre><strong>04</strong>&ensp;La m&eacute;thode</Kicker>
            <div>
              <ChapterTitle surSombre>Trois &eacute;tapes, z&eacute;ro jargon.</ChapterTitle>
              <ChapterLede surSombre>
                Du premier appel au point mensuel, vous savez toujours o&ugrave; on en est
                et ce que &ccedil;a co&ucirc;te.
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
          {/* Rappel d'action à mi-page (règle parcours de livraison-web). */}
          <div style={{ marginTop: 40 }}>
            <Button href={CALENDLY}>R&eacute;server mes 30 minutes</Button>
          </div>
        </Container>
      </Section>

      {/* 05. Pour qui */}
      <Section id="pour-qui">
        <Container>
          <ChapterHead>
            <Kicker><strong>05</strong>&ensp;Pour qui</Kicker>
            <div>
              <ChapterTitle>Plombier, restaurateur, cabinet&nbsp;: la question n&rsquo;est pas la m&ecirc;me.</ChapterTitle>
              <ChapterLede>
                Le client ne cherche pas &laquo;&nbsp;du SEO&nbsp;&raquo;. Il cherche un artisan
                disponible, une table ce soir, un cabinet pr&egrave;s de chez lui. Chaque
                m&eacute;tier a son guide, gratuit.
              </ChapterLede>
            </div>
          </ChapterHead>
          <WhoGrid>
            {metiers.map((m) => (
              <ConseilCard key={m.title} href={m.href}>
                <ConseilKicker>{m.kicker}</ConseilKicker>
                <ConseilTitle>{m.title}</ConseilTitle>
                <ConseilDesc>{m.desc}</ConseilDesc>
                <ServiceGo className="go">{m.go}</ServiceGo>
              </ConseilCard>
            ))}
          </WhoGrid>
        </Container>
      </Section>

      {/* 06. Témoignages */}
      <Section variant="alt" id="temoignages">
        <Container>
          <ChapterHead>
            <Kicker><strong>06</strong>&ensp;Ils en parlent</Kicker>
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

      {/* 07. Un consultant, pas une agence */}
      <Section>
        <Container>
          <ChapterHead>
            <Kicker><strong>07</strong>&ensp;Qui fait le travail</Kicker>
            <ChapterTitle>Un consultant, pas une agence.</ChapterTitle>
          </ChapterHead>
          <Manifesto>
            Quand je dis consultant, c&rsquo;est-&agrave;-dire : la personne qui vous r&eacute;pond
            au t&eacute;l&eacute;phone est celle qui fait le travail. Pas de commercial, pas de chef
            de projet, pas de stagiaire derri&egrave;re. &Ccedil;a co&ucirc;te moins cher, et &ccedil;a va
            plus vite. C&rsquo;est tout.
          </Manifesto>
          <DiffLayout>
            <PortraitFigure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mickael-leclerc.jpg" alt="Mickaël Leclerc, fondateur de MKZ" width={1024} height={1024} loading="lazy" />
              <figcaption>Micka&euml;l Leclerc, fondateur.<br />C&rsquo;est lui qui d&eacute;croche.</figcaption>
            </PortraitFigure>
            <DiffGrid>
              {differentiators.map((d) => (
                <DiffCell key={d.num}>
                  <DiffNum>{d.num}</DiffNum>
                  <DiffTitle>{d.title}</DiffTitle>
                  <DiffDesc>{d.desc}</DiffDesc>
                </DiffCell>
              ))}
            </DiffGrid>
          </DiffLayout>
          <div style={{ marginTop: 36 }}>
            <Button href={CALENDLY}>Parler de mon projet, 30 min gratuites</Button>
          </div>
        </Container>
      </Section>

      {/* 08. Questions. Relevé sur le benchmark : les accueils les plus convaincants
          répondent aux questions d'achat sur la page même (prix, délai, garantie,
          consultant ou agence, ChatGPT). Texte identique au FAQPage JSON-LD,
          source unique : src/content/home-faq.ts. */}
      <Section variant="alt" id="questions">
        <Container>
          <ChapterHead>
            <Kicker><strong>08</strong>&ensp;Vos questions</Kicker>
            <div>
              <ChapterTitle>Ce qu&rsquo;on me demande avant de signer.</ChapterTitle>
              <ChapterLede>
                Les r&eacute;ponses honn&ecirc;tes, y compris celles qui ne font pas vendre.
              </ChapterLede>
            </div>
          </ChapterHead>
          <FaqList>
            {homeFaqFr.map((f) => (
              <FaqItem key={f.q}>
                <FaqQ>{f.q}</FaqQ>
                <FaqA>{f.a}</FaqA>
              </FaqItem>
            ))}
          </FaqList>
          <div style={{ marginTop: 32 }}>
            <Button href="/audit-seo/" variant="secondary">Tester mon site en une minute</Button>
          </div>
        </Container>
      </Section>

      {/* 09. Conseils */}
      <Section>
        <Container>
          <ChapterHead>
            <Kicker><strong>09</strong>&ensp;On partage</Kicker>
            <div>
              <ChapterTitle>Mes m&eacute;thodes, en acc&egrave;s libre.</ChapterTitle>
              <ChapterLede>
                Guides SEO, tutoriels pas &agrave; pas et conseils cr&eacute;ation de site :
                exactement ce que j&rsquo;applique pour mes clients. Donner avant de vendre.
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

      {/* 10. Zones */}
      <Section variant="alt">
        <Container>
          <ChapterHead>
            <Kicker><strong>10</strong>&ensp;O&ugrave; je travaille</Kicker>
            <ChapterTitle>Bas&eacute; dans le 77, partout en France.</ChapterTitle>
          </ChapterHead>
          <ZonesText>
            <strong>Seine-et-Marne :</strong> {cities.join(" · ")}
            <br />
            <strong>&Icirc;le-de-France :</strong>{" "}Paris · Val-de-Marne (94) · Seine-Saint-Denis (93) · Val-d&rsquo;Oise (95) · Hauts-de-Seine (92) · Yvelines (78) · Essonne (91)
            <br />
            <strong>Et au-del&agrave; :</strong>{" "}toute la France, &agrave; distance, avec le m&ecirc;me suivi.
          </ZonesText>
          <ZonesLink href="/agence-web-77/">Votre agence web en Seine-et-Marne</ZonesLink>
        </Container>
      </Section>

      {/* CTA final */}
      <Section variant="dark">
        <Container>
          <FinalTitle>
            Pr&ecirc;t &agrave; faire <em>sonner</em>{" "}le t&eacute;l&eacute;phone ?
          </FinalTitle>
          <FinalText>
            Trente minutes au t&eacute;l&eacute;phone ou en visio. Je regarde votre site et votre
            march&eacute;, je vous dis ce que je ferais en premier, et vous d&eacute;cidez.
            Gratuit, sans engagement, plan d&rsquo;action offert.
          </FinalText>
          <FinalActions>
            <Button href={CALENDLY}>R&eacute;server mon cr&eacute;neau</Button>
            <Button href="/contact/" variant="onDark">M&rsquo;&eacute;crire un message</Button>
          </FinalActions>
          <FinalMeta>
            Ou directement : <a href="tel:0769093909">07 69 09 39 09</a> · r&eacute;ponse sous 24 h
            <br />
            Pas encore pr&ecirc;t &agrave; appeler ? Lancez d&rsquo;abord
            l&rsquo;<a href="/audit-seo/">audit gratuit en ligne</a>, vous saurez o&ugrave; vous en &ecirc;tes.
          </FinalMeta>
        </Container>
      </Section>
    </>
  );
}
