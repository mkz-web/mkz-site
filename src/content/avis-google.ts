/**
 * Les avis Google de MKZ, tels qu'ils sont écrits sur la fiche (cid 6891196325972723134),
 * relevés le 14/09/2026 par DataForSEO business_data/google/reviews (texte, auteur, date,
 * note). Source unique pour l'accueil, llms-full.txt et le pilier agence-web-77.
 *
 * Règles : texte VERBATIM (ponctuation, émoji et fautes comprises), nom d'auteur tel que
 * publié sur Google, jamais un avis inventé ni retouché. À REMESURER à chaque compte rendu
 * mensuel (nouveaux avis, note, nombre) : un avis affiché qui n'existe plus sur Google, ou un
 * compte périmé, est une pratique commerciale trompeuse.
 */

export type AvisGoogle = {
  auteur: string;
  texte: string;
  /** Date de publication sur Google (UTC). */
  date: string;
  /** Mois affiché, en français. */
  mois: string;
  note: 5;
  url: string;
};

export const ficheGoogle = {
  nom: "MKZ",
  url: "https://maps.google.com/?cid=6891196325972723134",
  note: 5.0,
  nombreAvis: 5,
  releveLe: "2026-09-14",
} as const;

export const avisGoogle: AvisGoogle[] = [
  {
    auteur: "Yoann Florentin",
    texte: "Je recommande Mickaël à 100 %. Profil solide et expérimenté, avec une bonne communication et une vraie proactivité. Avec Mickaël, c'est simple et fluide 😉 Par exemple, l'audit SEO que je lui ai commandé était clair et directement actionnable.",
    date: "2026-09-10",
    mois: "septembre 2026",
    note: 5,
    url: "https://www.google.com/maps/contrib/115738050840050004026/reviews?hl=fr-FR",
  },
  {
    auteur: "Jordan carrere",
    texte: "Je voulais utiliser l'IA pour mon site web sans savoir par où commencer. Mickaël m'a montré comment m'en servir concrètement, pour les textes, les pages et le référencement, en m'expliquant à chaque fois pourquoi. Aujourd'hui je fais une bonne partie des mises à jour moi-même.",
    date: "2026-08-21",
    mois: "août 2026",
    note: 5,
    url: "https://www.google.com/maps/contrib/108756961038852009435/reviews?hl=fr-FR",
  },
  {
    auteur: "Sarah El Gharbi",
    texte: "Je recommande Mickaël, c’est un profil rare : un vrai bagage technique de 20 ans en systèmes et cybersécurité, au service du référencement naturel. Crawl, cocon sémantique, Core Web Vitals, il maîtrise chaque sujet en profondeur. Un discours clair, des analyses utiles, des livrables concrets et orientés résultats. Les retours arrivent systématiquement.",
    date: "2026-07-05",
    mois: "juillet 2026",
    note: 5,
    url: "https://www.google.com/maps/contrib/111657950704300183083/reviews?hl=fr-FR",
  },
  {
    auteur: "Saïd Irgues",
    texte: "Presta rapide et efficace c'est tout ce que je demandais et je l'ai eu.",
    date: "2026-07-15",
    mois: "juillet 2026",
    note: 5,
    url: "https://www.google.com/maps/contrib/104196717872767233804/reviews?hl=fr-FR",
  },
  {
    auteur: "vince mat",
    texte: "Professionnel expérimenté, très bon mindset, je recommande",
    date: "2025-11-07",
    mois: "novembre 2025",
    note: 5,
    url: "https://www.google.com/maps/contrib/116956598603328962652/reviews?hl=fr-FR",
  },
];
