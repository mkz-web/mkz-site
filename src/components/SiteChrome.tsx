"use client";

// Habillage des pages françaises : styles globaux, en-tête, <main>, pied de page.
//
// Depuis l'intégration du nouvel accueil (maquette codée du 18/10/2026, intégrée le 19/10/2026),
// « / » apporte sa propre navigation, son <main> et son pied de page (AccueilContent) :
// on n'y rend ni Header, ni Footer, ni RevealMotion (GSAP anime l'accueil), et les styles
// globaux y sont réduits à ce dont le bandeau de consentement et la bulle WhatsApp ont
// besoin. Les autres pages sont rendues exactement comme avant.
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
import type { Locale } from "@/lib/i18n";

const POLICES_SITE = ["/fonts/fraunces-var.woff2", "/fonts/archivo-var.woff2", "/fonts/plex-mono-400.woff2"];

export default function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const pathname = usePathname();

  if (locale === "fr" && pathname === "/") {
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
