// Harnais de test du moteur d'audit (functions/api/_engine.mjs).
//
// Exécution : node scripts/test-audit-engine.mjs https://exemple.fr [autres...]
//             node scripts/test-audit-engine.mjs --attendu-mkz
//             options : --sans-autorite  (pas d'appel DataForSEO, donc gratuit)
//                       --force          (ignore le cache 24 h de la phase autorité)
// Runtime : Node >= 18 (fetch global). Dépendances : aucune.
//
// Phase autorité (Tier 1, payante : 0,036 USD par domaine, relevé sur le champ
// `cost` des réponses le 03/09/2026) : identifiants lus dans DATAFORSEO_LOGIN
// (ou DATAFORSEO_USERNAME) et DATAFORSEO_PASSWORD, sinon dans .dev.vars à la
// racine (le fichier de `wrangler pages dev`, gitignoré). Sans identifiants, la
// phase sort en "na" avec la raison "non-configure", ce que le harnais signale.
//
// Le mode --attendu-mkz confronte le moteur à la vérité terrain CONNUE de
// mkz-consulting.fr : statuts mesurés les 15 et 20/08/2026 (robots.txt
// permissif, llms.txt servi, vraie 404, JSON-LD conforme, aucune balise noindex
// sur l'apex) et, pour l'autorité, ordres de grandeur relevés le 03/09/2026
// dans la base DataForSEO (40 domaines référents, spam 11, 2 mots-clés en
// France, 43 visites estimées). Une sonde qui contredit cette vérité est une
// sonde fausse : le harnais sort en code 1 et dit laquelle.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPhase } from "../functions/api/_engine.mjs";

const ORDRE = ["origin", "robots", "page", "notfound", "autorite"];
const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function identifiants() {
  let login = process.env.DATAFORSEO_LOGIN || process.env.DATAFORSEO_USERNAME || "";
  let password = process.env.DATAFORSEO_PASSWORD || "";
  const devVars = path.join(racine, ".dev.vars");
  if ((!login || !password) && fs.existsSync(devVars)) {
    for (const ligne of fs.readFileSync(devVars, "utf8").split(/\r?\n/)) {
      const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      if (m[1] === "DATAFORSEO_LOGIN" && !login) login = m[2];
      if (m[1] === "DATAFORSEO_PASSWORD" && !password) password = m[2];
    }
  }
  return { login, password };
}

async function scan(url, opts) {
  const out = [];
  let cost = 0;
  const first = await runPhase("origin", { url });
  if (first.error) return { url, error: first.error, checks: [], cost };
  out.push(...(first.checks || []));
  const origin = first.origin;
  if (!origin) return { url, origin: null, checks: out, cost };
  for (const phase of ORDRE.slice(1)) {
    if (phase === "autorite" && opts.sansAutorite) continue;
    const params = { origin };
    if (phase === "autorite") params.ctx = { ...opts.ids, force: opts.force };
    const r = await runPhase(phase, params);
    out.push(...(r.checks || []));
    if (r.cost) cost += r.cost;
  }
  return { url, origin, checks: out, cost };
}

function afficher(result) {
  console.log("\n=== " + result.url + (result.origin ? "  ->  " + result.origin : "") + " ===");
  if (result.error) {
    console.log("  ERREUR de cible : " + result.error);
    return;
  }
  let pts = 0;
  let max = 0;
  for (const c of result.checks) {
    if (c.status !== "na") {
      pts += c.points;
      max += c.max;
    }
    const icone = { ok: "OK  ", warn: "WARN", fail: "FAIL", na: "n/a " }[c.status] || "??  ";
    const detail = JSON.stringify(c.data);
    console.log(
      "  " + icone + " " + String(c.points + "/" + c.max).padStart(5) + "  " +
      c.id.padEnd(20) + " " + (detail.length > 140 ? detail.slice(0, 140) + "..." : detail)
    );
  }
  console.log("  SCORE mesurable : " + pts + "/" + max);
  if (result.cost) console.log("  COUT DataForSEO releve : " + result.cost.toFixed(4) + " USD");
}

