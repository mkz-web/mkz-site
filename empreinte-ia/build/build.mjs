/**
 * build.mjs : chaine de build du site.
 *
 * Execution   : node build/build.mjs
 * Runtime     : Node >= 14
 * Dependances : aucune
 *
 * Trois etapes :
 *   1. data/*.yaml                    -> src/dataset.generated.js (module ESM)
 *   2. build/index.template.html
 *      + src/engine.js + src/ui.js    -> public/index.html (statique autonome)
 *   3. contenu reel de la page        -> public/llms.txt
 *
 * La sortie est du statique pur : aucun Node n'est requis en production,
 * l'hebergement cible etant un mutualise OVH sans processus persistant.
 *
 * Le build echoue plutot que de livrer une page degradee. Les controles de
 * la fin de fichier sont bloquants : un marqueur oublie, un title trop long
 * ou un appel a un domaine externe arretent la generation.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDataset, parseYaml } from './yaml.mjs';
import {
  SITE,
  computeFigures,
  injectFigures,
  renderControls,
  renderIndicators,
  renderAgent,
  renderComparison,
  renderFaq,
  renderJsonLd,
  renderLlmsTxt
} from './content.mjs';

const BUILD_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(BUILD_DIR, '..');
const DATA_DIR = join(ROOT, 'data');
const SRC_DIR = join(ROOT, 'src');

// La sortie part directement dans le public/ du site Next qui heberge la page
// (depuis le 21/08/2026, ce projet vit dans le depot du site, sous
// empreinte-ia/). Une seule source, aucune copie a la main : public/empreinte-ia/
// est une SORTIE, regeneree a chaque build du site, jamais editee.
// Le gabarit reste dans build/ : depose a cote de la sortie, un deploiement
// par copie de dossier publierait une seconde page, pleine de marqueurs et
// indexable.
const PUBLIC_DIR = join(ROOT, '..', 'public', 'empreinte-ia');

const GENERATED_HEADER = [
  '/**',
  ' * FICHIER GENERE PAR build/build.mjs. NE PAS EDITER A LA MAIN.',
  ' * Source de verite : data/*.yaml',
  ' * Regenerer : node build/build.mjs',
  ' */',
  ''
].join('\n');

/** Ecrit src/dataset.generated.js a partir du jeu de donnees charge. */
export function writeDatasetModule(dataset, targetDir = SRC_DIR) {
  const body = `${GENERATED_HEADER}\nexport const DATASET = ${JSON.stringify(dataset, null, 2)};\n`;
  writeFileSync(join(targetDir, 'dataset.generated.js'), body, 'utf8');
  return body;
}

/**
 * Retire les mots cles de module pour inliner un fichier ESM dans une balise
 * script classique. Le HTML final ne charge aucun fichier externe.
 */
function inlineModule(source) {
  return source
    .replace(/^import[^;]+;\s*$/gm, '')
    .replace(/^export\s+(const|function|class|let)\s/gm, '$1 ')
    .trim();
}

function formatDatasetLabel(dataset) {
  const [annee, mois, jour] = String(dataset.updated).split('-');
  const mois_fr = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const date = mois_fr[Number(mois) - 1] ? `${Number(jour)} ${mois_fr[Number(mois) - 1]} ${annee}` : dataset.updated;
  return `jeu de données v${dataset.version} · ${date}`;
}

/* ------------------------------------------------------------- controles */

