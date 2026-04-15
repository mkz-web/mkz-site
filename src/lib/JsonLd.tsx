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
    "Cr\u00e9ation de sites web et SEO pour artisans, commer\u00e7ants et ind\u00e9pendants.",
  telephone: "+33769093909",
  email: "contact@mkz-consulting.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 rue Fran\u00e7oise Sagan",
    addressLocality: "Dammartin-en-Go\u00eble",
    postalCode: "77230",
    addressRegion: "\u00cele-de-France",
    addressCountry: "FR",
  },
  founder: {
    "@type": "Person",
    name: "Micka\u00ebl Leclerc",
    jobTitle: "Pr\u00e9sident",
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
    "Cr\u00e9ation de sites internet et r\u00e9f\u00e9rencement SEO pour artisans, commer\u00e7ants, TPE et ind\u00e9pendants en \u00cele-de-France.",
  telephone: "+33769093909",
  email: "contact@mkz-consulting.fr",
  priceRange: "\u20ac\u20ac",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 rue Fran\u00e7oise Sagan",
    addressLocality: "Dammartin-en-Go\u00eble",
    postalCode: "77230",
    addressRegion: "\u00cele-de-France",
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
    { "@type": "State", name: "\u00cele-de-France" },
    { "@type": "Country", name: "France" },
  ],
};

export const serviceSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cr\u00e9ation de site internet",
    description:
      "Cr\u00e9ation de sites web sur mesure pour artisans, commer\u00e7ants et ind\u00e9pendants. Design responsive, performances optimis\u00e9es et r\u00e9f\u00e9rencement naturel inclus.",
    provider: { "@type": "Organization", name: "MKZ" },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "Cr\u00e9ation de site web",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & R\u00e9f\u00e9rencement Google",
    description:
      "Strat\u00e9gie SEO compl\u00e8te pour am\u00e9liorer votre visibilit\u00e9 sur Google. Audit SEO, optimisation technique, contenu et netlinking pour TPE et artisans.",
    provider: { "@type": "Organization", name: "MKZ" },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "R\u00e9f\u00e9rencement naturel SEO",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien co\u00fbte un site internet pour un artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le prix d\u2019un site internet pour artisan varie selon vos besoins. Chez MKZ, nous proposons des solutions sur mesure adapt\u00e9es au budget des TPE et ind\u00e9pendants. R\u00e9servez un audit gratuit de 30 minutes pour obtenir un devis personnalis\u00e9.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour \u00eatre visible sur Google ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les premiers r\u00e9sultats SEO apparaissent g\u00e9n\u00e9ralement entre 3 et 6 mois. La vitesse d\u00e9pend de la concurrence sur vos mots-cl\u00e9s, de la qualit\u00e9 de votre site et de la strat\u00e9gie mise en place. Nos clients constatent en moyenne un triplement de leur trafic.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi mon entreprise n\u2019appara\u00eet pas sur Google ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plusieurs raisons possibles : site non optimis\u00e9 pour le SEO, absence de contenu pertinent, probl\u00e8mes techniques, ou fiche Google Business Profile incompl\u00e8te. Un audit SEO gratuit permet d\u2019identifier les blocages et de d\u00e9finir un plan d\u2019action.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la diff\u00e9rence entre SEO et SEA ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le SEO (r\u00e9f\u00e9rencement naturel) g\u00e9n\u00e8re du trafic gratuit et durable en optimisant votre site pour Google. Le SEA (publicit\u00e9 payante) donne des r\u00e9sultats imm\u00e9diats mais s\u2019arr\u00eate d\u00e8s que vous cessez de payer. Chez MKZ, nous privil\u00e9gions le SEO pour un ROI long terme.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que je garde la propri\u00e9t\u00e9 de mon site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, absolument. Votre site vous appartient \u00e0 100%. Vos acc\u00e8s, votre code, vos contenus. Si vous d\u00e9cidez de partir, vous partez avec tout. Chez MKZ, la transparence et la libert\u00e9 sont des valeurs fondamentales.",
      },
    },
  ],
};
