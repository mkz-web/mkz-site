"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Hero from "@/components/Hero";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

/* ─── Section variants ─── */
const Section = styled.section<{ variant?: "light" | "alt" | "accent" }>`
  padding: 96px 24px;
  ${({ variant }) => {
    switch (variant) {
      case "accent":
        return `background: ${theme.colors.accent}; color: white;`;
      case "alt":
        return `background: ${theme.colors.surfaceAlt};`;
      default:
        return `background: ${theme.colors.background};`;
    }
  }}
`;
const Container = styled.div`max-width: 1280px; margin: 0 auto;`;

/* ─── Section headers ─── */
const SectionTag = styled.span`
  font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em;
  color: ${theme.colors.cta};
  .accent-section & { color: rgba(255,255,255,0.7); }
`;
const SectionTitle = styled.h2`
  font-size: 32px; font-weight: 800; margin-top: 12px; letter-spacing: -0.02em;
  color: ${theme.colors.text};
  .accent-section & { color: white; }
  @media (min-width: ${theme.breakpoints.md}) { font-size: 40px; }
`;
const SectionSubtitle = styled.p`
  margin-top: 16px; max-width: 640px; margin-left: auto; margin-right: auto; font-size: 16px; line-height: 1.7;
  color: ${theme.colors.textSecondary};
  .accent-section & { color: rgba(255,255,255,0.75); }
`;
const SectionHeader = styled.div`text-align: center; margin-bottom: 64px;`;

/* ─── Metrics ─── */
const MetricsGrid = styled.div`display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(4, 1fr); }`;
const MetricCard = styled.div`padding: 24px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; text-align: center; box-shadow: ${theme.shadows.sm};`;
const MetricValue = styled.div`font-size: 28px; font-weight: 800; color: ${theme.colors.accent}; @media (min-width: ${theme.breakpoints.md}) { font-size: 32px; }`;
const MetricLabel = styled.div`font-size: 13px; color: ${theme.colors.textSecondary}; margin-top: 4px;`;
const MetricIndicator = styled.div`font-size: 11px; color: ${theme.colors.success}; margin-top: 4px; font-weight: 500;`;

/* ─── Problem Cards (on accent bg) ─── */
const ProblemGrid = styled.div`display: grid; gap: 24px; @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }`;
const ProblemCard = styled.div`
  padding: 32px; border-radius: ${theme.radius.lg};
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(4px);
  transition: all 0.25s;
  &:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }
`;
const ProblemIcon = styled.div`font-size: 32px; margin-bottom: 16px;`;
const ProblemTitle = styled.h3`font-size: 17px; font-weight: 600; margin-bottom: 12px; color: white;`;
const ProblemDesc = styled.p`font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.7);`;

/* ─── Service Cards ─── */
const ServiceGrid = styled.div`display: grid; gap: 32px; @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }`;
const ServiceCard = styled.div`
  padding: 40px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm}; transition: all 0.25s;
  &:hover { box-shadow: ${theme.shadows.lg}; transform: translateY(-3px); border-color: ${theme.colors.cta}40; }
`;
const ServiceIcon = styled.div`width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: ${theme.radius.md}; background: ${theme.colors.accent}0D; color: ${theme.colors.accent}; margin-bottom: 20px; font-size: 28px;`;
const ServiceTitle = styled.h3`font-size: 20px; font-weight: 700; margin-bottom: 12px;`;
const ServiceDesc = styled.p`font-size: 14px; line-height: 1.7; color: ${theme.colors.textSecondary}; margin-bottom: 16px;`;
const TagsRow = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const Tag = styled.span`padding: 4px 12px; font-size: 12px; border-radius: ${theme.radius.full}; background: ${theme.colors.hoverSurface}; color: ${theme.colors.textSecondary}; border: 1px solid ${theme.colors.border};`;

/* ─── Method Steps (on accent bg) ─── */
const MethodGrid = styled.div`display: grid; gap: 32px; @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }`;
const StepCard = styled.div`
  padding: 32px; border-radius: ${theme.radius.lg};
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(4px);
`;
const StepNumber = styled.span`
  font-size: 64px; font-weight: 800; color: ${theme.colors.cta}; line-height: 1;
  @media (min-width: ${theme.breakpoints.md}) { font-size: 72px; }
`;
const StepTitle = styled.h3`font-size: 20px; font-weight: 700; margin-top: 12px; margin-bottom: 12px; color: white;`;
const StepDesc = styled.p`font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.7);`;

