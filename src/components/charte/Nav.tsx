// En-tête de la charte : généré depuis la maquette du 20/10/2026 par construire-socle.mjs, puis
// rendu bilingue le 22/10/2026 (les entrées anglaises viennent du dictionnaire ui.en.nav).
// Le menu mobile et le passage en verre sombre sont posés par CharteScripts (ou AccueilScripts).
// Le lien vers l'autre langue est un <a> simple : l'autre langue est un autre root layout
// (rechargement complet), et son préchargement par next/link appliquait ses polices ici. Il
// vise la page équivalente quand elle existe (pagePairs), l'accueil de l'autre langue sinon.
import Link from "next/link";
import { CALENDLY, switcherTargetFor, ui, type Locale } from "@/lib/i18n";

const NAV_FR = [
  { name: "Accueil", href: "/" },
  { name: "Création de site", href: "/creation-site-internet/" },
  { name: "SEO", href: "/referencement-seo/" },
  { name: "Référencement IA", href: "/referencement-ia/" },
  { name: "Conseils", href: "/conseils/" },
  { name: "Outils", href: "/outils/" },
  { name: "Tarifs", href: "/tarifs/" },
  { name: "Contact", href: "/contact/" },
];

export default function Nav({ actif, chemin, locale = "fr" }: { actif: string | null; chemin: string; locale?: Locale }) {
  const en = locale === "en";
  const liens = en ? ui.en.nav : NAV_FR;
  const autre = switcherTargetFor(chemin, locale).href;
  return (
    <header className="nav" id="nav">
      <div className="enveloppe nav__in">
        <Link className="nav__logo" href={en ? "/en/" : "/"} aria-label={en ? "MKZ, home" : "MKZ, accueil"}>
          <svg viewBox="739.3 237.8 414.5 182" aria-hidden="true"><use href="#logo-lettres"/><use href="#logo-chevron"/></svg>
        </Link>
        <nav aria-label={en ? "Main navigation" : "Navigation principale"} className="nav__principal">
          <ul className="nav__liens" id="nav-liens">
            {liens.map((l) => (
              <li key={l.href}><Link href={l.href} aria-current={actif === l.href ? "page" : undefined}>{l.name}</Link></li>
            ))}
          </ul>
        </nav>
        <a className="nav__tel" href={en ? ui.en.header.phoneHref : "tel:0769093909"}>{en ? ui.en.header.phoneLabel : "07 69 09 39 09"}</a>
        <a className="bouton bouton--plein nav__cta" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{en ? ui.en.header.cta : "Audit gratuit"}</a>
        {en ? (
          <span className="nav__langue"><a href={autre} lang="fr" hrefLang="fr">FR</a> / <span aria-current="true">EN</span></span>
        ) : (
          <span className="nav__langue"><span aria-current="true">FR</span> / <a href={autre} lang="en" hrefLang="en">EN</a></span>
        )}
        <button className="nav__menu" type="button" aria-expanded="false" aria-controls="nav-liens">Menu</button>
      </div>
    </header>
  );
}
