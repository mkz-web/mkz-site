// Page /outils/ à la nouvelle charte (maquette codée du 20/10/2026).
// Écart voulu : le champ « Tester mon site » envoie vers /audit-seo/?site= (GET natif, sans
// JavaScript), où le scan se lance tout seul.
// Composant GÉNÉRÉ depuis la maquette (outils.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function OutilsCharte() {
  return (
    <ChartePage chemin="/outils/" classes="page-annexe page-violet">
      {/* BANDEAU · console : l'outil au centre, sur une trame lumineuse */}
      <section className="console" data-theme="sombre">
        <div className="enveloppe console__in">
          <p className="console__sur" data-entree=""><i aria-hidden="true"></i>Outils gratuits</p>
          <h1 data-entree="">Mesurez avant de nous parler. <em className="degrade">Gratuitement.</em></h1>
          <p className="console__intro" data-entree="">Deux outils en libre-service, sans inscription, construits avec la même règle que nos prestations : on mesure, on n’estime pas. Ils vous disent où vous en êtes. Ce que vous en faites ensuite vous appartient.</p>
          <div className="console__outil" data-entree="">
            <form action="/audit-seo/" method="get">
              <label htmlFor="console-site">Adresse de votre site</label>
              <input id="console-site" name="site" type="text" inputMode="url" autoComplete="url" placeholder="votre-site.fr" />
              <button className="bouton bouton--plein" type="submit">Tester mon site en 1 minute</button>
            </form>
          </div>
          <ul className="console__puces" data-entree="" aria-label="En bref">
            <li><svg aria-hidden="true"><use href="#i-coche"/></svg>20 mesures réelles</li>
            <li><svg aria-hidden="true"><use href="#i-coche"/></svg>Un score sur 100</li>
            <li><svg aria-hidden="true"><use href="#i-coche"/></svg>Sans inscription</li>
          </ul>
          <p className="console__tel" data-entree="">Une question ? On décroche : <a href="tel:0769093909">07 69 09 39 09</a></p>
        </div>
        <nav className="raccourcis" aria-label="Les deux outils" data-revele-groupe="">
            <a className="raccourci" href="#audit"><span className="raccourci__ico" aria-hidden="true"><svg><use href="#i-loupe"/></svg></span><span><small>Outil 01 · une minute</small><b>Audit SEO + IA gratuit</b></span></a>
            <a className="raccourci" href="#empreinte"><span className="raccourci__ico" aria-hidden="true"><svg><use href="#i-etincelle"/></svg></span><span><small>Outil 02 · simulateur</small><b>Empreinte d’une requête IA</b></span></a>
          </nav>
      </section>

      {/* OUTIL 01 · audit (clair), avec les raccourcis qui chevauchent le bandeau */}
      <section className="section s-blanc section--raccourcis" id="audit" data-theme="clair">
        <div className="enveloppe">

          <div className="outil outil--premier">
            <div className="outil__texte" data-revele="">
              <p className="outil__num">Outil 01 · une minute</p>
              <h2 className="titre-2">Audit SEO + IA <em className="degrade">gratuit</em></h2>
              <p>Entrez l’adresse de votre site. L’outil se connecte et fait 20 mesures réelles au moment où vous cliquez, puis vous rend un score sur 100 et vos priorités, chaque point expliqué en français.</p>
              <ul className="outil__liste">
                <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span>Technique : HTTPS et redirections, vraie page 404, balises title et description, en-têtes de sécurité.</span></li>
                <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span>Lisibilité par les IA : robots GPTBot, ClaudeBot, PerplexityBot et Google-Extended autorisés ou bloqués, fichier llms.txt, données structurées.</span></li>
                <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span>Rien n’est estimé : ce que vous lisez, c’est ce que votre site a répondu il y a quelques secondes.</span></li>
              </ul>
              <Link className="bouton bouton--plein" href="/audit-seo/">Lancer l’audit gratuit</Link>
              <p className="outil__note">Sans inscription. Le rapport détaillé, lui aussi gratuit, arrive sous 24 h si vous le demandez.</p>
            </div>
            <div className="outil__visuel" data-revele="" aria-hidden="true">
              <div className="maquette">
                <p className="maquette__barre"><span>Résultat d’un scan réel</span><b>mkz-consulting.fr</b></p>
                <div className="maquette__score">
                  <div className="anneau"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54"/><circle className="anneau__plein" cx="60" cy="60" r="54"/></svg><p><b>89</b><small>sur 100</small></p></div>
                  <ul className="barres">
                    <li><span>Technique</span><span>35/35</span><i style={{ "--v": "1" } as CSSProperties}></i></li>
                    <li><span>Lisibilité par les IA</span><span>35/35</span><i style={{ "--v": "1" } as CSSProperties}></i></li>
                    <li><span>Autorité et positions Google</span><span>19/30</span><i style={{ "--v": ".633" } as CSSProperties}></i></li>
                  </ul>
                </div>
                <ul className="maquette__priorites">
                  <li><em>OK</em>HTTPS et redirections</li>
                  <li><em>OK</em>Robots des IA autorisés</li>
                  <li><em>OK</em>Fichier llms.txt servi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTIL 02 · empreinte (sombre) */}
      <section className="section s-teinte" id="empreinte" data-theme="sombre">
        <div className="enveloppe outil outil--inverse">
          <div className="outil__texte" data-revele="">
            <p className="outil__num">Outil 02 · simulateur</p>
            <h2 className="titre-2">Empreinte <em className="degrade-rose">d’une requête IA</em></h2>
            <p>Combien coûte une question posée à une IA, en énergie, en CO2 et en eau ? Tapez votre requête, choisissez la classe de modèle et la région : le simulateur chiffre, fourchettes d’incertitude comprises.</p>
            <ul className="outil__liste">
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span>Jeu de données versionné et sourcé (Google, Mistral AI, OpenAI, Ember, Boavizta, ADEME...), journal des révisions public.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span>Le message n’est pas « arrêtez l’IA » : le choix du modèle pèse cent fois plus que le fait d’utiliser l’IA ou non.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span>Données citables dans un llms.txt dédié, pour les moteurs de réponse IA.</span></li>
            </ul>
            <Link className="bouton bouton--plein" href="/empreinte-ia/">Simuler une requête</Link>
            <p className="outil__note">Estimations pédagogiques, pas une mesure opposable : le cadre est écrit au pied de l’outil.</p>
          </div>
          <div className="outil__visuel" data-revele="" aria-hidden="true">
            <div className="maquette">
              <p className="maquette__barre"><span>Exemple de simulation</span><b>Fourchettes d’incertitude</b></p>
              <p className="maquette__champ"><small>Votre requête</small>Trouve-moi un plombier disponible à Meaux</p>
              <div className="maquette__choix">
                <p className="maquette__champ"><small>Classe de modèle</small>Petit modèle</p>
                <p className="maquette__champ"><small>Région</small>France</p>
              </div>
              <ul className="jauges">
                <li><svg><use href="#i-eclair"/></svg><b>Énergie</b><i style={{ "--a": ".12", "--b": ".42", "--m": ".26" } as CSSProperties}></i></li>
                <li><svg><use href="#i-globe"/></svg><b>CO2</b><i style={{ "--a": ".06", "--b": ".3", "--m": ".16" } as CSSProperties}></i></li>
                <li><svg><use href="#i-goutte"/></svg><b>Eau</b><i style={{ "--a": ".18", "--b": ".56", "--m": ".34" } as CSSProperties}></i></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU VISUEL · la Terre la nuit, pour couper la page */}
      <div className="planete" aria-hidden="true">
        <img src="/images/accueil/terre-1200.webp" srcSet="/images/accueil/terre-1200.webp 1200w, /images/accueil/terre-2400.webp 2400w" sizes="100vw" width="2400" height="1597" loading="lazy" alt="" />
      </div>

      {/* POURQUOI DES OUTILS GRATUITS, puis la signature de Mickaël (une seule colonne) */}
      <section className="section s-lavande pourquoi" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <h2 className="titre-2">Pourquoi des outils <em className="degrade">gratuits</em> ?</h2>
          </header>
          <div className="prose pourquoi__texte" data-revele="">
            <p>Parce que donner avant de vendre, c’est notre façon de travailler. Un artisan ou un dirigeant de TPE n’a pas besoin d’un discours, il a besoin d’un chiffre sur son propre site. L’outil le lui donne en une minute, et il reste libre de corriger lui-même, de demander le rapport, ou de nous appeler.</p>
            <p>Les deux outils appliquent ce que nous vendons : ce site publie ses propres données structurées, son llms.txt, et un audit qui mesure sur le site réel au moment du test. Vous pouvez tout vérifier avant de nous confier votre <Link href="/referencement-seo/">référencement SEO</Link> ou votre <Link href="/referencement-ia/">référencement IA (GEO)</Link>. Les prix, eux, sont sur la page <Link href="/tarifs/">tarifs</Link>.</p>
          </div>
          <div className="signature" data-revele="">
            <img className="signature__photo" src="/images/charte/mickael-480.webp" width="480" height="480" loading="lazy" alt="Mickaël Leclerc, fondateur de MKZ" />
            <h2 className="titre-2">Un humain plutôt <em className="degrade">qu’un outil</em> ?</h2>
            <p className="chapeau">30 minutes gratuites avec Mickaël : on regarde vos résultats ensemble, et vous repartez avec un plan d’action concret. Que vous travailliez avec nous ou non.</p>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mes 30 minutes gratuites</a>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
