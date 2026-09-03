// Capture réelle de l'aperçu du scan (public/images/outils/scan-apercu.webp
// et scan-apercu-en.webp), rejouable à chaque fois que l'outil ou le score de
// mkz-consulting.fr change (règle AGENTS.md : jamais d'illustration à la place
// d'une capture, jamais de fausse preuve).
//
// Exécution : node scripts/capturer-apercu-scan.mjs [--base=http://localhost:8788]
//                  [--site=mkz-consulting.fr] [--dest=public/images/outils] [--marge=16]
// Prérequis : le build servi par `npx wrangler pages dev out --port 8788`
//             (fonctions /api/scan comprises, .dev.vars avec les identifiants
//             DataForSEO), et Google Chrome installé sur le poste.
// Runtime : Node >= 22 (WebSocket et fetch globaux). Dépendances : aucune.
// Exception documentée : dépendance sur un binaire déjà présent sur le poste
// (Chrome, chemin standard ou CHROME_PATH) pour le rendu, et pour l'encodage
// WebP de convertir-captures.mjs (Edge sort en code 0 sans rien encoder :
// on force Chrome).
//
// Dans l'ordre : Chrome headless à 1 240 px de large en DPR 2 ; ouverture de
// /audit-seo/?site=... puis /en/seo-audit/?site=..., ce qui lance le scan à
// l'arrivée ; attente de la FIN réelle du scan (le panneau de score
// [data-scan-panel] n'est rendu qu'en statut « done »), puis du défilement et
// de l'anneau ; mesure du rectangle du panneau dans la page ; capture de ce
// rectangle seul en PNG ; conversion en WebP 1 400 px de large. Le score
// capturé est lu sur l'aria-label de l'anneau et affiché : c'est lui qu'il
// faut reporter dans les alt et légendes des pages.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const opts = { base: "http://localhost:8788", site: "mkz-consulting.fr", dest: "public/images/outils", marge: 16 };
for (const a of process.argv.slice(2)) {
  const m = a.match(/^--([a-z]+)=(.*)$/);
  if (m && m[1] in opts) opts[m[1]] = m[1] === "marge" ? Number(m[2]) : m[2];
}
const PAGES = [
  { chemin: "/audit-seo/", sortie: "scan-apercu.webp" },
  { chemin: "/en/seo-audit/", sortie: "scan-apercu-en.webp" },
];
const chrome = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
if (!fs.existsSync(chrome)) {
  console.error("Chrome introuvable : " + chrome + " (definir CHROME_PATH)");
  process.exit(1);
}

const port = 9333 + Math.floor(Math.random() * 500);
const profil = fs.mkdtempSync(path.join(os.tmpdir(), "mkz-capture-"));
const proc = spawn(
  chrome,
  [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profil}`,
    "--window-size=1240,1800",
    "--force-device-scale-factor=2",
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
  throw new Error("Chrome ne repond pas sur le port " + port);
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

async function capturer(page) {
  const cible = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const c = cdp(cible.webSocketDebuggerUrl);
  await c.ouvert;
  await c.envoyer("Page.enable");
  await c.envoyer("Emulation.setDeviceMetricsOverride", { width: 1240, height: 1800, deviceScaleFactor: 2, mobile: false });
  const url = `${opts.base}${page.chemin}?site=${encodeURIComponent(opts.site)}`;
  await c.envoyer("Page.navigate", { url });

  // Fin REELLE du scan : le panneau de score n'existe qu'en statut "done".
  let pret = false;
  for (let i = 0; i < 240 && !pret; i++) {
    await dodo(500);
    pret = await evaluer(c, "Boolean(document.querySelector('[data-scan-panel]'))");
  }
  if (!pret) throw new Error("scan non termine apres 2 minutes sur " + url);
  await dodo(1800); // défilement vers le panneau + anneau (transition 0,9 s)

  const rect = JSON.parse(
    await evaluer(
      c,
      "(() => { const r = document.querySelector('[data-scan-panel]').getBoundingClientRect(); return JSON.stringify({ x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height }); })()"
    )
  );
  const score = await evaluer(
    c,
    "(() => { const el = document.querySelector('[data-scan-panel] svg[role=img]'); return el ? el.getAttribute('aria-label') : null; })()"
  );
  const m = opts.marge;
  const shot = await c.envoyer("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: Math.max(0, rect.x - m), y: Math.max(0, rect.y - m), width: rect.w + 2 * m, height: rect.h + 2 * m, scale: 1 },
  });
  c.fermer();
  const png = path.join(profil, page.sortie.replace(/\.webp$/, ".png"));
  fs.writeFileSync(png, Buffer.from(shot.data, "base64"));
  console.log(`${page.chemin} : score ${score}, panneau ${Math.round(rect.w)}x${Math.round(rect.h)} px CSS, PNG ${png}`);
  return { png, score };
}

try {
  await attendreChrome();
  const resultats = [];
  for (const page of PAGES) resultats.push({ page, ...(await capturer(page)) });
  const args = [
    "scripts/convertir-captures.mjs",
    `--dest=${opts.dest}`,
    "--largeur-max=1400",
    "--qualite=82",
    ...resultats.map((r) => `${r.png}=${r.page.sortie}`),
  ];
  const conv = spawnSync(process.execPath, args, { cwd: racine, stdio: "inherit", env: { ...process.env, CHROME_PATH: chrome } });
  if (conv.status !== 0) throw new Error("conversion WebP en echec (code " + conv.status + ")");
  for (const r of resultats) {
    const f = path.join(racine, opts.dest, r.page.sortie);
    console.log(`${r.page.sortie} : ${fs.statSync(f).size} octets, score capture ${r.score}`);
  }
} finally {
  if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(proc.pid), "/T", "/F"], { stdio: "ignore" });
  else proc.kill();
}
