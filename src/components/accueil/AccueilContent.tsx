// Accueil MKZ à la nouvelle charte (maquette codée du 20/10/2026, V3 de l'accueil).
// Écarts voulus avec la maquette :
//   - liens internes relatifs (next/link), Calendly en nofollow, fiche Google lue dans avis-google.ts ;
//   - formulaire « Tester mon site » branché sur /audit-seo/?site= (GET natif, marche sans JavaScript) ;
//   - avis et FAQ générés depuis leurs modules (source unique du visible et du JSON-LD FAQPage) ;
//   - prix de l'accompagnement mis à la grille du 21/10/2026 (590 à 890 € HT, mesure IA comprise) ;
//   - ligne des villes écrite une seule fois (AccueilScripts pose la copie du défilement) ;
//   - image de repli de l'ordinateur en chargement différé (sinon React la précharge sans l'utiliser).
// Animations : AccueilScripts (GSAP servi par le site).
// Composant GÉNÉRÉ depuis la maquette (index.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import { homeFaqFr } from "@/content/home-faq";
import { avisGoogle, ficheGoogle } from "@/content/avis-google";
import AccueilScripts from "./AccueilScripts";
const NBSP = String.fromCharCode(160);

export default function AccueilContent() {
  return (
    <ChartePage chemin="/" scripts="aucun">
      {/* 1 · HERO : texte à gauche, animation à droite (création du site puis performance SEO), bas en V */}
      <section className="hero v-bas" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe hero__in">
          <div className="hero__texte">
            <p className="hero__surtitre" data-entree="">Création de site internet &amp; référencement · Seine-et-Marne (77)</p>
            <h1 className="titre-1" data-entree="">Un site internet qui fait <em className="degrade">sonner le téléphone</em>.</h1>
            <p className="hero__intro" data-entree="">Visible sur Google, cité par ChatGPT, et à vous. Je le crée, je le référence et je vous explique en français ce que je fais. Pour les artisans, commerçants et TPE d’Île-de-France qui veulent des clients, pas un joli site qui dort.</p>
            <div className="hero__actions" data-entree="">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">30 min avec Mickaël, gratuites</a>
              <Link className="bouton bouton--trait" href="/tarifs/">Voir les prix</Link>
            </div>
            <div className="hero__infos" data-entree="">
              <a className="note-google" href={ficheGoogle.url} target="_blank" rel="noopener"><span className="etoile" aria-hidden="true">★</span> 5,0 sur Google · 5 avis</a>
              <p>Dammartin-en-Goële (77) · lun-sam 9h-21h · <a href="tel:0769093909">07 69 09 39 09</a> (on décroche)</p>
              <p>Consultant SEO · Dammartin-en-Goële (77) · devis gratuit, réponse sous 24 h</p>
            </div>
          </div>

          {/* Animation décorative : un site se construit, puis il grimpe sur Google et le téléphone sonne */}
          <div className="anim" aria-hidden="true">
            <div className="anim__fond"></div>
            <div className="anim__fenetre">
              <div className="anim__barre"><i></i><i></i><i></i><span className="anim__url"><span className="anim__url-txt">votre-site.fr</span></span></div>
              <div className="anim__page">
                <div className="anim__menu"><b></b><span></span><span></span><span></span></div>
                <div className="anim__une">
                  <div className="anim__lignes"><span className="anim__l anim__l--1"></span><span className="anim__l anim__l--2"></span><span className="anim__l anim__l--3"></span><span className="anim__bouton"></span></div>
                  <div className="anim__visuel"></div>
                </div>
                <div className="anim__cartes"><span></span><span></span><span></span></div>
              </div>
            </div>
            <div className="anim__pastille anim__enligne"><svg className="anim__coche"><use href="#i-coche"/></svg>Site en ligne</div>
            <div className="anim__carte anim__optim">
              <p className="anim__titre">Optimisation</p>
              <ul className="anim__jauges">
                <li><span>Vitesse</span><i><b style={{ "--j": ".96" } as CSSProperties}></b></i></li>
                <li><span>Mobile</span><i><b style={{ "--j": "1" } as CSSProperties}></b></i></li>
                <li><span>Balises</span><i><b style={{ "--j": ".9" } as CSSProperties}></b></i></li>
              </ul>
            </div>
            <div className="anim__carte anim__google">
              <p className="anim__titre">Référencement</p>
              <div className="anim__recherche"><span className="anim__g">G</span><span className="anim__requete">dépannage plombier Meaux</span></div>
              <ul className="anim__resultats">
                <li className="anim__res anim__res--a"><b></b><span></span></li>
                <li className="anim__res anim__res--b"><b></b><span></span></li>
                <li className="anim__res anim__res--vous"><em>1</em><strong>votre-site.fr</strong><span>★ 5,0 · Ouvert</span></li>
              </ul>
            </div>
            <div className="anim__carte anim__courbe">
              <p className="anim__titre">Visites</p>
              <svg viewBox="0 0 200 80" className="anim__graph"><path className="anim__aire" d="M0 72 C30 70 45 64 70 58 S115 40 135 30 S175 10 200 6 L200 80 L0 80Z"/><path className="anim__trait" d="M0 72 C30 70 45 64 70 58 S115 40 135 30 S175 10 200 6"/></svg>
            </div>
            <div className="anim__pastille anim__appel"><svg className="anim__tel"><use href="#i-tel"/></svg>Appel entrant</div>
            <div className="anim__carte anim__score">
              <svg viewBox="0 0 60 60" className="anim__anneau"><circle cx="30" cy="30" r="24"/><circle className="anim__anneau-plein" cx="30" cy="30" r="24"/></svg>
              <p><strong>89</strong><span>/100</span><small>Score SEO + IA</small></p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · L'ORDINATEUR pleine largeur, façon Apple : ouverture, puis ordi 1 → ordi 3, liens dans l'écran */}
      <section className="ordi apres-v" id="outils" data-theme="sombre" aria-labelledby="titre-outil">
        <div className="ordi__scene">
        <header className="enveloppe ordi__entete">
          <p className="surtitre">L’outil gratuit</p>
          <h2 className="titre-2" id="titre-outil">Un état des lieux de votre site, <em className="degrade">gratuit</em>, en une minute.</h2>
          <p className="chapeau">Le même outil que j’utilise pour mes clients, en libre-service et sans inscription. Il mesure, il n’estime pas.</p>
        </header>
          <div className="ordi__cadre">
            <div className="ordi__photo">
              {/* Séquence de 48 images tirée de la vidéo (canvas piloté par le scroll) ; la dernière image sert de repli */}
              <img className="ordi__fin" loading="lazy" src="/images/accueil/ouverture-640/f48.webp" srcSet="/images/accueil/ouverture-640/f48.webp 640w, /images/accueil/ouverture-1080/f48.webp 1080w" sizes="100vw" width="1080" height="1080" alt="Un ordinateur portable ouvert dans le noir, son écran sombre éclaire le clavier en bleu et violet" />
              <canvas className="ordi__canvas" width="1080" height="1080" aria-hidden="true"></canvas>
              <div className="ordi__halo" aria-hidden="true"></div>
            </div>
            <div className="ordi__ecran">
              <div className="ecran-ui">
                <label className="ecran-ui__titre" htmlFor="adresse-site">Où en est votre site ? Une minute, sans inscription.</label>
                <form className="audit" action="/audit-seo/" method="get">
                  <input id="adresse-site" name="site" type="text" inputMode="url" autoComplete="url" placeholder="votre-site.fr" />
                  <button className="bouton bouton--plein" type="submit">Tester mon site</button>
                </form>
                <div className="ecran-ui__liens">
                  <a className="bouton bouton--verre" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">30 min avec Mickaël, gratuites</a>
                  <Link className="lien" href="/outils/">Tous les outils gratuits</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ordi__suite enveloppe">
          <article className="carte-verre">
            <p className="petit">Outil gratuit · une minute</p>
            <h3 className="titre-3">L'audit SEO + IA de votre site</h3>
            <p>Entrez votre adresse : des mesures réelles sur votre site (HTTPS, vraie page 404, balises, robots des IA, llms.txt, données structurées, autorité), un score sur 100 et vos priorités. Le rapport complet, c'est moi qui vous l'envoie, sous 24 h.</p>
            <Link className="bouton bouton--plein" href="/audit-seo/">Tester mon site maintenant</Link>
          </article>
          <article className="carte-verre scan" aria-label="Résultat d'un scan réel : mkz-consulting.fr, score 89 sur 100, technique 35/35, lisibilité par les IA 35/35, autorité et positions Google 19/30">
            <p className="petit">Résultat d'un scan réel</p>
            <p className="scan__site">mkz-consulting.fr</p>
            <p className="scan__score"><span data-compte="89">89</span><span className="scan__sur">/100</span></p>
            <ul className="scan__barres">
              <li><span>Technique</span><span>35/35</span><span className="scan__barre"><span className="scan__rempli" style={{ "--v": "1" } as CSSProperties}></span></span></li>
              <li><span>Lisibilité par les IA</span><span>35/35</span><span className="scan__barre"><span className="scan__rempli" style={{ "--v": "1" } as CSSProperties}></span></span></li>
              <li><span>Autorité et positions Google</span><span>19/30</span><span className="scan__barre"><span className="scan__rempli" style={{ "--v": ".633" } as CSSProperties}></span></span></li>
            </ul>
          </article>
        </div>
      </section>

      {/* 3 · Villes : une ligne, en petit */}
      <section className="villes" data-theme="sombre" aria-label="Villes desservies">
        <div className="defile" aria-hidden="true">
          <p className="defile__ligne">Meaux <i>&gt;</i> Melun <i>&gt;</i> Chelles <i>&gt;</i> Dammartin-en-Goële <i>&gt;</i> Roissy <i>&gt;</i> Marne-la-Vallée <i>&gt;</i> Senlis <i>&gt;</i> Provins <i>&gt;</i> Fontainebleau <i>&gt;</i> Serris <i>&gt;</i> Mitry-Mory <i>&gt;</i> Claye-Souilly <i>&gt;</i> Paris <i>&gt;</i> Val-de-Marne (94) <i>&gt;</i> Seine-Saint-Denis (93) <i>&gt;</i> Val-d’Oise (95) <i>&gt;</i> Hauts-de-Seine (92) <i>&gt;</i> Yvelines (78) <i>&gt;</i> Essonne (91) <i>&gt;</i></p>
          {/* Une seule ligne dans le HTML (règle : aucun bloc de texte répété) ; AccueilScripts pose la copie du défilement continu */}
        </div>
        <p className="sr-only">Meaux, Melun, Chelles, Dammartin-en-Goële, Roissy, Marne-la-Vallée, Senlis, Provins, Fontainebleau, Serris, Mitry-Mory, Claye-Souilly.</p>
      </section>

      {/* 4 · CHIFFRES */}
      <section className="section s-blanc chiffres-section" data-theme="clair" aria-label="Chiffres clés">
        <div className="enveloppe">
          <dl className="chiffres">
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="chiffre__anneau" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><circle className="chiffre__anneau-plein" cx="24" cy="24" r="19" style={{ "--p": ".93" } as CSSProperties}/></svg></span>
              <dt>des Français lisent les avis en ligne avant de choisir un prestataire</dt><dd><span data-compte="93">93</span> %</dd>
            </div>
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="ico ico--chaud"><use href="#i-etiquette"/></svg></span>
              <dt>le site vitrine complet, textes et référencement inclus. En agence : 3 000 à 8 000 €</dt><dd><span data-compte="1490">1 490</span> € HT</dd>
            </div>
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="ico ico--chaud"><use href="#i-horloge"/></svg></span>
              <dt>pour recevoir un devis fixe, écrit ligne par ligne</dt><dd><span data-compte="24">24</span> h</dd>
            </div>
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="ico ico--chaud"><use href="#i-chrono"/></svg></span>
              <dt>pour mesurer votre site, sans inscription, score sur 100</dt><dd>1 min</dd>
            </div>
          </dl>
          <p className="sources">Sources : Ifop pour Guest Suite, janvier 2026, 1 003 répondants · grille et relevés de marché 2026 sur la <Link href="/tarifs/">page tarifs</Link> · outil d’audit de ce site.</p>
          <nav className="sommaire" aria-label="Sur cette page">
            <span>Sur cette page</span>
            <a href="#pieges">Les pièges</a><a href="#outils">L’outil gratuit</a><a href="#services">Les prix</a><a href="#methode">La méthode</a><a href="#pour-qui">Pour qui</a><a href="#questions">Vos questions</a>
          </nav>
        </div>
      </section>

      {/* 5 · LES PIÈGES : version compacte */}
      <section className="section section--serree s-nuit" id="pieges" data-theme="sombre">
        <div className="halo-sombre halo-sombre--pieges" aria-hidden="true"></div>
        <svg className="filigrane" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
        <div className="enveloppe pieges">
          <header className="pieges__entete">
            <p className="surtitre">Ce qu’on ne vous dit pas</p>
            <h2 className="titre-2">Trois pièges que <em className="teinte">personne ne vous explique</em> avant de signer.</h2>
            <p className="chapeau">Ce n’est pas de la mauvaise foi, c’est le modèle des agences. Voici ce que je fais autrement.</p>
          </header>
          <ul className="pieges__liste">
            <li className="piege"><svg className="ico" aria-hidden="true"><use href="#i-vitrine"/></svg><div><h3 className="titre-3">On vous vend un site. Pas des clients.</h3><p>Un site sans référencement, c'est comme une vitrine dans une rue sans passage : belle, mais personne ne passe devant. Chez moi, le référencement est inclus dans chaque site livré.</p></div></li>
            <li className="piege"><svg className="ico" aria-hidden="true"><use href="#i-rapport"/></svg><div><h3 className="titre-3">Vous payez, et le rapport est incompréhensible.</h3><p>Des courbes, des positions, du jargon. La seule question qui compte : est-ce que ça ramène des clients ? Chaque mois, je vous réponds en français, avec les demandes reçues, pas avec un PDF de quarante pages.</p></div></li>
            <li className="piege"><svg className="ico" aria-hidden="true"><use href="#i-cle"/></svg><div><h3 className="titre-3">Le site ne vous appartient pas.</h3><p>Abonnement, hébergement captif, accès que vous n'avez jamais eus : le jour où vous partez, vous repartez de zéro. Chez MKZ, le nom de domaine, le code et les contenus sont à vous. Coût de sortie : 0 €.</p></div></li>
          </ul>
        </div>
      </section>

      {/* 6 · SERVICES : le cœur du site, rangées pleine largeur en quinconce (image / texte sur fond de couleur) */}
      <section className="metiers" id="services" data-theme="clair">
        <header className="entete enveloppe">
          <p className="surtitre">Ce que je fais</p>
          <h2 className="titre-2">Trois métiers, une mission : <em className="degrade">que votre téléphone sonne</em>.</h2>
          <p className="chapeau">Pas d’usine à sites, pas d’options incompréhensibles. Je construis votre vitrine, je la rends visible sur Google et citée par les IA auprès des clients de votre zone. Les trois se renforcent.</p>
        </header>

        <div className="metiers__rangees">
          <article className="metier metier--nuit" data-theme="sombre">
            <div className="metier__image"><img src="/images/charte/photos/bureau-graphiste-site-internet-affiche-ecran-1200x920.webp" width="1200" height="920" loading="lazy" alt="Un bureau de graphiste, un site internet affiché sur l'écran et sur l'ordinateur portable" /></div>
            <div className="metier__corps">
              <p className="petit">Service 01</p>
              <h3 className="metier__titre">Création de <em className="degrade">site internet</em></h3>
              <p>Un site qui vous ressemble, rapide, lisible sur téléphone, et déjà référencé le jour de sa mise en ligne. Vous donnez vos photos et vos tarifs, je fais le reste.</p>
              <div className="tarif">
                <div className="tarif__ligne"><span className="tarif__montant">1 490 € HT</span><span className="tarif__libelle">Site vitrine 5 à 8 pages, textes inclus</span></div>
              </div>
              <p className="puces">design sur mesure · textes rédigés · responsive · vitesse · référencement inclus</p>
              <Link className="bouton bouton--plein" href="/creation-site-internet/">Découvrir la création de site</Link>
            </div>
          </article>

          <article className="metier metier--clair metier--inverse">
            <div className="metier__image"><img src="/images/charte/photos/telephone-affiche-recherche-google-devant-logo-1200x920.webp" width="1200" height="920" loading="lazy" alt="Un téléphone affiche la recherche Google devant le logo Google" /></div>
            <div className="metier__corps">
              <p className="petit">Service 02</p>
              <h3 className="metier__titre"><em className="teinte">SEO</em> &amp; référencement Google</h3>
              <p>Être trouvé par les gens qui cherchent ce que vous faites, dans votre ville. Mots-clés en langage client, technique propre, contenus utiles, liens choisis à la main : du référencement qui dure, pas un feu de paille.</p>
              <div className="tarif">
                <div className="tarif__ligne"><span className="tarif__montant">490 €</span><span className="tarif__libelle">Audit complet</span></div>
                <div className="tarif__ligne"><span className="tarif__montant">590 à 890 € HT</span><span className="tarif__libelle">accompagnement par mois, mesure IA comprise</span></div>
              </div>
              <p className="puces">audit SEO · référencement local · contenus · netlinking · point mensuel</p>
              <Link className="bouton bouton--plein" href="/referencement-seo/">Découvrir le référencement SEO</Link>
            </div>
          </article>

          <article className="metier metier--violet" data-theme="sombre">
            <div className="metier__image"><img src="/images/charte/photos/telephone-affiche-assistant-intelligence-artificielle-pret-1200x920.webp" width="1200" height="920" loading="lazy" alt="Un téléphone affiche un assistant d'intelligence artificielle prêt à répondre" /></div>
            <div className="metier__corps">
              <p className="petit">Service 03</p>
              <h3 className="metier__titre">Référencement <em className="degrade-chaud">IA (GEO)</em></h3>
              <p>Être cité par ChatGPT, Perplexity et Gemini quand un client leur demande un artisan ou un commerce près de chez lui. Robots autorisés, faits citables, données structurées, citations mesurées avant et après.</p>
              <div className="tarif">
                <div className="tarif__ligne"><span className="tarif__montant">Test gratuit</span><span className="tarif__libelle">pour commencer</span></div>
                <div className="tarif__ligne"><span className="tarif__montant">790 € HT</span><span className="tarif__libelle">audit</span></div>
                <div className="tarif__ligne"><span className="tarif__montant">dès 290 € HT</span><span className="tarif__libelle">suivi par mois</span></div>
              </div>
              <p className="puces">robots IA · llms.txt · JSON-LD · contenu citable · part de voix mesurée</p>
              <Link className="bouton bouton--plein" href="/referencement-ia/">Découvrir le référencement IA</Link>
            </div>
          </article>
        </div>

        <div className="enveloppe metiers__pied">
          <div className="exergue">
            <svg className="exergue__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron" fill="url(#g-exergue)"/></svg>
            <p className="exergue__texte"><strong>Le prix est le prix.</strong> La grille est publique, en euros HT, et le montant du devis est celui de la facture.</p>
            <Link className="bouton bouton--trait" href="/tarifs/">Voir tous les tarifs</Link>
          </div>
          <p className="note-centre">Et parce qu’un client autonome est un client serein, mes méthodes sont documentées en accès libre dans les <Link className="lien" href="/conseils/">conseils et tutoriels</Link>.</p>
        </div>
      </section>

      {/* 7 · MÉTHODE (noir), bas en V vers « Pour qui » */}
      <section className="section s-noir v-bas" id="methode" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <p className="surtitre">La méthode</p>
            <h2 className="titre-2">Trois étapes, <em className="degrade">zéro jargon</em>.</h2>
            <p className="chapeau">Du premier appel au point mensuel, vous savez toujours où on en est et ce que ça coûte.</p>
          </header>
          <ol className="etapes">
            <li className="etape"><span className="etape__num" aria-hidden="true">01</span><h3 className="titre-3">30 minutes, gratuites</h3><p>On regarde votre site, votre marché et vos concurrents ensemble. Vous repartez avec les trois choses à faire en premier, que vous signiez ou non.</p></li>
            <li className="etape"><span className="etape__num" aria-hidden="true">02</span><h3 className="titre-3">Un plan, un prix, une date</h3><p>Un devis fixe, écrit. Le prix posé est le prix payé, et vous savez quand c'est livré. Pas d'option cachée qui arrive à la deuxième facture.</p></li>
            <li className="etape"><span className="etape__num" aria-hidden="true">03</span><h3 className="titre-3">Chaque mois, un point en français</h3><p>Ce qui a été fait, ce que ça a donné en demandes reçues, et la suite. Si ça ne bouge pas, on change de plan. C'est la réalité du référencement : on mesure, on corrige.</p></li>
          </ol>
          <p className="centre"><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mes 30 minutes</a></p>
        </div>
      </section>

      {/* 8 · POUR QUI (gris), photos harmonisées par un filtre */}
      <section className="section s-gris apres-v" id="pour-qui" data-theme="clair">
        <div className="enveloppe">
          <header className="entete">
            <p className="surtitre">Pour qui</p>
            <h2 className="titre-2"><em className="teinte">Plombier, restaurateur, cabinet :</em> la question n’est pas la même.</h2>
            <p className="chapeau">Le client ne cherche pas « du SEO ». Il cherche un artisan disponible, une table ce soir, un cabinet près de chez lui. Chaque métier a son guide, gratuit.</p>
          </header>
          <div className="cartes-photo">
            <Link className="carte-photo" href="/conseils/seo/trouver-des-chantiers/">
              <span className="carte-photo__image"><img src="/images/charte/photos/plombier-repare-canalisation-sous-meuble-600x460.webp" width="600" height="460" loading="lazy" alt="Un plombier répare une canalisation sous un meuble" /></span>
              <span className="carte-photo__corps"><span className="petit">Artisans du bâtiment</span><span className="titre-3">Des chantiers près de chez vous</span><span className="carte-photo__texte">Plombier, électricien, maçon : le client tape « dépannage » ou « devis » avec le nom de sa ville. C'est là qu'il faut apparaître.</span><span className="lien">Comment trouver des chantiers</span></span>
            </Link>
            <Link className="carte-photo" href="/conseils/seo/avis-google/">
              <span className="carte-photo__image"><img src="/images/charte/photos/salle-restaurant-eclairee-soir-600x460.webp" width="600" height="460" loading="lazy" alt="Une salle de restaurant éclairée le soir" /></span>
              <span className="carte-photo__corps"><span className="petit">Commerces et restaurants</span><span className="titre-3">Une fiche Google qui remplit la salle</span><span className="carte-photo__texte">Horaires justes, photos récentes, avis auxquels on répond, réservation qui marche sur téléphone. Sur Maps, on vous compare souvent avant d'ouvrir votre site.</span><span className="lien">Bien gérer ses avis Google</span></span>
            </Link>
            <Link className="carte-photo" href="/conseils/seo/referencement-local/">
              <span className="carte-photo__image"><img src="/images/charte/photos/praticien-soigne-dos-patiente-cabinet-600x460.webp" width="600" height="460" loading="lazy" alt="Un praticien soigne le dos d'une patiente en cabinet" /></span>
              <span className="carte-photo__corps"><span className="petit">Professions libérales et cabinets</span><span className="titre-3">Être trouvé dans votre ville, et rassurer</span><span className="carte-photo__texte">Ostéopathe, avocat, expert-comptable : on vous cherche par métier et par ville, puis on se fait une idée en dix secondes. Le référencement local joue sur les deux.</span><span className="lien">Le référencement local, expliqué</span></span>
            </Link>
            <Link className="carte-photo" href="/conseils/creation-site-internet/site-vitrine/">
              <span className="carte-photo__image"><img src="/images/charte/photos/commercant-tient-cles-boutique-600x460.webp" width="600" height="460" loading="lazy" alt="Un commerçant tient les clés de sa boutique" /></span>
              <span className="carte-photo__corps"><span className="petit">Vous partez de zéro</span><span className="titre-3">Un site vitrine qui rapporte</span><span className="carte-photo__texte">Pas de site, ou un site qui dort ? Ce qu'il faut dedans, ce que ça coûte, par quoi commencer : écrit noir sur blanc, chiffres à l'appui.</span><span className="lien">Ce qu'il faut dans un site vitrine</span></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9 · AVIS : défilement doux */}
      <section className="section avis-section" id="temoignages" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <p className="avis__etoiles" aria-hidden="true">★★★★★</p>
            <p className="surtitre">Avis Google</p>
            <h2 className="titre-2"><em className="degrade-chaud">5,0 sur 5 :</em> les cinq avis, tels qu’ils sont écrits.</h2>
            <p className="chapeau">Relevés sur la fiche Google de MKZ le 14 septembre 2026, sans une virgule changée. <span className="insecable"><a className="lien" href={ficheGoogle.url} target="_blank" rel="noopener">Les lire sur Google</a>.</span></p>
          </header>
        </div>
        <div className="avis" tabIndex={0} aria-label="Avis Google, défilement horizontal">
          <div className="avis__piste">
            {avisGoogle.map((a) => (
              <figure className="avis__carte" key={a.auteur}><blockquote>{"«" + NBSP + a.texte + NBSP + "»"}</blockquote><figcaption><span className="avis__initiale" aria-hidden="true">{a.auteur.charAt(0).toUpperCase()}</span><span><strong>{a.auteur}</strong> · avis Google, {a.mois} <span className="etoiles" aria-label="5 étoiles sur 5">★★★★★</span></span></figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · CONSULTANT (blanc) : photo, puis un panneau à 4 colonnes */}
      <section className="section s-blanc" data-theme="clair">
        <div className="enveloppe">
          <div className="consultant">
            <figure className="consultant__photo">
              <img src="/images/accueil/mickael.webp" width="960" height="960" loading="lazy" alt="Mickaël Leclerc, fondateur de MKZ" />
              <figcaption>Mickaël Leclerc, fondateur.<br />C’est lui qui décroche.</figcaption>
            </figure>
            <header className="consultant__texte">
              <p className="surtitre">Qui fait le travail</p>
              <h2 className="titre-2">Un consultant, <em className="degrade">pas une agence</em>.</h2>
              <p className="chapeau">Quand je dis consultant, c’est-à-dire : la personne qui vous répond au téléphone est celle qui fait le travail. Pas de commercial, pas de chef de projet, pas de stagiaire derrière. Ça coûte moins cher, et ça va plus vite. C’est tout.</p>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Parler de mon projet, 30 min gratuites</a>
            </header>
          </div>
          <ul className="engagements">
            <li className="engagement"><div className="engagement__tete"><svg className="ico" aria-hidden="true"><use href="#i-bulle"/></svg><h3 className="titre-3">On parle français</h3></div><p>Quand je dis « données structurées », je vous explique dans la phrase d'après ce que ça change pour vous. Vous comprenez ce qu'on fait, et pourquoi.</p></li>
            <li className="engagement"><div className="engagement__tete"><svg className="ico" aria-hidden="true"><use href="#i-tel"/></svg><h3 className="titre-3">Je décroche</h3></div><p>Une question, un doute, un détail ? Vous m'appelez, je réponds. Pas de ticket, pas de chef de projet entre nous, pas d'attente de 72 heures.</p></li>
            <li className="engagement"><div className="engagement__tete"><svg className="ico" aria-hidden="true"><use href="#i-oeil"/></svg><h3 className="titre-3">Vous voyez tout</h3></div><p>Chaque mois, un point clair : ce qui a été fait, ce que ça a donné, la suite. Vos accès Search Console et Analytics sont les vôtres, vous pouvez vérifier sans moi.</p></li>
            <li className="engagement"><div className="engagement__tete"><svg className="ico" aria-hidden="true"><use href="#i-libre"/></svg><h3 className="titre-3">Vous restez libre</h3></div><p>Votre site vous appartient, vos accès aussi. Si demain vous partez, vous partez avec tout. C'est normal, et c'est écrit dans le devis.</p></li>
          </ul>
        </div>
      </section>

      {/* 11 · QUESTIONS : dégradé violet-rose */}
      <section className="section section--serree faq-section" id="questions" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <p className="surtitre">Vos questions</p>
            <h2 className="titre-2">Ce qu’on me demande <em className="degrade-rose">avant de signer</em>.</h2>
            <p className="chapeau">Les réponses honnêtes, y compris celles qui ne font pas vendre.</p>
          </header>
          <div className="faq">
            {homeFaqFr.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
          <p className="centre"><Link className="bouton bouton--plein" href="/audit-seo/">Tester mon site en une minute</Link></p>
        </div>
      </section>

      {/* 12 · ON PARTAGE : 3 colonnes pleine largeur, angles carrés, sans espace */}
      <section className="partage" data-theme="clair">
        <header className="entete enveloppe partage__entete">
          <p className="surtitre">On partage</p>
          <h2 className="titre-2">Mes méthodes, <em className="degrade">en accès libre</em>.</h2>
          <p className="chapeau">Guides SEO, tutoriels pas à pas et conseils création de site : exactement ce que j’applique pour mes clients. Donner avant de vendre.</p>
        </header>
        <div className="partage__colonnes">
          <Link className="partage__col partage__col--roi" href="/conseils/tutoriels/" data-theme="sombre">
            <span className="partage__image"><img src="/images/accueil/google.webp" width="800" height="1000" loading="lazy" alt="Une recherche Google ouverte sur un ordinateur portable, à côté d'un café" /></span>
            <span className="partage__corps"><span className="petit">Tutoriels</span><span className="titre-3">Pas à pas, avec captures</span><span className="partage__texte">Search Console, fiche Google, WordPress : reprenez la main sur vos outils, écran par écran.</span><span className="partage__lien">Voir les guides</span></span>
          </Link>
          <Link className="partage__col partage__col--clair" href="/conseils/creation-site-internet/">
            <span className="partage__image"><img src="/images/accueil/ecran.webp" width="800" height="1000" loading="lazy" alt="Un ordinateur portable entrouvert, son écran diffuse une lumière bleue et violette" /></span>
            <span className="partage__corps"><span className="petit">Création de site</span><span className="titre-3">Avant d'investir</span><span className="partage__texte">Combien coûte un site, quand le refondre, quel type choisir : les bonnes décisions, chiffrées.</span><span className="partage__lien">Voir les guides</span></span>
          </Link>
          <Link className="partage__col partage__col--violet" href="/conseils/seo/" data-theme="sombre">
            {/* Visuel généré par IA (Nano Banana, Google), sans crédit obligatoire */}
            <span className="partage__image"><img src="/images/charte/barre-recherche.webp" width="1600" height="800" loading="lazy" alt="Un doigt touche une barre de recherche lumineuse, devant un bureau clair" /></span>
            <span className="partage__corps"><span className="petit">SEO &amp; visibilité</span><span className="titre-3">Être trouvé sur Google</span><span className="partage__texte">Référencement local, audit SEO, visibilité : des guides concrets, sans jargon.</span><span className="partage__lien">Voir les guides</span></span>
          </Link>
        </div>
      </section>

      {/* 13 · OÙ JE TRAVAILLE (noir, la France de nuit) */}
      <section className="terre" data-theme="sombre">
        <img className="terre__image" src="/images/accueil/terre-1200.webp" srcSet="/images/accueil/terre-1200.webp 1200w, /images/accueil/terre-2400.webp 2400w" sizes="100vw" width="2400" height="1597" loading="lazy" alt="L'Europe vue de l'espace la nuit, les villes éclairées" />
        <div className="enveloppe terre__in">
          <p className="surtitre">Où je travaille</p>
          <h2 className="titre-2">Basé dans le 77, <em className="degrade">partout en France</em>.</h2>
          <div className="zones">
            <p><strong>Seine-et-Marne :</strong> Meaux · Melun · Chelles · Dammartin-en-Goële · Roissy · Marne-la-Vallée · Senlis · Provins · Fontainebleau · Serris · Mitry-Mory · Claye-Souilly</p>
            <p><strong>Île-de-France :</strong> Paris · Val-de-Marne (94) · Seine-Saint-Denis (93) · Val-d’Oise (95) · Hauts-de-Seine (92) · Yvelines (78) · Essonne (91)</p>
            <p><strong>Et au-delà :</strong> toute la France, à distance, avec le même suivi.</p>
          </div>
          <Link className="lien" href="/agence-web-77/">Votre agence web en Seine-et-Marne</Link>
        </div>
      </section>

      {/* 14 · APPEL FINAL (compact) */}
      <section className="appel" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe appel__in">
          <div className="appel__texte">
            <h2 className="titre-2">Prêt à faire <em className="degrade">sonner</em> le téléphone ?</h2>
            <p className="chapeau">Trente minutes au téléphone ou en visio. Je regarde votre site et votre marché, je vous dis ce que je ferais en premier, et vous décidez. Gratuit, sans engagement, plan d’action offert.</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon créneau</a>
              <Link className="bouton bouton--trait" href="/contact/">M’écrire un message</Link>
            </div>
            <p className="appel__direct"><img className="appel__avatar" src="/images/accueil/mickael.webp" width="40" height="40" alt="" loading="lazy" /><span>Ou directement : <a href="tel:0769093909">07 69 09 39 09</a> · réponse sous 24 h</span></p>
            <p className="appel__note"><strong>Pas encore prêt à appeler ?</strong> Lancez d’abord l’<Link className="lien" href="/audit-seo/">audit gratuit en ligne</Link>, vous saurez où vous en êtes.</p>
          </div>
        </div>
      </section>
      <AccueilScripts />
    </ChartePage>
  );
}
