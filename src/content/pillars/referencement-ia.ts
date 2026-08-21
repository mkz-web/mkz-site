import type { PillarPage } from "@/lib/articles/types";

// Page pilier française n°4 : le référencement IA (GEO).
//
// Écrite à la main (pas d'ingest depuis _content-staging), comme le pilier
// anglais ai-search-optimization dont elle est le pendant hreflang.
//
// Volumes France / fr mesurés via DataForSEO le 07/08/2026, en médiane des
// 6 derniers mois contre les 6 précédents (la médiane, pas la moyenne : un pic
// isolé à 90 500 sur « agence seo » en mai 2026 fausse toute moyenne) :
//   geo seo ................. 2 900/mois   +9 %    CPC  4,09 €
//   agence geo .............. 1 600/mois  +23 %    CPC 16,65 €
//   geo ia .................... 880/mois  +22 %
//   seo ia .................... 590/mois  +36 %
//   référencement ia .......... 480/mois  +50 %    CPC  9,50 €
//   formation geo ............. 355/mois  +65 %
//   consultant geo ............ 260/mois  +53 %
//   geo referencement ......... 235/mois    0 %
//   référencement chatgpt ..... 215/mois  +26 %
//
// Deux décisions qui tiennent à la mesure, pas au goût :
//
// 1. Le terme de tête est « référencement IA », pas « GEO » seul ni le jargon
//    anglais. La réponse IA de Google sur « référencement ia » ouvre elle-même
//    par « Le référencement IA, ou GEO (Generative Engine Optimization) », donc
//    le français porte la requête et l'anglais vient en glose. Et le jargon
//    anglais s'effondre sur la même période : llmo 235 → 90 (-62 %), llm seo
//    175 → 100 (-43 %), answer engine optimization 100 → 60 (-40 %).
//
// 2. « agence geo » (1 600/mois, CPC 16,65 €) est une vraie requête d'achat,
//    vérifiée en SERP le 07/08/2026 : les 10 résultats organiques sont bien du
//    Generative Engine Optimization, aucune pollution géomètre ni géographie.
//    Mais elle est tenue par Eskimoz, Noiise, CyberCité et Orange Business.
//    On ne l'attaque pas de face : la page vise « référencement IA », dont la
//    SERP est informationnelle (FranceNum en 1, puis des blogs, zéro page
//    transactionnelle d'agence en page 1), et le croisement avec le local.

