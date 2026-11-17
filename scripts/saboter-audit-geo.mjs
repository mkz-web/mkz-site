// Sabotages du moteur de citations : chaque défaut réintroduit dans une COPIE du moteur doit
// faire sortir le banc en code 1. Une copie intacte est d'abord vérifiée verte (témoin).
//
// Exécution : node scripts/saboter-audit-geo.mjs
// Runtime minimal : Node 18. Dépendances : aucune.
// Les copies vont dans le dossier temporaire du système et sont supprimées à la fin.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(racine, "functions", "api", "_engine.mjs"), "utf8");
const banc = path.join(racine, "scripts", "test-audit-geo.mjs");
const dossier = fs.mkdtempSync(path.join(os.tmpdir(), "sabotage-audit-geo-"));

const SABOTAGES = [
  ["plafond quotidien ignoré", "if (deja >= max) {\n    return { citation: na(\"quota\"", "if (false) {\n    return { citation: na(\"quota\""],
  ["cache jamais relu", "if (enCache && enCache.citation) {", "if (false) {"],
  ["question de marque jugée sur le nom répété", "cite: q.type === \"marque\" ? j.source :", "cite: q.type === \"marque\" ? j.nomEcrit :"],
  ["domaine voisin pris pour le site", "hoteSource.endsWith(\".\" + hote)", "hoteSource.endsWith(hote)"],
  ["deux-points accepté dans un champ", "[\\p{L}\\p{N} '’&.,+-]{1,59}$/u", "[\\p{L}\\p{N} '’&.,:+-]{1,59}$/u"],
  ["nom reconnu à l'intérieur d'un autre mot", "if (!LETTRE.test(avant) && !LETTRE.test(apres)) return true;", "return true;"],
  ["erreur de l'API mise en cache comme une réponse", "if (rep.error) return { citation: na(rep.error, { code: rep.code }), cost: rep.cost, quota };", "if (rep.error) { await store.put(cleCache, { citation: na(rep.error) }, CACHE_TTL_S); return { citation: na(rep.error, { code: rep.code }), cost: rep.cost, quota }; }"],
];

function jouer(contenu, nom) {
  const f = path.join(dossier, nom + ".mjs");
  fs.writeFileSync(f, contenu, "utf8");
  const r = spawnSync(process.execPath, [banc, "--moteur", f], { encoding: "utf8" });
  return { code: r.status, faux: (r.stdout || "").split("\n").filter((l) => l.startsWith("FAUX")) };
}

let echecs = 0;
const temoin = jouer(source, "temoin");
if (temoin.code !== 0) {
  console.log("TÉMOIN ROUGE : la copie intacte ne passe pas le banc, les sabotages ne prouveraient rien.");
  process.exit(1);
}
console.log("témoin intact : vert");

SABOTAGES.forEach(([nom, ancre, remplacement], i) => {
  const occurrences = source.split(ancre).length - 1;
  if (occurrences !== 1) {
    echecs++;
    console.log(`NON JOUÉ  ${nom} : ancre vue ${occurrences} fois (une attendue)`);
    return;
  }
  const r = jouer(source.replace(ancre, () => remplacement), "sabotage-" + (i + 1));
  if (r.code === 1 && r.faux.length > 0) console.log(`vu rouge  ${nom} (${r.faux.length} cas faux, dont : ${r.faux[0].slice(5, 90)})`);
  else {
    echecs++;
    console.log(`NON VU    ${nom} : le banc sort en code ${r.code}`);
  }
});

fs.rmSync(dossier, { recursive: true, force: true });
console.log(`\n${SABOTAGES.length - echecs} sabotages vus rouges sur ${SABOTAGES.length}`);
process.exit(echecs ? 1 : 0);
