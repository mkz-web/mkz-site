// Page /referencement-ia/ à la nouvelle charte (maquette codée du 20/10/2026).
// Le texte vit aussi dans src/content/pillars/referencement-ia.ts (JSON-LD FAQPage, llms-full.txt) :
// scripts/controler-charte.mjs refuse le build si une phrase du contenu n'est plus affichée ici.
// Écarts voulus : FAQ générée depuis le contenu (source unique du visible et du JSON-LD), fiche Google
// lue dans avis-google.ts, liens internes en next/link, Calendly en nofollow.
// Composant GÉNÉRÉ depuis la maquette (referencement-ia.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import pillar from "@/content/pillars/referencement-ia";
import { ficheGoogle } from "@/content/avis-google";
import "@/components/charte/metier.css";

export default function PilierIa() {
  return (
    <ChartePage chemin="/referencement-ia/" classes="page-metier page-violet">
      {/* HERO · teinte violet-prune, comme la rangée « Référencement IA (GEO) » de l'accueil */}
      <section className="mhero v-bas" data-theme="sombre">
        <div className="enveloppe mhero__in">
          <div className="mhero__texte">
            <nav className="ariane" aria-label="Fil d'Ariane" data-entree=""><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">Référencement IA (GEO) · Seine-et-Marne et toute la France</span></nav>
            <p className="mhero__surtitre" data-entree=""><svg aria-hidden="true"><use href="#i-etincelle"/></svg>Référencement IA (GEO) · Seine-et-Marne et toute la France</p>
            <h1 className="titre-1" data-entree="">Référencement IA : <em className="degrade-chaud">devenez la source que ChatGPT cite</em></h1>
            <p className="mhero__intro" data-entree="">Vos clients ne tapent plus dix mots-clés, ils posent une question. Et l’IA ne répond pas par dix liens : elle donne une réponse, avec deux ou trois sources. Nous faisons en sorte que l’une d’elles soit vous.</p>
            <div className="hero__actions" data-entree="">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
              <a className="mhero__tel" href="tel:0769093909">ou 07 69 09 39 09</a>
            </div>
            <a className="note-google" href={ficheGoogle.url} target="_blank" rel="noopener" data-entree=""><span className="etoile" aria-hidden="true">★</span> 5,0 sur Google · 5 avis</a>
          </div>

          {/* Visuel : une question posée à une IA, sa réponse et ses sources (décoratives) */}
          <div className="mvisuel">
            <figure className="mvisuel__photo" data-entree="">
              <img src="/images/charte/photos/femme-travaille-ordinateur-portable-plante-cote-920x1050.webp" srcSet="/images/charte/photos/femme-travaille-ordinateur-portable-plante-cote-600x685.webp 600w, /images/charte/photos/femme-travaille-ordinateur-portable-plante-cote-920x1050.webp 920w" sizes="(max-width: 899px) 82vw, 460px" width="920" height="1050" fetchPriority="high" alt="Une femme travaille sur son ordinateur portable, une plante à côté d'elle" />
            </figure>
            <div className="mcarte mchat" aria-hidden="true" data-entree="">
              <p className="mchat__question">Un bon plombier vers Meaux ?</p>
              <div className="mchat__reponse"><svg><use href="#i-etincelle"/></svg><div className="mchat__lignes"><span></span><span></span><span></span></div></div>
              <ul className="mchat__sources"><li>Sources</li><li className="mchat__vous">votre-site.fr</li><li>annuaire</li><li>forum</li></ul>
            </div>
            <p className="mpastille mv-haut" aria-hidden="true" data-entree=""><svg><use href="#i-robot"/></svg>Robots IA autorisés</p>
            <div className="mcarte mcites" aria-hidden="true" data-entree="">
              <p className="mcarte__titre">Cité dans les réponses</p>
              <ul><li>ChatGPT<svg><use href="#i-coche"/></svg></li><li>Perplexity<svg><use href="#i-coche"/></svg></li><li>Google<svg><use href="#i-coche"/></svg></li></ul>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION ET SOMMAIRE */}
      <section className="section s-blanc apres-v intro" data-theme="clair">
        <div className="enveloppe intro__grille">
          <div className="intro__texte prose" data-revele="">
            <p className="petit intro__label">En bref</p>
            <p className="intro__chapeau">Pendant vingt ans, être visible voulait dire une chose : monter dans les dix liens bleus de Google. Aujourd’hui, un client tape sa question dans ChatGPT, Perplexity ou directement dans la réponse IA affichée en haut de Google. Il obtient un paragraphe et deux ou trois sources citées. <strong>Les sept autres n’existent pas.</strong></p>
            <p>Le <strong>référencement IA</strong>, qu’on appelle aussi GEO (Generative Engine Optimization), c’est le travail qui fait de votre entreprise l’une des sources citées. Ce n’est pas du SEO repeint : les moteurs classiques classent des pages, les moteurs IA choisissent des faits. Ce ne sont pas les mêmes critères.</p>
            <p>MKZ est basée à Dammartin-en-Goële, en Seine-et-Marne, et intervient partout en France. Nous appliquons la même méthode qu’en <Link href="/referencement-seo/">référencement naturel</Link> : zéro jargon, tarifs annoncés avant signature, résultats mesurés. Et surtout, mesurés vraiment : on vous montre les réponses des IA, pas des promesses.</p>
            <ul className="intro__points" aria-label="Points clés"><li><svg className="ico" aria-hidden="true"><use href="#i-robot"/></svg>Robots des IA vérifiés</li><li><svg className="ico" aria-hidden="true"><use href="#i-guillemets"/></svg>Des faits citables</li><li><svg className="ico" aria-hidden="true"><use href="#i-courbe"/></svg>Citations mesurées chaque mois</li></ul>
          </div>
          <nav className="sommaire-carte" aria-labelledby="sommaire" data-revele="">
            <p className="petit" id="sommaire">Sommaire</p>
            <ol>
              <li><a href="#referencement-ia-definition">Le référencement IA (GEO) expliqué sans jargon</a></li>
              <li><a href="#pourquoi-maintenant">Pourquoi s’y mettre maintenant, et pas dans un an</a></li>
              <li><a href="#ce-que-nous-faisons">Ce que nous faisons concrètement pour vous faire citer</a></li>
              <li><a href="#methode">Notre méthode, en trois étapes</a></li>
              <li><a href="#pour-qui">Est-ce que ça vaut le coup pour une TPE ?</a></li>
              <li><a href="#pourquoi-mkz">Pourquoi nous confier votre visibilité IA</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ol>
          </nav>
        </div>
      </section>

      {/* 01 · DÉFINITION (sombre) */}
      <section className="section bloc s-teinte" id="referencement-ia-definition" data-theme="sombre">
        <svg className="filigrane" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">01</p>
            <h2 className="titre-2">Le référencement IA (GEO) <em className="degrade">expliqué sans jargon</em></h2>
          </header>
          <div className="bloc__corps prose">
            <aside className="retenir definition definition--filet" data-revele="">
              <p className="petit">Définition</p>
              <p>Le <strong>référencement IA</strong>, ou <strong>GEO</strong> (Generative Engine Optimization), regroupe les techniques qui font citer une entreprise, ses contenus et ses chiffres dans les réponses générées par les intelligences artificielles : ChatGPT, Perplexity, Claude, Gemini, Mistral et les réponses IA affichées par Google.</p>
            </aside>
            <p data-revele="">Trois sigles circulent, souvent mélangés. Voilà la différence, en une ligne chacun :</p>
      <div className="tableau" data-revele="">
      <table>
      <caption>SEO, AEO et GEO : ce que chacun cherche à obtenir</caption>
      <thead><tr><th scope="col">Sigle</th><th scope="col">Objectif</th><th scope="col">Ce que vous gagnez</th></tr></thead>
      <tbody>
      <tr><td data-label="Sigle">SEO</td><td data-label="Objectif">Être classé dans les résultats de Google</td><td data-label="Ce que vous gagnez">Un lien cliquable en page 1</td></tr>
      <tr><td data-label="Sigle">AEO</td><td data-label="Objectif">Fournir la réponse directe (extrait, FAQ)</td><td data-label="Ce que vous gagnez">L’encadré en haut de page</td></tr>
      <tr className="fort"><td data-label="Sigle">GEO</td><td data-label="Objectif">Être repris comme source dans une réponse générée</td><td data-label="Ce que vous gagnez">Votre nom cité dans la réponse de l’IA</td></tr>
      </tbody></table></div>
            <p data-revele="">Vous n’avez pas à choisir. Le GEO ne remplace pas le SEO : une IA va chercher ses sources dans des pages que les moteurs ont déjà indexées. Un site invisible sur Google est invisible dans ChatGPT. Le socle reste le même, ce qui change, c’est ce qu’on met dessus.</p>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">À retenir</p>
              <p>Le SEO vous fait <strong>classer</strong>. Le GEO vous fait <strong>citer</strong>. Le premier sans le second, c’est un site bien référencé dont l’IA parle sans le nommer.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 · POURQUOI MAINTENANT (clair) */}
      <section className="section bloc s-blanc" id="pourquoi-maintenant" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">02</p>
            <h2 className="titre-2">Pourquoi s’y mettre <em className="degrade">maintenant</em>, et pas dans un an</h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Parce que la demande a basculé, et qu’elle a basculé en français. Volumes de recherche mensuels en France, relevés le 7 août 2026 via DataForSEO, en médiane des six derniers mois comparée aux six précédents :</p>
      <div className="tableau" data-revele="">
      <table>
      <caption>Recherches mensuelles en France, médiane sur 6 mois (mesuré le 07/08/2026, DataForSEO)</caption>
      <thead><tr><th scope="col">Requête</th><th scope="col" className="nombre">S2 2025</th><th scope="col" className="nombre">S1 2026</th><th scope="col" className="col-fort nombre">Évolution</th></tr></thead>
      <tbody>
      <tr><td data-label="Requête">geo seo</td><td data-label="S2 2025" className="nombre">2 650</td><td data-label="S1 2026" className="nombre">2 900</td><td data-label="Évolution" className="col-fort nombre"><span className="hausse">+9 %</span></td></tr>
      <tr><td data-label="Requête">agence geo</td><td data-label="S2 2025" className="nombre">1 300</td><td data-label="S1 2026" className="nombre">1 600</td><td data-label="Évolution" className="col-fort nombre"><span className="hausse">+23 %</span></td></tr>
      <tr><td data-label="Requête">seo ia</td><td data-label="S2 2025" className="nombre">435</td><td data-label="S1 2026" className="nombre">590</td><td data-label="Évolution" className="col-fort nombre"><span className="hausse">+36 %</span></td></tr>
      <tr><td data-label="Requête">référencement ia</td><td data-label="S2 2025" className="nombre">320</td><td data-label="S1 2026" className="nombre">480</td><td data-label="Évolution" className="col-fort nombre"><span className="hausse">+50 %</span></td></tr>
      <tr><td data-label="Requête">consultant geo</td><td data-label="S2 2025" className="nombre">170</td><td data-label="S1 2026" className="nombre">260</td><td data-label="Évolution" className="col-fort nombre"><span className="hausse">+53 %</span></td></tr>
      <tr><td data-label="Requête">formation geo</td><td data-label="S2 2025" className="nombre">215</td><td data-label="S1 2026" className="nombre">355</td><td data-label="Évolution" className="col-fort nombre"><span className="hausse">+65 %</span></td></tr>
      </tbody></table></div>
            <p data-revele="">Sur la même période et avec la même méthode, le vocabulaire anglais recule : « llmo » passe de 235 à 90 recherches (-62 %), « llm seo » de 175 à 100 (-43 %). Autrement dit, le marché français a cessé d’apprendre le jargon et s’est mis à <strong>chercher un prestataire</strong>. C’est exactement le moment où il faut être là.</p>
            <p data-revele="">Deuxième raison, plus terre à terre : la place est encore libre. Sur la requête « référencement IA », la page 1 de Google était occupée le 7 août 2026 par un guide de FranceNum et par des articles de blog. <strong>Aucune page de service d’agence.</strong> Ça ne durera pas.</p>
          </div>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Ce que nous faisons concrètement pour vous faire citer » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 03 · CE QUE NOUS FAISONS (sombre, pleine largeur) */}
      <section className="section bloc bloc--large s-marine" id="ce-que-nous-faisons" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">03</p>
            <h2 className="titre-2">Ce que nous faisons concrètement <em className="degrade-rose">pour vous faire citer</em></h2>
          </header>
          <div className="bloc__corps prose">
            <div className="coeur">
              <figure className="coeur__photo" data-revele="">
                <img src="/images/charte/photos/homme-concentre-travaille-ordinateur-portable-dans-880x1100.webp" srcSet="/images/charte/photos/homme-concentre-travaille-ordinateur-portable-dans-600x750.webp 600w, /images/charte/photos/homme-concentre-travaille-ordinateur-portable-dans-880x1100.webp 880w" sizes="(max-width: 899px) 92vw, 440px" width="880" height="1100" loading="lazy" alt="Un homme concentré travaille sur son ordinateur portable dans un bureau sombre" />
                <div className="mcarte coeur__robots" aria-hidden="true">
                  <p className="mcarte__titre">robots.txt réellement servi</p>
                  <ul><li>GPTBot<svg><use href="#i-coche"/></svg></li><li>ClaudeBot<svg><use href="#i-coche"/></svg></li><li>PerplexityBot<svg><use href="#i-coche"/></svg></li><li>Google-Extended<svg><use href="#i-coche"/></svg></li></ul>
                </div>
              </figure>
              <ol className="coeur__liste" data-revele-groupe="">
                <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-robot"/></svg></span><div><h3 className="titre-3">1. On ouvre la porte aux robots des IA</h3><p>Une IA ne peut pas vous citer si elle ne peut pas vous lire. GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot et Google-Extended sont des robots distincts de celui de Google, et beaucoup d’hébergeurs les bloquent <strong>par défaut, sans vous le dire</strong>. Nous vérifions le fichier robots.txt réellement servi par votre serveur, pas celui qui est censé s’y trouver. La nuance nous a déjà évité des mois perdus.</p><p>Vous pouvez d’ailleurs le vérifier sans nous : notre <Link href="/audit-seo/">audit SEO + IA gratuit en ligne</Link> lit le robots.txt que votre site sert réellement et vous dit en une minute si GPTBot, ClaudeBot et PerplexityBot passent, et si un llms.txt est servi.</p></div></li>
                <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-guillemets"/></svg></span><div><h3 className="titre-3">2. On rend vos faits citables</h3><p>Une IA reprend ce qu’elle peut extraire sans se tromper : une définition autonome en début de section, un chiffre avec sa source et sa date, un tableau lisible, une réponse qui tient en trois phrases. Nous réécrivons vos pages pour qu’un paragraphe pris isolément reste vrai et attribuable. C’est là que se joue l’essentiel du travail.</p></div></li>
                <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-code"/></svg></span><div><h3 className="titre-3">3. On installe le balisage que les machines lisent</h3><p>Données structurées schema.org (Organisation, Service, FAQ, fil d’Ariane), fichiers llms.txt et llms-full.txt qui présentent votre entreprise dans un format pensé pour les modèles, cohérence entre ce que dit votre site et ce que disent votre fiche Google et vos mentions ailleurs sur le web. Les IA recoupent : une incohérence, et elles préfèrent citer quelqu’un d’autre.</p></div></li>
                <li className="coeur__carte"><span className="coeur__ico"><svg aria-hidden="true"><use href="#i-courbe"/></svg></span><div><h3 className="titre-3">4. On mesure si vous êtes réellement cité</h3><p>C’est le point sur lequel nous ne transigeons pas. Poser une balise n’est pas être cité. Nous interrogeons les moteurs IA sur vos requêtes métier, nous relevons <strong>qui est cité et à quelle fréquence</strong>, et vous recevez cette part de voix chaque mois. Si le chiffre ne bouge pas, on vous le dit et on change de plan.</p></div></li>
              </ol>
            </div>
            <aside className="refus" data-revele="">
              <div className="refus__tete"><svg className="refus__ico" aria-hidden="true"><use href="#i-alerte"/></svg><p>Le piège que nous refusons</p></div>
              <div className="refus__corps">
                <p>Beaucoup de prestataires vendent du GEO en montrant que le balisage est en place. C’est mesurer le pansement, pas la plaie. La seule preuve valable, c’est la réponse de l’IA elle-même, capturée et datée.</p>
                <ul className="refus__duel" aria-hidden="true">
                  <li className="refus__non"><svg><use href="#i-croix"/></svg>Le balisage est en place</li>
                  <li className="refus__oui"><svg><use href="#i-coche"/></svg>La réponse de l’IA, capturée et datée</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* APPEL AU MILIEU DE LA PAGE */}
      <section className="cta-bande" data-theme="clair" aria-label="Vérifier si vous êtes cité">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe">
          <div className="cta-bande__in" data-theme="sombre" data-revele="">
            <div>
              <p className="cta-bande__titre">Vous êtes cité, ou pas ? <em className="degrade">On peut le vérifier en 30 minutes.</em></p>
              <p>Audit gratuit et sans engagement : nous interrogeons ChatGPT, Perplexity et Google sur vos requêtes métier devant vous, et vous repartez avec la liste de ce qui vous empêche d’être repris.</p>
            </div>
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
          </div>
        </div>
      </section>

      {/* 04 · MÉTHODE (noir), les trois étapes de l'accueil */}
      <section className="section s-noir" id="methode" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete" data-revele="">
            <p className="bloc__num" aria-hidden="true">04</p>
            <h2 className="titre-2">Notre méthode, <em className="degrade">en trois étapes</em></h2>
          </header>
          <ol className="etapes" data-revele-groupe="">
            <li className="etape"><span className="etape__num" aria-hidden="true">01</span><p><strong>Audit gratuit de 30 minutes</strong> : on regarde ensemble si les robots IA accèdent à votre site, ce que les moteurs IA répondent aujourd’hui quand on les interroge sur votre métier et votre ville, et qui ils citent à votre place.</p></li>
            <li className="etape"><span className="etape__num" aria-hidden="true">02</span><p><strong>Plan d’action chiffré</strong> : les corrections classées par effort et par impact, avec un budget annoncé avant signature. Vous savez ce que vous payez et pourquoi, ou vous partez avec le plan et vous le faites vous-même.</p></li>
            <li className="etape"><span className="etape__num" aria-hidden="true">03</span><p><strong>Exécution et mesure mensuelle</strong> : on applique, puis on relève chaque mois votre part de voix dans les réponses IA et vos positions Google. Un point clair, sans boîte noire.</p></li>
          </ol>
        </div>
      </section>

      <aside className="relance" data-theme="clair" aria-label="Une question ?">
        <div className="enveloppe relance__in" data-revele="">
          <img className="relance__avatar" src="/images/charte/mickael-160.webp" width="52" height="52" alt="" loading="lazy" />
          <p><strong>Une question sur « Est-ce que ça vaut le coup pour une TPE » ?</strong> Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair. Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</p>
          <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit gratuit</a>
        </div>
      </aside>

      {/* 05 · POUR QUI (sombre) */}
      <section className="section bloc s-teinte" id="pour-qui" data-theme="sombre">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">05</p>
            <h2 className="titre-2">Est-ce que ça vaut le coup <em className="degrade-chaud">pour une TPE</em> ?</h2>
          </header>
          <div className="bloc__corps prose">
            <p data-revele="">Pas toujours, et nous le disons avant de facturer. Le référencement IA rapporte quand vos clients se renseignent avant d’acheter : un artisan sur un chantier à 8 000 €, un avocat, un expert-comptable, un installateur de pompes à chaleur, une entreprise qui vend à d’autres entreprises. Là, le prospect pose une question à une IA avant de décrocher son téléphone.</p>
            <p data-revele="">En revanche, si votre activité se joue à l’urgence et à la proximité immédiate (une serrurerie de dépannage, un dépôt de pain), votre priorité reste votre fiche Google et le <Link href="/agence-web-77/">référencement local</Link>. Nous vous le dirons plutôt que de vous vendre du GEO.</p>
            <aside className="retenir" data-revele="">
              <svg className="retenir__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
              <p className="petit">Le bon ordre</p>
              <ol className="ordre" aria-hidden="true"><li>Site lisible et rapide</li><li>SEO</li><li>GEO</li></ol>
              <p>Site lisible et rapide, puis SEO, puis GEO. Faire du référencement IA sur un site que Google n’arrive pas à lire, c’est repeindre une façade sans fondations. Si votre site n’est pas à niveau, commencez par la <Link href="/creation-site-internet/">création ou la refonte</Link>.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 06 · POURQUOI MKZ (clair), avec le portrait de Mickaël */}
      <section className="section bloc s-blanc" id="pourquoi-mkz" data-theme="clair">
        <div className="enveloppe bloc__grille">
          <header className="bloc__tete" data-revele="">
            <p className="bloc__num" aria-hidden="true">06</p>
            <h2 className="titre-2">Pourquoi nous confier votre <em className="degrade">visibilité IA</em></h2>
            <figure className="portrait">
              <img src="/images/charte/mickael-480.webp" width="480" height="480" loading="lazy" alt="Mickaël Leclerc, fondateur de MKZ" />
              <figcaption>Mickaël Leclerc, fondateur.</figcaption>
            </figure>
          </header>
          <div className="bloc__corps prose">
            <ul className="engagements" data-revele-groupe="">
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-bulle"/></svg><p><strong>On parle français.</strong> Chaque terme technique est expliqué en une phrase. Vous ne signerez jamais pour quelque chose que vous n’avez pas compris.</p></li>
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-courbe"/></svg><p><strong>On mesure, on ne déduit pas.</strong> Un chiffre annoncé est un chiffre relevé, avec sa date et sa source. Y compris quand il ne va pas dans notre sens.</p></li>
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-tel"/></svg><p><strong>Je décroche.</strong> Contact direct avec le fondateur, Mickaël Leclerc, ingénieur IT depuis plus de 20 ans. Pas de ticket, pas de 72 heures d’attente.</p></li>
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-cle"/></svg><p><strong>Vous restez propriétaire à 100 %.</strong> Nom de domaine, site, contenus, comptes. On travaille ensemble parce que ça marche, pas parce que vous êtes coincé.</p></li>
              <li className="engagement"><svg className="ico" aria-hidden="true"><use href="#i-coche"/></svg><p><strong>On applique ce qu’on vend.</strong> Ce site publie ses propres llms.txt, ses données structurées, ses mesures, et un <Link href="/audit-seo/">audit SEO + IA en libre-service</Link> qui applique nos 20 mesures à n’importe quel site. Vous pouvez tout vérifier avant de nous appeler.</p></li>
            </ul>
            <p className="frise__pied frise__pied--clair" data-revele="">Le référencement IA s’ajoute au <strong>référencement naturel</strong>, il ne le remplace pas. Et nous ne promettons pas de chiffre avant de l’avoir mesuré, ni en SEO ni en GEO. La mesure, elle, est publique : le <Link href="/conseils/referencement-ia/mesurer-visibilite-ia/">protocole de mesure de la visibilité IA</Link> que nous appliquons est décrit pas à pas. Et depuis le 22 juillet 2026, les Aperçus IA de Google sont en France : voici <Link href="/conseils/referencement-ia/ai-overviews-france/">ce que ça change pour un artisan, relevé sur ses recherches</Link>.</p>
            <p data-revele="">Pour creuser le sujet avant de nous parler, nos guides sont en accès libre dans le cocon <Link href="/conseils/referencement-ia/">référencement IA</Link> de la newsroom.</p>
          </div>
        </div>
      </section>

      {/* QUESTIONS FRÉQUENTES */}
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
            <h2 className="titre-2"><em className="degrade">ChatGPT cite déjà quelqu’un</em> à votre place.</h2>
            <p className="chapeau">Audit gratuit de 30 minutes : on interroge les moteurs IA sur vos requêtes métier devant vous, et vous repartez avec la liste de ce qui vous empêche d’être cité.</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon audit IA gratuit</a>
            </div>
            <p className="appel__direct"><img className="appel__avatar" src="/images/charte/mickael-160.webp" width="40" height="40" alt="" loading="lazy" /><span>Ou appelez directement : <a href="tel:0769093909">07 69 09 39 09</a>. On décroche.</span></p>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
