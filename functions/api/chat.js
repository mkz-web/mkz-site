// Pages Function : POST /api/chat, l'assistant du site (skill assistant-site-statique).
//
// Toute la logique vit dans _assistant.mjs, copie du module du skill (à ne pas retoucher ici : corriger le skill, le
// rejouer, puis recopier). Le modèle reçoit la fiche de connaissances construite au build dans /_assistant/index.json,
// lu par le binding ASSETS des Pages Functions et jamais servi au public (functions/_assistant/[[chemin]].js).
// Secret : « mkz-chatbot », secret du projet Pages posé par Mickaël le 06/11/2026 en Production ET en Aperçu (nom
// choisi par lui) ; ANTHROPIC_API_KEY, le nom du skill, est lu s'il existe. Sans clé, ou sans index (build de
// production sans MKZ_ASSISTANT=1), la route répond 503 et ne coûte rien.
// Diagnostic (« mesure » : jetons, pages jointes, cause d'un 503) sur les hôtes techniques seulement (*.pages.dev,
// localhost), jamais sur mkz-consulting.fr.
// Limites (06/11/2026) : règle de zone Cloudflare commune avec /api/scan (20 requêtes par 10 s et par IP, la seule
// permise en offre Free) et plafond quotidien de réponses (_plafond-assistant.mjs, ASSISTANT_MAX_JOUR de wrangler.toml),
// communs aux deux langues.
// Langue (06/11/2026) : ?langue=en (posé par la balise des pages anglaises) lit /_assistant/index-en.json, construit
// depuis les seules pages anglaises ; toute autre valeur, ou aucune, lit l'index français.

import { traiterChat, estHoteTechnique } from "./_assistant.mjs";
import { avecPlafond } from "./_plafond-assistant.mjs";

const INDEX_PAR_LANGUE = { en: "/_assistant/index-en.json" };

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const env = context.env || {};
  const secret = env.ANTHROPIC_API_KEY ? "ANTHROPIC_API_KEY" : "mkz-chatbot";
  const cheminIndex = INDEX_PAR_LANGUE[url.searchParams.get("langue")] || undefined;
  const attendre = typeof context.waitUntil === "function" ? (p) => context.waitUntil(p) : undefined;
  return avecPlafond(context.request, env, () => traiterChat(context.request, env, { dev: estHoteTechnique(url.hostname), secret, cheminIndex }), { attendre });
}
