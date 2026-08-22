/**
 * engine.js : moteur d'estimation de l'empreinte d'une requete a un modele.
 *
 * Runtime     : navigateur et Node >= 14, sans transpilation
 * Dependances : aucune
 *
 * Contrat : fonction pure. Aucun acces au DOM, aucun fetch, aucune date
 * systeme, aucun etat global mutable. Le jeu de donnees est injecte, ce qui
 * permet de reutiliser ce fichier tel quel dans un module PowerShell ou une
 * API sans toucher a une ligne.
 *
 * Toute grandeur incertaine circule sous forme de triplet [min, central, max]
 * du debut a la fin du calcul. Une valeur affichee sans ses deux bornes est
 * un bug, pas un choix de mise en page.
 */

import { DATASET } from './dataset.generated.js';

/** Longueurs de reponse proposees dans l'interface. */
export const LENGTH_PRESETS = {
  courte: 0.6,
  standard: 1,
  longue: 2.2
};

const BRANCHES = [0, 1, 2];

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Garantit un triplet exploitable meme si le jeu de donnees est incomplet.
 * Un triplet mal forme doit casser au build, pas produire un NaN a l'ecran.
 */
function asTriplet(value, label) {
  if (!Array.isArray(value) || value.length !== 3 || !value.every(isFiniteNumber)) {
    throw new TypeError(`Coefficient "${label}" invalide : triplet [min, central, max] attendu`);
  }
  return value;
}

/** Les bornes sortent toujours ordonnees, quelle que soit la saisie du YAML. */
function sortTriplet(triplet) {
  return triplet.slice().sort((a, b) => a - b);
}

/**
 * Estime le cout d'une requete unique.
 *
 * @param {{text?: string, modelClass?: string, region?: string, lengthMultiplier?: number}} input
 * @param {object} [dataset] jeu de donnees injecte, celui du build par defaut
 * @returns {{
 *   tokensIn: number, tokensOut: number,
 *   tokensOutVisible: number, tokensOutReasoning: number,
 *   energyWh: number[], co2eG: number[], waterMl: number[],
 *   datasetVersion: string, meta: object
 * }}
 */
export function estimate(input, dataset = DATASET) {
  const params = input || {};
  const models = dataset.models;
  const text = typeof params.text === 'string' ? params.text : '';

  const classKey = Object.prototype.hasOwnProperty.call(models.classes, params.modelClass)
    ? params.modelClass
    : 'moyen';
  const regionKey = Object.prototype.hasOwnProperty.call(dataset.grid.regions, params.region)
    ? params.region
    : 'fr';
  const lengthMultiplier =
    isFiniteNumber(params.lengthMultiplier) && params.lengthMultiplier > 0
      ? params.lengthMultiplier
      : LENGTH_PRESETS.standard;

  const modelClass = models.classes[classKey];
  const region = dataset.grid.regions[regionKey];

  const wh = asTriplet(modelClass.wh_per_output_token, `models.classes.${classKey}`);
  const fixed = asTriplet(models.fixed_overhead_wh, 'models.fixed_overhead_wh');
  const grid = asTriplet(
    region.hourly_override || region.factors_g_per_kwh,
    `grid.regions.${regionKey}`
  );
  const embodied = asTriplet(dataset.embodied.manufacturing_g_per_kwh, 'embodied');
  const water = asTriplet(dataset.water.litres_per_kwh, 'water');

  // Estimation des tokens. Heuristique caracteres / 3,6 pour le francais :
  // l'erreur de 10 % est negligeable face a l'incertitude du modele energetique.
  const tokensIn = text.length > 0 ? Math.max(1, Math.round(text.length / models.chars_per_token)) : 0;

  // Pas de requete, pas de reponse. Le surcout fixe empeche malgre tout
  // l'affichage d'un zero, qui serait faux : un aller retour serveur coute.
  const tokensOutVisible = tokensIn > 0 ? Math.round(models.base_tokens_out * lengthMultiplier) : 0;

  // Les modeles de raisonnement produisent des tokens que l'utilisateur ne
  // voit jamais. Le token ne coute pas plus cher, il y en a simplement plus.
  const tokensOut = Math.round(tokensOutVisible * modelClass.output_multiplier);
  const tokensOutReasoning = tokensOut - tokensOutVisible;

  // Le prefill n'est pas le decode : les tokens d'entree sont traites en
  // parallele, ceux de sortie un par un. Jamais le meme coefficient.
  const energyWh = sortTriplet(
    BRANCHES.map((b) => fixed[b] + tokensOut * wh[b] + (tokensIn * wh[b]) / models.ratio_prefill)
  );

  // Impacts d'usage et impacts de fabrication amortis s'additionnent.
  const co2eG = sortTriplet(BRANCHES.map((b) => (energyWh[b] / 1000) * (grid[b] + embodied[b])));

  // Litres par kWh ramenes en millilitres, plus lisibles a cette echelle.
  const waterMl = sortTriplet(BRANCHES.map((b) => (energyWh[b] / 1000) * water[b] * 1000));

  return {
    tokensIn,
    tokensOut,
    tokensOutVisible,
    tokensOutReasoning,
    energyWh,
    co2eG,
    waterMl,
    datasetVersion: dataset.version,
    meta: {
      modelClass: classKey,
      region: regionKey,
      lengthMultiplier,
      ratioPrefill: models.ratio_prefill,
      charsPerToken: models.chars_per_token
    }
  };
}

/**
 * Multiplie une estimation par un nombre d'appels.
 * Sert la section agent : un run outille n'est pas une requete, c'est n
 * requetes enchainees dont l'utilisateur ne voit que la derniere.
 */
