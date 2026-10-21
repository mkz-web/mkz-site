import type { Metadata } from "next";
import ClarityScript from "@/components/ClarityScript";
import ConsentBanner from "@/components/ConsentBanner";
import GaScript from "@/components/GaScript";
import WhatsAppButton from "@/components/WhatsAppButton";
import EmotionRegistry from "@/lib/EmotionRegistry";
import GlobalStyles from "@/lib/GlobalStyles";
import JsonLd, {
  organizationSchema,
  localBusinessSchema,
  websiteSchemaEn,
  personSchemaEn,
} from "@/lib/JsonLd";
import { createMetadata } from "@/lib/metadata";

// Root layout de la locale anglaise. Second root layout autorisé par Next
// (route groups), ce qui permet un vrai `lang="en"` : impossible depuis un
// layout imbriqué sous un root layout unique.
//
// Organization et LocalBusiness restent partagés : c'est la même entité
// juridique, même @id, donc un seul nœud dans le graphe. Seuls WebSite et
// Person ont une variante anglaise (inLanguage + description).
//
// Nouvelle charte (22/10/2026) : toutes les pages anglaises sont rendues par ChartePage
// (navigation, pied, styles de la charte) ; le layout ne pose plus l'ancien en-tête, l'ancien pied
// ni RevealMotion, seulement les styles globaux réduits, comme SiteChrome côté français. Les
// polices de la charte sont préchargées par ChartePage.

export const metadata: Metadata = createMetadata("en", { path: "/en/" });

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchemaEn} />
        <JsonLd data={personSchemaEn} />
      </head>
      <body>
        <EmotionRegistry>
          <GlobalStyles minimal />
          {children}
          <WhatsAppButton locale="en" />
          <ConsentBanner locale="en" />
        </EmotionRegistry>
        {/* Bandeau de consentement : composant maison ConsentBanner (dans le
            EmotionRegistry ci-dessus), bilingue, qui a remplacé hu-manity le
            21/08/2026 (son bandeau restait en français, la localisation étant
            une option payante). Les deux chargeurs lisent « mkz-consent ». */}
        <ClarityScript />
        <GaScript />
      </body>
    </html>
  );
}
