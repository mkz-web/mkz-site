import type { Metadata } from "next";
import ClarityScript from "@/components/ClarityScript";
import ConsentBanner from "@/components/ConsentBanner";
import GaScript from "@/components/GaScript";
import SiteChrome from "@/components/SiteChrome";
import WhatsAppButton from "@/components/WhatsAppButton";
import EmotionRegistry from "@/lib/EmotionRegistry";
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
//
// Styles globaux, en-tête, <main> et pied de page passent par SiteChrome : l'accueil
// (nouvelle charte, 19/10/2026) apporte les siens. Les préchargements de polices du
// site y vivent aussi, pour ne pas précharger sur l'accueil des polices qu'il n'utilise pas.
// suppressHydrationWarning sur <html> : le script d'amorce de l'accueil y pose la classe
// « js » avant l'hydratation.

export const metadata: Metadata = createMetadata("fr", { path: "/" });

export default function FrRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={personSchema} />
      </head>
      <body>
        <EmotionRegistry>
          <SiteChrome locale="fr">{children}</SiteChrome>
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
