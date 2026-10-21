// En-tête de la charte : généré depuis la maquette du 20/10/2026 par construire-socle.mjs.
// Le menu mobile et le passage en verre sombre sont posés par CharteScripts (ou AccueilScripts).
// Le lien « EN » est un <a> simple : l'anglais est un autre root layout (rechargement complet),
// et son préchargement par next/link appliquait les polices de l'ancien habillage ici.
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";

export default function Nav({ actif }: { actif: string | null }) {
  return (
    <header className="nav" id="nav">
      <div className="enveloppe nav__in">
        <Link className="nav__logo" href="/" aria-label="MKZ, accueil">
          <svg viewBox="739.3 237.8 414.5 182" aria-hidden="true"><use href="#logo-lettres"/><use href="#logo-chevron"/></svg>
        </Link>
        <nav aria-label="Navigation principale" className="nav__principal">
          <ul className="nav__liens" id="nav-liens">
            <li><Link href="/" aria-current={actif === "/" ? "page" : undefined}>Accueil</Link></li>
            <li><Link href="/creation-site-internet/" aria-current={actif === "/creation-site-internet/" ? "page" : undefined}>Création de site</Link></li>
            <li><Link href="/referencement-seo/" aria-current={actif === "/referencement-seo/" ? "page" : undefined}>SEO</Link></li>
            <li><Link href="/referencement-ia/" aria-current={actif === "/referencement-ia/" ? "page" : undefined}>Référencement IA</Link></li>
            <li><Link href="/conseils/" aria-current={actif === "/conseils/" ? "page" : undefined}>Conseils</Link></li>
            <li><Link href="/outils/" aria-current={actif === "/outils/" ? "page" : undefined}>Outils</Link></li>
            <li><Link href="/tarifs/" aria-current={actif === "/tarifs/" ? "page" : undefined}>Tarifs</Link></li>
            <li><Link href="/contact/" aria-current={actif === "/contact/" ? "page" : undefined}>Contact</Link></li>
          </ul>
        </nav>
        <a className="nav__tel" href="tel:0769093909">07 69 09 39 09</a>
        <a className="bouton bouton--plein nav__cta" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Audit gratuit</a>
        <span className="nav__langue"><span aria-current="true">FR</span> / <a href="/en/" lang="en">EN</a></span>
        <button className="nav__menu" type="button" aria-expanded="false" aria-controls="nav-liens">Menu</button>
      </div>
    </header>
  );
}
