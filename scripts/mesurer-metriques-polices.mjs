/*
 * mesurer-metriques-polices.mjs
 *
 * Trouve le size-adjust de chaque police de repli pour que l'arrivée de la
 * police web ne redistribue plus les lignes (donc ne produise plus de CLS),
 * puis imprime les blocs @font-face prêts à coller dans src/lib/GlobalStyles.tsx.
 *
 * Exécution   : node scripts/mesurer-metriques-polices.mjs [url]
 *               (par défaut http://localhost:3000/, sinon une URL servie)
 * Runtime     : Node >= 22 (WebSocket global), plus Chrome sur le poste
 *               (chemin auto-détecté, surchargeable par CHROME_PATH)
 * Dépendances : aucune
 *
 * MÉTHODE, et pourquoi celle-là. On ne calcule PAS le ratio à partir de
 * largeurs de texte mesurées au canvas : Fraunces porte un axe de taille
 * optique, ses proportions à 1000 px ne sont pas celles à 42 px, et ce calcul
 * donne 76 % là où la bonne valeur est 104 %. On balaie donc le size-adjust et
 * on garde celui qui redonne aux éléments RÉELLEMENT RENDUS leur hauteur
 * exacte, police web chargée.
 *
 * Le balayage est rejoué à PLUSIEURS LARGEURS et la valeur retenue est le
 * centre de l'INTERSECTION des plateaux. Une largeur unique ne suffit pas :
 * réglé sur 412 px seulement, le repli d'Archivo sortait à 101 %, hors du
 * plateau de 375 px, et un paragraphe y gagnait une ligne. Les retours à la
 * ligne dépendent de la largeur, donc le réglage doit tenir sur la plage.
 *
 * Le calage vise la première police locale citée, celle du poste de mesure.
 * Sur un autre système, l'ajustement reste une approximation.
 */

import http from "node:http";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_CIBLE = process.argv[2] || "http://localhost:3000/";
const PORT = 9334;
// Largeurs balayées. Le réglage retenu doit tenir sur toutes.
const LARGEURS = [375, 412];

// Un groupe par famille, aligné sur theme.ts.
const GROUPES = [
  { nom: "Fraunces Fallback", web: "Fraunces", locales: ["Georgia", "Times New Roman"], selecteur: "h1, h2, h3" },
  { nom: "Archivo Fallback", web: "Archivo", locales: ["Segoe UI", "Helvetica Neue", "Arial"], selecteur: null },
  { nom: "Plex Mono Fallback", web: "IBM Plex Mono", locales: ["Consolas", "Menlo", "Courier New"], selecteur: null },
];

const CHEMINS_CHROME = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

function getJson(chemin) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: "127.0.0.1", port: PORT, path: chemin }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(d));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

async function ouvrirCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });
  let id = 0;
  const attente = new Map();
  const etat = { charge: null };
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && attente.has(m.id)) {
      attente.get(m.id)(m);
      attente.delete(m.id);
    }
    if (m.method === "Page.loadEventFired" && etat.charge) etat.charge();
  };
  return {
    etat,
    envoyer(method, params = {}) {
      const n = ++id;
      return new Promise((res, rej) => {
        attente.set(n, (m) => (m.error ? rej(new Error(`${method} : ${m.error.message}`)) : res(m.result)));
        ws.send(JSON.stringify({ id: n, method, params }));
      });
    },
  };
}

// Exécuté DANS la page.
function balayer(groupes) {
  const feuilles = [...document.querySelectorAll("body *")].filter(
    (e) => e.children.length === 0 && e.textContent.trim().length > 3
  );
  const resultats = [];
  let compteur = 0;

  for (const g of groupes) {
    const els = g.selecteur
      ? [...document.querySelectorAll(g.selecteur)]
      : feuilles.filter((e) => getComputedStyle(e).fontFamily.includes(g.web));

    if (!els.length) {
      resultats.push({ ...g, erreur: "aucun élément ne rend cette famille sur la page" });
      continue;
    }

    // Hauteurs de référence, police web chargée.
    const ref = els.map((e) => Math.round(e.getBoundingClientRect().height));

    // Ascendante et descendante de la police web, en fraction d'em. Mesurées
    // EN GRAND : à 12,5 px, Chrome arrondit la boîte au pixel et l'erreur
    // relative suffit à empêcher tout plateau de se former (constaté : 3 px
    // résiduels sur le mono, et une fausse alerte à la clé). C'est la largeur,
    // pas la hauteur, que l'axe de taille optique fait varier, et la largeur
    // est justement obtenue par balayage empirique juste en dessous.
    const TAILLE_METRIQUE = 400;
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `${getComputedStyle(els[0]).fontWeight} ${TAILLE_METRIQUE}px "${g.web}"`;
    const m = ctx.measureText("Hxg");
    const asc = m.fontBoundingBoxAscent / TAILLE_METRIQUE;
    const desc = m.fontBoundingBoxDescent / TAILLE_METRIQUE;

    const essais = [];
    for (let sa = 80; sa <= 140; sa++) {
      const fam = `SONDE${compteur++}`;
      const st = document.createElement("style");
      st.textContent = `@font-face{font-family:"${fam}";src:local("${g.locales[0]}");
        size-adjust:${sa}%;ascent-override:${((asc / (sa / 100)) * 100).toFixed(2)}%;
        descent-override:${((desc / (sa / 100)) * 100).toFixed(2)}%;line-gap-override:0%}`;
      document.head.appendChild(st);
      const anciens = els.map((e) => e.style.fontFamily);
      els.forEach((e) => (e.style.fontFamily = `"${fam}", ${g.locales[0]}`));
      void document.body.offsetHeight;
      const hs = els.map((e) => Math.round(e.getBoundingClientRect().height));
      els.forEach((e, i) => (e.style.fontFamily = anciens[i]));
      st.remove();
      void document.body.offsetHeight;
      essais.push({ sa, ecart: hs.reduce((a, v, i) => a + Math.abs(v - ref[i]), 0) });
    }

    const parfaits = essais.filter((e) => e.ecart === 0).map((e) => e.sa);
    resultats.push({
      nom: g.nom,
      web: g.web,
      locales: g.locales,
      nbElements: els.length,
      asc,
      desc,
      plateau: parfaits.length ? [parfaits[0], parfaits[parfaits.length - 1]] : null,
      ecartMin: Math.min(...essais.map((e) => e.ecart)),
    });
  }
  return resultats;
}

