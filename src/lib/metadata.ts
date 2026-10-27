import type { Metadata } from "next";
import { SITE, alternatesFor, ogLocaleOf, type Locale } from "@/lib/i18n";

const siteUrl = SITE;

export const siteMetadata = {
  name: "MKZ",
  description:
    "Votre site web visible sur Google, enfin. MKZ : création de sites web et SEO pour artisans, commerçants et indépendants en Île-de-France et partout en France.",
  url: siteUrl,
};

// Socles par locale. L'anglais ne traduit pas le socle français : il cible
// l'intention réellement recherchée en anglais (SEO du marché français +
// visibilité dans les moteurs de réponse IA), mesurée avant rédaction.
const base: Record<
  Locale,
  { titleDefault: string; titleTemplate: string; description: string; keywords: string[]; ogAlt: string }
> = {
  fr: {
    titleDefault: "MKZ | Création de site internet & SEO pour artisans et TPE",
    titleTemplate: "%s | MKZ",
    description: siteMetadata.description,
    keywords: [
      "création site internet artisan",
      "création site web TPE",
      "agence SEO TPE PME",
      "référencement google artisan",
      "site internet commerçant",
      "création site internet seine et marne",
      "agence web 77",
      "agence web Meaux",
      "SEO indépendant",
      "site internet professionnel",
      "référencement local",
      "visibilité google",
    ],
    ogAlt: "MKZ, création de sites web et SEO pour artisans et indépendants",
  },
  en: {
    titleDefault: "MKZ | French SEO & AI search visibility consultant",
    titleTemplate: "%s | MKZ",
    description:
      "French SEO and AI search visibility for companies selling into France. Native French consultant near Paris, measured results, no jargon. Free 30-min review.",
    keywords: [
      "french seo",
      "french seo agency",
      "french seo consultant",
      "seo agency france",
      "seo services france",
      "french seo company",
      "multilingual seo agency",
      "seo consultant france",
      "ai search optimisation",
      "llm seo",
      "ai visibility",
      "answer engine optimization",
    ],
    ogAlt: "MKZ, French SEO and AI search visibility consultant",
  },
};

// Images de partage à la charte, une par langue (générées par scripts/generate-og-image.mjs).
// Elles remplacent /og-image.png depuis le 27/10/2026 : un nouveau nom force les réseaux à relire l'image.
export const ogImageOf: Record<Locale, string> = { fr: "/og/mkz-fr.png", en: "/og/mkz-en.png" };

export interface MetadataOptions extends Omit<Metadata, "alternates"> {
  /** Chemin absolu de la page (ex. "/en/french-seo/") : pilote canonical + hreflang. */
  path?: string;
  alternates?: Metadata["alternates"];
}

export function createMetadata(
  locale: Locale = "fr",
  { path, alternates, ...overrides }: MetadataOptions = {}
): Metadata {
  const b = base[locale];

  // Le partage social et les moteurs IA doivent voir le titre de la page,
  // pas le titre générique du site : on reporte l'override quand il existe.
  const shareTitle = typeof overrides.title === "string" ? overrides.title : b.titleDefault;
  const shareDescription =
    typeof overrides.description === "string" ? overrides.description : b.description;

  return {
    title: { default: b.titleDefault, template: b.titleTemplate },
    description: b.description,
    metadataBase: new URL(siteUrl),
    keywords: b.keywords,
    robots: { index: true, follow: true },
    // Couleur de la barre du navigateur mobile : bleu nuit de la charte (--nuit), depuis le 27/10/2026.
    other: { "theme-color": "#202748" },
    ...overrides,
    openGraph: {
      type: "website",
      locale: ogLocaleOf[locale],
      url: path ? `${siteUrl}${path}` : siteUrl,
      siteName: siteMetadata.name,
      title: shareTitle,
      description: shareDescription,
      images: [{ url: ogImageOf[locale], width: 1200, height: 630, alt: b.ogAlt }],
      ...overrides.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [ogImageOf[locale]],
      ...overrides.twitter,
    },
    alternates: alternates ?? alternatesFor(path ?? "/", locale),
  };
}
