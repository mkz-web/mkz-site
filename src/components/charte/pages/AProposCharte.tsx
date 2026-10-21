// Page /about/ à la nouvelle charte (maquette codée du 20/10/2026).
// Écart voulu : liens internes en next/link, Calendly en nofollow.
// Composant GÉNÉRÉ depuis la maquette (a-propos.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function AProposCharte() {
  return (
    <ChartePage chemin="/about/" classes="page-annexe page-nuit">
      {/* BANDEAU · même style que la page Outils (console) : titre centré sur la trame lumineuse, photo à cheval sur la section suivante */}
      <section className="console bio-console" data-theme="sombre">
        <div className="enveloppe console__in">
          <nav className="ariane" aria-label="Fil d'Ariane" data-entree=""><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">À propos</span></nav>
          <p className="console__sur" data-entree=""><i aria-hidden="true"></i>À propos</p>
          <h1 data-entree="">Mickaël <em className="degrade">Leclerc</em></h1>
          <p className="console__intro" data-entree="">Président de MKZ · ingénieur IT, +20 ans d’expérience</p>
          <div className="hero__actions" data-entree="">
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
            <span className="bio-console__ou">ou</span>
            <a className="bouton bouton--trait bouton--tel" href="tel:0769093909"><svg aria-hidden="true"><use href="#i-tel"/></svg>07 69 09 39 09</a>
          </div>
        </div>
        <figure className="bio-portrait">
          <img src="/images/charte/mickael-480.webp" width="480" height="480" alt="Mickaël Leclerc, fondateur de MKZ" />
          <figcaption>Mickaël Leclerc, fondateur<br />Dammartin-en-Goële (77)</figcaption>
        </figure>
      </section>

      {/* LE PARCOURS (clair) : une colonne de lecture, la promesse mise en avant */}
      <section className="section s-blanc bio-suite" data-theme="clair">
        <div className="enveloppe">
          <div className="bio-texte lecture" data-revele="">
            <p className="bio-texte__tags">ingénieur IT · expert SEO · automatisation · DevOps</p>
            <p className="bio-texte__ouverture">Après plus de 20 ans dans les grandes entreprises (infrastructure, automatisation, systèmes complexes), j’ai voulu mettre cette expertise technique au service des entrepreneurs qui n’ont ni le temps ni les moyens des grands groupes.</p>
            <p>De ces années d’ingénierie, j’ai gardé un réflexe : on ne déclare pas, on mesure. C’est-à-dire que chaque rapport que je vous envoie montre d’où vient le chiffre : positions relevées sur Google, visites comptées, citations par les IA vérifiées une par une. Et quand quelque chose ne se mesure pas, je vous l’écris, au lieu de le remplacer en douce par une estimation.</p>
            <p className="bio-texte__promesse"><strong>Ma promesse :</strong> des solutions professionnelles, un langage simple, et des résultats mesurables. Pas de blabla, que du concret. Je gère tout de A à Z pour que vous puissiez vous concentrer sur ce que vous faites de mieux : votre métier.</p>
            <p>Un site que personne ne trouve, en fait, c’est une boutique ouverte dans une rue où personne ne passe. Mon travail, c’est de déplacer la boutique : là où vos clients cherchent déjà, sur Google quand ils tapent votre métier et votre ville, et maintenant dans les réponses de ChatGPT ou de Perplexity quand ils posent directement la question à une IA.</p>
            <p>Deux règles ne bougent jamais ici. Un : tout est à vous. Le site, les contenus, les accès, le nom de domaine ; le jour où vous voulez reprendre la main, vous reprenez tout, sans frais ni chantage technique. Deux : je ne vous promettrai jamais la première place garantie, ni sur Google ni dans ChatGPT. Personne ne contrôle ces algorithmes, et ceux qui vous la garantissent vendent du vent. Ce que je garantis : le travail posé noir sur blanc dans un devis fixe, un rapport clair chaque mois, et un coup de fil honnête quand quelque chose ne marche pas.</p>
            <p>Que vous soyez artisan, commerçant, coach ou profession libérale, je comprends vos enjeux et je m’adapte à votre réalité.</p>
            <p>Concrètement, j’interviens sur trois terrains : <Link href="/creation-site-internet/">la création de site internet</Link>, <Link href="/referencement-seo/">le référencement naturel</Link> et <Link href="/referencement-ia/">le référencement IA</Link>, celui qui vous rend citable par ChatGPT et Perplexity. Le détail est sur la page <Link href="/services/">prestations et tarifs</Link>.</p>
            <p className="bio-texte__legal">MKZ, SAS à associé unique au capital de 1 000 € · SIRET 983 662 784 00013 · RCS Meaux · TVA intracommunautaire FR44983662784</p>
          </div>
        </div>
      </section>

      {/* QUATRE ENGAGEMENTS (sombre) : numérotés, en colonnes séparées par un filet */}
      <section className="section s-violet" data-theme="sombre">
        <div className="enveloppe">
          <ul className="bio-points" data-revele-groupe="">
            <li><span className="bio-points__num" aria-hidden="true">01</span><h3>Basé en Île-de-France</h3><p>Dammartin-en-Goële, Seine-et-Marne (77)</p></li>
            <li><span className="bio-points__num" aria-hidden="true">02</span><h3>Disponible &amp; réactif</h3><p>Réponse sous 24 h garantie, on décroche</p></li>
            <li><span className="bio-points__num" aria-hidden="true">03</span><h3>Clé en main</h3><p>De A à Z : je gère tout, vous gardez tout</p></li>
            <li><span className="bio-points__num" aria-hidden="true">04</span><h3>Reporting transparent</h3><p>Chaque mois, vous voyez vos résultats</p></li>
          </ul>
        </div>
      </section>

      {/* APPEL FINAL */}
      <section className="appel" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe appel__in">
          <div className="appel__texte">
            <h2 className="titre-2">Envie d’en <em className="degrade">discuter</em> ?</h2>
            <p className="chapeau">Réservez un créneau de 30 minutes. C’est gratuit et sans engagement.</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
            </div>
            <p className="appel__direct"><img className="appel__avatar" src="/images/charte/mickael-160.webp" width="40" height="40" alt="" loading="lazy" /><span>Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</span></p>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
