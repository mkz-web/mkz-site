// Accueil MKZ, nouvelle charte (maquette codée du 18/10/2026, V3),
// intégré au site le 19/10/2026.
//
// Balisage repris de la maquette (mkz-accueil-maquette-2026-10-18/index.html) par
// conversion HTML vers JSX, avec ces écarts voulus :
//   - liens internes relatifs, rendus par next/link ; Calendly en nofollow (convention
//     de Button.tsx) ; fiche Google lue dans src/content/avis-google.ts ;
//   - formulaire « Tester mon site » branché sur /audit-seo/?site= (GET natif) ;
//   - avis et FAQ générés depuis leurs modules, source unique du texte visible et du
//     JSON-LD (FAQPage). Les espaces insécables de la maquette avant « ? » et « : » sont
//     posées dans home-faq.ts ; les avis restent verbatim (sans insécable ajoutée) ;
//   - ligne des villes écrite une seule fois (la copie du défilement vient du script) ;
//   - image de repli de l'ordinateur en chargement différé ;
//   - photos, polices et GSAP servis par le site (public/), plus aucune requête externe.
// Fidélité mesurée le 19/10/2026 contre la maquette servie telle quelle, à 1440, 1024,
// 390 et 375 px, mouvement réduit : mêmes éléments, positions et styles calculés.
//
// Le conteneur .page-accueil porte toute la feuille accueil.css (sélecteurs préfixés).
// SiteChrome (layout) n'affiche ni l'en-tête ni le pied de page du site sur « / » :
// la maquette apporte les siens. Animations : AccueilScripts (client).

import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import { homeFaqFr } from "@/content/home-faq";
import { avisGoogle, ficheGoogle } from "@/content/avis-google";
import AccueilScripts from "./AccueilScripts";
import "./accueil.css";

const NBSP = String.fromCharCode(160);

// Amorce de la maquette : la classe js masque les éléments [data-entree] avant leur
// animation d'entrée ; js-secours les rend visibles après 2,5 s si GSAP n'est pas venu.
// Le minuteur est rangé dans window.mkzSecours : AccueilScripts l'annule au démontage, sinon
// il poserait js-secours sur la page suivante après une navigation rapide.
const AMORCE =
  "document.documentElement.classList.add('js');window.mkzSecours=setTimeout(function(){document.documentElement.classList.add('js-secours')},2500);";

