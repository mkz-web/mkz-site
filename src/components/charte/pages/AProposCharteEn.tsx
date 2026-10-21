// Page /en/about/ à la nouvelle charte (22/10/2026) : gabarit de la page à propos de la maquette
// codée du 20/10/2026 (console sombre avec le portrait, colonne de lecture, quatre engagements
// numérotés, appel final), textes de l'ancienne page anglaise (AboutContentEn.tsx), qui n'est pas
// la traduction de la page française : elle établit pour un acheteur étranger que la personne
// qui fera le travail est française et mesure ce qu'elle avance. C'est aussi la page d'entité
// (ProfilePage) que les moteurs de réponse citent.
// Les quatre règles de « How I work » deviennent les quatre engagements numérotés de la maquette.
import Link from "next/link";
import { CALENDLY, ui } from "@/lib/i18n";
import ChartePage from "@/components/charte/ChartePage";
import "@/components/charte/metier.css";
import "@/components/charte/pages.css";

const ENGAGEMENTS = [
  { titre: "You talk to me.", texte: "No account manager relaying your question to someone junior. Less capacity, no layers, nothing lost in a handover." },
  { titre: "Every number is traceable.", texte: "Search Console, DataForSEO, the AI engines themselves. If you want to open the tool and check, you should be able to, and I will tell you where to click." },
  { titre: "You own everything.", texte: "Your site, your accounts, your content, your data. If you leave, you leave with all of it." },
  { titre: "No guaranteed rankings, ever.", texte: "Not on Google, and definitely not inside ChatGPT. Anyone guaranteeing either is selling something they do not control. What I will commit to is telling you early when something is not working." },
];

