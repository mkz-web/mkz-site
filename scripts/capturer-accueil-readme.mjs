// Capture réelle de l'accueil en production pour le README du dépôt
// (.github/readme/accueil-1280.webp et accueil-375.webp), à rejouer quand
// l'accueil change (règle AGENTS.md : jamais d'illustration à la place d'une
// capture, jamais de fausse preuve), puis mettre à jour la date de la légende
// sous les images dans README.md.
//
// Exécution : node scripts/capturer-accueil-readme.mjs [--url=https://mkz-consulting.fr/]
//                  [--sortie=.github/readme]
// Runtime : Node >= 22 (WebSocket et fetch globaux). Dépendances : aucune.
// Exception documentée : dépendance sur un binaire déjà présent sur le poste,
// Google Chrome (chemin standard ou CHROME_PATH), pour le rendu et pour
// l'encodage WebP de convertir-captures.mjs.
//
// Dans l'ordre : Chrome headless piloté en CDP ; cookie de consentement
// « mkz-consent » posé en REFUS avant le chargement, donc pas de bandeau et
// aucun script de mesure ; deux vues, 1 280 x 800 (bureau) et 375 x 812
// (mobile), toutes deux en DPR 2 ; contrôles avant capture : bandeau absent,
// aucun débordement horizontal, H1 présent ; PNG du premier écran ; conversion
// en WebP (1 600 px de large au plus, qualité 80). Le script refuse de produire
// une image si un contrôle échoue.
//
// Il écrit aussi le logo du README (.github/readme/logo-clair.svg et
// logo-sombre.svg), extrait du sprite de la charte SERVI par la page : mêmes
// tracés, mêmes dégradés, lettres à la couleur calculée du logo de l'en-tête
// (fond clair) et du pied de page (fond sombre). Aucun dessin recopié à la main,
// donc aucune dérive possible entre le site et le README. Refus d'écrire si le
// sprite n'a pas ses 3 tracés de lettres et ses 2 bandes de chevron.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const opts = { url: "https://mkz-consulting.fr/", sortie: ".github/readme" };
for (const a of process.argv.slice(2)) {
  const m = a.match(/^--([a-z]+)=(.*)$/);
  if (m && m[1] in opts) opts[m[1]] = m[2];
}
const VUES = [
  { nom: "accueil-1280", largeur: 1280, hauteur: 800, mobile: false },
  { nom: "accueil-375", largeur: 375, hauteur: 812, mobile: true },
];
const chrome = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
if (!fs.existsSync(chrome)) {
  console.error("Chrome introuvable : " + chrome + " (définir CHROME_PATH)");
  process.exit(1);
}

const port = 9500 + Math.floor(Math.random() * 400);
const profil = fs.mkdtempSync(path.join(os.tmpdir(), "mkz-readme-"));
const proc = spawn(
  chrome,
  [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profil}`,
    "--window-size=1280,800",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "about:blank",
  ],
  { stdio: "ignore" }
);
const dodo = (ms) => new Promise((r) => setTimeout(r, ms));

async function attendreChrome() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return;
    } catch {
      /* pas encore prêt */
    }
    await dodo(250);
  }
  throw new Error("Chrome ne répond pas sur le port " + port);
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const attentes = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && attentes.has(msg.id)) {
      const { resolve, reject } = attentes.get(msg.id);
      attentes.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    }
  });
  const ouvert = new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });
  return {
    ouvert,
    envoyer: (method, params = {}) =>
      new Promise((resolve, reject) => {
        const i = ++id;
        attentes.set(i, { resolve, reject });
        ws.send(JSON.stringify({ id: i, method, params }));
      }),
    fermer: () => ws.close(),
  };
}

async function evaluer(c, expression) {
  const r = await c.envoyer("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return r.result.value;
}

// Logo de la charte, lu dans le sprite de la page (src/components/charte/Sprite.tsx une fois servi).
const EXTRAIRE_LOGO = `JSON.stringify((() => {
  const svgNav = document.querySelector(".nav__logo svg");
  const pied = document.querySelector(".pied__logo");
  const ids = ["g-haut", "g-bas", "decoupe", "logo-lettres", "logo-chevron"];
  const el = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
  if (!svgNav || !pied || ids.some((id) => !el[id])) return null;
  return {
    viewBox: svgNav.getAttribute("viewBox"),
    clair: getComputedStyle(svgNav).fill,
    sombre: getComputedStyle(pied).fill,
    defs: ["g-haut", "g-bas", "decoupe"].map((id) => el[id].outerHTML).join(""),
    lettres: el["logo-lettres"].innerHTML,
    chevron: el["logo-chevron"].outerHTML,
    nbLettres: el["logo-lettres"].querySelectorAll("path").length,
    nbChevron: el["logo-chevron"].querySelectorAll("rect").length,
  };
})())`;

function ecrireLogos(logo) {
  if (!logo) throw new Error("logo : sprite de la charte introuvable dans la page");
  if (logo.nbLettres !== 3 || logo.nbChevron !== 2) {
    throw new Error(`logo : ${logo.nbLettres} tracés de lettres et ${logo.nbChevron} bandes de chevron, 3 et 2 attendus`);
  }
  const couleur = /^rgb\(\d+, \d+, \d+\)$/;
  if (!couleur.test(logo.clair) || !couleur.test(logo.sombre) || logo.clair === logo.sombre) {
    throw new Error(`logo : couleurs inattendues (clair ${logo.clair}, sombre ${logo.sombre})`);
  }
  const [, , l, h] = logo.viewBox.split(" ").map(Number);
  for (const [nom, fill] of [["logo-clair", logo.clair], ["logo-sombre", logo.sombre]]) {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logo.viewBox}" width="${l}" height="${h}" role="img" aria-label="MKZ">` +
      `<title>MKZ</title><defs>${logo.defs}</defs><g fill="${fill}">${logo.lettres}</g>${logo.chevron}</svg>\n`;
    const f = path.join(racine, opts.sortie, nom + ".svg");
    fs.writeFileSync(f, svg);
    console.log(`${nom}.svg : lettres ${fill}, ${fs.statSync(f).size} octets`);
  }
}

