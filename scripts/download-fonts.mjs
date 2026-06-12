// Télécharge les polices du site en woff2 auto-hébergés (public/fonts/).
//
// Usage   : node scripts/download-fonts.mjs
// Runtime : Node 18+ (fetch natif). Dépendances : aucune.
//
// Polices (licences OFL, via l'API Google Fonts css2) :
// - Fraunces  (display/titres, variable opsz+wght, normal + italique)
// - Archivo   (corps/UI, variable wght)
// - IBM Plex Mono (labels, chiffres, métadonnées, 400 + 500)
// Subset latin uniquement. Re-télécharger = relancer le script.

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "fonts");
mkdirSync(outDir, { recursive: true });

// UA Chrome récent → l'API renvoie du woff2 variable avec unicode-range
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const FAMILIES = [
  {
    css: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap",
    names: { "0normal": "fraunces-var.woff2", "1italic": "fraunces-italic-var.woff2" },
  },
  {
    css: "https://fonts.googleapis.com/css2?family=Archivo:wght@400..700&display=swap",
    names: { "0normal": "archivo-var.woff2" },
  },
  {
    css: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap",
    names: { "400normal": "plex-mono-400.woff2", "500normal": "plex-mono-500.woff2" },
  },
];

for (const fam of FAMILIES) {
  const css = await (await fetch(fam.css, { headers: { "User-Agent": UA } })).text();
  // Blocs @font-face ; on ne garde que le subset latin (commentaire /* latin */)
  const blocks = css.split("@font-face").slice(1);
  for (const block of blocks) {
    const isLatin = /\/\* latin \*\//.test(css.slice(css.indexOf(block) - 30, css.indexOf(block)));
    if (!/U\+0000-00FF/.test(block)) continue; // subset latin uniquement
    const style = /font-style:\s*italic/.test(block) ? "italic" : "normal";
    const weight = (block.match(/font-weight:\s*([\d ]+)/) ?? [])[1]?.trim() ?? "";
    const url = (block.match(/url\((https:[^)]+\.woff2)\)/) ?? [])[1];
    if (!url) continue;
    const isVariable = weight.includes(" ");
    const key = isVariable ? (style === "italic" ? "1italic" : "0normal") : `${weight}${style}`;
    const name = fam.names[key];
    if (!name) continue;
    const buf = Buffer.from(await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer());
    writeFileSync(resolve(outDir, name), buf);
    console.log(`✓ ${name}  (${(buf.length / 1024).toFixed(0)} Ko, weight ${weight || "?"}, ${style})`);
  }
}
console.log("Polices écrites dans public/fonts/");
