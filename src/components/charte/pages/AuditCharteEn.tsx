// Page /en/seo-audit/ à la nouvelle charte (22/10/2026) : gabarit de la page d'audit de la maquette
// codée du 20/10/2026 (outil d'abord, exemple de rapport, ce que l'outil mesure, mesuré jamais
// estimé, FAQ, signature), textes de l'objet `content` et de la FAQ de (en)/en/seo-audit/page.tsx,
// les mêmes que l'ancienne page. Le formulaire du bandeau lance le vrai scan (AuditScan) ; sans
// JavaScript il envoie vers /en/seo-audit/?site=. FAQ visible et JSON-LD FAQPage de la même source.
import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY, ui } from "@/lib/i18n";
import type { AuditFaqItem, AuditPageContent } from "@/components/audit/AuditContent";
import ChartePage from "@/components/charte/ChartePage";
import AuditScan from "@/components/audit/AuditScan";
import { enLigne } from "@/components/charte/contenu";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

const PICTOS = ["#i-bouclier", "#i-robot", "#i-courbe"];

export default function AuditCharteEn({ content: c, faq }: { content: AuditPageContent; faq: AuditFaqItem[] }) {
  const a = ui.en.audit;
  return (
    <ChartePage chemin="/en/seo-audit/" classes="page-annexe page-violet" locale="en">
      {/* BANDEAU · l'outil d'abord : champ d'adresse à gauche, exemple de rapport à droite */}
      <section className="audit-hero" data-theme="clair">
        <div className="enveloppe audit-hero__in">
          <div>
            <p className="audit-hero__sur" data-entree="">{c.kicker}</p>
            <h1 data-entree="">{c.h1Before}<em className="degrade">{c.h1Em}</em>{c.h1After}</h1>
            <p className="audit-hero__intro" data-entree="">{c.sub}</p>
            <div className="audit-form" data-entree="">
              <form id="audit-form-charte" action="/en/seo-audit/" method="get">
                <label htmlFor="audit-url">{a.urlLabel}</label>
                <input id="audit-url" name="site" type="text" inputMode="url" autoComplete="url" placeholder={a.urlPlaceholder} required />
                <button className="bouton bouton--plein" type="submit">{a.start}</button>
              </form>
            </div>
          </div>
          <div className="audit-hero__visuel" aria-hidden="true" data-entree="">
            <div className="maquette">
              <p className="maquette__barre"><span>Example: a real scan result</span><b>mkz-consulting.fr</b></p>
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
      </section>

      {/* Résultats du scan : section absente tant qu'aucun scan n'est lancé */}
      <AuditScan locale="en" formulaireExterne="audit-form-charte" />

      {/* WHAT THE TOOL MEASURES (sombre) */}
      <section className="section s-marine" data-theme="sombre">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">What the tool <em className="degrade">measures</em></h2></header>
          <ul className="mesures" data-revele-groupe="">
            {c.measures.map((m, k) => (
              <li key={m.title} className="mesure"><span className="mesure__ico" aria-hidden="true"><svg><use href={PICTOS[k] ?? "#i-coche"}/></svg></span><h3 className="titre-3">{m.title}</h3><p>{m.text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* MEASURED, NEVER ESTIMATED (clair) */}
      <section className="section s-blanc" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">Measured, <em className="degrade-prune">never estimated</em></h2></header>
          <div className="prose pourquoi__texte" data-revele="">
            {c.methodParagraphs.map((p, k) => <p key={k}>{enLigne(p)}</p>)}
          </div>
          {c.nextLinks && (
            <p className="audit-liens" data-revele="">{c.nextLinks.intro} {c.nextLinks.links.map((l, k) => (
              <span key={l.href}>{k > 0 ? " · " : ""}<Link href={l.href}>{l.label}</Link></span>
            ))}</p>
          )}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="section section--serree faq-section" id="faq" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete"><h2 className="titre-2">Frequently asked <em className="degrade-rose">questions</em></h2></header>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* RATHER TALK TO A HUMAN? */}
      <section className="section s-lavande" data-theme="clair">
        <div className="enveloppe">
          <div className="signature signature--seule" data-revele="">
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
