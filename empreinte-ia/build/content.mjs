/**
 * content.mjs : generation du contenu statique de la page.
 *
 * Execution   : importe par build/build.mjs
 * Runtime     : Node >= 14
 * Dependances : aucune
 *
 * Principe directeur : AUCUN chiffre n'est ecrit en dur dans le HTML ni dans
 * la FAQ. Tout ce qui s'affiche est calcule ici par le moteur, au build. Le
 * texte ne peut donc pas diverger du calcul, et le tableau comparatif reste
 * du HTML statique dans le fichier livre, donc lisible par un robot.
 *
 * Le bloc JSON-LD FAQPage est genere a partir de la meme source que la FAQ
 * visible. Une divergence entre les deux est impossible par construction.
 */

import { estimate, scaleEstimate, gaugePositions, gaugeTicks, formatValue, formatCount, formatRatio, describeEquivalence, GAUGE_SCALES, LENGTH_PRESETS } from '../src/engine.js';

/* ------------------------------------------------------------- constantes */

export const SITE = {
  // A confirmer avant mise en ligne : l'URL canonique conditionne le
  // referencement et le JSON-LD. Valeur retenue par defaut faute d'arbitrage.
  url: 'https://mkz-consulting.fr/empreinte-ia/',
  siteName: 'MKZ Consulting',
  siteUrl: 'https://mkz-consulting.fr',
  email: 'contact@mkz-consulting.fr',
  telephone: '+33769093909',
  telephoneAffiche: '07 69 09 39 09',
  titre: "Combien consomme une requête à une IA ? Simulateur d'empreinte",
  description:
    "Simulateur d'empreinte d'une requête IA : énergie, CO2e et eau, avec fourchette d'incertitude. Le choix du modèle pèse cent fois plus que l'usage lui-même."
};

/** Requete d'exemple, partagee par le simulateur et le tableau comparatif. */
export const PROMPT_EXEMPLE =
  "Rédige un compte rendu de la réunion de lancement à partir de mes notes, en dégageant les décisions prises et les points restés en suspens.";

const REGION_REFERENCE = 'fr';

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ----------------------------------------------------------- calcul cadres */

function referenceEstimate(dataset, modelClass, length) {
  return estimate(
    {
      text: PROMPT_EXEMPLE,
      modelClass,
      region: REGION_REFERENCE,
      lengthMultiplier: length
    },
    dataset
  );
}

/**
 * Calcule toutes les valeurs citees dans le texte de la page et de la FAQ.
 * Chaque cle correspond a un marqueur {{CLE}} present dans les sources.
 */
export function computeFigures(dataset) {
  const moyen = referenceEstimate(dataset, 'moyen', LENGTH_PRESETS.standard);
  const petit = referenceEstimate(dataset, 'petit', LENGTH_PRESETS.standard);
  const grand = referenceEstimate(dataset, 'grand', LENGTH_PRESETS.standard);
  const raisonnement = referenceEstimate(dataset, 'raisonnement', LENGTH_PRESETS.standard);
  const petitCourt = referenceEstimate(dataset, 'petit', LENGTH_PRESETS.courte);
  const raisonnementLong = referenceEstimate(dataset, 'raisonnement', LENGTH_PRESETS.longue);

  // Un million de tokens de sortie sur un modele courant, cas cite en FAQ.
  const whParToken = dataset.models.classes.moyen.wh_per_output_token[1];
  const equipeWh = 1e6 * whParToken;

  const facteurModele = raisonnement.energyWh[1] / petit.energyWh[1];
  const facteurTotal = raisonnementLong.energyWh[1] / petitCourt.energyWh[1];

  return {
    E_MOYEN: formatValue(moyen.energyWh[1]),
    E_MOYEN_MIN: formatValue(moyen.energyWh[0]),
    E_MOYEN_MAX: formatValue(moyen.energyWh[2]),
    E_PETIT: formatValue(petit.energyWh[1]),
    E_GRAND: formatValue(grand.energyWh[1]),
    E_RAISONNEMENT: formatValue(raisonnement.energyWh[1]),
    CO2_MOYEN: formatValue(moyen.co2eG[1]),
    EAU_MOYEN: formatValue(moyen.waterMl[1]),
    EAU_MOYEN_MIN: formatValue(moyen.waterMl[0]),
    EAU_MOYEN_MAX: formatValue(moyen.waterMl[2]),
    FACTEUR_MODELE: formatRatio(facteurModele),
    FACTEUR_TOTAL: formatRatio(facteurTotal),
    EQUIPE_KWH: formatValue(equipeWh / 1000),
    EQUIPE_EQUIV: describeEquivalence(equipeWh, dataset.equivalences.energy, 'value_wh') || '',
    FACTEUR_RECHERCHE: formatRatio(10 / moyen.energyWh[1]),
    TOKENS_EXEMPLE: formatCount(moyen.tokensIn),
    TOKENS_SORTIE_EXEMPLE: formatCount(moyen.tokensOut),
    PROMPT_EXEMPLE: escapeHtml(PROMPT_EXEMPLE),
    NOTE_MODELE: escapeHtml(dataset.models.classes.moyen.examples),
    NOTE_REGION: escapeHtml(dataset.grid.regions[REGION_REFERENCE].detail),
    DATASET_VERSION: dataset.version,
    DATASET_DATE: dataset.updated
  };
}

