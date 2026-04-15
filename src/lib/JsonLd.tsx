export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MKZ",
  url: "https://mkz.fr",
  logo: "https://mkz.fr/images/mkz-logo.svg",
  description:
    "Création de sites web et SEO pour artisans, commerçants et indépendants.",
  telephone: "+33769093909",
  email: "contact@mkz-consulting.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 rue Françoise Sagan",
    addressLocality: "Dammartin-en-Goële",
    postalCode: "77230",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  founder: {
    "@type": "Person",
    name: "Mickaël Leclerc",
    jobTitle: "Président",
  },
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  sameAs: [],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://mkz.fr/#localbusiness",
  name: "MKZ",
  url: "https://mkz.fr",
  image: "https://mkz.fr/images/mkz-logo.svg",
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
    provider: { "@type": "Organization", name: "MKZ" },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "Création de site web",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & Référencement Google",
    description:
      "Stratégie SEO complète pour améliorer votre visibilité sur Google. Audit SEO, optimisation technique, contenu et netlinking pour TPE et artisans.",
    provider: { "@type": "Organization", name: "MKZ" },
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
