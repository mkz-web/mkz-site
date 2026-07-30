import type { Article } from "@/lib/articles/types";

// Cocon ai-search, article n°1.
//
// Cible la traîne peu défendue du cluster IA, mesurée le 30/07/2026 (US) :
// llm seo 880 (KD 21), llm optimization 720 (KD 22, +164 %/an),
// ai visibility 720 (KD 16, +285 %/an), ai seo consultant 110 (KD 22, +750 %/an).
// Les têtes de cluster (generative engine optimization 4 400 KD 57,
// answer engine optimization 2 400 KD 36) sont citées dans le contenu pour la
// pertinence sémantique, mais ne sont PAS la cible de classement de cet article :
// l'autorité du domaine ne le permet pas encore.
//
// L'angle croise les deux moats de MKZ : GEO appliqué au français, où la
// concurrence est quasi nulle.

const article: Article = {
  slug: "get-cited-by-ai-answers-in-french",
  locale: "en",
  category: "ai-search",
  title: "How to get cited by AI answers, and why French is the easier win",
  metaTitle: "Get cited by AI answers: the French shortcut",
  metaDescription:
    "Five steps to being quoted by ChatGPT, Perplexity and Google AI answers, plus why French-language answers have far fewer credible sources competing for the slot.",
  datePublished: "2026-07-30",
  dateModified: "2026-07-30",
  readingMinutes: 9,
  excerpt:
    "Being cited inside an AI answer is a different game from ranking, and it is measurable today. Here are the five things that actually decide it, in the order they have to happen, and why doing this in French is currently much cheaper than doing it in English.",
  tldr: [
    "A model cannot cite a page it cannot fetch. **Check your live robots.txt first**: Cloudflare blocks AI crawlers by default on new zones and can override the file in your repo.",
    "Models quote **specifics**: a figure, a named source, a date. Adjectives are unquotable.",
    "French answers draw on a much smaller pool of credible French sources than English ones, so the bar is lower while that lasts.",
    "Measure citations by asking your buyers' real questions and counting your name. Never infer visibility from your markup: **the cause is not the effect**.",
  ],
  keywords: [
    "llm seo",
    "llm optimization",
    "ai visibility",
    "ai seo consultant",
    "get cited by chatgpt",
    "generative engine optimization",
    "answer engine optimization",
    "ai search optimisation",
  ],
  blocks: [
    {
      type: "p",
      text: "Search has quietly split into two products. One still hands you ten links. The other hands you an answer and names three or four sources. Everything you know about ranking applies to the first. The second rewards something else, and it is worth understanding before your competitors do.",
    },
    {
      type: "p",
      text: "The good news: unlike most things sold under an acronym, this is concrete work with a countable outcome. You can measure whether it worked this afternoon.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "GEO, AEO, LLM SEO: three names, one practice",
      text: "Generative Engine Optimization, Answer Engine Optimization and LLM SEO all describe being cited inside an AI answer rather than ranked in a list. Different people popularised different names at roughly the same time and nobody has won. Measured 30 July 2026 in the US: generative engine optimization gets 4,400 searches a month, answer engine optimization 2,400. If a vendor insists their acronym is the only real one, that tells you about the vendor.",
    },
    {
      type: "h2",
      id: "step-1",
      text: "Step 1: check that the crawlers can reach you at all",
    },
    {
      type: "p",
      text: "This sounds too basic to be the first step. It is the first step because it is where most sites silently fail, and because no amount of content work matters until it passes.",
    },
    {
      type: "p",
      text: "Open your live robots.txt in a browser: **yourdomain.com/robots.txt**. Read what is actually served, not what is in your repository. Look for GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot, Google-Extended and CCBot. If they are disallowed, you are invisible to AI answers by configuration, and nothing else on this page applies yet.",
    },
    {
      type: "callout",
      variant: "attention",
      title: "The Cloudflare trap",
      text: "Cloudflare blocks AI bots by default on new zones and can serve its own managed robots.txt in place of yours. The result is that your repository contains a permissive file, your deployment succeeds, and the file being served to crawlers is a different one that blocks them. This is why you judge the live URL and never the build. It is a configuration switch, not a project.",
    },
    {
      type: "h2",
      id: "step-2",
      text: "Step 2: write things that can actually be quoted",
    },
    {
      type: "p",
      text: "Models lift sentences that stand on their own. Marketing copy is built to do the opposite: it qualifies, it hedges, it flows. That makes most of your site unquotable, no matter how well written.",
    },
    {
      type: "table",
      caption: "The same claim, unquotable and quotable",
      headers: ["Unquotable", "Quotable"],
      rows: [
        [
          "Our platform is significantly faster than competing solutions.",
          "Median page load is 1.2s, measured across 50 client sites in 2025 (Core Web Vitals, field data).",
        ],
        [
          "French search is a big opportunity for foreign brands.",
          "création site internet gets 6,600 searches a month in France, versus 320 for conception de site web (Google Ads, 30 July 2026).",
        ],
        [
          "AI search is growing fast.",
          "US searches for generative engine optimization reached 4,400 a month by July 2026, up from an estimated 1,000 a year earlier.",
        ],
      ],
    },
    {
      type: "p",
      text: "The pattern in the right column never changes. Three ingredients, every time:",
    },
    {
      type: "ul",
      items: [
        "**A number**, not a qualifier.",
        "**A named source**, so the model can attribute it and a reader can verify it.",
        "**A date**, so the claim stays checkable as it ages.",
      ],
    },
    {
      type: "p",
      text: "There is a side effect worth naming: this discipline makes you honest. You cannot write a sentence in that shape without having measured something. Most pages fail the test not because they are badly written but because nobody ran the measurement.",
    },
    {
      type: "h2",
      id: "step-3",
      text: "Step 3: structure it so a machine can lift it",
    },
    {
      type: "p",
      text: "One idea per section. Headings that describe the answer rather than tease it. Real FAQ blocks answering questions people actually ask, in their words. Tables for anything comparative, because tables survive extraction intact where prose does not.",
    },
    {
      type: "p",
      text: "Then schema.org, and here is the part that trips up competent teams: **valid means reparsed by a script, not eyeballed**. Several types have rules that are enforced silently.",
    },
    {
      type: "ul",
      items: [
        "**ItemList:** every `itemListElement` needs a complete `item` object with a concrete `@type`, a `name` and a `url`. Entries without one are ignored, with no error surfaced to you.",
        "**BreadcrumbList:** every link needs `item` **except the last**, which is the current page.",
        "**FAQPage:** the answer text must match what a visitor actually sees on the page.",
        "**Escaping:** escape `<` as `\\u003c` inside JSON-LD, or a stray `</script>` in your content silently breaks the whole block.",
      ],
    },
    {
      type: "callout",
      variant: "astuce",
      title: "Validate with a script, in your build",
      text: "Eyeballing JSON-LD catches syntax errors and misses rule violations, which are the ones that cost you. Reparse every block at build time and fail the build on a violation. This site does exactly that before every deployment, which is the only reason I trust its structured data.",
    },
    {
      type: "h2",
      id: "step-4",
      text: "Step 4: publish llms.txt",
    },
    {
      type: "p",
      text: "A plain-text summary at the root of your domain describing what you do and what you can be quoted on. It is not a formal standard, it costs almost nothing, and the sites doing it properly are noticeably over-represented among those getting cited.",
    },
    {
      type: "p",
      text: "Generate it from your content at build time rather than maintaining it by hand, otherwise it goes stale within a quarter and starts contradicting your pages. This site publishes [llms.txt](/llms.txt) and a full version at [llms-full.txt](/llms-full.txt); open them and copy the shape.",
    },
    {
      type: "h2",
      id: "step-5",
      text: "Step 5: measure it, do not infer it",
    },
    {
      type: "p",
      text: "This is where most AI visibility work stops being honest, so it deserves plain language.",
    },
    {
      type: "callout",
      variant: "attention",
      title: "The cause is not the effect",
      text: "You have no schema, therefore you are not being cited is a deduction, not a finding. So is your robots.txt is clean, therefore you are visible in AI answers. Both might be wrong. Citation is directly observable, and any audit that infers it from your markup is substituting an assumption for a measurement it could have taken.",
    },
    {
      type: "p",
      text: "The measurement is unglamorous and takes ten minutes:",
    },
    {
      type: "ol",
      items: [
        "Write down the ten questions a buyer asks before choosing you. Their words, not your positioning.",
        "Ask all ten in ChatGPT, Perplexity, Gemini and Google AI answers. **In French if France matters**, since the answers differ substantially by language.",
        "Count how many name you, and note which competitors appear instead.",
        "Record the date next to the numbers.",
        "Repeat monthly. Individual answers fluctuate, so the trend is the signal and any single run is noise.",
      ],
    },
    {
      type: "h2",
      id: "french-advantage",
      text: "Why French is the cheaper win right now",
    },
    {
      type: "p",
      text: "A model answering in English chooses from an enormous pile of credible English sources. Answering the same question in French, it chooses from a much smaller one. Fewer French pages state a given fact cleanly, with a figure and a date, in a structure worth lifting.",
    },
    {
      type: "p",
      text: "That asymmetry is a real, temporary advantage. Publishing genuinely citable French content is cheap today and will not be once every French competitor has worked this out. If you sell into France, this is the rare case where being early beats being big.",
    },
    {
      type: "p",
      text: "It also compounds with ordinary French SEO, because both need the same foundation: content that is genuinely French rather than translated. If your French pages were translated, start there instead, with [why translation never ranks](/en/insights/french-seo/why-translation-never-ranks-in-france/).",
    },
    {
      type: "h2",
      id: "limits",
      text: "What nobody can promise",
    },
    {
      type: "p",
      text: "AI answers are non-deterministic. The same question can return different sources on two consecutive runs, and every model update reshuffles preferences. Anyone selling guaranteed ChatGPT placement is selling something they do not control, and you should treat the guarantee as information about them.",
    },
    {
      type: "p",
      text: "What is controllable: being fetchable, being quotable, being structured, and being measured over time. That is the honest scope, and it is enough to move the trend.",
    },
    {
      type: "cta",
      title: "Want your AI visibility baseline measured?",
      text: "Thirty minutes, free. We check whether AI crawlers can reach you, then count how often French and English AI answers cite you today. You keep the numbers either way.",
      button: "Book a free 30-min review",
      href: "https://calendly.com/mkz-consulting/30min",
    },
  ],
  faq: [
    {
      q: "How do I know if AI search engines can crawl my site?",
      a: "Open yourdomain.com/robots.txt in a browser and read what is actually served, not what is in your repository. Look for GPTBot, ClaudeBot, PerplexityBot, Google-Extended and CCBot. If any are disallowed, those engines cannot fetch your pages. This matters especially on Cloudflare, which blocks AI bots by default on new zones and can serve its own managed robots.txt in place of yours, so the file you deployed is not the file crawlers see.",
    },
    {
      q: "What makes a page quotable by an AI model?",
      a: "A specific claim carrying three things: a number rather than a qualifier, a named source that can be attributed, and a date so the claim stays checkable. Fast and reliable is unquotable. Median load time 1.2s across 50 client sites in 2025 is quotable. The discipline has a useful side effect: you cannot write in that shape without having actually measured something.",
    },
    {
      q: "Can I guarantee my site is cited by ChatGPT?",
      a: "No, and neither can anyone selling you that. AI answers are non-deterministic: the same prompt can return different sources on consecutive runs, and every model update reshuffles which sources it favours. What can be delivered is the controllable part, namely crawler access, quotable facts, valid structured data, llms.txt, and monthly measurement so you can see the trend rather than guess.",
    },
    {
      q: "Is llms.txt an official standard?",
      a: "No. It is a proposed convention, not a ratified standard, and no engine formally commits to reading it. It is also cheap to produce and the sites doing it well are over-represented among those getting cited, which is enough to justify shipping one. Generate it from your content at build time so it cannot drift out of sync with your pages.",
    },
    {
      q: "Why would French AI answers be easier to appear in than English ones?",
      a: "Because the pool of credible French sources a model can draw on is much smaller than the English pool. Fewer French pages state a given fact clearly, with a figure and a date, in a structure worth extracting. That makes the bar to become one of the cited few genuinely lower today. It is a temporary advantage: it belongs to whoever publishes citable French content first.",
    },
    {
      q: "How is this different from normal SEO?",
      a: "It overlaps heavily, since both need a crawlable, well-structured, credible site, and good SEO is a prerequisite rather than an alternative. The differences are the success metric, which is appearing in the answer rather than holding a position, and three additions: explicit AI crawler access, facts written to be quoted, and llms.txt. A page can rank fourth and never be quoted, while another sits on page two and gets cited constantly.",
    },
  ],
  related: ["why-translation-never-ranks-in-france", "how-to-choose-a-french-seo-agency"],
};

export default article;
