import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import TarifsContent, { type TarifsFaqItem } from "@/components/TarifsContent";

// Page française uniquement : décision MESURÉE du 20/08/2026, pas un oubli.
// 8 requêtes anglaises testées via DataForSEO (US : "french seo pricing",
// "seo pricing france", "website cost france", "seo agency france pricing",
// "french seo rates", "how much does seo cost in france", "seo cost france",
// "web agency france prices") : AUCUNE n'existe dans la base, zéro volume.
// L'intention « tarifs » n'existe pas en anglais pour ce marché ; les pages
// EN restent des pages de conversion sans grille de prix (même logique que
// /services/ et /agence-web-77/, monolingues assumées).
// Volumes français relevés le 20/08/2026 (DataForSEO, France) : « prix site
// internet » 1 000/mois, « devis site internet » 590, « prix site vitrine »
// 480, « tarif site internet » 260, « prix création site internet » 260,
// « tarif seo » 210. Prix : plaquette du 18/08/2026 (_tarifs/, mémoire projet).

const URL = `${SITE}/tarifs/`;

export const metadata: Metadata = createMetadata("fr", {
  title: "Tarifs 2026 : site internet, SEO et référencement IA",
  description:
    "Site vitrine 1 490 €, audit SEO 490 €, accompagnement dès 390 €/mois, référencement IA dès 490 €. Prix affichés, devis fixe écrit, sans engagement. MKZ (77).",
  path: "/tarifs/",
});

const faq: TarifsFaqItem[] = [
  {
    q: "Le référencement est-il inclus dans la création du site ?",
    a: "Oui, et c'est le cœur de notre approche : nous ne vendons pas « un site », nous vendons un service packagé. Chaque formule est livrée avec son optimisation SEO complète (mots-clés mesurés, balises, vitesse, sitemap, Google Search Console), son balisage pour les moteurs IA et ses premiers liens entrants : fiche Google Business reliée et annuaires de référence de votre métier. Un site sans référencement est une carte de visite rangée dans un tiroir.",
  },
  {
    q: "Vos prix sont-ils vraiment fixes ?",
    a: "Oui. Chaque mission démarre par un devis fixe écrit, établi après le diagnostic gratuit de 30 minutes : le prix annoncé est le prix payé. Les tarifs de cette page sont les prix de base réels ; un projet qui sort du cadre (site de 40 pages, fonctionnalités spécifiques) reçoit son propre devis, chiffré ligne par ligne avant toute signature.",
  },
  {
    q: "Pourquoi vos tarifs sont-ils sous les prix d'agence ?",
    a: "Parce que vous payez le travail, pas la structure. MKZ est un indépendant expérimenté : pas de commercial, pas de chef de projet intermédiaire, vous parlez directement à la personne qui fait le travail. À titre de repère, un site vitrine se facture 3 000 à 8 000 € en agence (relevés 2026) ; chez MKZ, il est à 1 490 €, rédaction des textes incluse.",
  },
  {
    q: "Ces prix sont-ils HT ou TTC ?",
    a: "Tous les tarifs affichés sont en euros hors taxes, TVA de 20 % en sus. Pour une création de site, le règlement se fait en deux temps : 30 % à la commande, le solde à la mise en ligne. Les prestations mensuelles sont facturées en début de mois.",
  },
  {
    q: "Y a-t-il un engagement de durée sur les prestations mensuelles ?",
    a: "Non. Accompagnement SEO, maintenance, suivi local : tout s'arrête quand vous le décidez, avec un préavis de 30 jours. Une précision honnête : le référencement est un travail de fond, comptez 6 mois pour des résultats solides. Nous le disons avant de facturer, pas après.",
  },
  {
    q: "Existe-t-il des aides pour financer mon site internet ?",
    a: "Souvent, oui. Selon votre statut, le FAFCEA (fonds de formation des artisans) ou votre OPCO (l'organisme qui finance la formation de votre branche) peuvent prendre en charge une partie du projet. Nous vérifions vos droits pendant le diagnostic gratuit, avant d'établir le devis.",
  },
  {
    q: "Que comprend le diagnostic gratuit de 30 minutes ?",
    a: "Un échange en visio et un premier relevé chiffré de votre visibilité : où vous apparaissez sur Google, ce que les moteurs IA disent de vous, et ce qui vous bloque. Vous repartez avec un plan d'action concret, que vous travailliez avec nous ou non.",
  },
];

