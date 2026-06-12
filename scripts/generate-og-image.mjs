#!/usr/bin/env node
/**
 * generate-og-image.mjs : Génère public/og-image.png (1200×630) pour les partages
 * OpenGraph/Twitter et le schema Article.
 *
 * Exécution : node scripts/generate-og-image.mjs
 * Dépendances : aucune. Node 14+ natif (fs, path, os, child_process) +
 * Chrome ou Edge installé sur la machine (rasterisation headless).
 *
 * Composition : fond bleu MKZ #003764, logo inversé (carrés blancs, lettres
 * bleues), slogan « Votre site web visible sur Google, enfin. », accent orange
 * #E8590C, domaine en pied. Police Segoe UI (rasterisée dans le PNG → aucune
 * dépendance de police dans le livrable).
 */

import { writeFileSync, readFileSync, existsSync, mkdtempSync, rmSync, statSync } from "fs";
import { execFileSync } from "child_process";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_PNG = join(ROOT, "public", "og-image.png");

// Logo MKZ inversé pour fond sombre : carrés blancs, lettres #003764.
// Géométrie identique à public/images/mkz-logo.svg (seuls les fills changent).
const LOGO_SVG = `<svg width="240" height="123" viewBox="0 0 147.40134 75.59053" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath clipPathUnits="userSpaceOnUse" id="cp25"><path d="M 0,56.693 H 110.551 V 0 H 0 Z" transform="translate(-32.834501,-24.3179)"/></clipPath>
    <clipPath clipPathUnits="userSpaceOnUse" id="cp27"><path d="M 0,56.693 H 110.551 V 0 H 0 Z" transform="translate(-59.828602,-24.272201)"/></clipPath>
    <clipPath clipPathUnits="userSpaceOnUse" id="cp29"><path d="M 0,56.693 H 110.551 V 0 H 0 Z" transform="translate(-78.353904,-42.521701)"/></clipPath>
  </defs>
  <g transform="matrix(1, 0, 0, 1, -0.000661, 9.448733)">
    <path d="M 35.433,21.26 H 7.087 v 28.346 h 28.346 z" style="fill:#ffffff" transform="matrix(1.3333333,0,0,-1.3333333,0,75.590533)"/>
    <path d="M 69.449,21.26 H 41.103 v 28.346 h 28.346 z" style="fill:#ffffff" transform="matrix(1.3333333,0,0,-1.3333333,0,75.590533)"/>
    <path d="M 103.465,21.26 H 75.119 v 28.346 h 28.346 z" style="fill:#ffffff" transform="matrix(1.3333333,0,0,-1.3333333,0,75.590533)"/>
    <path d="m 0,0 h -5.021 l 0.002,13.469 c 0,0.195 -0.051,0.293 -0.151,0.293 -0.075,0 -0.188,-0.075 -0.339,-0.228 -0.402,-0.52 -1.064,-1.333 -1.98,-2.44 C -8.409,9.988 -9.082,9.185 -9.508,8.686 -9.76,8.404 -9.968,8.22 -10.132,8.134 -10.296,8.047 -10.565,8.003 -10.942,8.003 h -0.642 c -0.453,0 -0.762,0.033 -0.925,0.098 -0.164,0.065 -0.345,0.206 -0.546,0.422 l -4.113,4.98 c -0.102,0.194 -0.215,0.292 -0.34,0.292 -0.101,0 -0.152,-0.098 -0.152,-0.292 l -0.002,-5.5 h -5.015 v 14.674 h 4.452 c 0.076,0 0.169,-0.038 0.283,-0.114 0.113,-0.076 0.195,-0.157 0.246,-0.243 l 5.734,-8.167 c 0.025,-0.044 0.095,-0.109 0.207,-0.195 0.114,-0.087 0.258,-0.131 0.435,-0.131 h 0.038 c 0.175,0 0.313,0.054 0.415,0.163 0.1,0.108 0.163,0.184 0.189,0.227 l 5.697,8.07 c 0.076,0.108 0.151,0.2 0.226,0.276 0.075,0.076 0.177,0.114 0.302,0.114 H -4.416 0 Z" style="fill:#003764" transform="matrix(1.3333333,0,0,-1.3333333,43.779333,43.166667)" clip-path="url(#cp25)"/>
    <path d="M 0,0 C -0.274,0.097 -0.497,0.242 -0.669,0.437 L -5.24,5.322 c -0.202,0.237 -0.302,0.43 -0.302,0.582 0,0.194 0.114,0.398 0.346,0.614 0.23,0.195 0.495,0.427 0.796,0.697 0.302,0.268 0.597,0.522 0.885,0.759 l 0.905,0.81 c 0.174,0.171 0.374,0.258 0.604,0.258 0.26,0 0.476,-0.098 0.648,-0.291 L 6.406,0.502 C 6.462,0.415 6.492,0.34 6.492,0.275 c 0,-0.28 -0.26,-0.432 -0.778,-0.453 H 1.316 C 0.713,-0.157 0.274,-0.097 0,0 m -16.023,22.499 h 6.198 l 0.013,-8.055 8.756,7.699 c 0.258,0.238 0.575,0.356 0.949,0.356 H 6.06 c 0.316,0 0.502,-0.043 0.56,-0.13 0.058,-0.085 0.043,-0.172 -0.042,-0.258 L -9.122,8.33 c -0.46,-0.41 -0.69,-0.927 -0.69,-1.552 l -0.013,-6.956 h -6.198 z" style="fill:#003764" transform="matrix(1.3333333,0,0,-1.3333333,79.771467,43.2276)" clip-path="url(#cp27)"/>
    <path d="m 0,0 c -0.155,0.118 -0.232,0.253 -0.232,0.404 v 3.231 c 0,0.173 0.077,0.318 0.232,0.437 0.155,0.117 0.332,0.178 0.53,0.178 h 20.983 c 0.198,0 0.374,-0.061 0.531,-0.178 0.153,-0.119 0.232,-0.264 0.232,-0.437 V 0.404 C 22.276,0.253 22.205,0.118 22.064,0 21.923,-0.12 21.739,-0.178 21.513,-0.178 H 0.53 C 0.332,-0.178 0.155,-0.12 0,0 m 1.46,-18.308 c -0.253,0.097 -0.437,0.221 -0.549,0.372 -0.114,0.15 -0.317,0.436 -0.613,0.857 -0.298,0.42 -0.487,0.716 -0.572,0.889 -0.084,0.129 -0.127,0.258 -0.127,0.389 0,0.257 0.169,0.517 0.508,0.775 2.735,2.264 5.507,4.571 8.313,6.922 2.806,2.349 4.73,3.966 5.775,4.85 0.142,0.108 0.324,0.162 0.55,0.162 h 6.034 c 0.237,0 0.495,-0.247 0.495,-0.42 0,-0.172 -0.071,-0.313 -0.212,-0.421 L 7.976,-14.055 c -0.283,-0.216 -0.424,-0.378 -0.424,-0.486 0,-0.172 0.282,-0.258 0.847,-0.258 h 13.877 v -3.623 H 2.222 c -0.254,-0.021 -0.507,0.016 -0.762,0.114" style="fill:#003764" transform="matrix(1.3333333,0,0,-1.3333333,104.47187,18.894933)" clip-path="url(#cp29)"/>
  </g>
</svg>`;

