import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GlobalStyles from "@/lib/GlobalStyles";
import JsonLd, { organizationSchema, localBusinessSchema } from "@/lib/JsonLd";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <script
          dangerouslySetInnerHTML={{
            __html: `var huOptions = {"appID":"mkz-consultingfr-9f08d00","currentLanguage":"fr","blocking":true,"globalCookie":false}`,
          }}
        />
        <script
          src="https://cdn.hu-manity.co/hu-banner.min.js"
          type="text/javascript"
          charSet="utf-8"
          async
        />
      </head>
      <body>
        <GlobalStyles />
        <Header />
        <main style={{ flex: 1, paddingTop: 73 }}>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
