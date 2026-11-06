// Adaptateur du banc de l'assistant (banc-assistant.mjs du skill assistant-site-statique) vers la VRAIE route de MKZ :
// functions/api/chat.js (choix de l'index par ?langue=en, plafond quotidien) et functions/_assistant/[[chemin]].js (404).
// Commande : node <skill>/scripts/banc-assistant.mjs out assistant/attendus-en.json --worker scripts/assistant/banc-route-mkz.mjs
// Runtime : Node >= 18 (Request, Response natifs). Dépendances : aucune.
// Sans KV dans l'environnement du banc, le plafond compte en mémoire (300 par jour) : le banc en appelle moins de 100.
import { onRequest as chat } from "../../functions/api/chat.js";
import { onRequest as prive } from "../../functions/_assistant/[[chemin]].js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const context = { request, env, waitUntil: () => {}, params: {} };
    if (url.pathname === "/api/chat") return chat(context);
    if (url.pathname.startsWith("/_assistant/")) return prive(context);
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404 });
  },
};
