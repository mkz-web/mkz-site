// Page /creation-site-internet/ à la nouvelle charte (maquette codée du 20/10/2026).
// Le texte vit aussi dans src/content/pillars/creation-site-internet.ts (JSON-LD FAQPage, llms-full.txt) :
// scripts/controler-charte.mjs refuse le build si une phrase du contenu n'est plus affichée ici.
// Écarts voulus : FAQ générée depuis le contenu (source unique du visible et du JSON-LD), fiche Google
// lue dans avis-google.ts, liens internes en next/link, Calendly en nofollow.
// Composant GÉNÉRÉ depuis la maquette (creation-site-internet.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import pillar from "@/content/pillars/creation-site-internet";
import { ficheGoogle } from "@/content/avis-google";
import "@/components/charte/metier.css";

export default function PilierCreation() {
  return (
    <ChartePage chemin="/creation-site-internet/" classes="page-metier page-nuit">
      {/* HERO · teinte nuit, comme la rangée « Création de site internet » de l'accueil */}
      <section className="mhero v-bas" data-theme="sombre">
        <div className="enveloppe mhero__in">
          <div className="mhero__texte">
            <nav className="ariane" aria-label="Fil d'Ariane" data-entree=""><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">Création de sites internet pour artisans &amp; TPE en Seine-et-Marne</span></nav>
            <p className="mhero__surtitre" data-entree=""><svg aria-hidden="true"><use href="#i-vitrine"/></svg>Création de sites internet pour artisans &amp; TPE en Seine-et-Marne</p>
            <h1 className="titre-1" data-entree="">Création de site internet artisan : <em className="degrade">un site qui ramène des devis</em></h1>
            <p className="mhero__intro" data-entree="">Un site rapide, visible sur Google et dont vous êtes propriétaire à 100 %. Conçu pour une seule chose : faire sonner votre téléphone. Audit gratuit de 30 minutes, devis clair, site en ligne sous 4 semaines.</p>
            <div className="hero__actions" data-entree="">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
              <a className="mhero__tel" href="tel:0769093909">ou 07 69 09 39 09</a>
            </div>
            <a className="note-google" href={ficheGoogle.url} target="_blank" rel="noopener" data-entree=""><span className="etoile" aria-hidden="true">★</span> 5,0 sur Google · 5 avis</a>
          </div>

          {/* Visuel : un ordinateur portable qui affiche un site d'artisan, et des cartes d'interface (décoratifs) */}
          <div className="mvisuel mvisuel--ordi" aria-hidden="true">
            <div className="mordi" data-entree="">
              <div className="mordi__ecran">
                <div className="msite">
                  <div className="msite__nav"><b><i></i>Votre entreprise</b><span>Prestations</span><span>Réalisations</span><span>Avis</span><em>Devis gratuit</em></div>
                  <div className="msite__une">
                    <div>
                      <p className="msite__sur">Rénovation · Meaux et alentours</p>
                      <p className="msite__titre">Votre artisan, près de chez vous</p>
                      <span className="msite__l"></span><span className="msite__l msite__l--court"></span>
                      <span className="msite__btn">Demander un devis</span>
                    </div>
                    <div className="msite__photo"><img src="/images/charte/photos/image-440x352.webp" width="440" height="352" alt="" fetchPriority="high" /></div>
                  </div>
                  <div className="msite__cartes"><span><i></i>Salle de bain</span><span><i></i>Chauffe-eau</span><span><i></i>Dépannage</span></div>
                  <p className="msite__avis"><b>★★★★★</b>Avis Google</p>
                </div>
              </div>
              <div className="mordi__base"></div>
            </div>
            <p className="mpastille mv-haut" data-entree=""><svg><use href="#i-coche"/></svg>Site en ligne</p>
            <p className="mpastille mv-gauche" data-entree=""><svg><use href="#i-tel"/></svg>Demande de devis</p>
            <div className="mcarte mproprio" data-entree="">
              <p className="mproprio__tete"><svg><use href="#i-cle"/></svg>Propriétaire à 100 %</p>
              <ul className="mpuces"><li>Domaine</li><li>Contenus</li><li>Photos</li></ul>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION ET SOMMAIRE */}
      <section className="section s-blanc apres-v intro" data-theme="clair">
        <div className="enveloppe intro__grille">
          <div className="intro__texte" data-revele="">
            <p className="petit intro__label">En bref</p>
            <p className="intro__chapeau">Un <strong>site internet pour artisan</strong>, c’est une vitrine ouverte 24 h/24 qui transforme les recherches Google de vos voisins en demandes de devis. Concrètement : un client tape « plombier Meaux », il vous trouve, il vous appelle. Chez MKZ, la création de votre site internet d’artisan prend 4 semaines environ, et le site vous appartient à 100 % : nom de domaine, contenus, photos.</p>
            <p>Sur cette page, vous trouverez ce qu’un patron de TPE doit savoir avant de signer : les types de sites, les vrais prix du marché et les aides disponibles. Avec un comparatif des coûts sur 3 ans, et la question que trop peu de prestataires acceptent de poser : à qui appartient votre site ?</p>
            <ul className="intro__points" aria-label="Points clés"><li><svg className="ico" aria-hidden="true"><use href="#i-horloge"/></svg>En ligne sous 4 semaines</li><li><svg className="ico" aria-hidden="true"><use href="#i-cle"/></svg>Propriétaire à 100 %</li><li><svg className="ico" aria-hidden="true"><use href="#i-etiquette"/></svg>1 490 € HT, textes inclus</li></ul>
          </div>
          <nav className="sommaire-carte" aria-labelledby="sommaire" data-revele="">
            <p className="petit" id="sommaire">Sommaire</p>
            <ol>
              <li><a href="#pourquoi-site-internet-artisan-2026">Pourquoi un site internet est indispensable pour un artisan en 2026</a></li>
              <li><a href="#quel-type-de-site-choisir">Quel type de site internet choisir pour un artisan ?</a></li>
              <li><a href="#combien-coute-site-internet-artisan">Combien coûte la création d’un site internet pour artisan ?</a></li>
              <li><a href="#proprietaire-de-votre-site">Êtes-vous propriétaire de votre site ? La question que personne ne pose</a></li>
              <li><a href="#methode-creation-site-4-semaines">Notre méthode de création de site internet pour artisan : en ligne sous 4 semaines</a></li>
              <li><a href="#contenu-site-artisan-devis">Ce que doit contenir le site d’un artisan pour générer des devis</a></li>
              <li><a href="#artisan-seine-et-marne">Artisan en Seine-et-Marne ou en Île-de-France ? Travaillons en direct</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </nav>
        </div>
      </section>

      {/* 01 · POURQUOI (sombre) */}
      <section className="section bloc s-teinte" id="pourquoi-site-internet-artisan-2026" data-theme="sombre">
        <svg className="filigrane" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">01</p>
            <h2 className="titre-2">Pourquoi un site internet est <em className="degrade">indispensable</em> pour un artisan en 2026</h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Un site internet professionnel est devenu l’équipement de base d’une entreprise artisanale. 65 % des TPE-PME françaises possèdent un site présentant leur activité, selon le Baromètre France Num 2025 (DGE/CREDOC, septembre 2025). Mais dans le bâtiment, elles ne sont que 53,4 % (exploitation du Baromètre publiée sur data.gouv.fr, mai 2026). Autrement dit : près d’un artisan sur deux n’a pas de site. Votre concurrent direct, probablement non plus. Et pour être trouvé avant même d’avoir un site, il y a la fiche : <Link href="/conseils/seo/comment-apparaitre-sur-google/">comment apparaître sur Google gratuitement</Link>.</p>
            <h3 className="titre-3" data-revele="">Ce que disent les chiffres officiels</h3>
            <ul className="stats" data-revele-groupe="">
              <li className="stat"><strong><span className="stat__num"><span data-compte="48">48</span> %</span> des TPE-PME</strong> citent l’acquisition de nouveaux clients comme premier bénéfice de leur site, loin devant l’image de modernité (39 %), selon le Baromètre France Num 2025.</li>
              <li className="stat"><strong><span className="stat__num"><span data-compte="51">51</span> %</span> des TPE-PME</strong> obtiennent au moins 5 % de leurs clients via internet, soit 8 points de plus qu’en 2022 (Baromètre France Num 2025).</li>
              <li className="stat stat--conclusion"><svg className="ico" aria-hidden="true"><use href="#i-coche"/></svg>Un site n’est donc pas une dépense d’image : c’est un outil qui ramène des chantiers.</li>
            </ul>
            <h3 className="titre-3" data-revele="">Votre fiche Google ne suffit plus, et elle ne vous appartient pas</h3>
            <p data-revele="">En 2025, pour la première fois, les réseaux sociaux (66 %) devancent le site internet (65 %) comme outil de visibilité des TPE-PME (Baromètre France Num 2025). Faut-il en conclure qu’une page Facebook et une fiche d’établissement Google suffisent ? Non. Ces canaux sont utiles, mais ils ne vous appartiennent pas : Google ou Meta peuvent changer les règles, suspendre votre fiche ou noyer votre page du jour au lendemain.</p>
            <p data-revele="">Le site internet reste le seul canal dont votre entreprise est propriétaire. C’est votre fonds de commerce numérique : il travaille pour vous, pas pour une plateforme.</p>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>Seules 53,4 % des TPE-PME du bâtiment ont un site internet (Baromètre France Num 2025). Créer le vôtre maintenant, c’est prendre une longueur d’avance locale que vos concurrents mettront des années à rattraper.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 · QUEL TYPE DE SITE (clair) */}
      <section className="section bloc s-blanc" id="quel-type-de-site-choisir" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">02</p>
            <h2 className="titre-2">Quel <em className="teinte">type de site internet</em> choisir pour un artisan ?</h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Le <strong>site vitrine</strong> est un site qui présente votre entreprise, vos métiers et vos coordonnées, sans vente en ligne. C’est le bon format pour la grande majorité des artisans : son objectif n’est pas de vendre en ligne, mais de déclencher des appels et des demandes de devis.</p>
      <div className="tableau" data-revele="">
      <table>
      <caption>Quel site pour quel besoin ?</caption>
      <thead><tr><th scope="col">Type de site</th><th scope="col">Ce que c’est</th><th scope="col">Pour qui ?</th></tr></thead>
      <tbody>
      <tr><td data-label="Type de site">Site vitrine une page</td><td data-label="Ce que c’est">Toute votre activité sur une seule page : métiers, zone d’intervention, avis, contact</td><td data-label="Pour qui ?">Démarrer vite, avec un budget serré</td></tr>
      <tr className="fort"><td data-label="Type de site">Site vitrine multi-pages</td><td data-label="Ce que c’est">Une page par métier et par commune d’intervention</td><td data-label="Pour qui ?">Être trouvé sur Google dans toute votre zone : notre recommandation</td></tr>
      <tr><td data-label="Type de site">Boutique en ligne</td><td data-label="Ce que c’est">Vente de produits avec paiement en ligne</td><td data-label="Pour qui ?">Rarement prioritaire pour un artisan, sauf vente au détail</td></tr>
      </tbody></table></div>
            <p data-revele=""><strong>Notre recommandation dans la plupart des cas : le multi-pages.</strong> Chaque page métier (« dépannage chauffe-eau », « mise aux normes tableau électrique ») et chaque page commune (« électricien Dammartin-en-Goële ») est une porte d’entrée supplémentaire sur Google.</p>
            <p data-revele="">Pour comprendre ce que contient exactement un site vitrine et combien de pages prévoir, lisez notre guide du <Link href="/conseils/creation-site-internet/site-vitrine/">site vitrine pour artisan</Link>.</p>
          </div>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Combien coûte la création d’un site internet pour artisan » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 03 · COMBIEN ÇA COÛTE (sombre) */}
      <section className="section bloc s-violet" id="combien-coute-site-internet-artisan" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">03</p>
            <h2 className="titre-2"><em className="degrade-chaud">Combien coûte</em> la création d’un site internet pour artisan ?</h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">La création d’un site internet pour artisan coûte de 290 € (site une page low-cost) à 2 000 € (site vitrine professionnel), selon les prix constatés sur Google en juin 2026. Les offres « sans frais de création » à 29 €/mois semblent imbattables… mais dépassent 1 000 € sur 3 ans, sans que vous possédiez quoi que ce soit.</p>
            <h3 className="titre-3" data-revele="">Abonnement, plateforme ou agence : le vrai coût sur 3 ans</h3>
      <div className="tableau" data-revele="">
      <table>
      <caption>Coût total sur 3 ans des principales formules (prix constatés sur le marché, juin 2026)</caption>
      <thead><tr><th scope="col">Formule</th><th scope="col">Coût sur 3 ans</th><th scope="col">Qui possède le site ?</th></tr></thead>
      <tbody>
      <tr><td data-label="Formule">Abonnement « tout compris » à 29 €/mois</td><td data-label="Coût sur 3 ans">1 044 €</td><td data-label="Qui possède le site ?">Le prestataire : vous louez. Si vous partez, vous ne gardez rien.</td></tr>
      <tr><td data-label="Formule">Plateforme à faire soi-même (Wix, Jimdo…)</td><td data-label="Coût sur 3 ans">Abonnement annuel + des dizaines d’heures de votre temps</td><td data-label="Qui possède le site ?">Vous, mais le site reste captif de la plateforme</td></tr>
      <tr><td data-label="Formule">Site une page low-cost</td><td data-label="Coût sur 3 ans">290 € + 120 €/an, soit environ 650 €</td><td data-label="Qui possède le site ?">À vérifier dans le contrat (domaine, contenus)</td></tr>
      <tr className="fort"><td data-label="Formule">Freelance ou agence locale (type MKZ)</td><td data-label="Coût sur 3 ans">1 500 à 2 000 € en moyenne (relevé WPMarmite, 2024)</td><td data-label="Qui possède le site ?">Vous, à 100 % : domaine, site, contenus, photos</td></tr>
      </tbody></table></div>
            <p data-revele="">Le détail poste par poste (domaine, hébergement, rédaction, maintenance) est dans notre article <Link href="/conseils/creation-site-internet/combien-coute-un-site-internet/">combien coûte un site internet</Link>.</p>
            <h3 className="titre-3" data-revele="">Les coûts cachés à vérifier avant de signer</h3>
            <ul className="cartes-ico" data-revele-groupe="">
              <li className="carte-ico"><svg className="ico" aria-hidden="true"><use href="#i-globe"/></svg><p>Le <strong>nom de domaine</strong> (votre adresse en .fr) : environ 10 à 15 € par an, aux tarifs publics constatés en 2026. Vérifiez surtout qu’il est déposé à VOTRE nom, pas à celui du prestataire.</p></li>
              <li className="carte-ico"><svg className="ico" aria-hidden="true"><use href="#i-serveur"/></svg><p>L’<strong>hébergement</strong> (le serveur qui stocke votre site) : parfois facturé à part, sans que ce soit dit clairement au départ.</p></li>
              <li className="carte-ico"><svg className="ico" aria-hidden="true"><use href="#i-bouclier"/></svg><p>La <strong>maintenance</strong> : mises à jour de sécurité et sauvegardes. Sans elle, un site se fait pirater ou vieillit mal.</p></li>
              <li className="carte-ico"><svg className="ico" aria-hidden="true"><use href="#i-crayon"/></svg><p>Les <strong>modifications</strong> : certains contrats facturent chaque changement de photo, de tarif ou d’horaire.</p></li>
            </ul>
            <h3 className="titre-3" data-revele="">Les aides pour financer votre site</h3>
            <p data-revele="">Le <strong>Chèque Numérique</strong> de la Région Île-de-France a remboursé 50 % des dépenses numériques des artisans et commerçants franciliens, jusqu’à 1 500 €. Le dispositif courait sur 2024-2025 : sa reconduction est à vérifier au moment de votre projet. Selon votre statut, le FAFCEA (le fonds de formation des artisans) ou votre OPCO (l’organisme qui finance la formation dans votre branche) peuvent aussi prendre en charge une partie du projet. Nous faisons le point sur vos droits pendant l’audit gratuit.</p>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>Ne comparez jamais les prix de création seuls : comparez le coût total sur 3 ans ET qui possède le site à la fin. Un abonnement à 29 €/mois coûte plus de 1 000 € en 3 ans, sans que le site vous appartienne.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 04 · PROPRIÉTAIRE (clair) */}
      <section className="section bloc s-blanc" id="proprietaire-de-votre-site" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">04</p>
            <h2 className="titre-2">Êtes-vous <em className="degrade">propriétaire de votre site</em> ? La question que personne ne pose</h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">C’est le piège n°1 des offres pas chères : avec un site en location, le jour où vous arrêtez de payer, tout disparaît. Le site, parfois le nom de domaine, et même les textes. Vous repartez de zéro, et votre ancien prestataire garde les clés.</p>
            <p data-revele="">Chez MKZ, la règle est simple : <strong>vous êtes propriétaire à 100 %</strong>. Le nom de domaine est déposé à votre nom, les contenus et les photos sont à vous, et vous pouvez partir quand vous voulez en emportant tout. Nous préférons vous garder par nos résultats, pas par un contrat.</p>
            <p className="coches__titre" data-revele="">4 questions à poser avant de signer un devis de site internet</p>
            <ol className="coches" data-revele-groupe="">
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg>Le nom de domaine est-il déposé à MON nom, et pas à celui de l’agence ?</li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg>Si j’arrête de payer, est-ce que je garde le site, les textes et les photos ?</li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg>Ai-je tous les accès : hébergement, fiche Google, statistiques ?</li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg>Le contrat prévoit-il des frais de « récupération » si je change de prestataire ?</li>
            </ol>
          </div>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Notre méthode de création de site internet pour artisan : en ligne sous 4 semaines » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 05 · MÉTHODE (noir) */}
      <section className="section bloc s-noir" id="methode-creation-site-4-semaines" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">05</p>
            <h2 className="titre-2">Notre méthode de création de site internet pour artisan : <em className="degrade">en ligne sous 4 semaines</em></h2>
            <p className="chapeau">La création d’un site internet pour artisan prend environ 4 semaines chez MKZ : un audit gratuit de 30 minutes, une maquette validée ensemble, la rédaction de vos pages métiers, puis la mise en ligne avec connexion aux outils Google. Et vous restez propriétaire du site, du domaine et des contenus.</p>
          </header>
          <div className="bloc__corps prose">
            <ol className="frise" data-revele-groupe="">
              <li><div className="frise__corps"><strong>Audit gratuit de 30 minutes</strong> : vos métiers, vos communes d’intervention, vos concurrents, vos objectifs. Sans engagement.</div></li>
              <li><div className="frise__corps"><strong>Maquette et plan du site</strong> : vous validez l’apparence et la liste des pages avant tout développement. Pas de surprise.</div></li>
              <li><div className="frise__corps"><strong>Rédaction et photos</strong> : nous écrivons vos pages métiers avec vos mots, et intégrons vos photos de chantiers.</div></li>
              <li><div className="frise__corps"><strong>Mise en ligne</strong> : un site rapide, contrôlé aux Core Web Vitals avant d’être publié. Nous le connectons à votre fiche d’établissement et à Google Search Console (l’outil gratuit qui mesure votre visibilité sur Google).</div></li>
              <li><div className="frise__corps"><strong>Suivi et résultats</strong> : reporting mensuel clair (visites, appels, demandes de devis). Vous voyez tout.</div></li>
            </ol>
            <p className="frise__pied" data-revele="">Les avis sur MKZ sont ceux de Google, cinq sur cinq, affichés tels qu’ils sont écrits sur la <Link href="/">page d’accueil</Link>. Les prix sont publics, sur la <Link href="/tarifs/">page tarifs</Link> : un site vitrine de 5 à 8 pages, textes inclus, coûte 1 490 € HT. Et pour savoir où en est votre site aujourd’hui, l’<Link href="/audit-seo/">audit gratuit en ligne</Link> le mesure en une minute. Le reste, on le regarde ensemble pendant les 30 minutes.</p>
          </div>
        </div>
      </section>

      {/* APPEL AU MILIEU DE LA PAGE */}
      <section className="cta-bande" data-theme="clair" aria-label="Regarder votre projet ensemble">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe">
          <div className="cta-bande__in" data-theme="sombre" data-revele="">
            <div>
              <p className="cta-bande__titre">Et si on regardait votre projet <em className="degrade">ensemble</em> ?</p>
              <p>30 minutes au téléphone : on étudie votre zone, vos concurrents et ce qu’un site peut vraiment vous rapporter. Gratuit, sans engagement, sans jargon.</p>
            </div>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
          </div>
        </div>
      </section>

      {/* 06 · CE QUE DOIT CONTENIR LE SITE (sombre) : rangée photo et texte, puis les quatre ingrédients */}
      <section className="bloc-contenu s-teinte" id="contenu-site-artisan-devis" data-theme="sombre">
        <div className="rangee rangee--violet" data-theme="sombre">
          <div className="rangee__image"><img src="/images/charte/photos/ordinateur-portable-ouvert-etabli-dans-atelier-1200x920.webp" width="1200" height="920" loading="lazy" alt="Un ordinateur portable ouvert sur un établi, dans un atelier" /></div>
          <div className="rangee__corps" data-revele="">
            <p className="bloc__num" aria-hidden="true">06</p>
            <h2 className="titre-2">Ce que doit contenir le site d’un artisan pour <em className="degrade">générer des devis</em></h2>
            <p>Un beau site qui ne fait jamais sonner le téléphone ne sert à rien. Pour transformer les visites en demandes de devis, quatre ingrédients font la différence. C’est l’étape 3 de notre méthode pour <Link className="lien" href="/conseils/seo/trouver-des-chantiers/">trouver des chantiers sans dépendre des plateformes</Link>.</p>
          </div>
        </div>
        <div className="section enveloppe prose ingredients">
          {/* Grille bento : cases 7/5 puis 5/7 ; visuels dessinés pour les avis et les communes (décoratifs) */}
          <ul className="bento" data-revele-groupe="">
            <li className="bento__case bento__case--large">
              <figure className="bento__visuel bento__visuel--photo"><img src="/images/charte/photos/plombier-repare-canalisation-sous-meuble-1200x540.webp" width="1200" height="540" loading="lazy" alt="Un plombier répare une canalisation sous un meuble" /><span className="bento__pages" aria-hidden="true"><i>Rénovation de salle de bain</i><i>Dépannage chauffe-eau</i><i>Ravalement de façade</i></span></figure>
              <div className="bento__texte">
                <div className="bento__tete"><span className="bento__ico" aria-hidden="true"><svg><use href="#i-photo"/></svg></span><h3 className="titre-3">Des pages métiers et de vraies photos de chantiers</h3></div>
                <p>Chaque prestation mérite sa page : « rénovation de salle de bain », « dépannage chauffe-eau », « ravalement de façade »… C’est exactement ce que vos clients tapent dans Google. Et rien ne rassure plus qu’un avant/après de VOS chantiers, pas des photos d’illustration vues sur dix autres sites.</p>
              </div>
            </li>
            <li className="bento__case">
              <div className="bento__visuel bento__visuel--clair" aria-hidden="true">
                <div className="v-avis">
                  <p className="v-avis__note">5,0 <i>★★★★★</i><small>Avis Google</small></p>
                  <div className="v-avis__carte"><span className="v-avis__pastille">C</span><span className="v-avis__corps"><i>★★★★★</i><b></b><b></b></span></div>
                  <div className="v-avis__carte v-avis__carte--decale"><span className="v-avis__pastille">S</span><span className="v-avis__corps"><i>★★★★★</i><b></b><b></b></span></div>
                  <span className="v-avis__bouton">Demander un devis</span>
                </div>
              </div>
              <div className="bento__texte">
                <div className="bento__tete"><span className="bento__ico" aria-hidden="true"><svg><use href="#i-etoile"/></svg></span><h3 className="titre-3">Vos avis Google intégrés au site</h3></div>
                <p>Vos avis clients sont votre meilleur argument commercial. Affichés directement sur le site, ils rassurent le visiteur au moment décisif : juste avant qu’il remplisse la demande de devis ou compose votre numéro.</p>
              </div>
            </li>
            <li className="bento__case">
              <div className="bento__visuel bento__visuel--clair" aria-hidden="true">
                <div className="v-carte">
                  <svg viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice">
                    <path className="riviere" d="M-10 205C80 172 140 232 230 207S380 152 490 187"/>
                    <path className="route" d="M40-10C120 80 180 120 240 135S400 180 490 262"/>
                    <path className="route" d="M-10 95C110 112 300 90 490 58"/>
                    <path className="route-fine" d="M300-10C280 80 250 160 262 280"/>
                    <path className="route-fine" d="M118 280C160 200 190 160 240 135"/>
                    <circle className="zone" cx="240" cy="135" r="96"/>
                  </svg>
                  <span className="epingle"></span>
                  <span className="v-carte__commune" style={{ left: "27%", top: "17%" } as CSSProperties}>Dammartin-en-Goële</span>
                  <span className="v-carte__commune" style={{ left: "77%", top: "25%" } as CSSProperties}>Meaux</span>
                  <span className="v-carte__commune" style={{ left: "19%", top: "56%" } as CSSProperties}>Claye-Souilly</span>
                  <span className="v-carte__commune" style={{ left: "33%", top: "86%" } as CSSProperties}>Lagny-sur-Marne</span>
                  <span className="v-carte__commune" style={{ left: "74%", top: "77%" } as CSSProperties}>Coulommiers</span>
                </div>
              </div>
              <div className="bento__texte">
                <div className="bento__tete"><span className="bento__ico" aria-hidden="true"><svg><use href="#i-repere"/></svg></span><h3 className="titre-3">Un référencement local sur toutes vos communes d’intervention</h3></div>
                <p>Le <strong>référencement naturel</strong> (le fait d’apparaître dans les résultats Google sans payer de publicité) se travaille dès la construction du site. Concrètement : une page par commune stratégique, des textes qui répondent aux vraies questions de vos clients, une fiche Google reliée au site. C’est le cœur de notre offre de <Link href="/referencement-seo/">référencement SEO</Link>, et notre guide du <Link href="/conseils/seo/referencement-local/">référencement local</Link> explique la méthode pas à pas.</p>
              </div>
            </li>
            <li className="bento__case bento__case--large">
              <figure className="bento__visuel bento__visuel--photo"><img src="/images/charte/photos/telephone-affiche-assistant-intelligence-artificielle-pret-1200x540.webp" width="1200" height="540" loading="lazy" alt="Un téléphone affiche un assistant d'intelligence artificielle prêt à répondre" /><span className="bento__question" aria-hidden="true"><svg><use href="#i-etincelle"/></svg>Un bon carreleur près de Meaux ?</span></figure>
              <div className="bento__texte">
                <div className="bento__tete"><span className="bento__ico" aria-hidden="true"><svg><use href="#i-etincelle"/></svg></span><h3 className="titre-3">Être recommandé par ChatGPT et les IA : la visibilité de demain</h3></div>
                <p>26 % des TPE-PME utilisaient une solution d’intelligence artificielle en 2025, soit le double de 2024 (13 %), selon le Baromètre France Num 2025. Vos clients suivent le même chemin : ils demandent à ChatGPT « un bon carreleur près de Meaux ». Nos sites sont construits pour être compris et cités par ces moteurs de réponse, un critère que la plupart des prestataires ignorent encore.</p>
              </div>
            </li>
          </ul>
          <aside className="retenir retenir--fort retenir--centre" data-revele="">
            <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
            <p className="petit">À retenir</p>
            <p>Un site d’artisan qui génère des devis = des pages métiers, de vraies photos de chantiers, vos avis Google, un référencement local sur vos communes et une lisibilité par les IA. <strong>Tout le reste est décoratif.</strong></p>
          </aside>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Un référencement local sur toutes vos communes d’intervention » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 07 · EN SEINE-ET-MARNE (clair) */}
      <section className="section bloc s-blanc" id="artisan-seine-et-marne" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">07</p>
            <h2 className="titre-2">Artisan en Seine-et-Marne ou en Île-de-France ? <em className="teinte">Travaillons en direct</em></h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">MKZ est basée à Dammartin-en-Goële, au nord de la Seine-et-Marne. Plombier à Meaux, électricien du côté de Roissy, maçon dans le 77 ou ailleurs en Île-de-France : nous connaissons vos zones, vos clients et vos concurrents, et nous nous déplaçons. C’est tout l’intérêt d’une <Link href="/agence-web-77/">agence web en Seine-et-Marne</Link> : un interlocuteur unique, joignable, qui parle votre langue.</p>
            <p data-revele="">Vous avez déjà un site, mais il est lent, daté ou invisible sur Google ? Une <Link href="/conseils/creation-site-internet/refonte-site-internet/">refonte de site internet</Link> est souvent plus rapide (et plus rentable) qu’une création de zéro. On vous dit honnêtement ce qui mérite d’être gardé.</p>
            <div className="cta-carte" data-theme="sombre" data-revele="">
              <p className="cta-bande__titre">Votre site, vos clients, <em className="degrade">votre propriété</em></p>
              <p>Réservez votre audit gratuit de 30 minutes : nous chiffrons votre projet, vérifions vos aides régionales et vous repartez avec un plan clair, que vous signiez avec nous ou non.</p>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit (30 min)</a>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTIONS FRÉQUENTES : le dégradé violet-rose de l'accueil */}
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
            <h2 className="titre-2">Parlons de votre <em className="degrade">futur site</em></h2>
            <p className="chapeau">30 minutes au téléphone : on regarde votre projet, votre marché local et on vous donne un plan d’action concret, que vous travailliez avec nous ou non.</p>
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
