// Génère le favicon « M » de MKZ (carré navy + M blanc, motif du logo).
//
// Usage   : node scripts/generate-favicon.mjs
// Runtime : Node 18+. Dépendances : aucune (zlib natif uniquement).
//
// Produit dans src/app/ :
//   - favicon.ico   : multi-tailles (16/32/48), PNG embarqué (lu par Next.js App Router)
//   - icon.svg      : version vectorielle (onglets modernes, crisp à toute taille)
//   - apple-icon.png : 180x180 (écran d'accueil iOS)
//
// Le « M » est dessiné comme 4 traits épais (2 montants + 2 diagonales) pour
// rester lisible jusqu'à 16px, dans la couleur de marque navy #003764.

import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "src", "app");

// Couleurs de marque (identiques au logo mkz-logo.svg)
const NAVY = [0x00, 0x37, 0x64];
const WHITE = [0xff, 0xff, 0xff];

// Géométrie du M en coordonnées normalisées (0..1, y vers le bas)
const SEGMENTS = [
  [0.2, 0.18, 0.2, 0.82], // montant gauche
  [0.8, 0.18, 0.8, 0.82], // montant droit
  [0.2, 0.18, 0.5, 0.62], // diagonale gauche
  [0.8, 0.18, 0.5, 0.62], // diagonale droite
];
const HALF_WIDTH = 0.086; // demi-épaisseur des traits

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  let t = len2 ? ((px - x1) * dx + (py - y1) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

// Couverture « encre » d'un pixel (0..1) avec sur-échantillonnage 4x4 (anti-aliasing)
function inkCoverage(nx, ny, px) {
  const SS = 4;
  let hits = 0;
  for (let sy = 0; sy < SS; sy++) {
    for (let sx = 0; sx < SS; sx++) {
      const x = nx + (sx + 0.5) / SS / px;
      const y = ny + (sy + 0.5) / SS / px;
      let inside = false;
      for (const s of SEGMENTS) {
        if (distToSegment(x, y, s[0], s[1], s[2], s[3]) <= HALF_WIDTH) {
          inside = true;
          break;
        }
      }
      if (inside) hits++;
    }
  }
  return hits / (SS * SS);
}

// Buffer RGBA : carré navy plein, M blanc anti-aliasé par-dessus
function drawM(size) {
  const buf = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cov = inkCoverage(x / size, y / size, size);
      const i = (y * size + x) * 4;
      buf[i] = Math.round(NAVY[0] + (WHITE[0] - NAVY[0]) * cov);
      buf[i + 1] = Math.round(NAVY[1] + (WHITE[1] - NAVY[1]) * cov);
      buf[i + 2] = Math.round(NAVY[2] + (WHITE[2] - NAVY[2]) * cov);
      buf[i + 3] = 0xff;
    }
  }
  return buf;
}

// ── Encodage PNG (pur Node) ───────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(rgba, size) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // couleur RGBA
  // raw : 1 octet de filtre (0) par scanline + pixels
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ── Assemblage ICO (PNG embarqué, supporté par les navigateurs modernes) ──────

function encodeICO(sizes) {
  const images = sizes.map((s) => encodePNG(drawM(s), s));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // réservé
  header.writeUInt16LE(1, 2); // type icône
  header.writeUInt16LE(sizes.length, 4);
  const entries = [];
  let offset = 6 + sizes.length * 16;
  sizes.forEach((s, i) => {
    const e = Buffer.alloc(16);
    e[0] = s >= 256 ? 0 : s; // largeur
    e[1] = s >= 256 ? 0 : s; // hauteur
    e[2] = 0; // palette
    e[3] = 0; // réservé
    e.writeUInt16LE(1, 4); // plans
    e.writeUInt16LE(32, 6); // bits/pixel
    e.writeUInt32LE(images[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += images[i].length;
    entries.push(e);
  });
  return Buffer.concat([header, ...entries, ...images]);
}

// ── icon.svg (vectoriel, mêmes proportions) ───────────────────────────────────

function buildSVG() {
  const c = (n) => +(n * 64).toFixed(2);
  const sw = +(HALF_WIDTH * 2 * 64).toFixed(2);
  const d = SEGMENTS.map((s) => `M${c(s[0])} ${c(s[1])} L${c(s[2])} ${c(s[3])}`).join(" ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#003764"/>
  <path d="${d}" fill="none" stroke="#ffffff" stroke-width="${sw}" stroke-linecap="butt" stroke-linejoin="round"/>
</svg>
`;
}

writeFileSync(resolve(appDir, "favicon.ico"), encodeICO([16, 32, 48]));
writeFileSync(resolve(appDir, "icon.svg"), buildSVG(), "utf8");
writeFileSync(resolve(appDir, "apple-icon.png"), encodePNG(drawM(180), 180));

console.log("✓ src/app/favicon.ico (16/32/48)");
console.log("✓ src/app/icon.svg (vectoriel)");
console.log("✓ src/app/apple-icon.png (180x180)");
console.log("Favicon « M » de MKZ généré.");
