// Article généré depuis _content-staging/pourquoi-mon-site-n-apparait-pas-sur-google.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "pourquoi-mon-site-n-apparait-pas-sur-google",
  "category": "seo",
  "title": "Pourquoi mon site n'apparaît pas sur Google ? 7 causes à vérifier dans l'ordre",
  "metaTitle": "Pourquoi mon site n'apparaît pas sur Google ? 7 causes",
  "metaDescription": "Votre site n'apparaît pas sur Google ? Les 7 causes documentées par Google, dans l'ordre où les vérifier, et le test gratuit qui dit laquelle vous bloque.",
  "datePublished": "2026-09-03",
  "dateModified": "2026-09-03",
  "readingMinutes": 9,
  "excerpt": "Vous avez payé un site, il est en ligne, et quand vous tapez votre nom dans Google, rien. Pas de panique : dans la plupart des cas, un site absent n'est pas puni, il est inconnu de Google ou bloqué par un réglage. Voici les **sept causes** que Google documente lui-même, dans l'ordre où les vérifier, et un test gratuit pour trouver la vôtre.",
  "tldr": [
    "Un site en ligne n'est pas un site connu de Google : la page officielle « Inclure votre site Web sur Google » prévient que « quelques semaines peuvent être nécessaires » pour qu'un nouveau site soit détecté (Search Central, avril 2026).",
    "Le test de 10 secondes : tapez site:votre-domaine.fr dans Google. Aucun résultat = le site n'est pas indexé (causes 1 à 7). Des résultats, mais pas vous en première page = un problème de classement, pas d'indexation.",
    "Les sept causes, dans l'ordre : site trop récent, aucun lien vers le site, balise noindex, blocage par robots.txt, contenu en double (avec et sans www), erreur serveur ou pare-feu, action manuelle. Presque toutes se règlent sans payer.",
    "L'outil officiel est gratuit : la Search Console, son outil d'inspection d'URL et le bouton « Demander une indexation », dont Google annonce le délai : « jusqu'à une ou deux semaines »."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "Si votre **site n'apparaît pas sur Google**, c'est presque toujours pour l'une de ces sept raisons : le site est trop récent, aucune page ne renvoie vers lui, une balise « noindex » le cache, le fichier robots.txt bloque Google, une autre version du site (avec ou sans www) a été retenue, le serveur répond en erreur, ou, plus rarement, Google a pris une action manuelle. Chacune se vérifie en quelques minutes, dans cet ordre, avec des outils gratuits."
    },
    {
      "type": "p",
      "text": "C'est l'appel que nous recevons le plus souvent : « J'ai payé un site il y a deux mois, il est introuvable, je me suis fait avoir ? » Presque jamais. Le site existe ; Google ne le sait pas encore, ou quelqu'un lui a dit de ne pas le lire. Avant de rappeler votre prestataire, faites le test qui suit."
    },
    {
      "type": "h2",
      "id": "le-test-de-10-secondes",
      "text": "D'abord, le test de 10 secondes : absent, ou juste mal classé ?"
    },
    {
      "type": "callout",
      "variant": "definition",
      "text": "L'**indexation**, c'est l'entrée de vos pages dans l'annuaire de Google. Une page non indexée ne peut apparaître nulle part, quel que soit le mot tapé. Une page indexée peut apparaître, mais pas forcément en première page : c'est alors une question de **classement**, un autre chantier."
    },
    {
      "type": "p",
      "text": "Google recommande lui-même la méthode : « recherchez votre site sur Google en soumettant une requête comme la suivante : site:example.com » (Search Central, avril 2026). Tapez donc `site:votre-domaine.fr`, sans espace après les deux-points, dans la barre de recherche Google."
    },
    {
      "type": "ul",
      "items": [
        "**Aucun résultat** : votre site n'est pas indexé. Descendez la liste des sept causes, dans l'ordre.",
        "**Des résultats sur votre nom, rien sur votre métier** : le cas le plus fréquent, et le plus normal. Votre site existe pour Google ; il lui manque des pages qui répondent aux recherches de vos clients. Ce n'est pas un problème technique : lisez [comment apparaître sur Google](/conseils/seo/comment-apparaitre-sur-google/) et le [plan SEO de l'artisan](/conseils/seo/seo-artisan/).",
        "**Des résultats, mais pas vous en première page sur « métier + ville »** : le site est indexé mais mal classé. Là encore, ce n'est pas l'indexation qu'il faut réparer, c'est le contenu et la notoriété."
      ]
    },
    {
      "type": "p",
      "text": "Pour une page précise plutôt que le site entier, l'outil d'inspection d'URL de la Search Console « fournit des informations sur la version indexée par Google d'une page spécifique », et dit pourquoi elle ne l'est pas. Pas encore de compte ? Notre tutoriel pour [connecter son site à la Search Console](/conseils/tutoriels/connecter-site-google-search-console/) prend 15 minutes, captures d'écran à l'appui."
    },
    {
      "type": "h2",
      "id": "cause-1-site-trop-recent",
      "text": "Cause 1 : votre site est trop récent (et Google prévient)"
    },
    {
      "type": "p",
      "text": "La page « Inclure votre site Web sur Google » le dit sans détour parmi les raisons d'absence : « Vous venez de mettre en ligne un nouveau site, et nous n'avons pas encore eu le temps de l'explorer ». Le rapport d'indexation de la Search Console précise qu'« il faut jusqu'à une semaine pour que Google commence à explorer et à indexer une nouvelle page ou un nouveau site », puis « quelques semaines (au maximum) » pour explorer le site (aide Search Console, 2026)."
    },
    {
      "type": "p",
      "text": "Que faire : rien contre le temps, tout contre l'attente passive. Déclarez le site dans la Search Console, envoyez le sitemap (le plan du site), et demandez l'indexation de la page d'accueil. Google est clair : « l'indexation n'est jamais instantanée, même lorsque vous envoyez une demande d'exploration directement », et « l'indexation peut prendre jusqu'à une ou deux semaines »."
    },
    {
      "type": "h2",
      "id": "cause-2-aucun-lien-vers-votre-site",
      "text": "Cause 2 : personne ne renvoie vers votre site, Google ne l'a pas trouvé"
    },
    {
      "type": "p",
      "text": "Google découvre les pages en suivant des liens. Sa documentation est nette : « Google doit être en mesure de trouver une page pour l'explorer », et la première raison d'absence qu'elle liste est « Aucun autre site ne renvoie vers le vôtre ». Un site tout neuf, sans lien depuis votre fiche Google, sans annuaire, sans réseau social, est une île que personne n'a signalée."
    },
    {
      "type": "ol",
      "items": [
        "Renseignez l'adresse de votre site dans votre **fiche d'établissement Google** (champ « Site Web ») : c'est le premier lien, et le plus utile. Pas encore de fiche ? Notre [tutoriel fiche Google](/conseils/tutoriels/creer-fiche-google-business-profile/) la crée en 30 minutes.",
        "Envoyez le **sitemap** dans la Search Console : Google recommande cette méthode « pour demander l'indexation de nombreuses pages nouvelles ou mises à jour ».",
        "Faites-vous citer par les **annuaires de votre métier** et de votre ville, avec les mêmes nom, adresse et téléphone que sur la fiche (étape 4 de notre [guide du référencement local](/conseils/seo/referencement-local/))."
      ]
    },
    {
      "type": "h2",
      "id": "cause-3-balise-noindex",
      "text": "Cause 3 : une balise « noindex » oubliée (le classique après une refonte)"
    },
    {
      "type": "callout",
      "variant": "definition",
      "text": "La balise **noindex** est une instruction cachée dans le code d'une page qui dit aux moteurs : « ne mettez pas cette page dans vos résultats ». Google explique qu'elle « permet d'empêcher l'indexation du contenu par les moteurs de recherche qui acceptent la règle noindex, tels que Google » (Search Central, décembre 2025)."
    },
    {
      "type": "p",
      "text": "Pendant la construction d'un site, le prestataire coche souvent, sous WordPress, l'option « Demander aux moteurs de recherche de ne pas indexer ce site » pour que la version en chantier reste invisible. S'il oublie de la décocher à la mise en ligne, le site est parfait, en ligne, et interdit d'annuaire. C'est un grand classique après une [refonte de site](/conseils/creation-site-internet/refonte-site-internet/)."
    },
    {
      "type": "p",
      "text": "Comment vérifier : sur votre page d'accueil, affichez le code source (Ctrl+U sur un ordinateur) et cherchez le mot « noindex ». S'il apparaît dans une ligne qui commence par « meta name=\"robots\" », c'est lui. Notre [scan gratuit](/audit-seo/) lit cette balise et l'en-tête équivalent envoyé par le serveur (X-Robots-Tag), en même temps que le reste."
    },
    {
      "type": "h2",
      "id": "cause-4-robots-txt",
      "text": "Cause 4 : le fichier robots.txt ferme la porte"
    },
    {
      "type": "p",
      "text": "Le fichier **robots.txt** est un petit fichier texte à la racine de votre site (votre-domaine.fr/robots.txt) qui indique aux robots des moteurs quelles parties ne pas explorer. Le rapport d'indexation de la Search Console liste la cause telle quelle : « Cette page a été bloquée par le fichier robots.txt de votre site ». Une ligne « Disallow: / » et tout le site est fermé."
    },
    {
      "type": "p",
      "text": "Nuance utile, donnée par Google : ce fichier gère le trafic d'exploration mais « ne sert pas à empêcher qu'une page Web figure dans les résultats de recherche Google ». Une page bloquée peut donc apparaître sans description utile, ce qui n'est guère mieux. Pour vérifier : ouvrez le fichier dans votre navigateur ; le scan gratuit le lit tel qu'il est réellement servi, et signale aussi les robots des IA qu'il bloque."
    },
    {
      "type": "cta",
      "title": "Quelle cause vous bloque ? Le scan répond en 60 secondes",
      "text": "Balise noindex, robots.txt, site accessible en double, page 404, sitemap : des mesures faites sur votre site au moment où vous cliquez, gratuitement et sans inscription.",
      "button": "Scanner mon site",
      "href": "/audit-seo/"
    },
    {
      "type": "h2",
      "id": "cause-5-deux-versions-du-meme-site",
      "text": "Cause 5 : deux versions du même site (avec et sans www, http et https)"
    },
    {
      "type": "p",
      "text": "Pour Google, votre-domaine.fr, www.votre-domaine.fr, http:// et https:// sont quatre adresses. Si elles répondent toutes sans se rediriger vers une seule, Google choisit lui-même : « Google n'indexe pas les copies en double d'une page » et retient une version dite **canonique**, c'est-à-dire l'adresse officielle. « Les pages en double et les versions alternatives ne devraient pas être indexées » (aide Search Console, 2026)."
    },
    {
      "type": "p",
      "text": "Le symptôme : le test `site:` renvoie des résultats, mais sous une adresse qui n'est pas celle que vous communiquez. La correction : une seule adresse, les trois autres redirigées vers elle de façon permanente (redirection dite 301), un réglage de quelques minutes chez l'hébergeur. Le scan gratuit teste justement ces quatre variantes et signale un « site accessible en double »."
    },
    {
      "type": "h2",
      "id": "cause-6-erreur-serveur-ou-pare-feu",
      "text": "Cause 6 : le serveur répond en erreur, ou l'hébergeur bloque Google"
    },
    {
      "type": "p",
      "text": "Deux cas, documentés dans le même rapport d'indexation. Le premier : « Votre serveur a renvoyé une erreur de type 500 lorsque la page a été demandée ». Google précise qu'« une erreur de serveur signifie que Googlebot n'a pas réussi à accéder à votre URL », parce que le délai d'attente a été dépassé ou que le site était occupé. Un hébergement saturé ou une extension WordPress cassée suffisent."
    },
    {
      "type": "p",
      "text": "Le second : un pare-feu ou une protection anti-attaque mal réglée chez l'hébergeur. Google écrit qu'ils « peuvent alors bloquer Googlebot et empêcher l'exploration de votre site Web », et ajoute : « Si vous ne gérez pas le pare-feu vous-même, vous devez vous adresser à votre fournisseur d'hébergement ». Le site fonctionne pour vous, pas pour Google. L'outil d'inspection d'URL le montre : Googlebot n'a pas réussi à accéder à la page."
    },
    {
      "type": "h2",
      "id": "cause-7-action-manuelle",
      "text": "Cause 7 : une action manuelle de Google (rare, et vérifiable en une minute)"
    },
    {
      "type": "p",
      "text": "C'est la seule vraie « punition », et elle est rare pour un site d'artisan ou de commerçant. Google explique qu'une **action manuelle** est déclenchée « lorsqu'un examinateur manuel de l'équipe Google détermine que des pages d'un site ne respectent pas les Règles Google concernant le spam », et que « la plupart de ces problèmes entraînent une rétrogradation des pages ou des sites dans les résultats de recherche, ou leur suppression » (aide Search Console, 2026)."
    },
    {
      "type": "p",
      "text": "Vérifier prend une minute : dans la Search Console, le rapport consacré aux actions manuelles. Si tout est vert, ce n'est pas votre cause. Si une action est listée, Google indique ce qu'il reproche (contenu copié, liens artificiels, textes cachés) : on corrige, puis on demande un réexamen depuis le même écran."
    },
    {
      "type": "h2",
      "id": "les-7-causes-en-un-tableau",
      "text": "Les sept causes en un tableau : symptôme, vérification, correction"
    },
    {
      "type": "table",
      "caption": "Pourquoi un site n'apparaît pas sur Google : le récapitulatif",
      "headers": [
        "Cause",
        "Le symptôme",
        "Où vérifier (gratuit)",
        "La correction"
      ],
      "rows": [
        [
          "1. Site trop récent",
          "Mis en ligne depuis moins d'un mois",
          "site:votre-domaine.fr ; Search Console",
          "Déclarer le site, envoyer le sitemap, demander l'indexation ; attendre 1 à 2 semaines"
        ],
        [
          "2. Aucun lien vers le site",
          "Site neuf, aucune fiche ni annuaire ne le mentionne",
          "Champ « Site Web » de la fiche Google",
          "Lien depuis la fiche, sitemap, annuaires du métier"
        ],
        [
          "3. Balise noindex",
          "Site en ligne, jamais apparu, souvent après refonte",
          "Code source (Ctrl+U) ; scan gratuit",
          "Décocher l'option WordPress ou retirer la balise, puis demander l'indexation"
        ],
        [
          "4. robots.txt bloquant",
          "Pages listées sans titre, ou absentes",
          "votre-domaine.fr/robots.txt ; scan gratuit",
          "Retirer « Disallow: / », garder les blocages utiles (admin)"
        ],
        [
          "5. Site en double",
          "Le site apparaît sous une autre adresse (www, http)",
          "Test site: ; scan gratuit (variantes)",
          "Une adresse officielle, redirections permanentes des trois autres"
        ],
        [
          "6. Erreur serveur ou pare-feu",
          "Site lent ou en erreur par moments ; Googlebot bloqué",
          "Outil d'inspection d'URL : « inaccessible »",
          "Hébergeur : corriger l'erreur, autoriser Googlebot"
        ],
        [
          "7. Action manuelle",
          "Site connu, disparu d'un coup",
          "Search Console : rapport des actions manuelles",
          "Corriger le reproche, demander un réexamen"
        ]
      ]
    },
    {
      "type": "h2",
      "id": "fiche-google-qui-n-apparait-pas",
      "text": "Et si c'est votre fiche Google qui n'apparaît pas sur Maps ?"
    },
    {
      "type": "p",
      "text": "Même logique, autres réglages. Une fiche absente de Google Maps est presque toujours **non validée** (Google annonce que l'examen « peut prendre jusqu'à cinq jours ouvrés », et que par courrier « la plupart des codes arrivent sous 14 jours »), **suspendue** (nom truffé de mots-clés, adresse de domiciliation, doublon), ou simplement trop loin du client qui cherche : Google classe les fiches selon « la pertinence, la distance et la popularité ». Notre [tutoriel fiche Google](/conseils/tutoriels/creer-fiche-google-business-profile/) traite la validation et les suspensions étape par étape."
    },
    {
      "type": "h2",
      "id": "indexe-mais-invisible",
      "text": "Indexé mais invisible : ce n'est plus un problème d'indexation"
    },
    {
      "type": "p",
      "text": "Si le test `site:` renvoie vos pages, Google vous connaît. Ce qui vous manque, c'est le classement, qui repose sur trois leviers : la **technique** (site rapide, lisible sur mobile, sécurisé), le **contenu** (une page par métier et par ville, avec de vraies photos et de vrais textes) et la **popularité** (avis, liens, mentions). Notre [guide de l'audit SEO](/conseils/seo/audit-seo/) donne dix points de contrôle gratuits, et [comment apparaître sur Google gratuitement](/conseils/seo/comment-apparaitre-sur-google/) déroule les cinq gestes dans l'ordre."
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "Test site: d'abord. Aucun résultat : une des sept causes, presque toutes gratuites à corriger, et des délais que Google publie (une à deux semaines après une demande d'indexation). Des résultats : c'est le classement qu'il faut travailler, pas l'indexation."
    },
    {
      "type": "cta",
      "title": "Toujours introuvable ? On regarde ensemble",
      "text": "Trente minutes gratuites avec Mickaël : on ouvre votre Search Console, on identifie la cause exacte et vous repartez avec la correction à faire, ou faite avec vous. Sans engagement.",
      "button": "Réserver mes 30 minutes gratuites",
      "href": "https://calendly.com/mkz-consulting/30min"
    }
  ],
  "faq": [
    {
      "q": "Comment faire pour que mon site apparaisse sur Google ?",
      "a": "Déclarez-le dans la Google Search Console, envoyez son sitemap et demandez l'indexation de la page d'accueil avec l'outil d'inspection d'URL. Ajoutez l'adresse du site à votre fiche d'établissement Google et faites-le citer par les annuaires de votre métier. Google annonce jusqu'à une semaine pour commencer l'exploration et une à deux semaines pour indexer une page demandée."
    },
    {
      "q": "Pourquoi mon site web est-il introuvable sur Google ?",
      "a": "Sept causes couvrent presque tous les cas : le site est trop récent, aucun autre site ne renvoie vers lui, une balise noindex le cache, le fichier robots.txt bloque Google, une autre version du site (avec ou sans www) a été retenue, le serveur répond en erreur ou l'hébergeur bloque Googlebot, ou Google a pris une action manuelle. Le test site:votre-domaine.fr dit d'abord s'il est indexé."
    },
    {
      "q": "Que faire si mon site web ne s'affiche pas ?",
      "a": "Commencez par taper site:votre-domaine.fr dans Google. Sans résultat, vérifiez dans l'ordre : l'ancienneté du site, la présence d'un lien depuis votre fiche Google, une balise noindex dans le code, le fichier robots.txt, les redirections entre les versions du site, les erreurs serveur, puis le rapport des actions manuelles de la Search Console. Un scan gratuit en ligne contrôle les points techniques en une minute."
    },
    {
      "q": "Pourquoi mon site n'est pas visible sur Google ?",
      "a": "Il faut distinguer deux situations. Si le site n'est pas indexé, Google ne le connaît pas ou en est bloqué : réglage noindex, robots.txt, site trop récent, aucun lien entrant. S'il est indexé mais absent de la première page sur votre métier et votre ville, c'est un problème de classement : contenu trop mince, pas d'avis, pas de page par métier et par ville, site lent ou peu lisible sur mobile."
    },
    {
      "q": "Comment faire pour que mon site internet soit visible ?",
      "a": "Une fois indexé, un site devient visible en répondant aux recherches réelles de vos clients : une page par métier et par ville, des photos de vos réalisations, des coordonnées identiques à celles de votre fiche Google, et des avis réguliers. Un site rapide et lisible sur mobile aide Google à le classer. D'après notre expérience, comptez plusieurs semaines à plusieurs mois pour des positions stables sur les recherches locales : ce délai-là n'est pas publié par Google."
    },
    {
      "q": "Quels sont les 3 leviers du SEO ?",
      "a": "La technique (un site rapide, sécurisé en https, lisible sur mobile et accessible aux robots de Google), le contenu (des pages qui répondent précisément aux recherches de vos clients, métier par métier et ville par ville) et la popularité (les avis clients, les liens et les mentions sur d'autres sites). Un site absent de Google a un problème technique ; un site mal classé manque surtout de contenu et de popularité."
    }
  ],
  "related": [
    "connecter-site-google-search-console",
    "audit-seo",
    "comment-apparaitre-sur-google",
    "refonte-site-internet"
  ],
  "keywords": [
    "pourquoi mon site n'apparaît pas sur google",
    "mon site n'apparaît pas sur google",
    "site introuvable sur google",
    "site pas indexé google",
    "demander une indexation google",
    "site absent de google"
  ]
};

export default article;
