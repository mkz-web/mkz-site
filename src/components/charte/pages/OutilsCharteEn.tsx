// Page /en/tools/ à la nouvelle charte (22/10/2026) : gabarit de la page Outils de la maquette
// codée du 20/10/2026 (console avec le formulaire de l'audit, un bloc par outil avec son aperçu
// dessiné, bandeau de la Terre, pourquoi des outils gratuits, signature), textes de l'objet
// `content` de (en)/en/tools/page.tsx, les mêmes que l'ancienne page. Le simulateur d'empreinte
// reste en français (décision mesurée du 15/08/2026) : sa carte le dit.
import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY, ui } from "@/lib/i18n";
import type { ToolsPageContent } from "@/components/ToolsContent";
import ChartePage from "@/components/charte/ChartePage";
import { enLigne } from "@/components/charte/contenu";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function OutilsCharteEn({ content: c }: { content: ToolsPageContent }) {
  const [audit, empreinte] = c.tools;
  const a = ui.en.audit;
  return (
    <ChartePage chemin="/en/tools/" classes="page-annexe page-violet" locale="en">
      {/* BANDEAU · console : l'outil au centre, sur une trame lumineuse */}
      <section className="console" data-theme="sombre">
        <div className="enveloppe console__in">
          <p className="console__sur" data-entree=""><i aria-hidden="true"></i>{c.kicker}</p>
          <h1 data-entree="">{c.h1Before}<em className="degrade">{c.h1Em + c.h1After}</em></h1>
          <p className="console__intro" data-entree="">{c.sub}</p>
          <div className="console__outil" data-entree="">
            <form action="/en/seo-audit/" method="get">
              <label htmlFor="console-site">{a.urlLabel}</label>
              <input id="console-site" name="site" type="text" inputMode="url" autoComplete="url" placeholder={a.urlPlaceholder} />
              <button className="bouton bouton--plein" type="submit">{c.primary.label}</button>
            </form>
          </div>
          <ul className="console__puces" data-entree="" aria-label="At a glance">
            <li><svg aria-hidden="true"><use href="#i-coche"/></svg>20 real checks</li>
            <li><svg aria-hidden="true"><use href="#i-coche"/></svg>A score out of 100</li>
            <li><svg aria-hidden="true"><use href="#i-coche"/></svg>No signup</li>
          </ul>
          <p className="console__tel" data-entree="">{c.phonePrefix} <a href={ui.en.header.phoneHref}>{ui.en.header.phoneLabel}</a></p>
        </div>
        <nav className="raccourcis" aria-label="The two tools" data-revele-groupe="">
          <a className="raccourci" href="#audit"><span className="raccourci__ico" aria-hidden="true"><svg><use href="#i-loupe"/></svg></span><span><small>{audit.kicker}</small><b>{audit.title}</b></span></a>
          <a className="raccourci" href="#empreinte"><span className="raccourci__ico" aria-hidden="true"><svg><use href="#i-etincelle"/></svg></span><span><small>{empreinte.kicker}</small><b>{empreinte.title}</b></span></a>
        </nav>
      </section>

      {/* TOOL 01 · audit (clair), avec les raccourcis qui chevauchent le bandeau */}
      <section className="section s-blanc section--raccourcis" id="audit" data-theme="clair">
        <div className="enveloppe">
          <div className="outil outil--premier">
            <div className="outil__texte" data-revele="">
              <p className="outil__num">{audit.kicker}</p>
              <h2 className="titre-2">Free <em className="degrade">SEO &amp; AI audit</em></h2>
              <p>{audit.desc}</p>
              <ul className="outil__liste">
                {audit.facts.map((f) => <li key={f}><svg aria-hidden="true"><use href="#i-coche"/></svg><span>{f}</span></li>)}
              </ul>
              <Link className="bouton bouton--plein" href={audit.href}>{audit.cta}</Link>
              <p className="outil__note">{audit.note}</p>
            </div>
            <div className="outil__visuel" data-revele="" aria-hidden="true">
              <div className="maquette">
                <p className="maquette__barre"><span>A real scan result</span><b>mkz-consulting.fr</b></p>
                <div className="maquette__score">
                  <div className="anneau"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54"/><circle className="anneau__plein" cx="60" cy="60" r="54"/></svg><p><b>89</b><small>out of 100</small></p></div>
                  <ul className="barres">
                    <li><span>Technical</span><span>35/35</span><i style={{ "--v": "1" } as CSSProperties}></i></li>
                    <li><span>AI readability</span><span>35/35</span><i style={{ "--v": "1" } as CSSProperties}></i></li>
                    <li><span>Authority and Google rankings</span><span>19/30</span><i style={{ "--v": ".633" } as CSSProperties}></i></li>
                  </ul>
                </div>
                <ul className="maquette__priorites">
                  <li><em>OK</em>HTTPS and redirects</li>
                  <li><em>OK</em>AI crawlers allowed</li>
                  <li><em>OK</em>llms.txt served</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL 02 · empreinte (sombre) */}
      <section className="section s-teinte" id="empreinte" data-theme="sombre">
        <div className="enveloppe outil outil--inverse">
          <div className="outil__texte" data-revele="">
            <p className="outil__num">{empreinte.kicker}</p>
            <h2 className="titre-2">Footprint of <em className="degrade-rose">one AI query</em></h2>
            <p>{empreinte.desc}</p>
            <ul className="outil__liste">
              {empreinte.facts.map((f) => <li key={f}><svg aria-hidden="true"><use href="#i-coche"/></svg><span>{f}</span></li>)}
            </ul>
            <a className="bouton bouton--plein" href={empreinte.href} hrefLang="fr">{empreinte.cta}</a>
            <p className="outil__note">{empreinte.note}</p>
          </div>
          <div className="outil__visuel" data-revele="" aria-hidden="true">
            <div className="maquette">
              <p className="maquette__barre"><span>Sample simulation</span><b>Uncertainty ranges</b></p>
              <p className="maquette__champ"><small>Your query</small>Trouve-moi un plombier disponible à Meaux</p>
              <div className="maquette__choix">
                <p className="maquette__champ"><small>Model class</small>Small model</p>
                <p className="maquette__champ"><small>Region</small>France</p>
              </div>
              <ul className="jauges">
                <li><svg><use href="#i-eclair"/></svg><b>Energy</b><i style={{ "--a": ".12", "--b": ".42", "--m": ".26" } as CSSProperties}></i></li>
                <li><svg><use href="#i-globe"/></svg><b>CO2</b><i style={{ "--a": ".06", "--b": ".3", "--m": ".16" } as CSSProperties}></i></li>
                <li><svg><use href="#i-goutte"/></svg><b>Water</b><i style={{ "--a": ".18", "--b": ".56", "--m": ".34" } as CSSProperties}></i></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU VISUEL · la Terre la nuit, pour couper la page */}
      <div className="planete" aria-hidden="true">
        <img src="/images/accueil/terre-1200.webp" srcSet="/images/accueil/terre-1200.webp 1200w, /images/accueil/terre-2400.webp 2400w" sizes="100vw" width="2400" height="1597" loading="lazy" alt="" />
      </div>

      {/* WHY FREE TOOLS, puis la signature de Mickaël (une seule colonne) */}
      <section className="section s-lavande pourquoi" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <h2 className="titre-2">Why <em className="degrade">free tools</em>?</h2>
          </header>
          <div className="prose pourquoi__texte" data-revele="">
            {c.whyParagraphs.map((p, k) => <p key={k}>{enLigne(p)}</p>)}
          </div>
          <div className="signature" data-revele="">
            <img className="signature__photo" src="/images/charte/mickael-480.webp" width="480" height="480" loading="lazy" alt="Mickaël Leclerc, founder of MKZ" />
            <h2 className="titre-2">Rather talk to <em className="degrade">a human</em>?</h2>
            <p className="chapeau">{c.ctaText}</p>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{c.ctaButton}</a>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
