import { homeFaqEn, homeFaqFr, type HomeFaq } from "@/content/home-faq";

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
  slogan: "Visible sur Google, cité par les IA.",
  url: SITE,
  logo: `${SITE}/images/mkz-logo.svg`,
  description:
    "Création de sites internet, référencement SEO et référencement IA pour artisans, commerçants et TPE.",
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
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "21:00",
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


// FAQ des accueils : source unique src/content/home-faq.ts (14/09/2026). Le texte
// visible sur la page et le FAQPage sont générés depuis le même tableau, donc
// identiques mot pour mot (règle GSC).
const faqPageDepuis = (liste: HomeFaq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: liste.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const faqSchemaEn = faqPageDepuis(homeFaqEn);

export const faqSchema = faqPageDepuis(homeFaqFr);
