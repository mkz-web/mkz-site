import type { Metadata } from "next";
import Link from "next/link";
import GlobalStyles from "@/lib/GlobalStyles";
import EmotionRegistry from "@/lib/EmotionRegistry";
import ConsentBanner from "@/components/ConsentBanner";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";
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
// Nouvelle charte (maquette codée du 20/10/2026, 404.html) depuis le 21/10/2026 :
// navigation et pied de page complets, grand « 404 » et raccourcis vers les pages principales.
// Le bandeau de consentement est monté ici aussi : le bouton « Gérer les cookies » du pied de page
// l'ouvre, il ne doit pas rester sans effet. Aucun chargeur de mesure d'audience sur cette page.

export const metadata: Metadata = {
  title: "Page introuvable | MKZ",
  description:
    "La page demandée n'existe pas ou a été déplacée. Retournez à l'accueil de MKZ, création de sites internet et référencement SEO pour artisans et TPE.",
  robots: { index: false, follow: false },
};

const raccourcis = [
  ["/creation-site-internet/", "Création de site"],
  ["/referencement-seo/", "Référencement SEO"],
  ["/referencement-ia/", "Référencement IA"],
  ["/conseils/", "Conseils"],
  ["/contact/", "Contact"],
] as const;

export default function GlobalNotFound() {
  const t = ui.fr.notFound;

  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <EmotionRegistry>
          <GlobalStyles minimal />
          <ChartePage chemin="/404/" classes="page-annexe page-violet">
            {/* PAGE INTROUVABLE · le texte du site, un grand « 404 » et des raccourcis vers les pages principales */}
            <section className="e404" data-theme="sombre">
              <div className="halo-fond" aria-hidden="true"></div>
              <div className="enveloppe e404__in">
                <p className="e404__code" aria-hidden="true">404</p>
                <h1 className="titre-1" data-entree="">{t.title}</h1>
                <p className="e404__texte" data-entree="">{t.text}</p>
                <p data-entree=""><Link className="bouton bouton--plein" href="/">{t.back}</Link></p>
                <nav className="e404__liens" aria-label="Pages principales" data-entree="">
                  {raccourcis.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
                </nav>
              </div>
            </section>
          </ChartePage>
          <ConsentBanner locale="fr" />
        </EmotionRegistry>
      </body>
    </html>
  );
}
