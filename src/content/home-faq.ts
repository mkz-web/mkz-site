/**
 * FAQ des deux accueils (14/09/2026). Source UNIQUE des questions et réponses :
 * les composants HomeContent / HomeContentEn les affichent, et JsonLd.tsx en fait
 * le FAQPage. Le texte visible et le JSON-LD sont donc identiques mot pour mot
 * (règle GSC : le moindre écart se signale). Aucune réponse ne porte un chiffre
 * qui ne soit pas sur /tarifs/ ou mesuré sur le site.
 */

export type HomeFaq = { q: string; a: string };

export const homeFaqFr: HomeFaq[] = [
  {
    q: "Combien coûte un site internet pour un artisan ?",
    a: "Chez MKZ, un site vitrine de 5 à 8 pages, textes rédigés et référencement inclus, coûte 1 490 € HT. La grille complète est publique sur la page tarifs : chaque prix est fixe, écrit, et c'est celui que vous payez.",
  },
  {
    q: "Combien de temps faut-il pour être visible sur Google ?",
    a: "Personne ne peut vous donner une date honnête sans avoir regardé votre site et votre marché. Une fiche Google bien remplie bouge en quelques semaines ; le référencement d'un site se joue en mois. D'où le diagnostic gratuit de 30 minutes, puis un plan avec des étapes datées.",
  },
  {
    q: "Vous garantissez la première page de Google ?",
    a: "Non, et méfiez-vous de ceux qui le promettent : personne ne contrôle Google. Ce que je garantis, c'est ce qui est fait chaque mois, écrit dans un devis fixe, et un point mensuel où vous voyez ce que ça donne en demandes reçues.",
  },
  {
    q: "Un consultant ou une agence : quelle différence pour moi ?",
    a: "Dans une agence, vous parlez à un commercial, puis à un chef de projet, et le travail est fait par quelqu'un que vous ne verrez jamais. Chez MKZ, la personne qui vous répond est celle qui fait le travail : des explications claires, des décisions rapides, un prix sans intermédiaire.",
  },
  {
    q: "Mon entreprise peut-elle apparaître dans ChatGPT ?",
    a: "C'est le but du référencement IA, ou GEO : que ChatGPT, Perplexity ou Gemini vous citent quand un client leur demande un artisan ou un commerce près de chez lui. Robots autorisés, faits citables, données structurées, et une mesure de vos citations avant et après.",
  },
  {
    q: "Et si je ne suis pas prêt à appeler ?",
    a: "Testez d'abord votre site avec l'outil gratuit : une minute, sans inscription, un score sur 100 et vos priorités. Ensuite, si vous voulez en parler, ce sont 30 minutes gratuites, sans engagement.",
  },
];

export const homeFaqEn: HomeFaq[] = [
  {
    q: "Can I just translate my English site into French and rank?",
    a: "No, and this is the single most common reason foreign sites fail in France. Translation carries your English keywords across; it does not carry French search demand. French users phrase queries differently, use different intent words, and often search terms that have no direct English equivalent. The work is French keyword research done in French first, then content built on what people actually type.",
  },
  {
    q: "Do you work with companies based outside France?",
    a: "Yes, that is the main use case. Typical clients are UK, US, or European companies that already perform in English and need the French market to work: an existing site to adapt, a French subfolder or subdomain to set up, hreflang to get right, and French content that reads as if it was written in French, because it was.",
  },
  {
    q: "How long does French SEO take to show results?",
    a: "Nobody can give you an honest date without looking at your site and your French competitors first. A domain that already has authority in English usually moves faster in France than a brand new one, because domain-level signals carry over. What you get from me is a free 30-minute review, then a plan with dated steps and a monthly report that shows where things stand.",
  },
  {
    q: "What is GEO and is it different from SEO?",
    a: "GEO (Generative Engine Optimization), also called AEO (Answer Engine Optimization), is being cited inside AI answers rather than ranking in a list of links. It overlaps with SEO but adds specific work: letting AI crawlers in, publishing facts that can be quoted with a figure and a date, clean schema.org, and llms.txt. It matters in France because French-language AI answers have far fewer credible sources to pick from than English ones.",
  },
  {
    q: "Are you an agency or a freelance consultant?",
    a: "MKZ is a French company with one consultant doing the work: Mickaël Leclerc. You talk to the person running your account, not an account manager. That is slower to scale and faster to decide, and it is the reason the explanations you get are in plain English, from the person who did the work.",
  },
  {
    q: "What if I am not ready to talk yet?",
    a: "Run the free audit first: it checks the site you actually serve, in about a minute, with no signup, and returns a score out of 100 with your priorities. Then, if you want to go further, the 30-minute review is free and there is no commitment.",
  },
];
