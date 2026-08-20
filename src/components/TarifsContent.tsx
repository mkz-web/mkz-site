"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

export type TarifsFaqItem = { q: string; a: string };

/* ── Gabarit ──────────────────────────────────────────────────────────── */

const PageHeader = styled.section`
  padding: 96px 24px 40px;
  max-width: 1280px;
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
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: ${theme.colors.accent};
`;

const Subtitle = styled.p`
  margin-top: 18px;
  max-width: 62ch;
  color: ${theme.colors.textSecondary};
  font-size: 17px;
  line-height: 1.7;
`;

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px 8px;
`;

const SectionKicker = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.ctaInk};
`;

const SectionTitle = styled.h2`
  margin-top: 10px;
  font-size: clamp(26px, 3.4vw, 38px);
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const SectionIntro = styled.p`
  margin-top: 12px;
  max-width: 62ch;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

/* ── Engagements ──────────────────────────────────────────────────────── */

const PromiseBand = styled.div`
  max-width: 1280px;
  margin: 24px auto 0;
  padding: 0 24px;
  display: grid;
  gap: 16px;
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PromiseCard = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surfaceAlt};
  padding: 20px 22px;
`;

const PromiseTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.accent};
`;

const PromiseText = styled.p`
  margin-top: 6px;
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
`;

/* ── Lignes d'offres (nom + description + prix) ───────────────────────── */

const OfferList = styled.div`
  margin-top: 26px;
  display: grid;
  gap: 16px;
`;

const OfferRow = styled.div<{ highlight?: boolean }>`
  border: 1px solid ${({ highlight }) => (highlight ? theme.colors.ctaInk : theme.colors.borderInk)};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 24px 26px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px 24px;
`;

const OfferBody = styled.div`
  flex: 1 1 380px;
  min-width: 0;
`;

const OfferBadge = styled.span`
  display: inline-block;
  margin-left: 10px;
  padding: 2px 10px;
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ffffff;
  background: ${theme.colors.ctaInk};
  border-radius: ${theme.radius.sm};
  vertical-align: middle;
  white-space: nowrap;
`;

const OfferName = styled.h3`
  font-size: 19px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const OfferDesc = styled.p`
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const OfferPrice = styled.p`
  flex: 0 0 auto;
  font-family: ${theme.fonts.display};
  font-size: 26px;
  font-weight: 600;
  color: ${theme.colors.accent};
  white-space: nowrap;

  small {
    display: block;
    text-align: right;
    font-family: ${theme.fonts.sans};
    font-size: 13px;
    font-weight: 400;
    color: ${theme.colors.textSecondary};
  }
`;

/* ── Colonnes (maintenance + forfaits SEO) ────────────────────────────── */

const TierGrid = styled.div`
  margin-top: 26px;
  display: grid;
  gap: 16px;
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TierCard = styled.div<{ highlight?: boolean }>`
  border: 1px solid ${({ highlight }) => (highlight ? theme.colors.ctaInk : theme.colors.borderInk)};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 26px;
  display: flex;
  flex-direction: column;
`;

const TierName = styled.h3`
  font-size: 19px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const TierPrice = styled.p`
  margin-top: 10px;
  font-family: ${theme.fonts.display};
  font-size: 30px;
  font-weight: 600;
  color: ${theme.colors.accent};

  span {
    font-size: 15px;
    font-weight: 400;
    color: ${theme.colors.textSecondary};
  }
`;

const TierList = styled.ul`
  margin-top: 14px;
  display: grid;
  gap: 8px;
  list-style: none;
  padding: 0;

  li {
    font-size: 16px;
    line-height: 1.6;
    color: ${theme.colors.textSecondary};
    padding-left: 22px;
    position: relative;

    &::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: ${theme.colors.ctaInk};
      font-weight: 600;
    }
  }
`;

const Note = styled.p`
  margin-top: 16px;
  font-size: 16px;
  font-style: italic;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
  max-width: 78ch;
`;

/* ── Inclus dans chaque site ──────────────────────────────────────────── */

const IncludedBand = styled.div`
  margin-top: 26px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surfaceAlt};
  padding: 26px 28px;
`;

const IncludedTitle = styled.p`
  font-weight: 600;
  font-size: 17px;
  color: ${theme.colors.accent};
`;

const IncludedGrid = styled.ul`
  margin-top: 14px;
  display: grid;
  gap: 10px 28px;
  list-style: none;
  padding: 0;
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  li {
    font-size: 16px;
    line-height: 1.65;
    color: ${theme.colors.textSecondary};
    padding-left: 22px;
    position: relative;

    &::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: ${theme.colors.ctaInk};
      font-weight: 600;
    }

    strong { color: ${theme.colors.text}; }
  }
