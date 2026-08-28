import type { Metadata } from "next";
import GlobalStyles from "@/lib/GlobalStyles";
import { ui } from "@/lib/i18n";

// 404 globale : c'est CE fichier qui produit out/404.html, la page servie par
// Cloudflare Pages pour toute URL inconnue.
//
// Pourquoi ce fichier existe : le site a deux root layouts (route groups « (fr) »
// et « (en) ») pour porter deux attributs `lang` distincts. Next n'a donc plus de
// layout unique pour composer une 404 globale, et retombe sur sa page d'erreur
// par défaut, sans marque ni `lang`. `experimental.globalNotFound` + ce fichier
// reprennent la main. Contrainte : il doit rendre le document HTML complet,
// balises <html> et <body> incluses.
//
// Elle est en français : c'est la langue par défaut du site. Un visiteur perdu
// dans /en/ obtient la 404 anglaise via src/app/(en)/en/not-found.tsx.
//
// En-tête et pied maison en styles inline, PAS les composants Header/Footer :
// ils supposent l'EmotionRegistry des layouts, absent ici. Constat P3 du check
// UX du 21/08/2026 : la page servait 21 mots sans aucune navigation. Bouton en
// #B8420A (ctaInk) et pas #E8590C : blanc sur E8590C = 3,6:1, mesuré le 28/08.

export const metadata: Metadata = {
  title: "Page introuvable | MKZ",
  description:
    "La page demandée n'existe pas ou a été déplacée. Retournez à l'accueil de MKZ, création de sites internet et référencement SEO pour artisans et TPE.",
  robots: { index: false, follow: false },
};

const navLinks = [
  ["/conseils/", "Conseils"],
  ["/outils/", "Outils"],
  ["/tarifs/", "Tarifs"],
  ["/contact/", "Contact"],
] as const;

export default function GlobalNotFound() {
  const t = ui.fr.notFound;

  return (
    <html lang="fr">
      <body>
        <GlobalStyles />
        <header style={{ background: "#FAF7F1", borderBottom: "1px solid #E3DACA" }}>
          <nav
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <a href="/" style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mkz-logo.svg" alt="MKZ" width={72} height={37} />
            </a>
            <span style={{ display: "inline-flex", flexWrap: "wrap" }}>
              {navLinks.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: 44,
                    padding: "0 12px",
                    color: "#221F1A",
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </span>
          </nav>
        </header>

        <section
          style={{
            minHeight: "calc(100vh - 220px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "'Fraunces', 'Fraunces Fallback', Georgia, serif",
                fontSize: 96,
                fontWeight: 600,
                lineHeight: 1,
                color: "#003764",
              }}
            >
              404
            </span>
            <h1 style={{ marginTop: 20, fontSize: 26, fontWeight: 700, color: "#221F1A" }}>
              {t.title}
            </h1>
            <p style={{ marginTop: 10, fontSize: 16, color: "#5E574B" }}>{t.text}</p>
            <p style={{ marginTop: 32 }}>
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  padding: "14px 24px",
                  background: "#B8420A",
                  color: "white",
                  fontSize: 14.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textDecoration: "none",
                }}
              >
                {t.back}
              </a>
            </p>
          </div>
        </section>

        <footer style={{ background: "#FAF7F1", borderTop: "1px solid #E3DACA" }}>
          <p
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "8px 24px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0 8px",
              fontSize: 13,
              color: "#5E574B",
            }}
          >
            {(
              [
                ["/", "Accueil"],
                ["/mentions-legales/", "Mentions légales"],
                ["/politique-confidentialite/", "Politique de confidentialité"],
              ] as const
            ).map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 44,
                  padding: "0 4px",
                  color: "#5E574B",
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="/en/"
              hrefLang="en"
              lang="en"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                padding: "0 4px",
                color: "#5E574B",
              }}
            >
              English
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