const pillar: PillarPage = {
  slug: "referencement-ia",
  title: "Référencement IA : devenez la source que ChatGPT cite",
  metaTitle: "Référencement IA (GEO) : être cité par ChatGPT",
  metaDescription:
    "Référencement IA (GEO) pour artisans, commerçants et TPE : être cité par ChatGPT, Perplexity et les réponses IA de Google. Audit gratuit de 30 minutes.",
  heroBadge: "Référencement IA (GEO) · Seine-et-Marne et toute la France",
  heroLead:
    "Vos clients ne tapent plus dix mots-clés, ils posent une question. Et l'IA ne répond pas par dix liens : elle donne une réponse, avec deux ou trois sources. Nous faisons en sorte que l'une d'elles soit vous.",
  blocks: [
    {
      type: "p",
      text: "Pendant vingt ans, être visible voulait dire une chose : monter dans les dix liens bleus de Google. Aujourd'hui, un client tape sa question dans ChatGPT, Perplexity ou directement dans la réponse IA affichée en haut de Google. Il obtient un paragraphe et deux ou trois sources citées. **Les sept autres n'existent pas.**",
    },
    {
      type: "p",
      text: "Le **référencement IA**, qu'on appelle aussi GEO (Generative Engine Optimization), c'est le travail qui fait de votre entreprise l'une des sources citées. Ce n'est pas du SEO repeint : les moteurs classiques classent des pages, les moteurs IA choisissent des faits. Ce ne sont pas les mêmes critères.",
    },
    {
      type: "p",
      text: "MKZ est basée à Dammartin-en-Goële, en Seine-et-Marne, et intervient partout en France. Nous appliquons la même méthode qu'en [référencement naturel](/referencement-seo/) : zéro jargon, tarifs annoncés avant signature, résultats mesurés. Et surtout, mesurés vraiment : on vous montre les réponses des IA, pas des promesses.",
    },

    {
      type: "h2",
      id: "referencement-ia-definition",
      text: "Le référencement IA (GEO) expliqué sans jargon",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Définition",
      text: "Le **référencement IA**, ou **GEO** (Generative Engine Optimization), regroupe les techniques qui font citer une entreprise, ses contenus et ses chiffres dans les réponses générées par les intelligences artificielles : ChatGPT, Perplexity, Claude, Gemini, Mistral et les réponses IA affichées par Google.",
    },
    {
      type: "p",
      text: "Trois sigles circulent, souvent mélangés. Voilà la différence, en une ligne chacun :",
    },
    {
      type: "table",
      caption: "SEO, AEO et GEO : ce que chacun cherche à obtenir",
      headers: ["Sigle", "Objectif", "Ce que vous gagnez"],
      rows: [
        [
          "SEO",
          "Être classé dans les résultats de Google",
          "Un lien cliquable en page 1",
        ],
        [
          "AEO",
          "Fournir la réponse directe (extrait, FAQ)",
          "L'encadré en haut de page",
        ],
        [
          "GEO",
          "Être repris comme source dans une réponse générée",
          "Votre nom cité dans la réponse de l'IA",
        ],
      ],
    },
    {
      type: "p",
      text: "Vous n'avez pas à choisir. Le GEO ne remplace pas le SEO : une IA va chercher ses sources dans des pages que les moteurs ont déjà indexées. Un site invisible sur Google est invisible dans ChatGPT. Le socle reste le même, ce qui change, c'est ce qu'on met dessus.",
    },
    {
      type: "callout",
      variant: "retenir",
      title: "À retenir",
      text: "Le SEO vous fait **classer**. Le GEO vous fait **citer**. Le premier sans le second, c'est un site bien référencé dont l'IA parle sans le nommer.",
    },

    {
      type: "h2",
      id: "pourquoi-maintenant",
      text: "Pourquoi s'y mettre maintenant, et pas dans un an",
    },
    {
      type: "p",
      text: "Parce que la demande a basculé, et qu'elle a basculé en français. Volumes de recherche mensuels en France, relevés le 7 août 2026 via DataForSEO, en médiane des six derniers mois comparée aux six précédents :",
    },
    {
      type: "table",
      caption:
        "Recherches mensuelles en France, médiane sur 6 mois (mesuré le 07/08/2026, DataForSEO)",
      headers: ["Requête", "S2 2025", "S1 2026", "Évolution"],
      rows: [
        ["geo seo", "2 650", "2 900", "+9 %"],
        ["agence geo", "1 300", "1 600", "+23 %"],
        ["seo ia", "435", "590", "+36 %"],
        ["référencement ia", "320", "480", "+50 %"],
        ["consultant geo", "170", "260", "+53 %"],
        ["formation geo", "215", "355", "+65 %"],
      ],
    },
    {
      type: "p",
      text: "Sur la même période et avec la même méthode, le vocabulaire anglais recule : « llmo » passe de 235 à 90 recherches (-62 %), « llm seo » de 175 à 100 (-43 %). Autrement dit, le marché français a cessé d'apprendre le jargon et s'est mis à **chercher un prestataire**. C'est exactement le moment où il faut être là.",
    },
    {
      type: "p",
      text: "Deuxième raison, plus terre à terre : la place est encore libre. Sur la requête « référencement IA », la page 1 de Google était occupée le 7 août 2026 par un guide de FranceNum et par des articles de blog. **Aucune page de service d'agence.** Ça ne durera pas.",
    },

    {
      type: "h2",
      id: "ce-que-nous-faisons",
      text: "Ce que nous faisons concrètement pour vous faire citer",
    },
    {
      type: "h3",
      text: "1. On ouvre la porte aux robots des IA",
    },
    {
      type: "p",
      text: "Une IA ne peut pas vous citer si elle ne peut pas vous lire. GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot et Google-Extended sont des robots distincts de celui de Google, et beaucoup d'hébergeurs les bloquent **par défaut, sans vous le dire**. Nous vérifions le fichier robots.txt réellement servi par votre serveur, pas celui qui est censé s'y trouver. La nuance nous a déjà évité des mois perdus.",
    },
    {
      type: "p",
      text: "Vous pouvez d'ailleurs le vérifier sans nous : notre [audit SEO + IA gratuit en ligne](/audit-seo/) lit le robots.txt que votre site sert réellement et vous dit en une minute si GPTBot, ClaudeBot et PerplexityBot passent, et si un llms.txt est servi.",
    },
    {
      type: "h3",
      text: "2. On rend vos faits citables",
    },
    {
      type: "p",
      text: "Une IA reprend ce qu'elle peut extraire sans se tromper : une définition autonome en début de section, un chiffre avec sa source et sa date, un tableau lisible, une réponse qui tient en trois phrases. Nous réécrivons vos pages pour qu'un paragraphe pris isolément reste vrai et attribuable. C'est là que se joue l'essentiel du travail.",
    },
    {
      type: "h3",
      text: "3. On installe le balisage que les machines lisent",
    },
    {
      type: "p",
      text: "Données structurées schema.org (Organisation, Service, FAQ, fil d'Ariane), fichiers `llms.txt` et `llms-full.txt` qui présentent votre entreprise dans un format pensé pour les modèles, cohérence entre ce que dit votre site et ce que disent votre fiche Google et vos mentions ailleurs sur le web. Les IA recoupent : une incohérence, et elles préfèrent citer quelqu'un d'autre.",
    },
    {
      type: "h3",
      text: "4. On mesure si vous êtes réellement cité",
    },
    {
      type: "p",
      text: "C'est le point sur lequel nous ne transigeons pas. Poser une balise n'est pas être cité. Nous interrogeons les moteurs IA sur vos requêtes métier, nous relevons **qui est cité et à quelle fréquence**, et vous recevez cette part de voix chaque mois. Si le chiffre ne bouge pas, on vous le dit et on change de plan.",
    },
    {
      type: "callout",
      variant: "attention",
      title: "Le piège que nous refusons",
      text: "Beaucoup de prestataires vendent du GEO en montrant que le balisage est en place. C'est mesurer le pansement, pas la plaie. La seule preuve valable, c'est la réponse de l'IA elle-même, capturée et datée.",
    },

    {
      type: "cta",
      title: "Vous êtes cité, ou pas ? On peut le vérifier en 30 minutes.",
      text: "Audit gratuit et sans engagement : nous interrogeons ChatGPT, Perplexity et Google sur vos requêtes métier devant vous, et vous repartez avec la liste de ce qui vous empêche d'être repris.",
      button: "Réserver mon audit gratuit",
      href: "https://calendly.com/mkz-consulting/30min",
    },

    {
      type: "h2",
      id: "methode",
      text: "Notre méthode, en trois étapes",
    },
    {
      type: "ol",
      items: [
        "**Audit gratuit de 30 minutes** : on regarde ensemble si les robots IA accèdent à votre site, ce que les moteurs IA répondent aujourd'hui quand on les interroge sur votre métier et votre ville, et qui ils citent à votre place.",
        "**Plan d'action chiffré** : les corrections classées par effort et par impact, avec un budget annoncé avant signature. Vous savez ce que vous payez et pourquoi, ou vous partez avec le plan et vous le faites vous-même.",
        "**Exécution et mesure mensuelle** : on applique, puis on relève chaque mois votre part de voix dans les réponses IA et vos positions Google. Un point clair, sans boîte noire.",
      ],
    },

    {
      type: "h2",
      id: "pour-qui",
      text: "Est-ce que ça vaut le coup pour une TPE ?",
    },
    {
      type: "p",
      text: "Pas toujours, et nous le disons avant de facturer. Le référencement IA rapporte quand vos clients se renseignent avant d'acheter : un artisan sur un chantier à 8 000 €, un avocat, un expert-comptable, un installateur de pompes à chaleur, une entreprise qui vend à d'autres entreprises. Là, le prospect pose une question à une IA avant de décrocher son téléphone.",
    },
    {
      type: "p",
      text: "En revanche, si votre activité se joue à l'urgence et à la proximité immédiate (une serrurerie de dépannage, un dépôt de pain), votre priorité reste votre fiche Google et le [référencement local](/agence-web-77/). Nous vous le dirons plutôt que de vous vendre du GEO.",
    },
    {
      type: "callout",
      variant: "astuce",
      title: "Le bon ordre",
      text: "Site lisible et rapide, puis SEO, puis GEO. Faire du référencement IA sur un site que Google n'arrive pas à lire, c'est repeindre une façade sans fondations. Si votre site n'est pas à niveau, commencez par la [création ou la refonte](/creation-site-internet/).",
    },

    {
      type: "h2",
      id: "pourquoi-mkz",
      text: "Pourquoi nous confier votre visibilité IA",
    },
    {
      type: "ul",
      items: [
        "**On parle français.** Chaque terme technique est expliqué en une phrase. Vous ne signerez jamais pour quelque chose que vous n'avez pas compris.",
        "**On mesure, on ne déduit pas.** Un chiffre annoncé est un chiffre relevé, avec sa date et sa source. Y compris quand il ne va pas dans notre sens.",
        "**Je décroche.** Contact direct avec le fondateur, Mickaël Leclerc, ingénieur IT depuis plus de 20 ans. Pas de ticket, pas de 72 heures d'attente.",
        "**Vous restez propriétaire à 100 %.** Nom de domaine, site, contenus, comptes. On travaille ensemble parce que ça marche, pas parce que vous êtes coincé.",
        "**On applique ce qu'on vend.** Ce site publie ses propres `llms.txt`, ses données structurées, ses mesures, un [simulateur d'empreinte d'une requête IA](/empreinte-ia/) au jeu de données sourcé et versionné, et un [audit SEO + IA en libre-service](/audit-seo/) qui applique nos 17 mesures à n'importe quel site. Vous pouvez tout vérifier avant de nous appeler.",
      ],
    },
    {
      type: "p",
      text: "Nos résultats en référencement naturel, constatés sur nos clients en 2025 : **+247 % de trafic organique en moyenne**, position moyenne dans le Top 3, sites qui se chargent en 1,2 seconde. Plus de 50 entreprises accompagnées, 97 % de clients satisfaits. Le GEO s'ajoute à ce socle, il ne le remplace pas.",
    },
    {
      type: "p",
      text: "Pour creuser le sujet avant de nous parler, nos guides sont en accès libre dans le cocon [référencement IA](/conseils/referencement-ia/) de la newsroom.",
    },
  ],
  faq: [
    {
      q: "Qu'est-ce que le référencement IA ?",
      a: "Le référencement IA, aussi appelé GEO pour Generative Engine Optimization, regroupe les techniques qui font citer une entreprise et ses contenus dans les réponses générées par les intelligences artificielles comme ChatGPT, Perplexity, Claude, Gemini ou les réponses IA de Google. L'objectif n'est plus d'obtenir un lien en première page, mais d'être la source que l'IA nomme dans sa réponse.",
    },
    {
      q: "Quelle est la différence entre GEO, AEO et SEO ?",
      a: "Le SEO vise à faire classer une page dans les résultats de Google. L'AEO vise à fournir la réponse directe affichée en encadré, par exemple via une FAQ. Le GEO vise à être repris comme source dans une réponse rédigée par une intelligence artificielle. Les trois se cumulent : une IA choisit ses sources parmi des pages déjà indexées, donc le SEO reste le socle du GEO.",
    },
    {
      q: "Comment passer du SEO au GEO ?",
      a: "On ne remplace pas l'un par l'autre, on ajoute. Il faut d'abord autoriser les robots des IA dans le fichier robots.txt réellement servi, puis réécrire les pages pour que chaque fait soit extractible seul, avec un chiffre, une source et une date. Ensuite viennent les données structurées schema.org et les fichiers llms.txt. Enfin, on mesure les citations obtenues dans les moteurs IA, mois après mois.",
    },
    {
      q: "Est-ce que le référencement IA fonctionne pour une petite entreprise ?",
      a: "Oui, et souvent mieux que pour une grande, parce que la concurrence est encore faible sur les requêtes locales et métier. Le référencement IA est surtout rentable quand le client se renseigne avant d'acheter, par exemple pour des travaux, un conseil juridique ou comptable, ou une prestation technique. Pour une activité d'urgence et de proximité immédiate, la fiche Google reste prioritaire.",
    },
    {
      q: "Combien de temps avant de voir des résultats en référencement IA ?",
      a: "Les corrections techniques, comme l'accès des robots IA et les données structurées, produisent un effet en quelques semaines. La citation régulière dans les réponses générées demande généralement trois à six mois, le temps que les contenus soient explorés, recoupés et jugés fiables. Chez MKZ, la part de voix dans les moteurs IA est relevée et communiquée chaque mois.",
    },
    {
      q: "Comment savoir si ChatGPT cite déjà mon entreprise ?",
      a: "Il faut interroger les moteurs IA sur vos vraies requêtes métier et relever qui est cité, plutôt que de le déduire de votre balisage. Poser des données structurées ne prouve pas que vous êtes repris. MKZ réalise cette mesure pendant l'audit gratuit de 30 minutes, en direct, et vous repartez avec la liste des concurrents cités à votre place.",
    },
  ],
  keywords: [
    "référencement IA",
    "GEO",
    "generative engine optimization",
    "agence GEO",
    "référencement ChatGPT",
    "seo ia",
    "visibilité IA",
    "être cité par ChatGPT",
  ],
};

export default pillar;