/** Remplace les marqueurs {{CLE}} et echoue si l'un d'eux reste orphelin. */
export function injectFigures(text, figures, origine) {
  const sortie = text.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, cle) => {
    if (!(cle in figures)) {
      throw new Error(`Marqueur inconnu {{${cle}}} dans ${origine}`);
    }
    return figures[cle];
  });
  return sortie;
}

/* ------------------------------------------------------------------ jauges */

/**
 * Jauge a fourchette : bande pleine pour l'intervalle min-max, trait net pour
 * la valeur centrale. Element signature de la page. La meme geometrie est
 * recalculee a l'identique par l'interface, via gaugePositions().
 */
export function renderGauge(triplet, scaleKey, unite, libelle) {
  const scale = GAUGE_SCALES[scaleKey];
  const p = gaugePositions(triplet, scale);
  const decades = Math.log10(scale.max) - Math.log10(scale.min);
  const description = `${libelle} : ${formatValue(triplet[1])} ${unite}, fourchette de ${formatValue(triplet[0])} à ${formatValue(triplet[2])} ${unite}`;
  return [
    `<span class="jauge" role="img" aria-label="${escapeHtml(description)}">`,
    // Le pas des traits de decade est calcule ici : il depend de l'echelle,
    // qui n'est pas la meme pour l'energie, les emissions et l'eau.
    `<span class="jauge-piste" style="--pas:${(100 / decades).toFixed(4)}%">`,
    `<span class="jauge-bande" style="left:${p.start.toFixed(2)}%;width:${p.width.toFixed(2)}%"></span>`,
    `<span class="jauge-repere" style="left:${p.mid.toFixed(2)}%"></span>`,
    '</span>',
    '</span>'
  ].join('');
}

/** Graduation compacte : sous une jauge, "1k" vaut mieux que "1 000". */
function formatTick(value) {
  if (value >= 1000) return `${formatCount(value / 1000)}k`;
  if (value >= 1) return formatCount(value);
  return String(value).replace('0.', '0,');
}

export function renderGaugeAxis(scaleKey) {
  const scale = GAUGE_SCALES[scaleKey];
  const ticks = gaugeTicks(scale);
  const low = Math.log10(scale.min);
  const high = Math.log10(scale.max);

  // Cinq etiquettes au maximum. Au dela, elles se chevauchent dans une colonne
  // etroite. Les traits de decade, eux, restent tous dessines sur la piste :
  // on allege l'axe sans perdre la lecture de l'echelle.
  const pas = Math.max(1, Math.ceil((ticks.length - 1) / 4));
  const retenus = [];
  for (let index = 0; index < ticks.length; index += pas) retenus.push(index);
  if (retenus[retenus.length - 1] !== ticks.length - 1) retenus.push(ticks.length - 1);

  const cells = retenus
    .map((index, rang) => {
      const position = ((Math.log10(ticks[index]) - low) / (high - low)) * 100;
      // Les etiquettes extremes sont callees dans la piste plutot que centrees
      // sur leur trait, sinon elles debordent sur la colonne voisine.
      const bord =
        rang === 0 ? ' axe-graduation--debut' : rang === retenus.length - 1 ? ' axe-graduation--fin' : '';
      return `<span class="axe-graduation${bord}" style="left:${position.toFixed(2)}%">${formatTick(ticks[index])}</span>`;
    })
    .join('');
  return `<span class="jauge-axe" aria-hidden="true">${cells}</span>`;
}

/* ------------------------------------------------------------- indicateurs */

