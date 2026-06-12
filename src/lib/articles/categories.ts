import type { Category } from "./types";

// Les 3 cocons sémantiques de la newsroom. Chaque cocon pousse vers sa page
// pilier transactionnelle (maillage descendant article → pilier).

export const categories: Category[] = [
  {
    slug: "tutoriels",
    name: "Tutoriels",
    title: "Tutoriels : gérez votre visibilité en ligne vous-même",
    metaTitle: "Tutoriels web pour artisans et TPE : guides pas à pas",
    metaDescription:
      "Tutoriels gratuits pas à pas pour artisans, commerçants et TPE : Google Search Console, fiche d'établissement Google, WordPress. Avec captures d'écran.",
    description:
      "Des guides pas à pas, avec captures d'écran, pour reprendre la main sur vos outils : Search Console, fiche Google, WordPress…",
    intro: [
      "Chez MKZ, nous pensons qu'un client autonome est un client serein. Ces tutoriels sont les mêmes que ceux que nous partageons avec nos clients : des **guides pas à pas, sans jargon**, illustrés de captures d'écran, pour gérer vous-même les outils essentiels de votre visibilité en ligne.",
      "Suivez-les dans l'ordre qui vous arrange : chaque tutoriel est autonome et se termine par une checklist. Et si vous bloquez, [appelez-nous](/contact/) — on décroche.",
    ],
    icon: "🧰",
    pillar: { href: "/services/", label: "Découvrir nos services" },
  },
  {
    slug: "creation-site-internet",
    name: "Création de site",
    title: "Création de site internet : les bonnes décisions avant d'investir",
    metaTitle: "Création de site internet : conseils pour artisans et TPE",
    metaDescription:
      "Prix d'un site internet, refonte, site vitrine : nos guides complets pour artisans, commerçants et TPE qui veulent un site qui rapporte des clients.",
    description:
      "Prix, refonte, site vitrine : tout ce qu'il faut savoir avant d'investir dans un site qui vous rapporte des clients.",
    intro: [
      "Un site internet est un investissement, pas une dépense — à condition de prendre les bonnes décisions dès le départ. Ce cocon rassemble nos guides sur la **création et la refonte de site internet** : combien ça coûte vraiment, quand refondre, quel type de site choisir.",
      "Ces conseils s'appuient sur les projets que nous menons pour des artisans, commerçants et TPE en Seine-et-Marne et partout en France. Pour passer à l'action, découvrez notre service de [création de site internet](/creation-site-internet/).",
    ],
    icon: "💻",
    pillar: { href: "/creation-site-internet/", label: "Notre service création de site" },
  },
  {
    slug: "seo",
    name: "SEO & visibilité",
    title: "SEO : être trouvé sur Google quand un client vous cherche",
    metaTitle: "SEO et référencement Google : guides pour artisans et TPE",
    metaDescription:
      "Référencement local, audit SEO, visibilité Google des artisans : nos guides concrets pour apparaître devant vos clients, sans jargon technique.",
    description:
      "Référencement local, audit SEO, visibilité Google : des guides concrets pour apparaître devant vos clients.",
    intro: [
      "97 % des consommateurs cherchent une entreprise locale sur internet avant de la contacter. Le **référencement naturel (SEO)** est le levier le plus rentable pour capter ces recherches : un trafic gratuit, durable, qui travaille pour vous jour et nuit.",
      "Ce cocon rassemble nos guides SEO pensés pour les artisans, commerçants et TPE : référencement local, audit, méthodes concrètes — sans jargon. Pour aller plus vite, notre service de [référencement SEO](/referencement-seo/) s'occupe de tout.",
    ],
    icon: "🔍",
    pillar: { href: "/referencement-seo/", label: "Notre service SEO" },
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const AUTHOR = {
  name: "Mickaël Leclerc",
  role: "Fondateur de MKZ",
  bio: "Ingénieur IT depuis plus de 20 ans (infrastructure, automatisation, DevOps), j'aide les artisans, commerçants et TPE à devenir visibles sur Google. Basé en Seine-et-Marne, j'interviens dans toute la France.",
  image: "/images/mickael-leclerc.jpg",
  href: "/about/",
};
