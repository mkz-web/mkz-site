// Article généré depuis _content-staging/llms-txt-a-quoi-ca-sert.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "llms-txt-a-quoi-ca-sert",
  "category": "referencement-ia",
  "title": "llms.txt : à quoi ça sert vraiment, et faut-il en faire un ?",
  "metaTitle": "llms.txt : à quoi ça sert vraiment ? Le point honnête",
  "metaDescription": "llms.txt : ce que c'est, qui le lit réellement aujourd'hui, comment en créer un en 10 minutes, et pourquoi ce n'est pas le raccourci qu'on vous vend.",
  "datePublished": "2026-08-07",
  "dateModified": "2026-08-08",
  "readingMinutes": 9,
  "excerpt": "Sur ce sujet, le web se partage entre « fichier miracle » et « fichier inutile ». Les deux camps ont des arguments, et vous n'avez ni le temps ni l'envie d'arbitrer. Voici ce que le fichier fait réellement aujourd'hui, ce qu'il ne fait pas, et dans quel cas les dix minutes de mise en place se justifient.",
  "tldr": [
    "Le fichier **llms.txt** est une proposition de format, publiée en septembre 2024 sur llmstxt.org : un résumé de votre site en Markdown, placé à sa racine, destiné aux modèles d'IA.",
    "Ce n'est **pas** un robots.txt : il n'autorise ni n'interdit rien, il présente et il oriente.",
    "Ce n'est pas un standard officiel. La réponse générée par Google sur cette requête indique elle-même qu'il est « encore très peu, voire jamais, sollicité par les robots d'exploration actuels » (relevé le 07/08/2026).",
    "Signal inverse à ne pas ignorer : Chrome ne se contente pas de documenter un audit llms.txt, il le **note**. Mesuré le 08/08/2026 : dans la catégorie « navigation agentique » de Lighthouse, ce fichier pèse **un tiers** du score réellement applicable.",
    "Verdict pour une TPE : dix minutes bien employées, mais **après** les chantiers qui rapportent réellement, jamais à leur place."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "Vous êtes probablement tombé sur ce nom dans un article qui promettait un raccourci vers ChatGPT. Ou dans un autre qui le qualifiait de gadget inutile. Les deux existent, souvent sur la même page de résultats, et c'est bien le problème."
    },
    {
      "type": "p",
      "text": "Réponse courte, avant le détail : **c'est un fichier utile, mal compris, et très surestimé.** Il ne vous fera pas citer par une IA. Il aide celles qui vous lisent déjà à ne pas se tromper sur qui vous êtes."
    },
    {
      "type": "h2",
      "id": "llms-txt-definition",
      "text": "Ce qu'est un fichier llms.txt, concrètement"
    },
    {
      "type": "callout",
      "variant": "definition",
      "title": "Définition",
      "text": "Le fichier **llms.txt** est un document au format Markdown placé à la racine d'un site, qui résume ce que fait ce site et liste ses pages importantes, pour que les modèles d'IA le comprennent sans avoir à explorer tout le HTML. La proposition a été publiée en septembre 2024 sur llmstxt.org."
    },
    {
      "type": "p",
      "text": "La structure tient en quatre éléments : un titre en H1 avec le nom du site, un bloc de citation qui résume l'activité en deux phrases, des sections en Markdown, et des listes de liens annotés vers les pages clés. Rien de plus. Vous pouvez en lire un tout de suite : celui de ce site est publié à l'adresse `/llms.txt`."
    },
    {
      "type": "p",
      "text": "Une variante existe, `llms-full.txt`, qui reprend non pas les liens mais **le contenu intégral** en texte brut. C'est celle qui a le plus de sens pour un site éditorial : elle donne aux modèles la matière citable directement, chiffres et dates compris."
    },
    {
      "type": "h2",
      "id": "difference-robots-txt",
      "text": "La confusion à dissiper : llms.txt n'est pas robots.txt"
    },
    {
      "type": "p",
      "text": "C'est le malentendu le plus répandu, et il conduit à de mauvaises décisions. Les deux fichiers vivent au même endroit et parlent aux mêmes machines, mais ils ne font pas du tout la même chose."
    },
    {
      "type": "table",
      "caption": "robots.txt et llms.txt : deux fichiers, deux rôles",
      "headers": [
        "",
        "robots.txt",
        "llms.txt"
      ],
      "rows": [
        [
          "Ce qu'il fait",
          "Autorise ou interdit l'accès",
          "Présente et résume le site"
        ],
        [
          "Ce qu'il dit",
          "« Tu as le droit de lire ceci »",
          "« Voici qui je suis et ce qui compte »"
        ],
        [
          "Statut",
          "Convention ancienne, respectée par tous",
          "Proposition récente, adoption incertaine"
        ],
        [
          "Si vous ne l'avez pas",
          "Tout est autorisé par défaut",
          "Il ne se passe rien de particulier"
        ],
        [
          "Effet sur la citation",
          "Bloquant : sans accès, aucune citation",
          "Facilitateur, jamais déclencheur"
        ]
      ]
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "Le robots.txt ouvre la porte, le llms.txt met un panneau dans l'entrée. Si la porte est fermée, le panneau ne sert à rien. C'est pour cette raison que le premier chantier reste [l'autorisation des robots des IA](/conseils/referencement-ia/autoriser-robots-ia/)."
    },
    {
      "type": "h2",
      "id": "qui-le-lit-vraiment",
      "text": "Qui le lit réellement aujourd'hui ?"
    },
    {
      "type": "p",
      "text": "Voilà la partie que les articles promotionnels évitent. Aucun grand éditeur d'IA ne s'est engagé à utiliser ce fichier, et plusieurs analyses concluent qu'il est très peu sollicité en pratique. Une étude publiée par SeoMix le 16 juin 2026 va jusqu'à le qualifier d'inutile pour le référencement IA, test à l'appui."
    },
    {
      "type": "p",
      "text": "Plus parlant encore : quand on interroge Google sur « llms.txt », sa propre réponse générée indique qu'il s'agit d'une convention émergente et non d'un standard officiel, et que le fichier est « encore très peu, voire jamais, sollicité par les robots d'exploration actuels » (relevé le 07/08/2026). Difficile d'être plus clair."
    },
    {
      "type": "p",
      "text": "Le signal inverse mérite pourtant d'être noté, parce qu'il ne vient pas d'une déclaration d'intention mais d'un outil qui tranche : **Chrome ne se contente pas de documenter un audit llms.txt, il le note.** Nous avons fait tourner la catégorie « Agentic Browsing » de Lighthouse 13.4.1 sur ce site, en Chrome 151, le 08/08/2026. L'audit `llms-txt` existe, il s'exécute, il rend un verdict binaire, et sur mkz-consulting.fr il passe. Ce n'est plus une ligne de documentation, c'est une note."
    },
    {
      "type": "p",
      "text": "Le détail compte plus que l'existence de l'audit. Cette catégorie contient six contrôles, mais trois portent sur WebMCP, un standard encore en incubation : ils sortent en « non applicable », avec un poids de zéro, tant que le site ne déclare aucun outil. Restent trois contrôles qui pèsent réellement : l'arbre d'accessibilité, la stabilité visuelle de la page, et llms.txt. **Autrement dit, dans le seul score que Google publie aujourd'hui sur la préparation d'un site aux agents IA, ce fichier compte pour un tiers.**"
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "Un piège de mesure va avec",
      "text": "Cette catégorie exige Chrome 150 ou plus. Lancée sur une version antérieure, elle renvoie un résultat qui a toutes les apparences de la validité. Le 07/08/2026, le même site à la même heure était noté 1 sur 1 par un Lighthouse tiers tournant en Chrome 132 en mode ordinateur, et pris en défaut par notre Chrome 151 en mode mobile. Si vous faites vérifier ce point par un prestataire, demandez-lui la version de Chrome utilisée, pas seulement le score.",
      "items": []
    },
    {
      "type": "p",
      "text": "Reste que tout cela mesure la **présence** du fichier, pas son **effet**. Un contrôle qui vérifie qu'un fichier existe ne dit rien de ce qu'il rapporte. C'est la distinction que la plupart des articles sur le sujet ne font jamais, et c'est pourtant la seule qui vous intéresse."
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "Ce que ça veut dire pour vous",
      "text": "Personne ne peut aujourd'hui vous promettre un gain de citations grâce à ce fichier. Nous en publions un sur ce site, et nous n'avons à ce jour relié aucune hausse de citations à sa présence. Nous préférons vous le dire plutôt que de vous vendre une certitude que nous n'avons pas.",
      "items": []
    },
    {
      "type": "h2",
      "id": "comment-en-creer-un",
      "text": "Comment en créer un en dix minutes"
    },
    {
      "type": "p",
      "text": "Si vous décidez d'y aller, autant le faire correctement. C'est un fichier texte, vous n'avez besoin d'aucun outil payant ni d'aucune extension."
    },
    {
      "type": "ol",
      "items": [
        "Ouvrez un éditeur de texte simple. Créez un fichier nommé exactement `llms.txt`.",
        "Première ligne : `# ` suivi du nom de votre entreprise.",
        "Ligne suivante : `> ` suivi de deux phrases qui disent ce que vous faites, pour qui, et où. Écrivez-les comme vous les diriez à un client.",
        "Ajoutez une section `## Pages clés` avec vos pages importantes, une par ligne : un tiret, le titre entre crochets, l'adresse complète entre parenthèses, puis deux-points et une phrase disant à quoi sert la page.",
        "Ajoutez une section `## Contact` avec vos coordonnées et votre zone d'intervention, en toutes lettres.",
        "Déposez le fichier à la racine de votre site, de façon qu'il réponde à `votresite.fr/llms.txt`. Vérifiez dans un navigateur qu'il s'affiche bien en texte brut."
      ]
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "Le bon réflexe si votre site est généré",
      "text": "Sur un site moderne, faites générer ce fichier au moment de la construction, à partir de vos contenus réels. Un llms.txt écrit une fois à la main devient faux au premier article publié, et un fichier faux vaut moins que pas de fichier du tout."
    },
    {
      "type": "p",
      "text": "Dernier détail qui compte : signalez son existence par un commentaire dans votre `robots.txt`. Ça ne coûte rien et ça donne une chance à un robot de le trouver."
    },
    {
      "type": "cta",
      "title": "Vous préférez que quelqu'un s'en occupe ?",
      "text": "Audit gratuit de 30 minutes : on regarde votre robots.txt réellement servi, vos données structurées, et ce que les moteurs IA répondent aujourd'hui sur votre métier. Vous repartez avec les priorités, dans l'ordre.",
      "button": "Réserver mon audit gratuit",
      "href": "https://calendly.com/mkz-consulting/30min"
    },
    {
      "type": "h2",
      "id": "faut-il-en-faire-un",
      "text": "Alors, faut-il en faire un ?"
    },
    {
      "type": "p",
      "text": "Notre position, assumée : **oui, mais en dernier.** Le rapport entre l'effort et le gain est correct, dix minutes contre un bénéfice possible, à condition de ne pas confondre l'ordre des priorités."
    },
    {
      "type": "table",
      "caption": "Où placer le llms.txt dans vos priorités",
      "headers": [
        "Priorité",
        "Chantier",
        "Effet sur les citations IA"
      ],
      "rows": [
        [
          "1",
          "Autoriser les robots des IA",
          "Bloquant : sans ça, rien n'est possible"
        ],
        [
          "2",
          "Écrire des faits citables, chiffrés et datés",
          "Élevé et mesurable"
        ],
        [
          "3",
          "Cohérence site, fiche Google, annuaires",
          "Élevé"
        ],
        [
          "4",
          "Données structurées schema.org",
          "Moyen"
        ],
        [
          "5",
          "llms.txt et llms-full.txt",
          "Incertain à ce jour"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Si votre site n'a pas encore franchi les étapes 1 à 3, poser un llms.txt revient à mettre une plaque en cuivre sur une porte qui n'ouvre pas. Commencez par [être cité par ChatGPT](/conseils/referencement-ia/etre-cite-par-chatgpt/), qui détaille les gestes qui pèsent vraiment."
    },
    {
      "type": "p",
      "text": "Et surtout, mesurez. Un fichier posé n'est pas un résultat obtenu : la seule preuve valable reste la réponse de l'IA elle-même, avant et après. Le protocole est dans [comment mesurer si les IA parlent de vous](/conseils/referencement-ia/mesurer-visibilite-ia/), et notre [accompagnement en référencement IA](/referencement-ia/) part toujours de là."
    }
  ],
  "faq": [
    {
      "q": "Qu'est-ce que le fichier llms.txt ?",
      "a": "Le fichier llms.txt est un document au format Markdown placé à la racine d'un site web, qui présente en quelques lignes ce que fait ce site et liste ses pages importantes. Il est destiné aux modèles d'intelligence artificielle, pour leur éviter d'explorer tout le code HTML avant de comprendre l'activité. La proposition de format a été publiée en septembre 2024 sur le site llmstxt.org."
    },
    {
      "q": "Quelle est la différence entre llms.txt et robots.txt ?",
      "a": "Le robots.txt autorise ou interdit l'accès des robots à un site, c'est une permission. Le llms.txt ne bloque ni n'autorise rien : il présente le site et oriente vers ses pages importantes, c'est une présentation. Si le robots.txt interdit l'accès, le llms.txt ne sert à rien, puisque le robot n'entrera pas. Les deux fichiers sont complémentaires et ne se remplacent pas."
    },
    {
      "q": "Le fichier llms.txt est-il vraiment utile pour le référencement IA ?",
      "a": "Son utilité reste incertaine à ce jour. Aucun grand éditeur d'intelligence artificielle ne s'est engagé à l'utiliser, et plusieurs analyses publiées en 2026 concluent qu'il est très peu sollicité par les robots d'exploration. Il ne fait pas de mal, coûte peu de temps, mais il ne remplace en aucun cas l'accès des robots, la qualité des contenus et la cohérence des informations."
    },
    {
      "q": "Comment créer un fichier llms.txt ?",
      "a": "Créez un fichier texte nommé llms.txt, commencez par un titre en Markdown avec le nom de votre entreprise, ajoutez un bloc de citation résumant votre activité en deux phrases, puis des sections listant vos pages clés et vos coordonnées. Déposez-le à la racine du site pour qu'il réponde à votre adresse suivie de llms.txt. Sur un site généré, faites-le produire automatiquement à la construction."
    },
    {
      "q": "Qu'est-ce que le fichier llms-full.txt ?",
      "a": "Le fichier llms-full.txt est la variante étendue du llms.txt. Au lieu de lister des liens vers les pages, il reprend le contenu intégral du site en texte brut, articles compris. Il présente surtout un intérêt pour les sites éditoriaux, car il fournit directement aux modèles la matière citable, avec les chiffres, les sources et les dates, sans exploration supplémentaire."
    }
  ],
  "related": [
    "autoriser-robots-ia",
    "etre-cite-par-chatgpt",
    "mesurer-visibilite-ia"
  ],
  "keywords": [
    "llms.txt",
    "llms txt",
    "fichier llms txt",
    "llms-full.txt",
    "référencement ia",
    "GEO"
  ]
};

export default article;