export function scaleEstimate(result, calls) {
  const factor = isFiniteNumber(calls) && calls > 0 ? Math.round(calls) : 1;
  const multiply = (triplet) => triplet.map((v) => v * factor);
  return {
    ...result,
    calls: factor,
    tokensIn: result.tokensIn * factor,
    tokensOut: result.tokensOut * factor,
    tokensOutVisible: result.tokensOutVisible * factor,
    tokensOutReasoning: result.tokensOutReasoning * factor,
    energyWh: multiply(result.energyWh),
    co2eG: multiply(result.co2eG),
    waterMl: multiply(result.waterMl)
  };
}

/**
 * Domaines des jauges, en echelle logarithmique fixe.
 *
 * Fixe et non adaptatif, volontairement : c'est ce qui rend le deplacement
 * perceptible quand on change de classe de modele. Une echelle qui se
 * recadre a chaque calcul donnerait toujours la meme image, donc aucune
 * information. Logarithmique parce que la fourchette min-max couvre un
 * facteur dix : en lineaire, la borne basse serait ecrasee contre zero.
 */
export const GAUGE_SCALES = {
  energyWh: { min: 0.01, max: 1000, unit: 'Wh' },
  co2eG: { min: 0.001, max: 1000, unit: 'g' },
  waterMl: { min: 0.01, max: 10000, unit: 'mL' },
  energyWhRun: { min: 0.1, max: 100000, unit: 'Wh' },
  co2eGRun: { min: 0.01, max: 100000, unit: 'g' }
};

function clamp(value, low, high) {
  return Math.min(Math.max(value, low), high);
}

/**
 * Convertit un triplet en positions de jauge, en pourcentage de la piste.
 * Utilise a la fois par le build, pour le tableau comparatif statique, et par
 * l'interface : une seule implementation, donc aucune divergence possible
 * entre le HTML genere et le HTML calcule.
 */
export function gaugePositions(triplet, scale) {
  const low = Math.log10(scale.min);
  const high = Math.log10(scale.max);
  const position = (value) =>
    clamp(((Math.log10(clamp(value, scale.min, scale.max)) - low) / (high - low)) * 100, 0, 100);

  const start = position(triplet[0]);
  const mid = position(triplet[1]);
  const end = position(triplet[2]);
  return { start, mid, end, width: Math.max(end - start, 0.6) };
}

/** Graduations en puissances de dix, pour l'axe sous la piste. */
export function gaugeTicks(scale) {
  const ticks = [];
  for (let exponent = Math.log10(scale.min); exponent <= Math.log10(scale.max) + 1e-9; exponent++) {
    ticks.push(Math.pow(10, Math.round(exponent)));
  }
  return ticks;
}

/**
 * Choisit le repere du quotidien dont le rapport tombe le plus pres de 1,
 * pour eviter les formulations absurdes du type "0,0004 charge de smartphone".
 *
 * @returns {{item: object, ratio: number}|null}
 */
export function pickEquivalence(value, items, unitKey) {
  if (!isFiniteNumber(value) || value <= 0 || !Array.isArray(items) || items.length === 0) {
    return null;
  }
  let best = null;
  for (const item of items) {
    const unit = item[unitKey];
    if (!isFiniteNumber(unit) || unit <= 0) continue;
    const ratio = value / unit;
    const distance = Math.abs(Math.log10(ratio));
    if (!best || distance < best.distance) best = { item, ratio, distance };
  }
  if (!best) return null;
  return { item: best.item, ratio: best.ratio };
}

/* -------------------------------------------------------------- formatage */

/*
 * Le formatage vit dans le moteur, et non dans l'interface, pour une raison
 * precise : le tableau comparatif est produit au build par Node, les
 * indicateurs sont produits dans le navigateur. Deux implementations du meme
 * arrondi finiraient par diverger, et la page afficherait deux chiffres
 * differents pour la meme grandeur. Une seule fonction, donc.
 */

// Espace insecable, en echappement pour rester visible dans le source : sans
// lui, `12 100` se couperait en fin de ligne. Une seule definition pour les
// deux formateurs, sinon l'un des deux finit avec un espace ordinaire.
const SEPARATEUR_MILLIERS = '\u00A0';

/** Nombre au format francais : virgule decimale, espace insecable aux milliers. */
export function formatValue(value) {
  if (!isFiniteNumber(value)) return '0';
  const abs = Math.abs(value);
  let digits;
  if (abs >= 100) digits = 0;
  else if (abs >= 10) digits = 1;
  else if (abs >= 0.1) digits = 2;
  else if (abs >= 0.01) digits = 3;
  else if (abs >= 0.001) digits = 4;
  else digits = 5;

  const parts = value.toFixed(digits).split('.');
  const grouped = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATEUR_MILLIERS);
  return parts[1] ? `${grouped},${parts[1]}` : grouped;
}

/** Comptage entier : un token, un appel, cela ne se compte pas en decimales. */
export function formatCount(value) {
  if (!isFiniteNumber(value)) return '0';
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATEUR_MILLIERS);
}

/** Rapport lisible : au dela de dix, les decimales n'apportent plus rien. */
export function formatRatio(ratio) {
  if (!isFiniteNumber(ratio)) return '0';
  return ratio >= 10 ? formatCount(ratio) : formatValue(ratio);
}

/** Phrase d'equivalence complete : "2,1 charges completes de smartphone". */
export function describeEquivalence(value, items, unitKey) {
  const choix = pickEquivalence(value, items, unitKey);
  if (!choix) return null;
  const libelle = choix.ratio >= 1.995 ? choix.item.plural : choix.item.singular;
  return `${formatRatio(choix.ratio)} ${libelle}`;
}
