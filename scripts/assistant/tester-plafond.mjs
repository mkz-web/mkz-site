#!/usr/bin/env node
// Banc du plafond quotidien de l'assistant (functions/api/_plafond-assistant.mjs).
// Lancement : node scripts/assistant/tester-plafond.mjs [--module <chemin d'une copie à éprouver>]
// Runtime : Node >= 18 (Request, Response). Dépendances : aucune.
// Sortie : une ligne par cas, code 1 au premier écart. Le KV et l'assistant sont simulés : aucun appel réseau.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const i = process.argv.indexOf("--module");
const cheminModule = i > -1 ? path.resolve(process.argv[i + 1]) : path.join(ICI, "..", "..", "functions", "api", "_plafond-assistant.mjs");
const M = await import(pathToFileURL(cheminModule).href + "?banc=" + Date.now());

let echecs = 0;
let cas = 0;
const verifier = (nom, condition, detail) => {
  cas++;
  if (condition) console.log("OK   " + nom);
  else { echecs++; console.log("KO   " + nom + (detail ? " : " + detail : "")); }
};

const kvSimule = (initial, options) => {
  const o = options || {};
  const m = new Map(Object.entries(initial || {}));
  return {
    m,
    ecritures: [],
    lectures: 0,
    async get(k) { this.lectures++; if (o.panneGet) throw new Error("panne"); return m.has(k) ? m.get(k) : null; },
    async put(k, v, opts) { if (o.pannePut) throw new Error("panne"); this.ecritures.push({ k, v, opts }); m.set(k, v); },
  };
};
const req = (methode) => new Request("https://mkz-consulting.fr/api/chat", { method: methode || "POST", headers: { "Content-Type": "application/json" }, body: methode === "GET" ? undefined : "{}" });
const assistant = (statut) => { let appels = 0; const f = async () => { appels++; return new Response("{}", { status: statut }); }; f.appels = () => appels; return f; };
const jour = (s) => () => new Date(s + "T12:00:00Z");

