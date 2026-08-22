"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";
import { CALENDLY } from "@/lib/i18n";

// Accueil anglais. Ce n'est PAS la traduction de HomeContent.tsx.
//
// Le discours français s'adresse à un artisan invisible sur Google dans sa
// ville. Le discours anglais s'adresse à une entreprise qui performe déjà en
// anglais et dont le marché français reste plat : autre problème, autre preuve,
// autres mots-clés. Cibles mesurées (DataForSEO, 30/07/2026) : french seo (90
// US / 170 UK, KD 1 à 4), french seo agency (20 US / 70 UK, KD 3), seo agency
// france (70 US / 70 UK), seo services france (110 UK, KD 9), seo consultant
// france (50 FR-en), plus le cluster IA (ai search optimization 1 300, llm seo
// 880, ai visibility 720).
//
// Le système visuel reprend celui de HomeContent (chapitres numérotés, filets
// 1px, numéraux Fraunces italiques), comme chaque page du projet le fait pour
// elle-même.

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

/* ─── Hero ─── */

const HeroSection = styled.header`
  padding: clamp(56px, 9vh, 104px) 24px clamp(48px, 7vh, 80px);
  border-bottom: 1px solid ${theme.colors.border};
`;

const HeroGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  gap: 48px;
  align-items: start;

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 7fr 5fr;
    gap: 72px;
  }
`;

const HeroKicker = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${theme.colors.textSecondary};
`;

const HeroTitle = styled.h1`
  margin-top: 20px;
  font-size: clamp(36px, 5.4vw, 62px);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -0.015em;
  color: ${theme.colors.accent};

  em {
    font-style: italic;
    color: ${theme.colors.ctaInk};
  }
`;

const HeroSubtitle = styled.p`
  margin-top: 22px;
  max-width: 56ch;
  font-size: 17px;
  line-height: 1.72;
  color: ${theme.colors.textSecondary};
`;

const HeroActions = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 26px;
`;

const QuietLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.text};
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 5px;

  &:hover { color: ${theme.colors.accentLight}; }
`;

const HeroMeta = styled.p`
  margin-top: 28px;
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  line-height: 1.9;
  color: ${theme.colors.textSecondary};

  a { color: ${theme.colors.text}; font-weight: 500; &:hover { color: ${theme.colors.ctaInk}; } }
`;

const Sheet = styled.aside`
  position: relative;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 32px 28px 24px;
  box-shadow: ${theme.shadows.md};
`;

const SheetLabel = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const SheetRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;

  & + & { border-top: 1px solid ${theme.colors.border}; }
`;

const SheetValue = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 34px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${theme.colors.accent};
  white-space: nowrap;
`;

const SheetDesc = styled.span`
  font-size: 13.5px;
  line-height: 1.5;
  color: ${theme.colors.textSecondary};
  text-align: right;
`;

const SheetNote = styled.p`
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid ${theme.colors.border};
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
`;

const Stamp = styled.span`
  position: absolute;
  top: -16px;
  right: 18px;
  transform: rotate(-2deg);
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.ctaInk};
  background: ${theme.colors.background};
  border: 1.5px solid ${theme.colors.cta};
  border-radius: ${theme.radius.sm};
  padding: 7px 12px;
`;

/* ─── Chapitres ─── */

const ChapterHead = styled.header<{ dark?: boolean }>`
  display: grid;
  gap: 16px;
  border-top: 2px solid ${({ dark }) => (dark ? "rgba(246,241,231,0.4)" : theme.colors.borderInk)};
  padding-top: 22px;
  margin-bottom: 56px;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 220px 1fr;
    gap: 32px;
  }
`;

const Kicker = styled.span<{ dark?: boolean }>`
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
  color: ${({ dark }) => (dark ? theme.colors.textOnDarkSecondary : theme.colors.textSecondary)};

  strong { color: ${({ dark }) => (dark ? theme.colors.cta : theme.colors.ctaInk)}; font-weight: 500; }
`;

