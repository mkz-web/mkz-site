// Page /en/contact/ à la nouvelle charte (22/10/2026) : gabarit de la page contact de la maquette
// codée du 20/10/2026 (écran partagé : panneau pour se joindre, formulaire à côté ; puis « avant
// d'écrire »), textes du dictionnaire ui.en.contact, les mêmes que l'ancienne page anglaise.
import Link from "next/link";
import { CALENDLY, ui } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import FormulaireContact from "@/components/charte/FormulaireContact";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

const t = ui.en.contact;
// Pictos des trois liens « Before you write » : audit, SEO, IA
const PICTOS = ["#i-loupe", "#i-cle", "#i-etincelle"];

export default function ContactCharteEn() {
  // « Tell me about the French market problem. » : la fin du titre porte le dégradé chaud
  const i = t.title.indexOf("the ");
  const tete = i > 0 ? t.title.slice(0, i + 4) : "";
  const fin = i > 0 ? t.title.slice(i + 4) : t.title;
  return (
    <ChartePage chemin="/en/contact/" classes="page-annexe page-violet" locale="en">
      {/* BANDEAU · écran partagé : un panneau violet pour se joindre, le formulaire à côté */}
      <section className="partage-ecran" aria-labelledby="titre-contact">
        <div className="joindre" data-theme="sombre">
          <p className="joindre__sur" data-entree="">{t.kicker}</p>
          <h1 id="titre-contact" data-entree="">{tete}<em className="degrade-chaud">{fin}</em></h1>
          <p className="joindre__intro" data-entree="">{t.subtitle}</p>
          <p className="joindre__visage" data-entree=""><img src="/images/charte/mickael-160.webp" width="56" height="56" alt="" /><span><b>Mickaël Leclerc</b>founder of MKZ</span></p>
          <ul className="moyens" data-entree="">
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-tel"/></svg></span><div><h3 className="titre-3">{t.labels.phone}</h3><a href={ui.en.header.phoneHref}>{ui.en.header.phoneLabel}</a></div></li>
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-bulle"/></svg></span><div><h3 className="titre-3">{t.labels.email}</h3><a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></div></li>
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-repere"/></svg></span><div><h3 className="titre-3">{t.labels.address}</h3><p>{t.addressLines[0]}<br />{t.addressLines[1]}</p><a className="moyen__lien" href="https://maps.app.goo.gl/8afecUcXiR92QEAm6">{t.mapsLabel}</a></div></li>
            <li className="moyen"><span className="moyen__ico" aria-hidden="true"><svg><use href="#i-horloge"/></svg></span><div><h3 className="titre-3">{t.labels.hours}</h3><p>{t.hoursLines[0]}<br />{t.hoursLines[1]}</p></div></li>
          </ul>
        </div>
        <div className="ecrire" data-theme="clair">
          <div className="formulaire" data-entree="">
            <FormulaireContact locale="en" />
          </div>
          <a className="creneau" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow" data-entree=""><span className="creneau__ico" aria-hidden="true"><svg><use href="#i-chrono"/></svg></span><span><b>{t.calendlyTitle}</b><small>{t.calendlyDesc}</small></span><span className="creneau__fleche" aria-hidden="true">›</span></a>
        </div>
      </section>

      {/* BEFORE YOU WRITE : le plan dessiné de la maquette et les trois liens du dictionnaire */}
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
            <span className="plan__etiquette">Dammartin-en-Goële, near Paris</span>
          </div>
          <div data-revele="">
            <h2 className="titre-2">Before you <em className="degrade">write</em></h2>
            <ul className="liens-avant">
              {t.explore.links.map((l, k) => (
                <li key={l.href}><Link href={l.href}><svg aria-hidden="true"><use href={PICTOS[k] ?? "#i-loupe"}/></svg>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
