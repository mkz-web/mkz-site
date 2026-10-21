// Page /contact/ à la nouvelle charte (maquette codée du 20/10/2026).
// Écart voulu : formulaire branché (FormulaireContact : Web3Forms, sujet prérempli par ?sujet=,
// événement GA4 envoi_contact), liens internes en next/link, Calendly en nofollow.
// Composant GÉNÉRÉ depuis la maquette (contact.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import FormulaireContact from "@/components/charte/FormulaireContact";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function ContactCharte() {
  return (
    <ChartePage chemin="/contact/" classes="page-annexe page-violet">
      {/* BANDEAU · écran partagé : un panneau violet pour se joindre, le formulaire à côté */}
      <section className="partage-ecran" aria-labelledby="titre-contact">
        <div className="joindre" data-theme="sombre">
          <p className="joindre__sur" data-entree="">Contact</p>
          <h1 id="titre-contact" data-entree="">Parlons de votre <em className="degrade-chaud">projet.</em></h1>
          <p className="joindre__intro" data-entree="">Remplissez le formulaire ou contactez-moi directement. Je réponds sous 24 h, et c’est bien moi qui décroche.</p>
          <p className="joindre__visage" data-entree=""><img src="/images/charte/mickael-160.webp" width="56" height="56" alt="" /><span><b>Mickaël Leclerc</b>fondateur de MKZ</span></p>
          <ul className="moyens" data-entree="">
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-tel"/></svg></span><div><h3 className="titre-3">Téléphone</h3><a href="tel:0769093909">07 69 09 39 09</a></div></li>
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-bulle"/></svg></span><div><h3 className="titre-3">Email</h3><a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></div></li>
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-repere"/></svg></span><div><h3 className="titre-3">Adresse</h3><p>1 rue Françoise Sagan<br />77230 Dammartin-en-Goële</p><a className="moyen__lien" href="https://maps.app.goo.gl/8afecUcXiR92QEAm6">Voir sur Google Maps</a></div></li>
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-horloge"/></svg></span><div><h3 className="titre-3">Horaires</h3><p>Lundi - samedi : 9h - 21h<br />Réponse sous 24 h garantie</p></div></li>
          </ul>
        </div>
        <div className="ecrire" data-theme="clair">
          <div className="formulaire" data-entree="">
            <FormulaireContact />
          </div>
          <a className="creneau" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow" data-entree=""><span className="creneau__ico" aria-hidden="true"><svg><use href="#i-chrono"/></svg></span><span><b>Réserver un créneau</b><small>Audit gratuit de 30 min, sans engagement</small></span><span className="creneau__fleche" aria-hidden="true">›</span></a>
        </div>
      </section>

      {/* AVANT DE NOUS ÉCRIRE : un plan dessiné et trois liens utiles (clair) */}
      <section className="section s-lavande" data-theme="clair">
        <div className="enveloppe avant">
          <div className="plan" data-revele="" aria-hidden="true">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <path className="parc" d="M300 30 C340 20 390 40 395 80 C398 110 360 120 330 105 C300 90 285 50 300 30Z"/>
              <path className="parc" d="M250 268 C280 255 320 262 330 285 C335 300 280 305 255 298 C240 292 238 276 250 268Z"/>
              <circle className="ville-zone" cx="62" cy="226" r="34"/>
              <path className="riviere" d="M410 176 C350 192 300 204 248 214 S150 232 62 236"/>
              <path className="route" d="M-10 200 C30 205 50 214 62 226"/>
              <path className="route" d="M62 226 C90 190 118 150 150 112"/>
              <path className="route" d="M150 112 C175 118 195 124 216 132"/>
              <path className="route" d="M120 -10 C150 60 190 100 216 132 S250 230 260 310"/>
              <path className="route-fine" d="M216 132 C280 110 330 60 410 30"/>
              <path className="route-fine" d="M62 226 C110 236 160 238 196 240"/>
              <path className="route-fine" d="M196 240 C250 248 300 254 352 262"/>
              <path className="route-fine" d="M352 262 C375 266 395 270 410 272"/>
              <circle className="zone" cx="216" cy="132" r="70"/>
              <g className="ville"><circle cx="62" cy="226" r="5"/><text x="62" y="210" textAnchor="middle">Paris</text></g>
              <g className="ville"><circle cx="150" cy="112" r="4"/><text x="150" y="99" textAnchor="middle">Roissy</text></g>
              <g className="ville"><circle cx="196" cy="240" r="4"/><text x="196" y="258" textAnchor="middle">Serris</text></g>
              <g className="ville"><circle cx="352" cy="262" r="4"/><text x="352" y="250" textAnchor="middle">Provins</text></g>
            </svg>
            <span className="plan__epingle"><i></i></span>
            <span className="plan__etiquette">Dammartin-en-Goële (77)</span>
          </div>
          <div data-revele="">
            <h2 className="titre-2">Avant de <em className="degrade">nous écrire</em></h2>
            <ul className="liens-avant">
              <li><Link href="/tarifs/"><svg aria-hidden="true"><use href="#i-etiquette"/></svg>La grille des tarifs</Link></li>
              <li><Link href="/audit-seo/"><svg aria-hidden="true"><use href="#i-loupe"/></svg>Tester votre site : audit SEO gratuit</Link></li>
              <li><Link href="/services/"><svg aria-hidden="true"><use href="#i-vitrine"/></svg>Nos services en détail</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
