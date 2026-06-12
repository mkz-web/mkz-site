// Modèle de contenu de la newsroom /conseils/.
// Un article = métadonnées SEO + suite de blocs typés rendus par ArticleRenderer.
// Le texte "inline" accepte un mini-markdown : **gras**, [lien](/url/), `code`.

export type CategorySlug = "tutoriels" | "creation-site-internet" | "seo";

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
      // Emplacement de capture d'écran : affiche un cadre légendé tant que
      // `src` est absent ; passe à une vraie image dès que `src` est renseigné
      // (fichier à déposer dans public/images/conseils/).
      type: "screenshot";
      caption: string;
      alt: string;
      src?: string;
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
  name: string; // libellé court (badge, breadcrumb)
  title: string; // H1 de la page catégorie
  metaTitle: string;
  metaDescription: string;
  description: string; // carte sur le hub /conseils/
  intro: Inline[]; // paragraphes d'intro de la page catégorie (cocon)
  icon: string;
  pillar: { href: string; label: string }; // page pilier vers laquelle le cocon pousse
}
