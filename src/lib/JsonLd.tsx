export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE = "https://mkz-consulting.fr";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#mickael-leclerc`,
  name: "Mickaël Leclerc",
  jobTitle: "Président & fondateur",
  description:
    "Ingénieur IT avec plus de 20 ans d'expérience en infrastructure, automatisation et DevOps, fondateur de MKZ. Expert SEO au service des artisans, commerçants et TPE.",
  image: `${SITE}/images/mickael-leclerc.jpg`,
  url: `${SITE}/about/`,
  worksFor: { "@id": `${SITE}/#organization` },
  knowsAbout: [
    "Création de site internet",
    "Référencement naturel (SEO)",
    "Référencement local",
    "GEO (Generative Engine Optimization)",
    "Core Web Vitals",
    "Automatisation",
    "DevOps",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  name: "MKZ",
  alternateName: "MKZ Consulting",
  url: SITE,
  inLanguage: "fr-FR",
  description:
    "Création de sites web et SEO pour artisans, commerçants et indépendants en Île-de-France et partout en France.",
  publisher: { "@id": `${SITE}/#organization` },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "MKZ",
  legalName: "MKZ",
  slogan: "Votre site web visible sur Google, enfin.",
  url: SITE,
  logo: `${SITE}/images/mkz-logo.svg`,
  description:
    "Création de sites web et SEO pour artisans, commerçants et indépendants.",
  telephone: "+33769093909",
  email: "contact@mkz-consulting.fr",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "SIRET",
    value: "983 662 784 00013",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 rue Françoise Sagan",
    addressLocality: "Dammartin-en-Goële",
    postalCode: "77230",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  founder: { "@id": `${SITE}/#mickael-leclerc` },
  areaServed: {
    "@type": "Country",
    name: "France",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://mkz-consulting.fr/#localbusiness",
  founder: { "@id": `${SITE}/#mickael-leclerc` },
  name: "MKZ",
  url: "https://mkz-consulting.fr",
  image: "https://mkz-consulting.fr/images/mkz-logo.svg",
  description:
    "Création de sites internet et référencement SEO pour artisans, commerçants, TPE et indépendants en Île-de-France.",
  telephone: "+33769093909",
  email: "contact@mkz-consulting.fr",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 rue Françoise Sagan",
    addressLocality: "Dammartin-en-Goële",
    postalCode: "77230",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.0547,
    longitude: 2.6817,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "State", name: "Seine-et-Marne" },
    { "@type": "State", name: "Île-de-France" },
    { "@type": "Country", name: "France" },
  ],
};

export const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de site internet",
    description:
      "Création de sites web sur mesure pour artisans, commerçants et indépendants. Design responsive, performances optimisées et référencement naturel inclus.",
    provider: { "@id": `${SITE}/#organization` },
    url: `${SITE}/services/`,
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "Création de site web",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & Référencement Google",
    description:
      "Stratégie SEO complète pour améliorer votre visibilité sur Google. Audit SEO, optimisation technique, contenu et netlinking pour TPE et artisans.",
    provider: { "@id": `${SITE}/#organization` },
    url: `${SITE}/services/`,
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "Référencement naturel SEO",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte un site internet pour un artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le prix d’un site internet pour artisan varie selon vos besoins. Chez MKZ, nous proposons des solutions sur mesure adaptées au budget des TPE et indépendants. Réservez un audit gratuit de 30 minutes pour obtenir un devis personnalisé.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour être visible sur Google ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les premiers résultats SEO apparaissent généralement entre 3 et 6 mois. La vitesse dépend de la concurrence sur vos mots-clés, de la qualité de votre site et de la stratégie mise en place. Nos clients constatent en moyenne un triplement de leur trafic.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi mon entreprise n’apparaît pas sur Google ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plusieurs raisons possibles : site non optimisé pour le SEO, absence de contenu pertinent, problèmes techniques, ou fiche Google Business Profile incomplète. Un audit SEO gratuit permet d’identifier les blocages et de définir un plan d’action.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre SEO et SEA ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le SEO (référencement naturel) génère du trafic gratuit et durable en optimisant votre site pour Google. Le SEA (publicité payante) donne des résultats immédiats mais s’arrête dès que vous cessez de payer. Chez MKZ, nous privilégions le SEO pour un ROI long terme.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que je garde la propriété de mon site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, absolument. Votre site vous appartient à 100%. Vos accès, votre code, vos contenus. Si vous décidez de partir, vous partez avec tout. Chez MKZ, la transparence et la liberté sont des valeurs fondamentales.",
      },
    },
  ],
};
