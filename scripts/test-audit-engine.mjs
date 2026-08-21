// Harnais de test du moteur d'audit (functions/api/_engine.mjs).
//
// Exécution : node scripts/test-audit-engine.mjs https://exemple.fr [autres...]
//             node scripts/test-audit-engine.mjs --attendu-mkz
// Runtime : Node >= 18 (fetch global). Dépendances : aucune.
//
// Le mode --attendu-mkz confronte le moteur à la vérité terrain CONNUE de
// mkz-consulting.fr (mesures des 15 et 20/08/2026 : robots.txt permissif,
// llms.txt servi, vraie 404, JSON-LD conforme, aucune balise noindex sur
// l'apex). Une sonde qui contredit cette vérité est une sonde fausse :
// le harnais sort en code 1 et dit laquelle.

import { runPhase } from "../functions/api/_engine.mjs";

const ORDRE = ["origin", "robots", "page", "notfound"];

async function scan(url) {
  const out = [];
  const first = await runPhase("origin", { url });
  if (first.error) return { url, error: first.error, checks: [] };
  out.push(...(first.checks || []));
  const origin = first.origin;
  if (!origin) return { url, origin: null, checks: out };
  for (const phase of ORDRE.slice(1)) {
    const r = await runPhase(phase, { origin });
    out.push(...(r.checks || []));
  }
  return { url, origin, checks: out };
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
}

// Vérité terrain mkz-consulting.fr : chaque attente est une mesure déjà faite
// et documentée (AGENTS.md du dépôt), pas une préférence.
const ATTENDU_MKZ = {
  "https-redirections": "ok",
  "robots-txt": "ok",
  "crawlers-ia": "ok",
  "llms-txt": "ok",
  "sitemap": "ok",
  "indexabilite": "ok",
  "title": "ok",
  "meta-description": "ok",
  "h1-hn": "ok",
  "viewport": "ok",
  "json-ld": "ok",
  "vraie-404": "ok",
};

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--attendu-mkz")) {
    const r = await scan("mkz-consulting.fr");
    afficher(r);
    const ecarts = [];
    for (const [id, attendu] of Object.entries(ATTENDU_MKZ)) {
      const c = r.checks.find((x) => x.id === id);
      if (!c) ecarts.push(id + " : check absent du resultat");
      else if (c.status !== attendu) {
        ecarts.push(id + " : attendu " + attendu + ", mesure " + c.status + " " + JSON.stringify(c.data).slice(0, 200));
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

  if (!args.length) {
    console.log("Usage : node scripts/test-audit-engine.mjs <url> [url...] | --attendu-mkz");
    process.exit(2);
  }
  for (const url of args) afficher(await scan(url));
}

main();
