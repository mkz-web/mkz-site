// Contrat de consentement du site : bandeau maison, qui remplace hu-manity
// depuis le 21/08/2026 (hu-manity : 67 % de l'écran mobile, boutons à 2,1:1,
// mesure d'audience rangée sous « Pub personnalisée », erreur console à chaque
// sauvegarde, et presque aucun réglage).
//
// Un seul cookie first-party, « mkz-consent », JSON encodé (encodeURIComponent) :
//   { v: 1, id: "<uuid>", date: "<ISO>", audience: true | false }
// - `audience` : mesure d'audience (Google Analytics 4 + Microsoft Clarity).
//   Le site n'a ni publicité ni personnalisation : une seule finalité soumise
//   à consentement, donc un seul booléen. Ajouter une finalité = ajouter une
//   clé ici, dans le bandeau ET dans les chargeurs.
// - `id` + `date` : preuve du choix (accord OU refus), conservée 180 jours,
//   durée au bout de laquelle la CNIL recommande de reposer la question.
// - `v` : version du contrat ; un cookie d'une autre version est ignoré, la
//   question est reposée.
//
// À chaque choix : document.dispatchEvent(CustomEvent("mkz-consent",
// { detail: { audience } })). Les chargeurs ClarityScript et GaScript sont des
// scripts INLINE (next/script) : ils ne peuvent pas importer ce module et
// réimplémentent la lecture du cookie. Tout changement ici se reporte dans
// les deux, à la main.
//
// Le lien « Gérer les cookies » du pied de page rouvre le bandeau par
// l'événement "mkz-consent-open" : le retrait doit être aussi simple que
// l'octroi (CNIL, lignes directrices cookies du 17/09/2020).

export const CONSENT_COOKIE = "mkz-consent";
export const CONSENT_EVENT = "mkz-consent";
export const CONSENT_OPEN_EVENT = "mkz-consent-open";
export const CONSENT_VERSION = 1;
/** 180 jours, en secondes. */
export const CONSENT_MAX_AGE = 15552000;

export type Consent = {
  v: number;
  id: string;
  date: string;
  audience: boolean;
};

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)mkz-consent=([^;]*)/);
  if (!m) return null;
  let raw = m[1];
  try {
    raw = decodeURIComponent(raw);
  } catch {
    /* valeur non encodée : on la lit telle quelle */
  }
  try {
    const c = JSON.parse(raw);
    if (!c || c.v !== CONSENT_VERSION || typeof c.audience !== "boolean") return null;
    return c as Consent;
  } catch {
    return null;
  }
}

function uuid(): string {
  const c = typeof crypto !== "undefined" ? crypto : undefined;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  const b = new Uint8Array(16);
  if (c && typeof c.getRandomValues === "function") c.getRandomValues(b);
  else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** Enregistre le choix, efface le cookie de l'ancien bandeau, prévient les chargeurs. */
export function writeConsent(audience: boolean): Consent {
  const prev = readConsent();
  const consent: Consent = {
    v: CONSENT_VERSION,
    id: prev?.id ?? uuid(),
    date: new Date().toISOString(),
    audience,
  };
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}` +
    `; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  // Cookie du bandeau hu-manity (jusqu'au 21/08/2026) : il ne fait plus foi.
  document.cookie = "hu-consent=; Max-Age=0; path=/";
  document.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { audience } }));
  return consent;
}

/** Rouvre le bandeau (lien « Gérer les cookies » du pied de page). */
export function openConsent(): void {
  document.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
