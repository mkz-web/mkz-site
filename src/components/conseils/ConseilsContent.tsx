"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { ui, type Locale } from "@/lib/i18n";
import Button from "@/components/Button";
import { ArticleCard, CardsGrid, type ArticleCardData } from "./cards";
import { renderInline } from "@/components/article/ArticleRenderer";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

export interface CategoryCardData {
  slug: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  count: number;
}

const Hero = styled.header`
  padding: 96px 24px 56px;
  border-bottom: 1px solid ${theme.colors.border};
`;

const HeroInner = styled.div`max-width: 1280px; margin: 0 auto;`;

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
    background: ${theme.colors.cta};
  }
`;

const HeroTitle = styled.h1`
  margin-top: 20px;
  font-size: clamp(38px, 5.5vw, 64px);
  font-weight: 600;
  line-height: 1.06;
  color: ${theme.colors.accent};

  em { font-style: italic; color: ${theme.colors.ctaInk}; }
`;

const HeroSub = styled.p`
  margin-top: 18px;
  max-width: 60ch;
  font-size: 16.5px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const Section = styled.section`padding: 64px 24px;`;
const Container = styled.div`max-width: 1280px; margin: 0 auto;`;

const GroupHead = styled.div`
  border-top: 2px solid ${theme.colors.borderInk};
  padding-top: 18px;
  margin-bottom: 32px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
`;

const GroupTitle = styled.h2`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
  color: ${theme.colors.accent};

  a { color: inherit; text-decoration: none; &:hover { text-decoration: underline; } }
`;

// Sommaire ancré et articles regroupés par silo (29/09/2026). Le hub listait tous les articles
// à plat sous « Derniers articles » : il a franchi 10 000 caractères avec le premier article de la
// veille autonome (seuil du sommaire, règle parcours de livraison-web), et il s'allonge d'un
// article par semaine. Regrouper par cocon donne au sommaire une destination utile et fait du hub
// la tête des silos (méthode du cocon sémantique, _veille/carte-sujets.json). Même dessin que le
// sommaire des piliers (PillarContent).
const Toc = styled.nav`
  margin-top: 28px;
  max-width: 640px;
  padding: 16px 20px 18px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surfaceAlt};
  p { margin: 0 0 8px; font-family: ${theme.fonts.mono}; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: ${theme.colors.textSecondary}; }
  ol { margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 0; }
  li { font-size: 14.5px; line-height: 1.45; color: ${theme.colors.textSecondary}; }
  /* Cible tactile de 44 px au moins (règle mobile) : mesurée à 16 px sans ce padding, le 29/09/2026. */
  a { display: inline-block; padding: 12px 0; color: ${theme.colors.accent}; text-decoration: none; &:hover { text-decoration: underline; } }
`;

const GroupSection = styled.section`
  padding: 0 24px 64px;
  scroll-margin-top: 90px;
`;

const CatGrid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${theme.breakpoints.md}) { grid-template-columns: repeat(3, 1fr); }
`;

const CatCard = styled(Link)`
  display: block;
  padding: 30px;
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  transition: all 0.18s ${theme.easing};

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 rgba(34, 31, 26, 0.16);
    .go { color: ${theme.colors.ctaInk}; }
    .go::after { transform: translateX(5px); }
  }
`;

const CatCount = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.ctaInk};
`;

const CatName = styled.h2`
  margin-top: 12px;
  font-family: ${theme.fonts.display};
  font-size: 23px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const CatDesc = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const CatGo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text};
  transition: color 0.18s ${theme.easing};

  &::after { content: "→"; transition: transform 0.18s ${theme.easing}; }
`;

const CtaBand = styled.section`
  margin-top: 32px;
  padding: 88px 24px;
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
`;

const CtaInner = styled.div`max-width: 1280px; margin: 0 auto;`;

const CtaTitle = styled.h2`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 600;
  color: ${theme.colors.textOnDark};

  em { font-style: italic; color: ${theme.colors.ctaInk}; }
`;

