// Page /politique-confidentialite/ à la nouvelle charte (maquette codée du 20/10/2026).
// Texte identique à ConfidentialiteContent.tsx (comparé phrase par phrase le 21/10/2026). Toute
// évolution du dispositif de mesure se répercute aussi dans la version anglaise. Écarts voulus :
// liens internes en next/link, liens externes en nouvel onglet, DPA de Calendly en nofollow,
// comme sur le site.
// Composant GÉNÉRÉ depuis la maquette (politique-confidentialite.html, version du 20/10/2026) par construire-page.mjs,
// puis branché sur les données du site ; les écarts voulus sont listés ci-dessus.

import Link from "next/link";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export default function ConfidentialiteCharte() {
  return (
    <ChartePage chemin="/politique-confidentialite/" classes="page-annexe page-clair">
      {/* EN-TÊTE · sobre et centré, comme les articles */}
      <header className="legal-tete" data-theme="clair">
        <div className="enveloppe legal-tete__in">
          <nav className="ariane" aria-label="Fil d'Ariane"><Link href="/">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page">Politique de confidentialité</span></nav>
          <h1>Politique de confidentialité</h1>
          <p className="legal-tete__intro">La présente politique de confidentialité décrit comment MKZ collecte, utilise et protège les informations personnelles que vous nous transmettez via le site <a href="https://mkz-consulting.fr">mkz-consulting.fr</a>.</p>
        </div>
      </header>

      {/* CORPS · sommaire collant à gauche, colonne de lecture à droite (gabarit des articles) */}
      <div className="enveloppe art-corps">
        <aside className="art-cote">
          <nav className="art-sommaire" aria-label="Sommaire"><details open><summary>Sommaire</summary><ol>
            <li><a href="#responsable-du-traitement">Responsable du traitement</a></li>
            <li><a href="#donnees-collectees">Données collectées</a></li>
            <li><a href="#finalites-du-traitement">Finalités du traitement</a></li>
            <li><a href="#base-legale">Base légale</a></li>
            <li><a href="#duree-de-conservation">Durée de conservation</a></li>
            <li><a href="#partage-des-donnees">Partage des données</a></li>
            <li><a href="#transferts-hors-ue">Transferts de données hors Union européenne</a></li>
            <li><a href="#vos-droits">Vos droits</a></li>
            <li><a href="#cookies">Cookies</a></li>
            <li><a href="#securite">Sécurité</a></li>
            <li><a href="#modifications">Modifications</a></li>
          </ol></details></nav>
        </aside>
        <div className="lecture legal-texte">
          <h2 id="responsable-du-traitement">Responsable du traitement</h2>
          <div className="legal-fiche">
            <p><strong>MKZ</strong>, SAS à associé unique</p>
            <p>1 rue Françoise Sagan, 77230 Dammartin-en-Goële</p>
            <p>Email : <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></p>
            <p>Téléphone : <a href="tel:0769093909">07 69 09 39 09</a></p>
          </div>

          <h2 id="donnees-collectees">Données collectées</h2>
          <p>Nous collectons uniquement les données que vous nous transmettez volontairement via :</p>
          <ul>
            <li><strong>Le formulaire de contact :</strong> nom, adresse email, sujet et message</li>
            <li><strong>La prise de rendez-vous :</strong> nom et adresse email (via Calendly)</li>
            <li><strong>Les appels téléphoniques :</strong> numéro de téléphone et informations échangées</li>
            <li><strong>L’outil d’audit SEO gratuit :</strong> adresse email et adresse du site analysé, uniquement si vous demandez le rapport et cochez la case de consentement. Le scan lui-même ne traite qu’une adresse de site publique et ne collecte aucune donnée personnelle</li>
          </ul>
          <p>Aucune donnée n’est collectée automatiquement à des fins publicitaires. Avec votre consentement, recueilli via le bandeau cookies, nous mesurons en revanche l’usage du site (pages visitées, clics, défilement) au moyen des outils Google Analytics 4 et Microsoft Clarity, afin d’améliorer le site. Tant que vous n’avez pas accepté, ces outils ne sont pas chargés et aucune donnée de mesure n’est collectée (voir la section Cookies ci-dessous).</p>

          <h2 id="finalites-du-traitement">Finalités du traitement</h2>
          <p>Vos données personnelles sont utilisées exclusivement pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact ou de devis</li>
            <li>Planifier et réaliser un audit gratuit</li>
            <li>Vous envoyer le rapport d’audit que vous avez demandé via l’outil gratuit, et vous recontacter à son sujet</li>
            <li>Assurer le suivi de la relation commerciale</li>
            <li>Vous envoyer des informations liées à votre projet (uniquement si vous en avez fait la demande)</li>
          </ul>

          <h2 id="base-legale">Base légale</h2>
          <p>Le traitement de vos données repose sur votre <strong>consentement</strong> (formulaire de contact, prise de rendez-vous, mesure d’audience via le bandeau cookies) et sur l’<strong>intérêt légitime</strong> de MKZ à répondre aux demandes commerciales.</p>

          <h2 id="duree-de-conservation">Durée de conservation</h2>
          <p>Vos données sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter de votre dernier contact avec MKZ. Au-delà, elles sont supprimées définitivement.</p>

          <h2 id="partage-des-donnees">Partage des données</h2>
          <p>Vos données personnelles ne sont jamais vendues, louées ou transmises à des tiers à des fins commerciales.</p>
          <p>Elles peuvent être traitées par les sous-traitants suivants :</p>
          <ul>
            <li><strong>Cloudflare, Inc.</strong> : hébergement et diffusion du site web (États-Unis)</li>
            <li><strong>Web3Forms</strong> (Web3Creative) : acheminement des messages envoyés via le formulaire de contact et des demandes de rapport de l’outil d’audit (Inde)</li>
            <li><strong>Calendly LLC</strong> : gestion de la prise de rendez-vous en ligne (États-Unis)</li>
            <li><strong>Microsoft Corporation</strong> : mesure d’audience et analyse de l’usage du site via Microsoft Clarity, uniquement après votre consentement (États-Unis)</li>
            <li><strong>Google Ireland Limited</strong> : mesure d’audience via Google Analytics 4, uniquement après votre consentement (Irlande, avec transfert possible vers Google LLC aux États-Unis)</li>
          </ul>

          <h2 id="transferts-hors-ue">Transferts de données hors Union européenne</h2>
          <p>Quatre de nos cinq sous-traitants sont établis hors de l’Union européenne : <strong>Cloudflare, Inc.</strong>, <strong>Calendly LLC</strong> et <strong>Microsoft Corporation</strong> aux États-Unis, <strong>Web3Forms</strong> en Inde ; <strong>Google Ireland Limited</strong> est établi en Irlande mais peut transférer les données de Google Analytics vers Google LLC aux États-Unis. L’hébergement du site, l’envoi du formulaire de contact, la prise de rendez-vous et la mesure d’audience impliquent donc un transfert de données personnelles hors de l’Union européenne.</p>
          <p>Ces transferts sont encadrés par les garanties prévues au chapitre V du RGPD :</p>
          <ul>
            <li>un <strong>accord de traitement des données</strong> (DPA) conclu avec chaque sous-traitant, au sens de l’article 28 du RGPD ;</li>
            <li>les <strong>clauses contractuelles types</strong> de la Commission européenne (article 46 du RGPD). Elles constituent le seul fondement du transfert vers <strong>Web3Forms</strong>, l’Inde ne bénéficiant d’aucune décision d’adéquation ;</li>
            <li>pour les trois prestataires américains et Google LLC uniquement, leur certification au <strong>Data Privacy Framework UE - États-Unis</strong>, qui fait l’objet d’une décision d’adéquation de la Commission européenne du 10 juillet 2023 (article 45 du RGPD).</li>
          </ul>
          <p>Le détail de ces engagements est consultable sur <a href="https://www.cloudflare.com/trust-hub/gdpr/" target="_blank" rel="noopener noreferrer">le centre de conformité de Cloudflare</a>, <a href="https://web3forms.com/dpa" target="_blank" rel="noopener noreferrer">l’accord de traitement de Web3Forms</a>, <a href="https://calendly.com/legal/data-processing-addendum" target="_blank" rel="noopener noreferrer nofollow">celui de Calendly</a>, <a href="https://privacy.microsoft.com/fr-fr/privacystatement" target="_blank" rel="noopener noreferrer">la déclaration de confidentialité de Microsoft</a> et <a href="https://business.safety.google/adsprocessorterms/" target="_blank" rel="noopener noreferrer">les conditions de traitement des données de Google</a>. Le délégué à la protection des données de Cloudflare est joignable à <a href="mailto:dpo@cloudflare.com">dpo@cloudflare.com</a>.</p>

          <h2 id="vos-droits">Vos droits</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d’accès :</strong> obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
            <li><strong>Droit de rectification :</strong> demander la correction de données inexactes</li>
            <li><strong>Droit de suppression :</strong> demander l’effacement de vos données</li>
            <li><strong>Droit d’opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
          </ul>
          <p>Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a>. Nous nous engageons à répondre dans un délai de 30 jours.</p>
          <p>En cas de litige, vous pouvez également adresser une réclamation à la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.</p>

          <h2 id="cookies">Cookies</h2>
          <p>Avec votre <strong>consentement</strong>, ce site utilise deux outils de mesure d’audience qui analysent la façon dont les visiteurs utilisent le site (pages vues, clics, défilement) afin de l’améliorer : <strong>Google Analytics 4</strong>, qui dépose les cookies _ga et _ga_* (durée de vie de 13 mois, adresse IP non conservée, aucun signal publicitaire), et <strong>Microsoft Clarity</strong>, qui dépose les cookies _clck (un an) et _clsk (un jour) sur ce site, ainsi que des cookies de Microsoft sur ses propres domaines clarity.ms et bing.com : MUID et SRM_B (13 mois), MR (7 jours), ANONCHK (10 minutes) et SM (le temps de la session).</p>
          <p>Ces cookies ne sont déposés que si vous acceptez la catégorie correspondante dans le bandeau affiché lors de votre première visite. Sans votre accord, ces outils ne sont pas chargés et aucun cookie de mesure n’est déposé. Vous pouvez retirer votre consentement à tout moment via le lien « Gérer les cookies » en pied de page : le suivi s’arrête alors immédiatement. Votre choix, accord ou refus, est conservé six mois dans un cookie technique (mkz-consent) avec sa date et un identifiant aléatoire qui en tient lieu de preuve ; passé ce délai, la question vous est reposée.</p>
          <p>Ce site n’affiche aucune publicité. Des cookies techniques strictement nécessaires au fonctionnement du site, dont la mémorisation de vos choix de consentement, peuvent être déposés sans consentement, conformément à la réglementation en vigueur.</p>

          <h2 id="securite">Sécurité</h2>
          <p>MKZ met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération. Le site est hébergé sur l’infrastructure de Cloudflare, Inc. et utilise le protocole HTTPS pour sécuriser les échanges.</p>

          <h2 id="modifications">Modifications</h2>
          <p>MKZ se réserve le droit de modifier la présente politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour.</p>
          <p className="legal-maj">Dernière mise à jour : octobre 2026</p>
        </div>
      </div>
    </ChartePage>
  );
}
