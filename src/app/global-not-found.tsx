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

export const metadata: Metadata = {
  title: "Page introuvable | MKZ",
  description:
    "La page demandée n'existe pas ou a été déplacée. Retournez à l'accueil de MKZ, création de sites internet et référencement SEO pour artisans et TPE.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  const t = ui.fr.notFound;

  return (
    <html lang="fr">
      <body>
        <GlobalStyles />
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "'Fraunces', Georgia, serif",
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
                  padding: "13px 22px",
                  background: "#E8590C",
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
            <p style={{ marginTop: 28, fontSize: 13, color: "#5E574B" }}>
              <a href="/conseils/" style={{ color: "#003764" }}>
                Conseils &amp; tutoriels
              </a>
              {" · "}
              <a href="/contact/" style={{ color: "#003764" }}>
                Contact
              </a>
              {" · "}
              <a href="/en/" hrefLang="en" lang="en" style={{ color: "#003764" }}>
                English
              </a>
            </p>
          </div>
        </section>
      </body>
    </html>
  );
}
