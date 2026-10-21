// Accueil anglais à la nouvelle charte (22/10/2026). La maquette codée du 20/10/2026 est
// française ; l'accueil anglais prend ses sections (héros animé, outil dans l'ordinateur, chiffres,
// pièges, services en rangées, méthode, avis, consultant, questions, guides, appel final) avec les
// textes de l'ancien accueil anglais (HomeContentEn.tsx), qui ne sont pas une traduction : ils
// s'adressent à une entreprise qui performe en anglais et dont le marché français reste plat.
// Sections françaises sans équivalent anglais, non reprises : villes desservies, « pour qui »
// (métiers locaux), « où je travaille ». Avis : notre traduction, puis l'original français.
// FAQ visible et JSON-LD FAQPage de la même source (home-faq.ts). Animations : AccueilScripts.
import type { CSSProperties } from "react";
import Link from "next/link";
import { CALENDLY, ui } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import { homeFaqEn } from "@/content/home-faq";
import { avisGoogle, ficheGoogle } from "@/content/avis-google";
import AccueilScripts from "./AccueilScripts";

const NBSP = String.fromCharCode(160);
const TEL = ui.en.header.phoneHref;
const TEL_TEXTE = ui.en.header.phoneLabel;

const PROBLEMES = [
  { ico: "#i-globe", titre: "Translated, not researched", texte: "Your French pages are your English pages in French. So they target your English keywords, translated. Nobody in France types those. The demand that exists in France never made it into the keyword list." },
  { ico: "#i-alerte", titre: "Your French pages have no French signals", texte: "No French internal linking, no French sources, hreflang half wired, a Google Business profile in English. Google sees a foreign site with a French coat of paint, and ranks it accordingly." },
  { ico: "#i-guillemets", titre: "AI answers in French quote someone else", texte: "Put a French question about your category to ChatGPT or Perplexity, and the sources it cites are, most of the time, your competitors. It can be counted, and it rarely is." },
];

const ETAPES = [
  { titre: "Free 30-minute review", texte: "We look at your French pages, your hreflang, and whether AI answers in French ever cite you. You leave with the findings, whether or not you hire me." },
  { titre: "A plan built on French data", texte: "French keyword research, the gap against who ranks in France today, and a shortlist of pages that can realistically move. Clear scope, clear budget, no retainer you cannot exit." },
  { titre: "Execution and monthly numbers", texte: "The work gets done and measured: positions in France, French organic traffic, and citations in AI answers. If a number did not move, you hear it from me first." },
];

const ENGAGEMENTS = [
  { ico: "#i-bulle", titre: "French is my first language", texte: "Your French keyword research is done by someone who thinks in French. That is the whole job, and it is the part agencies outsource to a translation tool." },
  { ico: "#i-tel", titre: "You talk to the person doing the work", texte: "No account manager relaying your question to a junior. You get me. Less capacity, no layers, and nothing lost in the handover." },
  { ico: "#i-oeil", titre: "Everything is measured, not asserted", texte: "Every number in a report comes from a tool you can check: Search Console, DataForSEO, the AI engines themselves. If something cannot be measured, I say so instead of estimating it quietly." },
  { ico: "#i-libre", titre: "You own all of it", texte: "Your site, your accounts, your content, your data. If you leave, you leave with everything. That should be normal, and it often is not." },
];

