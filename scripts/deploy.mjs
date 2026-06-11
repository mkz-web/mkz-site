// Déploiement Cloudflare Pages du site MKZ (remplace l'ancien déploiement FTP OVH).
//
// Usage   : npm run deploy          → déploie le dossier out/ existant
//           npm run deploy:build    → build + déploiement
// Runtime : Node 18+. Dépendances npm du projet : aucune
//           (wrangler est téléchargé à la volée par npx, rien à installer).
// Env     : CLOUDFLARE_API_TOKEN_MKZ  token API avec permission « Cloudflare Pages:Edit »
//                                     (fallback : CLOUDFLARE_API_TOKEN)
//           CLOUDFLARE_ACCOUNT_ID     id du compte Cloudflare

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

if (!existsSync(resolve(projectRoot, "out"))) {
  console.error("❌ Dossier out/ introuvable. Lance `npm run build` d'abord.");
  process.exit(1);
}

const token = process.env.CLOUDFLARE_API_TOKEN_MKZ ?? process.env.CLOUDFLARE_API_TOKEN;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

if (!token || !accountId) {
  console.error("❌ CLOUDFLARE_API_TOKEN_MKZ (ou CLOUDFLARE_API_TOKEN) et CLOUDFLARE_ACCOUNT_ID sont requis dans l'environnement.");
  process.exit(1);
}

console.log("→ Déploiement de out/ vers Cloudflare Pages (projet mkz-site)…");
const r = spawnSync(
  "npx",
  ["-y", "wrangler", "pages", "deploy", "out", "--project-name", "mkz-site", "--branch", "master", "--commit-dirty=true"],
  {
    cwd: projectRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: accountId },
  }
);

if (r.status === 0) {
  console.log("✅ Déploiement terminé — https://mkz-site.pages.dev / https://mkz-consulting.fr");
}
process.exit(r.status ?? 1);
