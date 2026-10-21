// Page /audit-seo/ à la nouvelle charte (maquette codée du 20/10/2026).
// Écarts voulus : le formulaire du bandeau lance le vrai scan (AuditScan, formulaireExterne) ;
// sans JavaScript il envoie vers /audit-seo/?site=. Les résultats s'affichent dans une section
// sous le bandeau, au style de l'ancien outil (écran non dessiné dans la maquette). FAQ générée
// depuis la page (source unique du visible et du JSON-LD FAQPage).
// Composant GÉNÉRÉ depuis la maquette (audit-seo.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import AuditScan from "@/components/audit/AuditScan";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function AuditCharte({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <ChartePage chemin="/audit-seo/" classes="page-annexe page-violet">
      {/* BANDEAU · l'outil d'abord : champ d'adresse à gauche, exemple de rapport à droite */}
      <section className="audit-hero" data-theme="clair">
        <div className="enveloppe audit-hero__in">
          <div>
            <p className="audit-hero__sur" data-entree="">Outil gratuit</p>
            <h1 data-entree="">Audit SEO gratuit : votre site, <em className="degrade">mesuré</em>, pas estimé.</h1>
            <p className="audit-hero__intro" data-entree="">Entrez votre adresse. En une minute, l’outil fait 20 mesures réelles : votre technique, votre lisibilité par Google, et ce que personne ne vous montre, votre lisibilité par les IA comme ChatGPT et Perplexity. Un score clair, vos priorités, zéro inscription.</p>
            <div className="audit-form" data-entree="">
              <form id="audit-form-charte" action="/audit-seo/" method="get">
                <label htmlFor="audit-url">L’adresse de votre site</label>
                <input id="audit-url" name="site" type="text" inputMode="url" autoComplete="url" placeholder="votre-site.fr" required />
                <button className="bouton bouton--plein" type="submit">Lancer l’audit gratuit</button>
              </form>
            </div>
          </div>
          <div className="audit-hero__visuel" aria-hidden="true" data-entree="">
            <div className="maquette">
              <p className="maquette__barre"><span>Exemple : résultat d’un scan réel</span><b>mkz-consulting.fr</b></p>
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
      </section>

      {/* Résultats du scan : section absente tant qu'aucun scan n'est lancé */}
      <AuditScan locale="fr" formulaireExterne="audit-form-charte" />

      {/* CE QUE L'OUTIL MESURE (sombre) */}
      <section className="section s-marine" data-theme="sombre">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">Ce que l’outil <em className="degrade">mesure</em></h2></header>
          <ul className="mesures" data-revele-groupe="">
            <li className="mesure"><span className="mesure__ico" aria-hidden="true"><svg><use href="#i-bouclier"/></svg></span><h3 className="titre-3">Technique et hygiène SEO</h3><p>HTTPS et redirections, indexabilité, vraie page 404, balises title et description aux longueurs que Google affiche réellement, titres, affichage mobile, en-têtes de sécurité.</p></li>
            <li className="mesure"><span className="mesure__ico" aria-hidden="true"><svg><use href="#i-robot"/></svg></span><h3 className="titre-3">Lisibilité par les IA</h3><p>Les 6 principaux robots IA (GPTBot, ClaudeBot, PerplexityBot...) peuvent-ils lire votre site ? Votre llms.txt existe-t-il ? Vos données structurées sont-elles valides ? Un robot bloqué, c’est un moteur de réponse qui ne peut pas vous citer.</p></li>
            <li className="mesure"><span className="mesure__ico" aria-hidden="true"><svg><use href="#i-courbe"/></svg></span><h3 className="titre-3">Autorité et positions Google</h3><p>Domaines qui pointent vers vous, score de spam de vos liens, mots-clés où Google France vous affiche, trafic organique estimé : lus dans la base DataForSEO au moment du test. C’est la partie que les outils gratuits cachent derrière une inscription.</p></li>
          </ul>
        </div>
      </section>

      {/* MESURÉ, JAMAIS ESTIMÉ (clair) */}
      <section className="section s-blanc" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">Mesuré, <em className="degrade-prune">jamais estimé</em></h2></header>
          <div className="prose pourquoi__texte" data-revele="">
            <p>La plupart des outils gratuits vous servent une note sortie d’une base de données vieille de trois semaines. Ici, chaque vérification est faite sur votre site au moment où vous cliquez : l’outil se connecte, lit votre robots.txt réellement servi, teste une adresse inventée pour voir si votre page 404 fait son travail, et décortique votre page d’accueil. Ce que vous lisez à l’écran, c’est ce que votre site a répondu il y a quelques secondes. Seule exception, et elle est écrite noir sur blanc : vos liens entrants et vos positions ne se lisent pas sur votre site, l’outil les relève dans la base DataForSEO, la même que celle de nos audits.</p>
            <p>Le scan est la version express de notre méthode d’audit. La version complète va plus loin : analyse de la concurrence, mots-clés à viser, mesure réelle de ce que ChatGPT, Perplexity et Gemini disent de vous, et plan d’action priorisé. Le scan vous dit où vous en êtes. L’audit complet vous dit quoi faire, dans quel ordre, et pourquoi.</p>
          </div>
          <p className="audit-liens" data-revele="">Pour aller plus loin : <span><Link href="/conseils/seo/pourquoi-mon-site-n-apparait-pas-sur-google/">pourquoi votre site n’apparaît pas sur Google (les 7 causes)</Link></span><span> · <Link href="/conseils/seo/audit-seo/">notre guide complet de l’audit SEO</Link></span><span> · <Link href="/referencement-seo/">la prestation de référencement SEO</Link></span><span> · <Link href="/referencement-ia/">le référencement IA (GEO)</Link></span><span> · <Link href="/tarifs/">les tarifs de l’audit complet</Link></span></p>
        </div>
      </section>

      {/* QUESTIONS FRÉQUENTES */}
      <section className="section section--serree faq-section" id="faq" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete"><h2 className="titre-2">Questions <em className="degrade-rose">fréquentes</em></h2></header>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* UN HUMAIN PLUTÔT QU'UN OUTIL */}
      <section className="section s-lavande" data-theme="clair">
        <div className="enveloppe">
          <div className="signature signature--seule" data-revele="">
            <img className="signature__photo" src="/images/charte/mickael-480.webp" width="480" height="480" loading="lazy" alt="Mickaël Leclerc, fondateur de MKZ" />
            <h2 className="titre-2">Un humain plutôt <em className="degrade">qu’un outil</em> ?</h2>
            <p className="chapeau">30 minutes gratuites avec Mickaël : on regarde votre scan ensemble, vous repartez avec un plan d’action concret. Que vous travailliez avec nous ou non.</p>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mes 30 minutes gratuites</a>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
