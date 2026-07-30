import type { Article } from "@/lib/articles/types";

// Cocon french-seo, article n°2 : le comparatif d'achat.
//
// Cible l'intention commerciale du cluster (mesurée le 30/07/2026) :
// french seo agency (20 US / 70 UK, KD 3), seo agency france (70 / 70),
// french seo company (30 US, KD 1), seo services france (110 UK, KD 9),
// multilingual seo agency (70 / 40).
//
// Raison d'être stratégique : la SERP UK de « french seo agency » place en 5e
// position un fil Reddit r/AskMarketing intitulé « What is the best french SEO
// agency ? », posté par une agence UK qui travaille pour un client français.
// La demande existe donc sous forme de question, et personne n'y répond avec une
// vraie méthode d'évaluation. Cet article répond à cette question précise, ce qui
// le rend aussi citable par les moteurs de réponse.

const article: Article = {
  slug: "how-to-choose-a-french-seo-agency",
  locale: "en",
  category: "french-seo",
  title: "How to choose a French SEO agency when you do not speak French",
  metaTitle: "How to choose a French SEO agency: 7 questions",
  metaDescription:
    "You cannot read the deliverable, so judge the method instead. Seven questions that separate a real French SEO partner from a translation workflow with a markup.",
  datePublished: "2026-07-30",
  dateModified: "2026-07-30",
  readingMinutes: 8,
  excerpt:
    "The hard part of hiring a French SEO partner is that you cannot audit the work: it is in a language you do not read. So you have to judge the method instead. Here are the seven questions that actually separate the real ones, and the answers that should worry you.",
  tldr: [
    "You cannot check French content quality yourself, so **judge the process, not the prose**.",
    "The single most revealing question: *who does the keyword research, and in what language?* If the answer involves translating your English list, that is the whole job being skipped.",
    "Ask for a French keyword list with volumes **before** any content proposal. A serious partner already has one.",
    "Anyone guaranteeing French page one in weeks, or guaranteeing citation in ChatGPT, is selling something they do not control.",
  ],
  keywords: [
    "french seo agency",
    "seo agency france",
    "french seo company",
    "french seo consultant",
    "seo services france",
    "multilingual seo agency",
    "hire french seo",
  ],
  blocks: [
    {
      type: "p",
      text: "There is a specific discomfort in buying SEO in a language you do not read. With an English supplier you can open the deliverable and form a view in thirty seconds. With French content you are trusting a report about work you cannot inspect, written by the person who did it.",
    },
    {
      type: "p",
      text: "So stop trying to judge the output. Judge the **method**, which you can absolutely assess without a word of French. Seven questions do it.",
    },
    {
      type: "h2",
      id: "q1",
      text: "1. Who does the keyword research, and in what language?",
    },
    {
      type: "p",
      text: "This is the question. Ask it first and listen carefully, because the answer usually decides everything else.",
    },
    {
      type: "p",
      text: "**What you want to hear:** research done in French, from your product categories, before anything is written. **What should end the conversation:** any version of *we take your English keywords and translate them.* That is not a shortcut through the work, it is the work being skipped.",
    },
    {
      type: "callout",
      variant: "attention",
      title: "Why this single answer matters so much",
      text: "Measured in France on 30 July 2026: création site internet gets 6,600 searches a month, while conception de site web, an equally correct translation of the same idea, gets 320. A translated keyword list picks one of those at random. Twenty times the market, decided by a step that takes an afternoon.",
    },
    {
      type: "h2",
      id: "q2",
      text: "2. Can I see a French keyword list with volumes, before we discuss content?",
    },
    {
      type: "p",
      text: "Any serious partner produces this artefact early, because it is what the content plan is derived from. If the proposal jumps straight to *twelve articles a month*, they are selling volume of output, not rankings.",
    },
    {
      type: "p",
      text: "You do not need French to read the list. You need three columns: the term, its monthly volume, and its difficulty. Numbers are language independent, which makes this the most auditable thing in the entire engagement.",
    },
    {
      type: "h2",
      id: "q3",
      text: "3. Who writes the French content, and are they French?",
    },
    {
      type: "p",
      text: "All of these are legitimate answers if given honestly: a native French writer, a bilingual writer, a translator working from English briefs, or a model with native review. What matters is that you are told which one, and priced accordingly.",
    },
    {
      type: "p",
      text: "The answer to be wary of is the vague one. *We have a French team* often means one freelancer and a translation tool. Ask who specifically, and ask whether you can see two published pages they wrote.",
    },
    {
      type: "h2",
      id: "q4",
      text: "4. What will you measure, and can I open the tool myself?",
    },
    {
      type: "p",
      text: "Reporting that cannot be traced back to a source you control is decoration. Search Console is yours: ask for the work to be reported in terms you can verify there, and ask for access to any third-party tool used for keyword or position data.",
    },
    {
      type: "p",
      text: "A related and more revealing follow-up: **what will you tell me if a number does not move?** The answer reveals whether you are buying an honest partner or a monthly reassurance subscription.",
    },
    {
      type: "h2",
      id: "q5",
      text: "5. What is your plan for hreflang and site structure?",
    },
    {
      type: "p",
      text: "You are looking for a real opinion, delivered fast, with a reason attached. Subfolder, subdomain or .fr domain, and why for your specific case.",
    },
    {
      type: "p",
      text: "In most cases the answer should be a subfolder on your existing domain, because it inherits the authority you already built in English, which is your biggest asset entering a new market. A .fr domain starts from zero. If someone recommends a fresh .fr without asking about your existing authority, they are applying a template rather than thinking about you.",
    },
    {
      type: "callout",
      variant: "astuce",
      title: "A five-second competence test you can run alone",
      text: "Ask: what happens if my French page declares an English alternate but the English page does not declare the French one? Correct answer: Google treats the hreflang pair as unconfirmed and ignores it, then chooses a version itself, usually not the one you wanted. Reciprocity is hreflang 101. Anyone hesitating here has not done this before.",
    },
    {
      type: "h2",
      id: "q6",
      text: "6. What do you refuse to promise?",
    },
    {
      type: "p",
      text: "Deliberately awkward, and the most useful question on this list. A competent supplier has a ready list of things they will not commit to. Someone who promises everything has thought about none of it.",
    },
    {
      type: "p",
      text: "Reasonable refusals: guaranteed positions, a fixed timeline for page one, guaranteed citation in ChatGPT or any AI answer, and traffic forecasts stated to the nearest percent. If you hear guarantees on any of those, you have your answer about everything else.",
    },
    {
      type: "h2",
      id: "q7",
      text: "7. What do I own, and what happens when I leave?",
    },
    {
      type: "p",
      text: "Ask it plainly and listen for hedging. Your site, your accounts, your content, your data, your reporting history: all yours, and portable on the day you decide to stop.",
    },
    {
      type: "p",
      text: "Watch specifically for content published on their platform, tracking that lives in their account, and technical work that reverts when the retainer stops. Any of those is a lock-in mechanism, whether or not it is described as one.",
    },
    {
      type: "h2",
      id: "agency-or-freelance",
      text: "Agency, freelance or in-house: which fits",
    },
    {
      type: "table",
      caption: "Honest trade-offs, including for what I do",
      headers: ["Option", "Best when", "The real risk"],
      rows: [
        [
          "Large multilingual agency",
          "You need many languages at once and have budget for coordination",
          "French becomes one row in a spreadsheet, handled by whoever is free",
        ],
        [
          "French agency with an English-speaking team",
          "You want French depth plus capacity and continuity",
          "You get the senior person in the pitch and a junior on the work",
        ],
        [
          "Independent French consultant",
          "You want the person who researches to be the person who writes",
          "Limited capacity, and a single point of failure if they are unavailable",
        ],
        [
          "In-house French hire",
          "France is a core market long term, with enough work for a full role",
          "Slow to hire, hard to evaluate if nobody internally speaks French",
        ],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "Where I sit, stated plainly",
      text: "MKZ is the third row: one French consultant, based near Paris, doing the research and the writing personally. The upside is that nothing is lost in a handover. The downside is real and worth saying out loud: limited capacity, and one person rather than a team. If you need five languages next quarter, row one or two is the honest answer, and I will tell you so on the call.",
    },
    {
      type: "h2",
      id: "checklist",
      text: "The one-page version",
    },
    {
      type: "ul",
      items: [
        "Keyword research done **in French**, from your categories, before any writing.",
        "A French keyword list with volumes and difficulty, shown before the content plan.",
        "A named person writing the French content, and two published examples.",
        "Reporting traceable to Search Console or a tool you can open.",
        "A clear structural recommendation with a reason, and correct hreflang reciprocity.",
        "A ready list of things they will not promise.",
        "Full ownership and a clean exit, stated without hedging.",
      ],
    },
    {
      type: "cta",
      title: "Run these seven questions on me",
      text: "Thirty minutes, free, and you should be sceptical throughout. I will answer all seven, then look at your French pages and tell you what I see. You keep the findings whether or not you hire me.",
      button: "Book a free 30-min review",
      href: "https://calendly.com/mkz-consulting/30min",
    },
  ],
  faq: [
    {
      q: "What is the best French SEO agency?",
      a: "There is no single best one, and any list claiming otherwise is usually a directory monetising the query. The useful question is which partner fits your situation: a large multilingual agency if you need several languages at once, a French agency if you want depth plus capacity, an independent French consultant if you want the person doing the research to also write the content, or an in-house hire if France is a long-term core market. Judge candidates on method rather than reputation, starting with who does the French keyword research and in what language.",
    },
    {
      q: "How much should French SEO cost?",
      a: "It varies too much by scope for a meaningful benchmark, and any supplier quoting a fixed price before seeing your site is pricing a package rather than your problem. What you should insist on regardless of budget: scope, duration and deliverables stated up front, no retainer you cannot exit, and reporting you can verify in your own Search Console.",
    },
    {
      q: "Should I hire a French agency or a multilingual one?",
      a: "If France is one of several markets launching together, a multilingual agency handles the coordination better. If France is the market that specifically is not working, depth beats breadth: you want someone who thinks in French rather than someone managing French as one row among twelve. The risk with large multilingual agencies is not competence, it is attention.",
    },
    {
      q: "How do I check French content quality if I do not speak French?",
      a: "Three practical proxies. Ask for two published pages the writer produced and run them through a translator to check they read as native rather than converted. Ask whether the target keyword appears in the H1 and whether it was chosen from volume data. And check whether the page states specific facts with figures and dates, since translated content characteristically loses those.",
    },
    {
      q: "Is it worth targeting France if I already rank in English?",
      a: "Usually yes, and more cheaply than you expect, because domain-level authority earned in English carries over to a French subfolder. That is the single biggest advantage you have over a French competitor starting fresh, and it is the reason a subfolder normally beats a separate .fr domain. What it does not carry over is keyword targeting, which has to be redone in French.",
    },
  ],
  related: ["why-translation-never-ranks-in-france", "get-cited-by-ai-answers-in-french"],
};

export default article;
