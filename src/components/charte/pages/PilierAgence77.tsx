// Page /agence-web-77/ à la nouvelle charte (maquette codée du 20/10/2026).
// Le texte vit aussi dans src/content/pillars/agence-web-77.ts (JSON-LD FAQPage, llms-full.txt) :
// scripts/controler-charte.mjs refuse le build si une phrase du contenu n'est plus affichée ici.
// Écarts voulus : FAQ générée depuis le contenu (source unique du visible et du JSON-LD), fiche Google
// lue dans avis-google.ts, liens internes en next/link, Calendly en nofollow.
// Composant GÉNÉRÉ depuis la maquette (agence-web-77.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import pillar from "@/content/pillars/agence-web-77";
import { ficheGoogle } from "@/content/avis-google";
import "@/components/charte/metier.css";

export default function PilierAgence77() {
  return (
    <ChartePage chemin="/agence-web-77/" classes="page-metier page-local">
      {/* HERO · teinte pêche claire, propre à cette page ; visuel : la Seine-et-Marne et ses villes (décoratif) */}
      <section className="mhero v-bas" data-theme="clair">
        <div className="enveloppe mhero__in">
          <div className="mhero__texte">
            <nav className="ariane" aria-label="Fil d'Ariane" data-entree=""><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">Agence web en Seine-et-Marne (77)</span></nav>
            <p className="mhero__surtitre" data-entree=""><svg aria-hidden="true"><use href="#i-repere"/></svg>Agence web en Seine-et-Marne (77)</p>
            <h1 className="titre-1" data-entree="">Agence web en Seine-et-Marne (77) : <em className="degrade">site internet + SEO pour TPE</em></h1>
            <p className="mhero__intro" data-entree="">Création de sites internet et référencement local pour artisans, commerçants et TPE. Basés à Dammartin-en-Goële, nous intervenons dans tout le 77 : Meaux, Melun, Chelles, Roissy, Marne-la-Vallée. Vous êtes propriétaire de votre site à 100 %, et vous savez tout, noir sur blanc, avant de signer.</p>
            <div className="hero__actions" data-entree="">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
              <a className="mhero__tel" href="tel:0769093909">ou 07 69 09 39 09</a>
            </div>
            <a className="note-google" href={ficheGoogle.url} target="_blank" rel="noopener" data-entree=""><span className="etoile" aria-hidden="true">★</span> 5,0 sur Google · 5 avis</a>
          </div>

          <div className="mvisuel mvisuel--carte" aria-hidden="true">
            <div className="mcarte mplan" data-entree="">
              <p className="mcarte__titre">Seine-et-Marne (77) · zone d’intervention</p>
              <div className="mplan__fond">
                <svg viewBox="0 0 400 368" preserveAspectRatio="xMidYMid slice">
                  <path className="dept" d="M118 22L208 14L266 40L300 30L330 68L352 114L386 152L378 210L358 248L370 290L330 326L280 356L210 362L150 346L120 310L96 274L72 238L54 192L62 146L42 108L72 66Z"/>
                  <path className="riviere" d="M-10 168C60 156 92 186 140 172S220 116 262 124S340 96 410 66"/>
                  <path className="riviere" d="M30 300C90 290 122 316 170 322S262 346 312 328S372 308 410 318"/>
                  <path className="route" d="M-10 196C120 190 260 206 410 186"/>
                  <path className="route" d="M60-10C82 50 104 84 140 104"/>
                  <path className="route" d="M96 240C178 258 262 292 410 290"/>
                  <path className="route-fine" d="M74 40C84 110 72 190 92 270S120 340 128 380"/>
                </svg>
                <span className="epingle"></span>
                <span className="mplan__ville mplan__base" style={{ left: "38%", top: "27%" } as CSSProperties}>Dammartin-en-Goële</span>
                <span className="mplan__ville" style={{ left: "15%", top: "11%" } as CSSProperties}>Roissy</span>
                <span className="mplan__ville" style={{ left: "70%", top: "36%" } as CSSProperties}>Meaux</span>
                <span className="mplan__ville" style={{ left: "15%", top: "51%" } as CSSProperties}>Chelles</span>
                <span className="mplan__ville" style={{ left: "44%", top: "58%" } as CSSProperties}>Marne-la-Vallée</span>
                <span className="mplan__ville" style={{ left: "81%", top: "68%" } as CSSProperties}>Provins</span>
                <span className="mplan__ville" style={{ left: "24%", top: "78%" } as CSSProperties}>Melun</span>
                <span className="mplan__ville" style={{ left: "50%", top: "90%" } as CSSProperties}>Fontainebleau</span>
              </div>
            </div>
            <p className="mpastille mv-haut" data-entree=""><svg><use href="#i-maison"/></svg>Sur place ou en visio</p>
            <div className="mcarte mobjectif" data-entree=""><span className="mobjectif__ico"><svg><use href="#i-cle"/></svg></span><p><strong>Propriétaire à 100 %</strong><small>Domaine, code, contenus</small></p></div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION ET SOMMAIRE (sombre) */}
      <section className="section s-teinte apres-v intro" data-theme="sombre">
        <div className="enveloppe intro__grille">
          <div className="intro__texte prose" data-revele="">
            <p className="petit intro__label">En bref</p>
            <p className="intro__chapeau">Vous cherchez une <strong>agence web dans le 77</strong> pour créer votre site internet ou, enfin, apparaître sur Google ? MKZ est une agence de <strong>création de sites internet</strong> et de <strong>référencement local (SEO)</strong> basée à Dammartin-en-Goële, au nord de la Seine-et-Marne. Nous accompagnons les artisans, commerçants et TPE de tout le département : Meaux, Melun, Chelles, Roissy, Marne-la-Vallée. Avec un engagement simple : un site dont vous êtes <strong>propriétaire à 100 %</strong>, des conditions écrites avant de signer, et des résultats mesurés chaque mois.</p>
            <p>Derrière MKZ, il y a Mickaël Leclerc, ingénieur informatique fort de plus de 20 ans d’expérience en grandes entreprises. Concrètement, vous parlez directement à la personne qui construit votre site. Pas de standard téléphonique, pas de jargon, pas de mauvaise surprise.</p>
            <ul className="intro__points" aria-label="Points clés"><li><svg className="ico" aria-hidden="true"><use href="#i-repere"/></svg>Basée à Dammartin-en-Goële</li><li><svg className="ico" aria-hidden="true"><use href="#i-cle"/></svg>Propriétaire à 100 %</li><li><svg className="ico" aria-hidden="true"><use href="#i-doc"/></svg>Conditions écrites avant de signer</li></ul>
          </div>
          <nav className="sommaire-carte" aria-labelledby="sommaire" data-revele="">
            <p className="petit" id="sommaire">Sommaire</p>
            <ol>
              <li><a href="#pourquoi-un-site-internet-dans-le-77">Pourquoi votre entreprise du 77 ne peut plus se passer d’un site internet</a></li>
              <li><a href="#creation-site-internet-et-seo-local">Ce que MKZ fait pour vous : création de site et référencement local</a></li>
              <li><a href="#combien-coute-un-site-internet-dans-le-77">Combien coûte un site internet dans le 77 ? Notre réponse sans détour</a></li>
              <li><a href="#proprietaire-de-votre-site-vraiment">Propriétaire de votre site, vraiment : la différence avec la location</a></li>
              <li><a href="#notre-methode-en-5-etapes">Notre méthode en 5 étapes, expliquée sans jargon</a></li>
              <li><a href="#agence-web-proximite-dammartin-nord-77">Une agence web de proximité, basée à Dammartin-en-Goële (nord 77)</a></li>
              <li><a href="#choisir-son-agence-web-77-6-questions">Comment choisir votre agence web en Seine-et-Marne : 6 questions à poser</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </nav>
        </div>
      </section>

      {/* 01 · POURQUOI UN SITE (clair) */}
      <section className="section bloc s-blanc" id="pourquoi-un-site-internet-dans-le-77" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">01</p>
            <h2 className="titre-2">Pourquoi votre entreprise du 77 <em className="degrade">ne peut plus se passer d’un site internet</em></h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Commençons par les faits. <strong>65 % des TPE-PME françaises disposent d’un site internet</strong> présentant leur activité, et même 81 % des PME, selon le Baromètre France Num 2025 (DGE/CREDOC, septembre 2025). Autrement dit : la majorité de vos concurrents est déjà en ligne.</p>
            <p data-revele="">La bonne nouvelle, c’est que tout le monde n’a pas encore pris le train. Dans le bâtiment, seules <strong>53,4 % des entreprises ont un site web</strong>, contre 64,6 % tous secteurs confondus (exploitation du Baromètre France Num 2025 publiée sur data.gouv.fr, mai 2026). Si vous êtes plombier à Meaux ou électricien à Mitry-Mory, il y a une vraie place à prendre, maintenant.</p>
            {/* Les deux taux du paragraphe précédent, en barres (décoratif) */}
            <div className="comparatif" aria-hidden="true" data-revele="">
              <div><span>Bâtiment</span><i style={{ "--v": ".534" } as CSSProperties}></i><b>53,4 %</b></div>
              <div><span>Tous secteurs</span><i style={{ "--v": ".646" } as CSSProperties}></i><b>64,6 %</b></div>
            </div>
            <ul className="chiffres" data-revele-groupe="">
              <li><b className="chiffres__nb" aria-hidden="true">51 %</b><p>51 % des TPE-PME déclarent qu’au moins 5 % de leurs clients proviennent d’internet (Baromètre France Num 2025, septembre 2025).</p></li>
              <li><b className="chiffres__nb" aria-hidden="true">78 %</b><p>78 % des dirigeants de TPE-PME estiment que le numérique apporte des bénéfices réels à leur entreprise (Baromètre France Num 2025).</p></li>
              <li><b className="chiffres__nb" aria-hidden="true">25 %</b><p>Une TPE-PME sur quatre (25 %) utilise déjà une solution d’intelligence artificielle, deux fois plus qu’en 2024 (Baromètre France Num 2025).</p></li>
            </ul>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>En Seine-et-Marne comme ailleurs, vos clients vous cherchent d’abord sur Google. Un site professionnel bien référencé n’est plus un luxe : c’est votre première vitrine, ouverte 24 h/24.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 · CE QUE MKZ FAIT (sombre, pleine largeur) : même principe que IA 03, photo collante et liste à filets */}
      <section className="section bloc bloc--large s-violet" id="creation-site-internet-et-seo-local" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">02</p>
            <h2 className="titre-2">Ce que MKZ fait pour vous : <em className="degrade-rose">création de site et référencement local</em></h2>
            <p className="chapeau">Deux métiers, une seule mission : que vos futurs clients vous trouvent et vous choisissent. Voici comment nous nous y prenons, sans découper la prestation en options incompréhensibles. Deux guides gratuits pour commencer seul : <Link className="lien" href="/conseils/seo/comment-apparaitre-sur-google/">comment apparaître sur Google</Link> et <Link className="lien" href="/conseils/seo/avis-google/">obtenir des avis Google</Link>.</p>
          </header>
          <div className="bloc__corps prose">
            <div className="coeur">
              <figure className="coeur__photo" data-revele="">
                <img src="/images/charte/photos/femme-sourit-regardant-telephone-880x1100.webp" srcSet="/images/charte/photos/femme-sourit-regardant-telephone-600x750.webp 600w, /images/charte/photos/femme-sourit-regardant-telephone-880x1100.webp 880w" sizes="(max-width: 899px) 100vw, 40vw" width="880" height="1100" loading="lazy" alt="Une femme sourit en regardant son téléphone" />
                <div className="mcarte mgoogle coeur__google" aria-hidden="true">
                  <p className="mcarte__titre">Recherche locale</p>
                  <div className="mgoogle__recherche"><span className="mgoogle__g">G</span>électricien Dammartin-en-Goële</div>
                  <ul className="mgoogle__res">
                    <li className="mgoogle__vous"><em>1</em><strong>votre-site.fr</strong><small><i>★</i> 5,0 · Ouvert</small></li>
                    <li><b></b><span></span></li>
                  </ul>
                </div>
              </figure>
              <ul className="coeur__liste" data-revele-groupe="">
                <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-vitrine"/></svg></span><div><h3 className="titre-3">Création de site internet en Seine-et-Marne (vitrine, devis en ligne, e-commerce)</h3><p>Un <strong>site vitrine</strong> est un site de quelques pages qui présente votre métier, vos réalisations et vos coordonnées : c’est le format idéal pour la plupart des artisans et commerçants. Selon vos besoins, nous y ajoutons demande de devis en ligne, prise de rendez-vous ou boutique e-commerce. Chaque projet de <Link href="/creation-site-internet/">création de site internet</Link> inclut le design sur-mesure, l’adaptation mobile et des textes pensés pour Google. Et la vitesse n’est pas une option : nous contrôlons les Core Web Vitals de chaque site avant de le publier.</p></div></li>
                <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-loupe"/></svg></span><div><h3 className="titre-3">Référencement local (SEO) : être trouvé par les clients de votre ville</h3><p>Le <strong>SEO</strong> (référencement naturel) regroupe tout ce qui fait remonter votre site dans les résultats Google, sans payer de publicité. Pour une TPE du 77, le levier le plus rentable est le <Link href="/conseils/seo/referencement-local/">référencement local</Link> : sortir en tête quand un habitant tape votre métier et votre ville. Notre <Link href="/referencement-seo/">agence SEO en Seine-et-Marne</Link> couvre les mots-clés, la technique, le contenu et votre <strong>fiche Google Business Profile</strong>, la fiche de votre entreprise qui s’affiche sur Google Maps. Ce que nous ne ferons pas : vous promettre un chiffre avant d’avoir regardé votre site. Vous aurez les vôtres, chaque mois, dans votre Search Console : votre <strong>trafic organique</strong> (les visites venues de Google, hors publicité), vos positions, vos demandes.</p></div></li>
                <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-cle"/></svg></span><div><h3 className="titre-3">Maintenance, autonomie et formation : votre site reste le vôtre</h3><p>Une fois le site en ligne, nous restons là : mises à jour, sauvegardes, sécurité. Mais nous vous formons aussi à modifier vous-même vos textes et vos photos. Cette transparence va jusqu’à publier des tutoriels gratuits, comme notre guide pour <Link href="/conseils/tutoriels/creer-fiche-google-business-profile/">créer votre fiche Google Business Profile</Link>. Notre conviction : un client autonome est un client qui reste par choix, pas par dépendance.</p></div></li>
              </ul>
            </div>
            <aside className="relance relance--carte" aria-label="Une question ?" data-revele="">
              <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="44" height="44" alt="" loading="lazy" />
              <p><strong>Une question sur « Référencement local (SEO) : être trouvé par les clients de votre ville » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
            </aside>
            <aside className="concret" aria-label="MKZ, concrètement" data-revele="">
              <ul className="engagements" data-revele-groupe="">
                <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-tel"/></svg><p>Un seul interlocuteur : Mickaël, qui construit votre site et décroche quand vous appelez</p></li>
                <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-etiquette"/></svg><p>Des prix publics, la même grille pour tout le monde : un site vitrine de 5 à 8 pages, textes inclus, coûte 1 490 € HT</p></li>
                <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-libre"/></svg><p>Vous restez propriétaire à 100 % de votre site : nom de domaine, code, contenus</p></li>
                <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-etoile"/></svg><p>Cinq avis Google, 5,0 sur 5, affichés tels qu’ils sont écrits</p></li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 03 · COMBIEN ÇA COÛTE (clair) */}
      <section className="section bloc s-blanc" id="combien-coute-un-site-internet-dans-le-77" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">03</p>
            <h2 className="titre-2">Combien coûte un site internet dans le 77 ? <em className="degrade">Notre réponse sans détour</em></h2>
            {/* Le prix public du paragraphe, mis en avant (décoratif) */}
            <div className="prix-carte" aria-hidden="true">
              <p className="prix-carte__type">Site vitrine · 5 à 8 pages</p>
              <p className="prix-carte__prix">1 490 € <small>HT</small></p>
              <p className="prix-carte__inclus"><svg><use href="#i-coche"/></svg>Textes et référencement inclus</p>
            </div>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Disons-le franchement : aucune des agences web du 77 que nous avons analysées en première page de Google n’affiche le moindre tarif ni délai (relevé MKZ, juin 2026). Chez MKZ, la <Link href="/tarifs/">grille de prix est publique</Link> : un site vitrine de 5 à 8 pages, textes et référencement inclus, coûte 1 490 € HT ; une boutique en ligne ou une refonte se chiffrent après le diagnostic, parce qu’un site de 5 pages pour un plombier et une boutique n’ont pas le même prix. Dans tous les cas, nous nous engageons sur une <strong>transparence totale avant signature</strong>.</p>
      <div className="tableau" data-revele="">
      <table>
      <caption>Transparence MKZ : ce que vous savez avant de signer</caption>
      <thead><tr><th scope="col">Votre question</th><th scope="col" className="col-fort">Notre engagement</th></tr></thead>
      <tbody>
      <tr><td data-label="Votre question">Combien ça coûte ?</td><td data-label="Notre engagement" className="col-fort">Un devis ferme et détaillé après l’audit gratuit de 30 minutes. Le prix n’augmente pas en cours de route.</td></tr>
      <tr><td data-label="Votre question">Combien de temps ?</td><td data-label="Notre engagement" className="col-fort">Un délai écrit dans le devis, planifié avec vous.</td></tr>
      <tr><td data-label="Votre question">Qu’est-ce qui est inclus ?</td><td data-label="Notre engagement" className="col-fort">Tout est listé ligne par ligne : design, textes, mise en ligne, formation.</td></tr>
      <tr><td data-label="Votre question">Et si je veux partir ?</td><td data-label="Notre engagement" className="col-fort">Vous partez avec tout : domaine, site, contenus. Coût de sortie : 0 €.</td></tr>
      <tr><td data-label="Votre question">Des frais cachés ?</td><td data-label="Notre engagement" className="col-fort">Aucun. Hébergement et maintenance annoncés à l’avance, sans surprise.</td></tr>
      </tbody></table></div>
            <p data-revele="">Pour vous faire une idée des fourchettes du marché, poste par poste, consultez notre guide <Link href="/conseils/creation-site-internet/combien-coute-un-site-internet/">combien coûte un site internet</Link>. Et un repère pour mesurer la valeur du référencement : sur Google Ads, le clic publicitaire sur « agence web seine et marne » coûte jusqu’à 7,45 € (données DataForSEO, mai 2026). Sur « agence web meaux », il grimpe à 11,88 €. Chaque visite gratuite gagnée grâce au SEO, c’est autant de budget publicitaire économisé.</p>
            <aside className="retenir retenir--fort retenir--action" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">Un prix ferme, sans engagement</p>
              <p>30 minutes au téléphone ou autour d’un café : on analyse votre situation, on identifie les actions prioritaires, et vous repartez avec un devis ferme, que vous signiez ou non.</p>
              <div className="retenir__action"><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a></div>
            </aside>
          </div>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Propriétaire de votre site, vraiment : la différence avec la location » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 04 · PROPRIÉTAIRE OU LOCATAIRE (sombre) */}
      <section className="section bloc s-teinte" id="proprietaire-de-votre-site-vraiment" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">04</p>
            <h2 className="titre-2">Propriétaire de votre site, vraiment : <em className="degrade">la différence avec la location</em></h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">La <strong>location de site</strong> (ou site « en abonnement ») consiste à payer chaque mois un prestataire qui reste propriétaire de votre site. Le jour où vous arrêtez de payer, le site disparaît, et souvent le <strong>nom de domaine</strong> (votre adresse en .fr ou .com) et les textes avec. Ce modèle, très répandu auprès des artisans de Seine-et-Marne, crée une dépendance que nous refusons.</p>
            <div className="tableau" data-revele="">
              <table>
                <caption>Location de site vs site dont vous êtes propriétaire</caption>
                <thead><tr><th scope="col"><span className="sr-only">Critère</span></th><th scope="col">Site en location</th><th scope="col" className="col-fort">Site MKZ (propriété)</th></tr></thead>
                <tbody>
                  <tr><td>Si vous arrêtez de payer</td><td data-label="Site en location">Le site est coupé, vous repartez de zéro</td><td data-label="Site MKZ (propriété)" className="col-fort">Le site reste à vous, en ligne</td></tr>
                  <tr><td>Nom de domaine</td><td data-label="Site en location">Souvent déposé au nom du prestataire</td><td data-label="Site MKZ (propriété)" className="col-fort">Déposé à votre nom, toujours</td></tr>
                  <tr><td>Textes, photos, logo</td><td data-label="Site en location">Réutilisation incertaine</td><td data-label="Site MKZ (propriété)" className="col-fort">Ils vous appartiennent à 100 %</td></tr>
                  <tr><td>Changer de prestataire</td><td data-label="Site en location">Très difficile : tout est verrouillé</td><td data-label="Site MKZ (propriété)" className="col-fort">Libre : vous partez avec tout</td></tr>
                </tbody>
              </table>
            </div>
            <p data-revele="">Votre site est déjà en abonnement et vous vous sentez coincé ? Pas de panique : notre guide sur la <Link href="/conseils/creation-site-internet/refonte-site-internet/">refonte de site internet</Link> explique comment reprendre la main, étape par étape.</p>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">La question qui révèle tout</p>
              <p>Avant de signer où que ce soit, posez cette question : « Si j’arrête de payer, qu’est-ce que je garde ? ». Si la réponse n’est pas « tout », vous savez à quoi vous en tenir.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 05 · MÉTHODE EN 5 ÉTAPES (clair) */}
      <section className="section bloc s-blanc" id="notre-methode-en-5-etapes" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">05</p>
            <h2 className="titre-2">Notre méthode en 5 étapes, <em className="degrade">expliquée sans jargon</em></h2>
            <p className="chapeau">Pas de tunnel opaque de six mois : un processus court, où vous validez chaque étape importante.</p>
          </header>
          <div className="bloc__corps prose">
            <ol className="frise frise--ico" data-revele-groupe="">
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-bulle"/></svg></span><div className="frise__corps"><p><strong>On se rencontre</strong> : chez vous, à Dammartin-en-Goële ou en visio : un audit gratuit de 30 minutes, où l’on parle de votre métier et de vos clients, pas de technique.</p></div></li>
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-crayon"/></svg></span><div className="frise__corps"><p><strong>Vous validez la maquette</strong> : vous voyez à quoi ressemblera votre site avant que la première ligne de code ne soit écrite. Rien ne part en production sans votre accord.</p></div></li>
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-code"/></svg></span><div className="frise__corps"><p><strong>Nous construisons le site</strong> : design, textes optimisés pour Google, photos mises en valeur. Vous suivez l’avancement et restez maître des contenus.</p></div></li>
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-lien"/></svg></span><div className="frise__corps"><p><strong>Mise en ligne et raccordement à Google</strong> : nom de domaine déposé à votre nom, site déclaré aux outils Google, fiche Google Business Profile reliée.</p></div></li>
              <li><span className="frise__rond"><svg className="ico" aria-hidden="true"><use href="#i-courbe"/></svg></span><div className="frise__corps"><p><strong>Vous êtes formé, puis suivi</strong> : une session de formation pour être autonome, et un reporting mensuel clair : visites, positions Google, demandes reçues.</p></div></li>
            </ol>
          </div>
        </div>
      </section>

      {/* 06 · PROXIMITÉ (sombre) : la zone d'intervention dans la colonne de titre, les trois secteurs et les avis Google à droite */}
      <section className="section bloc s-noir" id="agence-web-proximite-dammartin-nord-77" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">06</p>
            <h2 className="titre-2">Une agence web de proximité, <em className="degrade-rose">basée à Dammartin-en-Goële (nord 77)</em></h2>
            <aside className="zone-carte">
              <span className="zone-carte__ico" aria-hidden="true"><svg><use href="#i-repere"/></svg></span>
              <p className="petit">Notre zone d’intervention</p>
              <p>MKZ, agence web basée à Dammartin-en-Goële (77230), intervient sur place dans toute la Seine-et-Marne (Meaux, Roissy, Melun, Chelles, Marne-la-Vallée) et accompagne à distance des clients dans toute l’Île-de-France et en France.</p>
            </aside>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">La proximité n’est pas un argument marketing : <strong>56 % des TPE-PME privilégient des prestataires locaux</strong> proches géographiquement pour leurs achats de services (Baromètre France Num 2023, DGE). Pouvoir se rencontrer, montrer son atelier ou sa boutique, régler un souci de vive voix : ça change tout. MKZ est installée à Dammartin-en-Goële et se déplace dans toute la Seine-et-Marne.</p>
            <blockquote className="citation citation--grande" data-revele=""><p>« Je recommande Mickaël à 100 %. Profil solide et expérimenté, avec une bonne communication et une vraie proactivité. Avec Mickaël, c’est simple et fluide 😉 Par exemple, l’audit SEO que je lui ai commandé était clair et directement actionnable. »</p><footer>Yoann Florentin, avis Google (septembre 2026, 5 étoiles sur 5)</footer></blockquote>
            <aside className="relance relance--carte" aria-label="Une question ?" data-revele="">
              <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="44" height="44" alt="" loading="lazy" />
              <p><strong>Une question sur « Meaux, Roissy et le nord Seine-et-Marne » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
            </aside>
            <div className="secteurs">
              <div className="secteur" data-revele="">
                <h3 className="titre-3"><span className="secteur__repere" aria-hidden="true">Nord</span>Meaux, Roissy et le nord Seine-et-Marne</h3>
                <p>C’est notre terrain quotidien : Meaux, Roissy, Mitry-Mory, Claye-Souilly, Othis, Saint-Pathus, Dammartin-en-Goële. Une zone dynamique, portée par l’aéroport et l’artisanat, et étonnamment délaissée par les agences web du département, presque toutes installées au sud.</p>
                <blockquote className="citation"><p>« Je voulais utiliser l’IA pour mon site web sans savoir par où commencer. Mickaël m’a montré comment m’en servir concrètement, pour les textes, les pages et le référencement, en m’expliquant à chaque fois pourquoi. Aujourd’hui je fais une bonne partie des mises à jour moi-même. »</p><footer>Jordan carrere, avis Google (août 2026, 5 étoiles sur 5)</footer></blockquote>
              </div>
              <div className="secteur" data-revele="">
                <h3 className="titre-3"><span className="secteur__repere" aria-hidden="true">Sud</span>Melun, Sénart et le sud du département</h3>
                <p>Nous intervenons aussi à Melun, Sénart, Fontainebleau et Provins. Le sud du 77 compte davantage d’agences web, mais peu parlent le langage des artisans et des indépendants. Nous, si.</p>
                <blockquote className="citation"><p>« Je recommande Mickaël, c’est un profil rare : un vrai bagage technique de 20 ans en systèmes et cybersécurité, au service du référencement naturel. Crawl, cocon sémantique, Core Web Vitals, il maîtrise chaque sujet en profondeur. Un discours clair, des analyses utiles, des livrables concrets et orientés résultats. Les retours arrivent systématiquement. »</p><footer>Sarah El Gharbi, avis Google (juillet 2026, 5 étoiles sur 5)</footer></blockquote>
              </div>
              <div className="secteur" data-revele="">
                <h3 className="titre-3"><span className="secteur__repere" aria-hidden="true">Ouest</span>Chelles, Lagny, Marne-la-Vallée et l’ouest du 77</h3>
                <p>Chelles, Lagny-sur-Marne, Torcy, Bussy-Saint-Georges, Serris : l’ouest du département vit au rythme de l’est parisien, avec une concurrence locale forte où la visibilité Google fait la différence. Et au-delà du 77, nous accompagnons des clients dans toute l’Île-de-France et partout en France, à distance, avec la même méthode.</p>
                <blockquote className="citation"><p>« Presta rapide et efficace c’est tout ce que je demandais et je l’ai eu. »</p><footer>Saïd Irgues, avis Google (juillet 2026, 5 étoiles sur 5)</footer></blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · 6 QUESTIONS À POSER (clair) */}
      <section className="section bloc s-blanc" id="choisir-son-agence-web-77-6-questions" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">07</p>
            <h2 className="titre-2">Comment choisir votre agence web en Seine-et-Marne : <em className="degrade">6 questions à poser</em></h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Que vous nous choisissiez ou non, posez ces six questions avant de signer avec une <strong>agence web</strong>. Elles font le tri en cinq minutes.</p>
            <ol className="questions" data-revele-groupe="">
              <li><p><strong>Qui possède le nom de domaine ?</strong> S’il n’est pas déposé à votre nom, votre adresse web ne vous appartient pas.</p></li>
              <li><p><strong>Qui possède le site et son code ?</strong> Location déguisée ou propriété pleine : exigez une réponse écrite.</p></li>
              <li><p><strong>Combien coûte la sortie ?</strong> Frais de transfert, récupération des fichiers : tout doit être à zéro, ou annoncé d’avance.</p></li>
              <li><p><strong>Qui écrit les textes ?</strong> Des textes copiés-collés ou générés sans relecture plombent votre référencement.</p></li>
              <li><p><strong>Quels résultats mesurables ?</strong> Exigez un reporting régulier : visites, positions Google, demandes de contact.</p></li>
              <li><p><strong>Qui s’occupe de la maintenance, et pour combien ?</strong> Mises à jour et sauvegardes doivent être chiffrées noir sur blanc.</p></li>
            </ol>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">Notre conseil</p>
              <p>Gardez cette liste pour vos rendez-vous. Une agence sérieuse répond aux six questions sans détour : c’est même à ça qu’on la reconnaît.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* PARLONS DE VOTRE PROJET : la bande d'appel des pages métier */}
      <section className="cta-bande" data-theme="clair" aria-label="Parlons de votre projet">
        <div className="enveloppe">
          <div className="cta-bande__in" data-theme="sombre" data-revele="">
            <div>
              <p className="cta-bande__titre">Parlons de <em className="degrade">votre projet</em></p>
              <p>Audit gratuit de 30 minutes, réponse à toute demande sous 24 h, et un devis ferme avant tout engagement. Appelez le 07 69 09 39 09 ou choisissez un créneau en ligne : on se déplace partout en Seine-et-Marne.</p>
            </div>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit (30 min)</a>
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
            <h2 className="titre-2">Une agence web <em className="degrade">près de chez vous, dans le 77</em></h2>
            <p className="chapeau">Basés à Dammartin-en-Goële, nous nous déplaçons partout en Seine-et-Marne. Audit gratuit de 30 minutes, par téléphone ou autour d’un café.</p>
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
