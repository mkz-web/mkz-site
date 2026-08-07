// Article généré depuis _content-staging/autoriser-robots-ia.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "autoriser-robots-ia",
  "category": "referencement-ia",
  "title": "GPTBot, ClaudeBot : faut-il autoriser les robots des IA ?",
  "metaTitle": "GPTBot, ClaudeBot : faut-il autoriser les robots IA ?",
  "metaDescription": "GPTBot, ClaudeBot, PerplexityBot : faut-il les laisser lire votre site ? Le vrai débat, le piège du robots.txt servi, et comment décider en 10 minutes.",
  "datePublished": "2026-08-07",
  "dateModified": "2026-08-07",
  "readingMinutes": 8,
  "excerpt": "Autoriser les robots des IA, c'est accepter qu'elles lisent votre contenu gratuitement. Les bloquer, c'est accepter de ne jamais être cité dans leurs réponses. Le débat mérite mieux qu'un slogan : voici de quoi trancher, avec le piège technique qui décide à votre place si vous ne regardez pas.",
  "tldr": [
    "Les robots des IA sont **distincts de celui de Google** et s'autorisent séparément, un par un, dans le fichier robots.txt.",
    "OpenAI documente publiquement des robots aux rôles différents : exploration pour l'entraînement, exploration pour la recherche, et lecture déclenchée par un utilisateur (documentation OpenAI, consultée le 07/08/2026).",
    "Conséquence peu connue : on peut **refuser l'entraînement tout en restant lisible** pour les réponses, en n'autorisant pas les mêmes robots.",
    "Le piège technique : votre hébergeur ou votre service de protection peut servir un robots.txt différent du vôtre. Constaté sur une zone Cloudflare neuve, où les robots IA sont bloqués par défaut.",
    "Pour une TPE qui cherche des clients, le calcul penche presque toujours du même côté : on ne peut pas refuser d'être lu et espérer être cité."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "La question se pose sérieusement depuis 2023, quand de nombreux sites ont commencé à bloquer GPTBot après son annonce par OpenAI (Blog du Modérateur, 5 septembre 2023). L'argument est simple : pourquoi laisser une entreprise privée aspirer un contenu qui m'a coûté du temps et de l'argent ?"
    },
    {
      "type": "p",
      "text": "L'argument inverse est tout aussi simple : un moteur qui ne peut pas vous lire ne peut pas vous citer, et vos clients, eux, posent déjà leurs questions à ces moteurs. Les deux ont raison. Ce qui tranche, ce n'est pas le principe, c'est votre modèle économique."
    },
    {
      "type": "h2",
      "id": "qui-sont-ces-robots",
      "text": "Qui sont ces robots, et pourquoi ils ne font pas tous la même chose"
    },
    {
      "type": "callout",
      "variant": "definition",
      "title": "Définition",
      "text": "Un **robot d'exploration**, ou crawler, est un programme qui parcourt automatiquement les pages web pour en collecter le contenu. Le fichier `robots.txt`, placé à la racine d'un site, indique à chaque robot ce qu'il a le droit de lire. C'est une convention respectée par les acteurs sérieux, pas un verrou technique."
    },
    {
      "type": "p",
      "text": "La nuance essentielle, et celle qui change la décision : **tous les robots d'IA ne servent pas au même usage**. OpenAI documente publiquement des agents distincts, avec des rôles séparés (documentation destinée aux développeurs, consultée le 07/08/2026)."
    },
    {
      "type": "table",
      "caption": "Les principaux robots d'IA et leur usage déclaré par leur éditeur",
      "headers": [
        "Robot",
        "Éditeur",
        "Usage déclaré",
        "Le bloquer vous fait perdre"
      ],
      "rows": [
        [
          "GPTBot",
          "OpenAI",
          "Exploration large, peut servir à entraîner les modèles",
          "Peu de visibilité directe, surtout de l'entraînement"
        ],
        [
          "OAI-SearchBot",
          "OpenAI",
          "Alimente la recherche de ChatGPT",
          "Votre affichage dans les réponses de recherche de ChatGPT"
        ],
        [
          "ChatGPT-User",
          "OpenAI",
          "Lecture déclenchée par un utilisateur, sans exploration automatique",
          "Rien de garanti : OpenAI indique que les règles du robots.txt peuvent ne pas s'appliquer"
        ],
        [
          "ClaudeBot",
          "Anthropic",
          "Exploration pour Claude",
          "Votre présence dans les réponses de Claude"
        ],
        [
          "PerplexityBot",
          "Perplexity",
          "Exploration pour Perplexity",
          "Votre présence dans les réponses de Perplexity"
        ],
        [
          "Google-Extended",
          "Google",
          "Contrôle l'usage de vos pages par Gemini",
          "Votre présence dans Gemini, sans toucher au SEO Google"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Ce découpage n'est pas une interprétation, OpenAI l'écrit noir sur blanc : chaque réglage est indépendant des autres, et un site peut autoriser OAI-SearchBot pour apparaître dans les résultats de recherche tout en interdisant GPTBot pour que son contenu ne serve pas à entraîner les modèles (documentation OpenAI destinée aux développeurs, consultée le 07/08/2026)."
    },
    {
      "type": "p",
      "text": "Deux précisions utiles de la même source. Un site qui refuse OAI-SearchBot **n'apparaîtra pas dans les réponses de recherche de ChatGPT**. Et après une modification de votre robots.txt, comptez environ **24 heures** avant que les systèmes d'OpenAI en tiennent compte : ne concluez rien le soir même."
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "Bloquer « les IA » d'un seul geste n'existe pas. Vous pouvez très bien refuser l'entraînement de vos contenus et rester parfaitement citable dans les réponses, en n'autorisant pas les mêmes robots. C'est une décision à la carte, pas un interrupteur."
    },
    {
      "type": "p",
      "text": "Bonne nouvelle au passage : **Google-Extended ne touche pas à votre référencement Google classique.** Le refuser retire vos pages de l'usage par Gemini, sans conséquence sur vos positions dans le moteur de recherche."
    },
    {
      "type": "h2",
      "id": "le-piege-du-robots-txt",
      "text": "Le piège : ce n'est pas votre fichier qui décide"
    },
    {
      "type": "p",
      "text": "Voici le point qui coûte le plus de temps aux entreprises, et il n'a rien à voir avec la stratégie. **Le fichier robots.txt que vous avez écrit n'est pas toujours celui que votre serveur envoie.** Certains hébergeurs, CDN et services de protection en injectent un par-dessus, avec leurs propres règles."
    },
    {
      "type": "p",
      "text": "Nous l'avons constaté sur une zone Cloudflare : les crawlers d'IA y sont bloqués par défaut, via un robots.txt géré par la plateforme qui remplace celui du site. L'entreprise croit autoriser les IA, son dépôt le confirme, et le serveur répond l'inverse. Le défaut est **invisible depuis le projet** : il ne se voit qu'en interrogeant l'adresse publique."
    },
    {
      "type": "ol",
      "items": [
        "Ouvrez votre navigateur et tapez votre adresse suivie de `/robots.txt`. Par exemple `https://votresite.fr/robots.txt`.",
        "Cherchez les noms du tableau ci-dessus : GPTBot, ClaudeBot, PerplexityBot, Google-Extended.",
        "Regardez ce qui les suit. `Disallow: /` veut dire interdit sur tout le site. `Allow: /` veut dire autorisé.",
        "Si aucun de ces noms n'apparaît, ils sont autorisés par défaut : l'absence de règle vaut permission.",
        "Refaites ce contrôle après chaque changement d'hébergeur, de CDN ou d'offre de sécurité. C'est là que ça bascule sans prévenir."
      ]
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "Ne jugez jamais sur le dépôt",
      "text": "Le seul fichier qui compte est celui que renvoie votre adresse publique. Un robots.txt parfait dans votre projet et un robots.txt bloquant en ligne, ça se produit, et personne ne s'en aperçoit pendant des mois."
    },
    {
      "type": "cta",
      "title": "Pas sûr de ce que votre serveur répond vraiment ?",
      "text": "Audit gratuit de 30 minutes : nous regardons ensemble votre robots.txt réellement servi, les robots autorisés, et ce que les moteurs IA répondent aujourd'hui sur votre métier.",
      "button": "Réserver mon audit gratuit",
      "href": "https://calendly.com/mkz-consulting/30min"
    },
    {
      "type": "h2",
      "id": "trancher-le-debat",
      "text": "Pillage ou visibilité : comment trancher pour votre cas"
    },
    {
      "type": "p",
      "text": "Le débat est légitime, mais il ne se tranche pas de la même façon selon ce que vous vendez. La vraie question n'est pas « est-ce que c'est juste ? », c'est **« mon contenu est-il mon produit, ou mon commercial ? »**."
    },
    {
      "type": "table",
      "caption": "Autoriser ou bloquer, selon votre activité",
      "headers": [
        "Votre situation",
        "Le contenu est",
        "Décision qui se défend"
      ],
      "rows": [
        [
          "Artisan, commerçant, TPE de services",
          "Un commercial : il fait venir des clients",
          "Autoriser largement"
        ],
        [
          "Site vitrine local",
          "Un commercial",
          "Autoriser largement"
        ],
        [
          "Média vivant de la publicité",
          "Le produit : chaque visite est un revenu",
          "Autoriser la recherche, refuser l'entraînement"
        ],
        [
          "Base de données, cours en ligne payants",
          "Le produit",
          "Bloquer, et protéger derrière une authentification"
        ],
        [
          "Site institutionnel ou associatif",
          "Une mission d'information",
          "Autoriser largement"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Pour un artisan, un commerçant ou une TPE de services, le calcul penche presque toujours du même côté. Vos pages ne se vendent pas, elles vendent. Les rendre invisibles aux moteurs IA revient à retirer votre enseigne pour éviter que les passants la photographient."
    },
    {
      "type": "p",
      "text": "Et il existe un signal intermédiaire, encore peu employé : les **Content Signals**, des directives placées dans le robots.txt qui expriment séparément votre accord pour la recherche, pour l'usage en réponse et pour l'entraînement. Notre propre fichier les publie, vous pouvez le consulter, c'est le fichier `robots.txt` de ce site."
    },
    {
      "type": "h2",
      "id": "et-si-je-bloque",
      "text": "Ce qui se passe vraiment si vous bloquez tout"
    },
    {
      "type": "p",
      "text": "Trois conséquences, dans l'ordre où elles arrivent. D'abord, vous disparaissez progressivement des réponses générées : le moteur cite ce qu'il peut lire, et il citera vos concurrents. Ensuite, vous perdez le trafic issu de ces réponses, qui reste modeste aujourd'hui mais qui grandit."
    },
    {
      "type": "p",
      "text": "Enfin, et c'est le point souvent oublié : **vous ne protégez pas grand-chose.** Le robots.txt est une convention, respectée par les acteurs identifiés, ignorée par les autres. Un contenu réellement sensible ne se protège pas par une ligne de texte, il se protège derrière une authentification."
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "La position raisonnable",
      "text": "Autorisez les robots qui alimentent les réponses, gardez la main sur ceux qui servent à l'entraînement si le principe vous gêne, et mettez derrière un mot de passe ce qui ne doit vraiment pas sortir. C'est ce que fait ce site."
    },
    {
      "type": "p",
      "text": "Une fois la porte ouverte, le travail commence : produire des faits que les moteurs peuvent reprendre. La méthode est dans notre guide [comment être cité par ChatGPT](/conseils/referencement-ia/etre-cite-par-chatgpt/), et la comparaison des deux disciplines dans [GEO et SEO](/conseils/referencement-ia/geo-seo-difference/). Pour déléguer l'ensemble, voyez notre [service de référencement IA](/referencement-ia/)."
    }
  ],
  "faq": [
    {
      "q": "Comment fonctionne GPTBot ?",
      "a": "GPTBot est le robot d'exploration d'OpenAI. Il parcourt automatiquement les pages web accessibles publiquement et collecte leur contenu, qui peut servir à améliorer les modèles de l'entreprise. Il respecte les instructions du fichier robots.txt placé à la racine d'un site, et OpenAI documente publiquement son nom d'agent afin que les éditeurs puissent l'autoriser ou le refuser explicitement."
    },
    {
      "q": "Faut-il bloquer les robots des IA sur son site ?",
      "a": "Cela dépend de ce que vous vendez. Si votre contenu sert à attirer des clients, comme sur un site d'artisan, de commerçant ou de TPE de services, le bloquer vous rend invisible dans les réponses des IA sans rien protéger d'utile. Si votre contenu est votre produit, comme une base de données ou des cours payants, le refus se défend, mais il doit s'accompagner d'une authentification."
    },
    {
      "q": "Bloquer Google-Extended fait-il perdre des positions sur Google ?",
      "a": "Non. Google-Extended contrôle l'utilisation de vos pages par les produits d'intelligence artificielle de Google, notamment Gemini. Le refuser n'a pas d'effet sur l'exploration ni sur le classement de votre site dans le moteur de recherche Google, qui utilise un robot différent. Les deux décisions sont indépendantes l'une de l'autre."
    },
    {
      "q": "Comment savoir si les robots des IA peuvent lire mon site ?",
      "a": "Tapez votre adresse suivie de /robots.txt dans un navigateur et cherchez les noms GPTBot, ClaudeBot, PerplexityBot et Google-Extended. Une ligne Disallow signifie interdit, une ligne Allow signifie autorisé, et l'absence de mention vaut autorisation. Jugez toujours sur le fichier réellement servi par votre adresse publique, jamais sur celui de votre projet, car un hébergeur peut le remplacer."
    },
    {
      "q": "L'utilisation de robots d'exploration est-elle légale ?",
      "a": "Explorer des pages accessibles publiquement est une pratique courante et ancienne du web, sur laquelle reposent les moteurs de recherche. Le fichier robots.txt reste une convention et non une protection juridique. Les questions de droit d'auteur liées à l'entraînement des modèles font l'objet de débats et de procédures en cours, donc mieux vaut consulter un juriste pour un contenu à forte valeur."
    }
  ],
  "related": [
    "etre-cite-par-chatgpt",
    "llms-txt-a-quoi-ca-sert",
    "geo-seo-difference"
  ],
  "keywords": [
    "gptbot",
    "claudebot",
    "perplexitybot",
    "robots.txt ia",
    "google-extended",
    "crawler ia"
  ]
};

export default article;
