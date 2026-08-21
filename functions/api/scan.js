// Pages Function : POST /api/scan { phase, url | origin }
//
// Une phase du moteur par appel (voir _engine.mjs) : le front enchaîne
// origin -> robots -> page -> notfound et affiche la progression réelle.
// L'origine validée par la phase 1 est renvoyée au client, qui la repasse
// telle quelle : pas d'état côté serveur.
//
// Anti-abus S1 : validation stricte de la cible dans normalizeTarget (hôtes
// privés, ports, schémas) + garde-fou de taille de corps. Turnstile et
// plafond DataForSEO arrivent avec le Tier 1 (S2).

import { runPhase, normalizeTarget } from "./_engine.mjs";

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
  if (!["origin", "robots", "page", "notfound"].includes(phase)) {
    return json({ error: "phase" }, 400);
  }

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

  const result = await runPhase(phase, { origin: new URL(origin).origin });
  return json(result);
}
