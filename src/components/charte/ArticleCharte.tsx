// Gabarit d'article à la nouvelle charte (maquette codée du 20/10/2026), rendu
// depuis les données de l'article (src/content/articles/*.ts) : les articles futurs de la veille
// le prennent sans retouche. Balisage relevé sur les 21 articles de la maquette, qui s'alignent
// bloc pour bloc sur les données (mesuré le 21/10/2026, aucun désalignement).
//
// Règles de rendu tirées de la maquette :
//   - encadré : avec puces -> encadre--liste ; titre commençant par « Ne » (« Ne jugez jamais... »)
//     ou « Attention » sans titre -> encadre--alerte ; sinon encadre simple ; titre par défaut
//     selon la variante (À retenir, Astuce, Attention, Définition) ;
//   - invitation (cta) : toujours encadre--appel avec bouton. Écart voulu : la maquette en rend 13
//     sur 35 sans bouton, artefact de sa conversion (le site en ligne pose variant="primary" sur
//     ses liens internes, que le script de la maquette n'a pas reconnus comme boutons) ;
//   - capture sans image : cadre « Capture d'écran à venir », comme sur le site.
import Link from "next/link";
import type { Article, Block, CategorySlug } from "@/lib/articles/types";
import { SITE, ui, type Locale } from "@/lib/i18n";
import ChartePage from "./ChartePage";
import { enLigne, rubrique } from "./contenu";
import "./metier.css";
import "./pages.css";