const INDICATEURS = [
  { cle: 'energyWh', titre: 'Énergie', unite: 'Wh', scale: 'energyWh', equiv: 'energy', unitKey: 'value_wh' },
  { cle: 'co2eG', titre: 'Émissions', unite: 'g CO2e', scale: 'co2eG', equiv: 'co2e', unitKey: 'value_g' },
  { cle: 'waterMl', titre: 'Eau', unite: 'mL', scale: 'waterMl', equiv: 'water', unitKey: 'value_ml' }
];

/**
 * Rend un indicateur complet. Genere au build avec les valeurs de l'exemple,
 * puis mis a jour par l'interface. La page reste donc entierement lisible
 * sans JavaScript, ce qui est une exigence de referencement autant que
 * d'accessibilite.
 */
function renderIndicator(spec, triplet, dataset, options = {}) {
  const scaleKey = options.scaleKey || spec.scale;
  const titre = options.titre || spec.titre;
  const attribut = options.attribut || 'data-indicateur';
  const equivalence = describeEquivalence(triplet[1], dataset.equivalences[spec.equiv], spec.unitKey);

  return [
    `<article class="indicateur" ${attribut}="${spec.cle}" data-echelle="${scaleKey}">`,
    `<h3 class="indicateur-titre">${escapeHtml(titre)}</h3>`,
    `<p class="indicateur-valeur"><span data-champ="valeur">${formatValue(triplet[1])}</span><span class="unite">${escapeHtml(spec.unite)}</span></p>`,
    renderGauge(triplet, scaleKey, spec.unite, titre),
    renderGaugeAxis(scaleKey),
    `<p class="indicateur-fourchette">de <span data-champ="min">${formatValue(triplet[0])}</span> à <span data-champ="max">${formatValue(triplet[2])}</span> ${escapeHtml(spec.unite)}</p>`,
    `<p class="indicateur-equivalence" data-champ="equivalence">${equivalence ? `soit ${escapeHtml(equivalence)}` : ''}</p>`,
    '</article>'
  ].join('');
}

export function renderIndicators(dataset) {
  const r = referenceEstimate(dataset, 'moyen', LENGTH_PRESETS.standard);
  return INDICATEURS.map((spec) => renderIndicator(spec, r[spec.cle], dataset)).join('\n');
}

/** Bloc de la section agent : energie et emissions d'un run complet. */
export function renderAgent(dataset, appels = 40) {
  const run = scaleEstimate(referenceEstimate(dataset, 'moyen', LENGTH_PRESETS.standard), appels);
  return [
    renderIndicator(INDICATEURS[0], run.energyWh, dataset, {
      scaleKey: 'energyWhRun',
      titre: 'Énergie du run complet',
      attribut: 'data-agent'
    }),
    renderIndicator(INDICATEURS[1], run.co2eG, dataset, {
      scaleKey: 'co2eGRun',
      titre: 'Émissions du run complet',
      attribut: 'data-agent'
    })
  ].join('\n');
}

/* ---------------------------------------------------------- controles 5.2 */

function renderRadioGroup(nom, entrees, valeurParDefaut) {
  return entrees
    .map((entree) => {
      const id = `${nom}-${entree.value}`;
      const coche = entree.value === valeurParDefaut ? ' checked' : '';
      return [
        `<input type="radio" name="${nom}" id="${escapeHtml(id)}" value="${escapeHtml(entree.value)}"${coche}>`,
        `<label for="${escapeHtml(id)}">${escapeHtml(entree.label)}</label>`
      ].join('');
    })
    .join('');
}

export function renderControls(dataset) {
  const modeles = Object.entries(dataset.models.classes).map(([cle, classe]) => ({
    value: cle,
    label: classe.label
  }));
  const regions = Object.entries(dataset.grid.regions).map(([cle, region]) => ({
    value: cle,
    label: region.label
  }));
  const longueurs = [
    { value: 'courte', label: 'Courte' },
    { value: 'standard', label: 'Standard' },
    { value: 'longue', label: 'Longue' }
  ];

  return {
    modele: renderRadioGroup('modele', modeles, 'moyen'),
    region: renderRadioGroup('region', regions, REGION_REFERENCE),
    longueur: renderRadioGroup('longueur', longueurs, 'standard')
  };
}

/* ------------------------------------------------- tableau comparatif 5.3 */

/**
 * Tableau comparatif, genere au build donc present en dur dans le HTML livre.
 * Actif SEO et GEO majeur : il ne doit jamais etre produit par le JavaScript
 * du navigateur, sinon un robot ne le voit pas.
 */
