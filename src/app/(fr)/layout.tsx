import type { Metadata } from "next";
import Script from "next/script";
import ClarityScript from "@/components/ClarityScript";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import EmotionRegistry from "@/lib/EmotionRegistry";
import GlobalStyles from "@/lib/GlobalStyles";
import JsonLd, {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  personSchema,
} from "@/lib/JsonLd";
import { createMetadata } from "@/lib/metadata";

// Root layout de la locale française (route group « (fr) », URLs inchangées).
// Le pendant anglais vit dans src/app/(en)/layout.tsx : deux root layouts, donc
// deux attributs `lang` réellement distincts. Passer de l'un à l'autre provoque
// un rechargement complet, comportement attendu pour un changement de langue.

export const metadata: Metadata = createMetadata("fr", { path: "/" });

export default function FrRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href="/fonts/fraunces-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/archivo-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/plex-mono-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={personSchema} />
      </head>
      <body>
        <EmotionRegistry>
          <GlobalStyles />
          <Header locale="fr" />
          <main style={{ flex: 1, paddingTop: 73 }}>{children}</main>
          <Footer locale="fr" />
          <WhatsAppButton locale="fr" />
        </EmotionRegistry>
        <Script id="hu-options" strategy="beforeInteractive">
          {`var huOptions = {"appID":"mkz-consultingfr-9f08d00","currentLanguage":"fr","blocking":true,"globalCookie":false}`}
        </Script>
        <Script
          src="https://cdn.hu-manity.co/hu-banner.min.js"
          strategy="afterInteractive"
        />
        <ClarityScript />
      </body>
    </html>
  );
}