// OfferCatalog : le validateur (validate-out.mjs) n'applique la règle « item »
// qu'aux @type ItemList stricts ; l'OfferCatalog suit le modèle schema.org
// standard, avec des Offer directement en itemListElement.
const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "Création de site internet, référencement SEO et référencement IA",
  description:
    "Tarifs 2026 de MKZ : création de site internet en service packagé (optimisation SEO complète et premiers liens entrants inclus dans chaque formule), maintenance, prestations SEO (audit, SEO local, accompagnement mensuel) et référencement IA (GEO). Prix de base HT, devis fixe écrit avant signature.",
  provider: { "@id": `${SITE}/#organization` },
  url: URL,
  areaServed: [
    { "@type": "State", name: "Seine-et-Marne" },
    { "@type": "State", name: "Île-de-France" },
    { "@type": "Country", name: "France" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tarifs MKZ 2026",
    url: URL,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Site une page « Présence »",
        description:
          "Une page complète : activité, services, zone d'intervention, avis clients, contact. Livré en 2 semaines.",
        url: `${URL}#creation-site`,
        priceCurrency: "EUR",
        price: "590",
      },
      {
        "@type": "Offer",
        name: "Site vitrine « Pro », 5 à 8 pages",
        description:
          "Le format recommandé pour un artisan, un commerce ou une TPE. Rédaction des textes incluse, livré optimisé SEO avec ses premiers liens entrants.",
        url: `${URL}#creation-site`,
        priceCurrency: "EUR",
        price: "1490",
      },
      {
        "@type": "Offer",
        name: "Site vitrine « Premium », 10 à 15 pages",
        description:
          "Design personnalisé, pages par métier et par ville, version anglaise possible.",
        url: `${URL}#creation-site`,
        priceCurrency: "EUR",
        price: "2490",
      },
      {
        "@type": "Offer",
        name: "Site e-commerce (WooCommerce)",
        description:
          "Catalogue, panier, paiement sécurisé, gestion des commandes, formation à la prise en main.",
        url: `${URL}#creation-site`,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 2990,
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Offer",
        name: "Refonte de site existant",
        description:
          "Contenus migrés, redirections soignées, référencement préservé. Prix fixé après le diagnostic gratuit.",
        url: `${URL}#creation-site`,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 990,
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Offer",
        name: "Maintenance de site internet",
        description:
          "Trois formules sans engagement : Essentiel, Sérénité, Partenaire. Mises à jour, sauvegardes, surveillance, modifications.",
        url: `${URL}#creation-site`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: 29,
          maxPrice: 99,
          priceCurrency: "EUR",
          unitText: "mois",
        },
      },
      {
        "@type": "Offer",
        name: "Audit SEO complet",
        description:
          "Technique, contenus, concurrence, plan d'action priorisé, restitution en visio. Déduit de la première facture si un accompagnement démarre sous 30 jours.",
        url: `${URL}#seo`,
        priceCurrency: "EUR",
        price: "490",
      },
      {
        "@type": "Offer",
        name: "Audit SEO + visibilité IA",
        description:
          "L'audit complet, plus la mesure réelle des citations par ChatGPT, Perplexity, Gemini et Mistral.",
        url: `${URL}#seo`,
        priceCurrency: "EUR",
        price: "690",
      },
      {
        "@type": "Offer",
        name: "Pack visibilité locale",
        description:
          "Fiche Google Business optimisée, coordonnées cohérentes, méthode de collecte d'avis. Option suivi mensuel à 99 €/mois.",
        url: `${URL}#seo`,
        priceCurrency: "EUR",
        price: "390",
      },
      {
        "@type": "Offer",
        name: "Accompagnement SEO mensuel",
        description:
          "Trois formules sans engagement de durée : Fondations, Croissance, Référence (référencement IA inclus).",
        url: `${URL}#seo`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: 390,
          maxPrice: 1190,
          priceCurrency: "EUR",
          unitText: "mois",
        },
      },
      {
        "@type": "Offer",
        name: "Audit de visibilité IA",
        description:
          "Mesure réelle des citations sur ChatGPT, Perplexity, Gemini et Mistral, analyse sur 5 piliers, plan d'action.",
        url: `${URL}#referencement-ia`,
        priceCurrency: "EUR",
        price: "490",
      },
      {
        "@type": "Offer",
        name: "Pack Décollage : site vitrine Pro + visibilité locale",
        description:
          "Site vitrine « Pro » et Pack visibilité locale, socle technique IA compris. 1 690 € au lieu de 1 880 €.",
        url: URL,
        priceCurrency: "EUR",
        price: "1690",
      },
    ],
  },
};

export default function TarifsPage() {
  return (
    <>
      <JsonLd data={offerCatalogSchema} />
      <JsonLd data={faqSchema(faq)!} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Tarifs" },
        ])}
      />
      <TarifsContent faq={faq} />
    </>
  );
}
