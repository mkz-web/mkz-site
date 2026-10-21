// Page de rubrique /conseils/<rubrique>/ à la nouvelle charte (maquette codée du
// 20/10/2026) : même mise en page que la section de la rubrique sur le hub (en-tête à picto,
// introduction, cartes d'articles), relais vers la page de service, puis les autres rubriques.
// Titre, introduction et relais lus dans src/lib/articles/categories.ts.
import Link from "next/link";
import { ui, type Locale } from "@/lib/i18n";
import ChartePage from "../ChartePage";
import { CarteArticle, classeGrille, enLigne, rubrique, type CarteArticleDonnees } from "../contenu";
import "../metier.css";
import "../pages.css";

// Libellés fixes de la maquette ; en anglais (rubriques de /en/insights/, 22/10/2026), leur pendant
const L = {
  fr: { accueil: "/", maison: "Accueil", hub: "/conseils/", hubNom: "Conseils", ariane: "Fil d'Ariane", tous: "Tous les conseils", autresAvant: "Les autres ", autresEm: "rubriques" },
  en: { accueil: "/en/", maison: "Home", hub: "/en/insights/", hubNom: "Insights", ariane: "Breadcrumb", tous: "All insights", autresAvant: "Other ", autresEm: "topics" },
};

export type AutreRubrique = { slug: string; name: string; url: string; count: number };

export default function RubriqueCharte({
  slug,
  name,
  title,
  intro,
  pillar,
  articles,
  autres,
  url,
  locale = "fr",
}: {
  slug: string;
  name: string;
  title: string;
  intro: string[];
  pillar: { href: string; label: string };
  articles: CarteArticleDonnees[];
  autres: AutreRubrique[];
  url: string;
  locale?: Locale;
}) {
  const t = ui[locale].newsroom;
  const l = L[locale];
  const rub = rubrique(slug);
  // « SEO : être trouvé sur Google… » : la partie avant les deux-points porte le dégradé
  // (en anglais « French SEO: making… », sans espace avant les deux-points)
  const i = title.indexOf(" : ") > 0 ? title.indexOf(" : ") : title.indexOf(": ");
  const tete = i > 0 ? title.slice(0, i) : title;
  const suite = i > 0 ? title.slice(i) : "";
  return (
    <ChartePage chemin={url} classes={"page-annexe page-clair " + rub.classe} locale={locale}>
      {/* RUBRIQUE · même mise en page que sa section sur la page Conseils : en-tête à picto, introduction, cartes d'articles */}
      <section className={"section rub-page " + rub.fond + " " + rub.classe} data-theme={rub.theme}>
        <div className="enveloppe">
          <nav className="ariane" aria-label={l.ariane} data-entree="">
            <Link href={l.accueil}>{l.maison}</Link><span aria-hidden="true">/</span>
            <Link href={l.hub}>{l.hubNom}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{name}</span>
          </nav>
          <header className="rubrique-tete" data-entree="">
            <div className="rubrique-tete__titre">
              <span className="rubrique-tete__ico" aria-hidden="true"><svg><use href={rub.picto} /></svg></span>
              <div>
                <h1 className="titre-2"><em className={rub.degrade}>{tete}</em>{suite}</h1>
                <span className="rubrique-tete__compte">{t.articleCount(articles.length)}</span>
              </div>
            </div>
            <Link className="bouton bouton--trait" href={l.hub}>{l.tous}</Link>
          </header>
          <div className="rub-intro" data-entree="">
            {intro.map((p, k) => <p key={k}>{enLigne(p)}</p>)}
          </div>
          <div className={classeGrille(articles.length)} data-revele-groupe="">
            {articles.map((a) => <CarteArticle key={a.url} a={a} />)}
          </div>
          <div className="rub-page__relais" data-revele="">
            <p>{t.pillarPrompt}</p>
            <Link className="bouton bouton--plein" href={pillar.href}>{pillar.label}</Link>
          </div>
        </div>
      </section>

      {/* LES AUTRES RUBRIQUES */}
      <section className={"section section--serree " + (rub.fond === "s-lavande" ? "s-blanc" : "s-lavande")} data-theme="clair">
        <div className="enveloppe">
          <header className="titre-section" data-revele=""><h2 className="titre-2">{l.autresAvant}<em className="degrade">{l.autresEm}</em></h2></header>
          <div className="autres" data-revele-groupe="">
            {autres.map((o) => {
              const r = rubrique(o.slug);
              return (
                <Link key={o.slug} className={"autre " + r.classe} href={o.url}>
                  <span className="autre__ico" aria-hidden="true"><svg><use href={r.picto} /></svg></span>
                  <span><b>{o.name}</b><small>{t.articleCount(o.count)}</small></span>
                  <span className="autre__fleche" aria-hidden="true">›</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
