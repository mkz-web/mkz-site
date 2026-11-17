import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import AuditGeoCharte from "@/components/charte/pages/AuditGeoCharte";
import { typoFr } from "@/lib/typo";

// Page outil : l'audit GEO gratuit, test en direct des citations par une IA.
//
// Cible mesurée (DataForSEO, France, 17/11/2026) : « audit geo » 355 recherches par mois en
// médiane sur six mois (140 sur les six mois d'avant), CPC 7,06 €. Sur trois relevés mobiles du
// même jour, les sites des dix premiers ont un rang de liens médian de 26 sur 100 et 3,6 ans
// d'âge (MKZ : 36 et 8,5 ans), et le format qui se classe est l'outil en ligne. Le 21/08/2026,
// la requête n'avait aucun volume mesurable : d'où /audit-seo/ à l'époque, et cette page
// aujourd'hui. Relevés : _research/strategie-gagnante-2026-11-17/ (hors git).
//
// Version anglaise DUE, pas encore faite (règle du site bilingue) : la demande anglaise existe,
// mesurée le 17/11/2026 (Google Ads par DataForSEO) : « ai visibility checker » 320 recherches par
// mois aux États-Unis et 170 au Royaume-Uni, « ai visibility audit » 320 et 50, « geo audit » 210
// et 90, « ai search visibility tool » 720 et 30. Elle demande ses propres questions (en anglais,
// autre pays de recherche) et son propre texte, pas une traduction. D'ici là, la page ne déclare
// pas d'alternative hreflang.
//
// Échelle commerciale : ce test gratuit pose trois questions à un seul modèle, une fois. C'est
// le test « Votre nom sort-il ? » rendu immédiat. La mesure complète (vingt questions, quatre
// moteurs, trois passages) reste l'audit référencement IA payant de /tarifs/.
//
// Moteur : phase « citations » de functions/api/_engine.mjs (Pages Function /api/scan).
// Banc : node scripts/test-audit-geo.mjs, sabotages : node scripts/saboter-audit-geo.mjs.

const URL = `${SITE}/audit-geo/`;

export const metadata: Metadata = createMetadata("fr", {
  title: "Audit GEO gratuit : ChatGPT cite-t-il votre entreprise ?",
  description:
    "Test gratuit, en direct : trois questions posées à ChatGPT sur votre métier. Votre entreprise est-elle citée ? Qui l'est à votre place ? Réponse en une minute.",
  path: "/audit-geo/",
});

// Écrite avec des espaces ordinaires, typographiée plus bas (insécables, apostrophes) : le texte
// visible et le JSON-LD FAQPage reçoivent la même chaîne.
const faqBrute: { q: string; a: string }[] = [
  {
    q: "C'est quoi, un audit GEO ?",
    a: "Le GEO (Generative Engine Optimization), ou référencement IA, c'est ce qui amène une IA comme ChatGPT à citer votre entreprise dans ses réponses. Un audit GEO regarde deux choses : ce que l'IA répond quand on lui demande un nom dans votre métier, et si votre site est lisible par ses robots. Cet outil fait la version express des deux, en une minute.",
  },
  {
    q: "L'outil interroge-t-il vraiment ChatGPT ?",
    a: "Il interroge un modèle d'OpenAI, l'éditeur de ChatGPT, avec la recherche web activée, et affiche la réponse telle qu'elle revient. Ce n'est pas l'application ChatGPT de votre téléphone : le modèle, l'historique de la conversation et le moment peuvent changer la réponse. C'est pour cela que la question exacte et le nom du modèle sont écrits sous chaque résultat.",
  },
  {
    q: "Pourquoi le résultat change d'un test à l'autre ?",
    a: "Parce qu'une IA ne répond pas deux fois pareil. Posez la même question à dix minutes d'écart : la liste des noms bouge. C'est comme demander un bon restaurant à dix passants, on n'obtient pas dix fois la même adresse. Un seul test est un sondage. Pour un chiffre solide, il faut répéter : l'audit complet pose chaque question trois fois, à quatre moteurs.",
  },
  {
    q: "Je ne suis pas cité : qu'est-ce que ça veut dire ?",
    a: "Que sur ces questions, à cet instant, l'IA a donné d'autres noms que le vôtre. Les causes les plus fréquentes : un site que ses robots ne peuvent pas lire, un métier et une zone qui ne sont écrits nulle part en clair, ou trop peu de sites qui parlent de vous. Le détail des sites cités à votre place dit déjà beaucoup : ce sont eux que l'IA a trouvés.",
  },
  {
    q: "Est-ce vraiment gratuit ?",
    a: "Oui. Le test est gratuit et sans inscription, et la lecture de vos réponses par Mickaël, envoyée sous 24 h si vous la demandez, l'est aussi. L'audit complet de référencement IA (vingt questions, quatre moteurs, trois passages, plan d'action) est une prestation payante, dont le prix est public sur la page Tarifs.",
  },
  {
    q: "Que faites-vous de ce que je saisis ?",
    a: "Le nom de votre entreprise, votre métier et votre zone entrent dans les questions posées au modèle d'OpenAI, par notre prestataire de mesure. Ce sont des informations d'entreprise. Votre adresse e-mail n'est demandée que si vous voulez la lecture de Mickaël, avec une case de consentement. Les détails et vos droits sont dans la politique de confidentialité.",
  },
];

const faq = faqBrute.map(({ q, a }) => ({ q: typoFr(q), a: typoFr(a) }));

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${URL}#app`,
  name: "Audit GEO gratuit",
  url: URL,
  description:
    "Outil d'audit GEO gratuit en ligne : trois questions posées en direct à un modèle d'OpenAI avec recherche web (deux demandes de recommandation sur le métier et la zone, une question sur l'entreprise), relevé des citations et des sites cités, et mesure de la lisibilité du site par les IA (robots des moteurs IA, llms.txt, données structurées JSON-LD).",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "fr-FR",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  provider: { "@id": `${SITE}/#organization` },
};

export default function AuditGeoPage() {
  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema(faq)!} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Audit GEO gratuit" },
        ])}
      />
      <AuditGeoCharte faq={faq} />
    </>
  );
}
