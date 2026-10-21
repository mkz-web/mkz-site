// Page /services/ à la nouvelle charte (maquette codée du 20/10/2026).
// Écarts voulus : phrase tarifaire mise à la grille du 21/10/2026 (accompagnement Google et IA
// dès 590 €/mois, comme ServicesContent sur master), liens internes en next/link.
// Composant GÉNÉRÉ depuis la maquette (services.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function ServicesCharte() {
  return (
    <ChartePage chemin="/services/" classes="page-annexe page-clair">
      {/* BANDEAU · titre centré, puis les deux expertises en grands panneaux photo reliés par un « + » */}
      <section className="svc-tete" data-theme="clair">
        <div className="enveloppe svc-tete__in">
          <nav className="ariane" aria-label="Fil d'Ariane" data-entree=""><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">Services</span></nav>
          <p className="svc-tete__sur" data-entree="">Nos services</p>
          <h1 className="titre-1" data-entree="">Deux expertises, <em className="degrade">un objectif : du business.</em></h1>
          <p className="svc-tete__intro" data-entree="">Création de site et référencement Google se renforcent l’un l’autre. Vous pouvez commencer par l’un, l’autre, ou les deux.</p>
        </div>
        <div className="enveloppe svc-duo">
          <article className="svc" data-theme="sombre" data-entree="">
            <figure className="svc__photo"><img src="/images/accueil/ecran.webp" width="800" height="1000" alt="Un ordinateur portable entrouvert, son écran diffuse une lumière bleue et violette" /></figure>
            <p className="svc__num">Service 01</p>
            <h2 className="titre-2">Création de site web</h2>
            <p>Un site qui vous ressemble et qui convertit. Design sur-mesure, UX optimisée, et performances au top pour transformer vos visiteurs en clients.</p>
            <p className="svc__tags">image de marque · direction artistique · responsive · branding · optimisation vitesse</p>
            <Link className="bouton bouton--plein" href="/creation-site-internet/">Découvrir la création de site internet</Link>
          </article>
          <article className="svc svc--seo" data-theme="sombre" data-entree="">
            <figure className="svc__photo"><img src="/images/accueil/google.webp" width="800" height="1000" alt="Une recherche Google ouverte sur un ordinateur portable, à côté d'un café" /></figure>
            <p className="svc__num">Service 02</p>
            <h2 className="titre-2">SEO &amp; référencement</h2>
            <p>Montez sur le podium Google. Stratégie de mots-clés, optimisation technique, contenu optimisé et netlinking pour un trafic qualifié et durable.</p>
            <p className="svc__tags">audit SEO complet · stratégie de contenu · SEO technique · cocon sémantique · suivi mensuel</p>
            <Link className="bouton bouton--plein" href="/referencement-seo/">Découvrir le référencement SEO</Link>
          </article>
        </div>
      </section>

      {/* POUR ALLER PLUS LOIN (sombre) : les quatre pages relais, en liste à filets */}
      <section className="section s-nuit-profonde" data-theme="sombre">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">Pour aller <em className="degrade-rose">plus loin</em></h2></header>
          <ul className="svc-liens" data-revele-groupe="">
            <li><Link href="/agence-web-77/"><span className="svc-liens__ico" aria-hidden="true"><svg><use href="#i-repere"/></svg></span><span><span className="svc-liens__titre">Votre agence web en Seine-et-Marne (77)</span><span className="svc-liens__texte">Basés à Dammartin-en-Goële, nous accompagnons artisans, commerçants et TPE à Meaux, Melun, Chelles et dans tout le 77.</span></span><span className="svc-liens__fleche" aria-hidden="true">→</span></Link></li>
            <li><Link href="/conseils/"><span className="svc-liens__ico" aria-hidden="true"><svg><use href="#i-doc"/></svg></span><span><span className="svc-liens__titre">Conseils &amp; tutoriels gratuits</span><span className="svc-liens__texte">Guides SEO, tutoriels pas à pas (Search Console, fiche Google, WordPress)… Les méthodes que nous appliquons pour nos clients, en accès libre.</span></span><span className="svc-liens__fleche" aria-hidden="true">→</span></Link></li>
            <li><Link href="/tarifs/"><span className="svc-liens__ico" aria-hidden="true"><svg><use href="#i-etiquette"/></svg></span><span><span className="svc-liens__titre">Nos tarifs, affichés</span><span className="svc-liens__texte">Site vitrine 1 490 €, audit SEO 490 €, accompagnement Google et IA dès 590 €/mois… Les prix de base sont publics, le devis fixe est écrit avant signature.</span></span><span className="svc-liens__fleche" aria-hidden="true">→</span></Link></li>
            <li><Link href="/outils/"><span className="svc-liens__ico" aria-hidden="true"><svg><use href="#i-rapport"/></svg></span><span><span className="svc-liens__titre">Deux outils gratuits, sans inscription</span><span className="svc-liens__texte">L’audit SEO + IA qui mesure votre site en une minute, et le simulateur d’empreinte d’une requête IA. Pour mesurer avant de nous parler.</span></span><span className="svc-liens__fleche" aria-hidden="true">→</span></Link></li>
          </ul>
        </div>
      </section>

      {/* APPEL FINAL */}
      <section className="appel" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe appel__in">
          <div className="appel__texte">
            <h2 className="titre-2">Un projet <em className="degrade">en tête</em> ?</h2>
            <p className="chapeau">Réservez votre audit gratuit de 30 minutes. C’est gratuit, sans engagement, et vous repartez avec un plan d’action concret.</p>
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
