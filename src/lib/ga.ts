// Événements GA4 côté React. Le chargeur GaScript expose window.mkzTrack,
// qui n'envoie RIEN sans consentement ni tag chargé : ici, aucun garde-fou
// RGPD à réimplémenter, on délègue. Paramètres : jamais de donnée personnelle
// (ni email ni nom) ; le domaine scanné par l'outil d'audit est une donnée du
// site testé, pas du visiteur.

type TrackFn = (name: string, params?: Record<string, string | number>) => void;

export function gaEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const track = (window as unknown as { mkzTrack?: TrackFn }).mkzTrack;
  if (typeof track === "function") track(name, params);
}