async function capturer(vue) {
  const cible = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const c = cdp(cible.webSocketDebuggerUrl);
  await c.ouvert;
  await c.envoyer("Page.enable");
  await c.envoyer("Network.enable");
  // Même contrat que src/lib/consent.ts : refus enregistré, bandeau muet, aucun script de mesure.
  const consent = { v: 1, id: "00000000-0000-4000-8000-000000000000", date: new Date().toISOString(), audience: false };
  const pose = await c.envoyer("Network.setCookie", {
    name: "mkz-consent",
    value: encodeURIComponent(JSON.stringify(consent)),
    url: new URL(opts.url).origin + "/",
    path: "/",
    secure: opts.url.startsWith("https:"),
    sameSite: "Lax",
  });
  if (!pose.success) throw new Error("cookie de consentement non posé");
  await c.envoyer("Emulation.setDeviceMetricsOverride", {
    width: vue.largeur,
    height: vue.hauteur,
    deviceScaleFactor: 2,
    mobile: vue.mobile,
  });
  if (vue.mobile) {
    await c.envoyer("Emulation.setUserAgentOverride", {
      userAgent:
        "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36",
    });
  }
  await c.envoyer("Page.navigate", { url: opts.url });
  let pret = false;
  for (let i = 0; i < 80 && !pret; i++) {
    await dodo(250);
    pret = await evaluer(c, "document.readyState === 'complete' && document.fonts.status === 'loaded'");
  }
  if (!pret) throw new Error("page non chargée : " + opts.url);
  await dodo(2500); // animations d'entrée de la charte (GSAP) terminées et polices posées
  const etat = JSON.parse(
    await evaluer(
      c,
      "JSON.stringify({ banniere: document.documentElement.hasAttribute('data-consent-open'), h1: (document.querySelector('h1') || {}).innerText || null, largeurDoc: document.documentElement.scrollWidth, innerWidth: window.innerWidth })"
    )
  );
  if (etat.banniere) throw new Error(vue.nom + " : bandeau de consentement visible, capture refusée");
  if (!etat.h1) throw new Error(vue.nom + " : aucun H1 dans la page");
  if (etat.largeurDoc > etat.innerWidth) {
    throw new Error(vue.nom + " : débordement horizontal " + etat.largeurDoc + " > " + etat.innerWidth);
  }
  const shot = await c.envoyer("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width: vue.largeur, height: vue.hauteur, scale: 1 },
  });
  const logo = vue.mobile ? null : JSON.parse(await evaluer(c, EXTRAIRE_LOGO));
  c.fermer();
  const png = path.join(profil, vue.nom + ".png");
  fs.writeFileSync(png, Buffer.from(shot.data, "base64"));
  console.log(
    `${vue.nom} : ${vue.largeur}x${vue.hauteur} px CSS, H1 « ${etat.h1} », bandeau absent, débordement 0, PNG ${fs.statSync(png).size} octets`
  );
  return { png, logo };
}

try {
  await attendreChrome();
  const pngs = [];
  let logo = null;
  for (const vue of VUES) {
    const r = await capturer(vue);
    pngs.push({ vue, png: r.png });
    if (r.logo) logo = r.logo;
  }
  fs.mkdirSync(path.join(racine, opts.sortie), { recursive: true });
  ecrireLogos(logo);
  const args = [
    "scripts/convertir-captures.mjs",
    `--dest=${opts.sortie}`,
    "--largeur-max=1600",
    "--qualite=80",
    ...pngs.map((p) => `${p.png}=${p.vue.nom}.webp`),
  ];
  const conv = spawnSync(process.execPath, args, {
    cwd: racine,
    stdio: "inherit",
    env: { ...process.env, CHROME_PATH: chrome },
  });
  if (conv.status !== 0) throw new Error("conversion WebP en échec (code " + conv.status + ")");
  for (const p of pngs) {
    const f = path.join(racine, opts.sortie, p.vue.nom + ".webp");
    console.log(`${p.vue.nom}.webp : ${fs.statSync(f).size} octets`);
  }
  console.log(
    "Penser à mettre à jour la date de la légende sous les captures dans README.md (" +
      new Date().toLocaleDateString("fr-FR") +
      ")."
  );
} finally {
  if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(proc.pid), "/T", "/F"], { stdio: "ignore" });
  else proc.kill();
}