/* ─── Testimonials ─── */
const TestGrid = styled.div`display: grid; gap: 24px; @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); } @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }`;
const TestCard = styled.div`padding: 28px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm}; display: flex; flex-direction: column;`;
const TestStars = styled.div`color: ${theme.colors.star}; font-size: 16px; margin-bottom: 12px; letter-spacing: 2px;`;
const TestQuote = styled.blockquote`font-size: 14px; line-height: 1.7; color: ${theme.colors.text}; font-style: italic; flex: 1; margin-bottom: 16px;`;
const TestResult = styled.div`font-size: 13px; font-weight: 600; color: ${theme.colors.cta}; margin-bottom: 12px;`;
const TestAuthor = styled.div`font-size: 13px; font-weight: 600; color: ${theme.colors.text};`;
const TestRole = styled.div`font-size: 12px; color: ${theme.colors.textSecondary};`;

/* ─── Differentiators ─── */
const DiffGrid = styled.div`display: grid; gap: 24px; @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }`;
const DiffCard = styled.div`padding: 28px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm};`;
const DiffIcon = styled.div`font-size: 28px; margin-bottom: 12px;`;
const DiffTitle = styled.h3`font-size: 16px; font-weight: 600; margin-bottom: 8px;`;
const DiffDesc = styled.p`font-size: 14px; line-height: 1.7; color: ${theme.colors.textSecondary};`;

/* ─── Zones ─── */
const ZonesWrapper = styled.div`text-align: center;`;
const ZonesList = styled.div`display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 24px;`;
const ZoneTag = styled.span`padding: 6px 14px; font-size: 13px; border-radius: ${theme.radius.full}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; color: ${theme.colors.textSecondary};`;
const ZoneHighlight = styled.span`padding: 6px 14px; font-size: 13px; border-radius: ${theme.radius.full}; background: ${theme.colors.cta}15; color: ${theme.colors.cta}; font-weight: 600; border: 1px solid ${theme.colors.cta}30;`;

/* ─── CTA Final ─── */
const CTABadge = styled.div`display: inline-flex; padding: 6px 16px; border-radius: ${theme.radius.full}; background: rgba(255,255,255,0.15); color: white; font-size: 13px; font-weight: 600; margin-bottom: 24px;`;
const Reassurance = styled.div`display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; margin-top: 24px; margin-bottom: 32px;`;
const ReassuranceItem = styled.span`font-size: 13px; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 6px;`;
const Fallback = styled.p`margin-top: 24px; font-size: 14px; color: rgba(255,255,255,0.7);`;
const PhoneLink = styled.a`color: white; font-weight: 600; text-decoration: none; &:hover { text-decoration: underline; }`;

/* ─── DATA ─── */
const metrics = [
  { value: "+247%", label: "trafic organique", indicator: "↑ ce trimestre" },
  { value: "Top 3", label: "position moyenne", indicator: "↑ 12 positions" },
  { value: "+89%", label: "leads qualifiés", indicator: "↑ vs. mois dernier" },
  { value: "1.2s", label: "temps de charge", indicator: "✓ Core Web Vitals" },
];

const problems = [
  { icon: "👻", title: "Votre site est invisible", desc: "Vous avez investi dans un beau site, mais il n’apparaît nulle part sur Google. Vos concurrents trustent les premières positions." },
  { icon: "⏳", title: "Pas le temps pour le digital", desc: "Entre vos clients, la gestion et le reste, impossible de trouver du temps pour votre présence en ligne. Le marketing passe à la trappe." },
  { icon: "💸", title: "Des dépenses sans retour", desc: "Pub Facebook, Google Ads, agences... Vous avez tout essayé sans jamais voir de résultats concrets. Votre budget part en fumée." },
];

const services = [
  { icon: "💻", title: "Création de Site Web", desc: "Un site qui vous ressemble et qui convertit. Design sur-mesure, UX optimisée, et performances au top pour transformer vos visiteurs en clients.", tags: ["Image de marque", "Direction artistique", "Responsive design", "Branding complet", "Optimisation vitesse"] },
  { icon: "🔍", title: "SEO & Référencement", desc: "Montez sur le podium Google. Stratégie de mots-clés, optimisation technique, contenu optimisé et netlinking pour un trafic qualifié et durable.", tags: ["Audit SEO complet", "Stratégie de contenu", "SEO technique", "Cocon sémantique", "Suivi mensuel"] },
];

const methodSteps = [
  { num: "01", title: "Audit Gratuit", desc: "30 min pour analyser votre situation, comprendre vos objectifs et identifier les quick wins." },
  { num: "02", title: "Stratégie Sur-Mesure", desc: "Un plan d’action personnalisé avec des objectifs clairs, un budget défini et un planning réaliste." },
  { num: "03", title: "Résultats Mesurables", desc: "Exécution, suivi mensuel avec reporting transparent. Vous voyez concrètement l’évolution." },
];

