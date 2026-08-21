import type { PillarPage } from "@/lib/articles/types";

// Page pilier anglaise n°2 : GEO / AEO.
//
// C'est le cluster qui porte le volume anglais, mesuré via DataForSEO le
// 30/07/2026 (volumes mensuels US, keyword difficulty entre parenthèses) :
//   generative engine optimization .. 4 400 (KD 57)
//   answer engine optimization ...... 2 400 (KD 36)
//   ai search optimization .......... 1 300 (KD 35)   CPC 60 $
//   geo optimization ................ 1 000 (KD 57)
//   llm seo ........................... 880 (KD 21)
//   seo for ai ........................ 880 (KD 46)
//   ai visibility ..................... 720 (KD 16)   +285 % sur 12 mois
//   llm optimization .................. 720 (KD 22)   +164 % sur 12 mois
//   ai seo consultant ................. 110 (KD 22)   +750 % sur 12 mois
//
// Stratégie assumée : les têtes de cluster (KD 35 à 57) sont hors de portée à
// court terme pour un domaine de cette autorité. La page vise donc la traîne
// peu défendue (KD 16 à 22) ET l'intersection avec le moat français, qui n'a
// aucun concurrent sérieux : GEO appliqué au marché français.
//
// Piège évité : « geo france » (480/mois, KD 53) a été écarté après mesure.
// Ses catégories DataForSEO (10108 / 10756 / 13600) et sa langue détectée
// montrent une intention géographique, pas marketing. Cibler ce mot-clé aurait
// amené du trafic de géographie.

