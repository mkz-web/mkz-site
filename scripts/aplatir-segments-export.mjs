// Remet à plat les fichiers de segment RSC de l'export statique quand le build tourne sous Windows.
//
// Usage   : node scripts/aplatir-segments-export.mjs          (enchaîné par `npm run build`)
//           node scripts/aplatir-segments-export.mjs --controle   (ne modifie rien, sort en 1 si défaut)
// Runtime : Node 18+. Dépendances : aucune (fs/path natifs).
//
// Pourquoi (mesuré le 17/09/2026, Next 16.2.3, relu identique sur 16.3.5 et sur canary) :
// l'export de Next liste les segments par `path.relative`, qui sous Windows sépare par des
// antislashs, puis fabrique le nom du fichier en ne remplaçant QUE les barres obliques par des
// points. Résultat sous Windows : `out/contact/__next.!KGZyKQ/contact/__PAGE__.txt`, alors que le
// routeur client demande `out/contact/__next.!KGZyKQ.contact.__PAGE__.txt` (la forme qu'un build
// Linux écrit). Chaque lien préchargé coûtait deux requêtes en 404 (15 à 17 par page à 1 280 px),
// autant d'erreurs console, et la navigation retombait sur la charge RSC complète au clic.
// Défaut connu en amont : vercel/next.js issue 85374 (ouverte), PR 86948 et 92340 (non fusionnées
// au 17/09/2026). Le jour où l'une d'elles est publiée, ce script ne trouve plus rien à faire :
// le retirer alors de la ligne `build` de package.json, avec le contrôle 9 de validate-out.mjs.
//
// Ce que fait le script : chaque fichier rangé sous un dossier `__next.*` de out/ est DÉPLACÉ sous
// son nom à points, à côté du dossier, puis les dossiers vidés sont supprimés. La sortie devient
// celle d'un build Linux. Sans dossier `__next.*` (build Linux, ou Next corrigé), il ne touche à rien.
// Il refuse d'écraser un fichier existant au contenu différent, et vérifie en fin de passe qu'il ne
// reste aucun dossier `__next.*` dans out/.

import { promises as fs, existsSync } from "node:fs";
import { resolve, dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "out");
const controleSeul = process.argv.includes("--controle");

if (!existsSync(outDir)) {
  console.error("❌ out/ introuvable. Lance `npm run build` d'abord.");
  process.exit(1);
}

const dodo = (ms) => new Promise((r) => setTimeout(r, ms));

// out/ est synchronisé par OneDrive, qui verrouille des fichiers par intermittence (EBUSY, EPERM).
async function avecReprise(geste) {
  for (let essai = 1; ; essai++) {
    try {
      return await geste();
    } catch (e) {
      if (essai >= 8 || !["EBUSY", "EPERM", "ENOTEMPTY"].includes(e.code)) throw e;
      await dodo(150 * essai);
    }
  }
}

async function dossiersDeSegments(dir, trouves = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = join(dir, e.name);
    // Un dossier `__next.*` n'existe que par le défaut : on ne descend pas dedans pour en chercher d'autres.
    if (e.name.startsWith("__next.")) trouves.push(p);
    else await dossiersDeSegments(p, trouves);
  }
  return trouves;
}

async function fichiersSous(dir, trouves = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await fichiersSous(p, trouves);
    else trouves.push(p);
  }
  return trouves;
}

const dossiers = await dossiersDeSegments(outDir);

if (controleSeul) {
  if (dossiers.length) {
    console.error(
      `❌ ${dossiers.length} dossier(s) de segments non aplatis dans out/ (ex. ${relative(root, dossiers[0])}) : ` +
        "le préchargement des liens sortira en 404. Lance `node scripts/aplatir-segments-export.mjs`."
    );
    process.exit(1);
  }
  console.log("✅ Segments RSC : aucun dossier `__next.*` dans out/, noms à points partout.");
  process.exit(0);
}

if (!dossiers.length) {
  console.log("Segments RSC : aucun dossier `__next.*` dans out/, rien à aplatir (build Linux ou Next corrigé).");
  process.exit(0);
}

let deplaces = 0;
let dejaLa = 0;
for (const dossier of dossiers) {
  const parent = dirname(dossier);
  for (const source of await fichiersSous(dossier)) {
    // `__next.!KGZyKQ/contact/__PAGE__.txt` devient `__next.!KGZyKQ.contact.__PAGE__.txt`
    const nomAPoints = relative(parent, source).split(sep).join(".");
    const cible = join(parent, nomAPoints);
    if (existsSync(cible)) {
      const [a, b] = await Promise.all([fs.readFile(source), fs.readFile(cible)]);
      if (!a.equals(b)) {
        console.error(`❌ ${relative(root, cible)} existe déjà avec un contenu différent de ${relative(root, source)} : rien n'est écrasé.`);
        process.exit(1);
      }
      await avecReprise(() => fs.unlink(source));
      dejaLa++;
    } else {
      await avecReprise(() => fs.rename(source, cible));
      deplaces++;
    }
  }
  await avecReprise(() => fs.rm(dossier, { recursive: true }));
}

const restants = await dossiersDeSegments(outDir);
if (restants.length) {
  console.error(`❌ ${restants.length} dossier(s) \`__next.*\` encore présents après la passe (ex. ${relative(root, restants[0])}).`);
  process.exit(1);
}
console.log(
  `✅ Segments RSC aplatis : ${deplaces} fichier(s) déplacé(s) sous leur nom à points, ` +
    `${dejaLa} déjà en place, ${dossiers.length} dossier(s) \`__next.*\` supprimé(s), 0 restant.`
);