const testimonials = [
  { name: "Sophie L.", role: "Architecte d’intérieur, Paris", quote: "Je passais inaperçue sur Google. Après 4 mois avec MKZ, je suis en première page sur mes mots-clés principaux.", result: "+180% de demandes de devis" },
  { name: "Marc T.", role: "Plombier chauffagiste, Meaux", quote: "Enfin une équipe qui parle français et pas charabia technique ! Mon nouveau site est pro, rapide, et les clients me trouvent facilement.", result: "+12 nouveaux clients/mois" },
  { name: "Caroline B.", role: "Coach sportif, Chelles", quote: "Après 6 mois de collaboration, j’ai pu arrêter de payer des pubs Facebook qui ne marchaient pas.", result: "Top 3 Google local" },
  { name: "Pierre D.", role: "Restaurant, Dammartin", quote: "Je ne comprenais rien au SEO. L’équipe MKZ a tout géré de A à Z. Aujourd’hui mes réservations en ligne ont explosé.", result: "x2 réservations en ligne" },
  { name: "Anne-Laure M.", role: "Photographe, Melun", quote: "Mon site était vieillissant et ne reflétait pas mon travail. MKZ m’a créé une vitrine sublime qui met en valeur mes photos.", result: "Portfolio professionnel" },
];

const differentiators = [
  { icon: "🗣️", title: "On parle français", desc: "Zéro jargon technique. Je vous explique tout simplement, vous comprenez ce qu’on fait et pourquoi. Promis." },
  { icon: "📞", title: "Je décroche", desc: "Une question ? Un doute ? Vous m’appelez, je réponds. Pas de ticket support, pas d’attente 72h. On avance ensemble." },
  { icon: "📊", title: "Vous voyez tout", desc: "Chaque mois, un point clair sur ce qui a été fait, les résultats obtenus, et la suite. Pas de boîte noire." },
  { icon: "🔓", title: "Vous restez libre", desc: "Votre site vous appartient, vos accès sont les vôtres. Si demain vous partez, vous partez avec tout. C’est normal." },
];

const cities = ["Paris", "Meaux", "Chelles", "Melun", "Dammartin-en-Goële", "Roissy", "Senlis", "Marne-la-Vallée", "Serris", "Provins", "Fontainebleau", "Créteil", "Saint-Denis", "Bobigny", "Montreuil", "Cergy", "Pontoise", "Versailles", "Évry", "Nanterre"];
const departments = ["Seine-et-Marne (77)", "Val-de-Marne (94)", "Seine-Saint-Denis (93)", "Val-d’Oise (95)", "Hauts-de-Seine (92)", "Yvelines (78)", "Essonne (91)"];

