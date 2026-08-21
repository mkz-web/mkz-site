// Article généré depuis _content-staging/mesurer-visibilite-ia.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "mesurer-visibilite-ia",
  "category": "referencement-ia",
  "title": "Outils GEO : comment mesurer si les IA parlent de vous",
  "metaTitle": "Outil GEO : mesurer si les IA parlent de vous",
  "metaDescription": "Outils GEO payants ou protocole gratuit ? La méthode pour mesurer votre part de voix dans ChatGPT et Perplexity, et les pièges qui faussent la mesure.",
  "datePublished": "2026-08-07",
  "dateModified": "2026-08-21",
  "readingMinutes": 9,
  "excerpt": "Il n'existe pas de Search Console pour les IA. Personne ne vous enverra de rapport disant combien de fois ChatGPT a prononcé votre nom. Voici le protocole gratuit qui vous donne ce chiffre en une heure, les pièges qui le faussent, et le moment où un outil payant devient justifié.",
  "tldr": [
    "Aucun moteur IA ne publie de rapport de visibilité. La mesure se fabrique, elle ne se reçoit pas.",
    "**Vérifier votre balisage ne prouve rien.** Des données structurées en place ne disent pas si vous êtes cité, elles disent que le balisage est en place.",
    "Le protocole gratuit tient en une heure : 10 questions clients, 3 moteurs, conversations neuves, et un tableau daté.",
    "Piège majeur : un modèle ne répond pas deux fois pareil. Une mesure unique ne vaut rien, il faut répéter chaque question au moins trois fois.",
    "Les comparatifs publiés en 2026 recensent de 10 à 20 outils GEO payants. Ils font gagner du temps, pas de la vérité : ils appliquent le même protocole, en plus grand."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "En référencement classique, la mesure est fournie : Google vous dit vos positions, vos impressions, vos clics. Vous n'avez rien à construire. Dans les moteurs IA, il n'y a **aucun équivalent**. Ni tableau de bord, ni rapport, ni position. Juste des réponses en langage naturel qui citent des entreprises, ou pas."
    },
    {
      "type": "p",
      "text": "D'où une tentation dont il faut se méfier : mesurer ce qui est facile plutôt que ce qui compte. Voir ses données structurées validées, son llms.txt en ligne, ses robots autorisés, et en conclure qu'on est visible. C'est confortable, et c'est faux."
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "La règle qui gouverne tout cet article",
      "text": "Vérifier qu'un correctif est en place n'est pas vérifier que le défaut a disparu, et seul le second compte. Un balisage parfait ne prouve pas une citation. La seule preuve valable est la réponse du moteur, capturée et datée."
    },
    {
      "type": "h2",
      "id": "ce-qu-il-faut-mesurer",
      "text": "Ce qu'il faut mesurer, et dans quel ordre"
    },
    {
      "type": "p",
      "text": "Trois indicateurs suffisent à une TPE. Le premier est le seul vraiment important, les deux autres l'expliquent."
    },
    {
      "type": "table",
      "caption": "Les trois indicateurs de visibilité IA, du plus utile au moins urgent",
      "headers": [
        "Indicateur",
        "Ce qu'il répond",
        "Comment l'obtenir"
      ],
      "rows": [
        [
          "Part de voix",
          "Sur mes questions clients, à quelle fréquence suis-je cité ?",
          "Protocole manuel ou outil payant"
        ],
        [
          "Exactitude",
          "Quand je suis cité, l'IA dit-elle vrai sur moi ?",
          "Lecture des réponses obtenues"
        ],
        [
          "Trafic venu des IA",
          "Ces citations amènent-elles des visiteurs ?",
          "Votre outil d'analyse d'audience"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Le troisième est le plus simple et personne ne le regarde. Dans votre outil de mesure d'audience, les visites venues des assistants apparaissent comme un trafic de référence, avec des noms de domaine reconnaissables tels que `chatgpt.com` ou `perplexity.ai`. C'est gratuit, c'est déjà là, et ça donne une tendance."
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "La part de voix se construit à la main. Le trafic issu des IA, lui, est déjà mesuré dans vos statistiques existantes : allez le regarder avant d'acheter quoi que ce soit."
    },
    {
      "type": "h2",
      "id": "protocole-gratuit",
      "text": "Le protocole gratuit, en une heure"
    },
    {
      "type": "p",
      "text": "Voici exactement ce que nous faisons pendant un audit, et rien ne vous empêche de le faire vous-même. Prévoyez une heure la première fois, vingt minutes les fois suivantes."
    },
    {
      "type": "ol",
      "items": [
        "**Écrivez 10 questions que vos clients poseraient vraiment.** Pas vos mots-clés : leurs phrases. « Quel couvreur à Meaux pour une toiture en tuiles ? », « Combien coûte le remplacement d'un tableau électrique en Seine-et-Marne ? ». Mélangez des questions avec votre ville et des questions sans.",
        "**Ouvrez une conversation neuve** dans ChatGPT, puis dans Perplexity, puis dans Gemini. Neuve veut dire sans historique, et idéalement sans être connecté à votre compte : sinon le moteur vous répond en fonction de ce qu'il sait de vous, pas de ce qu'il sait du marché.",
        "**Posez chaque question trois fois**, dans trois conversations différentes. C'est la règle la plus importante, et on y revient plus bas.",
        "**Notez qui est cité**, dans quel ordre, et avec quelle phrase. Copiez la réponse complète dans un document, avec la date et le moteur.",
        "**Calculez votre part de voix** : nombre de réponses où vous apparaissez, divisé par le nombre total de réponses obtenues. Dix questions, trois répétitions, trois moteurs font 90 réponses. Si vous apparaissez dans 9, votre part de voix est de 10 %.",
        "**Rejouez exactement le même protocole un mois plus tard.** Mêmes questions, mêmes moteurs, même façon de compter. C'est la comparaison qui a du sens, pas le chiffre isolé."
      ]
    },
    {
      "type": "table",
      "caption": "Tableau de suivi à recopier (exemple de mise en forme, à remplir avec vos relevés)",
      "headers": [
        "Question",
        "Moteur",
        "Cité ?",
        "Position dans la réponse",
        "Concurrents cités"
      ],
      "rows": [
        [
          "Quel couvreur à Meaux ?",
          "ChatGPT",
          "non",
          "",
          "à compléter"
        ],
        [
          "Quel couvreur à Meaux ?",
          "Perplexity",
          "oui",
          "2e sur 3",
          "à compléter"
        ],
        [
          "Prix isolation combles 77",
          "ChatGPT",
          "non",
          "",
          "à compléter"
        ]
      ]
    },
    {
      "type": "p",
      "text": "La colonne la plus instructive est la dernière. Elle vous dit qui occupe la place, et donc quoi aller regarder. Neuf fois sur dix, les entreprises citées ne sont pas les mieux référencées : ce sont les mieux documentées, au sens de notre guide [comment être cité par ChatGPT](/conseils/referencement-ia/etre-cite-par-chatgpt/)."
    },
    {
      "type": "h2",
      "id": "pieges-de-mesure",
      "text": "Les quatre pièges qui faussent la mesure"
    },
    {
      "type": "h3",
      "text": "1. Le modèle ne répond pas deux fois pareil"
    },
    {
      "type": "p",
      "text": "C'est le piège numéro un, et il invalide la plupart des mesures amateurs. Posez la même question deux fois à ChatGPT et vous obtiendrez deux réponses différentes, parfois avec des sources différentes. **Une mesure unique ne prouve rien.** D'où la règle des trois répétitions : ce que vous cherchez, c'est une fréquence, pas un oui ou un non."
    },
    {
      "type": "h3",
      "text": "2. Votre historique vous ment"
    },
    {
      "type": "p",
      "text": "Si vous interrogez un assistant depuis votre compte habituel, après avoir passé des semaines à parler de votre entreprise, il a de bonnes chances de la mentionner. Ça ne dit rien de ce qu'il répondrait à un inconnu. Conversation neuve, sans historique, et si possible en navigation privée."
    },
    {
      "type": "h3",
      "text": "3. La géolocalisation change tout"
    },
    {
      "type": "p",
      "text": "Une question locale posée depuis votre bureau et depuis Paris ne donne pas la même réponse. Si vous mesurez pour une entreprise locale, mesurez depuis sa zone, et notez-le. Sinon vous comparerez deux relevés incomparables le mois suivant."
    },
    {
      "type": "h3",
      "text": "4. Les réponses évoluent sans que vous ayez rien fait"
    },
    {
      "type": "p",
      "text": "Les modèles sont mis à jour, les index changent, un concurrent publie. Une variation d'un mois sur l'autre n'est pas forcément votre mérite ni votre faute. C'est pourquoi on garde les réponses complètes datées : elles permettent de comprendre le mouvement, pas seulement de le constater."
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "Le réflexe qui sauve",
      "text": "Conservez les captures et le texte intégral des réponses, avec leur date et le moteur. Dans six mois, c'est la seule chose qui vous permettra de dire si quelque chose a bougé, et pourquoi."
    },
    {
      "type": "cta",
      "title": "On peut faire ce relevé ensemble, gratuitement",
      "text": "Audit de 30 minutes : nous posons vos questions métier à ChatGPT, Perplexity et Google devant vous. Vous repartez avec votre part de voix de départ, les concurrents cités à votre place, et les priorités dans l'ordre.",
      "button": "Réserver mon audit gratuit",
      "href": "https://calendly.com/mkz-consulting/30min"
    },
    {
      "type": "h2",
      "id": "outils-payants",
      "text": "Et les outils GEO payants, alors ?"
    },
    {
      "type": "p",
      "text": "Le marché existe et il est actif : les comparatifs publiés en 2026 recensent couramment de 10 à 20 solutions dédiées au suivi de visibilité dans les moteurs IA, du service spécialisé au module intégré à une plateforme marketing."
    },
    {
      "type": "p",
      "text": "Ce qu'ils font est utile : ils automatisent exactement le protocole ci-dessus, mais sur des centaines de questions, plusieurs fois par jour, avec un historique propre et un suivi des concurrents. **Ils n'apportent pas une vérité différente, ils apportent du volume et de la régularité.**"
    },
    {
      "type": "table",
      "caption": "Protocole manuel ou outil payant : ce qui doit décider",
      "headers": [
        "Votre situation",
        "Ce qui suffit"
      ],
      "rows": [
        [
          "Moins de 20 requêtes métier à suivre",
          "Le protocole manuel, une fois par mois"
        ],
        [
          "Activité locale, une ou deux villes",
          "Le protocole manuel"
        ],
        [
          "Plusieurs marques, plusieurs pays, ou un secteur très concurrentiel",
          "Un outil dédié"
        ],
        [
          "Vous devez rendre des comptes à un comité",
          "Un outil dédié, pour l'historique et les exports"
        ],
        [
          "Vous ne savez pas encore quelles questions suivre",
          "Le protocole manuel, toujours : l'outil ne trouvera pas vos questions à votre place"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Le dernier cas est le plus fréquent chez les TPE, et c'est celui où l'abonnement se transforme en dépense sans effet. Un outil mesure ce que vous lui demandez de mesurer. Si vos questions ne sont pas les bonnes, il produira un joli tableau de bord faux."
    },
    {
      "type": "h2",
      "id": "que-faire-du-chiffre",
      "text": "Que faire du chiffre une fois obtenu"
    },
    {
      "type": "p",
      "text": "Une part de voix à 0 % n'est pas une catastrophe, c'est un point de départ, et c'est le cas de la grande majorité des TPE aujourd'hui. Ce qui compte, c'est ce que vous en faites."
    },
    {
      "type": "ul",
      "items": [
        "**Part de voix à 0 %, et vos concurrents non plus ne sont pas cités** : le sujet est neuf sur votre marché. C'est la meilleure situation, la place est libre.",
        "**Part de voix à 0 %, mais des concurrents cités** : allez lire leurs pages. Ils ont des faits chiffrés, vous avez des adjectifs.",
        "**Vous êtes cité, mais l'IA se trompe sur vous** : problème de cohérence entre vos sources. Alignez site, fiche Google et annuaires.",
        "**Vous êtes cité et c'est juste** : mesurez le trafic qui en découle, et étendez le protocole à plus de questions."
      ]
    },
    {
      "type": "p",
      "text": "Et surtout, ne changez qu'une chose à la fois entre deux mesures. Si vous ouvrez les robots, réécrivez vos pages et publiez un [llms.txt](/conseils/referencement-ia/llms-txt-a-quoi-ca-sert/) le même mois, vous saurez que ça a bougé, jamais grâce à quoi."
    },
    {
      "type": "p",
      "text": "Pour le socle, c'est-à-dire vérifier que les robots des IA passent et que votre balisage tient debout, notre [audit SEO + IA gratuit en ligne](/audit-seo/) fait le relevé en une minute : robots.txt réellement servi, GPTBot, ClaudeBot et PerplexityBot, llms.txt, données structurées. C'est le prérequis de la visibilité, pas sa mesure : la part de voix, elle, se compte avec le protocole ci-dessus."
    },
    {
      "type": "p",
      "text": "C'est cette discipline que nous appliquons dans notre [prestation de référencement IA (GEO)](/referencement-ia/) : un relevé de départ, une action à la fois, un relevé mensuel. Y compris quand le chiffre ne va pas dans notre sens."
    }
  ],
  "faq": [
    {
      "q": "Quels sont les meilleurs outils GEO ?",
      "a": "Il n'existe pas de meilleur outil dans l'absolu, car tous appliquent le même principe : poser automatiquement des questions aux moteurs IA et relever qui est cité. Les comparatifs publiés en 2026 recensent de 10 à 20 solutions. Pour une TPE suivant moins de vingt requêtes, un protocole manuel mensuel donne la même information sans abonnement. L'outil devient utile au-delà, ou quand un historique est exigé."
    },
    {
      "q": "Comment mesurer sa visibilité dans ChatGPT gratuitement ?",
      "a": "Écrivez dix questions que vos clients poseraient réellement, posez chacune trois fois dans des conversations neuves et sans historique, sur ChatGPT, Perplexity et Gemini, puis notez à chaque fois qui est cité. Votre part de voix est le nombre de réponses où vous apparaissez divisé par le nombre total de réponses. Rejouez le même protocole un mois plus tard pour comparer."
    },
    {
      "q": "Pourquoi les IA ne donnent-elles pas toujours la même réponse ?",
      "a": "Les modèles de langage génèrent leurs réponses avec une part de variation, et leurs sources évoluent au fil des mises à jour. La même question posée deux fois peut donc citer des entreprises différentes. C'est pour cette raison qu'une mesure unique ne prouve rien : il faut répéter chaque question au moins trois fois et raisonner en fréquence de citation, pas en présence ou absence."
    },
    {
      "q": "Peut-on voir dans ses statistiques le trafic venu des IA ?",
      "a": "Oui, et c'est le plus simple à obtenir. Dans un outil de mesure d'audience, les visites issues des assistants apparaissent comme du trafic de référence, avec des noms de domaine identifiables comme chatgpt.com ou perplexity.ai. Ce chiffre ne dit pas combien de fois vous avez été cité, seulement combien de personnes ont cliqué ensuite, mais il donne une tendance fiable et gratuite."
    },
    {
      "q": "Vérifier ses données structurées suffit-il à savoir si on est cité ?",
      "a": "Non, et c'est l'erreur la plus répandue. Des données structurées valides prouvent que votre balisage est correct, pas qu'un moteur d'intelligence artificielle vous a repris dans une réponse. Ce sont deux mesures différentes : l'une porte sur le correctif, l'autre sur le résultat. Seule la réponse du moteur, capturée et datée, prouve une citation."
    }
  ],
  "related": [
    "etre-cite-par-chatgpt",
    "geo-seo-difference",
    "llms-txt-a-quoi-ca-sert"
  ],
  "keywords": [
    "outil geo",
    "mesurer visibilité ia",
    "part de voix ia",
    "audit geo",
    "visibilité chatgpt",
    "référencement ia"
  ]
};

export default article;
