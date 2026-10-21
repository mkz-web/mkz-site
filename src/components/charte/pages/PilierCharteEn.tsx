// Piliers anglais à la nouvelle charte (22/10/2026) : /en/french-seo/, /en/ai-search-optimization/,
// /en/website-design/. La maquette codée du 20/10/2026 est française ; ses piliers sont des pages
// sur mesure. Les piliers anglais visent un autre client (entreprises étrangères qui vendent en
// France) avec d'autres textes : ils prennent un gabarit rendu DEPUIS LES DONNÉES
// (src/content/en/pillars/*.ts), fait des composants de la charte : héros des pages métier avec
// une photo de la maquette, corps en colonne de lecture avec sommaire (gabarit des articles),
// FAQ, appel final. Rappels d'action à la cadence de l'ancien gabarit (PillarContent) : avant un
// titre qui suit ~3 000 caractères sans action, 8 au plus, plus un rappel avant la FAQ.
import Link from "next/link";
import type { Block, PillarPage } from "@/lib/articles/types";
import { CALENDLY, ui } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import { Bloc } from "@/components/charte/ArticleCharte";
import { enLigne } from "@/components/charte/contenu";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

export type PhotoPilier = { src: string; srcPetit: string; largeurPetit: number; width: number; height: number; alt: string };

function Rappel({ texte }: { texte: string }) {
  const p = ui.en.pillar;
  return (
    <aside className="encadre encadre--appel">
      <p>{texte}</p>
      <div><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{p.ctaPrimary}</a></div>
    </aside>
  );
}

export default function PilierCharteEn({
  chemin,
  pillar,
  rubrique,
  picto,
  photo,
  finalCta,
}: {
  chemin: string;
  pillar: PillarPage;
  // Couleur de la rubrique (r-seo, r-ia, r-creation) et picto du surtitre
  rubrique: string;
  picto: string;
  photo: PhotoPilier;
  finalCta: { title: string; text: string; button: string };
}) {
  const p = ui.en.pillar;
  // « French SEO: make France work… » : la partie après les deux-points porte le dégradé
  const i = pillar.title.indexOf(": ");
  const tete = i > 0 ? pillar.title.slice(0, i + 2) : "";
  const fin = i > 0 ? pillar.title.slice(i + 2) : pillar.title;
  const sommaire = pillar.blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");

  // Corps avec ses rappels d'action
  const corps: React.ReactNode[] = [];
  let cumul = 0;
  let rappels = 0;
  pillar.blocks.forEach((b, k) => {
    const titre = b.type === "h2" || b.type === "h3" ? b.text : null;
    if (titre && cumul >= 3000 && rappels < 8 && k > 0) {
      corps.push(<Rappel key={"rappel-" + k} texte={p.midCtaBefore + titre + p.midCtaAfter} />);
      rappels++;
      cumul = 0;
    }
    if (b.type === "cta") cumul = 0;
    else cumul += JSON.stringify(b).length;
    corps.push(<Bloc key={k} b={b} locale="en" />);
  });

  return (
    <ChartePage chemin={chemin} classes={"page-metier page-clair art-couleur " + rubrique} locale="en">
      {/* HERO · gabarit des pages métier, photo de la maquette */}
      <section className="mhero" data-theme="clair">
        <div className="enveloppe mhero__in">
          <div className="mhero__texte">
            <nav className="ariane" aria-label={p.breadcrumbAria} data-entree=""><Link href="/en/">{p.home}</Link><span aria-hidden="true">›</span><span aria-current="page">{pillar.heroBadge}</span></nav>
            <p className="mhero__surtitre" data-entree=""><svg aria-hidden="true"><use href={picto}/></svg>{pillar.heroBadge}</p>
            <h1 className="titre-1" data-entree="">{tete}<em className="degrade">{fin}</em></h1>
            <p className="mhero__intro" data-entree="">{enLigne(pillar.heroLead)}</p>
            <div className="hero__actions" data-entree="">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{p.ctaPrimary}</a>
              <a className="mhero__tel" href={ui.en.header.phoneHref}>{p.phonePrefix} {ui.en.header.phoneLabel}</a>
            </div>
          </div>
          <div className="mvisuel">
            <figure className="mvisuel__photo" data-entree="">
              <img src={photo.src} srcSet={`${photo.srcPetit} ${photo.largeurPetit}w, ${photo.src} ${photo.width}w`} sizes="(max-width: 899px) 82vw, 460px" width={photo.width} height={photo.height} fetchPriority="high" alt={photo.alt} />
            </figure>
          </div>
        </div>
      </section>

      {/* CORPS · sommaire collant à gauche, colonne de lecture à droite (gabarit des articles) */}
      <section className="section s-blanc" data-theme="clair">
        <div className="enveloppe art-corps">
          <aside className="art-cote">
            {sommaire.length >= 3 && (
              <nav className="art-sommaire" aria-label={ui.en.article.tocTitle}>
                <details open>
                  <summary>{ui.en.article.tocTitle} · {sommaire.length}</summary>
                  <ol>{sommaire.map((h) => <li key={h.id}><a href={"#" + h.id}>{h.text}</a></li>)}</ol>
                </details>
              </nav>
            )}
          </aside>
          <div className="lecture">
            {corps}
            <Rappel texte={p.preFaqCtaText} />
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      {pillar.faq.length > 0 && (
        <section className="section section--serree faq-section" id="faq" data-theme="sombre">
          <div className="enveloppe">
            <header className="entete"><h2 className="titre-2">Frequently asked <em className="degrade-rose">questions</em></h2></header>
            <div className="faq">
              {pillar.faq.map((f) => (
                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* APPEL FINAL */}
      <section className="appel" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe appel__in">
          <div className="appel__texte">
            <h2 className="titre-2">{finalCta.title}</h2>
            <p className="chapeau">{finalCta.text}</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{finalCta.button}</a>
            </div>
            <p className="appel__direct"><img className="appel__avatar" src="/images/charte/mickael-160.webp" width="40" height="40" alt="" loading="lazy" /><span>{p.fallbackPrefix} <a href={ui.en.header.phoneHref}>{ui.en.header.phoneLabel}</a>. {p.fallbackSuffix}</span></p>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