// Intersection des plateaux relevés à chaque largeur.
function croiser(parLargeur) {
  const bornes = parLargeur.map((m) => m.plateau).filter(Boolean);
  if (bornes.length !== parLargeur.length) return null;
  const bas = Math.max(...bornes.map((b) => b[0]));
  const haut = Math.min(...bornes.map((b) => b[1]));
  return bas <= haut ? [bas, haut] : null;
}

const chrome = CHEMINS_CHROME.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome introuvable. Renseigner la variable CHROME_PATH.");
  process.exit(1);
}

const proc = spawn(
  chrome,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${join(tmpdir(), "mkz-metriques-polices")}`,
    "--no-first-run",
    "--disable-gpu",
    "--window-size=412,823",
  ],
  { stdio: "ignore" }
);

let cible = null;
for (let i = 0; i < 40 && !cible; i++) {
  await dormir(400);
  try {
    cible = (await getJson("/json/list")).find((t) => t.type === "page");
  } catch {
    /* pas encore prêt */
  }
}
if (!cible) {
  console.error(`Chrome injoignable sur le port ${PORT}.`);
  proc.kill();
  process.exit(1);
}

const cdp = await ouvrirCdp(cible.webSocketDebuggerUrl);
await cdp.envoyer("Page.enable");
await cdp.envoyer("Runtime.enable");
const charge = new Promise((res) => (cdp.etat.charge = res));
await cdp.envoyer("Page.navigate", { url: URL_CIBLE });
await Promise.race([charge, dormir(30000)]);
await cdp.envoyer("Runtime.evaluate", {
  expression: "document.fonts.ready",
  awaitPromise: true,
});

const parLargeur = {};
for (const largeur of LARGEURS) {
  await cdp.envoyer("Emulation.setDeviceMetricsOverride", {
    width: largeur,
    height: 823,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await dormir(400);
  const r = await cdp.envoyer("Runtime.evaluate", {
    expression: `JSON.stringify((${balayer.toString()})(${JSON.stringify(GROUPES)}))`,
    returnByValue: true,
  });
  parLargeur[largeur] = JSON.parse(r.result.value);
}
proc.kill();

const p2 = (x) => `${x.toFixed(2)}%`;
console.log(`URL mesurée : ${URL_CIBLE}`);
console.log(`Largeurs balayées : ${LARGEURS.join(" px, ")} px\n`);

let alerte = false;
const retenus = [];
for (let i = 0; i < GROUPES.length; i++) {
  const parW = LARGEURS.map((w) => parLargeur[w][i]);
  const ref = parW[0];
  if (parW.some((m) => m.erreur)) {
    alerte = true;
    console.log(`${GROUPES[i].nom} : ALERTE, ${parW.find((m) => m.erreur).erreur}\n`);
    continue;
  }
  console.log(`${ref.nom} (repli de ${ref.web}, calé sur ${ref.locales[0]})`);
  LARGEURS.forEach((w, k) => {
    const m = parW[k];
    console.log(
      `   ${w} px : ${m.nbElements} éléments, ` +
        (m.plateau ? `plateau d'écart nul ${m.plateau[0]}% à ${m.plateau[1]}%` : `AUCUN plateau, écart minimal ${m.ecartMin} px`)
    );
  });
  const inter = croiser(parW);
  if (!inter) {
    alerte = true;
    console.log(`   ALERTE : pas de valeur commune à toutes les largeurs. Ne rien reporter.\n`);
    continue;
  }
  const sa = Math.round(((inter[0] + inter[1]) / 2) * 2) / 2; // au demi-pourcent
  console.log(`   intersection ${inter[0]}% à ${inter[1]}%, centre retenu ${sa}%\n`);
  retenus.push({
    nom: ref.nom,
    locales: ref.locales,
    sa,
    ascentOverride: (ref.asc / (sa / 100)) * 100,
    descentOverride: (ref.desc / (sa / 100)) * 100,
  });
}

console.log("=".repeat(64));
console.log("À reporter dans src/lib/GlobalStyles.tsx :\n");
for (const m of retenus) {
  console.log(`@font-face {`);
  console.log(`  font-family: "${m.nom}";`);
  console.log(`  src: ${m.locales.map((l) => `local("${l}")`).join(", ")};`);
  console.log(`  size-adjust: ${m.sa}%;`);
  console.log(`  ascent-override: ${p2(m.ascentOverride)};`);
  console.log(`  descent-override: ${p2(m.descentOverride)};`);
  console.log(`  line-gap-override: 0%;`);
  console.log(`}`);
}

if (alerte) {
  console.error("\nAu moins une mesure est douteuse : ne rien reporter avant de l'avoir corrigée.");
  process.exit(1);
}
