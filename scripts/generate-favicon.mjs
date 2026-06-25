// Génère le favicon « M » de MKZ à partir de l'artwork source icone.png.
//
// Usage   : node scripts/generate-favicon.mjs
// Runtime : Node 18+. Dépendances : aucune (zlib natif uniquement).
//
// Pipeline : décode icone.png (RGBA) -> retire les liserés blancs de bord
// (dont la ligne blanche du haut) -> recadre en carré centré -> rééchantillonne
// (moyenne de bloc) aux tailles cibles -> écrit dans src/app/ :
//   - favicon.ico    : 16/32/48 (PNG embarqué, lu par Next.js App Router)
//   - icon.png       : 256x256 (rel=icon des onglets modernes)
//   - apple-icon.png : 180x180 (écran d'accueil iOS)

import { deflateSync, inflateSync } from "node:zlib";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = resolve(root, "src", "app");
const SRC = resolve(root, "icone.png");

// ── Décodage PNG (RGBA, colortype 6, bit depth 8) ─────────────────────────────

function decodePNG(buf) {
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  if (buf[24] !== 8 || buf[25] !== 6) throw new Error("icone.png attendu en RGBA 8 bits");
  let p = 8;
  const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString("ascii", p + 4, p + 8);
    if (type === "IDAT") idat.push(buf.subarray(p + 8, p + 8 + len));
    if (type === "IEND") break;
    p += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const ch = 4;
  const stride = w * ch;
  const out = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const ft = raw[y * (stride + 1)];
    const ri = y * (stride + 1) + 1;
    for (let x = 0; x < stride; x++) {
      const rv = raw[ri + x];
      const a = x >= ch ? out[y * stride + x - ch] : 0;
      const b = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = y > 0 && x >= ch ? out[(y - 1) * stride + x - ch] : 0;
      let v;
      switch (ft) {
        case 0: v = rv; break;
        case 1: v = rv + a; break;
        case 2: v = rv + b; break;
        case 3: v = rv + ((a + b) >> 1); break;
        case 4: {
          const pp = a + b - c;
          const da = Math.abs(pp - a), db = Math.abs(pp - b), dc = Math.abs(pp - c);
          v = rv + (da <= db && da <= dc ? a : db <= dc ? b : c);
          break;
        }
        default: v = rv;
      }
      out[y * stride + x] = v & 255;
    }
  }
  return { w, h, ch, data: out };
}

// ── Nettoyage des liserés blancs de bord + recadrage carré centré ─────────────

function cleanAndSquare(img) {
  const { w, h, ch, data } = img;
  const at = (x, y) => (y * w + x) * ch;
  // Couleur de fond échantillonnée loin des bords (navy de l'artwork)
  const bgI = at(Math.floor(w / 2), Math.floor(h / 2)) - ch * 0; // centre = trait blanc, on prend plutôt un bord bas-gauche navy
  const navyI = at(4, h - 4);
  const bg = [data[navyI], data[navyI + 1], data[navyI + 2], 255];
  void bgI;
  const nearWhite = (i) => data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235;
  const fillRow = (y) => { for (let x = 0; x < w; x++) { const i = at(x, y); data[i] = bg[0]; data[i + 1] = bg[1]; data[i + 2] = bg[2]; data[i + 3] = 255; } };
  const fillCol = (x) => { for (let y = 0; y < h; y++) { const i = at(x, y); data[i] = bg[0]; data[i + 1] = bg[1]; data[i + 2] = bg[2]; data[i + 3] = 255; } };
  const rowWhiteRatio = (y) => { let c = 0; for (let x = 0; x < w; x++) if (nearWhite(at(x, y))) c++; return c / w; };
  const colWhiteRatio = (x) => { let c = 0; for (let y = 0; y < h; y++) if (nearWhite(at(x, y))) c++; return c / h; };
  // On efface les lignes/colonnes de bord PLEINES de blanc (liserés), max 4px par bord
  for (let y = 0; y < 4 && rowWhiteRatio(y) > 0.8; y++) fillRow(y);
  for (let y = h - 1; y > h - 5 && rowWhiteRatio(y) > 0.8; y--) fillRow(y);
  for (let x = 0; x < 4 && colWhiteRatio(x) > 0.8; x++) fillCol(x);
  for (let x = w - 1; x > w - 5 && colWhiteRatio(x) > 0.8; x--) fillCol(x);
  // Recadrage carré centré
  const s = Math.min(w, h);
  const ox = Math.floor((w - s) / 2);
  const oy = Math.floor((h - s) / 2);
  const sq = Buffer.alloc(s * s * ch);
  for (let y = 0; y < s; y++)
    for (let x = 0; x < s; x++) {
      const si = at(ox + x, oy + y);
      const di = (y * s + x) * ch;
      sq[di] = data[si]; sq[di + 1] = data[si + 1]; sq[di + 2] = data[si + 2]; sq[di + 3] = 255;
    }
  return { size: s, data: sq };
}

// ── Rééchantillonnage par moyenne de bloc (downscale net) ─────────────────────

function resample(src, target) {
  const { size: S, data } = src;
  const out = Buffer.alloc(target * target * 4);
  for (let oy = 0; oy < target; oy++) {
    const sy0 = Math.floor((oy * S) / target);
    const sy1 = Math.max(sy0 + 1, Math.floor(((oy + 1) * S) / target));
    for (let ox = 0; ox < target; ox++) {
      const sx0 = Math.floor((ox * S) / target);
      const sx1 = Math.max(sx0 + 1, Math.floor(((ox + 1) * S) / target));
      let r = 0, g = 0, b = 0, n = 0;
      for (let y = sy0; y < sy1; y++)
        for (let x = sx0; x < sx1; x++) {
          const i = (y * S + x) * 4;
          r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
        }
      const di = (oy * target + ox) * 4;
      out[di] = Math.round(r / n);
      out[di + 1] = Math.round(g / n);
      out[di + 2] = Math.round(b / n);
      out[di + 3] = 255;
    }
  }
  return out;
}

// ── Encodage PNG ──────────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
const crc32 = (buf) => { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(rgba, size) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) { raw[y * (size * 4 + 1)] = 0; rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4); }
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}

function encodeICO(square, sizes) {
  const pngs = sizes.map((s) => encodePNG(resample(square, s), s));
  const head = Buffer.alloc(6);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
  const entries = [];
  let offset = 6 + sizes.length * 16;
  sizes.forEach((s, i) => {
    const e = Buffer.alloc(16);
    e[0] = s >= 256 ? 0 : s; e[1] = s >= 256 ? 0 : s;
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
    offset += pngs[i].length; entries.push(e);
  });
  return Buffer.concat([head, ...entries, ...pngs]);
}

// ── Exécution ─────────────────────────────────────────────────────────────────

const square = cleanAndSquare(decodePNG(readFileSync(SRC)));
writeFileSync(resolve(appDir, "favicon.ico"), encodeICO(square, [16, 32, 48]));
writeFileSync(resolve(appDir, "icon.png"), encodePNG(resample(square, 256), 256));
writeFileSync(resolve(appDir, "apple-icon.png"), encodePNG(resample(square, 180), 180));
// L'ancien icon.svg dessiné à la main est remplacé par l'artwork source.
try { rmSync(resolve(appDir, "icon.svg")); } catch { /* déjà absent */ }

console.log(`Source icone.png nettoyée et recadrée en carré ${square.size}x${square.size}.`);
console.log("✓ src/app/favicon.ico (16/32/48)");
console.log("✓ src/app/icon.png (256x256)");
console.log("✓ src/app/apple-icon.png (180x180)");
console.log("✓ src/app/icon.svg supprimé");