const CtaText = styled.p`
  margin: 14px 0 28px;
  max-width: 54ch;
  font-size: 15.5px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

// Renvoi vers les outils gratuits sous le CTA (22/08/2026) : le lecteur des
// conseils est en phase « je me renseigne », l'outil est la marche d'avant.
const CtaAlt = styled.p`
  margin-top: 22px;
  max-width: 60ch;
  font-size: 14.5px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};

  a {
    color: ${theme.colors.textOnDark};
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover { color: ${theme.colors.cta}; }
  }
`;

export default function ConseilsContent({
  categories,
  latest,
  locale = "fr",
}: {
  categories: CategoryCardData[];
  latest: ArticleCardData[];
  locale?: Locale;
}) {
  const t = ui[locale].newsroom;
  const tocTitle = ui[locale].article.tocTitle;
  // Un groupe par rubrique, dans l'ordre des rubriques ; les articles gardent l'ordre reçu (du plus
  // récent au plus ancien). Un article dont la rubrique serait inconnue n'est jamais perdu : il
  // tombe dans un dernier groupe sous le titre « Derniers articles ».
  const groupes = categories
    .map((c) => ({ id: "rubrique-" + c.slug, name: c.name, url: c.url as string | null, items: latest.filter((a) => a.categoryName === c.name) }))
    .filter((g) => g.items.length > 0);
  const orphelins = latest.filter((a) => !categories.some((c) => c.name === a.categoryName));
  if (orphelins.length) groupes.push({ id: "autres-articles", name: t.latest, url: null, items: orphelins });
  return (
    <>
      <Hero>
        <HeroInner>
          <Kicker>{t.kicker}</Kicker>
          <HeroTitle>
            {t.titleBefore}
            <em>{t.titleEm}</em>
            {t.titleAfter}
          </HeroTitle>
          <HeroSub>{t.sub}</HeroSub>
          {groupes.length >= 3 && (
            <Toc aria-label={tocTitle}>
              <p>{tocTitle}</p>
              <ol>
                {groupes.map((g) => (
                  <li key={g.id}>
                    <a href={"#" + g.id}>{g.name}</a>{" "}· {t.articleCount(g.items.length)}
                  </li>
                ))}
              </ol>
            </Toc>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          <GroupHead>
            <GroupTitle>{t.byTopic}</GroupTitle>
          </GroupHead>
          <CatGrid>
            {categories.map((c) => (
              <CatCard key={c.slug} href={c.url}>
                <CatCount>{t.articleCount(c.count)}</CatCount>
                <CatName>{c.name}</CatName>
                {/* Même traitement que les extraits d'article : ces libellés
                    acceptent le mini-markdown, ils doivent donc être rendus,
                    pas affichés bruts. La carte étant un <Link>, pas de lien. */}
                <CatDesc>{renderInline(c.description, { links: false })}</CatDesc>
                <CatGo className="go">{t.explore}</CatGo>
              </CatCard>
            ))}
          </CatGrid>
        </Container>
      </Section>

      {groupes.map((g) => (
        <GroupSection key={g.id} id={g.id}>
          <Container>
            <GroupHead>
              <GroupTitle>{g.url ? <Link href={g.url}>{g.name}</Link> : g.name}</GroupTitle>
              <CatCount>{t.articleCount(g.items.length)}</CatCount>
            </GroupHead>
            <CardsGrid>
              {g.items.map((a) => (
                <ArticleCard key={a.url} article={a} locale={locale} />
              ))}
            </CardsGrid>
          </Container>
        </GroupSection>
      ))}

      <CtaBand>
        <CtaInner>
          <CtaTitle>
            {t.ctaTitleBefore}
            <em>{t.ctaTitleEm}</em>
            {t.ctaTitleAfter}
          </CtaTitle>
          <CtaText>{t.ctaText}</CtaText>
          <Button href={CALENDLY}>{t.ctaButton}</Button>
          <CtaAlt>
            {t.tools.before} <a href={t.tools.href}>{t.tools.label}</a>.
          </CtaAlt>
        </CtaInner>
      </CtaBand>
    </>
  );
}
