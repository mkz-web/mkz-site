import type { Article } from "@/lib/articles/types";

// Cocon french-seo, article n°1 : la démonstration chiffrée que traduire ne
// suffit pas. Sert de preuve à la page pilier /en/french-seo/.
//
// Intentions ciblées (mesurées le 30/07/2026) : french seo (90 US / 170 UK),
// seo in french (30 US), french keyword research, plus la traîne informationnelle
// « translate website into french seo ». Les chiffres du tableau viennent de
// Google Ads via DataForSEO (France, langue française, 30/07/2026) et sont
// reproductibles dans le Keyword Planner par n'importe quel lecteur.

const article: Article = {
  slug: "why-translation-never-ranks-in-france",
  locale: "en",
  category: "french-seo",
  title: "Why translating your site into French never makes it rank",
  metaTitle: "Why translation never ranks in France (with numbers)",
  metaDescription:
    "A translated French page targets your English keywords, in French. Measured proof: two correct translations of one idea, 320 vs 6,600 searches a month in France.",
  datePublished: "2026-07-30",
  dateModified: "2026-07-30",
  readingMinutes: 7,
  excerpt:
    "Your French pages are indexed, error free and fast. They also rank on terms nobody searches. Here is the measured gap between a correct translation and the words French users actually type, and what to do about it.",
  tldr: [
    "Translation is faithful to your **English words**. Search demand is not. Those two things pull in different directions.",
    "Measured 30 July 2026 (Google Ads, France, French): **conception de site web gets 320 searches a month, création site internet gets 6,600**. Same meaning. Twenty times the market.",
    "The failure is invisible from your dashboard: pages indexed, no errors, impressions flat. It looks like a hard market rather than a wrong keyword list.",
    "The fix is order of operations: French keyword research first, content brief second, writing third. Never translate then hope.",
  ],
  keywords: [
    "french seo",
    "seo in french",
    "french keyword research",
    "translate website into french",
    "french seo mistakes",
    "hreflang french",
  ],
  blocks: [
    {
      type: "p",
      text: "Every few months I look at a site that has done everything right in English and cannot understand why France is flat. The French pages exist. They are indexed. Core Web Vitals pass. Search Console shows impressions and a click line that never moves. The conclusion in the room is always the same: France is a difficult market.",
    },
    {
      type: "p",
      text: "France is not a difficult market. The keyword list was wrong before anyone wrote a single page, and nothing downstream can fix that.",
    },
    {
      type: "h2",
      id: "the-mechanism",
      text: "The mechanism, in one sentence",
    },
    {
      type: "p",
      text: "A translator's job is to be accurate. A searcher's behaviour is to be lazy. Translation gives you the **most correct** French term; ranking requires the **most typed** one. When those diverge, and they diverge constantly, translation quietly aims your entire French section at the wrong words.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "This is not a criticism of translators",
      text: "A translator handed *website design* has no way of knowing which French variant carries the search volume, because that is not a language question, it is a data question. Nobody gave them the data. The mistake is in the order of operations, not in the translation.",
    },
    {
      type: "h2",
      id: "the-numbers",
      text: "The numbers, so you do not have to take my word for it",
    },
    {
      type: "p",
      text: "Three pairs, all measured on 30 July 2026 through Google Ads keyword data (country France, language French). In each row, both terms are defensible translations of the English concept. Only one is a market.",
    },
    {
      type: "table",
      caption:
        "Monthly searches in France, French language, measured 30 July 2026 (Google Ads via DataForSEO)",
      headers: ["English concept", "Faithful translation", "Searches", "What French users type", "Searches", "Gap"],
      rows: [
        ["Website design", "conception de site web", "320", "création site internet", "6,600", "20.6x"],
        ["Search engine optimisation", "optimisation pour les moteurs de recherche", "590", "SEO", "27,100", "45.9x"],
        ["SEO agency", "agence de référencement", "2,900", "agence SEO", "22,200", "7.7x"],
      ],
    },
    {
      type: "p",
      text: "Look at the second row for a moment. The full French phrase for search engine optimisation, *optimisation pour les moteurs de recherche*, is what a careful translator produces. It gets 590 searches a month. French people overwhelmingly type the English acronym: **SEO, 27,100**. Being more French than the French market cost you 98% of the demand.",
    },
    {
      type: "p",
      text: "The third row is the subtle one. *Agence de référencement* is real, established, and gets a healthy 2,900 searches. It is not a mistake. It is just the smaller of two live markets, and if you only build for it you left the bigger one to a competitor.",
    },
    {
      type: "h2",
      id: "why-invisible",
      text: "Why nobody catches this for two years",
    },
    {
      type: "p",
      text: "Because every diagnostic you would normally run comes back clean. That is the genuinely dangerous part.",
    },
    {
      type: "ul",
      items: [
        "**Indexation:** fine. The pages are in the index.",
        "**Technical SEO:** fine. Same template as your English pages, which pass.",
        "**Rankings:** fine, and this is the trap. You do rank, often in the top five, on terms with almost no volume.",
        "**Traffic:** flat. Which reads as a demand problem rather than a targeting problem.",
      ],
    },
    {
      type: "callout",
      variant: "attention",
      title: "Ranking well on nothing looks identical to ranking badly",
      text: "In a position report, first place on a 320-search term and first place on a 6,600-search term look the same. Only the traffic column tells them apart, and by then everyone has concluded the country is weak. If your French average position is good and your French clicks are not, this is almost certainly your problem.",
    },
    {
      type: "h2",
      id: "diagnose",
      text: "Diagnose it yourself in ten minutes",
    },
    {
      type: "p",
      text: "You do not need a consultant to find out whether you have this problem. You need Keyword Planner and ten minutes.",
    },
    {
      type: "ol",
      items: [
        "List the five terms your French pages actually target. Take them from your French H1s, not from your strategy deck.",
        "Open Google Ads Keyword Planner. Set the location to **France** and the language to **French**. Both matter: leaving the language on English returns a different and useless picture.",
        "Enter your five terms and note the volumes.",
        "Now enter what you suspect a French person would type instead, including any English loanword. French uses more English tech vocabulary than most languages, and *SEO*, *marketing* and *design* are all normal French usage.",
        "Compare. **If any pair differs by more than about three times, your French section is built on the wrong term.**",
      ],
    },
    {
      type: "p",
      text: "Write today's date next to the numbers. Search volume moves, and a figure without a date stops being useful within a year.",
    },
    {
      type: "h2",
      id: "the-fix",
      text: "The fix is an order of operations, not a tool",
    },
    {
      type: "p",
      text: "There is no plugin for this. The correction is to move one step earlier in the process and never skip it again.",
    },
    {
      type: "ol",
      items: [
        "**Research in French, from your categories.** Start from what you sell, not from your English keyword list. Starting from the English list guarantees you inherit its blind spots.",
        "**Pick on volume plus intent, not on elegance.** If the ugly loanword is what people type, it goes in the H1. Your brand voice can survive it.",
        "**Brief in French.** The writer receives the target term, the volume and the intent, not an English page to convert.",
        "**Write in French.** Not translate into it. French buyers expect different proof and different reassurance, and a translated page reads as translated in about two seconds.",
        "**Then wire hreflang.** Both directions, plus a correct x-default. Reciprocity is what breaks most often: if your French page points at the English one and the English one does not point back, Google discards the pair and picks a version itself.",
      ],
    },
    {
      type: "callout",
      variant: "astuce",
      title: "Fix the money pages first, not everything",
      text: "You almost never need to redo the whole French section. Take your three highest-intent commercial pages, redo the research on those, rewrite them properly, and measure for a quarter. If the pattern holds, you now have an internal case for the rest, built on your own data rather than on my table.",
    },
    {
      type: "h2",
      id: "ai-answers",
      text: "The same mistake, now in AI answers",
    },
    {
      type: "p",
      text: "This is about to matter more, not less. When a model answers a question in French, it picks from French sources. A translated page is a weak candidate: the phrasing is slightly off, so it matches the French question less well, and the page usually states no quotable facts because faithful translation strips out the specifics that would have been added natively.",
    },
    {
      type: "p",
      text: "The upside is that French AI answers have far fewer credible sources to choose from than English ones, so the bar is lower while it lasts. That is a separate piece of work, covered on [AI search optimisation](/en/ai-search-optimization/).",
    },
    {
      type: "cta",
      title: "Want me to run this check on your site?",
      text: "Thirty minutes, free. I take your French pages, run the keyword comparison above, and tell you whether your targeting is the problem. You keep the findings whether or not you hire me.",
      button: "Book a free 30-min review",
      href: "https://calendly.com/mkz-consulting/30min",
    },
  ],
  faq: [
    {
      q: "Is machine translation good enough for French SEO now?",
      a: "Machine translation is good enough for the sentences and useless for the strategy. It will render your English page into fluent French, which is exactly the problem: it faithfully carries across the English keyword you chose, and it has no idea that a different French word carries twenty times the search volume. Use it to draft if you like, but only after the French keyword research has decided what the page targets.",
    },
    {
      q: "How do I know which French term has the volume?",
      a: "Google Ads Keyword Planner with the location set to France and the language set to French, or any keyword tool that lets you set both. Enter the faithful translation and the loanword or colloquial variant side by side and compare. Always record the date, because volumes shift over time and an undated figure ages badly.",
    },
    {
      q: "Do French users really search in English?",
      a: "For technology and marketing vocabulary, constantly. Measured on 30 July 2026 in France: the term SEO gets 27,100 searches a month, while the full French phrase optimisation pour les moteurs de recherche gets 590. French absorbs English tech vocabulary readily, and refusing to use it in your content costs you traffic rather than earning you credibility.",
    },
    {
      q: "Should I redo my entire French site?",
      a: "Almost never. Start with the three pages that carry the most commercial intent, redo the keyword research for those, rewrite them in French, and measure for a quarter. If those three move, you have your own data to justify the rest, which is a far stronger internal argument than any external benchmark.",
    },
    {
      q: "Does this apply to other languages too?",
      a: "The mechanism does: search demand never maps one to one onto translation, in any language. The size of the gap varies. French is a particularly sharp case because it borrows heavily from English in technical fields while also having formal native equivalents, so there are frequently two valid terms with wildly different volumes.",
    },
  ],
  related: ["how-to-choose-a-french-seo-agency", "get-cited-by-ai-answers-in-french"],
};

export default article;
