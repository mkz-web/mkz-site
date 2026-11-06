#!/usr/bin/env node
/*
 * Interdits et gardes d'un site, éprouvés sur son index construit : chaque phrase « bloque » du fichier d'attendus
 * (clé « filtres ») doit être écartée par un interdit bloquant, chaque phrase « passe » (souvent reprise du site) doit
 * rester, chaque cas de garde doit donner le résultat attendu (« garde », « interdit » ou « passe »).
 * Mêmes règles que assistant-worker.mjs : interdit bloquant = repli ; garde = expression de question ET de réponse.
 * Commande : node tester-filtres.mjs <dist>/_assistant/index.json <attendus.json>
 * Runtime : Node >= 14. Dépendances : aucune. Code 1 si un cas échoue, 2 si les attendus n'ont pas de clé « filtres ».
 *
 * Né sur le site MKZ (06/11/2026) : le motif « ancienne grille » ne voyait pas « coûte 1 190 € » (garde arrière qui
 * refusait aussi l'espace devant le chiffre), vu au premier passage. Le banc du Worker ne teste qu'un interdit et une
 * garde ; un site qui en déclare six les éprouve tous ici, sur des phrases fautives ET sur des phrases justes du site
 * (un interdit trop large remplace une bonne réponse par le repli).
 * Forme : { "filtres": { "bloque": ["..."], "passe": ["..."], "gardes": [{ "question", "reponse", "attendu" }] } }
 */
import fs from "node:fs";

const [cheminIndex, cheminAttendus] = process.argv.slice(2);
if (!cheminIndex || !cheminAttendus) { console.error("Usage : node tester-filtres.mjs <index.json> <attendus.json>"); process.exit(2); }
const index = JSON.parse(fs.readFileSync(cheminIndex, "utf8"));
const F = JSON.parse(fs.readFileSync(cheminAttendus, "utf8")).filtres;
if (!F) { console.error("attendus sans clé « filtres » : rien à éprouver"); process.exit(2); }

const regles = (index.interdits || []).filter((i) => i.bloquant !== false).map((i) => ({ re: new RegExp(i.s, i.f), pourquoi: i.pourquoi }));
const gardes = (index.gardes || []).map((g) => ({ nom: g.nom, q: new RegExp(g.q.s, g.q.f), r: new RegExp(g.r.s, g.r.f) }));
const touche = (t) => regles.filter((x) => x.re.test(t)).map((x) => x.pourquoi);

let ko = 0;
let total = 0;
function verifier(nom, ok, detail) {
  total++;
  if (!ok) ko++;
  console.log((ok ? "OK " : "KO ") + nom + (detail ? " : " + detail : ""));
}
for (const t of F.bloque || []) { const v = touche(t); verifier(`écartée : « ${t} »`, v.length > 0, v.join(", ") || "aucun interdit"); }
for (const t of F.passe || []) { const v = touche(t); verifier(`gardée : « ${t} »`, v.length === 0, v.join(", ")); }
for (const c of F.gardes || []) {
  const g = gardes.find((x) => x.q.test(c.question) && x.r.test(c.reponse));
  const v = touche(c.reponse);
  const resultat = v.length ? "interdit" : g ? "garde" : "passe";
  verifier(`garde : « ${c.question} » / « ${c.reponse.slice(0, 50)} » : ${c.attendu}`, resultat === c.attendu, resultat + (g ? " (" + g.nom + ")" : "") + (v.length ? " (" + v.join(", ") + ")" : ""));
}
if (!total) { console.error("aucun cas dans « filtres »"); process.exit(2); }
console.log(ko ? `${ko} cas sur ${total} en échec` : `les ${total} cas passent`);
process.exit(ko ? 1 : 0);
