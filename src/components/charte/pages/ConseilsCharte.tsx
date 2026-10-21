// Hub /conseils/ à la nouvelle charte (maquette codée du 20/10/2026) : une de
// magazine (titre, sommaire des rubriques, éventail des trois derniers articles), cartes photo des
// rubriques, une section par rubrique avec ses articles du plus récent au plus ancien, appel final.
// Tout est lu dans les données : un article publié par la veille entre dans sa rubrique et dans
// l'éventail sans retouche.
import Link from "next/link";
import { CALENDLY, ui } from "@/lib/i18n";
import ChartePage from "../ChartePage";
import { CarteArticle, classeGrille, pictoArticle, rubrique, type CarteArticleDonnees } from "../contenu";
import "../metier.css";
import "../pages.css";

const t = ui.fr.newsroom;

export type RubriqueHub = { slug: string; name: string; description: string; url: string; articles: CarteArticleDonnees[] };

export default function ConseilsCharte({ rubriques, derniers }: { rubriques: RubriqueHub[]; derniers: CarteArticleDonnees[] }) {
  // Éventail : la carte du dessus (la dernière dans le document) est l'article le plus récent
  const eventail = derniers.length >= 3 ? [derniers[1], derniers[2], derniers[0]] : derniers;
  return (
    <ChartePage chemin="/conseils/" classes="page-annexe page-clair">
      {/* BANDEAU · une de magazine : titre éditorial à gauche, éventail des trois derniers articles à droite */}
      <section className="une" data-theme="clair">
        <div className="enveloppe une__in">
          <div>
            <p className="une__sur" data-entree="">{t.kicker}</p>
            <h1 data-entree="">{t.titleBefore}<em className="degrade">{t.titleEm + t.titleAfter}</em></h1>
            <p className="une__intro" data-entree="">{t.sub}</p>
            <nav className="une__sommaire" aria-labelledby="sommaire" data-entree="">
              <p className="petit" id="sommaire">Sommaire</p>
              <ul>
                {rubriques.map((r) => (
                  <li key={r.slug} className={rubrique(r.slug).classe}><a href={"#rubrique-" + r.slug}>{r.name}</a></li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="eventail" aria-hidden="true" data-entree="">
            {eventail.map((a) => (
              <div key={a.url} className={"eventail__carte " + rubrique(a.categorie).classe}>
                <div className="eventail__couv"><svg><use href={pictoArticle(a.slug, a.categorie)} /></svg></div>
                <p className="eventail__tag">{a.categoryName}</p>
                <p className="eventail__titre">{a.title}</p>
                <p className="eventail__date">{a.dateLabel} · {a.readingMinutes} min de lecture</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RUBRIQUES · quatre cartes photo (sombre) */}
      <section className="section s-nuit-profonde" data-theme="sombre">
        <div className="enveloppe">
          <header className="titre-section" data-revele="">
            <h2 className="titre-2">Explorez <em className="degrade">par thématique</em></h2>
          </header>
          <div className="rubriques" data-revele-groupe="">
            {rubriques.map((r) => {
              const rub = rubrique(r.slug);
              return (
                <Link key={r.slug} className={"rubrique " + rub.classe} href={r.url}>
                  <span className="rubrique__image">
                    <img src={rub.image.src} width={rub.image.width} height={rub.image.height} loading="lazy" alt={rub.image.alt} />
                    <span className="rubrique__compte">{t.articleCount(r.articles.length)}</span>
                  </span>
                  <span className="rubrique__corps">
                    <span className="rubrique__titre">{r.name}</span>
                    <span className="rubrique__texte">{r.description}</span>
                    <span className="rubrique__lien">{t.explore}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* UNE SECTION PAR RUBRIQUE */}
      {rubriques.map((r) => {
        const rub = rubrique(r.slug);
        return (
          <section key={r.slug} className={"section " + rub.fond + " " + rub.classe} id={"rubrique-" + r.slug} data-theme={rub.theme}>
            <div className="enveloppe">
              <header className="rubrique-tete" data-revele="">
                <div className="rubrique-tete__titre">
                  <span className="rubrique-tete__ico" aria-hidden="true"><svg><use href={rub.picto} /></svg></span>
                  <div>
                    <h2 className="titre-2"><Link href={r.url}><em className={rub.degrade}>{r.name}</em></Link></h2>
                    <span className="rubrique-tete__compte">{t.articleCount(r.articles.length)}</span>
                  </div>
                </div>
                <Link className="bouton bouton--trait" href={r.url}>Voir la rubrique</Link>
              </header>
              <div className={classeGrille(r.articles.length)} data-revele-groupe="">
                {r.articles.map((a) => <CarteArticle key={a.url} a={a} />)}
              </div>
            </div>
          </section>
        );
      })}

      {/* APPEL */}
      <section className="coup-main" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe coup-main__in">
          <div data-revele="">
            <h2 className="titre-2">{t.ctaTitleBefore}<em className="degrade">{t.ctaTitleEm}</em>{t.ctaTitleAfter}</h2>
            <p className="chapeau">{t.ctaText}</p>
            <p className="ligne-appel"><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{t.ctaButton}</a></p>
          </div>
          <div className="coup-main__outils" data-revele="">
            <span className="coup-main__icos" aria-hidden="true"><i><svg><use href="#i-loupe" /></svg></i><i><svg><use href="#i-etincelle" /></svg></i></span>
            <p>{t.tools.before} <Link className="lien" href={t.tools.href}>{t.tools.label}</Link>.</p>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
