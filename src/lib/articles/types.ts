// Modèle de contenu de la newsroom /conseils/.
// Un article = métadonnées SEO + suite de blocs typés rendus par ArticleRenderer.
// Le texte "inline" accepte un mini-markdown : **gras**, [lien](/url/), `code`.

// Cocons français (/conseils/) et anglais (/en/insights/).
// Les cocons anglais ne sont pas les cocons français traduits : ils suivent la
// demande mesurée en anglais (SEO du marché français, visibilité IA), pas la
// demande locale française (artisans, TPE, Seine-et-Marne).
export type FrCategorySlug =
  | "tutoriels"
  | "creation-site-internet"
  | "seo"
  | "referencement-ia";
export type EnCategorySlug = "french-seo" | "ai-search";
export type CategorySlug = FrCategorySlug | EnCategorySlug;

export type Inline = string;

export type Block =
  | { type: "p"; text: Inline }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id?: string; text: string }
  | { type: "ul"; items: Inline[] }
  | { type: "ol"; items: Inline[] }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "callout";
      variant: "retenir" | "astuce" | "attention" | "definition";
      title?: string;
      text?: Inline;
      items?: Inline[];
    }
  | {
      // Capture d'écran. Sans `src`, le bloc affiche un cadre légendé
      // « Capture d'écran à venir » : c'est l'emplacement réservé, gardé sur
      // les articles de fond. Les 3 tutoriels, eux, n'ont plus aucun bloc sans
      // image (08/08/2026) : leurs captures existent toutes.
      // Ajouter une image : convertir avec scripts/convertir-captures.mjs,
      // déposer dans public/images/conseils/, puis renseigner src + width +
      // height (dimensions réelles, sinon la page saute au chargement).
      // `width` et `height` sont les dimensions réelles du fichier : elles
      // réservent la place avant chargement, donc zéro décalage (CLS).
      type: "screenshot";
      caption: string;
      alt: string;
      src?: string;
      width?: number;
      height?: number;
    }
  | { type: "quote"; text: string; author?: string }
  | { type: "cta"; title: string; text: Inline; button: string; href: string }
  | { type: "code"; code: string };

export interface ArticleFaqItem {
  q: string;
  a: string; // texte brut (réutilisé tel quel dans le JSON-LD FAQPage)
}

export interface Article {
  slug: string;
  /** Locale de rédaction. Absent = "fr" (articles historiques). */
  locale?: "fr" | "en";
  category: CategorySlug;
  title: string; // H1
  metaTitle: string; // ≤ 65 caractères, suffixe " | MKZ" ajouté par le template
  metaDescription: string; // ≤ 160 caractères
  datePublished: string; // ISO YYYY-MM-DD
  dateModified: string; // ISO YYYY-MM-DD
  readingMinutes: number;
  excerpt: string; // chapô + cartes + ItemList JSON-LD
  tldr: Inline[]; // encadré « L'essentiel » (3-5 puces citables)
  blocks: Block[];
  faq: ArticleFaqItem[];
  related: string[]; // slugs d'articles liés (maillage cocon)
  keywords: string[];
}

export interface PillarPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroLead: string;
  blocks: Block[];
  faq: ArticleFaqItem[];
  keywords: string[];
}

export interface Category {
  slug: CategorySlug;
  locale?: "fr" | "en"; // absent = "fr"
  name: string; // libellé court (badge, breadcrumb)
  title: string; // H1 de la page catégorie
  metaTitle: string;
  metaDescription: string;
  description: string; // carte sur le hub /conseils/
  intro: Inline[]; // paragraphes d'intro de la page catégorie (cocon)
  icon: string;
  pillar: { href: string; label: string }; // page pilier vers laquelle le cocon pousse
}