export function renderComparison(dataset) {
  const lignes = [];

  // Reference hors modele de langage : la recherche web classique.
  const web = dataset.models.reference_web_search;
  const grid = dataset.grid.regions[REGION_REFERENCE].factors_g_per_kwh;
  const embodied = dataset.embodied.manufacturing_g_per_kwh;
  const water = dataset.water.litres_per_kwh;
  lignes.push({
    label: web.label,
    detail: 'Repère hors modèle de langage',
    energyWh: web.wh_per_query,
    co2eG: web.wh_per_query.map((wh, i) => (wh / 1000) * (grid[i] + embodied[i])),
    waterMl: web.wh_per_query.map((wh, i) => wh * water[i]),
    tokens: null
  });

  for (const [cle, classe] of Object.entries(dataset.models.classes)) {
    const r = referenceEstimate(dataset, cle, LENGTH_PRESETS.standard);
    lignes.push({
      label: classe.label,
      detail: classe.examples,
      energyWh: r.energyWh,
      co2eG: r.co2eG,
      waterMl: r.waterMl,
      tokens: r.tokensOut,
      tokensVisibles: r.tokensOutVisible
    });
  }

  const cellule = (triplet, scaleKey, unite, libelle) =>
    [
      '<td class="cellule-mesure">',
      `<span class="valeur">${formatValue(triplet[1])}<span class="unite"> ${unite}</span></span>`,
      renderGauge(triplet, scaleKey, unite, libelle),
      `<span class="fourchette">${formatValue(triplet[0])} à ${formatValue(triplet[2])}</span>`,
      '</td>'
    ].join('');

  const corps = lignes
    .map((ligne) => {
      const note = ligne.tokens
        ? `${escapeHtml(ligne.detail)}<br>${formatCount(ligne.tokens)} tokens produits${
            ligne.tokens !== ligne.tokensVisibles
              ? `, dont ${formatCount(ligne.tokens - ligne.tokensVisibles)} jamais affichés`
              : ''
          }`
        : escapeHtml(ligne.detail);
      return [
        '<tr>',
        '<th scope="row">',
        `<span class="ligne-titre">${escapeHtml(ligne.label)}</span>`,
        `<span class="ligne-detail">${note}</span>`,
        '</th>',
        cellule(ligne.energyWh, 'energyWh', 'Wh', `Énergie, ${ligne.label}`),
        cellule(ligne.co2eG, 'co2eG', 'g', `Émissions, ${ligne.label}`),
        cellule(ligne.waterMl, 'waterMl', 'mL', `Eau, ${ligne.label}`),
        '</tr>'
      ].join('');
    })
    .join('\n');

  return [
    '<div class="tableau-cadre">',
    '<table class="tableau-comparatif">',
    '<caption>Coût comparé d\'une même requête selon le modèle sollicité, réponse d\'une demi-page, centre de données en France. Valeur centrale et fourchette d\'incertitude.</caption>',
    '<thead><tr>',
    '<th scope="col">Ce qui traite la requête</th>',
    '<th scope="col">Énergie</th>',
    '<th scope="col">Émissions</th>',
    '<th scope="col">Eau</th>',
    '</tr></thead>',
    `<tbody>${corps}</tbody>`,
    '</table>',
    '</div>'
  ].join('\n');
}

/* ------------------------------------------------------------------- FAQ */

