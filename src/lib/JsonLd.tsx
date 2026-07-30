export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Échappement de « < » : JSON.stringify ne protège pas contre </script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
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
  inLanguage: ["fr-FR", "en"],
  description:
    "Création de sites web et SEO pour artisans, commerçants et indépendants en Île-de-France et partout en France.",
  publisher: { "@id": `${SITE}/#organization` },
};

// ── Variantes anglaises ──────────────────────────────────────────────────────
// Même entité, donc même @id : un seul nœud dans le graphe, décrit dans la
// langue de la page servie. Seules name/description/knowsAbout changent.

export const websiteSchemaEn = {
  ...websiteSchema,
  description:
    "French SEO and AI search visibility for companies selling into the French market. Run from the Paris region by Mickaël Leclerc.",
};

export const personSchemaEn = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#mickael-leclerc`,
  name: "Mickaël Leclerc",
  jobTitle: "Founder, French SEO & AI search consultant",
  description:
    "Native French SEO consultant based near Paris, with over 20 years as an IT engineer in infrastructure, automation and DevOps. Helps companies rank and get cited in the French market.",
  image: `${SITE}/images/mickael-leclerc.jpg`,
  url: `${SITE}/en/about/`,
  worksFor: { "@id": `${SITE}/#organization` },
  knowsLanguage: [
    { "@type": "Language", name: "French", alternateName: "fr" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
  knowsAbout: [
    "French SEO",
    "Multilingual SEO",
    "Generative Engine Optimization (GEO)",
    "Answer Engine Optimization (AEO)",
    "LLM visibility",
    "Technical SEO",
    "Core Web Vitals",
    "Web development",
  ],
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
  // Les prestations sont livrées en français et en anglais (clients
  // internationaux qui visent le marché français).
  availableLanguage: [
    { "@type": "Language", name: "French", alternateName: "fr" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
  sameAs: [
    "https://maps.google.com/?cid=6891196325972723134",
    "https://www.pappers.fr/entreprise/mkz-983662784",
    "https://www.societe.com/societe/mkz-983662784.html",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://mkz-consulting.fr/#localbusiness",
  hasMap: "https://maps.google.com/?cid=6891196325972723134",
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

export const serviceSchemasEn = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "French SEO",
    description:
      "SEO for the French market: French keyword research done in French, on-page and technical work, French content and local signals. For companies that already rank in English and need France to work too.",
    provider: { "@id": `${SITE}/#organization` },
    url: `${SITE}/en/french-seo/`,
    areaServed: { "@type": "Country", name: "France" },
    availableLanguage: ["en", "fr"],
    serviceType: "French SEO",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI search optimisation (GEO / AEO)",
    description:
      "Getting cited by ChatGPT, Perplexity, Gemini and Google AI answers, in French and in English: crawler access, citable structured content, llms.txt, schema.org, and measured share of voice.",
    provider: { "@id": `${SITE}/#organization` },
    url: `${SITE}/en/ai-search-optimization/`,
    areaServed: { "@type": "Country", name: "France" },
    availableLanguage: ["en", "fr"],
    serviceType: "Generative Engine Optimization",
  },
];

export const faqSchemaEn = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I just translate my English site into French and rank?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, and this is the single most common reason foreign sites fail in France. Translation carries your English keywords across; it does not carry French search demand. French users phrase queries differently, use different intent words, and often search terms that have no direct English equivalent. The work is French keyword research done in French first, then content built on what people actually type.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with companies based outside France?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, that is the main use case. Typical clients are UK, US, or European companies that already perform in English and need the French market to work: an existing site to adapt, a French subfolder or subdomain to set up, hreflang to get right, and French content that reads as if it was written in French, because it was.",
      },
    },
    {
      "@type": "Question",
      name: "How long does French SEO take to show results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First movements usually appear between 3 and 6 months, depending on your existing authority and how competitive your French keywords are. A site that already has authority in English often moves faster in France than a brand new domain, because the domain-level signals carry over.",
      },
    },
    {
      "@type": "Question",
      name: "What is GEO and is it different from SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GEO (Generative Engine Optimization), also called AEO (Answer Engine Optimization), is being cited inside AI answers rather than ranking in a list of links. It overlaps with SEO but adds specific work: letting AI crawlers in, publishing facts that can be quoted with a figure and a date, clean schema.org, and llms.txt. It matters in France because French-language AI answers have far fewer credible sources to pick from than English ones.",
      },
    },
    {
      "@type": "Question",
      name: "Are you an agency or a freelance consultant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MKZ is a French company with one consultant doing the work: Mickaël Leclerc. You talk to the person running your account, not an account manager relaying to a junior. That is a deliberate trade: less capacity, no layers.",
      },
    },
  ],
};

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
