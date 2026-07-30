import type { PillarPage } from "@/lib/articles/types";

// Page pilier anglaise n°1 : le SEO du marché français vu de l'étranger.
//
// Cluster ciblé, mesuré via DataForSEO le 30/07/2026 (volumes mensuels) :
//   french seo ............... 90 (US) / 170 (UK)   KD 1 à 4
//   seo services france ..... 110 (UK)              KD 9
//   seo agency france ........ 70 (US) /  70 (UK)
//   french seo agency ........ 20 (US) /  70 (UK)   KD 3
//   multilingual seo agency .. 70 (US) /  40 (UK)
//   french seo company ....... 30 (US)              KD 1
//   seo consultant france .... 50 (France, requêtes en anglais)
// Faible volume mais intention commerciale et concurrence quasi nulle. La SERP
// UK sur « french seo agency » laisse 3 places sur 10 à des annuaires (Clutch,
// Semrush, DesignRush) et un fil Reddit : elle est prenable avec une vraie page.
//
// Le tableau de la section « translation » n'est pas une illustration : ce sont
// des volumes relevés le 30/07/2026 (Google Ads, France, langue française).

const pillar: PillarPage = {
  slug: "french-seo",
  title: "French SEO: make France work for a site that was built in English",
  metaTitle: "French SEO agency & consultant for the French market",
  metaDescription:
    "French SEO for companies selling into France: keyword research done in French, hreflang, French content. Native French consultant near Paris. Free 30-min review.",
  heroBadge: "French SEO",
  heroLead:
    "You already rank in English. France is flat. In nine cases out of ten that is not a translation problem, it is a **research** problem: your French pages target your English keywords, in French. Here is what the work actually involves, and how to judge whoever does it for you.",
  keywords: [
    "french seo",
    "french seo agency",
    "french seo consultant",
    "french seo company",
    "seo agency france",
    "seo services france",
    "seo consultant france",
    "multilingual seo agency",
    "french keyword research",
    "hreflang french",
  ],
  blocks: [
    {
      type: "callout",
      variant: "retenir",
      title: "The short version",
      items: [
        "French SEO is not your English strategy translated. It is keyword research redone in French, then content built on what that research finds.",
        "Measured example (Google Ads, France, 30 July 2026): **création site internet gets 6,600 searches a month, conception de site web gets 320**. Both mean website design. One is a real market, the other is a translation.",
        "Competition on English-language queries for French SEO is unusually low: keyword difficulty 1 to 9 across the whole commercial cluster.",
        "You keep every account, every page and all the data. If you leave, you leave with the lot.",
      ],
    },
    {
      type: "h2",
      id: "what-it-is",
      text: "What French SEO actually means",
    },
    {
      type: "p",
      text: "French SEO is ranking a site on **google.fr for queries typed by French users, in French**. That sounds obvious. It matters because almost every foreign site that underperforms in France has skipped the only step that counts: finding out what French users type before writing anything.",
    },
    {
      type: "p",
      text: "The French word for SEO is *référencement naturel*. If that phrase does not appear anywhere in your French content, that is a reasonable first signal that your pages were translated rather than researched.",
    },
    {
      type: "h2",
      id: "translation-trap",
      text: "Why translation never ranks, with numbers",
    },
    {
      type: "p",
      text: "Translation is faithful to your English words. Search demand is not. A translator picks the most accurate French term; French users type the most **common** one. Those are frequently different words, and the gap is not small.",
    },
    {
      type: "table",
      caption:
        "Monthly searches in France, French language, measured 30 July 2026 (Google Ads via DataForSEO)",
      headers: ["What you mean", "Literal translation", "Searches", "What French users type", "Searches"],
      rows: [
        ["Website design", "conception de site web", "320", "création site internet", "6,600"],
        ["Search engine optimisation", "optimisation pour les moteurs de recherche", "590", "SEO", "27,100"],
        ["SEO agency", "agence de référencement", "2,900", "agence SEO", "22,200"],
      ],
    },
    {
      type: "p",
      text: "Read the first row again. Same meaning, **twenty times the demand**, decided entirely by word choice. A translator had no way of knowing: picking *conception de site web* was not a mistake in French, it was a mistake in search. That decision belongs to keyword research, and it has to happen in French, before the content brief.",
    },
    {
      type: "callout",
      variant: "attention",
      title: "The trap is invisible from your dashboard",
      text: "Your French pages will look healthy: indexed, no errors, decent Core Web Vitals. They rank, too, just on terms nobody searches. Search Console shows impressions and a flat click line, and everyone concludes France is a hard market. France is not hard. The keyword list was wrong.",
    },
    {
      type: "h2",
      id: "what-i-do",
      text: "What the engagement covers",
    },
    {
      type: "h3",
      text: "1. French keyword research, done in French",
    },
    {
      type: "p",
      text: "I start from your categories, not from your English keyword list, and build the French demand map: volumes, difficulty, intent, and the queries that exist only in French. You get the list with numbers attached, so you can see which pages are worth building before anyone writes a word.",
    },
    {
      type: "h3",
      text: "2. Structure and hreflang",
    },
    {
      type: "p",
      text: "Subfolder, subdomain or separate domain, then hreflang wired both ways with a correct x-default. Reciprocity is the part that usually breaks: if your French page points at the English one but not the reverse, Google discards the pair and picks a version itself, usually the wrong one.",
    },
    {
      type: "h3",
      text: "3. French content that reads as French",
    },
    {
      type: "p",
      text: "Written in French, not translated into it. That covers the obvious (accents, tone, *vouvoiement*) and the less obvious: French buyers expect different reassurance signals, different proof, and a legally required *mentions légales* page. A French visitor spots a translated page in about two seconds, and bounces at roughly the same speed.",
    },
    {
      type: "h3",
      text: "4. Technical work and local signals",
    },
    {
      type: "p",
      text: "Indexation, internal linking in French, schema.org, Core Web Vitals, and a Google Business profile in French if you have any physical presence. Nothing exotic. It is the same technical SEO you already know, applied to the French side of the site, which is usually the side nobody audited.",
    },
    {
      type: "h3",
      text: "5. Monthly measurement",
    },
    {
      type: "p",
      text: "Positions in France, French organic traffic, and citations in French AI answers. Every figure comes from a tool you can open yourself: Search Console, DataForSEO, the AI engines directly. If a number did not move, you hear it from me before you spot it.",
    },
    {
      type: "h2",
      id: "geo",
      text: "The half of French search that is not links any more",
    },
    {
      type: "p",
      text: "A growing share of French queries now returns an answer with three or four cited sources instead of ten links. Ranking eleventh is survivable. Not being cited is invisibility, and it is measurable today.",
    },
    {
      type: "p",
      text: "French-language AI answers have a real structural advantage for you: far fewer credible French sources exist than English ones, so the bar to become one of the cited few is lower. That work is its own page: [AI search optimisation](/en/ai-search-optimization/).",
    },
    {
      type: "h2",
      id: "how-to-judge",
      text: "How to judge a French SEO agency (including me)",
    },
    {
      type: "p",
      text: "The English-language market for French SEO is thin and largely undefended, which means it attracts a fair amount of confident nonsense. Four questions sort it out quickly.",
    },
    {
      type: "ol",
      items: [
        "**Who does the French keyword research, and in what language?** If the answer involves translating your English list, stop there. That is the whole job, being skipped.",
        "**Show me a French keyword list with volumes.** Any serious partner produces one before proposing content. If they cannot, they are selling articles, not rankings.",
        "**Who writes the French content?** A native French writer, a translator, or a model? All three are defensible answers if stated honestly. Only one of them is usually true.",
        "**What will you measure, and can I open the tool myself?** Reports that cannot be traced back to Search Console or a named data source are decoration.",
      ],
    },
    {
      type: "callout",
      variant: "astuce",
      title: "A test you can run in five minutes, for free",
      text: "Open Google Ads Keyword Planner, set the country to France and the language to French, and enter the literal French translation of your main service alongside the term you think French people use. If the two volumes differ by more than about three times, your French pages are almost certainly built on the wrong one.",
    },
    {
      type: "h2",
      id: "who-this-is-for",
      text: "Who this is for, and who it is not for",
    },
    {
      type: "p",
      text: "It fits companies that already perform in English and need France to stop being the dead entry in the country report: an existing site to adapt, a French section to set up properly, French content to build on real demand.",
    },
    {
      type: "p",
      text: "It does not fit brand new domains expecting French rankings in six weeks, or anyone shopping for the cheapest article-per-month subscription. There is plenty of that available and I am not competing on it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "One consultant, not a department",
      text: "MKZ is a French company and the work is done by one person: Mickaël Leclerc, native French speaker, based near Paris, twenty years as an IT engineer before this. You talk to whoever is doing the work. Less capacity, no layers, nothing lost in a handover. That trade is deliberate, and it is the right one to know about before you start.",
    },
    {
      type: "cta",
      title: "Find out where you actually stand in France",
      text: "Thirty minutes, free. I look at your French pages, your hreflang, and whether French AI answers ever cite you. You leave with the findings and a plan, whether or not you work with me.",
      button: "Book a free 30-min review",
      href: "https://calendly.com/mkz-consulting/30min",
    },
  ],
  faq: [
    {
      q: "Can I just translate my English site into French and rank?",
      a: "No, and it is the most common reason foreign sites underperform in France. Translation carries your English keywords into French; it does not carry French search demand. A measured example from 30 July 2026: création site internet gets 6,600 searches a month in France while conception de site web, a perfectly correct translation of the same idea, gets 320. Same meaning, twenty times the market, decided by word choice alone.",
    },
    {
      q: "Do you work with companies based outside France?",
      a: "Yes, that is the main use case. Typical clients are UK, US or European companies that already perform in English and need France to work: an existing site to adapt, a French subfolder or subdomain to set up, hreflang to fix, and French content that reads as French because it was written in French.",
    },
    {
      q: "How long does French SEO take to show results?",
      a: "First movements usually appear between three and six months, depending on your existing authority and how competitive your French keywords are. A site that already has authority in English often moves faster in France than a brand new domain, because domain-level signals carry over. Anyone promising French page one in six weeks is either working on a term nobody searches or guessing.",
    },
    {
      q: "Should I use a subfolder, a subdomain or a .fr domain?",
      a: "In most cases a subfolder on your existing domain, because it inherits the authority you already built in English, which is the single biggest asset you have in a new market. A .fr domain starts from zero and makes sense mainly if you run a genuinely separate French entity. A subdomain sits in between and is rarely the best of either. The decision is worth ten minutes of discussion, not a template answer.",
    },
    {
      q: "Do you write the French content yourself?",
      a: "Yes. French is my first language, so your French pages are written in French rather than translated into it, and the keyword research behind them is done in French too. That is precisely the part most agencies outsource to a translation tool.",
    },
    {
      q: "Are you an agency or a freelance consultant?",
      a: "MKZ is a registered French company (SIRET 983 662 784 00013) with one consultant doing the work. You talk to the person running your account rather than an account manager relaying to a junior. Less capacity, no layers: a deliberate trade, and one you should know about before starting.",
    },
    {
      q: "What does French SEO cost?",
      a: "It depends on the size of your French section and whether content is included, so a fixed public price would be dishonest. What is fixed: the 30-minute review is free, you get the findings whether or not you hire me, and any proposal states scope, budget and duration up front, with no retainer you cannot exit.",
    },
  ],
};

export default pillar;
