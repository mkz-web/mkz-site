// Article généré depuis _content-staging/etre-cite-par-chatgpt.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "etre-cite-par-chatgpt",
  "category": "referencement-ia",
  "title": "Comment être cité par ChatGPT, Perplexity et Gemini ?",
  "metaTitle": "Référencement ChatGPT : comment se faire citer par l'IA",
  "metaDescription": "Référencement ChatGPT : la méthode en 5 gestes pour être cité par les IA, avec la mesure avant et après. Sans jargon, pour artisans, commerçants et TPE.",
  "datePublished": "2026-08-07",
  "dateModified": "2026-08-07",
  "readingMinutes": 9,
  "excerpt": "Un client demande à ChatGPT « quel couvreur à Meaux ? ». L'IA cite deux entreprises. Ce ne sont pas forcément les mieux placées sur Google, ce sont les mieux documentées. Voici les cinq gestes qui font la différence, et comment vérifier qu'ils marchent chez vous.",
  "tldr": [
    "Une IA ne classe pas des pages, elle **choisit des sources**. Être premier sur Google aide, mais ne suffit pas.",
    "Premier geste, souvent bloquant : autoriser les robots des IA. OpenAI documente des robots distincts de celui de Google, notamment **GPTBot** pour l'exploration et **ChatGPT-User** pour la navigation (documentation OpenAI, consultée le 07/08/2026).",
    "Ce qui se fait citer, c'est un fait autonome : une phrase vraie hors de son contexte, avec un chiffre, une source et une date.",
    "La cohérence entre votre site, votre fiche Google et vos mentions ailleurs compte autant que le contenu : les modèles recoupent.",
    "Aucune de ces actions ne se juge sur le balisage. Elle se juge en posant la question à l'IA, avant et après."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "« Comment faire du référencement sur ChatGPT ? » La question revient sans arrêt, et elle contient déjà le malentendu. Sur Google, vous visez une **position** dans une liste. Dans une réponse d'IA, il n'y a pas de liste : il y a un paragraphe et deux ou trois sources nommées. Vous ne cherchez plus à être classé, vous cherchez à être **choisi**."
    },
    {
      "type": "p",
      "text": "La bonne nouvelle, c'est que les critères sont beaucoup moins mystérieux qu'on ne le dit, et qu'une TPE bien documentée passe souvent devant une grande enseigne mal documentée. Voici les cinq gestes, dans l'ordre où ils rapportent."
    },
    {
      "type": "callout",
      "variant": "definition",
      "title": "Définition",
      "text": "Le **référencement IA**, ou GEO (Generative Engine Optimization), regroupe les techniques qui font citer une entreprise comme source dans les réponses générées par ChatGPT, Perplexity, Claude, Gemini, Mistral ou les réponses IA de Google. Voir aussi notre comparatif [GEO et SEO](/conseils/referencement-ia/geo-seo-difference/)."
    },
    {
      "type": "h2",
      "id": "geste-1-ouvrir-la-porte",
      "text": "Geste 1 : vérifier que les IA ont le droit de vous lire"
    },
    {
      "type": "p",
      "text": "C'est le geste le plus ingrat et le plus rentable. Une IA qui ne peut pas accéder à votre site ne vous citera jamais, quel que soit votre contenu. Et les robots des IA ne sont pas celui de Google : ce sont des programmes distincts, avec des noms distincts, qu'on autorise ou qu'on bloque séparément."
    },
    {
      "type": "p",
      "text": "OpenAI documente publiquement plusieurs robots aux rôles différents, dont **GPTBot** pour l'exploration à grande échelle et **ChatGPT-User** pour la navigation déclenchée par un utilisateur (documentation OpenAI destinée aux développeurs, consultée le 07/08/2026). Anthropic, Perplexity et Google ont les leurs."
    },
    {
      "type": "table",
      "caption": "Les principaux robots des IA et à quoi ils servent",
      "headers": [
        "Robot",
        "Éditeur",
        "Rôle principal"
      ],
      "rows": [
        [
          "GPTBot",
          "OpenAI",
          "Exploration large, alimente les modèles"
        ],
        [
          "ChatGPT-User",
          "OpenAI",
          "Va lire une page quand un utilisateur le demande"
        ],
        [
          "ClaudeBot",
          "Anthropic",
          "Exploration pour Claude"
        ],
        [
          "PerplexityBot",
          "Perplexity",
          "Exploration pour les réponses de Perplexity"
        ],
        [
          "Google-Extended",
          "Google",
          "Contrôle l'usage de vos pages par Gemini"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Le contrôle prend deux minutes : tapez votre adresse suivie de `/robots.txt` dans votre navigateur et cherchez ces noms. Le détail de chaque robot, et le piège d'hébergement qui les bloque sans vous prévenir, sont dans notre guide [faut-il autoriser les robots des IA](/conseils/referencement-ia/autoriser-robots-ia/)."
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "Le piège le plus fréquent",
      "text": "Le fichier que vous avez écrit n'est pas toujours celui que votre serveur envoie. Certains hébergeurs et services de protection ajoutent leurs propres règles par-dessus. Jugez toujours sur le fichier réellement servi, jamais sur celui de votre projet."
    },
    {
      "type": "h2",
      "id": "geste-2-faits-autonomes",
      "text": "Geste 2 : écrire des faits qui survivent au copier-coller"
    },
    {
      "type": "p",
      "text": "Un modèle ne recopie pas votre page, il en extrait des morceaux. La question à se poser devant chaque paragraphe est donc simple : **si on le sort de son contexte, reste-t-il vrai et attribuable ?**"
    },
    {
      "type": "p",
      "text": "« Nos délais sont courts » ne survit pas. « Nous intervenons sous 48 heures sur Meaux et Dammartin-en-Goële, du lundi au vendredi » survit. La différence n'est pas le style, c'est la présence d'un fait vérifiable."
    },
    {
      "type": "table",
      "caption": "Reformuler pour être citable",
      "headers": [
        "Formulation qui ne se fait pas citer",
        "Formulation citable"
      ],
      "rows": [
        [
          "Nous sommes réactifs",
          "Devis envoyé sous 24 heures ouvrées"
        ],
        [
          "Des tarifs compétitifs",
          "Diagnostic de chaudière : 90 € TTC, déplacement inclus dans un rayon de 20 km"
        ],
        [
          "Nous avons beaucoup d'expérience",
          "Entreprise créée en 2011, 14 ans d'activité, 3 salariés"
        ],
        [
          "Nous couvrons la région",
          "Nous intervenons à Meaux, Chelles, Melun et Dammartin-en-Goële"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Trois règles pratiques : une **définition autonome** en tête de chaque section, un **chiffre avec sa source et sa date** plutôt qu'un adjectif, et une **réponse en trois phrases** juste sous chaque question posée en titre. C'est exactement ce que fait cet article, et vous pouvez vérifier."
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "Un fait sans source n'est pas une preuve, c'est une affirmation. Les modèles recoupent, et une statistique invisible ailleurs sur le web vous dessert autant qu'elle desservirait devant un client."
    },
    {
      "type": "h2",
      "id": "geste-3-coherence",
      "text": "Geste 3 : dire la même chose partout"
    },
    {
      "type": "p",
      "text": "Les moteurs IA ne se contentent pas de votre site. Ils croisent votre fiche d'établissement Google, les annuaires, la presse locale, les réseaux sociaux. Quand deux sources se contredisent sur votre adresse, vos horaires ou votre nom exact, le modèle préfère citer une entreprise sur laquelle il n'a pas de doute."
    },
    {
      "type": "ul",
      "items": [
        "**Nom exact** : la même orthographe partout, y compris la forme juridique. « Dupont Couverture » et « SARL Dupont Couvertures » sont deux entités pour une machine.",
        "**Adresse et téléphone** : identiques au caractère près, site et fiche Google comprises.",
        "**Horaires** : à jour. Une fiche qui annonce une ouverture le samedi quand le site dit l'inverse fabrique du doute.",
        "**Zone d'intervention** : écrite en toutes lettres, ville par ville, plutôt que « toute la région »."
      ]
    },
    {
      "type": "p",
      "text": "C'est aussi pour ça que le [référencement local](/conseils/seo/referencement-local/) et le référencement IA se renforcent. Une fiche Google bien tenue, avec des avis récents et détaillés, est l'une des sources que les modèles recoupent le plus volontiers pour une entreprise de proximité."
    },
    {
      "type": "cta",
      "title": "Vous voulez savoir ce que l'IA dit de vous, aujourd'hui ?",
      "text": "Audit gratuit de 30 minutes : nous interrogeons ChatGPT, Perplexity et Google sur vos requêtes métier devant vous, et vous repartez avec la liste des concurrents cités à votre place.",
      "button": "Réserver mon audit gratuit",
      "href": "https://calendly.com/mkz-consulting/30min"
    },
    {
      "type": "h2",
      "id": "geste-4-structure",
      "text": "Geste 4 : structurer pour la machine sans abîmer la lecture"
    },
    {
      "type": "p",
      "text": "Les données structurées, ou schema.org, sont un balisage invisible qui décrit votre page dans un format que les machines lisent sans se tromper : votre organisation, vos services, votre adresse, vos questions fréquentes. Ce n'est pas un supplément d'âme, c'est ce qui évite au modèle de deviner."
    },
    {
      "type": "p",
      "text": "Trois blocs suffisent pour une TPE : **Organization** (qui vous êtes), **LocalBusiness** ou **Service** (ce que vous vendez et où), **FAQPage** (vos questions fréquentes). Votre prestataire web sait les poser, et un [audit SEO](/conseils/seo/audit-seo/) vérifie qu'ils sont valides."
    },
    {
      "type": "p",
      "text": "Côté rédaction, gardez la structure lisible pour un humain : un titre par idée, des paragraphes courts, un tableau dès qu'il y a comparaison. Ce qui aide un lecteur pressé aide un modèle, parce que les deux cherchent la même chose : la réponse, vite."
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "L'erreur à ne pas commettre",
      "text": "Empiler les sigles GEO, AEO et LLMO dans vos pages ne vous fera pas citer. Les moteurs IA valorisent la clarté, pas la densité de jargon. Écrivez pour votre client, structurez pour la machine."
    },
    {
      "type": "h2",
      "id": "geste-5-mesurer",
      "text": "Geste 5 : mesurer, sinon rien de tout ça ne compte"
    },
    {
      "type": "p",
      "text": "C'est le geste que presque personne ne fait, et c'est le seul qui prouve quelque chose. **Vérifier que votre balisage est en place ne prouve pas que vous êtes cité.** Ça prouve que le balisage est en place. La seule mesure valable, c'est la réponse de l'IA elle-même."
    },
    {
      "type": "ol",
      "items": [
        "Écrivez 10 questions que vos clients poseraient vraiment, avec leur ville : « quel plombier à Meaux pour une fuite ? », « combien coûte une isolation de combles en Seine-et-Marne ? ».",
        "Posez-les à ChatGPT, Perplexity et Gemini, dans une conversation neuve, sans historique.",
        "Notez qui est cité, à quelle place, et avec quelle phrase. Copiez la réponse dans un document daté.",
        "Appliquez les quatre gestes précédents.",
        "Rejouez exactement les mêmes 10 questions un mois plus tard, et comparez. C'est votre part de voix."
      ]
    },
    {
      "type": "p",
      "text": "Le protocole complet, avec le tableau de suivi et les pièges de mesure, est détaillé dans [comment mesurer si les IA parlent de vous](/conseils/referencement-ia/mesurer-visibilite-ia/)."
    },
    {
      "type": "h2",
      "id": "combien-de-temps",
      "text": "Combien de temps avant que ça bouge ?"
    },
    {
      "type": "p",
      "text": "Soyons honnêtes sur les délais, parce que beaucoup ne le sont pas. L'ouverture des robots produit un effet en quelques semaines, le temps que les moteurs repassent. La citation régulière, elle, demande généralement plusieurs mois : le modèle doit vous avoir lu, recoupé, et jugé fiable."
    },
    {
      "type": "p",
      "text": "Et il y a un cas où le référencement IA ne vaut pas l'investissement : quand votre activité se joue à l'urgence pure, comme un dépannage de serrurerie à minuit. Là, votre client ouvre Google Maps, pas ChatGPT. Votre priorité reste la fiche Google. Nous vous le dirons plutôt que de vous vendre autre chose."
    },
    {
      "type": "p",
      "text": "Pour tout le reste, c'est-à-dire dès que le client se renseigne avant de décider, la place est encore largement libre. Notre service de [référencement IA](/referencement-ia/) commence toujours par la mesure, pas par la facture."
    }
  ],
  "faq": [
    {
      "q": "Comment faire du référencement sur ChatGPT ?",
      "a": "Il faut d'abord autoriser les robots d'OpenAI dans le fichier robots.txt réellement servi par votre serveur, puis transformer vos pages en faits extractibles seuls, avec un chiffre, une source et une date. Viennent ensuite la cohérence de vos informations sur tout le web, les données structurées schema.org, et enfin la mesure des citations obtenues, question par question, mois après mois."
    },
    {
      "q": "Comment se positionner sur le référencement naturel de ChatGPT ?",
      "a": "On ne se positionne pas dans ChatGPT comme dans Google, car il n'y a pas de classement à dix résultats. L'objectif est d'être retenu comme source dans une réponse rédigée. Le socle reste le référencement naturel, puisque les modèles puisent largement dans des pages déjà indexées, mais le travail supplémentaire porte sur la clarté des faits et la cohérence des informations."
    },
    {
      "q": "Comment se faire référencer par l'IA quand on est une petite entreprise ?",
      "a": "L'avantage des petites entreprises est que la concurrence reste faible sur les requêtes locales et métier. Il faut écrire en toutes lettres son métier, ses villes d'intervention, ses délais et ses tarifs, tenir sa fiche d'établissement Google à jour avec des avis détaillés, et vérifier que les robots des IA accèdent bien au site. Ces trois actions suffisent souvent à apparaître."
    },
    {
      "q": "Comment savoir si ChatGPT cite déjà mon entreprise ?",
      "a": "Il faut le lui demander, dans une conversation neuve et sans historique, sur les questions que poseraient vos clients réels, avec leur ville. Notez qui est cité et conservez la réponse datée. Vérifier votre balisage ou vos données structurées ne prouve rien sur les citations obtenues : seule la réponse du moteur fait foi."
    },
    {
      "q": "Faut-il abandonner le SEO pour le référencement IA ?",
      "a": "Non. Les moteurs IA sélectionnent leurs sources parmi des pages déjà indexées par les moteurs classiques, donc un site invisible sur Google reste invisible dans ChatGPT. Le référencement IA est une couche supplémentaire posée sur un socle de référencement naturel, pas un remplacement. Travailler l'un sans l'autre revient à construire un étage sans fondations."
    }
  ],
  "related": [
    "geo-seo-difference",
    "autoriser-robots-ia",
    "mesurer-visibilite-ia"
  ],
  "keywords": [
    "référencement chatgpt",
    "être cité par chatgpt",
    "seo chatgpt",
    "référencement ia",
    "GEO",
    "visibilité ia"
  ]
};

export default article;
