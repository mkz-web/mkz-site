// Page /audit-geo/ : l'audit GEO gratuit (17/11/2026). La page reprend les composants de la charte
// déjà dessinés pour /audit-seo/ (bandeau d'outil,
// cartes « mesures », prose, questions, signature), avec un formulaire à quatre champs aux libellés
// visibles (styles « Intégration (17/11/2026) » de pages.css).
// Le formulaire lance le test en direct (AuditGeoScan) ; sans JavaScript il renvoie vers la page
// avec ses champs dans l'adresse, où le formulaire est prérempli : c'est toujours un clic qui lance.
// L'exemple du bandeau est un test réel sur mkz-consulting.fr (relevé du 17/11/2026 : cité sur la
// première demande, absent de la deuxième, site présent parmi les sources de la troisième). À
// refaire si les questions du moteur changent : node scripts/test-audit-geo.mjs --reel …
// FAQ générée depuis la page (source unique du visible et du JSON-LD FAQPage).

import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import AuditGeoScan from "@/components/audit/AuditGeoScan";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function AuditGeoCharte({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <ChartePage chemin="/audit-geo/" classes="page-annexe page-violet">
      {/* BANDEAU · l'outil d'abord */}
      <section className="audit-hero" data-theme="clair">
        <div className="enveloppe audit-hero__in">
          <div>
            <p className="audit-hero__sur" data-entree="">Outil gratuit · test en direct</p>
            <h1 data-entree="">Audit GEO gratuit&nbsp;: ChatGPT <em className="degrade">cite-t-il</em>{" "}votre entreprise&nbsp;?</h1>
            <p className="audit-hero__intro" data-entree="">Vos clients demandent déjà un nom à une IA. Ce test pose trois questions à ChatGPT, comme le ferait l’un d’eux, et vous montre la réponse : votre entreprise y est, ou d’autres y sont à sa place. Une minute, sans inscription.</p>
            <div className="audit-geo-form" data-entree="">
              <form id="audit-geo-form" action="/audit-geo/" method="get">
                <p>
                  <label htmlFor="geo-site">Votre site</label>
                  <input id="geo-site" name="site" type="text" inputMode="url" autoComplete="url" placeholder="votre-site.fr" required />
                </p>
                <p>
                  <label htmlFor="geo-nom">Le nom de votre entreprise</label>
                  <input id="geo-nom" name="nom" type="text" autoComplete="organization" placeholder="Dupont Plomberie" minLength={2} maxLength={60} required />
                </p>
                <p>
                  <label htmlFor="geo-metier">Votre métier</label>
                  <input id="geo-metier" name="metier" type="text" autoComplete="off" placeholder="plombier chauffagiste" minLength={2} maxLength={60} required />
                </p>
                <p>
                  <label htmlFor="geo-zone">Votre ville ou votre zone</label>
                  <input id="geo-zone" name="zone" type="text" autoComplete="address-level2" placeholder="Meaux" minLength={2} maxLength={60} required />
                </p>
                <button className="bouton bouton--plein" type="submit">Poser les trois questions</button>
                <p className="audit-geo-form__note">Gratuit. Les réponses s’affichent ici, en une minute environ.</p>
              </form>
            </div>
          </div>
          <div className="audit-hero__visuel" aria-hidden="true" data-entree="">
            <div className="maquette maquette--geo">
              <p className="maquette__barre"><span>Exemple : un test réel</span><b>mkz-consulting.fr</b></p>
              <p className="maquette__champ"><small>Question posée à l’IA</small>Je cherche un prestataire pour : consultant SEO. Zone : Seine-et-Marne. Quelles entreprises me recommandes-tu ?</p>
              <ul className="maquette__priorites">
                <li><em>Cité</em>Première demande de recommandation</li>
                <li><em>Pas cité</em>Deuxième demande, formulée autrement</li>
                <li><em>Source</em>Question sur l’entreprise elle-même</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats du test : section absente tant qu'aucun test n'est lancé */}
      <AuditGeoScan formulaire="audit-geo-form" />

      {/* CE QUE LE TEST MESURE (sombre) */}
      <section className="section s-marine" data-theme="sombre">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">Ce que le test <em className="degrade">mesure</em></h2></header>
          <ul className="mesures" data-revele-groupe="">
            <li className="mesure"><span className="mesure__ico" aria-hidden="true"><svg><use href="#i-bulle"/></svg></span><h3 className="titre-3">Qui l’IA recommande</h3><p>« Je cherche un prestataire pour votre métier, dans votre zone. » La question est posée deux fois, de deux façons, sans jamais nommer votre entreprise. Le test relève si votre site ou votre nom sortent dans la réponse, et quels sites y sont cités.</p></li>
            <li className="mesure"><span className="mesure__ico" aria-hidden="true"><svg><use href="#i-loupe"/></svg></span><h3 className="titre-3">Ce qu’elle sait de vous</h3><p>« Que sais-tu de cette entreprise ? » Ici, c’est la source qui compte : l’IA s’appuie-t-elle sur votre propre site pour parler de vous, ou sur ce que d’autres en disent ? Qui tient la plume change tout ce qui suit.</p></li>
            <li className="mesure"><span className="mesure__ico" aria-hidden="true"><svg><use href="#i-robot"/></svg></span><h3 className="titre-3">Si elle peut vous lire</h3><p>Les robots des moteurs IA (GPTBot, ClaudeBot, PerplexityBot…) peuvent-ils lire votre site ? Le fichier llms.txt existe-t-il ? Les données structurées sont-elles valides ? Mesuré sur votre site, pendant que les questions partent.</p></li>
          </ul>
        </div>
      </section>

      {/* MESURÉ, PAS DEVINÉ (clair) */}
      <section className="section s-blanc" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">Mesuré, <em className="degrade-prune">pas deviné</em></h2></header>
          <div className="prose pourquoi__texte" data-revele="">
            <p>Le GEO (Generative Engine Optimization), ou référencement IA, c’est le travail qui amène une IA comme ChatGPT à citer votre entreprise quand on lui demande un nom. La plupart des outils gratuits d’audit GEO notent des critères techniques : un fichier présent, un robot autorisé. C’est utile, et ce test le fait aussi. Mais cocher les cases d’un contrôle technique ne dit pas si la voiture roule. Alors ce test fait aussi le tour du pâté de maisons : il pose la question, et il lit la réponse.</p>
            <p>Les questions partent à un modèle d’OpenAI, l’éditeur de ChatGPT, avec la recherche web activée. La réponse affichée est celle qui est revenue, sans retouche. Une limite, écrite en clair : une IA ne répond pas deux fois pareil. Trois questions posées une fois, c’est un sondage, pas un verdict. L’audit complet de référencement IA pose vingt questions à quatre moteurs (ChatGPT, Perplexity, Gemini et les aperçus IA de Google), trois fois chacune, et c’est cette répétition qui donne un chiffre solide.</p>
          </div>
          <p className="audit-liens" data-revele="">Pour aller plus loin : <span><Link href="/conseils/referencement-ia/etre-cite-par-chatgpt/">comment être cité par ChatGPT, Perplexity et Gemini</Link></span><span> · <Link href="/conseils/referencement-ia/mesurer-visibilite-ia/">mesurer si les IA parlent de vous</Link></span><span> · <Link href="/referencement-ia/">la prestation de référencement IA (GEO)</Link></span><span> · <Link href="/audit-seo/">l’audit SEO gratuit</Link></span><span> · <Link href="/tarifs/">les tarifs de l’audit complet</Link></span></p>
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
            <h2 className="titre-2">On lit vos réponses <em className="degrade">ensemble</em> ?</h2>
            <p className="chapeau">30 minutes gratuites avec Mickaël : on regarde ce que l’IA a répondu sur votre métier, pourquoi, et ce qui peut le changer. Que vous travailliez avec nous ou non.</p>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mes 30 minutes gratuites</a>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
