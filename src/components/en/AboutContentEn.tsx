"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";
import { CALENDLY } from "@/lib/i18n";

// « À propos » anglais. Ce n'est pas la traduction de AboutContent.tsx : la page
// française rassure un artisan sur le fait qu'on parlera sans jargon, la page
// anglaise doit établir la seule chose qui compte pour un acheteur étranger,
// à savoir que la personne qui fera le travail est réellement française et sait
// mesurer. C'est aussi la page E-E-A-T que les moteurs de réponse citent.

const Wrapper = styled.article`padding: 96px 24px 24px; max-width: 820px; margin: 0 auto;`;

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

  &::before { content: ""; width: 10px; height: 10px; background: ${theme.colors.cta}; }
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: clamp(34px, 4.8vw, 52px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${theme.colors.accent};
`;

const Lead = styled.p`
  margin-top: 20px;
  font-size: 17.5px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const IdentityCard = styled.aside`
  margin: 44px 0;
  display: grid;
  gap: 24px;
  align-items: center;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 28px;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 96px 1fr;
  }
`;

const Portrait = styled.img`
  width: 96px;
  height: 96px;
  border-radius: ${theme.radius.sm};
  object-fit: cover;
  border: 1px solid ${theme.colors.border};
`;

const IdentityName = styled.p`
  font-family: ${theme.fonts.display};
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const IdentityRole = styled.p`
  margin-top: 4px;
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.cta};
`;

const IdentityFacts = styled.ul`
  margin-top: 14px;
  list-style: none;
  font-size: 14px;
  line-height: 1.9;
  color: ${theme.colors.textSecondary};

  li::before { content: "· "; color: ${theme.colors.cta}; }
`;

const H2 = styled.h2`
  margin-top: 52px;
  font-size: 27px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${theme.colors.accent};
`;

const Text = styled.p`
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.78;
  color: ${theme.colors.textSecondary};

  a { color: ${theme.colors.accent}; text-decoration: underline; text-underline-offset: 3px; }
  strong { color: ${theme.colors.text}; font-weight: 600; }
`;

const List = styled.ul`
  margin-top: 16px;
  padding-left: 22px;
  font-size: 16px;
  line-height: 1.78;
  color: ${theme.colors.textSecondary};

  li + li { margin-top: 8px; }
  strong { color: ${theme.colors.text}; font-weight: 600; }
`;

const PullQuote = styled.blockquote`
  margin: 44px 0;
  padding-left: 24px;
  border-left: 3px solid ${theme.colors.cta};
  font-family: ${theme.fonts.display};
  font-style: italic;
  font-size: clamp(21px, 2.6vw, 27px);
  font-weight: 500;
  line-height: 1.35;
  color: ${theme.colors.accent};
`;

const CtaBand = styled.section`
  margin-top: 72px;
  padding: 64px 24px;
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: clamp(26px, 3.6vw, 36px);
  font-weight: 600;
  color: ${theme.colors.textOnDark};
`;

const CtaText = styled.p`
  margin: 14px auto 28px;
  max-width: 52ch;
  font-size: 15.5px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