// 1. Sous le plafond : la réponse 200 passe et le compteur avance de 1.
{
  const kv = kvSimule({ "assistant:2026-11-06": "4" });
  const a = assistant(200);
  const r = await M.avecPlafond(req(), { AUDIT_QUOTA: kv, ASSISTANT_MAX_JOUR: "300" }, a, { maintenant: jour("2026-11-06") });
  verifier("sous le plafond, réponse 200 rendue", r.status === 200 && a.appels() === 1, "statut " + r.status);
  verifier("sous le plafond, compteur porté à 5", kv.m.get("assistant:2026-11-06") === "5", "valeur " + kv.m.get("assistant:2026-11-06"));
  verifier("clé expirée au bout de 48 h", kv.ecritures[0] && kv.ecritures[0].opts && kv.ecritures[0].opts.expirationTtl === 172800);
}
// 2. Une réponse non 200 (refus, erreur du modèle) ne compte pas.
for (const statut of [400, 403, 413, 422, 502, 503]) {
  const kv = kvSimule({ "assistant:2026-11-06": "4" });
  const r = await M.avecPlafond(req(), { AUDIT_QUOTA: kv }, assistant(statut), { maintenant: jour("2026-11-06") });
  verifier("réponse " + statut + " rendue sans compter", r.status === statut && kv.ecritures.length === 0);
}
// 3. Plafond atteint : 429 « indisponible », l'assistant n'est pas appelé.
{
  const kv = kvSimule({ "assistant:2026-11-06": "300" });
  const a = assistant(200);
  const r = await M.avecPlafond(req(), { AUDIT_QUOTA: kv, ASSISTANT_MAX_JOUR: "300" }, a, { maintenant: jour("2026-11-06") });
  const j = await r.json().catch(() => ({}));
  verifier("plafond atteint : 429", r.status === 429, "statut " + r.status);
  verifier("plafond atteint : assistant non appelé", a.appels() === 0, a.appels() + " appel(s)");
  verifier("plafond atteint : indisponible et message", j.indisponible === true && j.ok === false && /limite/.test(j.erreur || ""), JSON.stringify(j));
  verifier("plafond atteint : rien écrit", kv.ecritures.length === 0);
}
// 4. La 300e réponse passe, la 301e non (frontière exacte).
{
  const kv = kvSimule({ "assistant:2026-11-06": "299" });
  const r1 = await M.avecPlafond(req(), { AUDIT_QUOTA: kv, ASSISTANT_MAX_JOUR: "300" }, assistant(200), { maintenant: jour("2026-11-06") });
  const r2 = await M.avecPlafond(req(), { AUDIT_QUOTA: kv, ASSISTANT_MAX_JOUR: "300" }, assistant(200), { maintenant: jour("2026-11-06") });
  verifier("300e réponse rendue, 301e refusée", r1.status === 200 && r2.status === 429, r1.status + " puis " + r2.status);
}
// 5. Nouveau jour : compteur neuf.
{
  const kv = kvSimule({ "assistant:2026-11-06": "300" });
  const r = await M.avecPlafond(req(), { AUDIT_QUOTA: kv, ASSISTANT_MAX_JOUR: "300" }, assistant(200), { maintenant: jour("2026-11-07") });
  verifier("jour suivant : réponse rendue", r.status === 200, "statut " + r.status);
  verifier("jour suivant : nouvelle clé à 1", kv.m.get("assistant:2026-11-07") === "1");
}
// 6. Valeur de plafond absente ou invalide : 300 par défaut.
verifier("plafond par défaut 300", M.maxJour({}) === 300 && M.maxJour({ ASSISTANT_MAX_JOUR: "abc" }) === 300 && M.maxJour({ ASSISTANT_MAX_JOUR: "0" }) === 300 && M.maxJour({ ASSISTANT_MAX_JOUR: "-5" }) === 300);
verifier("plafond lu dans l'environnement", M.maxJour({ ASSISTANT_MAX_JOUR: "12" }) === 12);
// 7. Méthode autre que POST : transmise sans lecture ni écriture.
{
  const kv = kvSimule({ "assistant:2026-11-06": "999" });
  const a = assistant(405);
  const r = await M.avecPlafond(req("GET"), { AUDIT_QUOTA: kv }, a, { maintenant: jour("2026-11-06") });
  verifier("GET transmis tel quel, sans lecture du KV", r.status === 405 && a.appels() === 1 && kv.lectures === 0 && kv.ecritures.length === 0, "statut " + r.status + ", " + kv.lectures + " lecture(s)");
}
// 8. Sans KV : le plafond tient quand même en mémoire de l'isolat.
{
  const env = { ASSISTANT_MAX_JOUR: "2" };
  const m = jour("2031-01-01");
  const s = [];
  for (let k = 0; k < 3; k++) s.push((await M.avecPlafond(req(), env, assistant(200), { maintenant: m })).status);
  verifier("sans KV : 2 réponses puis 429", s.join(",") === "200,200,429", s.join(","));
}
// 9. KV en panne à la lecture : repli sur la mémoire, jamais l'absence de plafond.
{
  const env = { AUDIT_QUOTA: kvSimule({}, { panneGet: true }), ASSISTANT_MAX_JOUR: "1" };
  const m = jour("2031-02-01");
  const s = [];
  for (let k = 0; k < 2; k++) s.push((await M.avecPlafond(req(), env, assistant(200), { maintenant: m })).status);
  verifier("KV en panne à la lecture : 1 réponse puis 429", s.join(",") === "200,429", s.join(","));
}
// 10. KV en panne à l'écriture : la réponse est rendue quand même.
{
  const env = { AUDIT_QUOTA: kvSimule({}, { pannePut: true }) };
  const r = await M.avecPlafond(req(), env, assistant(200), { maintenant: jour("2031-03-01") });
  verifier("KV en panne à l'écriture : réponse rendue", r.status === 200, "statut " + r.status);
}
// 11. Écriture confiée à waitUntil quand il existe.
{
  const kv = kvSimule({});
  const confiees = [];
  const r = await M.avecPlafond(req(), { AUDIT_QUOTA: kv }, assistant(200), { maintenant: jour("2031-04-01"), attendre: (p) => confiees.push(p) });
  await Promise.all(confiees);
  verifier("écriture confiée à waitUntil", r.status === 200 && confiees.length === 1 && kv.m.get("assistant:2031-04-01") === "1");
}

console.log(echecs ? `${echecs} cas sur ${cas} en échec` : `les ${cas} cas passent`);
process.exit(echecs ? 1 : 0);