function Bouton({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/")) return <Link className="bouton bouton--plein" href={href}>{children}</Link>;
  return <a className="bouton bouton--plein" href={href} target="_blank" rel="noopener noreferrer nofollow">{children}</a>;
}

export function Bloc({ b, locale }: { b: Block; locale: Locale }) {
  const t = ui[locale].article;
  switch (b.type) {
    case "p":
      return <p>{enLigne(b.text)}</p>;
    case "h2":
      return <h2 id={b.id}>{b.text}</h2>;
    case "h3":
      return b.id ? <h3 id={b.id}>{b.text}</h3> : <h3>{b.text}</h3>;
    case "ul":
      return <ul>{b.items.map((x, i) => <li key={i}>{enLigne(x)}</li>)}</ul>;
    case "ol":
      return <ol>{b.items.map((x, i) => <li key={i}>{enLigne(x)}</li>)}</ol>;
    case "table":
      return (
        <div className="tableau">
          <table>
            {b.caption && <caption>{b.caption}</caption>}
            <thead><tr>{b.headers.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} data-label={b.headers[j]}>{enLigne(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const alerte = (b.title && /^Ne /.test(b.title)) || (b.variant === "attention" && !b.title);
      const classe = b.items ? "encadre encadre--liste" : alerte ? "encadre encadre--alerte" : "encadre";
      return (
        <aside className={classe}>
          <p className="encadre__titre">{b.title || t.callouts[b.variant]}</p>
          {b.text && <p>{enLigne(b.text)}</p>}
          {b.items && <ul>{b.items.map((x, i) => <li key={i}>{enLigne(x)}</li>)}</ul>}
        </aside>
      );
    }
    case "cta":
      return (
        <aside className="encadre encadre--appel">
          <p className="encadre__titre">{b.title}</p>
          <p>{enLigne(b.text)}</p>
          <div><Bouton href={b.href}>{b.button}</Bouton></div>
        </aside>
      );
    case "screenshot":
      return (
        <figure>
          {b.src ? (
            <img decoding="async" src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" />
          ) : (
            <div aria-label={b.alt}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14.5 4h-5L7.5 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5l-2-3z"></path>
                <circle cx="12" cy="13" r="3.5"></circle>
              </svg>
              {locale === "en" ? "Screenshot coming soon" : "Capture d’écran à venir"}
            </div>
          )}
          <figcaption>{b.caption}</figcaption>
        </figure>
      );
    case "quote":
      return (
        <blockquote>
          <p>{b.text}</p>
          {b.author && <footer>{b.author}</footer>}
        </blockquote>
      );
    case "code":
      return <pre><code>{b.code}</code></pre>;
    default:
      return null;
  }
}

// Assistants de la barre « Résumer avec l'IA » : mêmes adresses et mêmes rel que AiSummaryBar
// (ChatGPT exige noreferrer, sinon il refuse de soumettre l'invite).
const ASSISTANTS = [
  { nom: "Claude", href: (q: string) => `https://claude.ai/new?q=${q}`, rel: "noopener nofollow" },
  { nom: "ChatGPT", href: (q: string) => `https://chatgpt.com/?q=${q}`, rel: "noopener noreferrer nofollow" },
  { nom: "Perplexity", href: (q: string) => `https://www.perplexity.ai/search?q=${q}`, rel: "noopener nofollow" },
  { nom: "Mistral", href: (q: string) => `https://chat.mistral.ai/chat?q=${q}`, rel: "noopener nofollow" },
];

export type ArticleSuite = { title: string; url: string; categorie: CategorySlug; categoryName: string };

export default function ArticleCharte({
  article,
  categoryName,
  categoryUrl,
  path,
  datePublishedLabel,
  dateModifiedLabel,
  suites,
  auteur,
  locale = "fr",
}: {
  article: Article;
  categoryName: string;
  categoryUrl: string;
  path: string;
  datePublishedLabel: string;
  dateModifiedLabel: string;
  suites: ArticleSuite[];
  auteur: { name: string; role: string; bio: string; href: string };
  locale?: Locale;
}) {
  const t = ui[locale].article;
  const rub = rubrique(article.category);
  const sommaire = article.blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const invite = encodeURIComponent(t.aiBar.prompt(`${SITE}${path}`));
  // Titre de « L'essentiel » : celui de la maquette en français (apostrophe courbe), celui du
  // dictionnaire en anglais
  const essentiel = locale === "en" ? t.tldrTitle(article.tldr.length) : `L’essentiel en ${article.tldr.length} points`;

  return (
    <ChartePage chemin={path} classes={"page-annexe page-clair " + rub.classe + " art-couleur"} locale={locale}>
      <article className={"art " + rub.classe}>
        {/* EN-TÊTE · sobre : fil d'Ariane, rubrique, titre, chapeau, auteur et dates */}
        <header className="art-tete" data-theme="clair">
          <div className="enveloppe art-tete__in">
            <nav className="ariane" aria-label={locale === "en" ? t.breadcrumbAria : "Fil d'Ariane"}>
              <Link href={locale === "en" ? "/en/" : "/"}>{t.home}</Link><span aria-hidden="true">›</span>
              <Link href={t.hubHref}>{t.hub}</Link><span aria-hidden="true">›</span>
              <Link href={categoryUrl}>{categoryName}</Link>
            </nav>
            <Link className="art-cat" href={categoryUrl}><svg aria-hidden="true"><use href={rub.picto} /></svg>{categoryName}</Link>
            <h1>{article.title}</h1>
            <p className="art-chapo">{enLigne(article.excerpt)}</p>
            <p className="art-meta">
              <img src="/images/charte/mickael-160.webp" width="36" height="36" alt="" />
              <span className="art-meta__nom">{auteur.name}</span>
              <span>{t.published} {datePublishedLabel}</span>
              {dateModifiedLabel !== datePublishedLabel && <span>{t.updated} {dateModifiedLabel}</span>}
              <span>{article.readingMinutes} {t.readingSuffix}</span>
            </p>
          </div>
        </header>

        {/* CORPS · sommaire collant à gauche, colonne de lecture à droite */}
        <div className="enveloppe art-corps">
          <aside className="art-cote">
            {sommaire.length >= 3 && (
              <nav className="art-sommaire" aria-label={t.tocTitle}>
                <details open>
                  <summary>{t.tocTitle} · {sommaire.length}</summary>
                  <ol>{sommaire.map((h) => <li key={h.id}><a href={"#" + h.id}>{h.text}</a></li>)}</ol>
                </details>
              </nav>
            )}
            <div className="art-ia" aria-label={t.aiBar.groupAria}>
              <p>{t.aiBar.label}</p>
              <div>
                {ASSISTANTS.map((a) => (
                  <a key={a.nom} className="art-ia__lien" href={a.href(invite)} target="_blank" rel={a.rel} aria-label={t.aiBar.chipAria(a.nom)}>{a.nom}</a>
                ))}
              </div>
            </div>
          </aside>
          <div className="lecture">
            <aside className="encadre encadre--essentiel">
              <p className="encadre__titre">{essentiel}</p>
              <ul>{article.tldr.map((x, i) => <li key={i}>{enLigne(x)}</li>)}</ul>
            </aside>
            {article.blocks.map((b, i) => <Bloc key={i} b={b} locale={locale} />)}
            {article.faq.length > 0 && (
              <section className="lecture-faq" id="faq">
                <h2>{t.faqTitle}</h2>
                {article.faq.map((f) => (
                  <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                ))}
              </section>
            )}
            <aside className="art-auteur">
              <img loading="lazy" decoding="async" src="/images/charte/mickael-160.webp" alt={auteur.name} width="64" height="64" className="art-auteur__photo" />
              <div>
                <p>{auteur.name}</p>
                <p>{auteur.role}</p>
                <p>{auteur.bio} <Link href={auteur.href}>{t.authorMore}</Link></p>
              </div>
            </aside>
          </div>
        </div>

        {/* À LIRE ENSUITE */}
        {suites.length > 0 && (
          <section className="section section--serree s-lavande art-suite" data-theme="clair">
            <div className="enveloppe">
              <h2 className="titre-3">{t.relatedTitle}</h2>
              <div className="suites">
                {suites.map((s) => (
                  <Link key={s.url} className={"suite " + rubrique(s.categorie).classe} href={s.url}>
                    <span className="suite__cat">{s.categoryName}</span>
                    <span className="suite__titre">{s.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </ChartePage>
  );
}