export default function AccueilContent() {
  return (
    <div className="page-accueil">
      <script dangerouslySetInnerHTML={{ __html: AMORCE }} />
      {/* Sprite : logo, chevron, pictos au trait arrondi */}
      <svg width="0" height="0" style={{ position: "absolute" } as CSSProperties} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-haut" gradientUnits="userSpaceOnUse" x1="965.18" y1="177.82" x2="869.13" y2="273.87"><stop offset="0" stopColor="#3B5BD9"/><stop offset="1" stopColor="#8DB2F8"/></linearGradient>
          <linearGradient id="g-bas" gradientUnits="userSpaceOnUse" x1="942.88" y1="273.88" x2="1038.99" y2="370"><stop offset="0" stopColor="#8DB2F8"/><stop offset=".45" stopColor="#9C9EF7"/><stop offset=".8" stopColor="#705398"/><stop offset="1" stopColor="#EBC49D"/></linearGradient>
          <linearGradient id="g-exergue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2A4089"/><stop offset="1" stopColor="#705398"/></linearGradient>
          <linearGradient id="g-ico" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stopColor="#2A4089"/><stop offset="1" stopColor="#705398"/></linearGradient>
          <linearGradient id="g-ico-sombre" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stopColor="#8DB2F8"/><stop offset="1" stopColor="#C9B6F5"/></linearGradient>
          <linearGradient id="g-anneau" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#705398"/><stop offset=".6" stopColor="#C2558F"/><stop offset="1" stopColor="#E39A5A"/></linearGradient>
          <linearGradient id="g-ico-chaud" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stopColor="#705398"/><stop offset=".6" stopColor="#C2558F"/><stop offset="1" stopColor="#E39A5A"/></linearGradient>
          <clipPath id="decoupe"><path d="M1025.22 237.86L978.9 237.86L906.02 310.75L906.08 310.81L906.02 310.87L978.91 383.77L1025.21 383.77L1025.22 383.76L952.27 310.81Z"/></clipPath>
          <path id="chevron" d="M1025.22 237.86L978.9 237.86L906.02 310.75L906.08 310.81L906.02 310.87L978.91 383.77L1025.21 383.77L1025.22 383.76L952.27 310.81Z"/>
          <g id="logo-lettres">
            <path d="M882.1 237.86L882.1 383.78L853.54 383.78L853.54 289.14L812.4 356.83L809.04 356.95L768.08 289.5L768.08 383.78L739.32 383.78L739.32 237.86L768.92 237.86L810.75 306.76L852.38 237.86Z"/>
            <path d="M1153.75 265.38L1153.79 265.38L1153.79 237.86L1066.62 237.86L1039.13 265.38L1114.84 265.38L1031.55 348.67L1031.66 348.78L1031.66 348.79L1066.61 383.75L1066.68 383.68L1066.7 383.78L1153.79 383.78L1153.79 356.26L1078.62 356.26L1070.75 348.39Z"/>
            <path d="M1025.22 419.74L906.02 419.74L906.02 404.96L1025.22 404.96Z"/>
          </g>
          <g id="logo-chevron" clipPath="url(#decoupe)">
            <rect x="900" y="230" width="130" height="81" fill="url(#g-haut)"/>
            <rect x="900" y="310.6" width="130" height="80" fill="url(#g-bas)"/>
          </g>
        </defs>
        <symbol id="i-vitrine" viewBox="0 0 24 24"><path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6"/><path d="M3 10a3 3 0 0 0 6 0a3 3 0 0 0 6 0a3 3 0 0 0 6 0"/><path d="M10 20v-5h4v5"/></symbol>
        <symbol id="i-rapport" viewBox="0 0 24 24"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M10 11.5a2 2 0 1 1 2.6 1.9c-.4.2-.6.5-.6.9v.7"/><path d="M12 17.6h.01"/></symbol>
        <symbol id="i-cle" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8"/><path d="M16 7l2.5 2.5"/><path d="M13.5 9.5l2 2"/></symbol>
        <symbol id="i-bulle" viewBox="0 0 24 24"><path d="M4 5h16v11H9.5L5 20v-4H4z"/><path d="M8 9h8M8 12.2h5"/></symbol>
        <symbol id="i-tel" viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.6 4.6-2.2 1.4a11 11 0 0 0 5.6 5.6l1.4-2.2 4.6 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/></symbol>
        <symbol id="i-oeil" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>
        <symbol id="i-libre" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 7.6-1.8"/><path d="M12 15v2"/></symbol>
        <symbol id="i-etiquette" viewBox="0 0 24 24"><path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8a1.4 1.4 0 0 1 0 2l-7 7a1.4 1.4 0 0 1-2 0z"/><circle cx="8" cy="8" r="1.4"/></symbol>
        <symbol id="i-horloge" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>
        <symbol id="i-chrono" viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5l3-3"/><path d="M10 3h4M12 3v3"/></symbol>
        <symbol id="i-coche" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
      </svg>

      <a className="evitement" href="#contenu">Aller au contenu</a>

      <header className="nav" id="nav">
        <div className="enveloppe nav__in">
          <Link className="nav__logo" href="/" aria-label="MKZ, accueil">
            <svg viewBox="739.3 237.8 414.5 182" aria-hidden="true"><use href="#logo-lettres"/><use href="#logo-chevron"/></svg>
          </Link>
          <nav aria-label="Navigation principale" className="nav__principal">
            <ul className="nav__liens" id="nav-liens">
              <li><Link href="/" aria-current="page">Accueil</Link></li>
              <li><Link href="/creation-site-internet/">Création de site</Link></li>
              <li><Link href="/referencement-seo/">SEO</Link></li>
              <li><Link href="/referencement-ia/">Référencement IA</Link></li>
              <li><Link href="/conseils/">Conseils</Link></li>
              <li><Link href="/outils/">Outils</Link></li>
              <li><Link href="/tarifs/">Tarifs</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </nav>
          <a className="nav__tel" href="tel:0769093909">07 69 09 39 09</a>
          <a className="bouton bouton--plein nav__cta" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Audit gratuit</a>
          <span className="nav__langue"><span aria-current="true">FR</span> / <Link href="/en/" lang="en">EN</Link></span>
          <button className="nav__menu" type="button" aria-expanded="false" aria-controls="nav-liens">Menu</button>
        </div>
      </header>

      <main id="contenu">

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
              {/* Séquence de 48 images tirée de la vidéo (canvas piloté par le scroll) ; la dernière image sert de repli.
                  loading="lazy" : sous la ligne de flottaison, et sans lui React la précharge dans le <head>
                  (avertissement « preloaded but not used » à chaque visite) */}
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
            <div className="metier__image"><img src="/images/accueil/metier-creation.webp" width="1200" height="920" loading="lazy" alt="Un bureau de graphiste, un site internet affiché sur l'écran et sur l'ordinateur portable" /></div>
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
            <div className="metier__image"><img src="/images/accueil/metier-seo.webp" width="1200" height="920" loading="lazy" alt="Un téléphone affiche la recherche Google devant le logo Google" /></div>
            <div className="metier__corps">
              <p className="petit">Service 02</p>
              <h3 className="metier__titre"><em className="teinte">SEO</em> &amp; référencement Google</h3>
              <p>Être trouvé par les gens qui cherchent ce que vous faites, dans votre ville. Mots-clés en langage client, technique propre, contenus utiles, liens choisis à la main : du référencement qui dure, pas un feu de paille.</p>
              <div className="tarif">
                <div className="tarif__ligne"><span className="tarif__montant">490 €</span><span className="tarif__libelle">Audit complet</span></div>
                <div className="tarif__ligne"><span className="tarif__montant">390 à 690 € HT</span><span className="tarif__libelle">accompagnement par mois</span></div>
              </div>
              <p className="puces">audit SEO · référencement local · contenus · netlinking · point mensuel</p>
              <Link className="bouton bouton--plein" href="/referencement-seo/">Découvrir le référencement SEO</Link>
            </div>
          </article>

          <article className="metier metier--violet" data-theme="sombre">
            <div className="metier__image"><img src="/images/accueil/metier-ia.webp" width="1200" height="920" loading="lazy" alt="Un téléphone affiche un assistant d'intelligence artificielle prêt à répondre" /></div>
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
              <span className="carte-photo__image"><img src="/images/accueil/pour-qui-artisans.webp" width="600" height="460" loading="lazy" alt="Un plombier répare une canalisation sous un meuble" /></span>
              <span className="carte-photo__corps"><span className="petit">Artisans du bâtiment</span><span className="titre-3">Des chantiers près de chez vous</span><span className="carte-photo__texte">Plombier, électricien, maçon : le client tape « dépannage » ou « devis » avec le nom de sa ville. C'est là qu'il faut apparaître.</span><span className="lien">Comment trouver des chantiers</span></span>
            </Link>
            <Link className="carte-photo" href="/conseils/seo/avis-google/">
              <span className="carte-photo__image"><img src="/images/accueil/pour-qui-commerces.webp" width="600" height="460" loading="lazy" alt="Une salle de restaurant éclairée le soir" /></span>
              <span className="carte-photo__corps"><span className="petit">Commerces et restaurants</span><span className="titre-3">Une fiche Google qui remplit la salle</span><span className="carte-photo__texte">Horaires justes, photos récentes, avis auxquels on répond, réservation qui marche sur téléphone. Sur Maps, on vous compare souvent avant d'ouvrir votre site.</span><span className="lien">Bien gérer ses avis Google</span></span>
            </Link>
            <Link className="carte-photo" href="/conseils/seo/referencement-local/">
              <span className="carte-photo__image"><img src="/images/accueil/pour-qui-cabinets.webp" width="600" height="460" loading="lazy" alt="Un praticien soigne le dos d'une patiente en cabinet" /></span>
              <span className="carte-photo__corps"><span className="petit">Professions libérales et cabinets</span><span className="titre-3">Être trouvé dans votre ville, et rassurer</span><span className="carte-photo__texte">Ostéopathe, avocat, expert-comptable : on vous cherche par métier et par ville, puis on se fait une idée en dix secondes. Le référencement local joue sur les deux.</span><span className="lien">Le référencement local, expliqué</span></span>
            </Link>
            <Link className="carte-photo" href="/conseils/creation-site-internet/site-vitrine/">
              <span className="carte-photo__image"><img src="/images/accueil/pour-qui-depart.webp" width="600" height="460" loading="lazy" alt="Un commerçant tient les clés de sa boutique" /></span>
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
            <span className="partage__image"><img src="/images/accueil/recherche.webp" width="1200" height="600" loading="lazy" alt="Une main touche une barre de recherche affichée devant un bureau" /></span>
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

      </main>

      <footer className="pied" data-theme="sombre">
        <div className="enveloppe">
          <div className="pied__haut">
            <p className="pied__phrase">Votre téléphone devrait <em className="teinte">sonner</em> plus souvent.</p>
            <div className="pied__appel">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
              <p>ou directement : <strong><a href="tel:0769093909">07 69 09 39 09</a></strong></p>
            </div>
          </div>
          <div className="pied__grille">
            <div className="pied__marque">
              <svg className="pied__logo" viewBox="739.3 237.8 414.5 182" role="img" aria-label="MKZ"><use href="#logo-lettres"/><use href="#logo-chevron"/></svg>
              <p>Création de sites web et SEO pour artisans, commerçants et indépendants. Basés en Seine-et-Marne, partout en France.</p>
              <p className="petit">MKZ · SIRET 983 662 784 00013 · RCS Meaux<br />1 rue Françoise Sagan, 77230 Dammartin-en-Goële</p>
            </div>
            <nav aria-labelledby="pied-services"><h3 id="pied-services">Services</h3><ul>
              <li><Link href="/creation-site-internet/">Création de site internet</Link></li>
              <li><Link href="/referencement-seo/">Référencement SEO</Link></li>
              <li><Link href="/referencement-ia/">Référencement IA (GEO)</Link></li>
              <li><Link href="/agence-web-77/">Agence web Seine-et-Marne</Link></li>
              <li><Link href="/audit-seo/">Audit SEO gratuit en ligne</Link></li>
              <li><Link href="/empreinte-ia/">Empreinte d'une requête IA</Link></li>
            </ul></nav>
            <nav aria-labelledby="pied-conseils"><h3 id="pied-conseils">Conseils</h3><ul>
              <li><Link href="/conseils/tutoriels/">Tutoriels pas à pas</Link></li>
              <li><Link href="/conseils/creation-site-internet/">Création de site</Link></li>
              <li><Link href="/conseils/seo/">SEO &amp; visibilité</Link></li>
              <li><Link href="/conseils/referencement-ia/">Référencement IA</Link></li>
              <li><Link href="/conseils/">Tous les conseils</Link></li>
            </ul></nav>
            <div><h3>Contact</h3><ul>
              <li><a href="tel:0769093909">07 69 09 39 09</a></li>
              <li><a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></li>
              <li>Lun-sam 9h-21h<br />Réponse sous 24 h</li>
            </ul></div>
            <nav aria-labelledby="pied-liens"><h3 id="pied-liens">Liens</h3><ul>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/services/">Services</Link></li>
              <li><Link href="/outils/">Outils gratuits</Link></li>
              <li><Link href="/tarifs/">Tarifs</Link></li>
              <li><Link href="/about/">À propos</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/en/" lang="en">English</Link></li>
            </ul></nav>
          </div>
          <div className="pied__bas">
            <p>© 2026 MKZ · Tous droits réservés</p>
            <p><Link href="/mentions-legales/">Mentions légales</Link> <Link href="/politique-confidentialite/">Politique de confidentialité</Link> <button type="button" className="pied__cookies">Gérer les cookies</button></p>
          </div>
        </div>
      </footer>
      <AccueilScripts />
    </div>
  );
}