// Vérité terrain mkz-consulting.fr : chaque attente est une mesure déjà faite
// et documentée (AGENTS.md du dépôt), pas une préférence. Un tableau = les
// statuts acceptés (l'autorité bouge avec la base DataForSEO, pas la technique).
const ATTENDU_MKZ = {
  "https-redirections": ["ok"],
  "robots-txt": ["ok"],
  "crawlers-ia": ["ok"],
  "llms-txt": ["ok"],
  "sitemap": ["ok"],
  "indexabilite": ["ok"],
  "title": ["ok"],
  "meta-description": ["ok"],
  "h1-hn": ["ok"],
  "viewport": ["ok"],
  "json-ld": ["ok"],
  "vraie-404": ["ok"],
  "domaines-referents": ["ok"],
  "spam-score": ["ok"],
  "mots-cles": ["warn", "ok"],
  "trafic-estime": ["warn", "ok"],
};

// Ordres de grandeur relevés le 03/09/2026 : une sonde qui lit 0 domaine
// référent sur un site qui en a 40 lit mal, ce n'est pas la base qui a bougé.
const VALEURS_MKZ = [
  ["domaines-referents", (d) => Number(d.domaines) >= 20, "au moins 20 domaines referents (40 releves le 03/09/2026)"],
  ["spam-score", (d) => Number(d.spam) <= 15, "score de spam <= 15 (11 releve le 03/09/2026)"],
  ["mots-cles", (d) => Number(d.motsCles) >= 1, "au moins 1 mot-cle positionne en France (2 releves le 03/09/2026)"],
];

async function main() {
  const args = process.argv.slice(2);
  const opts = {
    sansAutorite: args.includes("--sans-autorite"),
    force: args.includes("--force"),
    ids: identifiants(),
  };
  if (!opts.sansAutorite && (!opts.ids.login || !opts.ids.password)) {
    console.log("(identifiants DataForSEO absents : la phase autorite sortira en n/a ; --sans-autorite pour la sauter)");
  }
  const urls = args.filter((a) => !a.startsWith("--"));

  if (args.includes("--attendu-mkz")) {
    const r = await scan("mkz-consulting.fr", opts);
    afficher(r);
    const ecarts = [];
    for (const [id, attendus] of Object.entries(ATTENDU_MKZ)) {
      if (opts.sansAutorite && ["domaines-referents", "spam-score", "mots-cles", "trafic-estime"].includes(id)) continue;
      const c = r.checks.find((x) => x.id === id);
      if (!c) ecarts.push(id + " : check absent du resultat");
      else if (!attendus.includes(c.status)) {
        ecarts.push(id + " : attendu " + attendus.join("|") + ", mesure " + c.status + " " + JSON.stringify(c.data).slice(0, 200));
      }
    }
    if (!opts.sansAutorite) {
      for (const [id, test, libelle] of VALEURS_MKZ) {
        const c = r.checks.find((x) => x.id === id);
        if (c && c.status !== "na" && !test(c.data)) {
          ecarts.push(id + " : " + libelle + ", mesure " + JSON.stringify(c.data).slice(0, 200));
        }
      }
    }
    if (ecarts.length) {
      console.log("\nSONDES EN DESACCORD AVEC LA VERITE TERRAIN (" + ecarts.length + ") :");
      for (const e of ecarts) console.log("  - " + e);
      process.exit(1);
    }
    console.log("\nToutes les sondes concordent avec la verite terrain mkz-consulting.fr.");
    return;
  }

  if (!urls.length) {
    console.log("Usage : node scripts/test-audit-engine.mjs <url> [url...] | --attendu-mkz  [--sans-autorite] [--force]");
    process.exit(2);
  }
  for (const url of urls) afficher(await scan(url, opts));
}

main();
