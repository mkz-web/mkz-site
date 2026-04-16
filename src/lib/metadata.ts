import type { Metadata } from "next";

const siteUrl = "https://mkz-consulting.fr";

export const siteMetadata = {
  name: "MKZ",
  description:
    "Votre site web visible sur Google, enfin. MKZ : création de sites web et SEO pour artisans, commerçants et indépendants en Île-de-France et partout en France.",
  url: siteUrl,
};

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: `${siteMetadata.name} | Création de site internet & SEO pour artisans et TPE`,
      template: `%s | ${siteMetadata.name}`,
    },
    description: siteMetadata.description,
    metadataBase: new URL(siteMetadata.url),
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
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: siteMetadata.url,
      siteName: siteMetadata.name,
      title: `${siteMetadata.name} | Création de site internet & SEO`,
      description: siteMetadata.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "MKZ - Création de sites web et SEO pour artisans et indépendants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteMetadata.name} | Création de site internet & SEO`,
      description: siteMetadata.description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: siteMetadata.url,
    },
    other: {
      "theme-color": "#003764",
    },
    ...overrides,
  };
}
