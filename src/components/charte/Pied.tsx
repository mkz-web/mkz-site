// Pied de page de la charte : généré depuis la maquette du 20/10/2026 par construire-socle.mjs.
// Le bouton « Gérer les cookies » est branché par CharteScripts (ou AccueilScripts) sur openConsent.
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";

export default function Pied() {
  return (
    <footer className="pied" data-theme="sombre">
      <div className="enveloppe">
        <div className="pied__haut">
          <p className="pied__phrase">Votre téléphone devrait <em className="teinte">sonner</em> plus souvent.</p>
          <div className="pied__appel">
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
            <p>ou directement : <strong><a href="tel:0769093909">07 69 09 39 09</a></strong></p>
          </div>
        </div>
        <div className="pied__grille">
          <div className="pied__marque">
            <svg className="pied__logo" viewBox="739.3 237.8 414.5 182" role="img" aria-label="MKZ"><use href="#logo-lettres"/><use href="#logo-chevron"/></svg>
            <p>Création de sites web et SEO pour artisans, commerçants et indépendants. Basés en Seine-et-Marne, partout en France.</p>
            <p className="petit">MKZ · SIRET 983 662 784 00013 · RCS Meaux<br />1 rue Françoise Sagan, 77230 Dammartin-en-Goële</p>
          </div>
          <nav aria-labelledby="pied-services"><h3 id="pied-services">Services</h3><ul>
            <li><Link href="/creation-site-internet/">Création de site internet</Link></li>
            <li><Link href="/referencement-seo/">Référencement SEO</Link></li>
            <li><Link href="/referencement-ia/">Référencement IA (GEO)</Link></li>
            <li><Link href="/agence-web-77/">Agence web Seine-et-Marne</Link></li>
            <li><Link href="/audit-seo/">Audit SEO gratuit en ligne</Link></li>
            <li><Link href="/empreinte-ia/">Empreinte d’une requête IA</Link></li>
          </ul></nav>
          <nav aria-labelledby="pied-conseils"><h3 id="pied-conseils">Conseils</h3><ul>
            <li><Link href="/conseils/tutoriels/">Tutoriels pas à pas</Link></li>
            <li><Link href="/conseils/creation-site-internet/">Création de site</Link></li>
            <li><Link href="/conseils/seo/">SEO &amp; visibilité</Link></li>
            <li><Link href="/conseils/referencement-ia/">Référencement IA</Link></li>
            <li><Link href="/conseils/">Tous les conseils</Link></li>
          </ul></nav>
          <div><h3>Contact</h3><ul>
            <li><a href="tel:0769093909">07 69 09 39 09</a></li>
            <li><a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></li>
            <li>Lun-sam 9h-21h<br />Réponse sous 24 h</li>
          </ul></div>
          <nav aria-labelledby="pied-liens"><h3 id="pied-liens">Liens</h3><ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/services/">Services</Link></li>
            <li><Link href="/outils/">Outils gratuits</Link></li>
            <li><Link href="/tarifs/">Tarifs</Link></li>
            <li><Link href="/about/">À propos</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
            <li><a href="/en/" lang="en">English</a></li>
          </ul></nav>
        </div>
        <div className="pied__bas">
          <p>© 2026 MKZ · Tous droits réservés</p>
          <p><Link href="/mentions-legales/">Mentions légales</Link> <Link href="/politique-confidentialite/">Politique de confidentialité</Link> <button type="button" className="pied__cookies">Gérer les cookies</button></p>
        </div>
      </div>
    </footer>
  );
}