`;

/* ── Pack ─────────────────────────────────────────────────────────────── */

const PackBand = styled.div`
  max-width: 1280px;
  margin: 48px auto 0;
  padding: 0 24px;
`;

const PackInner = styled.div`
  border: 1px solid ${theme.colors.ctaInk};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 30px 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 32px;
`;

const PackBody = styled.div`
  flex: 1 1 380px;
`;

const PackTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const PackText = styled.p`
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const PackPrice = styled.p`
  font-family: ${theme.fonts.display};
  font-size: 34px;
  font-weight: 600;
  color: ${theme.colors.accent};
  white-space: nowrap;

  small {
    display: block;
    text-align: right;
    font-family: ${theme.fonts.sans};
    font-size: 14px;
    font-weight: 400;
    color: ${theme.colors.textSecondary};
    text-decoration: line-through;
  }
`;

/* ── Repères marché ───────────────────────────────────────────────────── */

const MarketList = styled.div`
  margin-top: 26px;
  display: grid;
  gap: 12px;
`;

const MarketRow = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 18px 22px;
  display: grid;
  gap: 8px 24px;
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1.1fr 2fr 0.9fr;
    align-items: baseline;
  }
`;

const MarketCellLabel = styled.span`
  display: block;
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.textSecondary};
  margin-bottom: 2px;
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MarketName = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${theme.colors.accent};
`;

const MarketRange = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.textSecondary};
`;

const MarketMkz = styled.p`
  font-weight: 600;
  font-size: 17px;
  color: ${theme.colors.ctaInk};
  @media (min-width: ${theme.breakpoints.md}) {
    text-align: right;
  }
`;

/* ── FAQ ──────────────────────────────────────────────────────────────── */

const FaqList = styled.div`
  margin-top: 26px;
  display: grid;
  gap: 16px;
  max-width: 900px;
`;

const FaqItem = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface};
  padding: 22px 26px;
`;

const FaqQuestion = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const FaqAnswer = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.textSecondary};
`;

/* ── CTA ──────────────────────────────────────────────────────────────── */

const CTASection = styled.section`
  margin-top: 72px;
  padding: 96px 24px;
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
`;

const CTAInner = styled.div`max-width: 1280px; margin: 0 auto;`;

const CTATitle = styled.h2`
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 600;
  color: ${theme.colors.textOnDark};
`;