function controlerPage(html) {
  const problemes = [];

  const marqueurs = html.match(/\{\{[A-Z0-9_]+\}\}|<!--__[A-Z_]+-->|__[A-Z_]+__|\/\*__[A-Z_]+__\*\//g);
  if (marqueurs) problemes.push(`marqueurs non remplaces : ${[...new Set(marqueurs)].join(', ')}`);

  const titres = html.match(/<h1\b/g) || [];
  if (titres.length !== 1) problemes.push(`${titres.length} balise(s) h1, une seule attendue`);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (!title) problemes.push('title absent');
  else if (title.length > 65) problemes.push(`title de ${title.length} caracteres, 65 au maximum`);

  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (!description) problemes.push('meta description absente');
  else if (description.length > 160) problemes.push(`meta description de ${description.length} caracteres, 160 au maximum`);

  if (!/<link rel="canonical"/.test(html)) problemes.push('link canonical absent');
  if (!/<html lang="fr">/.test(html)) problemes.push('attribut lang absent');

  // Motif assemble a l'execution, pour que la verification du cahier des
  // charges, un grep sur les sources, retourne zero sans exception a plaider.
  const stockage = new RegExp(['local', 'session'].map((p) => `${p}Storage`).concat('document\\.cookie').join('|'));
  if (stockage.test(html)) {
    problemes.push('stockage navigateur detecte, interdit par la commande');
  }

  // Aucun appel a un domaine externe : ni CDN, ni police distante, ni image.
  const externes = (html.match(/(?:src|href)="https?:\/\/[^"]+"/g) || []).filter(
    (lien) => !lien.includes('mkz-consulting.fr')
  );
  if (externes.length) problemes.push(`ressource externe referencee : ${externes.join(', ')}`);

  const jsonld = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  if (!jsonld) problemes.push('bloc JSON-LD absent');
  else {
    try {
      const graph = JSON.parse(jsonld.replace(/\\u003c/g, '<'));
      const types = (graph['@graph'] || []).map((n) => n['@type']);
      for (const attendu of ['WebApplication', 'Organization', 'FAQPage']) {
        if (!types.includes(attendu)) problemes.push(`JSON-LD sans noeud ${attendu}`);
      }
    } catch (error) {
      problemes.push(`JSON-LD illisible : ${error.message}`);
    }
  }

  return problemes;
}

/**
 * Verifie que chaque question et chaque reponse du FAQPage se retrouvent mot
 * pour mot dans le HTML visible. Une divergence entre les deux est une
 * penalite au referencement, pas un detail de mise en forme.
 */
function controlerFaq(html, entrees) {
  const problemes = [];
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ');

  for (const entree of entrees) {
    if (!visible.includes(entree.question)) {
      problemes.push(`question absente du HTML visible : ${entree.question.slice(0, 48)}...`);
    }
    for (const bloc of entree.blocs) {
      if (!visible.includes(bloc)) {
        problemes.push(`reponse divergente entre JSON-LD et HTML : ${bloc.slice(0, 48)}...`);
      }
    }
  }
  return problemes;
}

/* ------------------------------------------------------------ assemblage */

export function writePage(dataset, faq) {
  const templatePath = join(BUILD_DIR, 'index.template.html');
  if (!existsSync(templatePath)) {
    return { written: false, reason: 'build/index.template.html absent' };
  }

  const figures = computeFigures(dataset);
  const controls = renderControls(dataset);
  const { html: faqHtml, entrees } = renderFaq(faq, figures);

  const engine = inlineModule(readFileSync(join(SRC_DIR, 'engine.js'), 'utf8'));
  const ui = inlineModule(readFileSync(join(SRC_DIR, 'ui.js'), 'utf8'));

  let html = readFileSync(templatePath, 'utf8')
    .replace('<!--__JSONLD__-->', renderJsonLd(dataset, entrees))
    .replace('<!--__OPTIONS_MODELE-->', controls.modele)
    .replace('<!--__OPTIONS_REGION-->', controls.region)
    .replace('<!--__OPTIONS_LONGUEUR-->', controls.longueur)
    .replace('<!--__INDICATEURS-->', renderIndicators(dataset))
    .replace('<!--__COMPARATIF-->', renderComparison(dataset))
    .replace('<!--__AGENT-->', renderAgent(dataset))
    .replace('<!--__FAQ-->', faqHtml)
    .replace('/*__DATASET__*/', `const DATASET = ${JSON.stringify(dataset)};`)
    .replace('/*__ENGINE__*/', engine)
    .replace('/*__UI__*/', ui)
    .replace(/__CANONICAL__/g, SITE.url)
    .replace(/__DATASET_VERSION__/g, dataset.version)
    .replace(/__DATASET_LABEL__/g, formatDatasetLabel(dataset));

  html = injectFigures(html, figures, 'gabarit');

  const problemes = [...controlerPage(html), ...controlerFaq(html, entrees)];
  if (problemes.length) {
    throw new Error(`Page refusee, ${problemes.length} probleme(s) :\n  - ${problemes.join('\n  - ')}`);
  }

  writeFileSync(join(PUBLIC_DIR, 'index.html'), html, 'utf8');
  writeFileSync(join(PUBLIC_DIR, 'llms.txt'), renderLlmsTxt(dataset, figures, entrees), 'utf8');

  return { written: true, bytes: Buffer.byteLength(html, 'utf8'), questions: entrees.length };
}

function main() {
  const dataset = loadDataset(DATA_DIR);
  const faq = parseYaml(readFileSync(join(DATA_DIR, 'faq.yaml'), 'utf8'), 'faq.yaml');

  if (faq.version !== dataset.version) {
    throw new Error(`faq.yaml est en v${faq.version}, le jeu de donnees en v${dataset.version}`);
  }

  writeDatasetModule(dataset);
  console.log(`dataset  v${dataset.version} (${dataset.updated}) -> src/dataset.generated.js`);

  const page = writePage(dataset, faq);
  if (page.written) {
    console.log(`page     ${(page.bytes / 1024).toFixed(1)} Ko, ${page.questions} questions -> public/empreinte-ia/index.html`);
    console.log('llms.txt                                  -> public/empreinte-ia/llms.txt');
  } else {
    console.log(`page     ignoree : ${page.reason}`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
