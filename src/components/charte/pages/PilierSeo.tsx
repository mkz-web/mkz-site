// Page /referencement-seo/ à la nouvelle charte (maquette codée du 20/10/2026).
// Le texte vit aussi dans src/content/pillars/referencement-seo.ts (JSON-LD FAQPage, llms-full.txt) :
// scripts/controler-charte.mjs refuse le build si une phrase du contenu n'est plus affichée ici.
// Écarts voulus : FAQ générée depuis le contenu (source unique du visible et du JSON-LD), fiche Google
// lue dans avis-google.ts, liens internes en next/link, Calendly en nofollow.
// Composant GÉNÉRÉ depuis la maquette (referencement-seo.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import pillar from "@/content/pillars/referencement-seo";
import { ficheGoogle } from "@/content/avis-google";
import "@/components/charte/metier.css";

export default function PilierSeo() {
  return (
    <ChartePage chemin="/referencement-seo/" classes="page-metier page-clair">
      {/* HERO · teinte lavande claire, comme la rangée « SEO & référencement Google » de l'accueil */}
      <section className="mhero v-bas" data-theme="clair">
        <div className="enveloppe mhero__in">
          <div className="mhero__texte">
            <nav className="ariane" aria-label="Fil d'Ariane" data-entree=""><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">Agence SEO en Seine-et-Marne (77)</span></nav>
            <p className="mhero__surtitre" data-entree=""><svg aria-hidden="true"><use href="#i-loupe"/></svg>Agence SEO en Seine-et-Marne (77)</p>
            <h1 className="titre-1" data-entree="">Agence SEO en Seine-et-Marne : <em className="degrade">un référencement qui ramène des clients</em></h1>
            <p className="mhero__intro" data-entree="">Vos clients vous cherchent déjà sur Google. Nous faisons en sorte qu’ils vous trouvent, vous, pas vos concurrents. Méthode transparente, tarifs annoncés avant signature, résultats mesurés chaque mois.</p>
            <div className="hero__actions" data-entree="">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
              <a className="mhero__tel" href="tel:0769093909">ou 07 69 09 39 09</a>
            </div>
            <a className="note-google" href={ficheGoogle.url} target="_blank" rel="noopener" data-entree=""><span className="etoile" aria-hidden="true">★</span> 5,0 sur Google · 5 avis</a>
          </div>

          {/* Visuel : un tableau de bord de statistiques, chiffres d'illustration (décoratif) */}
          <div className="mvisuel mvisuel--tableau" aria-hidden="true">
            <div className="mcarte mtableau" data-entree="">
              <div className="mtableau__barre"><i></i><i></i><i></i><span>Performances · Recherche Google · 6 mois</span></div>
              <div className="mtableau__corps">
                <ul className="mtableau__kpi">
                  <li><small>Clics</small><b>1 284</b><em>+38 %</em></li>
                  <li><small>Impressions</small><b>24,6 k</b><em>+52 %</em></li>
                  <li><small>CTR moyen</small><b>5,2 %</b><em>+0,8 pt</em></li>
                  <li><small>Position</small><b>4,2</b><em>+7 places</em></li>
                </ul>
                <svg className="mtableau__graph" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <path className="grille" d="M0 30H400M0 60H400M0 90H400"/>
                  <path className="impr" d="M0 96 C40 92 70 88 110 80 S180 62 220 58 S300 40 340 30 S380 20 400 16"/>
                  <path className="aire" d="M0 110 C40 108 70 104 110 98 S170 84 210 76 S290 52 330 40 S380 22 400 18 L400 120 L0 120Z"/>
                  <path className="clics" d="M0 110 C40 108 70 104 110 98 S170 84 210 76 S290 52 330 40 S380 22 400 18"/>
                </svg>
                <ul className="mtableau__req">
                  <li><span>Requête</span><span>Clics</span><span>Pos.</span></li>
                  <li><span>plombier meaux</span><i style={{ "--b": "100%" } as CSSProperties}></i><em>1</em></li>
                  <li><span>dépannage plombier 77</span><i style={{ "--b": "68%" } as CSSProperties}></i><em>2</em></li>
                  <li><span>chauffe-eau meaux</span><i style={{ "--b": "44%" } as CSSProperties}></i><em>3</em></li>
                </ul>
              </div>
            </div>
            <p className="mpastille mv-haut" data-entree=""><svg><use href="#i-tel"/></svg>Appel entrant</p>
            <div className="mcarte mobjectif" data-entree=""><span className="mobjectif__ico"><svg><use href="#i-courbe"/></svg></span><p><strong>Augmenter ses ventes</strong><small>Plus d’appels, plus de devis</small></p></div>
            <div className="mcarte mgoogle" data-entree="">
              <p className="mcarte__titre">Recherche locale</p>
              <div className="mgoogle__recherche"><span className="mgoogle__g">G</span>plombier Meaux</div>
              <ul className="mgoogle__res">
                <li className="mgoogle__vous"><em>1</em><strong>votre-site.fr</strong><small><i>★</i> 5,0 · Ouvert</small></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION ET SOMMAIRE (sombre, violet) */}
      <section className="section s-violet apres-v intro" data-theme="sombre">
        <div className="enveloppe intro__grille">
          <div className="intro__texte prose" data-revele="">
            <p className="petit intro__label">En bref</p>
            <p className="intro__chapeau">MKZ est une <strong>agence SEO en Seine-et-Marne</strong>, basée à Dammartin-en-Goële, dans le nord du 77. Notre métier : faire apparaître votre entreprise en haut de Google quand un client tape votre métier et sa ville : « plombier Meaux », « boulangerie Dammartin-en-Goële ».</p>
            <p>Nos armes : un site techniquement irréprochable, des contenus qui répondent aux vraies questions de vos clients, un suivi mensuel chiffré. Et une règle : pas de promesse chiffrée avant d’avoir regardé votre site. C’est-à-dire que chaque mois, vous lisez vos propres chiffres, ceux de votre <strong>trafic organique</strong> (les visites gratuites venues de Google), mesurés dans votre Search Console.</p>
            <p>Vous êtes artisan, commerçant ou patron de TPE ? Notre offre est construite pour vous : zéro jargon, tarifs annoncés avant signature, aucun engagement-piège. Et vous restez propriétaire de tout, du nom de domaine aux contenus.</p>
            <ul className="intro__points" aria-label="Points clés"><li><svg className="ico" aria-hidden="true"><use href="#i-repere"/></svg>Basée en Seine-et-Marne</li><li><svg className="ico" aria-hidden="true"><use href="#i-etiquette"/></svg>Tarifs annoncés avant signature</li><li><svg className="ico" aria-hidden="true"><use href="#i-courbe"/></svg>Résultats mesurés chaque mois</li></ul>
          </div>
          <nav className="sommaire-carte" aria-labelledby="sommaire" data-revele="">
            <p className="petit" id="sommaire">Sommaire</p>
            <ol>
              <li><a href="#seo-explique-sans-jargon">Le référencement naturel (SEO) expliqué sans jargon</a></li>
              <li><a href="#referencement-local-seine-et-marne">Pourquoi le référencement local est vital pour un artisan ou commerçant en Seine-et-Marne</a></li>
              <li><a href="#methode-seo-4-etapes">Notre méthode SEO en 4 étapes, transparente et mesurable</a></li>
              <li><a href="#tarifs-referencement">Combien coûte une agence SEO en Seine-et-Marne ? Nos tarifs en toute transparence</a></li>
              <li><a href="#delais-premiers-resultats">Combien de temps avant les premiers résultats ?</a></li>
              <li><a href="#geo-chatgpt-ia">Être trouvé aussi par ChatGPT et les IA : le SEO version 2026 (GEO)</a></li>
              <li><a href="#agence-seo-nord-77">MKZ, l’agence SEO du nord Seine-et-Marne : Dammartin-en-Goële, Meaux, Roissy</a></li>
              <li><a href="#audit-seo-gratuit">Demandez votre audit SEO gratuit</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </nav>
        </div>
      </section>

      {/* 01 · LE SEO EXPLIQUÉ (clair) */}
      <section className="section bloc s-blanc" id="seo-explique-sans-jargon" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">01</p>
            <h2 className="titre-2">Le référencement naturel (SEO) <em className="degrade">expliqué sans jargon</em></h2>
          </header>
          <div className="bloc__corps prose">
            <aside className="retenir definition definition--filet" data-revele="">
              <p className="petit">Définition</p>
              <p>Le <strong>référencement naturel</strong> (SEO) regroupe les techniques qui font apparaître un site dans les premiers résultats gratuits de Google, sans publicité. On parle aussi de « référencement Google ».</p>
            </aside>
            <p data-revele="">Pour <strong>référencer son entreprise sur Google</strong>, pas de bouton magique : Google classe les sites selon des centaines de critères. La bonne nouvelle ? La plupart de vos concurrents les travaillent mal, ou pas du tout. Avec une méthode rigoureuse, une TPE locale peut passer devant bien plus gros qu’elle.</p>
            <h3 className="titre-3" data-revele="">Les 3 piliers du SEO : technique, contenu, popularité</h3>
            <ul className="cartes-ico cartes-ico--3" data-revele-groupe="">
              <li className="carte-ico"><svg className="ico" aria-hidden="true"><use href="#i-eclair"/></svg><p><strong>La technique</strong> : un site rapide, sécurisé, que Google lit sans obstacle. Chaque site que nous livrons est contrôlé aux Core Web Vitals avant sa mise en ligne.</p></li>
              <li className="carte-ico"><svg className="ico" aria-hidden="true"><use href="#i-doc"/></svg><p><strong>Le contenu</strong> : des pages qui répondent précisément aux questions que vos clients tapent dans Google.</p></li>
              <li className="carte-ico"><svg className="ico" aria-hidden="true"><use href="#i-lien"/></svg><p><strong>La popularité</strong> : des liens, des avis et des mentions locales qui prouvent que vous faites référence dans votre zone.</p></li>
            </ul>
            <h3 className="titre-3" data-revele="">SEO ou publicité Google (SEA) : quelle différence pour votre budget ?</h3>
            <p data-revele="">Le <strong>SEA</strong>, c’est la publicité Google Ads : vous payez chaque clic pour apparaître immédiatement, avec la mention « Sponsorisé ». Le SEO demande quelques mois, mais continue de travailler sans budget publicitaire :</p>
      <div className="tableau" data-revele="">
      <table>
      <caption>SEO et publicité Google Ads : comparaison pour une TPE</caption>
      <thead><tr><th scope="col">Critère</th><th scope="col" className="col-fort">Référencement naturel (SEO)</th><th scope="col">Publicité Google (SEA)</th></tr></thead>
      <tbody>
      <tr><td data-label="Critère">Premiers résultats</td><td data-label="Référencement naturel (SEO)" className="col-fort">3 à 6 mois en général</td><td data-label="Publicité Google (SEA)">Immédiats</td></tr>
      <tr><td data-label="Critère">Coût</td><td data-label="Référencement naturel (SEO)" className="col-fort">Prestation mensuelle ou ponctuelle</td><td data-label="Publicité Google (SEA)">Budget + coût par clic, en continu</td></tr>
      <tr><td data-label="Critère">Durabilité</td><td data-label="Référencement naturel (SEO)" className="col-fort">Positions acquises si le travail est entretenu</td><td data-label="Publicité Google (SEA)">Tout s’arrête avec le budget</td></tr>
      <tr><td data-label="Critère">Confiance des internautes</td><td data-label="Référencement naturel (SEO)" className="col-fort">Forte : résultats « mérités »</td><td data-label="Publicité Google (SEA)">Plus faible : mention « Sponsorisé »</td></tr>
      </tbody></table></div>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>Le SEO est un investissement : il continue de produire appels et devis après l’effort initial. La publicité est une dépense : elle s’arrête avec le budget. Avec un budget serré, commencez par le référencement naturel.</p>
            </aside>
          </div>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Pourquoi le référencement local est vital pour un artisan ou commerçant en Seine-et-Marne » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 02 · RÉFÉRENCEMENT LOCAL (sombre) : rangée photo et texte, puis les deux points sur le principe de la section 03 de la page IA (photo collante, liste à filets) */}
      <section className="bloc-contenu s-teinte" id="referencement-local-seine-et-marne" data-theme="sombre">
        <div className="rangee rangee--inverse" data-theme="sombre">
          <div className="rangee__image"><img src="/images/charte/photos/jeune-femme-cherche-adresse-telephone-dans-1200x920.webp" width="1200" height="920" loading="lazy" alt="Une jeune femme cherche une adresse sur son téléphone, dans la rue" /></div>
          <div className="rangee__corps prose" data-revele="">
            <p className="bloc__num" aria-hidden="true">02</p>
            <h2 className="titre-2">Pourquoi le <em className="degrade">référencement local</em> est vital pour un artisan ou commerçant en Seine-et-Marne</h2>
            <p>Le <strong>référencement local</strong> consiste à apparaître sur Google et Google Maps pour les recherches faites près de chez vous : « électricien Dammartin-en-Goële », « coiffeur Meaux ». Pour un artisan ou un commerçant, c’est le levier le plus rentable du web. Les avis Google, premier levier de ce classement, ont leur <Link href="/conseils/seo/avis-google/">guide complet</Link>.</p>
          </div>
        </div>
        <div className="marine">
        <div className="section enveloppe prose ingredients">
          <div className="coeur">
            <figure className="coeur__photo" data-revele="">
              <img src="/images/charte/photos/commercant-tient-cles-boutique-880x1100.webp" srcSet="/images/charte/photos/commercant-tient-cles-boutique-600x750.webp 600w, /images/charte/photos/commercant-tient-cles-boutique-880x1100.webp 880w" sizes="(max-width: 899px) 100vw, 40vw" width="880" height="1100" loading="lazy" alt="Un commerçant tient les clés de sa boutique" />
              <div className="fiche coeur__fiche" aria-hidden="true">
                <div className="fiche__tete"><span className="fiche__logo"></span><p><b>Votre entreprise</b><small><i>★★★★★</i> 5,0 · Ouvert</small></p></div>
                <ul className="fiche__actions">
                  <li><svg><use href="#i-repere"/></svg>Itinéraire<b><span data-compte="40.4">40,4</span> %</b></li>
                  <li><svg><use href="#i-vitrine"/></svg>Site web<b><span data-compte="30.1">30,1</span> %</b></li>
                  <li><svg><use href="#i-tel"/></svg>Appeler<b><span data-compte="29.5">29,5</span> %</b></li>
                  </ul>
              </div>
            </figure>
            <ul className="coeur__liste" data-revele-groupe="">
              <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-loupe"/></svg></span><div><h3 className="titre-3">97 % des internautes font des recherches locales : vos clients vous cherchent déjà</h3><p>Selon France Num (francenum.gouv.fr), <strong>97 % des internautes utilisent la recherche locale</strong>, et 78 % des recherches locales sur mobile aboutissent à un achat dans les heures qui suivent. Les requêtes « près de moi » ont été multipliées par 5 en 5 ans, selon Google France, cité par France Num.</p><p>La demande existe déjà, chaque jour, dans votre zone. Reste à savoir qui la capte : vous, ou le concurrent mieux positionné. Notre guide du <Link href="/conseils/seo/referencement-local/">référencement local</Link> détaille les leviers, et notre article sur le <Link href="/conseils/seo/seo-artisan/">SEO pour artisans</Link> donne des exemples métier par métier.</p></div></li>
              <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-repere"/></svg></span><div><h3 className="titre-3">Votre fiche Google Business Profile, la vitrine à soigner en premier</h3><p>La fiche Google Business Profile, c’est l’encart avec carte, horaires et avis qui s’affiche quand on cherche votre entreprise. Selon France Num, les trois actions les plus fréquentes sur une fiche sont l’itinéraire (40,4 % des clics), la visite du site web (30,1 %) et l’appel téléphonique (29,5 %).</p><p>Une fiche optimisée génère donc directement des visites et des appels. Pour la créer vous-même, suivez notre <Link href="/conseils/tutoriels/creer-fiche-google-business-profile/">tutoriel Google Business Profile</Link>.</p></div></li>
            </ul>
          </div>
          <aside className="retenir-trio" data-revele="">
            <div className="retenir-trio__chiffre" aria-hidden="true"><b>97 %</b><span>font des recherches locales</span></div>
            <div className="retenir-trio__texte">
              <p className="petit">À retenir</p>
              <p>97 % des internautes utilisent la recherche locale, et 78 % des recherches locales sur mobile débouchent sur un achat dans les heures qui suivent (France Num). Fiche Google + site optimisé + avis clients : le trio gagnant du commerce local.</p>
              <ul className="trio" aria-hidden="true"><li><svg className="ico"><use href="#i-repere"/></svg>Fiche Google</li><li><svg className="ico"><use href="#i-eclair"/></svg>Site optimisé</li><li><svg className="ico"><use href="#i-etoile"/></svg>Avis clients</li></ul>
            </div>
          </aside>
        </div>
        </div>
      </section>

      {/* 03 · MÉTHODE (clair) */}
      <section className="section bloc s-blanc" id="methode-seo-4-etapes" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">03</p>
            <h2 className="titre-2">Notre méthode SEO en 4 étapes, <em className="teinte">transparente et mesurable</em></h2>
            <p className="chapeau">Pas de formule secrète ni de rapport incompréhensible : 4 étapes, des livrables nommés, des chiffres que vous comprenez.</p>
          </header>
          <div className="bloc__corps prose">
            <ol className="frise frise--ico" data-revele-groupe="">
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-loupe"/></svg></span><div className="frise__corps">
                <h3 className="titre-3">1. Audit SEO gratuit : où en est votre site aujourd’hui ?</h3>
                <p>Trente minutes, gratuites, sans engagement : nous analysons votre site, votre fiche Google et vos concurrents, puis nous vous disons franchement ce qui bloque. Pour savoir ce que nous regardons, lisez notre article sur l’<Link href="/conseils/seo/audit-seo/">audit SEO</Link>.</p>
                <p>Envie d’un premier aperçu tout de suite ? Notre <Link href="/audit-seo/">audit SEO gratuit en ligne</Link> fait 20 mesures réelles faites sur votre site au moment du test, un score sur 100 et vos priorités, en une minute, sans inscription. On reprend ensuite ces résultats ensemble pendant les 30 minutes.</p>
                <aside className="relance relance--carte" aria-label="Une question ?" data-revele="">
              <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="44" height="44" alt="" loading="lazy" />
              <p><strong>Une question sur « 2. Corrections techniques : un site rapide que Google comprend » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
            </aside>
              </div></li>
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-eclair"/></svg></span><div className="frise__corps">
                <h3 className="titre-3">2. Corrections techniques : un site rapide que Google comprend</h3>
                <p>Vitesse, affichage mobile, sécurité, structure des pages : nous corrigeons tout ce qui empêche Google de bien lire votre site. S’il est trop ancien pour être sauvé, nous vous le disons honnêtement : notre offre de <Link href="/creation-site-internet/">création de site internet</Link> prend alors le relais.</p>
              </div></li>
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-doc"/></svg></span><div className="frise__corps">
                <h3 className="titre-3">3. Contenus qui répondent aux vraies questions de vos clients</h3>
                <p>Nous rédigeons des pages claires sur vos services et vos villes d’intervention, à partir des questions que vos clients posent réellement à Google. Pas de texte robotique bourré de mots-clés : du contenu utile, que Google récompense.</p>
              </div></li>
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-courbe"/></svg></span><div className="frise__corps">
                <h3 className="titre-3">4. Suivi mensuel : positions, appels, devis (des chiffres, pas du vent)</h3>
                <p>Chaque mois, un reporting lisible : vos positions sur Google, vos visiteurs, vos appels, vos demandes de devis. Et vous gardez l’accès à tous vos outils, dont la Google Search Console, l’outil gratuit de Google qui mesure votre visibilité : <strong>vous voyez tout</strong>, tout le temps.</p>
              </div></li>
            </ol>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>Audit gratuit de 30 minutes → stratégie sur-mesure → résultats mesurés chaque mois. À chaque étape, vous savez ce qui est fait, pourquoi, et ce que ça vous rapporte.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* APPEL AU MILIEU DE LA PAGE */}
      <section className="cta-bande" data-theme="clair" aria-label="Votre site, où en est-il ?">
        <div className="enveloppe">
          <div className="cta-bande__in" data-theme="sombre" data-revele="">
            <div>
              <p className="cta-bande__titre">Et votre site, <em className="degrade">où en est-il</em> ?</p>
              <p>En 30 minutes, nous analysons votre site et votre fiche Google. Vous repartez avec un diagnostic clair, que vous travailliez ensuite avec nous ou non.</p>
            </div>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit SEO gratuit</a>
          </div>
        </div>
      </section>

      {/* 04 · TARIFS (sombre) */}
      <section className="section bloc s-violet" id="tarifs-referencement" data-theme="sombre">
        <svg className="filigrane" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">04</p>
            <h2 className="titre-2">Combien coûte une agence SEO en Seine-et-Marne ? <em className="degrade-chaud">Nos tarifs en toute transparence</em></h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">C’est la première question des dirigeants, et celle que le marché évite. Repère : le coût moyen d’une prestation SEO se situe <strong>entre 500 € et 2 500 € par mois</strong>, selon seo.fr (consulté en juin 2026). L’écart dépend de la concurrence de votre secteur et du volume de travail mensuel.</p>
            <h3 className="titre-3" data-revele="">Ce que le marché pratique (et ce que nous faisons différemment)</h3>
      <div className="tableau" data-revele="">
      <table>
      <caption>Prestation SEO : pratiques courantes du marché vs engagements MKZ</caption>
      <thead><tr><th scope="col">Sujet</th><th scope="col">Pratique courante du marché</th><th scope="col" className="col-fort">Chez MKZ</th></tr></thead>
      <tbody>
      <tr><td data-label="Sujet">Prix</td><td data-label="Pratique courante du marché">Rarement affichés, devis opaques</td><td data-label="Chez MKZ" className="col-fort">Devis fixe écrit avant signature, détaillé ligne par ligne</td></tr>
      <tr><td data-label="Sujet">Engagement</td><td data-label="Pratique courante du marché">Contrats de 12 mois fréquents</td><td data-label="Chez MKZ" className="col-fort">Sans engagement de durée : vous restez parce que ça marche</td></tr>
      <tr><td data-label="Sujet">Livrables</td><td data-label="Pratique courante du marché">« Optimisation » floue</td><td data-label="Chez MKZ" className="col-fort">Liste mois par mois : corrections, contenus publiés, reporting</td></tr>
      <tr><td data-label="Sujet">Propriété</td><td data-label="Pratique courante du marché">Site et contenus parfois retenus par l’agence</td><td data-label="Chez MKZ" className="col-fort">Vous êtes propriétaire à 100 % : domaine, site, contenus, comptes</td></tr>
      </tbody></table></div>
            <h3 className="titre-3" data-revele="">Agence SEO ou consultant SEO indépendant : que choisir ?</h3>
            <p data-revele="">Un <strong>consultant SEO</strong> indépendant travaille seul ; une grosse agence aligne intermédiaires et frais de structure. MKZ combine le meilleur des deux : la rigueur de méthode d’une agence, l’interlocuteur unique d’un consultant. Vous parlez directement à Mickaël Leclerc, fondateur, ingénieur IT depuis 20 ans : celui qui fait le travail, pas un commercial.</p>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>Fourchette du marché : 500 à 2 500 € par mois (seo.fr, juin 2026). Chez MKZ : devis fixe écrit avant signature, livrables détaillés, sans engagement de durée. Le tarif exact est posé noir sur blanc à l’issue de l’audit gratuit.</p>
            </aside>
          </div>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Combien de temps avant les premiers résultats » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 05 · DÉLAIS (sombre) */}
      <section className="section bloc s-teinte" id="delais-premiers-resultats" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">05</p>
            <h2 className="titre-2">Combien de temps avant les <em className="degrade-rose">premiers résultats</em> ?</h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Comptez <strong>3 à 6 mois</strong> pour des progrès nets et durables, parfois moins sur des requêtes locales peu disputées, fréquentes en Seine-et-Marne. Les premiers signaux arrivent souvent avant : votre site s’affiche plus souvent dans Google, puis les clics et les appels suivent. Le reporting mensuel permet de vérifier la trajectoire.</p>
            <ul className="jalons" data-revele-groupe="">
              <li style={{ "--n": "0" } as CSSProperties}><strong>Mois 1 à 2</strong> : corrections techniques et fiche Google optimisée ; Google redécouvre votre site.</li>
              <li style={{ "--n": "1" } as CSSProperties}><strong>Mois 3 à 6</strong> : progression des positions sur vos requêtes « métier + ville », premiers appels et devis.</li>
              <li style={{ "--n": "2" } as CSSProperties}><strong>Après 6 mois</strong> : les positions acquises s’entretiennent et continuent de produire, sans budget publicitaire.</li>
            </ul>
            <aside className="retenir alerte" data-revele="">
              <svg className="retenir__chevron" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-alerte"/></svg>
              <p className="petit">Méfiez-vous des promesses</p>
              <p>Personne ne peut garantir la première position sur Google. Google recommande lui-même de se méfier des prestataires qui la promettent. Un professionnel honnête s’engage sur sa méthode et ses livrables, jamais sur une position précise.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 06 · GEO (clair) */}
      <section className="section bloc s-blanc" id="geo-chatgpt-ia" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">06</p>
            <h2 className="titre-2">Être trouvé aussi par ChatGPT et les IA : <em className="degrade-prune">le SEO version 2026 (GEO)</em></h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Vos clients ne cherchent plus seulement sur Google : ils demandent à <strong>ChatGPT</strong> ou Perplexity « un bon plombier vers Meaux » et reçoivent une réponse directe. Le <strong>GEO</strong> (Generative Engine Optimization) consiste à rendre votre entreprise visible et citable par ces intelligences artificielles, en complément du SEO classique.</p>
            <p data-revele="">Concrètement : des données structurées que les robots IA savent lire, des informations vérifiables (adresse, zone d’intervention, services, chiffres sourcés), des contenus formulés pour être repris tels quels. Presque personne ne le propose encore aux TPE du département ; nous l’appliquons déjà, à commencer par notre propre site.</p>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>Le GEO, c’est être recommandé par ChatGPT, Perplexity et les aperçus IA de Google. Chez MKZ, chaque site et chaque prestation SEO intègre cette dimension dès la conception.</p>
            </aside>
            <p className="suite" data-revele=""><Link className="bouton bouton--trait" href="/referencement-ia/">Découvrir le référencement IA</Link></p>
          </div>
        </div>
      </section>

      {/* 07 · L'AGENCE DU NORD 77 (bleu marine), avec le portrait de Mickaël */}
      <section className="section bloc s-marine" id="agence-seo-nord-77" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">07</p>
            <h2 className="titre-2">MKZ, <em className="degrade">l’agence SEO du nord Seine-et-Marne :</em> Dammartin-en-Goële, Meaux, Roissy</h2>
            <figure className="portrait">
              <img src="/images/charte/mickael-480.webp" width="480" height="480" loading="lazy" alt="Mickaël Leclerc, fondateur de MKZ" />
              <figcaption>Mickaël Leclerc, fondateur.</figcaption>
            </figure>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">La plupart des agences du département sont installées dans le sud (Fontainebleau, Melun) ou autour de Marne-la-Vallée. Le nord du 77 (Dammartin-en-Goële, Meaux, Roissy, Mitry-Mory, Claye-Souilly) restait sans agence SEO de proximité. C’est ici que MKZ est née.</p>
            <p data-revele="">Et la proximité compte : selon le Baromètre France Num (DGE), <strong>56 % des TPE et PME privilégient des prestataires numériques locaux</strong>, et 81 % préfèrent acheter auprès de prestataires français. Nous intervenons dans tout le 77 et en Île-de-France, sur place ou en visio. Notre page <Link href="/agence-web-77/">agence web en Seine-et-Marne</Link> présente l’ensemble de nos services.</p>
            <h3 className="titre-3" data-revele="">Vous restez propriétaire de votre site, de vos contenus et de vos comptes</h3>
            <p data-revele="">Nom de domaine, hébergement, textes, photos, fiche Google, statistiques : tout est ouvert à votre nom dès le premier jour. Si vous partez demain, vous partez avec tout, sans frais de sortie, sans rétention.</p>
            <aside className="relance relance--carte" aria-label="Une question ?" data-revele="">
              <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="44" height="44" alt="" loading="lazy" />
              <p><strong>Une question sur « Un ingénieur IT avec 20 ans d’expérience, pas un commercial » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
            </aside>
            <h3 className="titre-3" data-revele="">Un ingénieur IT avec 20 ans d’expérience, pas un commercial</h3>
            <p data-revele="">Derrière MKZ, un visage : Mickaël Leclerc, ingénieur informatique depuis 20 ans, installé à Dammartin-en-Goële. Il fait lui-même le travail, de l’audit au suivi mensuel, et vous parle en direct : pas de commercial, pas de ticket, pas de promesse en l’air.</p>
            <ul className="engagements" data-revele-groupe="">
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-bulle"/></svg><p><strong>On parle français</strong> : chaque terme technique est expliqué, chaque action justifiée.</p></li>
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-tel"/></svg><p><strong>Je décroche</strong> : vous appelez, c’est le fondateur qui répond, pas un standard.</p></li>
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-oeil"/></svg><p><strong>Vous voyez tout</strong> : accès permanent à vos outils et à vos chiffres, reporting mensuel lisible.</p></li>
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-libre"/></svg><p><strong>Vous restez libre</strong> : sans engagement de durée, propriétaire de tout, à 100 %.</p></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 08 · DEMANDEZ VOTRE AUDIT (clair, lavande) */}
      <section className="section bloc s-lavande" id="audit-seo-gratuit" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">08</p>
            <h2 className="titre-2">Demandez votre <em className="degrade">audit SEO gratuit</em></h2>
            <p className="chapeau">Trente minutes pour savoir où vous en êtes et ce que le référencement peut vous rapporter. Sans jargon, sans pression, sans engagement.</p>
          </header>
          <div className="bloc__corps prose">
            <ul className="infos" data-revele-groupe="">
              <li><svg className="ico" aria-hidden="true"><use href="#i-chrono"/></svg><span><strong>Audit SEO gratuit</strong> : 30 minutes, en visio ou par téléphone, diagnostic clair à la clé</span></li>
              <li><svg className="ico" aria-hidden="true"><use href="#i-repere"/></svg><span><strong>Localisation</strong> : Dammartin-en-Goële (Seine-et-Marne), interventions dans tout le 77 et en Île-de-France</span></li>
              <li><svg className="ico" aria-hidden="true"><use href="#i-tel"/></svg><span><strong>Contact</strong> : réservation en ligne ci-dessous, réponse personnelle du fondateur</span></li>
            </ul>
            <div className="cta-carte" data-theme="sombre" data-revele="">
              <p className="cta-bande__titre">Réservez votre <em className="degrade">audit SEO gratuit</em></p>
              <p>Choisissez un créneau de 30 minutes : nous analysons votre site et votre fiche Google en direct, et vous repartez avec un plan d’action.</p>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon créneau de 30 min</a>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTIONS FRÉQUENTES */}
      <section className="section section--serree faq-section" id="faq" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <h2 className="titre-2">Questions <em className="degrade-rose">fréquentes</em></h2>
          </header>
          <p className="faq__note">Votre question n’est pas dans la liste ci-dessous ? Posez-la de vive voix, on y répond en trente minutes. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <p className="centre"><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a></p>
          <div className="faq">
            {pillar.faq.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* APPEL FINAL */}
      <section className="appel" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe appel__in">
          <div className="appel__texte">
            <h2 className="titre-2">Et si on regardait votre <em className="degrade">visibilité Google</em> ?</h2>
            <p className="chapeau">Audit gratuit de 30 minutes : où vous en êtes, ce que font vos concurrents, et les actions qui rapporteraient le plus, expliqué sans jargon.</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit SEO gratuit</a>
            </div>
            <p className="appel__direct"><img className="appel__avatar" src="/images/charte/mickael-160.webp" width="40" height="40" alt="" loading="lazy" /><span>Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</span></p>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
