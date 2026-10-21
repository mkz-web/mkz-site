import Link from "next/link";
import { ui } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

// 404 de la branche anglaise. La 404 globale (out/404.html), celle que
// Cloudflare Pages sert réellement pour une URL inconnue, reste la française :
// c'est la langue par défaut du site.
// Nouvelle charte (22/10/2026) : même page que la 404 globale (maquette codée du 20/10/2026,
// 404.html), textes et raccourcis anglais.

const raccourcis = [
  ["/en/french-seo/", "French SEO"],
  ["/en/ai-search-optimization/", "AI search"],
  ["/en/website-design/", "Websites"],
  ["/en/insights/", "Insights"],
  ["/en/contact/", "Contact"],
] as const;

export default function EnNotFound() {
  const t = ui.en.notFound;
  return (
    <ChartePage chemin="/en/404/" classes="page-annexe page-violet" locale="en">
      <section className="e404" data-theme="sombre">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe e404__in">
          <p className="e404__code" aria-hidden="true">404</p>
          <h1 className="titre-1" data-entree="">{t.title}</h1>
          <p className="e404__texte" data-entree="">{t.text}</p>
          <p data-entree=""><Link className="bouton bouton--plein" href="/en/">{t.back}</Link></p>
          <nav className="e404__liens" aria-label="Main pages" data-entree="">
            {raccourcis.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </div>
      </section>
    </ChartePage>
  );
}
