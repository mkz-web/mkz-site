import type { Metadata } from "next";
import Script from "next/script";
import ClarityScript from "@/components/ClarityScript";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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

export const metadata: Metadata = createMetadata("en", { path: "/en/" });

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/fraunces-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/archivo-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/plex-mono-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchemaEn} />
        <JsonLd data={personSchemaEn} />
      </head>
      <body>
        <GlobalStyles />
        <Header locale="en" />
        <main style={{ flex: 1, paddingTop: 73 }}>{children}</main>
        <Footer locale="en" />
        <WhatsAppButton locale="en" />
        {/* `currentLanguage: "en"` est bien transmis, verifie dans le DOM, mais
            le bandeau hu-manity reste rendu en francais : la localisation est
            une option payante de leur offre. Choix de Mickael le 30/07/2026 de
            ne pas la souscrire. Le parametre reste en place pour que le
            basculement soit immediat le jour ou l offre change. Ne pas
            rediagnostiquer : ce n est pas un defaut du code. */}
        <Script id="hu-options" strategy="beforeInteractive">
          {`var huOptions = {"appID":"mkz-consultingfr-9f08d00","currentLanguage":"en","blocking":true,"globalCookie":false}`}
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
