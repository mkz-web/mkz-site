import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="hu-options" strategy="beforeInteractive">
          {`var huOptions = {"appID":"mkz-consultingfr-9f08d00","currentLanguage":"en","blocking":true,"globalCookie":false}`}
        </Script>
        <Script
          src="https://cdn.hu-manity.co/hu-banner.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