export default function AccueilContentEn() {
  return (
    <ChartePage chemin="/en/" scripts="aucun" locale="en">
      {/* 1 · HERO : texte à gauche, animation à droite (un site se construit, puis il remonte dans la recherche française) */}
      <section className="hero v-bas" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe hero__in">
          <div className="hero__texte">
            <p className="hero__surtitre" data-entree="">French SEO &amp; AI search · Paris region, France</p>
            <h1 className="titre-1" data-entree="">Your site ranks in English. In France, it’s <em className="degrade">flat</em>.</h1>
            <p className="hero__intro" data-entree="">That is almost never a translation problem. It is a research problem: your French pages target your English keywords, in French. I do the keyword research in French first, then build the pages that rank on it, and make sure AI answers in French cite you rather than your competitor.</p>
            <div className="hero__actions" data-entree="">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Book a free 30-min review</a>
              <Link className="bouton bouton--trait" href="/en/french-seo/">How French SEO works</Link>
            </div>
            <div className="hero__infos" data-entree="">
              <a className="note-google" href={ficheGoogle.url} target="_blank" rel="noopener"><span className="etoile" aria-hidden="true">★</span> 5.0 on Google · 5 reviews</a>
              <p>Mickaël Leclerc · native French, based near Paris · Mon-Sat 9am-9pm CET · <a href={TEL}>{TEL_TEXTE}</a></p>
              <p>French SEO consultant · near Paris, France · free review, reply within 24h</p>
            </div>
          </div>

          {/* Animation décorative : un site se construit, puis il remonte dans la recherche française */}
          <div className="anim" aria-hidden="true">
            <div className="anim__fond"></div>
            <div className="anim__fenetre">
              <div className="anim__barre"><i></i><i></i><i></i><span className="anim__url"><span className="anim__url-txt">your-site.fr</span></span></div>
              <div className="anim__page">
                <div className="anim__menu"><b></b><span></span><span></span><span></span></div>
                <div className="anim__une">
                  <div className="anim__lignes"><span className="anim__l anim__l--1"></span><span className="anim__l anim__l--2"></span><span className="anim__l anim__l--3"></span><span className="anim__bouton"></span></div>
                  <div className="anim__visuel"></div>
                </div>
                <div className="anim__cartes"><span></span><span></span><span></span></div>
              </div>
            </div>
            <div className="anim__pastille anim__enligne"><svg className="anim__coche"><use href="#i-coche"/></svg>French pages live</div>
            <div className="anim__carte anim__optim">
              <p className="anim__titre">Optimisation</p>
              <ul className="anim__jauges">
                <li><span>Speed</span><i><b style={{ "--j": ".96" } as CSSProperties}></b></i></li>
                <li><span>Hreflang</span><i><b style={{ "--j": "1" } as CSSProperties}></b></i></li>
                <li><span>Tags</span><i><b style={{ "--j": ".9" } as CSSProperties}></b></i></li>
              </ul>
            </div>
            <div className="anim__carte anim__google">
              <p className="anim__titre">Google.fr</p>
              <div className="anim__recherche"><span className="anim__g">G</span><span className="anim__requete">logiciel de facturation</span></div>
              <ul className="anim__resultats">
                <li className="anim__res anim__res--a"><b></b><span></span></li>
                <li className="anim__res anim__res--b"><b></b><span></span></li>
                <li className="anim__res anim__res--vous"><em>1</em><strong>your-site.fr</strong><span>cited by AI</span></li>
              </ul>
            </div>
            <div className="anim__carte anim__courbe">
              <p className="anim__titre">French visits</p>
              <svg viewBox="0 0 200 80" className="anim__graph"><path className="anim__aire" d="M0 72 C30 70 45 64 70 58 S115 40 135 30 S175 10 200 6 L200 80 L0 80Z"/><path className="anim__trait" d="M0 72 C30 70 45 64 70 58 S115 40 135 30 S175 10 200 6"/></svg>
            </div>
            <div className="anim__pastille anim__appel"><svg className="anim__tel"><use href="#i-tel"/></svg>New lead</div>
            <div className="anim__carte anim__score">
              <svg viewBox="0 0 60 60" className="anim__anneau"><circle cx="30" cy="30" r="24"/><circle className="anim__anneau-plein" cx="30" cy="30" r="24"/></svg>
              <p><strong>89</strong><span>/100</span><small>SEO + AI score</small></p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · L'ORDINATEUR pleine largeur : l'outil gratuit dans l'écran */}
      <section className="ordi apres-v" id="tools" data-theme="sombre" aria-labelledby="titre-outil">
        <div className="ordi__scene">
        <header className="enveloppe ordi__entete">
          <p className="surtitre">Free tool</p>
          <h2 className="titre-2" id="titre-outil">A free health check of your site, <em className="degrade">in one minute</em>.</h2>
          <p className="chapeau">One self-service tool, no signup. It measures, it does not estimate: the same one I run on client work.</p>
        </header>
          <div className="ordi__cadre">
            <div className="ordi__photo">
              <img className="ordi__fin" loading="lazy" src="/images/accueil/ouverture-640/f48.webp" srcSet="/images/accueil/ouverture-640/f48.webp 640w, /images/accueil/ouverture-1080/f48.webp 1080w" sizes="100vw" width="1080" height="1080" alt="An open laptop in the dark, its screen lighting the keyboard" />
              <canvas className="ordi__canvas" width="1080" height="1080" aria-hidden="true"></canvas>
              <div className="ordi__halo" aria-hidden="true"></div>
            </div>
            <div className="ordi__ecran">
              <div className="ecran-ui">
                <label className="ecran-ui__titre" htmlFor="adresse-site">Where does your site stand in France? One minute, no signup.</label>
                <form className="audit" action="/en/seo-audit/" method="get">
                  <input id="adresse-site" name="site" type="text" inputMode="url" autoComplete="url" placeholder="your-site.com" />
                  <button className="bouton bouton--plein" type="submit">Test my site</button>
                </form>
                <div className="ecran-ui__liens">
                  <a className="bouton bouton--verre" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Book a free 30-min review</a>
                  <Link className="lien" href="/en/tools/">All the free tools</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ordi__suite enveloppe">
          <article className="carte-verre">
            <p className="petit">Free tool · one minute</p>
            <h3 className="titre-3">Free SEO &amp; AI audit</h3>
            <p>Enter your address: 20 real checks on the site you actually serve (HTTPS, real 404, SERP tags, AI crawlers, llms.txt, structured data), a score out of 100 and your priorities. No signup.</p>
            <Link className="bouton bouton--plein" href="/en/seo-audit/">Test my site</Link>
          </article>
          <article className="carte-verre scan" aria-label="A real scan result: mkz-consulting.fr, 89/100, technical 35/35, AI readability 35/35, authority and Google rankings 19/30">
            <p className="petit">A real scan result</p>
            <p className="scan__site">mkz-consulting.fr</p>
            <p className="scan__score"><span data-compte="89">89</span><span className="scan__sur">/100</span></p>
            <ul className="scan__barres">
              <li><span>Technical</span><span>35/35</span><span className="scan__barre"><span className="scan__rempli" style={{ "--v": "1" } as CSSProperties}></span></span></li>
              <li><span>AI readability</span><span>35/35</span><span className="scan__barre"><span className="scan__rempli" style={{ "--v": "1" } as CSSProperties}></span></span></li>
              <li><span>Authority and Google rankings</span><span>19/30</span><span className="scan__barre"><span className="scan__rempli" style={{ "--v": ".633" } as CSSProperties}></span></span></li>
            </ul>
          </article>
        </div>
      </section>

      {/* 3 · CHIFFRES : sourcés et datés, jamais un résultat client inventé */}
      <section className="section s-blanc chiffres-section" data-theme="clair" aria-label="Key figures">
        <div className="enveloppe">
          <dl className="chiffres">
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="chiffre__anneau" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><circle className="chiffre__anneau-plein" cx="24" cy="24" r="19" style={{ "--p": ".93" } as CSSProperties}/></svg></span>
              <dt>of French people read online reviews before choosing a provider</dt><dd><span data-compte="93">93</span>%</dd>
            </div>
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="ico ico--chaud"><use href="#i-etincelle"/></svg></span>
              <dt>trust an AI answer alone when they decide, against 61% for reviews</dt><dd><span data-compte="9">9</span>%</dd>
            </div>
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="ico ico--chaud"><use href="#i-horloge"/></svg></span>
              <dt>to get a written, fixed quote, line by line</dt><dd><span data-compte="24">24</span>h</dd>
            </div>
            <div className="chiffre">
              <span className="chiffre__ico" aria-hidden="true"><svg className="ico ico--chaud"><use href="#i-chrono"/></svg></span>
              <dt>to measure the site you actually serve, no signup, score out of 100</dt><dd>1 min</dd>
            </div>
          </dl>
          <p className="sources">Sources: Ifop for Guest Suite, January 2026, 1,003 French respondents · this site’s <Link href="/en/seo-audit/">free audit tool</Link>.</p>
          <nav className="sommaire" aria-label="On this page">
            <span>On this page</span>
            <a href="#causes">The causes</a><a href="#tools">Free audit</a><a href="#services">What I do</a><a href="#method">How it runs</a><a href="#reviews">Reviews</a><a href="#questions">Your questions</a>
          </nav>
        </div>
      </section>

      {/* 4 · LES CAUSES : version compacte */}
      <section className="section section--serree s-nuit" id="causes" data-theme="sombre">
        <div className="halo-sombre halo-sombre--pieges" aria-hidden="true"></div>
        <svg className="filigrane" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron"/></svg>
        <div className="enveloppe pieges">
          <header className="pieges__entete">
            <p className="surtitre">The usual causes</p>
            <h2 className="titre-2">Three reasons foreign sites <em className="teinte">stay invisible in France</em>.</h2>
            <p className="chapeau">Not one of them is about how good your product is. They are all about what Google and the AI engines can see in French.</p>
          </header>
          <ul className="pieges__liste">
            {PROBLEMES.map((p) => (
              <li key={p.titre} className="piege"><svg className="ico" aria-hidden="true"><use href={p.ico}/></svg><div><h3 className="titre-3">{p.titre}</h3><p>{p.texte}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · SERVICES : rangées pleine largeur en quinconce (image / texte sur fond de couleur) */}
      <section className="metiers" id="services" data-theme="clair">
        <header className="entete enveloppe">
          <p className="surtitre">What I do</p>
          <h2 className="titre-2">Three jobs, one goal: <em className="degrade">France stops being your dead market</em>.</h2>
          <p className="chapeau">Search is splitting in two. One half still returns ten links, and French SEO decides whether you are in them. The other half returns an answer with three or four sources, and AI search optimisation decides whether you are one of them.</p>
        </header>

        <div className="metiers__rangees">
          <article className="metier metier--nuit" data-theme="sombre">
            <div className="metier__image"><img src="/images/charte/photos/telephone-affiche-recherche-google-devant-logo-1200x920.webp" width="1200" height="920" loading="lazy" alt="A phone showing a Google search in front of the Google logo" /></div>
            <div className="metier__corps">
              <p className="petit">Service 01</p>
              <h3 className="metier__titre">French <em className="degrade">SEO</em></h3>
              <p>Keyword research done in French before a word is written, then the content, structure and technical work to rank on what French users actually type. Not a translation pass on your English strategy.</p>
              <p className="puces">French keyword research · hreflang &amp; site structure · French content · technical SEO · local signals · monthly reporting</p>
              <Link className="bouton bouton--plein" href="/en/french-seo/">See how French SEO works</Link>
            </div>
          </article>

          <article className="metier metier--clair metier--inverse">
            <div className="metier__image"><img src="/images/charte/photos/telephone-affiche-assistant-intelligence-artificielle-pret-1200x920.webp" width="1200" height="920" loading="lazy" alt="A phone showing an AI assistant ready to answer" /></div>
            <div className="metier__corps">
              <p className="petit">Service 02</p>
              <h3 className="metier__titre"><em className="teinte">AI search</em> optimisation</h3>
              <p>Getting cited inside AI answers, in French and in English: crawler access, facts a model can quote, clean structured data, llms.txt. Then measured, because share of voice in AI answers can be counted.</p>
              <p className="puces">GEO / AEO · crawler access · llms.txt · schema.org · citable content · measured share of voice</p>
              <Link className="bouton bouton--plein" href="/en/ai-search-optimization/">See how AI search works</Link>
            </div>
          </article>

          <article className="metier metier--violet" data-theme="sombre">
            <div className="metier__image"><img src="/images/charte/photos/bureau-graphiste-site-internet-affiche-ecran-1200x920.webp" width="1200" height="920" loading="lazy" alt="A designer's desk, a website shown on the screen and on the laptop" /></div>
            <div className="metier__corps">
              <p className="petit">Service 03</p>
              <h3 className="metier__titre">Websites <em className="degrade-chaud">built for France</em></h3>
              <p>A site structured for French search from day one: French-first pages, hreflang done right, fast, and readable by AI answer engines. Built to rank on Google.fr, not just to look good.</p>
              <p className="puces">French-first structure · hreflang · speed · llms.txt &amp; schema.org · you own everything</p>
              <Link className="bouton bouton--plein" href="/en/website-design/">See how we build for France</Link>
            </div>
          </article>
        </div>

        <div className="enveloppe metiers__pied">
          <div className="exergue">
            <svg className="exergue__chevron" viewBox="906 237.8 119.3 146" aria-hidden="true"><use href="#chevron" fill="url(#g-exergue)"/></svg>
            <p className="exergue__texte"><strong>Both run on the same foundation:</strong> content that is genuinely French and facts a machine can quote. That is why I sell them separately and usually do them together.</p>
            <Link className="bouton bouton--trait" href="/en/seo-audit/">Free SEO &amp; AI audit</Link>
          </div>
          <p className="note-centre">The methods are written up in the open, in <Link className="lien" href="/en/insights/">insights</Link>. Take them and do it yourself if you prefer. Want to know where you stand first? The <Link className="lien" href="/en/seo-audit/">free SEO &amp; AI audit</Link> runs 20 real checks on your site and scores it out of 100. One minute, no signup.</p>
        </div>
      </section>

      {/* 6 · MÉTHODE (noir) */}
      <section className="section s-noir" id="method" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <p className="surtitre">How it runs</p>
            <h2 className="titre-2">Three steps, <em className="degrade">and you can stop after the first</em>.</h2>
            <p className="chapeau">The first one is free and you keep the findings. That is deliberate: you should be able to judge the work before paying for it.</p>
          </header>
          <ol className="etapes">
            {ETAPES.map((e, k) => (
              <li key={e.titre} className="etape"><span className="etape__num" aria-hidden="true">{String(k + 1).padStart(2, "0")}</span><h3 className="titre-3">{e.titre}</h3><p>{e.texte}</p></li>
            ))}
          </ol>
          <p className="centre"><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Book a free 30-min review</a></p>
        </div>
      </section>

      {/* 7 · AVIS : défilement doux ; notre traduction, puis l'original */}
      <section className="section avis-section" id="reviews" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <p className="avis__etoiles" aria-hidden="true">★★★★★</p>
            <p className="surtitre">Google reviews</p>
            <h2 className="titre-2"><em className="degrade-chaud">5.0 out of 5:</em> the five reviews, as written.</h2>
            <p className="chapeau">Read on MKZ’s Google listing on 14 September 2026. Reviews are in French; the English is my translation, the original follows each one. <span className="insecable"><a className="lien" href={ficheGoogle.url} target="_blank" rel="noopener">Read them on Google</a>.</span></p>
          </header>
        </div>
        <div className="avis" tabIndex={0} aria-label="Google reviews, horizontal scroll">
          <div className="avis__piste">
            {avisGoogle.map((a) => (
              <figure className="avis__carte" key={a.auteur}>
                <blockquote>{"“" + a.traductionEn + "”"}</blockquote>
                <p className="avis__original" lang="fr">{"Original: «" + NBSP + a.texte + NBSP + "»"}</p>
                <figcaption><span className="avis__initiale" aria-hidden="true">{a.auteur.charAt(0).toUpperCase()}</span><span><strong>{a.auteur}</strong> · Google review, {a.month} <span className="etoiles" aria-label="5 stars out of 5">★★★★★</span></span></figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="enveloppe">
          <p className="centre"><a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Talk about your French market, 30 min free</a></p>
        </div>
      </section>

      {/* 8 · CONSULTANT (blanc) : photo, puis un panneau à 4 colonnes */}
      <section className="section s-blanc" id="why-me" data-theme="clair">
        <div className="enveloppe">
          <div className="consultant">
            <figure className="consultant__photo">
              <img src="/images/accueil/mickael.webp" width="960" height="960" loading="lazy" alt="Mickaël Leclerc, founder of MKZ" />
              <figcaption>Mickaël Leclerc, founder.<br />The person you actually talk to.</figcaption>
            </figure>
            <header className="consultant__texte">
              <p className="surtitre">Why me</p>
              <h2 className="titre-2">A French consultant, <em className="degrade">not a French-speaking department</em>.</h2>
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Book a free 30-min review</a>
            </header>
          </div>
          <ul className="engagements">
            {ENGAGEMENTS.map((e) => (
              <li key={e.titre} className="engagement"><div className="engagement__tete"><svg className="ico" aria-hidden="true"><use href={e.ico}/></svg><h3 className="titre-3">{e.titre}</h3></div><p>{e.texte}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 · QUESTIONS : dégradé violet-rose */}
      <section className="section section--serree faq-section" id="questions" data-theme="sombre">
        <div className="enveloppe">
          <header className="entete">
            <p className="surtitre">Your questions</p>
            <h2 className="titre-2">What people ask <em className="degrade-rose">before they book</em>.</h2>
            <p className="chapeau">Straight answers, including the ones that do not help me sell.</p>
          </header>
          <div className="faq">
            {homeFaqEn.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
          <p className="centre"><Link className="bouton bouton--plein" href="/en/seo-audit/">Test my site in one minute</Link></p>
        </div>
      </section>

      {/* 10 · ON PARTAGE : les guides, en colonnes pleine largeur */}
      <section className="partage" data-theme="clair">
        <header className="entete enveloppe partage__entete">
          <p className="surtitre">In the open</p>
          <h2 className="titre-2">The methods, <em className="degrade">published</em>.</h2>
          <p className="chapeau">What actually moves French rankings and AI citations, with the numbers behind each claim and the date they were measured.</p>
        </header>
        <div className="partage__colonnes">
          <Link className="partage__col partage__col--roi" href="/en/insights/french-seo/" data-theme="sombre">
            <span className="partage__image"><img src="/images/accueil/google.webp" width="800" height="1000" loading="lazy" alt="A Google search open on a laptop, next to a coffee" /></span>
            <span className="partage__corps"><span className="petit">French SEO</span><span className="titre-3">Why translation never ranks</span><span className="partage__texte">What French keyword research turns up that a translated page misses, with real query examples.</span><span className="partage__lien">Read the guides</span></span>
          </Link>
          <Link className="partage__col partage__col--clair" href="/en/insights/ai-search/">
            <span className="partage__image"><img src="/images/accueil/ecran.webp" width="800" height="1000" loading="lazy" alt="A half-open laptop, its screen glowing blue and violet" /></span>
            <span className="partage__corps"><span className="petit">AI search</span><span className="titre-3">Getting cited by AI answers</span><span className="partage__texte">The concrete steps that put you inside a ChatGPT or Perplexity answer, and how to measure whether they worked.</span><span className="partage__lien">Read the guides</span></span>
          </Link>
          <Link className="partage__col partage__col--violet" href="/en/insights/" data-theme="sombre">
            <span className="partage__image"><img src="/images/charte/barre-recherche.webp" width="1600" height="800" loading="lazy" alt="A finger touching a glowing search bar, in front of a bright desk" /></span>
            <span className="partage__corps"><span className="petit">All insights</span><span className="titre-3">How French search actually works</span><span className="partage__texte">{ui.en.newsroom.sub}</span><span className="partage__lien">Read the guides</span></span>
          </Link>
        </div>
      </section>

      {/* 11 · APPEL FINAL (compact) */}
      <section className="appel" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe appel__in">
          <div className="appel__texte">
            <h2 className="titre-2">Where your site <em className="degrade">really</em> stands in France, in thirty minutes.</h2>
            <p className="chapeau">Thirty minutes. I look at your French pages, your hreflang, and whether AI answers in French ever mention you. You get the findings and a plan, free, no strings, and you keep them either way.</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">Book my slot</a>
              <Link className="bouton bouton--trait" href="/en/contact/">Send me a message</Link>
            </div>
            <p className="appel__direct"><img className="appel__avatar" src="/images/accueil/mickael.webp" width="40" height="40" alt="" loading="lazy" /><span>Or directly: <a href={TEL}>{TEL_TEXTE}</a> · reply within 24h</span></p>
            <p className="appel__note"><strong>Not ready to talk?</strong> Run the <Link className="lien" href="/en/seo-audit/">free SEO &amp; AI audit</Link> first: 20 checks, one minute, no signup.</p>
          </div>
        </div>
      </section>
      <AccueilScripts />
    </ChartePage>
  );
}