const CTAText = styled.p`
  margin-top: 14px;
  max-width: 58ch;
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

const InlineLink = styled(Link)`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  &:hover { color: ${theme.colors.ctaInk}; }
`;

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function TarifsContent({ faq }: { faq: TarifsFaqItem[] }) {
  return (
    <>
      <PageHeader>
        <Kicker>Tarifs 2026</Kicker>
        <Title>Nos tarifs&nbsp;: site internet, SEO, référencement IA</Title>
        <Subtitle>
          La plupart des prestataires cachent leurs prix. Nous, on les affiche.
          Chaque tarif ci-dessous est un prix de base réel, en euros HT, confirmé par
          un <strong>devis fixe écrit avant toute signature</strong>&nbsp;: le prix annoncé
          est le prix payé. Et tout commence par un{" "}
          <InlineLink href="/contact/">diagnostic gratuit de 30 minutes</InlineLink>, sans engagement.
        </Subtitle>
      </PageHeader>

      <PromiseBand>
        <PromiseCard>
          <PromiseTitle>Propriétaire à 100&nbsp;%</PromiseTitle>
          <PromiseText>Site, nom de domaine, contenus, accès&nbsp;: tout est à vous. Coût de sortie&nbsp;: 0&nbsp;€.</PromiseText>
        </PromiseCard>
        <PromiseCard>
          <PromiseTitle>Devis fixe écrit</PromiseTitle>
          <PromiseText>Le prix est posé noir sur blanc avant de commencer, et il ne bouge plus.</PromiseText>
        </PromiseCard>
        <PromiseCard>
          <PromiseTitle>Sans engagement</PromiseTitle>
          <PromiseText>Les prestations mensuelles s&rsquo;arrêtent quand vous voulez, préavis de 30 jours.</PromiseText>
        </PromiseCard>
        <PromiseCard>
          <PromiseTitle>Résultats mesurés</PromiseTitle>
          <PromiseText>Chaque rapport contient des chiffres relevés&nbsp;: positions, visites, citations par les IA.</PromiseText>
        </PromiseCard>
      </PromiseBand>

      {/* ── 1. Création de site ── */}
      <Section id="creation-site">
        <SectionKicker>01 · Création de site</SectionKicker>
        <SectionTitle>Créer votre site internet</SectionTitle>
        <SectionIntro>
          Ici, on ne livre pas «&nbsp;un site&nbsp;»&nbsp;: on livre un <strong>service
          packagé</strong>. Chaque formule part avec son optimisation SEO complète et ses
          premiers liens entrants, parce qu&rsquo;un site sans référencement est une carte de
          visite rangée dans un tiroir. Le détail est sur la page{" "}
          <InlineLink href="/creation-site-internet/">création de site internet</InlineLink>.
        </SectionIntro>

        <OfferList>
          <OfferRow>
            <OfferBody>
              <OfferName>Site une page «&nbsp;Présence&nbsp;»</OfferName>
              <OfferDesc>
                Une seule page qui dit l&rsquo;essentiel&nbsp;: votre activité, vos services,
                votre zone d&rsquo;intervention, vos avis clients, un formulaire de contact.
                Livré en 2 semaines.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>590&nbsp;€</OfferPrice>
          </OfferRow>

          <OfferRow highlight>
            <OfferBody>
              <OfferName>
                Site vitrine «&nbsp;Pro&nbsp;», 5 à 8 pages
                <OfferBadge>Recommandé</OfferBadge>
              </OfferName>
              <OfferDesc>
                Le format qui convient à la plupart des artisans, commerces et TPE&nbsp;:
                accueil, pages services, réalisations, contact. Rédaction des textes incluse.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>1&nbsp;490&nbsp;€</OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Site vitrine «&nbsp;Premium&nbsp;», 10 à 15 pages</OfferName>
              <OfferDesc>
                Design personnalisé, pages par métier et par ville, version anglaise possible.
                Pour viser la première place sur votre marché local.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>2&nbsp;490&nbsp;€</OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Site e-commerce (WooCommerce)</OfferName>
              <OfferDesc>
                Catalogue, panier, paiement sécurisé, gestion des commandes et des stocks,
                formation à la prise en main.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>
              2&nbsp;990&nbsp;€<small>à partir de</small>
            </OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Refonte de site existant</OfferName>
              <OfferDesc>
                Reprise d&rsquo;un site vieillissant sans rien perdre&nbsp;: contenus migrés,
                redirections soignées, référencement préservé. Prix fixé après le diagnostic gratuit.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>
              990&nbsp;€<small>à partir de</small>
            </OfferPrice>
          </OfferRow>
        </OfferList>

        <IncludedBand>
          <IncludedTitle>Inclus dans chaque site, sans supplément&nbsp;: le package complet</IncludedTitle>
          <IncludedGrid>
            <li><strong>Optimisation SEO dès le départ</strong>&nbsp;: mots-clés mesurés, titres et balises optimisés, vitesse, sitemap, Google Search Console configurée. Le site part déjà armé pour Google.</li>
            <li><strong>Vos premiers liens entrants</strong>&nbsp;: fiche Google Business reliée au site, inscription aux annuaires de référence de votre métier et de votre ville. Votre socle d&rsquo;autorité démarre au jour&nbsp;1.</li>
            <li><strong>Pensé mobile d&rsquo;abord</strong>&nbsp;: votre site s&rsquo;affiche parfaitement sur téléphone, là où vos clients vous cherchent.</li>
            <li><strong>Prêt pour les moteurs IA</strong>&nbsp;: balisage JSON-LD et fichier llms.txt, pour être lisible par ChatGPT et Perplexity, pas seulement par Google.</li>
            <li><strong>Conformité RGPD</strong> et mentions légales.</li>
            <li><strong>Formation d&rsquo;une heure</strong> à la prise en main, et 30 jours de corrections après la mise en ligne.</li>
            <li><strong>Nom de domaine déposé à votre nom</strong>, jamais au nôtre.</li>
          </IncludedGrid>
        </IncludedBand>

        <SectionTitle as="h3" style={{ fontSize: 24, marginTop: 44 }}>
          Maintenance&nbsp;: votre site reste à jour et en bonne santé
        </SectionTitle>
        <TierGrid>
          <TierCard>
            <TierName>Essentiel</TierName>
            <TierPrice>29&nbsp;€ <span>HT/mois</span></TierPrice>
            <TierList>
              <li>Mises à jour et sauvegardes</li>
              <li>Surveillance de disponibilité</li>
              <li>Certificat de sécurité</li>
            </TierList>
          </TierCard>
          <TierCard>
            <TierName>Sérénité</TierName>
            <TierPrice>59&nbsp;€ <span>HT/mois</span></TierPrice>
            <TierList>
              <li>Tout Essentiel</li>
              <li>1&nbsp;h de modifications par mois</li>
              <li>Réponse sous 48&nbsp;h ouvrées</li>
            </TierList>
          </TierCard>
          <TierCard>
            <TierName>Partenaire</TierName>
            <TierPrice>99&nbsp;€ <span>HT/mois</span></TierPrice>
            <TierList>
              <li>Tout Sérénité</li>
              <li>3&nbsp;h d&rsquo;évolutions par mois</li>
              <li>Point trimestriel sur vos chiffres</li>
            </TierList>
          </TierCard>
        </TierGrid>
        <Note>
          Sans engagement de durée. Repère marché 2026&nbsp;: de 39 à 290&nbsp;€/mois,
          et de 100 à 500&nbsp;€/mois en agence.
        </Note>
      </Section>

      {/* ── 2. SEO ── */}
      <Section id="seo">
        <SectionKicker>02 · Référencement SEO</SectionKicker>
        <SectionTitle>Être trouvé sur Google</SectionTitle>
        <SectionIntro>
          Audit d&rsquo;abord, accompagnement ensuite&nbsp;: on ne vend pas un abonnement
          avant d&rsquo;avoir mesuré où vous en êtes. La méthode complète est sur la page{" "}
          <InlineLink href="/referencement-seo/">référencement SEO</InlineLink>.
        </SectionIntro>

        <OfferList>
          <OfferRow>
            <OfferBody>
              <OfferName>Diagnostic de 30 minutes</OfferName>
              <OfferDesc>
                Un échange en visio et un premier relevé chiffré de votre visibilité. Sans engagement.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>Gratuit</OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Audit SEO complet</OfferName>
              <OfferDesc>
                Technique, contenus, concurrence, plan d&rsquo;action priorisé, restitution
                d&rsquo;une heure en visio. Sites jusqu&rsquo;à 30 pages, au-delà sur devis.
                L&rsquo;audit est déduit de votre première facture si vous démarrez un
                accompagnement dans les 30 jours.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>490&nbsp;€</OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Audit SEO + visibilité IA</OfferName>
              <OfferDesc>
                L&rsquo;audit complet, plus la mesure réelle de vos citations par ChatGPT,
                Perplexity, Gemini et Mistral.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>690&nbsp;€</OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Pack visibilité locale</OfferName>
              <OfferDesc>
                Fiche Google Business optimisée, coordonnées cohérentes sur les annuaires qui
                comptent, méthode de collecte d&rsquo;avis clients. Option suivi mensuel
                (publications, avis, photos, rapport)&nbsp;: 99&nbsp;€/mois.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>390&nbsp;€</OfferPrice>
          </OfferRow>
        </OfferList>

        <SectionTitle as="h3" style={{ fontSize: 24, marginTop: 44 }}>
          Accompagnement SEO mensuel
        </SectionTitle>
        <TierGrid>
          <TierCard>
            <TierName>Fondations</TierName>
            <TierPrice>390&nbsp;€ <span>HT/mois</span></TierPrice>
            <TierList>
              <li>1 article optimisé par mois</li>
              <li>Optimisations continues du site</li>
              <li>Suivi des positions, rapport chiffré</li>
            </TierList>
          </TierCard>
          <TierCard highlight>
            <TierName>Croissance <OfferBadge>La plus choisie</OfferBadge></TierName>
            <TierPrice>690&nbsp;€ <span>HT/mois</span></TierPrice>
            <TierList>
              <li>2 articles optimisés par mois</li>
              <li>1 à 2 liens entrants de qualité</li>
              <li>Suivi de votre visibilité locale</li>
              <li>1&nbsp;h de conseil en visio</li>
            </TierList>
          </TierCard>
          <TierCard>
            <TierName>Référence</TierName>
            <TierPrice>1&nbsp;190&nbsp;€ <span>HT/mois</span></TierPrice>
            <TierList>
              <li>4 contenus par mois</li>
              <li>Netlinking renforcé</li>
              <li>Référencement IA inclus, citations re-mesurées chaque mois</li>
              <li>Veille concurrentielle</li>
            </TierList>
          </TierCard>
        </TierGrid>
        <Note>
          Sans engagement de durée, préavis de 30 jours. Le référencement est un travail de
          fond&nbsp;: comptez 6 mois pour des résultats solides. Nous vous le disons avant de
          facturer, pas après.
        </Note>

        <IncludedBand style={{ marginTop: 36 }}>
          <IncludedTitle>À la carte</IncludedTitle>
          <IncludedGrid>
            <li><strong>Article SEO à l&rsquo;unité</strong>&nbsp;: 1&nbsp;200 mots et plus, mots-clés mesurés, maillage interne, balisage complet&nbsp;: <strong>199&nbsp;€</strong>.</li>
            <li><strong>Netlinking en toute transparence</strong>&nbsp;: chaque lien choisi à la main, son prix d&rsquo;achat refacturé à l&rsquo;euro près, plus <strong>70&nbsp;€ de sélection et de pose par lien</strong>. Budget conseillé&nbsp;: 150 à 500&nbsp;€/mois selon votre concurrence.</li>
          </IncludedGrid>
        </IncludedBand>
      </Section>

      {/* ── 3. Référencement IA ── */}
      <Section id="referencement-ia">
        <SectionKicker>03 · Référencement IA (GEO)</SectionKicker>
        <SectionTitle>Être cité par les IA</SectionTitle>
        <SectionIntro>
          Vos clients posent déjà leurs questions à ChatGPT ou Perplexity. Le{" "}
          <InlineLink href="/referencement-ia/">référencement IA</InlineLink>, aussi appelé GEO,
          consiste à faire de votre entreprise la réponse que ces moteurs citent.
          Nous le mesurons réellement, requête par requête&nbsp;: jamais au doigt mouillé.
        </SectionIntro>

        <OfferList>
          <OfferRow>
            <OfferBody>
              <OfferName>Audit de visibilité IA</OfferName>
              <OfferDesc>
                Mesure réelle de vos citations sur ChatGPT, Perplexity, Gemini et Mistral,
                analyse sur 5 piliers, plan d&rsquo;action priorisé.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>490&nbsp;€</OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Socle technique IA</OfferName>
              <OfferDesc>
                Fichier llms.txt, données structurées, robots IA autorisés, données chiffrées
                citables. Déjà inclus dans tout site créé par MKZ.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>390&nbsp;€</OfferPrice>
          </OfferRow>

          <OfferRow>
            <OfferBody>
              <OfferName>Option IA sur un accompagnement</OfferName>
              <OfferDesc>
                Ajoutée à Fondations ou Croissance&nbsp;: citations re-mesurées chaque mois et
                optimisations continues. Incluse dans la formule Référence.
              </OfferDesc>
            </OfferBody>
            <OfferPrice>
              +200&nbsp;€<small>HT/mois</small>
            </OfferPrice>
          </OfferRow>
        </OfferList>
      </Section>

      {/* ── Pack ── */}
      <PackBand>
        <PackInner>
          <PackBody>
            <PackTitle>Pack Décollage&nbsp;: site + visibilité locale</PackTitle>
            <PackText>
              Site vitrine «&nbsp;Pro&nbsp;» + Pack visibilité locale, le socle technique IA
              déjà compris dans le site. L&rsquo;équipement complet d&rsquo;un artisan ou
              d&rsquo;un commerce qui démarre sa visibilité.
            </PackText>
          </PackBody>
          <PackPrice>
            1&nbsp;690&nbsp;€<small>au lieu de 1&nbsp;880&nbsp;€</small>
          </PackPrice>
        </PackInner>
      </PackBand>

      {/* ── Repères marché ── */}
      <Section id="marche">
        <SectionKicker>Repères</SectionKicker>
        <SectionTitle>Où se situent ces prix sur le marché&nbsp;?</SectionTitle>
        <SectionIntro>
          Ces tarifs sont posés en connaissance du marché français, sources publiques à
          l&rsquo;appui, fourchettes relevées en août 2026. Pour le détail complet du marché,
          devis décortiqué ligne par ligne, lisez notre guide{" "}
          <InlineLink href="/conseils/creation-site-internet/combien-coute-un-site-internet/">
            combien coûte un site internet
          </InlineLink>.
        </SectionIntro>

        <MarketList>
          <MarketRow>
            <MarketName><MarketCellLabel>Prestation</MarketCellLabel>Site vitrine 5 à 10 pages</MarketName>
            <MarketRange><MarketCellLabel>Marché France</MarketCellLabel>900 à 5&nbsp;000&nbsp;€ (grille France Num / Afnic, juin 2025), 3&nbsp;000 à 8&nbsp;000&nbsp;€ en agence (relevés 2026)</MarketRange>
            <MarketMkz><MarketCellLabel>Chez MKZ</MarketCellLabel>1&nbsp;490&nbsp;€</MarketMkz>
          </MarketRow>
          <MarketRow>
            <MarketName><MarketCellLabel>Prestation</MarketCellLabel>Site e-commerce</MarketName>
            <MarketRange><MarketCellLabel>Marché France</MarketCellLabel>3&nbsp;000 à 10&nbsp;000&nbsp;€ (France Num / Afnic), budget conseillé 4&nbsp;000 à 6&nbsp;000&nbsp;€ pour un WooCommerce sérieux (relevés 2026)</MarketRange>
            <MarketMkz><MarketCellLabel>Chez MKZ</MarketCellLabel>dès 2&nbsp;990&nbsp;€</MarketMkz>
          </MarketRow>
          <MarketRow>
            <MarketName><MarketCellLabel>Prestation</MarketCellLabel>Audit SEO</MarketName>
            <MarketRange><MarketCellLabel>Marché France</MarketCellLabel>500 à 3&nbsp;000&nbsp;€, le plus souvent 800 à 1&nbsp;200&nbsp;€ pour un site vitrine (relevés 2026)</MarketRange>
            <MarketMkz><MarketCellLabel>Chez MKZ</MarketCellLabel>490&nbsp;€</MarketMkz>
          </MarketRow>
          <MarketRow>
            <MarketName><MarketCellLabel>Prestation</MarketCellLabel>Accompagnement SEO mensuel</MarketName>
            <MarketRange><MarketCellLabel>Marché France</MarketCellLabel>500 à 2&nbsp;500&nbsp;€/mois (seo.fr, juin 2026), jusqu&rsquo;à 5&nbsp;000&nbsp;€/mois en agence (relevés 2026)</MarketRange>
            <MarketMkz><MarketCellLabel>Chez MKZ</MarketCellLabel>390 à 1&nbsp;190&nbsp;€/mois</MarketMkz>
          </MarketRow>
          <MarketRow>
            <MarketName><MarketCellLabel>Prestation</MarketCellLabel>Audit référencement IA</MarketName>
            <MarketRange><MarketCellLabel>Marché France</MarketCellLabel>1&nbsp;500 à 3&nbsp;000&nbsp;€ chez les agences GEO (relevés 2026, marché jeune et peu standardisé)</MarketRange>
            <MarketMkz><MarketCellLabel>Chez MKZ</MarketCellLabel>490&nbsp;€</MarketMkz>
          </MarketRow>
          <MarketRow>
            <MarketName><MarketCellLabel>Prestation</MarketCellLabel>Maintenance</MarketName>
            <MarketRange><MarketCellLabel>Marché France</MarketCellLabel>39 à 290&nbsp;€/mois chez les indépendants, 100 à 500&nbsp;€/mois en agence (relevés 2026)</MarketRange>
            <MarketMkz><MarketCellLabel>Chez MKZ</MarketCellLabel>29 à 99&nbsp;€/mois</MarketMkz>
          </MarketRow>
        </MarketList>
        <Note>
          Positionnement volontaire&nbsp;: des prix d&rsquo;indépendant expérimenté, sous les
          grilles d&rsquo;agence, pour des livrables mesurés et vérifiables.
        </Note>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq">
        <SectionKicker>Questions fréquentes</SectionKicker>
        <SectionTitle>Vos questions sur nos tarifs</SectionTitle>
        <FaqList>
          {faq.map((f) => (
            <FaqItem key={f.q}>
              <FaqQuestion>{f.q}</FaqQuestion>
              <FaqAnswer>{f.a}</FaqAnswer>
            </FaqItem>
          ))}
        </FaqList>
      </Section>

      <CTASection>
        <CTAInner>
          <CTATitle>Un chiffre vous parle&nbsp;? Vérifions-le ensemble.</CTATitle>
          <CTAText>
            Réservez votre diagnostic gratuit de 30 minutes&nbsp;: on regarde votre visibilité
            réelle, on vérifie vos droits aux aides, et vous repartez avec un devis fixe écrit.
            Sans engagement.
          </CTAText>
          <div style={{ marginTop: 32 }}>
            <Button href={CALENDLY}>Réserver mon diagnostic gratuit</Button>
          </div>
        </CTAInner>
      </CTASection>
    </>
  );
}
