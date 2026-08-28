import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, collectionPageSchema, SITE } from "@/lib/schema";
import ToolsContent, { type ToolsPageContent } from "@/components/ToolsContent";

// Hub des outils gratuits, créé le 22/08/2026. Page de NAVIGATION et de
// conversion, pas une page SEO : aucune requête « outils seo gratuits » n'a
// été visée ni mesurée, chaque outil vise déjà sa propre requête (/audit-seo/ :
// « audit seo gratuit » 880/mois ; /empreinte-ia/ : « empreinte carbone ia »
// 140/mois, DataForSEO). Le hub existe pour trois raisons mesurées sur
// l'accueil en prod le 22/08/2026 (1 280 × 720) : premier lien vers l'audit à
// 2 067 px du haut, zéro lien vers l'empreinte IA, zéro outil dans la barre.
// Il donne une entrée « Outils » à la barre, un point d'arrivée au maillage,
// et une place à chaque outil futur. Pendant hreflang : /en/tools/.
//
// Les faits de chaque carte sont repris des pages des outils (17 mesures, une
// minute, sans inscription ; énergie, CO2 et eau, fourchettes d'incertitude,
// jeu de données versionné) : rien n'est promis ici qui ne soit mesuré là-bas.

const URL = `${SITE}/outils/`;

export const metadata: Metadata = createMetadata("fr", {
  // Le layout ajoute « | MKZ » : 65 caractères suffixe compris, mesuré par
  // validate-out (68 avec l'intitulé long, 22/08/2026).
  title: "Outils gratuits : audit SEO + IA et empreinte IA",
  description:
    "Outils gratuits, sans inscription : l'audit SEO + IA qui mesure votre site en une minute, et le simulateur d'empreinte d'une requête IA (énergie, CO2, eau).",
  path: "/outils/",
});

const content: ToolsPageContent = {
  kicker: "Outils gratuits",
  h1Before: "Mesurez avant de nous parler. ",
  h1Em: "Gratuitement",
  h1After: ".",
  sub: "Deux outils en libre-service, sans inscription, construits avec la même règle que nos prestations : on mesure, on n'estime pas. Ils vous disent où vous en êtes. Ce que vous en faites ensuite vous appartient.",
  primary: { label: "Tester mon site en 1 minute", href: "/audit-seo/" },
  phonePrefix: "Une question ? On décroche :",
  tools: [
    {
      kicker: "Outil 01 · une minute",
      title: "Audit SEO + IA gratuit",
      desc: "Entrez l'adresse de votre site. L'outil se connecte et fait 17 mesures réelles au moment où vous cliquez, puis vous rend un score sur 100 et vos priorités, chaque point expliqué en français.",
      facts: [
        "Technique : HTTPS et redirections, vraie page 404, balises title et description, en-têtes de sécurité.",
        "Lisibilité par les IA : robots GPTBot, ClaudeBot, PerplexityBot et Google-Extended autorisés ou bloqués, fichier llms.txt, données structurées.",
        "Rien n'est estimé : ce que vous lisez, c'est ce que votre site a répondu il y a quelques secondes.",
      ],
      cta: "Lancer l'audit gratuit",
      href: "/audit-seo/",
      note: "Sans inscription. Le rapport détaillé, lui aussi gratuit, arrive sous 24 h si vous le demandez.",
    },
    {
      kicker: "Outil 02 · simulateur",
      title: "Empreinte d'une requête IA",
      desc: "Combien coûte une question posée à une IA, en énergie, en CO2 et en eau ? Tapez votre requête, choisissez la classe de modèle et la région : le simulateur chiffre, fourchettes d'incertitude comprises.",
      facts: [
        "Jeu de données versionné et sourcé (Google, Mistral AI, OpenAI, Ember, Boavizta, ADEME...), journal des révisions public.",
        "Le message n'est pas « arrêtez l'IA » : le choix du modèle pèse cent fois plus que le fait d'utiliser l'IA ou non.",
        "Données citables dans un llms.txt dédié, pour les moteurs de réponse IA.",
      ],
      cta: "Simuler une requête",
      href: "/empreinte-ia/",
      note: "Estimations pédagogiques, pas une mesure opposable : le cadre est écrit au pied de l'outil.",
    },
  ],
  whyTitle: "Pourquoi des outils gratuits ?",
  whyParagraphs: [
    "Parce que donner avant de vendre, c'est notre façon de travailler. Un artisan ou un dirigeant de TPE n'a pas besoin d'un discours, il a besoin d'un chiffre sur son propre site. L'outil le lui donne en une minute, et il reste libre de corriger lui-même, de demander le rapport, ou de nous appeler.",
    "Les deux outils appliquent ce que nous vendons : ce site publie ses propres données structurées, son llms.txt, et un audit qui mesure sur le site réel au moment du test. Vous pouvez tout vérifier avant de nous confier votre [référencement SEO](/referencement-seo/) ou votre [référencement IA (GEO)](/referencement-ia/). Les prix, eux, sont sur la page [tarifs](/tarifs/).",
  ],
  ctaTitle: "Un humain plutôt qu'un outil ?",
  ctaText: "30 minutes gratuites avec Mickaël : on regarde vos résultats ensemble, et vous repartez avec un plan d'action concret. Que vous travailliez avec nous ou non.",
  ctaButton: "Réserver mes 30 minutes gratuites",
};

const toolsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Outils gratuits MKZ",
  url: URL,
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebApplication",
        "@id": `${SITE}/audit-seo/#app`,
        name: "Audit SEO + IA gratuit",
        url: `${SITE}/audit-seo/`,
        description:
          "Outil d'audit SEO gratuit en ligne : 17 mesures réelles faites sur le site au moment du test, score sur 100 et priorités de correction. Sans inscription.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        inLanguage: "fr-FR",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebApplication",
        name: "Empreinte d'une requête IA",
        url: `${SITE}/empreinte-ia/`,
        description:
          "Simulateur de l'énergie, des émissions de CO2 et de l'eau d'une requête à une IA, fourchettes d'incertitude comprises, jeu de données versionné et sourcé.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        inLanguage: "fr-FR",
      },
    },
  ],
};

export default function OutilsPage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "Outils gratuits MKZ",
          description: content.sub,
          url: "/outils/",
          dateModified: "2026-08-22",
          locale: "fr",
        })}
      />
      <JsonLd data={toolsListSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Outils gratuits" },
        ])}
      />
      <ToolsContent locale="fr" content={content} />
    </>
  );
}