export default function AboutContentEn() {
  return (
    <>
      <Wrapper>
        <Kicker>About</Kicker>
        <Title>The person who will actually do the work.</Title>
        <Lead>
          If you are hiring someone to make your French market work, there is really only
          one question worth asking: is this person genuinely French, and do they measure
          what they claim? Here is my answer to both, with enough detail that you can
          check it.
        </Lead>

        <IdentityCard>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Portrait src="/images/mickael-leclerc.jpg" alt="Mickaël Leclerc" width={96} height={96} />
          <div>
            <IdentityName>Mickaël Leclerc</IdentityName>
            <IdentityRole>Founder, MKZ</IdentityRole>
            <IdentityFacts>
              <li>Native French speaker, based near Paris (Seine-et-Marne, France)</li>
              <li>20+ years as an IT engineer: infrastructure, automation, DevOps</li>
              <li>MKZ, SAS à associé unique · SIRET 983 662 784 00013 · RCS Meaux</li>
              <li>Working languages: French and English</li>
            </IdentityFacts>
          </div>
        </IdentityCard>

        <H2>Why an infrastructure engineer ended up doing SEO</H2>
        <Text>
          I spent two decades inside large companies building infrastructure, automating
          systems and keeping complicated things running. Not marketing. That background
          turns out to matter more than it sounds, for one reason: engineers are trained
          to distrust a number they cannot reproduce.
        </Text>
        <Text>
          Most of what goes wrong in SEO is not a missing tactic. It is a claim nobody
          verified. <strong>No schema, therefore you are not cited.</strong> That is a
          deduction, not a measurement, and it is wrong roughly as often as it is right.
          The cause is not the effect. If a tool can measure the effect, run the tool and
          quote the number it returned.
        </Text>

        <PullQuote>
          Measure it, or say you could not. Never quietly replace a measurement with an
          estimate.
        </PullQuote>

        <H2>What I do, concretely</H2>
        <List>
          <li>
            <strong>French SEO.</strong> Keyword research done in French before anything
            is written, then the content and technical work that follows from it. Details
            on the <Link href="/en/french-seo/">French SEO page</Link>.
          </li>
          <li>
            <strong>AI search optimisation.</strong> Getting cited inside AI answers in
            French and English, then measuring share of voice rather than assuming it.
            Details on the{" "}
            <Link href="/en/ai-search-optimization/">AI search page</Link>.
          </li>
          <li>
            <strong>Websites, when the existing one is the blocker.</strong> Static, fast,
            bilingual from the first commit. See{" "}
            <Link href="/en/website-design/">website design</Link>.
          </li>
        </List>

        <H2>Who I usually work with</H2>
        <Text>
          Day to day, most of my clients are French: tradespeople, shops and small
          companies competing for French searches in French. That is deliberately relevant
          to you. The French market is not a country entry on my services list, it is the
          market I work in every day, in my own language.
        </Text>
        <Text>
          The other half of the practice is companies based outside France that already
          perform in English and need France to stop being flat. Those two groups look
          different on paper and turn out to need the same thing: French keyword research
          done properly, and content built on what it finds.
        </Text>

        <H2>How I work, and what I will not do</H2>
        <List>
          <li>
            <strong>You talk to me.</strong> No account manager relaying your question to
            someone junior. Less capacity, no layers, nothing lost in a handover.
          </li>
          <li>
            <strong>Every number is traceable.</strong> Search Console, DataForSEO, the AI
            engines themselves. If you want to open the tool and check, you should be able
            to, and I will tell you where to click.
          </li>
          <li>
            <strong>You own everything.</strong> Your site, your accounts, your content,
            your data. If you leave, you leave with all of it.
          </li>
          <li>
            <strong>No guaranteed rankings, ever.</strong> Not on Google, and definitely
            not inside ChatGPT. Anyone guaranteeing either is selling something they do
            not control. What I will commit to is telling you early when something is not
            working.
          </li>
        </List>

        <H2>The methods are published</H2>
        <Text>
          Everything I do is written up in the open, in{" "}
          <Link href="/en/insights/">insights</Link>, with the figures behind each claim
          and the date they were measured. Take them and do the work yourself if you
          prefer. Clients who understand what is happening to their site are better
          clients, and the ones who would rather hand it over know where to find me.
        </Text>
      </Wrapper>

      <CtaBand>
        <CtaTitle>Thirty minutes, and you keep the findings.</CtaTitle>
        <CtaText>
          We look at your French pages, your hreflang, and whether French AI answers ever
          cite you. Free, no commitment, and the findings are yours whether or not you
          work with me.
        </CtaText>
        <Button href={CALENDLY}>Book a free 30-min review</Button>
      </CtaBand>
    </>
  );
}
