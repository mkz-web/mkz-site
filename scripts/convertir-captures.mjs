/**
 * Convertit des captures d'écran PNG en WebP compressés pour les articles.
 *
 * Exécution :
 *   node scripts/convertir-captures.mjs --dest=public/images/conseils \
 *        [--largeur-max=1400] [--qualite=82] "source.png=nom-de-sortie.webp" ...
 *
 * Runtime minimal : Node >= 14 (fs, path, os, child_process).
 * Dépendances : aucune à installer.
 *
 * Exception documentée : ce script a une dépendance sur un binaire déjà présent
 * sur le poste, le navigateur Chromium (Edge est natif sur Windows 11, Chrome
 * sinon). Node ne sait pas encoder le VP8, donc pas de WebP en pur Node ; on
 * utilise le canvas du navigateur en headless (toDataURL) comme encodeur. Même
 * mécanique que le skill generate-image-gemini, ici étendue au redimensionnement
 * et à la conversion en un seul lancement pour tout le lot.
 *
 * Sortie : chaque fichier écrit, avec dimensions et poids avant/après.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

/* ─── Arguments ─── */

const argv = process.argv.slice(2);
const options = { dest: null, largeurMax: 1400, qualite: 82 };
const paires = [];

for (const arg of argv) {
  const opt = arg.match(/^--([a-z-]+)(?:=(.*))?$/);
  if (opt) {
    const [, nom, valeur] = opt;
    if (nom === "dest") options.dest = valeur;
    else if (nom === "largeur-max") options.largeurMax = parseInt(valeur, 10);
    else if (nom === "qualite") options.qualite = parseFloat(valeur);
    else {
      console.error(`[ERR] Option inconnue : --${nom}`);
      process.exit(1);
    }
    continue;
  }
  const sep = arg.lastIndexOf("=");
  if (sep === -1) {
    console.error(`[ERR] Argument attendu sous la forme "source.png=sortie.webp" : ${arg}`);
    process.exit(1);
  }
  paires.push({ source: arg.slice(0, sep), sortie: arg.slice(sep + 1) });
}

if (!options.dest || paires.length === 0) {
  console.error('Usage : node scripts/convertir-captures.mjs --dest=<dossier> "source.png=sortie.webp" ...');
  process.exit(1);
}

const qualite = options.qualite > 1 ? options.qualite / 100 : options.qualite;

/* ─── Dimensions du PNG (chunk IHDR) ─── */

function dimensionsPng(buffer, chemin) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error(`${chemin} n'est pas un PNG`);
  }
  return { largeur: buffer.readUInt32BE(16), hauteur: buffer.readUInt32BE(20) };
}

/* ─── Navigateur Chromium local (encodeur WebP) ─── */

function trouverChromium() {
  // CHROME_PATH d'abord : même convention que le skill generate-image-gemini.
  // Nécessaire parce qu'un Chromium peut être présent ET défaillant. Mesuré le
  // 15/08/2026 sur ce poste : msedge.exe accepte --headless, sort en code 0 et
  // n'écrit aucun encodage, ce qui faisait échouer tout le lot alors que Chrome
  // installé à côté fonctionnait. Sans surcharge possible, le premier candidat
  // trouvé était aussi le seul essayé.
  const force = process.env.CHROME_PATH;
  if (force && fs.existsSync(force)) return force;

  const candidats =
    process.platform === "win32"
      ? [
          "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          path.join(os.homedir(), "AppData", "Local", "Google", "Chrome", "Application", "chrome.exe"),
        ]
      : process.platform === "darwin"
        ? [
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
            "/Applications/Chromium.app/Contents/MacOS/Chromium",
          ]
        : ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge"];
  return candidats.find((p) => fs.existsSync(p)) || null;
}

/* ─── Encodage du lot en un seul lancement de navigateur ─── */

