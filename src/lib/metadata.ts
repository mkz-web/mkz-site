import type { Metadata } from "next";

const siteUrl = "https://mkz.fr";

export const siteMetadata = {
  name: "MKZ",
  description:
    "Votre site web visible sur Google, enfin. MKZ : cr\u00e9ation de sites web et SEO pour artisans, commer\u00e7ants et ind\u00e9pendants en \u00cele-de-France et partout en France.",
  url: siteUrl,
};

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: `${siteMetadata.name} | Cr\u00e9ation de site internet & SEO pour artisans et TPE`,
      template: `%s | ${siteMetadata.name}`,
    },
    description: siteMetadata.description,
    metadataBase: new URL(siteMetadata.url),
    keywords: [
      "cr\u00e9ation site internet artisan",
      "cr\u00e9ation site web TPE",
      "agence SEO TPE PME",
      "r\u00e9f\u00e9rencement google artisan",
      "site internet commer\u00e7ant",
      "cr\u00e9ation site internet seine et marne",
      "agence web 77",
      "agence web Meaux",
      "SEO ind\u00e9pendant",
      "site internet professionnel",
      "r\u00e9f\u00e9rencement local",
      "visibilit\u00e9 google",
    ],
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: siteMetadata.url,
      siteName: siteMetadata.name,
      title: `${siteMetadata.name} | Cr\u00e9ation de site internet & SEO`,
      description: siteMetadata.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "MKZ - Cr\u00e9ation de sites web et SEO pour artisans et ind\u00e9pendants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteMetadata.name} | Cr\u00e9ation de site internet & SEO`,
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