const ChapterTitle = styled.h2<{ dark?: boolean }>`
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: ${({ dark }) => (dark ? theme.colors.textOnDark : theme.colors.accent)};
`;

const ChapterLede = styled.p<{ dark?: boolean }>`
  margin-top: 14px;
  max-width: 60ch;
  font-size: 16px;
  line-height: 1.7;
  color: ${({ dark }) => (dark ? theme.colors.textOnDarkSecondary : theme.colors.textSecondary)};
`;

/* ─── Problèmes ─── */

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

/* ─── Services ─── */

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
  a { text-decoration: underline; text-underline-offset: 4px; }
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

  &::after { content: "→"; transition: transform 0.18s ${theme.easing}; }
`;

/* ─── Méthode ─── */

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

/* ─── Différenciateurs ─── */

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

/* ─── Insights ─── */

const InsightGrid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(2, 1fr); }
`;

const InsightCard = styled(Link)`
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

const InsightKicker = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.ctaInk};
`;

const InsightTitle = styled.h3`
  margin-top: 12px;
  font-family: ${theme.fonts.display};
  font-size: 21px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const InsightDesc = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  flex: 1;
`;

/* ─── CTA final ─── */

const FinalTitle = styled.h2`
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${theme.colors.textOnDark};
  max-width: 20ch;

  em { font-style: italic; color: ${theme.colors.ctaInk}; }
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

const problems = [
  {
    num: "01",
    title: "You translated instead of researching",
    desc: "Your French pages are your English pages in French. So they target your English keywords, translated. Nobody in France types those. The demand you should be capturing was never in your keyword list.",
  },
  {
    num: "02",
    title: "Your French pages have no French signals",
    desc: "No French internal linking, no French sources, hreflang half wired, a Google Business profile in English. Google sees a foreign site with a French coat of paint, and ranks it accordingly.",
  },
  {
    num: "03",
    title: "AI answers in French quote someone else",
    desc: "Ask ChatGPT or Perplexity a question in French about your category. Count how many times you are cited. That number is usually zero, and nobody on your team is watching it.",
  },
];

const services = [
  {
    kicker: "Service 01",
    title: "French SEO",
    desc: "Keyword research done in French before a word is written, then the content, structure and technical work to rank on what French users actually type. Not a translation pass on your English strategy.",
    tags: "French keyword research · hreflang & site structure · French content · technical SEO · local signals · monthly reporting",
    href: "/en/french-seo/",
    linkLabel: "See how French SEO works",
  },
  {
    kicker: "Service 02",
    title: "AI search optimisation",
    desc: "Getting cited inside AI answers, in French and in English: crawler access, facts a model can quote, clean structured data, llms.txt. Then measured, because share of voice in AI answers can be counted.",
    tags: "GEO / AEO · crawler access · llms.txt · schema.org · citable content · measured share of voice",
    href: "/en/ai-search-optimization/",
    linkLabel: "See how AI search works",
  },
  // Third service, added 21/08/2026: /en/website-design/ sat in the navigation bar but had no
  // link in the home body (journey rule: every nav entry is presented AND linked in the hubs).
  {
    kicker: "Service 03",
    title: "Websites built for France",
    desc: "A site structured for French search from day one: French-first pages, hreflang done right, fast, and readable by AI answer engines. Built to rank on Google.fr, not just to look good.",
    tags: "French-first structure · hreflang · speed · llms.txt & schema.org · you own everything",
    href: "/en/website-design/",
    linkLabel: "See how we build for France",
  },
];

const methodSteps = [
  {
    num: "01",
    title: "Free 30-minute review",
    desc: "We look at your French pages, your hreflang, and whether AI answers in French ever cite you. You leave with the findings, whether or not you hire me.",
  },
  {
    num: "02",
    title: "A plan built on French data",
    desc: "French keyword research, the gap against who ranks in France today, and a shortlist of pages that can realistically move. Clear scope, clear budget, no retainer you cannot exit.",
  },
  {
    num: "03",
    title: "Execution and monthly numbers",
    desc: "The work gets done and measured: positions in France, French organic traffic, and citations in AI answers. If a number did not move, you hear it from me first.",
  },
];

const differentiators = [
  {
    num: "01",
    title: "French is my first language",
    desc: "Your French keyword research is done by someone who thinks in French. That is the whole job, and it is the part agencies outsource to a translation tool.",
  },
  {
    num: "02",
    title: "You talk to the person doing the work",
    desc: "No account manager relaying your question to a junior. You get me. Less capacity, no layers, and nothing lost in the handover.",
  },
  {
    num: "03",
    title: "Everything is measured, not asserted",
    desc: "Every number in a report comes from a tool you can check: Search Console, DataForSEO, the AI engines themselves. If something cannot be measured, I say so instead of estimating it quietly.",
  },
  {
    num: "04",
    title: "You own all of it",
    desc: "Your site, your accounts, your content, your data. If you leave, you leave with everything. That should be normal, and it often is not.",
  },
];

const insights = [
  {
    kicker: "French SEO",
    title: "Why translation never ranks",
    desc: "What French keyword research turns up that a translated page misses, with real query examples.",
    href: "/en/insights/french-seo/",
  },
  {
    kicker: "AI search",
    title: "Getting cited by AI answers",
    desc: "The concrete steps that put you inside a ChatGPT or Perplexity answer, and how to measure whether they worked.",
    href: "/en/insights/ai-search/",
  },
];

/* ─── PAGE ─── */

export default function HomeContentEn() {
  return (
    <>
      <HeroSection>
        <HeroGrid>
          <div>
            <HeroKicker>French SEO &amp; AI search · Paris region, France</HeroKicker>
            <HeroTitle>
              Your site ranks in English. In France, it&rsquo;s <em>flat</em>.
            </HeroTitle>
            <HeroSubtitle>
              That is almost never a translation problem. It is a research problem: your
              French pages target your English keywords, in French. I do the keyword
              research in French first, then build the pages that rank on it, and make
              sure AI answers in French cite you rather than your competitor.
            </HeroSubtitle>
            <HeroActions>
              <Button href={CALENDLY}>Book a free 30-min review</Button>
              <QuietLink href="/en/french-seo/">How French SEO works</QuietLink>
            </HeroActions>
            <HeroMeta>
              Mickaël Leclerc · native French, based near Paris · Mon-Fri 9am-6pm CET ·{" "}
              <a href="tel:+33769093909">+33 7 69 09 39 09</a>
            </HeroMeta>
          </div>

          <Sheet aria-label="Average results measured across MKZ clients in 2025">
            <Stamp>Free review · 24h reply</Stamp>
            <SheetLabel>Client results · 2025</SheetLabel>
            <div>
              <SheetRow>
                <SheetValue>+247%</SheetValue>
                <SheetDesc>organic traffic on average</SheetDesc>
              </SheetRow>
              <SheetRow>
                <SheetValue>Top 3</SheetValue>
                <SheetDesc>average position on Google</SheetDesc>
              </SheetRow>
              <SheetRow>
                <SheetValue>1.2s</SheetValue>
                <SheetDesc>load time (Core Web Vitals passing)</SheetDesc>
              </SheetRow>
            </div>
            <SheetNote>
              Averages measured across 50+ MKZ clients in 2025. These are French
              businesses ranking in France: that is exactly the market you are trying
              to enter.
            </SheetNote>
          </Sheet>
        </HeroGrid>
      </HeroSection>

      {/* 01. Pourquoi ça bloque */}
      <Section variant="dark">
        <Container>
          <ChapterHead dark>
            <Kicker dark><strong>01</strong>&ensp;The usual causes</Kicker>
            <div>
              <ChapterTitle dark>Three reasons foreign sites stay invisible in France.</ChapterTitle>
              <ChapterLede dark>
                Not one of them is about how good your product is. They are all about
                what Google and the AI engines can see in French.
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
            <Kicker><strong>02</strong>&ensp;What I do</Kicker>
            <ChapterTitle>Three jobs, one goal: France stops being your dead market.</ChapterTitle>
          </ChapterHead>
          <ServicesGrid>
            <ServicesAside>
              <p>
                Search is splitting in two. One half still returns ten links, and French
                SEO decides whether you are in them. The other half returns an answer
                with three or four sources, and AI search optimisation decides whether
                you are one of them.
              </p>
              <p>
                Both run on the same foundation: content that is genuinely French and
                facts a machine can quote. That is why I sell them separately and
                usually do them together.
              </p>
              <p>
                The methods are written up in the open, in{" "}
                <Link href="/en/insights/">insights</Link>. Take them and do it
                yourself if you prefer.
              </p>
              <p>
                Want to know where you stand first? The{" "}
                <Link href="/en/seo-audit/">free SEO &amp; AI audit</Link> runs 17
                real checks on your site and scores it out of 100. One minute, no
                signup.
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
      <Section variant="dark" id="method">
        <Container>
          <ChapterHead dark>
            <Kicker dark><strong>03</strong>&ensp;How it runs</Kicker>
            <div>
              <ChapterTitle dark>Three steps, and you can stop after the first.</ChapterTitle>
              <ChapterLede dark>
                The first one is free and you keep the findings. That is deliberate:
                you should be able to judge the work before paying for it.
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
          {/* Mid-page action: 7 mobile screens without one between the services section and
              the final block, measured 21/08/2026 (livraison-web journey rule). */}
          <div style={{ marginTop: 40 }}>
            <Button href={CALENDLY}>Book a free 30-min review</Button>
          </div>
        </Container>
      </Section>

      {/* 04. Différence */}
      <Section variant="alt">
        <Container>
          <ChapterHead>
            <Kicker><strong>04</strong>&ensp;Why me</Kicker>
            <ChapterTitle>A French consultant, not a French-speaking department.</ChapterTitle>
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

      {/* 05. Insights */}
      <Section>
        <Container>
          <ChapterHead>
            <Kicker><strong>05</strong>&ensp;In the open</Kicker>
            <div>
              <ChapterTitle>The methods, published.</ChapterTitle>
              <ChapterLede>
                What actually moves French rankings and AI citations, with the numbers
                behind each claim and the date they were measured.
              </ChapterLede>
            </div>
          </ChapterHead>
          <InsightGrid>
            {insights.map((c) => (
              <InsightCard key={c.title} href={c.href}>
                <InsightKicker>{c.kicker}</InsightKicker>
                <InsightTitle>{c.title}</InsightTitle>
                <InsightDesc>{c.desc}</InsightDesc>
                <ServiceGo className="go">Read the guides</ServiceGo>
              </InsightCard>
            ))}
          </InsightGrid>
        </Container>
      </Section>

      {/* CTA final */}
      <Section variant="dark">
        <Container>
          <FinalTitle>
            Find out where you actually <em>stand</em> in France.
          </FinalTitle>
          <FinalText>
            Thirty minutes. I look at your French pages, your hreflang, and whether AI
            answers in French ever mention you. You get the findings and a plan, free,
            no strings, and you keep them either way.
          </FinalText>
          <FinalActions>
            <Button href={CALENDLY}>Book my slot</Button>
            <Button href="/en/contact/" variant="onDark">Send me a message</Button>
          </FinalActions>
          <FinalMeta>
            Or directly: <a href="tel:+33769093909">+33 7 69 09 39 09</a> · reply within 24h
            <br />
            Not ready to talk? Run the <a href="/en/seo-audit/">free SEO &amp; AI audit</a> first:
            17 checks, one minute, no signup.
          </FinalMeta>
        </Container>
      </Section>
    </>
  );
}
