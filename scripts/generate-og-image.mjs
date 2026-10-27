#!/usr/bin/env node
/**
 * generate-og-image.mjs : images de partage (OpenGraph, X, image du schema Article) et logo du
 * JSON-LD, à la charte graphique en production depuis le 22/10/2026.
 *
 * Exécution : node scripts/generate-og-image.mjs
 * Runtime : Node >= 18. Dépendances : aucune (fs, path, os, url, child_process natifs)
 *           + Chrome ou Edge installé sur la machine (rasterisation headless).
 *
 * Écrit :
 *   public/og/mkz-fr.png        1200 × 630, pages françaises
 *   public/og/mkz-en.png        1200 × 630, pages anglaises (leur propre accroche, pas une traduction)
 *   public/images/logo-mkz.svg  logo du JSON-LD (Organization.logo, LocalBusiness.image)
 *
 * Source unique du dessin : le sprite de la charte, src/components/charte/Sprite.tsx (tracés des
 * lettres, chevron, dégradés, découpe) et le viewBox du logo de la navigation (Nav.tsx). Polices de
 * la charte (public/fonts/, Montserrat et Inter) embarquées en data: dans la page rasterisée, donc
 * dessinées dans le PNG. Contrôles : 3 tracés de lettres et 2 bandes de chevron trouvés dans le
 * sprite, PNG de 1200 × 630 exactement et de moins de 300 Ko ; refus d'écrire ou code 1 sinon.
 *
 * Remplace l'ancienne image public/og-image.png (fond bleu #003764, logo à trois carrés), retirée
 * le 27/10/2026 : un nouveau nom force les réseaux sociaux à relire l'image.
 */