export default function AProposCharteEn() {
  const p = ui.en.pillar;
  return (
    <ChartePage chemin="/en/about/" classes="page-annexe page-nuit" locale="en">
      {/* BANDEAU · console : titre centré sur la trame lumineuse, photo à cheval sur la section suivante */}
      <section className="console bio-console" data-theme="sombre">
        <div className="enveloppe console__in">
          <nav className="ariane" aria-label="Breadcrumb" data-entree=""><Link href="/en/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">About</span></nav>
          <p className="console__sur" data-entree=""><i aria-hidden="true"></i>About</p>
          <h1 data-entree="">The person who will actually <em className="degrade">do the work.</em></h1>
          <p className="console__intro" data-entree="">If you are hiring someone to make your French market work, there is really only one question worth asking: is this person genuinely French, and do they measure what they claim? Here is my answer to both, with enough detail that you can check it.</p>
          <div className="hero__actions" data-entree="">
            <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{p.ctaPrimary}</a>
            <span className="bio-console__ou">or</span>
            <a className="bouton bouton--trait bouton--tel" href={ui.en.header.phoneHref}><svg aria-hidden="true"><use href="#i-tel"/></svg>{ui.en.header.phoneLabel}</a>
          </div>
        </div>
        <figure className="bio-portrait">
          <img src="/images/charte/mickael-480.webp" width="480" height="480" alt="Mickaël Leclerc, founder of MKZ" />
          <figcaption>Mickaël Leclerc, founder<br />Near Paris, France</figcaption>
        </figure>
      </section>

      {/* LE PARCOURS (clair) : une colonne de lecture */}
      <section className="section s-blanc bio-suite" data-theme="clair">
        <div className="enveloppe">
          <div className="bio-texte lecture" data-revele="">
            <p className="bio-texte__tags">Founder, MKZ · native French speaker · working languages: French and English</p>
            <ul>
              <li>Native French speaker, based near Paris (Seine-et-Marne, France)</li>
              <li>20+ years as an IT engineer: infrastructure, automation, DevOps</li>
              <li>Working languages: French and English</li>
            </ul>
            <h2>Why an infrastructure engineer ended up doing SEO</h2>
            <p className="bio-texte__ouverture">I spent two decades inside large companies building infrastructure, automating systems and keeping complicated things running. Not marketing. That background turns out to matter more than it sounds, for one reason: engineers are trained to distrust a number they cannot reproduce.</p>
            <p>Most of what goes wrong in SEO is not a missing tactic. It is a claim nobody verified. <strong>No schema, therefore you are not cited.</strong> That is a deduction, not a measurement, and it is wrong roughly as often as it is right. The cause is not the effect. If a tool can measure the effect, run the tool and quote the number it returned.</p>
            <p className="bio-texte__promesse"><strong>Measure it, or say you could not.</strong> Never quietly replace a measurement with an estimate.</p>
            <h2>What I do, concretely</h2>
            <ul>
              <li><strong>French SEO.</strong> Keyword research done in French before anything is written, then the content and technical work that follows from it. Details on the <Link href="/en/french-seo/">French SEO page</Link>.</li>
              <li><strong>AI search optimisation.</strong> Getting cited inside AI answers in French and English, then measuring share of voice rather than assuming it. Details on the <Link href="/en/ai-search-optimization/">AI search page</Link>.</li>
              <li><strong>Websites, when the existing one is the blocker.</strong> Static, fast, bilingual from the first commit. See <Link href="/en/website-design/">website design</Link>.</li>
            </ul>
            <h2>Who I usually work with</h2>
            <p>Day to day, most of my clients are French: tradespeople, shops and small companies competing for French searches in French. That is deliberately relevant to you. The French market is not a country entry on my services list, it is the market I work in every day, in my own language.</p>
            <p>The other half of the practice is companies based outside France that already perform in English and need France to stop being flat. Those two groups look different on paper and turn out to need the same thing: French keyword research done properly, and content built on what it finds.</p>
            <h2>The methods are published</h2>
            <p>Everything I do is written up in the open, in <Link href="/en/insights/">insights</Link>, with the figures behind each claim and the date they were measured. Take them and do the work yourself if you prefer. Clients who understand what is happening to their site are better clients, and the ones who would rather hand it over know where to find me.</p>
            <p className="bio-texte__legal">MKZ, SAS à associé unique, share capital €1,000 · SIRET 983 662 784 00013 · RCS Meaux · EU VAT FR44983662784</p>
          </div>
        </div>
      </section>

      {/* HOW I WORK, AND WHAT I WILL NOT DO (sombre) : quatre engagements numérotés */}
      <section className="section s-violet" data-theme="sombre" aria-labelledby="engagements">
        <div className="enveloppe">
          <h2 className="sr-only" id="engagements">How I work, and what I will not do</h2>
          <ul className="bio-points" data-revele-groupe="">
            {ENGAGEMENTS.map((e, k) => (
              <li key={e.titre}><span className="bio-points__num" aria-hidden="true">{String(k + 1).padStart(2, "0")}</span><h3>{e.titre}</h3><p>{e.texte}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* APPEL FINAL */}
      <section className="appel" data-theme="clair">
        <div className="halo-fond" aria-hidden="true"></div>
        <div className="enveloppe appel__in">
          <div className="appel__texte">
            <h2 className="titre-2">Thirty minutes, and you <em className="degrade">keep the findings.</em></h2>
            <p className="chapeau">We look at your French pages, your hreflang, and whether French AI answers ever cite you. Free, no commitment, and the findings are yours whether or not you work with me.</p>
          </div>
          <div className="appel__actions">
            <div className="hero__actions">
              <a className="bouton bouton--plein" href={CALENDLY} target="_blank" rel="noopener noreferrer nofollow">{p.ctaPrimary}</a>
            </div>
            <p className="appel__direct"><img className="appel__avatar" src="/images/charte/mickael-160.webp" width="40" height="40" alt="" loading="lazy" /><span>{p.fallbackPrefix} <a href={ui.en.header.phoneHref}>{ui.en.header.phoneLabel}</a>. {p.fallbackSuffix}</span></p>
          </div>
        </div>
      </section>
    </ChartePage>
  );
}