const pillar: PillarPage = {
  slug: "ai-search-optimization",
  title: "AI search optimisation: be the source the answer quotes",
  metaTitle: "AI search optimisation: GEO & AEO for the French market",
  metaDescription:
    "Get cited by ChatGPT, Perplexity, Gemini and Google AI answers, in French and English. Crawler access, citable facts, llms.txt, schema.org, share of voice.",
  heroBadge: "AI search",
  heroLead:
    "Half of search still returns ten links. The other half returns an answer with three or four sources. Ranking eleventh in the first half is survivable. Not being cited in the second half is invisibility, and unlike most things in marketing, **it can be counted today**.",
  keywords: [
    "ai search optimisation",
    "ai search optimization",
    "generative engine optimization",
    "answer engine optimization",
    "llm seo",
    "llm optimization",
    "ai visibility",
    "ai seo consultant",
    "geo aeo",
    "get cited by chatgpt",
  ],
  blocks: [
    {
      type: "callout",
      variant: "retenir",
      title: "The short version",
      items: [
        "GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) describe the same goal: being **cited inside an AI answer**, not ranked in a list.",
        "Demand for the discipline is real and growing fast (measured 30 July 2026, US): *generative engine optimization* 4,400 searches a month, *answer engine optimization* 2,400, *ai visibility* 720 and up 285% year on year.",
        "It overlaps with SEO but adds specific work: let the AI crawlers in, publish facts a model can quote, keep schema.org clean, ship llms.txt.",
        "In French the bar is lower, because far fewer credible French sources exist for a model to choose from.",
      ],
    },
    {
      type: "h2",
      id: "what-changed",
      text: "What actually changed",
    },
    {
      type: "p",
      text: "Classic search hands you a list and lets the user choose. Generative search makes the choice for them, then names a few sources. Those two behaviours reward completely different things. A page can rank fourth and never be quoted. Another can sit on page two and get cited constantly, because it states one fact cleanly, with a number and a date.",
    },
    {
      type: "p",
      text: "So the question stops being *where do I rank* and becomes **am I in the answer**. That is a different question with a different answer, and it happens to be checkable in about a minute: open ChatGPT or Perplexity, ask the question your buyer asks, and count your name.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "GEO, AEO, LLM SEO: the same thing",
      text: "Generative Engine Optimization, Answer Engine Optimization and LLM SEO are three names for one practice, popularised by different people at roughly the same time. Nobody has won the naming fight yet. If a vendor insists their acronym is the real one, that tells you more about the vendor than about search.",
    },
    {
      type: "h2",
      id: "french-advantage",
      text: "Why French is the easier win",
    },
    {
      type: "p",
      text: "Every model answering in English chooses between an enormous pile of credible English sources. Answering the same question in French, it chooses from a much smaller pile. Fewer French pages state a given fact clearly, with a figure and a date, in a structure a model can lift.",
    },
    {
      type: "p",
      text: "That asymmetry is the opportunity, and it is closing. Publishing genuinely citable French content now is cheap; doing it in two years, once every French competitor has caught on, will not be. This is the one place where being early is worth more than being big.",
    },
    {
      type: "h2",
      id: "the-work",
      text: "The work, in the order it has to happen",
    },
    {
      type: "h3",
      text: "1. Let the crawlers in (most sites fail here)",
    },
    {
      type: "p",
      text: "A model cannot cite a page it cannot fetch. Plenty of sites block AI crawlers without anyone having decided to: Cloudflare, for one, blocks AI bots by default on new zones and serves its own managed robots.txt over yours. The site owner sees their file in the repository and assumes it is live. It is not.",
    },
    {
      type: "callout",
      variant: "attention",
      title: "Always judge the live robots.txt, never the one in your repo",
      text: "Fetch https://yourdomain.com/robots.txt in a browser and read what is actually served. If GPTBot, ClaudeBot, PerplexityBot or Google-Extended are disallowed there, nothing else on this page matters yet. This is the single most common blocker, and it is a config change, not a project. Or have it read for you: the [free SEO & AI audit](/en/seo-audit/) fetches your live robots.txt and tells you in one minute whether those crawlers get through.",
    },
    {
      type: "h3",
      text: "2. Publish facts that can be quoted",
    },
    {
      type: "p",
      text: "Models quote specifics and skip adjectives. *Fast, reliable and affordable* is unquotable. *6,600 searches a month in France for création site internet, measured 30 July 2026 via Google Ads* is quotable, because it carries a figure, a scope and a date. Every claim worth citing has those three things.",
    },
    {
      type: "ul",
      items: [
        "A number, not a qualifier.",
        "A named source the model can attribute.",
        "A date, so the fact stays checkable as it ages.",
      ],
    },
    {
      type: "h3",
      text: "3. Structure so a machine can parse it",
    },
    {
      type: "p",
      text: "Clean heading hierarchy, one idea per section, real FAQ blocks answering real questions, and valid schema.org. Valid meaning reparsed by a script, not eyeballed: FAQPage, Article, BreadcrumbList and ItemList each have rules that Search Console enforces silently. An ItemList whose entries lack a complete `item` object is simply ignored, with no error shown to you.",
    },
    {
      type: "h3",
      text: "4. Ship llms.txt and llms-full.txt",
    },
    {
      type: "p",
      text: "A plain-text summary of what you do and what you can be quoted on, generated from your content at build time rather than maintained by hand. It is cheap, it is not yet a formal standard, and the sites doing it well are disproportionately the ones getting cited. This site publishes [llms.txt](/llms.txt) and [llms-full.txt](/llms-full.txt); go and read them, that is the format.",
    },
    {
      type: "h3",
      text: "5. Measure share of voice, do not assume it",
    },
    {
      type: "p",
      text: "This is where most GEO work quietly stops being honest. *You have no schema, so you are not being cited* is a deduction, not a measurement. The cause is not the effect. The effect is measurable: run your buyers' real questions against ChatGPT, Perplexity, Gemini and Google AI answers, in French and English, and count citations. That is a number, and it is the only one that tells you whether any of the above worked.",
    },
    {
      type: "callout",
      variant: "astuce",
      title: "Your baseline, in ten minutes",
      text: "Write down the ten questions a buyer asks before choosing you. Ask all ten in ChatGPT and in Perplexity, in French if France matters, and count how many mention you. Write the date next to the number. That is your baseline, it costs nothing, and it beats any audit that infers your visibility from your markup.",
    },
    {
      type: "h2",
      id: "honest-limits",
      text: "What nobody can promise you",
    },
    {
      type: "p",
      text: "AI answers are not deterministic. The same question can yield different sources on two consecutive runs, and every model reshuffles its preferences with each update. Anyone selling guaranteed ChatGPT placement is selling something they do not control.",
    },
    {
      type: "p",
      text: "What is controllable: being fetchable, being quotable, being structured, and being measured over time so the trend is visible even when individual answers wobble. That is the honest scope of the work, and it is enough.",
    },
    {
      type: "h2",
      id: "combined",
      text: "Why this usually ships with French SEO",
    },
    {
      type: "p",
      text: "Both run on the same foundation: content that is genuinely French, and facts a machine can quote. Doing the French keyword research anyway makes the citable content nearly free, which is why the two are sold separately and almost always done together. If ranking in France is the priority, start with [French SEO](/en/french-seo/).",
    },
    {
      type: "cta",
      title: "Get your AI visibility baseline",
      text: "Thirty minutes, free. We check whether AI crawlers can even reach you, then count how often French and English AI answers cite you today. You keep the numbers either way.",
      button: "Book a free 30-min review",
      href: "https://calendly.com/mkz-consulting/30min",
    },
  ],
  faq: [
    {
      q: "What is GEO and how is it different from SEO?",
      a: "GEO (Generative Engine Optimization), also called AEO or LLM SEO, means being cited inside an AI answer rather than ranked in a list of links. It overlaps heavily with SEO, since both need a crawlable, well-structured, credible site, but it adds specific work: allowing AI crawlers, publishing facts that carry a figure and a date so a model can quote them, keeping schema.org valid, and shipping llms.txt. The key difference is the success metric: not position, but whether you appear in the answer.",
    },
    {
      q: "Is anyone actually searching for this, or is it hype?",
      a: "Both. Measured on 30 July 2026 in the US: generative engine optimization 4,400 searches a month, answer engine optimization 2,400, ai search optimization 1,300, ai visibility 720 and up 285% year on year. The demand is real and growing. The hype is in the promises attached to it, particularly guaranteed placement in ChatGPT, which nobody can deliver.",
    },
    {
      q: "Can you guarantee my site gets cited by ChatGPT?",
      a: "No, and neither can anyone else. AI answers are non-deterministic: the same question can return different sources on two consecutive runs, and every model update reshuffles preferences. What can be delivered is the controllable part: crawler access, citable facts, valid structured data, llms.txt, and measurement over time so you can see the trend rather than guess at it.",
    },
    {
      q: "Why is French AI search easier than English?",
      a: "Because a model answering in French chooses from a much smaller pool of credible French sources than it does in English. Fewer French pages state a given fact clearly, with a figure and a date, in a structure worth lifting. That makes the bar to become one of the cited few genuinely lower today. It also means the window is temporary: the advantage belongs to whoever publishes citable French content first.",
    },
    {
      q: "How do you measure whether it worked?",
      a: "By running your buyers' actual questions against ChatGPT, Perplexity, Gemini and Google AI answers, in French and in English, and counting citations, with the date recorded each time. That is a measurement. Inferring visibility from your markup, for instance claiming you are not cited because you have no schema, is a deduction dressed as a finding, and it is the most common flaw in GEO audits.",
    },
    {
      q: "My site is blocked by Cloudflare. Does that matter?",
      a: "Enormously, and it is the first thing to check. Cloudflare blocks AI bots by default on new zones and can serve its own managed robots.txt in place of yours, which means the file in your repository is not the file being served. Fetch your live robots.txt in a browser: if GPTBot, ClaudeBot, PerplexityBot or Google-Extended are disallowed there, no amount of content work will get you cited. Unblocking is a configuration change, not a project.",
    },
  ],
};

export default pillar;
