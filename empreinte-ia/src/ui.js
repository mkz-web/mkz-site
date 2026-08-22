/**
 * ui.js : liaison entre le moteur et le document.
 *
 * Runtime     : navigateur, sans transpilation
 * Dependances : aucune
 *
 * Ce fichier ne calcule rien et ne formate rien lui meme : il lit les
 * controles, appelle le moteur, et repose le resultat dans le document. Tout
 * arrondi et toute tournure de phrase viennent d'engine.js, afin que le
 * tableau produit au build et les indicateurs produits ici affichent
 * exactement les memes chiffres.
 *
 * Aucun stockage navigateur, aucun cookie, aucun appel reseau : ce qui est
 * saisi dans la page ne quitte jamais le navigateur et rien n'y survit a la
 * fermeture de l'onglet. Le nom des API concernees est volontairement absent
 * de ce fichier pour que la verification du cahier des charges, un simple
 * grep sur les sources, retourne zero sans exception a expliquer.
 */

import { estimate, scaleEstimate, gaugePositions, formatValue, formatCount, describeEquivalence, GAUGE_SCALES, LENGTH_PRESETS } from './engine.js';
import { DATASET } from './dataset.generated.js';

const EQUIVALENCES = {
  energyWh: { liste: 'energy', unite: 'value_wh' },
  co2eG: { liste: 'co2e', unite: 'value_g' },
  waterMl: { liste: 'water', unite: 'value_ml' }
};

const requete = document.getElementById('requete');
const curseurAppels = document.getElementById('appels');
const indicateurs = Array.from(document.querySelectorAll('#indicateurs [data-indicateur]'));
const blocsAgent = Array.from(document.querySelectorAll('#agent-resultats [data-agent]'));

// Sans les elements attendus, on laisse la page telle que le build l'a rendue :
// elle est deja complete et juste, seulement figee sur l'exemple.
if (requete && indicateurs.length) {
  brancher();
}

function brancher() {
  let timer = null;
  const differer = () => {
    if (timer) clearTimeout(timer);
    // La frappe declenche un recalcul, pas un rendu par caractere. Le calcul
    // coute une fraction de milliseconde, le rendu du document beaucoup plus.
    timer = setTimeout(rendre, 60);
  };

  requete.addEventListener('input', differer);
  for (const nom of ['modele', 'region', 'longueur']) {
    for (const input of document.querySelectorAll(`input[name="${nom}"]`)) {
      input.addEventListener('change', rendre);
    }
  }
  if (curseurAppels) curseurAppels.addEventListener('input', rendre);

  rendre();
}

function valeurChoisie(nom, defaut) {
  const coche = document.querySelector(`input[name="${nom}"]:checked`);
  return coche ? coche.value : defaut;
}

function texte(selecteur, contenu, racine = document) {
  const cible = racine.querySelector(selecteur);
  if (cible) cible.textContent = contenu;
}

/** Repose un triplet dans un bloc indicateur, jauge comprise. */
function majIndicateur(article, triplet) {
  const scale = GAUGE_SCALES[article.dataset.echelle];
  if (!scale) return;

  const positions = gaugePositions(triplet, scale);
  const unite = article.querySelector('.unite');
  const libelle = article.querySelector('.indicateur-titre');

  texte('[data-champ="valeur"]', formatValue(triplet[1]), article);
  texte('[data-champ="min"]', formatValue(triplet[0]), article);
  texte('[data-champ="max"]', formatValue(triplet[2]), article);

  const bande = article.querySelector('.jauge-bande');
  const repere = article.querySelector('.jauge-repere');
  if (bande) {
    bande.style.left = `${positions.start.toFixed(2)}%`;
    bande.style.width = `${positions.width.toFixed(2)}%`;
  }
  if (repere) repere.style.left = `${positions.mid.toFixed(2)}%`;

  const jauge = article.querySelector('.jauge');
  if (jauge && unite && libelle) {
    const u = unite.textContent.trim();
    jauge.setAttribute(
      'aria-label',
      `${libelle.textContent} : ${formatValue(triplet[1])} ${u}, fourchette de ${formatValue(triplet[0])} à ${formatValue(triplet[2])} ${u}`
    );
  }

  const config = EQUIVALENCES[article.dataset.indicateur || article.dataset.agent];
  if (config) {
    const phrase = describeEquivalence(triplet[1], DATASET.equivalences[config.liste], config.unite);
    texte('[data-champ="equivalence"]', phrase ? `soit ${phrase}` : '', article);
  }
}

function rendre() {
  const modelClass = valeurChoisie('modele', 'moyen');
  const region = valeurChoisie('region', 'fr');
  const longueur = valeurChoisie('longueur', 'standard');

  const resultat = estimate(
    {
      text: requete.value,
      modelClass,
      region,
      lengthMultiplier: LENGTH_PRESETS[longueur] || LENGTH_PRESETS.standard
    },
    DATASET
  );

  texte('[data-champ="tokens-in"]', formatCount(resultat.tokensIn));
  texte('[data-champ="tokens-out"]', formatCount(resultat.tokensOut));
  texte(
    '[data-champ="tokens-caches"]',
    resultat.tokensOutReasoning > 0
      ? `dont ${formatCount(resultat.tokensOutReasoning)} jamais affichés`
      : ''
  );

  const classe = DATASET.models.classes[modelClass];
  const zone = DATASET.grid.regions[region];
  if (classe) texte('[data-champ="note-modele"]', classe.examples);
  if (zone) texte('[data-champ="note-region"]', zone.detail);

  for (const article of indicateurs) {
    majIndicateur(article, resultat[article.dataset.indicateur]);
  }

  if (curseurAppels && blocsAgent.length) {
    const appels = Number(curseurAppels.value) || 1;
    const run = scaleEstimate(resultat, appels);
    texte('[data-champ="appels-valeur"]', formatCount(appels));
    for (const article of blocsAgent) {
      majIndicateur(article, run[article.dataset.agent]);
    }
  }
}
