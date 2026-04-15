"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Hero from "@/components/Hero";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

/* ─── Shared styled components ─── */
const Section = styled.section<{ alt?: boolean }>`
  padding: 96px 24px;
  background: ${({ alt }) => alt ? theme.colors.surfaceAlt : theme.colors.background};
`;
const Container = styled.div`max-width: 1280px; margin: 0 auto;`;
const SectionTag = styled.span`font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: ${theme.colors.cta};`;
const SectionTitle = styled.h2`font-size: 32px; font-weight: 800; margin-top: 12px; color: ${theme.colors.text}; letter-spacing: -0.02em; @media (min-width: ${theme.breakpoints.md}) { font-size: 40px; }`;
const SectionSubtitle = styled.p`margin-top: 16px; max-width: 640px; margin-left: auto; margin-right: auto; color: ${theme.colors.textSecondary}; font-size: 16px; line-height: 1.7;`;
const SectionHeader = styled.div`text-align: center; margin-bottom: 64px;`;

/* ─── Metrics ─── */
const MetricsGrid = styled.div`display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(4, 1fr); }`;
const MetricCard = styled.div`padding: 24px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; text-align: center; box-shadow: ${theme.shadows.sm};`;
const MetricValue = styled.div`font-size: 28px; font-weight: 700; color: ${theme.colors.accent}; @media (min-width: ${theme.breakpoints.md}) { font-size: 32px; }`;
const MetricLabel = styled.div`font-size: 13px; color: ${theme.colors.textSecondary}; margin-top: 4px;`;
const MetricIndicator = styled.div`font-size: 11px; color: ${theme.colors.success}; margin-top: 4px; font-weight: 500;`;

/* ─── Problem Cards ─── */
const ProblemGrid = styled.div`display: grid; gap: 24px; @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }`;
const ProblemCard = styled.div`padding: 32px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm};`;
const ProblemIcon = styled.div`font-size: 32px; margin-bottom: 16px;`;
const ProblemTitle = styled.h3`font-size: 17px; font-weight: 600; margin-bottom: 12px;`;
const ProblemDesc = styled.p`font-size: 14px; line-height: 1.7; color: ${theme.colors.textSecondary};`;

/* ─── Service Cards ─── */
const ServiceGrid = styled.div`display: grid; gap: 32px; @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }`;
const ServiceCard = styled.div`padding: 40px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm}; transition: all 0.25s; &:hover { box-shadow: ${theme.shadows.lg}; transform: translateY(-3px); border-color: ${theme.colors.cta}40; }`;
const ServiceIcon = styled.div`width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: ${theme.radius.md}; background: ${theme.colors.accent}0D; color: ${theme.colors.accent}; margin-bottom: 20px; font-size: 28px;`;
const ServiceTitle = styled.h3`font-size: 20px; font-weight: 700; margin-bottom: 12px;`;
const ServiceDesc = styled.p`font-size: 14px; line-height: 1.7; color: ${theme.colors.textSecondary}; margin-bottom: 16px;`;
const TagsRow = styled.div`display: flex; flex-wrap: wrap; gap: 8px;`;
const Tag = styled.span`padding: 4px 12px; font-size: 12px; border-radius: ${theme.radius.full}; background: ${theme.colors.hoverSurface}; color: ${theme.colors.textSecondary}; border: 1px solid ${theme.colors.border};`;

/* ─── Method Steps ─── */
const MethodGrid = styled.div`display: grid; gap: 32px; @media (min-width: ${theme.breakpoints.lg}) { grid-template-columns: repeat(3, 1fr); }`;
const StepCard = styled.div`padding: 32px; border-radius: ${theme.radius.lg}; border: 1px solid ${theme.colors.border}; background: ${theme.colors.surface}; box-shadow: ${theme.shadows.sm}; position: relative;`;
const StepNumber = styled.span`font-size: 56px; font-weight: 800; color: ${theme.colors.cta}20; line-height: 1;`;
const StepTitle = styled.h3`font-size: 18px; font-weight: 600; margin-top: 8px; margin-bottom: 12px;`;
const StepDesc = styled.p`font-size: 14px; line-height: 1.7; color: ${theme.colors.textSecondary};`;

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
const ZoneHighlight = styled.span`padding: 6px 14px; font-size: 13px; border-radius: ${theme.radius.full}; background: ${theme.colors.accent}0D; color: ${theme.colors.accent}; font-weight: 600;`;

