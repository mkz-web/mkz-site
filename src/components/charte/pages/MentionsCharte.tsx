// Page /mentions-legales/ à la nouvelle charte (maquette codée du 20/10/2026).
// Texte identique à MentionsContent.tsx (comparé phrase par phrase le 21/10/2026). Capital, TVA et
// RCS vivent à sept endroits : liste dans AGENTS.md. Écarts voulus : liens internes en next/link,
// lien externe en nouvel onglet comme sur le site.
// Composant GÉNÉRÉ depuis la maquette (mentions-legales.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import Link from "next/link";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function MentionsCharte() {
  return (
    <ChartePage chemin="/mentions-legales/" classes="page-annexe page-clair">
      {/* EN-TÊTE · sobre et centré, comme les articles */}
      <header className="legal-tete" data-theme="clair">
        <div className="enveloppe legal-tete__in">
          <nav className="ariane" aria-label="Fil d'Ariane"><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">Mentions légales</span></nav>
          <h1>Mentions légales</h1>
          <p className="legal-tete__intro">An <a href="/en/legal-notice/" hrefLang="en" lang="en">English translation of this legal notice</a> is available for convenience. Seule la version française ci-dessous fait foi.</p>
        </div>
      </header>

      {/* CORPS · sommaire collant à gauche, colonne de lecture à droite (gabarit des articles) */}
      <div className="enveloppe art-corps">
        <aside className="art-cote">
          <nav className="art-sommaire" aria-label="Sommaire"><details open><summary>Sommaire</summary><ol>
            <li><a href="#editeur-du-site">Éditeur du site</a></li>
            <li><a href="#hebergement">Hébergement</a></li>
            <li><a href="#propriete-intellectuelle">Propriété intellectuelle</a></li>
            <li><a href="#donnees-personnelles">Données personnelles</a></li>
            <li><a href="#cookies">Cookies</a></li>
          </ol></details></nav>
        </aside>
        <div className="lecture legal-texte">
          <h2 id="editeur-du-site">Éditeur du site</h2>
          <div className="legal-fiche">
            <p><strong>MKZ</strong>, SAS à associé unique au capital de 1 000 €</p>
            <p>SIRET : 983 662 784 00013</p>
            <p>RCS Meaux 983 662 784</p>
            <p>N° de TVA intracommunautaire : FR44983662784</p>
            <p>Activité : Conseil en systèmes et logiciels informatiques</p>
            <p>Siège social : 1 rue Françoise Sagan, 77230 Dammartin-en-Goële</p>
            <p>Téléphone : 07 69 09 39 09</p>
            <p>Email : <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></p>
            <p>Directeur de la publication : Mickaël Leclerc, Président</p>
          </div>

          <h2 id="hebergement">Hébergement</h2>
          <div className="legal-fiche">
            <p><strong>Cloudflare, Inc.</strong> (Cloudflare Pages)</p>
            <p>101 Townsend Street, San Francisco, CA 94107, États-Unis</p>
            <p>Téléphone : +1 650 319 8930</p>
            <p>Site web : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">www.cloudflare.com</a></p>
          </div>
          <p>L’hébergeur est établi hors de l’Union européenne. Les conditions de ce transfert et les garanties associées sont détaillées dans notre <Link href="/politique-confidentialite/">politique de confidentialité</Link>.</p>

          <h2 id="propriete-intellectuelle">Propriété intellectuelle</h2>
          <p>L’ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de MKZ, à l’exception des marques, logos ou contenus appartenant à d’autres sociétés partenaires ou auteurs. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l’accord écrit préalable de MKZ.</p>

          <h2 id="donnees-personnelles">Données personnelles</h2>
          <p>Les informations recueillies via le formulaire de contact sont destinées exclusivement à MKZ et sont utilisées uniquement pour répondre à vos demandes. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à : <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a>.</p>

          <h2 id="cookies">Cookies</h2>
          <p>Avec votre consentement, ce site utilise les outils de mesure d’audience Google Analytics 4 et Microsoft Clarity. Sans votre accord, donné via le bandeau cookies, seuls des cookies techniques strictement nécessaires au fonctionnement du site sont utilisés. Le détail figure dans notre <Link href="/politique-confidentialite/">politique de confidentialité</Link>.</p>
        </div>
      </div>
    </ChartePage>
  );
}