const HTML = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
  html, body { margin: 0; padding: 0; }
</style></head>
<body>
<div style="width:1200px;height:630px;box-sizing:border-box;position:relative;overflow:hidden;
            background:linear-gradient(135deg,#003764 0%,#002a4d 100%);
            font-family:'Segoe UI',Arial,sans-serif;color:#ffffff;padding:64px 80px;">
  <!-- motif discret : écho des 3 carrés du logo -->
  <div style="position:absolute;right:-60px;bottom:-60px;width:280px;height:280px;background:rgba(255,255,255,0.04);"></div>
  <div style="position:absolute;right:240px;bottom:-120px;width:280px;height:280px;background:rgba(255,255,255,0.03);"></div>

  ${LOGO_SVG}

  <h1 style="margin:56px 0 0;font-size:67px;line-height:1.18;font-weight:600;max-width:980px;letter-spacing:-0.5px;">
    Votre site web visible sur&nbsp;Google, <span style="color:#ff7a33;">enfin.</span>
  </h1>

  <div style="width:120px;height:6px;background:#E8590C;margin:34px 0 26px;"></div>

  <p style="margin:0;font-size:29px;line-height:1.4;color:rgba(255,255,255,0.85);max-width:900px;">
    Création de sites internet &amp; référencement SEO<br>pour artisans, commerçants et indépendants
  </p>

  <p style="position:absolute;right:80px;bottom:44px;margin:0;font-size:28px;font-weight:600;color:#ffffff;">
    mkz-consulting<span style="color:#ff7a33;">.fr</span>
  </p>
</div>
</body></html>`;

const BROWSERS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

const browser = BROWSERS.find((p) => existsSync(p));
if (!browser) {
  console.error("Aucun Chrome/Edge trouvé : installer l'un des deux pour rasteriser.");
  process.exit(1);
}

const tmp = mkdtempSync(join(tmpdir(), "mkz-og-"));
const htmlPath = join(tmp, "og.html");
writeFileSync(htmlPath, HTML, "utf8");

try {
  execFileSync(browser, [
    "--headless=new",
    `--screenshot=${OUT_PNG}`,
    "--window-size=1200,630",
    "--force-device-scale-factor=1",
    "--hide-scrollbars",
    "--disable-gpu",
    `--user-data-dir=${join(tmp, "profile")}`,
    `file:///${htmlPath.replace(/\\/g, "/")}`,
  ], { stdio: "pipe", timeout: 60000 });
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

// Contrôles : le PNG existe, fait exactement 1200×630 et pèse < 300 Ko.
const buf = readFileSync(OUT_PNG);
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
const kb = Math.round(statSync(OUT_PNG).size / 1024);
if (width !== 1200 || height !== 630) {
  console.error(`Dimensions inattendues : ${width}×${height} (attendu 1200×630)`);
  process.exit(1);
}
if (kb >= 300) {
  console.error(`Fichier trop lourd : ${kb} Ko (limite 300 Ko)`);
  process.exit(1);
}
console.log(`OK : public/og-image.png : ${width}×${height}, ${kb} Ko`);
