"use client";

// Habillage des pages françaises : styles globaux, en-tête, <main>, pied de page.
//
// Nouvelle charte (maquette codée du 20/10/2026, intégration commencée le 19/10/2026) : les
// pages déjà converties (liste dans src/lib/charte.ts) apportent leur navigation, leur <main>
// et leur pied de page (ChartePage) : on n'y rend ni Header, ni Footer, ni RevealMotion, et
// les styles globaux y sont réduits à ce dont le bandeau de consentement et la bulle WhatsApp
// ont besoin. Les pages pas encore converties sont rendues exactement comme avant.
//
// Les préchargements des polices du site partent d'ici et plus du <head> du layout :
// l'accueil ne les utilise pas, et un préchargement inutilisé laisse un avertissement
// dans la console à chaque visite.

import { usePathname } from "next/navigation";
import { preload } from "react-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealMotion from "@/components/RevealMotion";
import GlobalStyles from "@/lib/GlobalStyles";
import { estCharte } from "@/lib/charte";
import type { Locale } from "@/lib/i18n";

const POLICES_SITE = ["/fonts/fraunces-var.woff2", "/fonts/archivo-var.woff2", "/fonts/plex-mono-400.woff2"];

export default function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages déjà converties à la nouvelle charte (src/lib/charte.ts) : elles apportent leur
  // en-tête, leur <main> et leur pied de page (ChartePage).
  if (locale === "fr" && estCharte(pathname)) {
    return (
      <>
        <GlobalStyles minimal />
        {children}
      </>
    );
  }

  for (const href of POLICES_SITE) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }

  return (
    <>
      <GlobalStyles />
      <RevealMotion />
      <Header locale={locale} />
      <main id="main-content" tabIndex={-1} style={{ flex: 1, paddingTop: 73 }}>
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
