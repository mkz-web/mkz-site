import type { PillarPage } from "@/lib/articles/types";

// Page pilier anglaise n°3 : création de site. VOLONTAIREMENT secondaire.
//
// Mesures DataForSEO du 30/07/2026 (France, requêtes en anglais) :
//   web designer france ................... 10/mois
//   website design france ................. 10/mois
//   english speaking web designer france .. aucune donnée
//   wordpress developer paris ............. aucune donnée
//   web design paris ...................... 90/mois (intention ambiguë : les
//                                           francophones tapent aussi ces mots)
//
// Conclusion : il n'y a PAS de marché anglophone à capter sur la création de
// site en France. Cette page n'est donc pas une page SEO, c'est une page de
// conversion : elle existe pour les visiteurs déjà sur le site qui ont besoin
// d'un site en plus du SEO, et pour porter l'alternance hreflang de
// /creation-site-internet/. Ne pas investir en contenu ici tant que les mesures
// ne bougent pas ; l'effort va sur /en/french-seo/ et /en/ai-search-optimization/.

const pillar: PillarPage = {
  slug: "website-design",
  title: "Websites built to rank in France, not just to look good",
  metaTitle: "Website design for the French market",
  metaDescription:
    "Need the site as well as the SEO? Fast, French-ready websites built on real French keyword research, with hreflang and AI search readiness in from day one.",
  heroBadge: "Website design",
  heroLead:
    "Most of my work is making existing sites rank in France. Sometimes the existing site is the problem. When that happens I build the new one, on the same principle: **the keyword research comes before the design**, not after it.",
  keywords: [
    "website design france",
    "web designer france",
    "french website development",
    "multilingual website france",
    "hreflang setup",
  ],
  blocks: [
    {
      type: "callout",
      variant: "retenir",
      title: "The short version",
      items: [
        "This is a conversion page, not a sales pitch: there is almost no English-language search demand for web design in France (10 searches a month, measured 30 July 2026), and pretending otherwise would be dishonest.",
        "It exists because clients who came for French SEO sometimes need the site rebuilt too.",
        "Static, fast, no page builder, no plugin debt. French structure and hreflang designed in from the start, not retrofitted.",
        "You own the code, the accounts and the content. Always.",
      ],
    },
    {
      type: "h2",
      id: "when",
      text: "When a rebuild is the right call",
    },
    {
      type: "p",
      text: "Rarely, and I will say so. Rebuilding is the expensive answer, and most sites underperforming in France do not need one: they need French keyword research and content built on it. If that is your situation, [French SEO](/en/french-seo/) is the page you want.",
    },
    {
      type: "p",
      text: "A rebuild earns its cost in a few specific cases:",
    },
    {
      type: "ul",
      items: [
        "The site cannot host a proper French section without a fight, so every French page becomes a workaround.",
        "Core Web Vitals fail structurally, usually a page builder plus fifteen plugins, and fixing it costs more than replacing it.",
        "The stack blocks structured data or hreflang, which means both French SEO and AI citation are capped no matter how good the content is.",
        "You do not control your own site: no code access, no accounts, an agency holding the keys.",
      ],
    },
    {
      type: "h2",
      id: "how",
      text: "How I build",
    },
    {
      type: "p",
      text: "Static export, served from a CDN. No database to breach, no plugin to patch on a Friday night, and load times that pass Core Web Vitals because there is almost nothing to load. This site is built exactly that way: open your browser dev tools and check it rather than taking my word for it.",
    },
    {
      type: "p",
      text: "Bilingual from the first commit when the French market matters: two locales, hreflang wired both ways with a correct x-default, one structure per language rather than one translated on top of the other. Retrofitting that later is where the real cost sits.",
    },
    {
      type: "p",
      text: "AI search readiness is part of the build, not an upsell: valid schema.org reparsed by a script at build time, generated llms.txt, and AI crawlers explicitly allowed. Details on the [AI search page](/en/ai-search-optimization/).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "What you own at the end",
      text: "The code, the repository, the hosting account, the domain, the analytics, the content. If you decide to leave, you leave with all of it and nothing breaks. That should be unremarkable. Ask your current provider what happens to your site if you stop paying them, and see whether the answer is as short.",
    },
    {
      type: "cta",
      title: "Not sure whether you need a rebuild or just better French pages?",
      text: "Thirty minutes, free. I look at what you have and tell you honestly which one it is. Saying you do not need a rebuild is a perfectly normal outcome of that call.",
      button: "Book a free 30-min review",
      href: "https://calendly.com/mkz-consulting/30min",
    },
  ],
  faq: [
    {
      q: "Do you build in WordPress?",
      a: "Only when there is a real reason to, such as a team that already runs WordPress and needs to keep editing in it. By default I build static sites exported to a CDN: faster, nothing to patch, no plugin debt, and no database to compromise. If you need a CMS, we choose it based on who edits the site and how often, not on habit.",
    },
    {
      q: "Can you rebuild only the French section of my site?",
      a: "Often yes, and it is frequently the cheaper answer. If your English site performs well, replacing it makes no sense. Adding a properly structured French section on the same domain keeps the authority you have already built and limits the work to the part that is actually broken.",
    },
    {
      q: "Do you work in English throughout the project?",
      a: "Yes. All communication, documentation and handover in English; the French content itself written in French, because that is the point. You never have to review something you cannot read without knowing what it says: every French page comes with an English summary of what it targets and why.",
    },
    {
      q: "How long does a website project take?",
      a: "A focused bilingual site is usually four to eight weeks, most of which is content and French keyword research rather than design or code. The variable is how quickly decisions and source material come back from your side, so the timeline is agreed up front with the dependencies named.",
    },
  ],
};

export default pillar;
