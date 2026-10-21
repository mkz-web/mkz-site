// Briques communes des pages Conseils à la nouvelle charte (maquette codée du
// 20/10/2026) : rendu du mini-markdown des contenus, habillage de chaque rubrique, picto de chaque
// article, carte d'article. Tout est lu dans les données (src/lib/articles, src/content/articles) :
// un article ou une rubrique ajoutés prennent le gabarit sans retouche.
import Link from "next/link";
import { articleUrl, formatDateEn, formatDateFr, getCategory, localeOf } from "@/lib/articles";
import type { Article, Inline } from "@/lib/articles/types";
import type { Locale } from "@/lib/i18n";

// Habillage d'une rubrique, relevé sur la maquette (hub Conseils, pages de rubrique, articles)
export type Rubrique = {
  classe: string;
  picto: string;
  fond: string;
  theme: "clair" | "sombre";
  degrade: string;
  image: { src: string; width: number; height: number; alt: string };
};

export const RUBRIQUES: Record<string, Rubrique> = {
  tutoriels: {
    classe: "r-tuto",
    picto: "#i-cle",
    fond: "s-blanc",
    theme: "clair",
    degrade: "degrade",
    image: { src: "/images/accueil/google.webp", width: 800, height: 1000, alt: "Une recherche Google ouverte sur un ordinateur portable, à côté d'un café" },
  },
  "creation-site-internet": {
    classe: "r-creation",
    picto: "#i-vitrine",
    fond: "s-violet",
    theme: "sombre",
    degrade: "degrade",
    image: { src: "/images/accueil/ecran.webp", width: 800, height: 1000, alt: "Un ordinateur portable entrouvert, son écran diffuse une lumière bleue et violette" },
  },
  seo: {
    classe: "r-seo",
    picto: "#i-loupe",
    fond: "s-lavande",
    theme: "clair",
    degrade: "degrade-prune",
    image: { src: "/images/charte/photos/telephone-affiche-recherche-google-devant-logo-600x450.webp", width: 600, height: 450, alt: "Un téléphone affiche la recherche Google devant le logo Google" },
  },
  "referencement-ia": {
    classe: "r-ia",
    picto: "#i-etincelle",
    fond: "s-marine",
    theme: "sombre",
    degrade: "degrade-rose",
    image: { src: "/images/charte/photos/telephone-affiche-assistant-intelligence-artificielle-pret-600x450.webp", width: 600, height: 450, alt: "Un téléphone affiche un assistant d'intelligence artificielle prêt à répondre" },
  },
  // Rubriques anglaises (22/10/2026) : l'habillage de leur pendant français (SEO, référencement IA)
  "french-seo": {
    classe: "r-seo",
    picto: "#i-loupe",
    fond: "s-lavande",
    theme: "clair",
    degrade: "degrade-prune",
    image: { src: "/images/charte/photos/telephone-affiche-recherche-google-devant-logo-600x450.webp", width: 600, height: 450, alt: "A phone showing a Google search in front of the Google logo" },
  },
  "ai-search": {
    classe: "r-ia",
    picto: "#i-etincelle",
    fond: "s-marine",
    theme: "sombre",
    degrade: "degrade-rose",
    image: { src: "/images/charte/photos/telephone-affiche-assistant-intelligence-artificielle-pret-600x450.webp", width: 600, height: 450, alt: "A phone showing an AI assistant ready to answer" },
  },
};

export const rubrique = (slug: string): Rubrique => RUBRIQUES[slug] ?? RUBRIQUES.seo;

// Picto de chaque article, choisi par la maquette ; un article qui n'y figure pas prend celui de
// sa rubrique.
const PICTOS: Record<string, string> = {
  "connecter-site-google-search-console": "#i-courbe",
  "creer-fiche-google-business-profile": "#i-repere",
  "optimiser-vitesse-wordpress": "#i-eclair",
  "mentions-legales-site-internet": "#i-doc",
  "combien-coute-un-site-internet": "#i-etiquette",
  "refonte-site-internet": "#i-crayon",
  "site-vitrine": "#i-vitrine",
  "avis-google": "#i-etoile",
  "comment-apparaitre-sur-google": "#i-loupe",
  "pourquoi-mon-site-n-apparait-pas-sur-google": "#i-alerte",
  "trouver-des-chantiers": "#i-maison",
  "consultant-seo-freelance-tjm-comptabilite": "#i-chrono",
  "audit-seo": "#i-rapport",
  "referencement-local": "#i-repere",
  "seo-artisan": "#i-cle",
  "ai-overviews-france": "#i-etincelle",
  "autoriser-robots-ia": "#i-robot",
  "etre-cite-par-chatgpt": "#i-guillemets",
  "geo-seo-difference": "#i-lien",
  "llms-txt-a-quoi-ca-sert": "#i-code",
  "mesurer-visibilite-ia": "#i-courbe",
  "why-translation-never-ranks-in-france": "#i-alerte",
  "how-to-choose-a-french-seo-agency": "#i-rapport",
  "get-cited-by-ai-answers-in-french": "#i-guillemets",
};