import { writeFileSync, readFileSync, existsSync, mkdtempSync, mkdirSync, rmSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SPRITE = join(ROOT, "src", "components", "charte", "Sprite.tsx");
const NAV = join(ROOT, "src", "components", "charte", "Nav.tsx");
const NUIT = "#202748";

// ---------- Logo, lu dans le sprite de la charte ----------
const sprite = readFileSync(SPRITE, "utf8");
const prendre = (motif, nom) => {
  const m = sprite.match(new RegExp(motif));
  if (!m) throw new Error("sprite de la charte : " + nom + " introuvable dans " + SPRITE);
  return m;
};
// Le sprite est du JSX : on rend aux attributs leur nom SVG.
const enSvg = (s) => s.replace(/stopColor=/g, "stop-color=").split(' clipPath="').join(' clip-path="');
const gHaut = enSvg(prendre('<linearGradient id="g-haut"[^]*?</linearGradient>', "dégradé g-haut")[0]);
const gBas = enSvg(prendre('<linearGradient id="g-bas"[^]*?</linearGradient>', "dégradé g-bas")[0]);
const decoupe = enSvg(prendre('<clipPath id="decoupe">[^]*?</clipPath>', "découpe")[0]);
const lettres = enSvg(prendre('<g id="logo-lettres">([^]*?)</g>', "lettres")[1]);
const chevron = enSvg(prendre('<g id="logo-chevron"[^]*?</g>', "chevron")[0]);
const nbLettres = (lettres.match(/<path /g) || []).length;
const nbBandes = (chevron.match(/<rect /g) || []).length;
if (nbLettres !== 3 || nbBandes !== 2) {
  console.error(`Sprite inattendu : ${nbLettres} tracés de lettres et ${nbBandes} bandes de chevron (3 et 2 attendus)`);
  process.exit(1);
}
const vb = (readFileSync(NAV, "utf8").match(/nav__logo[^]*?viewBox="([^"]+)"/) || [])[1];
if (!vb) {
  console.error("viewBox du logo introuvable dans " + NAV);
  process.exit(1);
}
const [, , vbL, vbH] = vb.split(" ").map(Number);
const logoSvg = (fill, attrs) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" ${attrs} role="img" aria-label="MKZ">` +
  `<title>MKZ</title><defs>${gHaut}${gBas}${decoupe}</defs><g fill="${fill}">${lettres}</g>${chevron}</svg>`;

const LOGO_FICHIER = join(ROOT, "public", "images", "logo-mkz.svg");
writeFileSync(LOGO_FICHIER, logoSvg(NUIT, `width="${vbL}" height="${vbH}"`) + "\n", "utf8");
console.log(`OK : public/images/logo-mkz.svg : ${vbL} × ${vbH}, ${statSync(LOGO_FICHIER).size} octets`);

// ---------- Cartes de partage ----------
const police = (fichier) => "data:font/woff2;base64," + readFileSync(join(ROOT, "public", "fonts", fichier)).toString("base64");
const FONTS = `
  @font-face { font-family: "Montserrat"; font-weight: 500 800; font-display: block; src: url("${police("montserrat-latin-var.woff2")}") format("woff2"); }
  @font-face { font-family: "Inter"; font-weight: 400 600; font-display: block; src: url("${police("inter-latin-var.woff2")}") format("woff2"); }`;

const CARTES = [
  {
    fichier: "mkz-fr.png",
    lang: "fr",
    surtitre: "Création de site internet, SEO et référencement IA",
    titre: 'Un site internet qui fait <span class="degrade">sonner le téléphone</span>.',
    pied: "Mickaël Leclerc, consultant indépendant · Seine-et-Marne",
    domaine: "mkz-consulting.fr",
  },
  {
    fichier: "mkz-en.png",
    lang: "en",
    surtitre: "French SEO &amp; AI search visibility",
    titre: 'Your site ranks in English. In France, <span class="degrade">it’s flat</span>.',
    pied: "Mickaël Leclerc, independent consultant, not an agency",
    domaine: "mkz-consulting.fr/en",
  },
];

const page = (c) => `<!doctype html>
<html lang="${c.lang}"><head><meta charset="utf-8"><style>${FONTS}
  html, body { margin: 0; padding: 0; }
  .carte { width: 1200px; height: 630px; box-sizing: border-box; position: relative; overflow: hidden;
    background: #ffffff; color: ${NUIT}; font-family: "Inter", sans-serif; padding: 64px 80px 56px; }
  .halo { position: absolute; inset: 0;
    background:
      radial-gradient(40% 52% at 8% 14%, rgba(141, 178, 248, .55), transparent 70%),
      radial-gradient(36% 48% at 94% 10%, rgba(156, 158, 247, .50), transparent 70%),
      radial-gradient(34% 50% at 88% 94%, rgba(235, 196, 157, .55), transparent 70%),
      radial-gradient(36% 44% at 36% 104%, rgba(242, 167, 207, .40), transparent 70%); }
  .contenu { position: relative; height: 100%; display: flex; flex-direction: column; }
  .logo { display: block; }
  .surtitre { margin: 54px 0 18px; font-weight: 600; font-size: 28px; color: #705398; }
  h1 { margin: 0; max-width: 1000px; font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 74px;
    line-height: 1.07; letter-spacing: -0.03em; }
  .degrade { background-image: linear-gradient(100deg, #2A4089 0%, #705398 50%, #B4508C 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  .pied { margin-top: auto; display: flex; justify-content: space-between; align-items: baseline; gap: 32px; }
  .pied p { margin: 0; font-size: 24px; color: #4A4F66; white-space: nowrap; }
  .pied .domaine { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 26px; color: ${NUIT}; white-space: nowrap; }
</style></head>
<body><div class="carte"><div class="halo"></div><div class="contenu">
  ${logoSvg(NUIT, `class="logo" width="${Math.round((70 * vbL) / vbH)}" height="70"`)}
  <p class="surtitre">${c.surtitre}</p>
  <h1>${c.titre}</h1>
  <div class="pied"><p>${c.pied}</p><p class="domaine">${c.domaine}</p></div>
</div></div></body></html>`;

const BROWSERS = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browser = BROWSERS.find((p) => existsSync(p));
if (!browser) {
  console.error("Aucun Chrome ni Edge trouvé : en installer un, ou définir CHROME_PATH, pour rasteriser.");
  process.exit(1);
}

const dossierOg = join(ROOT, "public", "og");
mkdirSync(dossierOg, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "mkz-og-"));
let echec = false;
try {
  for (const c of CARTES) {
    const htmlPath = join(tmp, c.lang + ".html");
    writeFileSync(htmlPath, page(c), "utf8");
    const sortie = join(dossierOg, c.fichier);
    execFileSync(browser, [
      "--headless=new",
      `--screenshot=${sortie}`,
      "--window-size=1200,630",
      "--force-device-scale-factor=1",
      "--hide-scrollbars",
      "--disable-gpu",
      "--virtual-time-budget=5000",
      `--user-data-dir=${join(tmp, "profil-" + c.lang)}`,
      pathToFileURL(htmlPath).href,
    ], { stdio: "pipe", timeout: 60000 });

    // Contrôles : PNG de 1200 × 630 exactement, moins de 300 Ko.
    const buf = readFileSync(sortie);
    const largeur = buf.readUInt32BE(16);
    const hauteur = buf.readUInt32BE(20);
    const ko = Math.round(statSync(sortie).size / 1024);
    if (largeur !== 1200 || hauteur !== 630) {
      console.error(`public/og/${c.fichier} : ${largeur} × ${hauteur} (1200 × 630 attendu)`);
      echec = true;
    } else if (ko >= 300) {
      console.error(`public/og/${c.fichier} : ${ko} Ko (limite 300 Ko)`);
      echec = true;
    } else {
      console.log(`OK : public/og/${c.fichier} : ${largeur} × ${hauteur}, ${ko} Ko`);
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
if (echec) process.exit(1);
