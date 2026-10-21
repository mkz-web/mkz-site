// Nouvelle charte (maquette codée du 20/10/2026) : quelles pages françaises la
// portent déjà, et quelle entrée du menu est active. L'intégration avance famille de pages par
// famille de pages ; une page absente de cette liste garde l'ancien habillage (Header, Footer,
// styles globaux) jusqu'à sa conversion. SiteChrome lit cette liste pour savoir quoi rendre.

const PAGES_CHARTE = new Set<string>([
  "/",
  // Pages métier et services (21/10/2026)
  "/creation-site-internet/",
  "/referencement-seo/",
  "/referencement-ia/",
  "/agence-web-77/",
  "/services/",
  // Pages annexes (21/10/2026)
  "/about/",
  "/outils/",
  "/contact/",
  "/audit-seo/",
  "/tarifs/",
  // Pages légales (21/10/2026)
  "/mentions-legales/",
  "/politique-confidentialite/",
]);

// Préfixes entiers convertis (ex. tous les articles d'une rubrique), à compléter famille par famille.
const PREFIXES_CHARTE: string[] = [
  // Hub, rubriques et articles Conseils (21/10/2026)
  "/conseils/",
];

export function estCharte(chemin: string): boolean {
  const c = chemin.endsWith("/") ? chemin : chemin + "/";
  return PAGES_CHARTE.has(c) || PREFIXES_CHARTE.some((p) => c.startsWith(p));
}

// Entrée du menu marquée « page » : relevée page par page sur la maquette (aucune pour À propos,
// Services, Agence web 77, les pages légales et la 404).
export function entreeActive(chemin: string): string | null {
  if (chemin === "/") return "/";
  if (chemin.startsWith("/conseils/")) return "/conseils/";
  if (["/outils/", "/audit-seo/", "/empreinte-ia/"].includes(chemin)) return "/outils/";
  if (["/creation-site-internet/", "/referencement-seo/", "/referencement-ia/", "/tarifs/", "/contact/"].includes(chemin)) return chemin;
  // Pages anglaises (22/10/2026), même logique sur les entrées de ui.en.nav
  if (chemin === "/en/") return "/en/";
  if (chemin.startsWith("/en/insights/")) return "/en/insights/";
  if (["/en/tools/", "/en/seo-audit/"].includes(chemin)) return "/en/tools/";
  if (["/en/french-seo/", "/en/ai-search-optimization/", "/en/website-design/", "/en/contact/"].includes(chemin)) return chemin;
  return null;
}
