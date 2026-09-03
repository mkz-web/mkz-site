import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, faqSchema, SITE } from "@/lib/schema";
import AuditContent, { type AuditFaqItem, type AuditPageContent } from "@/components/audit/AuditContent";

// Page outil : l'audit SEO + IA gratuit en libre-service.
//
// Cible mesurée (DataForSEO, France, 20/08/2026) : « audit seo » 1 600/mois
// (CPC 6,06 €), « audit seo gratuit » 880, « analyse seo » 1 000, « audit seo
// en ligne » 210. « audit geo » : AUCUN volume mesurable le 21/08/2026, d'où
// le choix du slug /audit-seo/ ; le référencement IA reste le différenciant
// du contenu, pas la cible de la requête.
//
// Échelle commerciale à respecter (décidée au cadrage, dossier
// Projet/Seo-referencement) : scan instantané gratuit -> rapport détaillé
// gratuit envoyé PAR MICKAËL sous 24 h -> audit complet payant (/tarifs/,
// 490 € ou 690 € avec visibilité IA). Le rapport gratuit ne contient PAS la
// mesure complète des citations IA : c'est le produit payant.
//
// Le moteur du scan vit dans functions/api/ (Pages Function /api/scan) ;
// harnais de vérité terrain : node scripts/test-audit-engine.mjs --attendu-mkz.

const URL = `${SITE}/audit-seo/`;

export const metadata: Metadata = createMetadata("fr", {
  title: "Audit SEO gratuit en ligne : score + lisibilité IA",
  description:
    "Testez votre site en 60 s : 20 mesures réelles (HTTPS, robots IA, llms.txt, liens entrants, positions Google), score et priorités. Gratuit, sans inscription.",
  path: "/audit-seo/",
});

const faq: AuditFaqItem[] = [
  {
    q: "C'est quoi, un audit SEO ?",
    a: "C'est le contrôle technique de votre site. Comme pour une voiture, on ne devine pas l'état du moteur en regardant la carrosserie : on branche les instruments et on mesure. L'audit SEO vérifie que Google peut trouver votre site, le comprendre et lui faire confiance. Cet outil fait la version express de ce contrôle : 20 points mesurés en une minute, au moment où vous cliquez.",
  },
  {
    q: "L'outil est-il vraiment gratuit ?",
    a: "Oui. Le scan est gratuit, sans inscription, et le rapport détaillé envoyé sous 24 h l'est aussi. Notre conviction : donner avant de vendre. L'audit complet (analyse de la concurrence, mots-clés à viser, mesure réelle de vos citations par ChatGPT et Perplexity, plan d'action priorisé) est une prestation à part entière, à 490 €, déduite de votre première facture si un accompagnement démarre sous 30 jours. Les tarifs sont publics, sur la page Tarifs.",
  },
  {
    q: "Que mesure exactement le score ?",
    a: "Trois familles. La technique (HTTPS, redirections, vraie page 404, balises, en-têtes) et la lisibilité par les IA (robots des moteurs IA autorisés ou bloqués, fichier llms.txt, données structurées) sont mesurées sur votre site au moment du test : rien n'est estimé. L'autorité et les positions (domaines qui pointent vers vous, score de spam de vos liens, mots-clés où Google France vous affiche, trafic organique estimé) sont lues dans la base DataForSEO au moment du test, parce qu'aucun site ne peut mesurer lui-même qui le cite. Le trafic y est une estimation, et il est présenté comme telle.",
  },
  {
    q: "Pourquoi mesurer la lisibilité par les IA ?",
    a: "Parce que vos futurs clients posent déjà leurs questions à ChatGPT ou Perplexity, et que ces moteurs recommandent des entreprises. Pour être cité, il faut d'abord être lisible : un robot IA bloqué, et c'est fréquent car certains hébergeurs les bloquent par défaut, c'est un moteur de réponse qui ne peut pas parler de vous. C'est le référencement IA, aussi appelé GEO, et c'est notre spécialité.",
  },
  {
    q: "Que faites-vous de mes données ?",
    a: "Le scan lui-même ne demande rien : vous entrez une adresse de site publique, l'outil la mesure, point. Votre email n'est collecté que si vous demandez le rapport, avec une case de consentement explicite, pour vous l'envoyer et vous recontacter à son sujet. Vos droits et les détails sont dans notre politique de confidentialité.",
  },
  {
    q: "Et après le scan, on fait quoi ?",
    a: "Trois chemins. Vous corrigez vous-même : le détail affiché suffit pour les défauts simples. Vous demandez le rapport gratuit : Mickaël le prépare et vous l'envoie sous 24 h avec vos 3 priorités expliquées. Ou vous réservez directement 30 minutes gratuites pour en parler de vive voix. Dans les trois cas, vous savez où vous en êtes, chiffres à l'appui.",
  },
];

