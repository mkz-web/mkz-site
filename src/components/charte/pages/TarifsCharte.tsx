// Page /tarifs/ à la nouvelle charte (maquette codée du 20/10/2026), ADAPTÉE à la
// grille mensuelle unique du 21/10/2026 (Suivi 290, Essentiel 590, Croissance 890 € HT/mois) :
// les blocs « Accompagnement SEO mensuel » et « Référencement IA mensuel » de la maquette sont
// remplacés par la section 04 « Accompagnement mensuel », dessinée avec ses composants ; ticket du
// bandeau, sommaire, chapeaux SEO et IA et repères marché suivent (textes de TarifsContent.tsx).
// FAQ générée depuis la page (source unique du visible et du JSON-LD FAQPage). Les prix vivent
// aussi à d'autres endroits : liste dans AGENTS.md, section « Offre référencement IA ».
// Composant GÉNÉRÉ depuis la maquette (tarifs.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import Link from "next/link";
import { CALENDLY } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function TarifsCharte({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <ChartePage chemin="/tarifs/" classes="page-annexe page-nuit">
      {/* BANDEAU · étiquettes : titre centré, prix phares en tickets */}
      <section className="affiche" data-theme="clair">
        <div className="enveloppe affiche__in">
          <p className="affiche__sur" data-entree="">Tarifs 2026</p>
          <h1 data-entree="">Nos tarifs : <em className="degrade">site internet, SEO, référencement IA</em></h1>
          <p className="affiche__intro" data-entree="">La plupart des prestataires cachent leurs prix. Nous, on les affiche. Chaque tarif ci-dessous est un prix de base réel, en euros HT, confirmé par un <strong>devis fixe écrit avant toute signature</strong> : le prix annoncé est le prix payé. Et tout commence par un <Link href="/contact/">diagnostic gratuit de 30 minutes</Link>, sans engagement. Pressé ? Notre <Link href="/audit-seo/">audit SEO gratuit en ligne</Link> mesure votre site en une minute, sans inscription.</p>
        </div>
        <ul className="tickets enveloppe" aria-hidden="true" data-revele-groupe="">
          <li className="ticket"><small>Site vitrine « Pro »</small><b>1 490 €</b><span>5 à 8 pages, textes inclus</span></li>
          <li className="ticket"><small>Audit SEO complet</small><b>490 €</b><span>Plan d’action priorisé</span></li>
          <li className="ticket"><small>Accompagnement Google + IA</small><b>590 €</b><span>HT par mois, sans engagement</span></li>
          <li className="ticket"><small>Test référencement IA</small><b>Gratuit</b><span>Votre nom sort-il ?</span></li>
        </ul>
      </section>

      <nav className="sous-nav" aria-label="Sur cette page">
        <ul className="enveloppe">
          <li><a href="#creation-site">Création de site</a></li>
          <li><a href="#seo">Référencement SEO</a></li>
          <li><a href="#referencement-ia">Référencement IA</a></li>
          <li><a href="#accompagnement">Accompagnement mensuel</a></li>
          <li><a href="#pack">Pack Décollage</a></li>
          <li><a href="#marche">Repères marché</a></li>
          <li><a href="#faq">Questions</a></li>
        </ul>
      </nav>

      {/* GARANTIES (sombre) */}
      <section className="section section--serree s-nuit-profonde" data-theme="sombre" aria-label="Nos engagements">
        <div className="enveloppe garanties" data-revele-groupe="">
          <div className="garantie"><svg className="ico" aria-hidden="true"><use href="#i-cle"/></svg><p className="titre-3">Propriétaire à 100 %</p><p>Site, nom de domaine, contenus, accès : tout est à vous. Coût de sortie : 0 €.</p></div>
          <div className="garantie"><svg className="ico" aria-hidden="true"><use href="#i-doc"/></svg><p className="titre-3">Devis fixe écrit</p><p>Le prix est posé noir sur blanc avant de commencer, et il ne bouge plus.</p></div>
          <div className="garantie"><svg className="ico" aria-hidden="true"><use href="#i-libre"/></svg><p className="titre-3">Sans engagement</p><p>Les prestations mensuelles s’arrêtent quand vous voulez, préavis de 30 jours.</p></div>
          <div className="garantie"><svg className="ico" aria-hidden="true"><use href="#i-courbe"/></svg><p className="titre-3">Résultats mesurés</p><p>Chaque rapport contient des chiffres relevés : positions, visites, citations par les IA.</p></div>
        </div>
      </section>

      {/* 01 · CRÉATION DE SITE (clair) */}
      <section className="section s-blanc" id="creation-site" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <p className="surtitre">01 · Création de site</p>
            <h2 className="titre-2">Créer votre <em className="degrade">site internet</em></h2>
            <p className="chapeau">Ici, on ne livre pas « un site » : on livre un <strong>service packagé</strong>. Chaque formule part avec son optimisation SEO complète et ses premiers liens entrants, parce qu’un site sans référencement est une carte de visite rangée dans un tiroir. Le détail est sur la page <Link className="lien" href="/creation-site-internet/">création de site internet</Link>.</p>
          </header>
          <div className="offres offres--5" data-revele-groupe="">
            <article className="offre"><h3 className="titre-3">Site une page « Présence »</h3><p className="offre__texte">Une seule page qui dit l’essentiel : votre activité, vos services, votre zone d’intervention, vos avis clients, un formulaire de contact. Livré en 2 semaines.</p><p className="offre__prix">590 €</p></article>
            <article className="offre offre--phare"><span className="offre__badge">Recommandé</span><h3 className="titre-3">Site vitrine « Pro », 5 à 8 pages</h3><p className="offre__texte">Le format qui convient à la plupart des artisans, commerces et TPE : accueil, pages services, réalisations, contact. Rédaction des textes incluse.</p><p className="offre__prix">1 490 €</p></article>
            <article className="offre"><h3 className="titre-3">Site vitrine « Premium », 10 à 15 pages</h3><p className="offre__texte">Design personnalisé, pages par métier et par ville, version anglaise possible. Pour viser la première place sur votre marché local.</p><p className="offre__prix">2 490 €</p></article>
            <article className="offre"><h3 className="titre-3">Site e-commerce (WooCommerce)</h3><p className="offre__texte">Catalogue, panier, paiement sécurisé, gestion des commandes et des stocks, formation à la prise en main.</p><p className="offre__prix"><small>à partir de</small>2 990 €</p></article>
            <article className="offre"><h3 className="titre-3">Refonte de site existant</h3><p className="offre__texte">Reprise d’un site vieillissant sans rien perdre : contenus migrés, redirections soignées, référencement préservé. Prix fixé après le diagnostic gratuit.</p><p className="offre__prix"><small>à partir de</small>990 €</p></article>
          </div>
          <div className="inclus" data-revele="">
            <p className="inclus__titre">Inclus dans chaque site, sans supplément : le package complet</p>
            <ul>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span><strong>Optimisation SEO dès le départ</strong> : mots-clés mesurés, titres et balises optimisés, vitesse, sitemap, Google Search Console configurée. Le site part déjà armé pour Google.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span><strong>Vos premiers liens entrants</strong> : fiche Google Business reliée au site, inscription aux annuaires de référence de votre métier et de votre ville. Votre socle d’autorité démarre au jour 1.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span><strong>Pensé mobile d’abord</strong> : votre site s’affiche parfaitement sur téléphone, là où vos clients vous cherchent.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span><strong>Prêt pour les moteurs IA</strong> : balisage JSON-LD et fichier llms.txt, pour être lisible par ChatGPT et Perplexity, pas seulement par Google.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span><strong>Conformité RGPD</strong> et mentions légales.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span><strong>Formation d’une heure</strong> à la prise en main, et 30 jours de corrections après la mise en ligne.</span></li>
              <li><svg aria-hidden="true"><use href="#i-coche"/></svg><span><strong>Nom de domaine déposé à votre nom</strong>, jamais au nôtre.</span></li>
            </ul>
          </div>
          <h3 className="formules__titre" data-revele="">Maintenance : votre site reste à jour et en bonne santé</h3>
          <div className="formules" data-revele-groupe="">
            <div className="formule"><h3 className="titre-3">Essentiel</h3><p className="formule__prix">29 € HT/mois</p><ul><li>Mises à jour et sauvegardes</li><li>Surveillance de disponibilité</li><li>Certificat de sécurité</li></ul></div>
            <div className="formule formule--phare"><h3 className="titre-3">Sérénité</h3><p className="formule__prix">59 € HT/mois</p><ul><li>Tout Essentiel</li><li>1 h de modifications par mois</li><li>Réponse sous 48 h ouvrées</li></ul></div>
            <div className="formule"><h3 className="titre-3">Partenaire</h3><p className="formule__prix">99 € HT/mois</p><ul><li>Tout Sérénité</li><li>3 h d’évolutions par mois</li><li>Point trimestriel sur vos chiffres</li></ul></div>
          </div>
          <p className="note-prix" data-revele="">Sans engagement de durée. Repère marché 2026 : de 39 à 290 €/mois, et de 100 à 500 €/mois en agence.</p>
          <div className="ligne-appel" data-revele=""><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Parler de mon site, 30 min gratuites</a><p>ou <a href="tel:+33769093909">07 69 09 39 09</a>, on décroche</p></div>
        </div>
      </section>

      {/* 02 · RÉFÉRENCEMENT SEO (sombre) */}
      <section className="section s-teinte" id="seo" data-theme="sombre">
        <svg className="filigrane" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <p className="surtitre">02 · Référencement SEO</p>
            <h2 className="titre-2">Être trouvé <em className="degrade">sur Google</em></h2>
            <p className="chapeau">Audit d’abord, <a className="lien" href="#accompagnement">accompagnement</a> ensuite : on ne vend pas un abonnement avant d’avoir mesuré où vous en êtes. La méthode complète est sur la page <Link className="lien" href="/referencement-seo/">référencement SEO</Link>.</p>
          </header>
          <div className="offres offres--2x2" data-revele-groupe="">
            <article className="offre"><h3 className="titre-3">Diagnostic de 30 minutes</h3><p className="offre__texte">Un échange en visio et un premier relevé chiffré de votre visibilité. Sans engagement.</p><p className="offre__prix">Gratuit</p></article>
            <article className="offre offre--phare"><h3 className="titre-3">Audit SEO complet</h3><p className="offre__texte">Technique, contenus, concurrence, plan d’action priorisé, restitution d’une heure en visio. Sites jusqu’à 30 pages, au-delà sur devis. L’audit est déduit de votre première facture si vous démarrez un accompagnement dans les 30 jours.</p><p className="offre__prix">490 €</p></article>
            <article className="offre"><h3 className="titre-3">Audit SEO + audit référencement IA</h3><p className="offre__texte">Les deux audits ensemble : Google d’un côté, ChatGPT, Perplexity, Gemini et les aperçus IA de Google de l’autre (détail en <a className="lien" href="#referencement-ia">section 03</a>). 1 280 € séparément.</p><p className="offre__prix">1 090 €</p></article>
            <article className="offre"><h3 className="titre-3">Pack visibilité locale</h3><p className="offre__texte">Fiche Google Business optimisée, coordonnées cohérentes sur les annuaires qui comptent, méthode de collecte d’avis clients. Option suivi mensuel (publications, avis, photos, rapport) : 99 €/mois.</p><p className="offre__prix">390 €</p></article>
          </div>
          <div className="carte-sup" data-revele="">
            <p className="petit">À la carte</p>
            <ul>
              <li><strong>Article SEO à l’unité</strong> : 1 200 mots et plus, mots-clés mesurés, maillage interne, balisage complet : <strong>199 €</strong>.</li>
              <li><strong>Netlinking en toute transparence</strong> : chaque lien choisi à la main, son prix d’achat refacturé à l’euro près, plus <strong>70 € de sélection et de pose par lien</strong>. Budget conseillé : 150 à 500 €/mois selon votre concurrence.</li>
            </ul>
          </div>
          <div className="ligne-appel" data-revele=""><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Parler de mon SEO, 30 min gratuites</a><p>ou <a href="tel:+33769093909">07 69 09 39 09</a>, on décroche</p></div>
        </div>
      </section>

      {/* 03 · RÉFÉRENCEMENT IA (clair) */}
      <section className="section s-blanc" id="referencement-ia" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <p className="surtitre">03 · Référencement IA (GEO)</p>
            <h2 className="titre-2">Être cité <em className="degrade-prune">par les IA</em></h2>
            <p className="chapeau">Vos clients posent déjà leurs questions à ChatGPT ou Perplexity. Le <Link className="lien" href="/referencement-ia/">référencement IA</Link>, aussi appelé GEO, consiste à faire de votre entreprise la réponse que ces moteurs citent. Trouvé sur Google, cité par les IA : chaque résultat est mesuré, pas promis. Dans l’<a className="lien" href="#accompagnement">accompagnement mensuel</a>, les mêmes questions sont reposées chaque mois, à l’identique, et le tableau dit ce qui a bougé.</p>
          </header>
          <div className="offres" data-revele-groupe="">
            <article className="offre"><h3 className="titre-3">Test « Votre nom sort-il ? »</h3><p className="offre__texte">Cinq questions qu’un de vos clients poserait, posées à ChatGPT et à Perplexity. Sous 48 h ouvrées, une page : votre nom sort-il, qui sort à votre place, et quelles pages ces moteurs lisent pour répondre.</p><p className="offre__prix">Gratuit</p></article>
            <article className="offre offre--phare"><h3 className="titre-3">Audit référencement IA</h3><p className="offre__texte">Vingt questions de vos clients, posées à ChatGPT, Perplexity, Gemini et aux aperçus IA de Google, trois fois chacune, parce que les réponses changent d’un appel à l’autre. Qui est cité à votre place et d’où vient chaque citation, accès des robots IA vérifié sur le site en ligne, contenus citables page par page, plan d’action sur 90 jours, restitution d’une heure en visio. Déduit de votre première facture si un accompagnement démarre dans les 30 jours.</p><p className="offre__prix">790 €</p></article>
            <article className="offre"><h3 className="titre-3">Socle technique IA</h3><p className="offre__texte">Fichier llms.txt, données structurées, robots IA autorisés, données chiffrées citables. Déjà inclus dans tout site créé par MKZ.</p><p className="offre__prix">390 €</p></article>
          </div>
          <div className="ligne-appel" data-revele=""><Link className="bouton bouton--plein" href="/contact/?sujet=Test%20gratuit%20%C2%AB%20Votre%20nom%20sort-il%20%3F%20%C2%BB">Demander le test gratuit</Link><p>ou <a href="tel:+33769093909">07 69 09 39 09</a>, on décroche</p></div>
        </div>
      </section>

      {/* 04 · ACCOMPAGNEMENT MENSUEL : grille unique Google + IA du 21/10/2026 (absente de la maquette du 20/10,
          dessinée avec ses composants : en-tête de section, formules à trois colonnes, note, ligne d'appel) */}
      <section className="section s-lavande" id="accompagnement" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <p className="surtitre">04 · Accompagnement mensuel</p>
            <h2 className="titre-2">Trouvé sur Google, <em className="degrade">cité par les IA</em></h2>
            <p className="chapeau">Une seule formule pour les deux, parce que le travail est le même : des contenus qui répondent clairement, avec des chiffres sourcés et datés, un site techniquement propre, des mentions sur les sites que Google et les IA lisent. Ce qui change, c’est ce qu’on mesure. Chaque formule mesure les deux, chaque mois, à l’identique : vos positions et vos clics sur Google, vos citations par ChatGPT, Perplexity, Gemini et les aperçus IA de Google.</p>
          </header>
          <div className="formules" data-revele-groupe="">
            <div className="formule"><h3 className="titre-3">Suivi</h3><p className="formule__prix">290 € HT/mois</p><ul><li>Vos positions et vos clics, relevés dans votre Search Console</li><li>Vingt questions de vos clients, posées à quatre moteurs IA, trois fois chacune</li><li>Tableau de bord en français : ce qui a bougé, qui est cité à votre place, d’où viennent les citations</li><li>30 minutes d’échange en visio</li></ul></div>
            <div className="formule"><h3 className="titre-3">Essentiel</h3><p className="formule__prix">590 € HT/mois</p><ul><li>Tout le Suivi</li><li>Un contenu par mois, écrit pour Google et pour les IA</li><li>Optimisations et corrections techniques continues</li></ul></div>
            <div className="formule formule--phare"><h3 className="titre-3">Croissance</h3><p className="formule__prix">890 € HT/mois</p><ul><li>Tout l’Essentiel</li><li>Un deuxième contenu par mois</li><li>1 à 2 liens ou mentions par mois sur des sites reconnus</li><li>Suivi de votre visibilité locale</li><li>1 h de conseil en visio</li></ul></div>
          </div>
          <p className="note-prix" data-revele="">Sans engagement de durée, préavis de 30 jours. Le Suivi convient à une entreprise qui a déjà son équipe ou son prestataire et veut une mesure indépendante. Sur Google, comptez 6 mois pour des résultats solides : nous le disons avant de facturer, pas après. Côté IA, aucune garantie d’être cité : les moteurs changent de réponse d’un appel à l’autre, et personne ne contrôle leurs choix. Ce qui est garanti, c’est une mesure honnête, refaite à l’identique chaque mois.</p>
          <div className="ligne-appel" data-revele=""><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Choisir ma formule, 30 min gratuites</a><p>ou <a href="tel:+33769093909">07 69 09 39 09</a>, on décroche</p></div>
        </div>
      </section>

      {/* PACK DÉCOLLAGE : bandeau pleine largeur sur une photo de poste de travail, prix barré */}
      <section className="pack" id="pack" data-theme="sombre">
        <img className="pack__fond" src="/images/charte/photos/image-1600x640.webp" width="1600" height="640" loading="lazy" alt="" />
        <div className="enveloppe pack__in" data-revele="">
          <div>
            <h2 className="titre-2">Pack Décollage : <em className="degrade-rose">site + visibilité locale</em></h2>
            <p>Site vitrine « Pro » + Pack visibilité locale, le socle technique IA déjà compris dans le site. L’équipement complet d’un artisan ou d’un commerce qui démarre sa visibilité.</p>
            <p className="ligne-appel"><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon diagnostic gratuit</a></p>
          </div>
          <p className="pack__prix"><b>1 690 €</b><s>au lieu de 1 880 €</s></p>
        </div>
      </section>

      {/* REPÈRES MARCHÉ (clair) */}
      <section className="section s-blanc" id="marche" data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <p className="surtitre">Repères</p>
            <h2 className="titre-2">Où se situent ces prix <em className="degrade">sur le marché</em> ?</h2>
            <p className="chapeau">Ces tarifs sont posés en connaissance du marché français, sources publiques à l’appui, fourchettes relevées en août 2026. Pour le détail complet du marché, devis décortiqué ligne par ligne, lisez notre guide <Link className="lien" href="/conseils/creation-site-internet/combien-coute-un-site-internet/">combien coûte un site internet</Link>.</p>
          </header>
          <div className="tableau-marche">
      <div className="tableau" data-revele="">
      <table>
      <thead><tr><th scope="col">Prestation</th><th scope="col">Marché France</th><th scope="col" className="col-fort">Chez MKZ</th></tr></thead>
      <tbody>
      <tr><td data-label="Prestation">Site vitrine 5 à 10 pages</td><td data-label="Marché France">900 à 5 000 € (grille France Num / Afnic, juin 2025), 3 000 à 8 000 € en agence (relevés 2026)</td><td data-label="Chez MKZ" className="col-fort">1 490 €</td></tr>
      <tr><td data-label="Prestation">Site e-commerce</td><td data-label="Marché France">3 000 à 10 000 € (France Num / Afnic), budget conseillé 4 000 à 6 000 € pour un WooCommerce sérieux (relevés 2026)</td><td data-label="Chez MKZ" className="col-fort">dès 2 990 €</td></tr>
      <tr><td data-label="Prestation">Audit SEO</td><td data-label="Marché France">500 à 3 000 €, le plus souvent 800 à 1 200 € pour un site vitrine (relevés 2026)</td><td data-label="Chez MKZ" className="col-fort">490 €</td></tr>
      <tr><td data-label="Prestation">Accompagnement mensuel SEO + IA</td><td data-label="Marché France">SEO : 500 à 2 500 €/mois (seo.fr, juin 2026), jusqu’à 5 000 €/mois en agence (relevés 2026). Référencement IA : 800 à 2 000 €/mois chez un consultant indépendant, 800 à 3 000 €/mois en agence (relevés de septembre 2026)</td><td data-label="Chez MKZ" className="col-fort">290 à 890 €/mois, les deux compris</td></tr>
      <tr><td data-label="Prestation">Audit référencement IA</td><td data-label="Marché France">1 200 € chez un consultant indépendant (relevé de septembre 2026), 1 500 à 3 000 € chez les agences GEO (relevés 2026, marché jeune et peu standardisé)</td><td data-label="Chez MKZ" className="col-fort">790 €</td></tr>
      <tr><td data-label="Prestation">Maintenance</td><td data-label="Marché France">39 à 290 €/mois chez les indépendants, 100 à 500 €/mois en agence (relevés 2026)</td><td data-label="Chez MKZ" className="col-fort">29 à 99 €/mois</td></tr>
      </tbody></table></div>
          </div>
          <p className="note-prix" data-revele="">Positionnement volontaire : des prix d’indépendant expérimenté, sous les grilles d’agence, pour des livrables mesurés et vérifiables.</p>
          <div className="ligne-appel" data-revele=""><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Parler de mon projet, 30 min gratuites</a><p>ou <a href="tel:+33769093909">07 69 09 39 09</a>, on décroche</p></div>
        </div>
      </section>

      {/* QUESTIONS FRÉQUENTES */}
      <section className="section section--serree faq-section" id="faq" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <p className="surtitre">Questions fréquentes</p>
            <h2 className="titre-2">Vos questions <em className="degrade-rose">sur nos tarifs</em></h2>
          </header>
          <div className="faq">
            {faq.map((f) => (
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
            <h2 className="titre-2">Un chiffre vous parle ? <em className="degrade">Vérifions-le ensemble.</em></h2>
            <p className="chapeau">Réservez votre diagnostic gratuit de 30 minutes : on regarde votre visibilité réelle, on vérifie vos droits aux aides, et vous repartez avec un devis fixe écrit. Sans engagement.</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Réserver mon diagnostic gratuit</a>
            </div>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
