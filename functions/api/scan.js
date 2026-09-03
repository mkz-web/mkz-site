// Pages Function : POST /api/scan { phase, url | origin }
//
// Une phase du moteur par appel (voir _engine.mjs) : le front enchaîne
// origin -> robots -> page -> notfound -> autorite et affiche la progression
// réelle. L'origine validée par la phase 1 est renvoyée au client, qui la
// repasse telle quelle : pas d'état côté serveur, hors le compteur et le
// cache de la phase autorité (KV AUDIT_QUOTA, voir wrangler.toml).
//
// Anti-abus : validation stricte de la cible dans normalizeTarget (hôtes
// privés, ports, schémas), garde-fou de taille de corps, et pour la phase
// payante (DataForSEO) : cache 24 h par domaine + plafond quotidien dur
// (AUDIT_TIER1_MAX_JOUR). Identifiants DataForSEO = secrets du projet Pages
// (DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD), jamais dans le dépôt ni au client.
// Turnstile et limites par IP restent à faire (S2 du cadrage).

import { runPhase, normalizeTarget, TIER1_MAX_JOUR_DEFAUT } from "./_engine.mjs";

const PHASES = ["origin", "robots", "page", "notfound", "autorite"];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

export async function onRequestPost(context) {
  let body;
  try {
    const raw = await context.request.text();
    if (raw.length > 2048) return json({ error: "corps" }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: "json" }, 400);
  }

  const phase = String(body.phase || "");
  if (!PHASES.includes(phase)) return json({ error: "phase" }, 400);

  if (phase === "origin") {
    // Auto-scan : les variantes http de notre propre zone ne sont pas
    // testables depuis le Worker (voir phaseOrigin dans _engine.mjs).
    const url = String(body.url || "");
    const norm = normalizeTarget(url);
    const ownHost = new URL(context.request.url).hostname.replace(/^www\./, "");
    const self = !norm.error && norm.host.replace(/^www\./, "") === ownHost;
    const result = await runPhase("origin", { url, self });
    if (result.error) return json({ error: result.error }, 422);
    return json(result);
  }

  // Les phases suivantes exigent une origine déjà validée par la phase 1 :
  // on la re-valide quand même, le client n'est jamais une source de confiance.
  const origin = String(body.origin || "");
  const norm = normalizeTarget(origin);
  if (norm.error || !origin.startsWith("https://")) return json({ error: "origine" }, 422);
  const cible = new URL(origin).origin;

  if (phase === "autorite") {
    const env = context.env || {};
    const ctx = {
      login: env.DATAFORSEO_LOGIN,
      password: env.DATAFORSEO_PASSWORD,
      kv: env.AUDIT_QUOTA,
      maxParJour: Number(env.AUDIT_TIER1_MAX_JOUR) || TIER1_MAX_JOUR_DEFAUT,
    };
    const result = await runPhase("autorite", { origin: cible, ctx });
    // Journal serveur (tableau de bord Cloudflare, `wrangler pages deployment
    // tail`) : coût relevé sur la réponse DataForSEO et compteur du jour.
    // Jamais renvoyés au client.
    console.log(
      JSON.stringify({
        audit: "autorite",
        host: new URL(cible).hostname,
        cost: result.cost || 0,
        cache: Boolean(result.cache),
        quota: result.quota || null,
      })
    );
    return json({ checks: result.checks });
  }

  const result = await runPhase(phase, { origin: cible });
  return json(result);
}