const content: AuditPageContent = {
  kicker: "Outil gratuit",
  h1Before: "Audit SEO gratuit : votre site, ",
  h1Em: "mesuré",
  h1After: ", pas estimé.",
  sub: "Entrez votre adresse. En une minute, l'outil fait 20 mesures réelles : votre technique, votre lisibilité par Google, et ce que personne ne vous montre, votre lisibilité par les IA comme ChatGPT et Perplexity. Un score clair, vos priorités, zéro inscription.",
  apercu: {
    src: "/images/outils/scan-apercu.webp",
    w: 1400,
    h: 343,
    alt: "Résultat d'un scan réel : mkz-consulting.fr, score 89 sur 100, technique 35/35, lisibilité par les IA 35/35, autorité et positions Google 19/30",
    caption: "Un scan réel : notre propre site, testé le 3 septembre 2026 avec l'outil ci-dessus. 89 sur 100 : l'autorité (19/30) est notre chantier du moment, et on ne maquille pas son propre score. Le vôtre prend une minute.",
  },
  measuresTitle: "Ce que l'outil mesure",
  measures: [
    {
      title: "Technique et hygiène SEO",
      text: "HTTPS et redirections, indexabilité, vraie page 404, balises title et description aux longueurs que Google affiche réellement, titres, affichage mobile, en-têtes de sécurité.",
    },
    {
      title: "Lisibilité par les IA",
      text: "Les 6 principaux robots IA (GPTBot, ClaudeBot, PerplexityBot...) peuvent-ils lire votre site ? Votre llms.txt existe-t-il ? Vos données structurées sont-elles valides ? Un robot bloqué, c'est un moteur de réponse qui ne peut pas vous citer.",
    },
    {
      title: "Autorité et positions Google",
      text: "Domaines qui pointent vers vous, score de spam de vos liens, mots-clés où Google France vous affiche, trafic organique estimé : lus dans la base DataForSEO au moment du test. C'est la partie que les outils gratuits cachent derrière une inscription.",
    },
  ],
  methodTitle: "Mesuré, jamais estimé",
  methodParagraphs: [
    "La plupart des outils gratuits vous servent une note sortie d'une base de données vieille de trois semaines. Ici, chaque vérification est faite sur votre site au moment où vous cliquez : l'outil se connecte, lit votre robots.txt réellement servi, teste une adresse inventée pour voir si votre page 404 fait son travail, et décortique votre page d'accueil. Ce que vous lisez à l'écran, c'est ce que votre site a répondu il y a quelques secondes. Seule exception, et elle est écrite noir sur blanc : vos liens entrants et vos positions ne se lisent pas sur votre site, l'outil les relève dans la base DataForSEO, la même que celle de nos audits.",
    "Le scan est la version express de notre méthode d'audit. La version complète va plus loin : analyse de la concurrence, mots-clés à viser, mesure réelle de ce que ChatGPT, Perplexity et Gemini disent de vous, et plan d'action priorisé. Le scan vous dit où vous en êtes. L'audit complet vous dit quoi faire, dans quel ordre, et pourquoi.",
  ],
  faqTitle: "Questions fréquentes",
  nextLinks: {
    intro: "Pour aller plus loin :",
    links: [
      { label: "pourquoi votre site n'apparaît pas sur Google (les 7 causes)", href: "/conseils/seo/pourquoi-mon-site-n-apparait-pas-sur-google/" },
      { label: "notre guide complet de l'audit SEO", href: "/conseils/seo/audit-seo/" },
      { label: "la prestation de référencement SEO", href: "/referencement-seo/" },
      { label: "le référencement IA (GEO)", href: "/referencement-ia/" },
      { label: "les tarifs de l'audit complet", href: "/tarifs/" },
    ],
  },
  ctaTitle: "Un humain plutôt qu'un outil ?",
  ctaText: "30 minutes gratuites avec Mickaël : on regarde votre scan ensemble, vous repartez avec un plan d'action concret. Que vous travailliez avec nous ou non.",
  ctaButton: "Réserver mes 30 minutes gratuites",
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${URL}#app`,
  name: "Audit SEO + IA gratuit",
  url: URL,
  description:
    "Outil d'audit SEO gratuit en ligne : 20 mesures au moment du test, 16 faites sur le site lui-même (HTTPS, robots IA, llms.txt, données structurées JSON-LD, vraie 404, balises SERP) et 4 lues dans la base DataForSEO (domaines référents, score de spam, mots-clés positionnés en France, trafic estimé), un score sur 100 et les priorités de correction.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "fr-FR",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  provider: { "@id": `${SITE}/#organization` },
};

export default function AuditSeoPage() {
  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema(faq)!} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Audit SEO gratuit" },
        ])}
      />
      <AuditContent locale="fr" content={content} faq={faq} />
    </>
  );
}
