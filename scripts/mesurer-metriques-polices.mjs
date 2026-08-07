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
 * donne 76 % là où la bonne valeur est 105 %. On balaie donc le size-adjust et
 * on garde celui qui redonne aux éléments RÉELLEMENT RENDUS leur hauteur
 * exacte, police web chargée. La valeur retenue est le centre du plateau où
 * l'écart est nul, pour être robuste aux arrondis d'une machine à l'autre.
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

    // Ascendante et descendante de la police web, mesurées à la taille
    // réellement utilisée (un axe de taille optique les fait varier).
    const taille = parseFloat(getComputedStyle(els[0]).fontSize) || 16;
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `${getComputedStyle(els[0]).fontWeight} ${taille}px "${g.web}"`;
    const m = ctx.measureText("Hxg");
    const asc = m.fontBoundingBoxAscent / taille;
    const desc = m.fontBoundingBoxDescent / taille;

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
    const minEcart = Math.min(...essais.map((e) => e.ecart));
    const retenu = parfaits.length
      ? Math.round((parfaits[0] + parfaits[parfaits.length - 1]) / 2)
      : essais.find((e) => e.ecart === minEcart).sa;

    resultats.push({
      nom: g.nom,
      web: g.web,
      locales: g.locales,
      nbElements: els.length,
      plateau: parfaits.length ? [parfaits[0], parfaits[parfaits.length - 1]] : null,
      ecartMin: minEcart,
      sizeAdjust: retenu,
      ascentOverride: (asc / (retenu / 100)) * 100,
      descentOverride: (desc / (retenu / 100)) * 100,
    });
  }
  return resultats;
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
await cdp.envoyer("Emulation.setDeviceMetricsOverride", {
  width: 412,
  height: 823,
  deviceScaleFactor: 1.75,
  mobile: true,
});

const charge = new Promise((res) => (cdp.etat.charge = res));
await cdp.envoyer("Page.navigate", { url: URL_CIBLE });
await Promise.race([charge, dormir(30000)]);
await cdp.envoyer("Runtime.evaluate", {
  expression: "document.fonts.ready",
  awaitPromise: true,
});

const r = await cdp.envoyer("Runtime.evaluate", {
  expression: `JSON.stringify((${balayer.toString()})(${JSON.stringify(GROUPES)}))`,
  returnByValue: true,
});
proc.kill();

const mesures = JSON.parse(r.result.value);
const p2 = (x) => `${x.toFixed(2)}%`;
console.log(`URL mesurée : ${URL_CIBLE}`);
console.log("Fenêtre : 412 x 823 (mobile)\n");

let alerte = false;
for (const m of mesures) {
  if (m.erreur) {
    alerte = true;
    console.log(`${m.nom} : ALERTE, ${m.erreur}\n`);
    continue;
  }
  console.log(`${m.nom} (repli de ${m.web}, calé sur ${m.locales[0]})`);
  console.log(`   éléments mesurés : ${m.nbElements}`);
  if (m.plateau) {
    console.log(`   plateau d'écart nul : ${m.plateau[0]}% à ${m.plateau[1]}%, centre retenu ${m.sizeAdjust}%`);
  } else {
    alerte = true;
    console.log(`   ALERTE : aucun size-adjust ne redonne les hauteurs exactes.`);
    console.log(`   Écart minimal ${m.ecartMin} px à ${m.sizeAdjust}%. Valeur à ne pas reporter en l'état.`);
  }
  console.log("");
}

console.log("=".repeat(64));
console.log("À reporter dans src/lib/GlobalStyles.tsx :\n");
for (const m of mesures) {
  if (m.erreur) continue;
  console.log(`@font-face {`);
  console.log(`  font-family: "${m.nom}";`);
  console.log(`  src: ${m.locales.map((l) => `local("${l}")`).join(", ")};`);
  console.log(`  size-adjust: ${m.sizeAdjust}%;`);
  console.log(`  ascent-override: ${p2(m.ascentOverride)};`);
  console.log(`  descent-override: ${p2(m.descentOverride)};`);
  console.log(`  line-gap-override: 0%;`);
  console.log(`}`);
}

if (alerte) {
  console.error("\nAu moins une mesure est douteuse : ne rien reporter avant de l'avoir corrigée.");
  process.exit(1);
}