export const pictoArticle = (slug: string, categorie: string) => PICTOS[slug] ?? rubrique(categorie).picto;

// Mini-markdown des contenus (**gras**, [lien](/url/), `code`) rendu en balisage simple, sans les
// classes de l'ancien gabarit. Sans liens (avecLiens = false) dans un texte déjà cliquable.
export function enLigne(texte: Inline, avecLiens = true): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Italique *…* (contenus anglais : « *vouvoiement* ») : ses astérisques s'affichaient tels quels,
  // en ligne comme dans l'ancien gabarit (corrigé le 22/10/2026). Rendu en <i> : dans la charte,
  // <em> sert aux mises en valeur en dégradé et n'est pas en italique.
  const regex = /(`[^`]+`)|(\*\*[^*]+?\*\*)|(\[[^\]]+\]\([^)\s]+\))|(\*[^*\s][^*]*?\*)/g;
  let dernier = 0;
  let cle = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(texte))) {
    if (m.index > dernier) parts.push(texte.slice(dernier, m.index));
    const tok = m[0];
    if (tok.startsWith("`")) parts.push(<code key={cle++}>{tok.slice(1, -1)}</code>);
    // Gras lu récursivement : « **Le test `site:`** » affichait ses accents graves (défaut de
    // l'ancien gabarit, visible en ligne et repris par la maquette, corrigé le 21/10/2026)
    else if (tok.startsWith("**")) parts.push(<strong key={cle++}>{enLigne(tok.slice(2, -2), avecLiens)}</strong>);
    else if (tok.startsWith("*")) parts.push(<i key={cle++}>{enLigne(tok.slice(1, -1), avecLiens)}</i>);
    else {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (!lm) parts.push(tok);
      else if (!avecLiens) parts.push(lm[1]);
      else if (lm[2].startsWith("/")) parts.push(<Link key={cle++} href={lm[2]}>{lm[1]}</Link>);
      else if (lm[2].startsWith("#")) parts.push(<a key={cle++} href={lm[2]}>{lm[1]}</a>);
      else parts.push(<a key={cle++} href={lm[2]} target="_blank" rel="noopener noreferrer">{lm[1]}</a>);
    }
    dernier = m.index + tok.length;
  }
  if (dernier < texte.length) parts.push(texte.slice(dernier));
  return parts;
}

export type CarteArticleDonnees = {
  slug: string;
  categorie: string;
  categoryName: string;
  title: string;
  excerpt: string;
  url: string;
  dateLabel: string;
  readingMinutes: number;
  locale: Locale;
};

export function CarteArticle({ a }: { a: CarteArticleDonnees }) {
  const en = a.locale === "en";
  return (
    <Link className={"article " + rubrique(a.categorie).classe} href={a.url}>
      <span className="article__tete">
        <span className="article__ico" aria-hidden="true"><svg><use href={pictoArticle(a.slug, a.categorie)} /></svg></span>
        <span className="article__meta"><b>{a.categoryName}</b><span>{a.dateLabel} · {a.readingMinutes} {en ? "min read" : "min de lecture"}</span></span>
      </span>
      <span className="article__titre">{a.title}</span>
      <span className="article__texte">{enLigne(a.excerpt, false)}</span>
      <span className="article__lien">{en ? "Read the article" : "Lire l’article"}</span>
    </Link>
  );
}

export function versCarte(a: Article): CarteArticleDonnees {
  const locale = localeOf(a);
  return {
    slug: a.slug,
    categorie: a.category,
    categoryName: getCategory(a.category, locale)?.name ?? a.category,
    title: a.title,
    excerpt: a.excerpt,
    url: articleUrl(a),
    dateLabel: locale === "en" ? formatDateEn(a.datePublished) : formatDateFr(a.datePublished),
    readingMinutes: a.readingMinutes,
    locale,
  };
}

// Grille : trois colonnes quand le compte tombe juste, deux sinon (relevé sur la maquette :
// 3 et 6 articles en trois colonnes, 4 et 8 en deux).
export const classeGrille = (n: number) => (n % 3 === 0 ? "articles" : "articles articles--2");