function encoderLot(images) {
  const navigateur = trouverChromium();
  if (!navigateur) throw new Error("Aucun navigateur Chromium trouvé (Edge ou Chrome requis pour encoder le WebP)");

  const empreinte = `captures-${process.pid}-${Date.now()}`;
  const htmlTemp = path.join(os.tmpdir(), `${empreinte}.html`);
  const profilTemp = path.join(os.tmpdir(), `${empreinte}-profil`);

  // Le PNG est inliné en data: URL : une image file:// « tainterait » le canvas
  // (SecurityError sur toDataURL), pas une data: URL.
  const lot = images.map((img) => ({
    id: img.sortie,
    largeur: img.largeurCible,
    hauteur: img.hauteurCible,
    png: img.buffer.toString("base64"),
  }));

  fs.writeFileSync(
    htmlTemp,
    `<!doctype html><html><body><script>
const lot = ${JSON.stringify(lot)};
const q = ${qualite};
const sorties = [];
let reste = lot.length;
function fini() {
  if (--reste === 0) document.body.textContent = 'DEBUT' + JSON.stringify(sorties) + 'FIN';
}
for (const item of lot) {
  const image = new Image();
  image.onload = () => {
    const toile = document.createElement('canvas');
    toile.width = item.largeur; toile.height = item.hauteur;
    const ctx = toile.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, item.largeur, item.hauteur);
    sorties.push({ id: item.id, data: toile.toDataURL('image/webp', q) });
    fini();
  };
  image.onerror = () => { sorties.push({ id: item.id, erreur: 'décodage impossible' }); fini(); };
  image.src = 'data:image/png;base64,' + item.png;
}
<\/script></body></html>`,
  );

  try {
    const res = spawnSync(
      navigateur,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${profilTemp}`, // profil jetable : n'interfère pas avec un navigateur ouvert
        "--virtual-time-budget=60000",
        "--dump-dom",
        `file:///${htmlTemp.replace(/\\/g, "/")}`,
      ],
      { maxBuffer: 512 * 1024 * 1024, timeout: 180000, encoding: "utf8" },
    );

    const sortie = res.stdout || "";
    const bornes = sortie.match(/DEBUT(\[.*\])FIN/s);
    if (!bornes) {
      throw new Error(`encodage WebP non obtenu (navigateur : ${path.basename(navigateur)}, code ${res.status})`);
    }
    const resultats = new Map();
    for (const item of JSON.parse(bornes[1])) {
      if (item.erreur) throw new Error(`${item.id} : ${item.erreur}`);
      const base64 = item.data.replace(/^data:image\/webp;base64,/, "");
      if (base64 === item.data) throw new Error(`${item.id} : le navigateur n'a pas produit de WebP`);
      resultats.set(item.id, Buffer.from(base64, "base64"));
    }
    return resultats;
  } finally {
    try {
      fs.unlinkSync(htmlTemp);
    } catch {
      /* fichier temporaire déjà parti */
    }
    try {
      fs.rmSync(profilTemp, { recursive: true, force: true });
    } catch {
      /* profil temporaire déjà parti */
    }
  }
}

/* ─── Exécution ─── */

const images = paires.map(({ source, sortie }) => {
  const buffer = fs.readFileSync(source);
  const { largeur, hauteur } = dimensionsPng(buffer, source);
  const ratio = Math.min(1, options.largeurMax / largeur);
  return {
    source,
    sortie,
    buffer,
    largeurSource: largeur,
    hauteurSource: hauteur,
    largeurCible: Math.round(largeur * ratio),
    hauteurCible: Math.round(hauteur * ratio),
  };
});

const encodees = encoderLot(images);
fs.mkdirSync(options.dest, { recursive: true });

let poidsAvant = 0;
let poidsApres = 0;
for (const image of images) {
  const webp = encodees.get(image.sortie);
  if (!webp) throw new Error(`${image.sortie} : aucun résultat renvoyé par le navigateur`);
  const cible = path.join(options.dest, image.sortie);
  fs.writeFileSync(cible, webp);
  poidsAvant += image.buffer.length;
  poidsApres += webp.length;
  const redim =
    image.largeurCible === image.largeurSource
      ? `${image.largeurSource}x${image.hauteurSource}`
      : `${image.largeurSource}x${image.hauteurSource} -> ${image.largeurCible}x${image.hauteurCible}`;
  console.log(
    `[OK] ${image.sortie.padEnd(28)} ${redim.padEnd(26)} ` +
      `${(image.buffer.length / 1024).toFixed(1)} Ko -> ${(webp.length / 1024).toFixed(1)} Ko ` +
      `(width=${image.largeurCible} height=${image.hauteurCible})`,
  );
}

console.log(
  `\n${images.length} capture(s) : ${(poidsAvant / 1024).toFixed(1)} Ko -> ${(poidsApres / 1024).toFixed(1)} Ko ` +
    `(${Math.round((1 - poidsApres / poidsAvant) * 100)} % de gain, qualité ${Math.round(qualite * 100)}, largeur max ${options.largeurMax} px)`,
);
