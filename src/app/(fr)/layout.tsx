import type { Metadata } from "next";
import ClarityScript from "@/components/ClarityScript";
import ConsentBanner from "@/components/ConsentBanner";
import GaScript from "@/components/GaScript";
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
          <ConsentBanner locale="fr" />
        </EmotionRegistry>
        {/* Bandeau de consentement : composant maison ConsentBanner (dans le
            EmotionRegistry ci-dessus), qui a remplacé hu-manity le 21/08/2026.
            Les deux chargeurs ci-dessous lisent son cookie « mkz-consent ». */}
        <ClarityScript />
        <GaScript />
      </body>
    </html>
  );
}
