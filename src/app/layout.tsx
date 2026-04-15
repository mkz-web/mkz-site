import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      </head>
      <body>
        <GlobalStyles />
        <Header />
        <main style={{ flex: 1, paddingTop: 73 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