/* ─── CTA Final ─── */
const CTASection = styled.section`padding: 96px 24px; text-align: center; background: ${theme.colors.accent}; color: white;`;
const CTABadge = styled.div`display: inline-flex; padding: 6px 16px; border-radius: ${theme.radius.full}; background: rgba(255,255,255,0.15); color: white; font-size: 13px; font-weight: 600; margin-bottom: 24px;`;
const Reassurance = styled.div`display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; margin-top: 24px; margin-bottom: 32px;`;
const ReassuranceItem = styled.span`font-size: 13px; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 6px;`;
const Fallback = styled.p`margin-top: 24px; font-size: 14px; color: rgba(255,255,255,0.7);`;
const PhoneLink = styled.a`color: white; font-weight: 600; text-decoration: none; &:hover { text-decoration: underline; }`;

/* ─── DATA ─── */
const metrics = [
  { value: "+247%", label: "trafic organique", indicator: "\u2191 ce trimestre" },
  { value: "Top 3", label: "position moyenne", indicator: "\u2191 12 positions" },
  { value: "+89%", label: "leads qualifi\u00e9s", indicator: "\u2191 vs. mois dernier" },
  { value: "1.2s", label: "temps de charge", indicator: "\u2713 Core Web Vitals" },
];

const problems = [
  { icon: "\uD83D\uDC7B", title: "Votre site est invisible", desc: "Vous avez investi dans un beau site, mais il n\u2019appara\u00eet nulle part sur Google. Vos concurrents trustent les premi\u00e8res positions." },
  { icon: "\u23F3", title: "Pas le temps pour le digital", desc: "Entre vos clients, la gestion et le reste, impossible de trouver du temps pour votre pr\u00e9sence en ligne. Le marketing passe \u00e0 la trappe." },
  { icon: "\uD83D\uDCB8", title: "Des d\u00e9penses sans retour", desc: "Pub Facebook, Google Ads, agences... Vous avez tout essay\u00e9 sans jamais voir de r\u00e9sultats concrets. Votre budget part en fum\u00e9e." },
];

const services = [
  { icon: "\uD83D\uDCBB", title: "Cr\u00e9ation de Site Web", desc: "Un site qui vous ressemble et qui convertit. Design sur-mesure, UX optimis\u00e9e, et performances au top pour transformer vos visiteurs en clients.", tags: ["Image de marque", "Direction artistique", "Responsive design", "Branding complet", "Optimisation vitesse"] },
  { icon: "\uD83D\uDD0D", title: "SEO & R\u00e9f\u00e9rencement", desc: "Montez sur le podium Google. Strat\u00e9gie de mots-cl\u00e9s, optimisation technique, contenu optimis\u00e9 et netlinking pour un trafic qualifi\u00e9 et durable.", tags: ["Audit SEO complet", "Strat\u00e9gie de contenu", "SEO technique", "Cocon s\u00e9mantique", "Suivi mensuel"] },
];

const methodSteps = [
  { num: "01", title: "Audit Gratuit", desc: "30 min pour analyser votre situation, comprendre vos objectifs et identifier les quick wins." },
  { num: "02", title: "Strat\u00e9gie Sur-Mesure", desc: "Un plan d\u2019action personnalis\u00e9 avec des objectifs clairs, un budget d\u00e9fini et un planning r\u00e9aliste." },
  { num: "03", title: "R\u00e9sultats Mesurables", desc: "Ex\u00e9cution, suivi mensuel avec reporting transparent. Vous voyez concr\u00e8tement l\u2019\u00e9volution." },
];