/** Decoupe un scalaire litteral YAML en paragraphes. */
function paragraphes(texte) {
  return String(texte)
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

/**
 * Genere la FAQ visible et les donnees du FAQPage a partir d'une source
 * unique. Le JSON-LD reprend mot pour mot le texte affiche : toute divergence
 * serait une penalite au referencement.
 */
export function renderFaq(faq, figures) {
  const entrees = faq.questions.map((q) => {
    const question = injectFigures(q.question, figures, `faq ${q.id}`);
    const blocs = paragraphes(injectFigures(q.answer, figures, `faq ${q.id}`));
    return { id: q.id, question, blocs, texte: blocs.join(' ') };
  });

  const html = entrees
    .map((e) =>
      [
        `<details class="faq-item" id="faq-${escapeHtml(e.id)}">`,
        `<summary><h3>${escapeHtml(e.question)}</h3></summary>`,
        `<div class="faq-reponse">${e.blocs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</div>`,
        '</details>'
      ].join('')
    )
    .join('\n');

  return { html, entrees };
}

/* --------------------------------------------------------------- JSON-LD */

export function renderJsonLd(dataset, faqEntries) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.siteUrl}/#organization`,
        name: SITE.siteName,
        url: SITE.siteUrl,
        email: SITE.email,
        telephone: SITE.telephone,
        areaServed: { '@type': 'Country', name: 'France' },
        knowsAbout: [
          "Empreinte environnementale de l'intelligence artificielle",
          'Sobriété numérique',
          'Consommation énergétique des modèles de langage',
          'Référencement génératif',
          'Audit de consommation IA'
        ]
      },
      {
        '@type': 'WebApplication',
        '@id': `${SITE.url}#application`,
        name: "Simulateur d'empreinte d'une requête IA",
        url: SITE.url,
        description: SITE.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Tout navigateur web',
        inLanguage: 'fr-FR',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        publisher: { '@id': `${SITE.siteUrl}/#organization` },
        softwareVersion: dataset.version,
        dateModified: dataset.updated
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}#faq`,
        inLanguage: 'fr-FR',
        mainEntity: faqEntries.map((e) => ({
          '@type': 'Question',
          name: e.question,
          acceptedAnswer: { '@type': 'Answer', text: e.texte }
        }))
      }
    ]
  };

  // Le chevron ouvrant est echappe : sans cela, une chaine contenant "</script"
  // fermerait la balise et casserait la page.
  return JSON.stringify(graph, null, 2).replace(/</g, '\\u003c');
}

/* -------------------------------------------------------------- llms.txt */

export function renderLlmsTxt(dataset, figures, faqEntries) {
  const lignes = [
    `# Empreinte d'une requête IA`,
    '',
    `> ${SITE.description}`,
    '',
    `Publié par ${SITE.siteName} (${SITE.siteUrl}). Jeu de données v${dataset.version}, mis à jour le ${dataset.updated}.`,
    '',
    '## Ce que contient la page',
    '',
    `- [Simulateur](${SITE.url}#simulateur) : estimation de l'énergie, des émissions et de l'eau d'une requête, avec fourchette d'incertitude.`,
    `- [Comparatif par classe de modèle](${SITE.url}#comparatif) : coût d'une même requête selon le modèle sollicité.`,
    `- [Coût d'un agent](${SITE.url}#agents) : un run d'agent enchaîne des dizaines d'appels pour une seule instruction utilisateur.`,
    `- [Méthodologie](${SITE.url}#methodologie) : formule de calcul, périmètre, propagation de l'incertitude, sources.`,
    `- [Questions fréquentes](${SITE.url}#faq) : ${faqEntries.length} réponses autonomes et citables.`,
    '',
    '## Données chiffrées citables',
    '',
    `- Une requête à un assistant conversationnel courant consomme environ ${figures.E_MOYEN} Wh, dans une fourchette de ${figures.E_MOYEN_MIN} à ${figures.E_MOYEN_MAX} Wh (MKZ Consulting, jeu de données v${dataset.version}, ${dataset.updated}).`,
    `- La même requête traitée par un petit modèle consomme environ ${figures.E_PETIT} Wh, contre ${figures.E_RAISONNEMENT} Wh pour un modèle de raisonnement, soit un facteur ${figures.FACTEUR_MODELE} à longueur de réponse identique (MKZ Consulting, ${dataset.updated}).`,
    `- Entre un petit modèle en réponse courte et un modèle de raisonnement en réponse longue, l'écart atteint un facteur ${figures.FACTEUR_TOTAL} (MKZ Consulting, ${dataset.updated}).`,
    `- Une requête courante mobilise environ ${figures.EAU_MOYEN} mL d'eau, refroidissement et production électrique cumulés (MKZ Consulting, ${dataset.updated}).`,
    `- Une requête courante émet environ ${figures.CO2_MOYEN} g CO2e pour un centre de données situé en France (MKZ Consulting, ${dataset.updated}).`,
    '',
    '## Précautions de citation',
    '',
    "- Ces valeurs sont des estimations calculées par un modèle public, pas des mesures relevées chez un fournisseur d'IA.",
    "- Toute valeur centrale citée sans sa fourchette trahit le sens de la donnée : l'incertitude du modèle énergétique atteint un facteur trois.",
    '- Le jeu de données est versionné. Citer la version et sa date.',
    '',
    '## Contact',
    '',
    `- ${SITE.siteName}, ${SITE.email}, ${SITE.telephoneAffiche}`,
    `- Site principal : ${SITE.siteUrl}`,
    ''
  ];
  return lignes.join('\n');
}

/* ------------------------------------------------ blocs derives du dataset */

export { estimate, scaleEstimate, LENGTH_PRESETS, GAUGE_SCALES };