/* ─── PAGE ─── */
export default function HomeContent() {
  return (
    <>
      <Hero />

      {/* Metrics */}
      <Section variant="alt">
        <Container>
          <MetricsGrid>
            {metrics.map((m) => (
              <MetricCard key={m.label}>
                <MetricValue>{m.value}</MetricValue>
                <MetricLabel>{m.label}</MetricLabel>
                <MetricIndicator>{m.indicator}</MetricIndicator>
              </MetricCard>
            ))}
          </MetricsGrid>
        </Container>
      </Section>

      {/* Problems — BLEU MKZ */}
      <Section variant="accent" className="accent-section">
        <Container>
          <SectionHeader>
            <SectionTag>On conna&icirc;t vos gal&egrave;res</SectionTag>
            <SectionTitle>Ces probl&egrave;mes vous parlent ?</SectionTitle>
            <SectionSubtitle>Vous n&rsquo;&ecirc;tes pas seul. 80% des ind&eacute;pendants et petites entreprises font face aux m&ecirc;mes obstacles.</SectionSubtitle>
          </SectionHeader>
          <ProblemGrid>
            {problems.map((p) => (
              <ProblemCard key={p.title}>
                <ProblemIcon>{p.icon}</ProblemIcon>
                <ProblemTitle>{p.title}</ProblemTitle>
                <ProblemDesc>{p.desc}</ProblemDesc>
              </ProblemCard>
            ))}
          </ProblemGrid>
        </Container>
      </Section>

      {/* Services */}
      <Section>
        <Container>
          <SectionHeader>
            <SectionTag>Nos solutions</SectionTag>
            <SectionTitle>Des services pens&eacute;s pour vous</SectionTitle>
            <SectionSubtitle>Deux expertises compl&eacute;mentaires pour une pr&eacute;sence digitale qui g&eacute;n&egrave;re du business.</SectionSubtitle>
          </SectionHeader>
          <ServiceGrid>
            {services.map((s) => (
              <ServiceCard key={s.title}>
                <ServiceIcon>{s.icon}</ServiceIcon>
                <ServiceTitle>{s.title}</ServiceTitle>
                <ServiceDesc>{s.desc}</ServiceDesc>
                <TagsRow>{s.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagsRow>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </Container>
      </Section>

      {/* M&eacute;thode — BLEU MKZ */}
      <Section variant="accent" className="accent-section" id="methode">
        <Container>
          <SectionHeader>
            <SectionTag>La m&eacute;thode MKZ</SectionTag>
            <SectionTitle>3 &eacute;tapes vers votre succ&egrave;s</SectionTitle>
            <SectionSubtitle>Un accompagnement simple et transparent, sans jargon technique.</SectionSubtitle>
          </SectionHeader>
          <MethodGrid>
            {methodSteps.map((s) => (
              <StepCard key={s.num}>
                <StepNumber>{s.num}</StepNumber>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </StepCard>
            ))}
          </MethodGrid>
        </Container>
      </Section>

      {/* T&eacute;moignages */}
      <Section id="temoignages">
        <Container>
          <SectionHeader>
            <SectionTag>Ils nous font confiance</SectionTag>
            <SectionTitle>Ce qu&rsquo;en disent nos clients</SectionTitle>
            <SectionSubtitle>Des entrepreneurs comme vous qui ont transform&eacute; leur visibilit&eacute; en ligne.</SectionSubtitle>
          </SectionHeader>
          <TestGrid>
            {testimonials.map((t) => (
              <TestCard key={t.name}>
                <TestStars>&#9733;&#9733;&#9733;&#9733;&#9733;</TestStars>
                <TestQuote>&laquo; {t.quote} &raquo;</TestQuote>
                <TestResult>&rarr; {t.result}</TestResult>
                <TestAuthor>{t.name}</TestAuthor>
                <TestRole>{t.role}</TestRole>
              </TestCard>
            ))}
          </TestGrid>
        </Container>
      </Section>

      {/* Diff&eacute;renciateurs */}
      <Section variant="alt">
        <Container>
          <SectionHeader>
            <SectionTitle>On travaille autrement</SectionTitle>
            <SectionSubtitle>Pas d&rsquo;usine &agrave; sites, pas de commercial qui dispara&icirc;t apr&egrave;s la signature. Juste vous et moi.</SectionSubtitle>
          </SectionHeader>
          <DiffGrid>
            {differentiators.map((d) => (
              <DiffCard key={d.title}>
                <DiffIcon>{d.icon}</DiffIcon>
                <DiffTitle>{d.title}</DiffTitle>
                <DiffDesc>{d.desc}</DiffDesc>
              </DiffCard>
            ))}
          </DiffGrid>
        </Container>
      </Section>

      {/* Zones */}
      <Section>
        <Container>
          <ZonesWrapper>
            <SectionTitle>Nous intervenons partout en France</SectionTitle>
            <SectionSubtitle>Bas&eacute; en &Icirc;le-de-France, nous vous accompagnons pour vos projets web dans toute la France.</SectionSubtitle>
            <ZonesList>
              {cities.map((c) => <ZoneTag key={c}>{c}</ZoneTag>)}
            </ZonesList>
            <ZonesList style={{ marginTop: 16 }}>
              {departments.map((d) => <ZoneTag key={d}>{d}</ZoneTag>)}
              <ZoneHighlight>Toute la France</ZoneHighlight>
            </ZonesList>
          </ZonesWrapper>
        </Container>
      </Section>

      {/* CTA Final — BLEU MKZ */}
      <Section variant="accent" className="accent-section">
        <Container style={{ textAlign: "center" }}>
          <CTABadge>Places limit&eacute;es ce mois-ci</CTABadge>
          <SectionTitle>Pr&ecirc;t &agrave; booster votre visibilit&eacute; ?</SectionTitle>
          <SectionSubtitle style={{ color: "rgba(255,255,255,0.85)" }}>
            R&eacute;servez votre audit gratuit de 30 minutes. On analyse votre situation,
            on identifie les opportunit&eacute;s, et on vous donne un plan d&rsquo;action concret.
          </SectionSubtitle>
          <Reassurance>
            <ReassuranceItem>&#10003; 100% gratuit</ReassuranceItem>
            <ReassuranceItem>&#10003; Sans engagement</ReassuranceItem>
            <ReassuranceItem>&#10003; Plan d&rsquo;action offert</ReassuranceItem>
          </Reassurance>
          <Button href={CALENDLY}>R&eacute;server mon cr&eacute;neau maintenant</Button>
          <Fallback>Ou appelez-moi directement : <PhoneLink href="tel:0769093909">07 69 09 39 09</PhoneLink></Fallback>
        </Container>
      </Section>
    </>
  );
}