const testimonials = [
  { name: "Sophie L.", role: "Architecte d\u2019int\u00e9rieur, Paris", quote: "Je passais inaper\u00e7ue sur Google. Apr\u00e8s 4 mois avec MKZ, je suis en premi\u00e8re page sur mes mots-cl\u00e9s principaux.", result: "+180% de demandes de devis" },
  { name: "Marc T.", role: "Plombier chauffagiste, Meaux", quote: "Enfin une \u00e9quipe qui parle fran\u00e7ais et pas charabia technique ! Mon nouveau site est pro, rapide, et les clients me trouvent facilement.", result: "+12 nouveaux clients/mois" },
  { name: "Caroline B.", role: "Coach sportif, Chelles", quote: "Apr\u00e8s 6 mois de collaboration, j\u2019ai pu arr\u00eater de payer des pubs Facebook qui ne marchaient pas.", result: "Top 3 Google local" },
  { name: "Pierre D.", role: "Restaurant, Dammartin", quote: "Je ne comprenais rien au SEO. L\u2019\u00e9quipe MKZ a tout g\u00e9r\u00e9 de A \u00e0 Z. Aujourd\u2019hui mes r\u00e9servations en ligne ont explos\u00e9.", result: "x2 r\u00e9servations en ligne" },
  { name: "Anne-Laure M.", role: "Photographe, Melun", quote: "Mon site \u00e9tait vieillissant et ne refl\u00e9tait pas mon travail. MKZ m\u2019a cr\u00e9\u00e9 une vitrine sublime qui met en valeur mes photos.", result: "Portfolio professionnel" },
];

const differentiators = [
  { icon: "\uD83D\uDDE3\uFE0F", title: "On parle fran\u00e7ais", desc: "Z\u00e9ro jargon technique. Je vous explique tout simplement, vous comprenez ce qu\u2019on fait et pourquoi. Promis." },
  { icon: "\uD83D\uDCDE", title: "Je d\u00e9croche", desc: "Une question ? Un doute ? Vous m\u2019appelez, je r\u00e9ponds. Pas de ticket support, pas d\u2019attente 72h. On avance ensemble." },
  { icon: "\uD83D\uDCCA", title: "Vous voyez tout", desc: "Chaque mois, un point clair sur ce qui a \u00e9t\u00e9 fait, les r\u00e9sultats obtenus, et la suite. Pas de bo\u00eete noire." },
  { icon: "\uD83D\uDD13", title: "Vous restez libre", desc: "Votre site vous appartient, vos acc\u00e8s sont les v\u00f4tres. Si demain vous partez, vous partez avec tout. C\u2019est normal." },
];

const cities = ["Paris", "Meaux", "Chelles", "Melun", "Dammartin-en-Go\u00eble", "Roissy", "Senlis", "Marne-la-Vall\u00e9e", "Serris", "Provins", "Fontainebleau", "Cr\u00e9teil", "Saint-Denis", "Bobigny", "Montreuil", "Cergy", "Pontoise", "Versailles", "\u00c9vry", "Nanterre"];
const departments = ["Seine-et-Marne (77)", "Val-de-Marne (94)", "Seine-Saint-Denis (93)", "Val-d\u2019Oise (95)", "Hauts-de-Seine (92)", "Yvelines (78)", "Essonne (91)"];

/* ─── PAGE ─── */
export default function HomeContent() {
  return (
    <>
      <Hero />

      {/* Metrics */}
      <Section alt>
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

      {/* Problems */}
      <Section>
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
      <Section alt>
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

      {/* Method */}
      <Section id="methode">
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

      {/* Testimonials */}
      <Section id="temoignages" alt>
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

      {/* Differentiators */}
      <Section>
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
      <Section alt>
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

      {/* CTA Final */}
      <CTASection>
        <Container>
          <CTABadge>Places limit&eacute;es ce mois-ci</CTABadge>
          <SectionTitle style={{ color: "white" }}>Pr&ecirc;t &agrave; booster votre visibilit&eacute; ?</SectionTitle>
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
      </CTASection>
    </>
  );
}
