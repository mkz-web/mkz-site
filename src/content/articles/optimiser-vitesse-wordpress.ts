// Article généré depuis _content-staging/optimiser-vitesse-wordpress.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "optimiser-vitesse-wordpress",
  "category": "tutoriels",
  "title": "Comment optimiser la vitesse de votre site WordPress sans coder ?",
  "metaTitle": "Optimiser WordPress : accélérer votre site sans coder",
  "metaDescription": "Site WordPress lent ? Mesurez avec PageSpeed Insights, puis appliquez 7 gestes simples (images, cache, PHP) pour optimiser WordPress sans coder.",
  "datePublished": "2026-06-12",
  "dateModified": "2026-08-08",
  "readingMinutes": 9,
  "excerpt": "Votre site WordPress rame et vous n'osez pas y toucher de peur de tout casser ? Bonne nouvelle : les gestes qui font vraiment la différence ne demandent **ni code ni compétence technique**. Suivez ce check-up en 30 minutes, conçu pour les artisans, commerçants et patrons de TPE.",
  "tldr": [
    "53 % des visiteurs mobiles quittent un site qui met plus de 3 secondes à se charger (Google / Think with Google, repris par Shopify France, 2025).",
    "Mesurez d'abord la vitesse de votre site WordPress avec PageSpeed Insights, l'outil gratuit de Google : visez LCP sous 2,5 s, INP sous 200 ms, CLS sous 0,1 (seuils Google).",
    "Les 3 gestes les plus rentables pour accélérer un site WordPress : alléger les images, activer une seule extension de cache, passer à une version récente de PHP.",
    "Avant toute manipulation sur votre site WordPress : une sauvegarde complète (extension gratuite UpdraftPlus). C'est le réflexe qui évite toutes les catastrophes.",
    "Minification, CDN, changement de thème ou d'hébergeur : des optimisations à confier à un professionnel, car le risque de casser le site est réel."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "Pour **optimiser WordPress** sans toucher au code, la méthode tient en trois temps. Mesurez d'abord la vitesse réelle de votre site avec **PageSpeed Insights**, l'outil gratuit de Google. Appliquez ensuite 7 gestes simples et réversibles (images, extensions, cache, PHP…). Confiez le reste (et seulement le reste) à un professionnel. Comptez environ 30 minutes pour l'essentiel, sauvegarde comprise."
    },
    {
      "type": "p",
      "text": "Vous êtes artisan, commerçant ou dirigeant de TPE ? Votre site a sans doute été créé par un prestataire, et vous n'osez pas y toucher de peur de tout casser. Ce tutoriel est pensé pour vous : uniquement des actions sûres, un avertissement clair avant chaque manipulation sensible, et la liste honnête de ce qu'il vaut mieux déléguer."
    },
    {
      "type": "h2",
      "id": "site-lent-clients-perdus",
      "text": "Pourquoi optimiser votre site WordPress : un site lent fait fuir vos clients"
    },
    {
      "type": "p",
      "text": "Le **temps de chargement** est le délai entre le clic d'un visiteur et l'affichage complet de votre page. Il se mesure en secondes, et chaque seconde compte, littéralement."
    },
    {
      "type": "p",
      "text": "Selon Google (Think with Google, repris par Shopify France en septembre 2025), **53 % des visiteurs mobiles quittent un site qui met plus de 3 secondes à se charger**. Plus d'un client potentiel sur deux, parti avant même d'avoir vu votre travail."
    },
    {
      "type": "p",
      "text": "La sanction ne s'arrête pas là. D'après Kissmetrics (cité par Hostinger, janvier 2026), une seule seconde de délai supplémentaire peut réduire les **conversions** de 7 %. Les conversions, ce sont vos demandes de devis, vos appels, vos réservations."
    },
    {
      "type": "p",
      "text": "À l'inverse, les sites qui occupent la première page de Google se chargent en moyenne en 1,65 seconde (étude Backlinko, citée par Shopify France, septembre 2025)."
    },
    {
      "type": "p",
      "text": "Rassurez-vous : WordPress n'est pas le problème. C'est un excellent outil. Mais comme une chaudière jamais révisée, un **site WordPress lent** est presque toujours un site qui s'est encrassé avec le temps. La bonne nouvelle ? L'entretien de base est à votre portée."
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "Au-delà de 3 secondes de chargement sur mobile, vous perdez plus d'un visiteur sur deux (Google / Think with Google, 2025). Objectif raisonnable pour un site de TPE : afficher l'essentiel en moins de 2,5 secondes."
    },
    {
      "type": "h2",
      "id": "etape-1-mesurer-pagespeed",
      "text": "Étape 1 : mesurez. Votre site est-il vraiment lent ?"
    },
    {
      "type": "callout",
      "variant": "definition",
      "title": "PageSpeed Insights, c'est quoi ?",
      "text": "**PageSpeed Insights** est l'outil gratuit de Google qui mesure la vitesse de n'importe quelle page web et lui attribue une note sur 100, pour mobile et pour ordinateur. Aucune installation, aucune inscription : il suffit de l'adresse de votre site."
    },
    {
      "type": "h3",
      "text": "Lancer le test en 2 minutes"
    },
    {
      "type": "ol",
      "items": [
        "Ouvrez [pagespeed.web.dev](https://pagespeed.web.dev) dans votre navigateur.",
        "Collez l'adresse complète de votre site, par exemple `https://www.votre-site.fr`.",
        "Cliquez sur **Analyser** et patientez une trentaine de secondes.",
        "Le rapport s'ouvre sur l'onglet **Mobile** : notez votre score, il servira de point de comparaison après vos améliorations."
      ]
    },
    {
      "type": "screenshot",
      "caption": "La page d'accueil de PageSpeed Insights : collez l'adresse de votre site et cliquez sur Analyser.",
      "alt": "Page d'accueil de PageSpeed Insights avec le champ de saisie d'URL et le bouton Analyser mis en évidence.",
      "src": "/images/conseils/wp-pagespeed-accueil.webp",
      "width": 1265,
      "height": 274
    },
    {
      "type": "h3",
      "text": "Lire les résultats sans jargon : les 3 chiffres qui comptent"
    },
    {
      "type": "p",
      "text": "Le rapport affiche une avalanche de chiffres. Trois seulement méritent votre attention : les **Core Web Vitals**, les « signaux web essentiels » avec lesquels Google évalue l'expérience de vos visiteurs. Ils sont pris en compte par son algorithme de classement depuis juin 2021 (web.dev / Google)."
    },
    {
      "type": "table",
      "caption": "Les 3 Core Web Vitals expliqués simplement",
      "headers": [
        "Indicateur",
        "Ce qu'il mesure",
        "Seuil « bon » selon Google"
      ],
      "rows": [
        [
          "LCP (Largest Contentful Paint)",
          "Le temps d'affichage du plus gros élément visible (souvent votre photo d'accueil)",
          "Moins de 2,5 secondes"
        ],
        [
          "INP (Interaction to Next Paint)",
          "La réactivité du site quand on clique sur un bouton ou un menu",
          "Moins de 200 millisecondes"
        ],
        [
          "CLS (Cumulative Layout Shift)",
          "La stabilité de la page (ces blocs qui « sautent » pendant le chargement)",
          "Moins de 0,1"
        ]
      ]
    },
    {
      "type": "screenshot",
      "caption": "Un rapport PageSpeed Insights : la note globale, puis les scores Accessibilité, Bonnes pratiques et SEO. Le bandeau du haut bascule entre Mobile et Bureau.",
      "alt": "Rapport PageSpeed Insights sur l'onglet Bureau affichant les notes Performances 100, Accessibilité 97, Bonnes pratiques 96 et SEO 100.",
      "src": "/images/conseils/wp-pagespeed-rapport.webp",
      "width": 1400,
      "height": 503
    },
    {
      "type": "h3",
      "text": "Mobile d'abord : pourquoi votre score mobile est plus bas (et plus important)"
    },
    {
      "type": "p",
      "text": "Pas de panique si votre note mobile est nettement inférieure à celle sur ordinateur : c'est presque toujours le cas. Selon l'étude Hostinger sur les temps de chargement (janvier 2026), les sites WordPress s'affichent en moyenne en 2,5 secondes sur ordinateur… mais en 13,25 secondes sur mobile."
    },
    {
      "type": "p",
      "text": "Or vos clients vous cherchent d'abord depuis leur téléphone, souvent en déplacement. C'est donc le score mobile qu'il faut améliorer en priorité."
    },
    {
      "type": "callout",
      "variant": "astuce",
      "text": "Testez 2 ou 3 pages, pas seulement l'accueil : la page de vos services ou votre page contact reçoit souvent les visiteurs les plus proches de décrocher leur téléphone."
    },
    {
      "type": "h2",
      "id": "pourquoi-site-wordpress-lent",
      "text": "Pourquoi mon site WordPress est lent ? Les 5 causes les plus fréquentes"
    },
    {
      "type": "p",
      "text": "Un site **WordPress lent** n'est presque jamais victime d'une panne mystérieuse. Dans l'immense majorité des cas, la cause figure parmi ces cinq classiques : images trop lourdes, excès d'extensions, absence de cache, version PHP dépassée ou hébergement sous-dimensionné."
    },
    {
      "type": "table",
      "caption": "Diagnostic express : symptôme, cause probable, solution",
      "headers": [
        "Symptôme",
        "Cause probable",
        "Solution"
      ],
      "rows": [
        [
          "Les pages avec photos mettent une éternité à s'afficher",
          "Images envoyées brutes depuis le téléphone (plusieurs Mo chacune)",
          "Geste n° 1 : compresser les images"
        ],
        [
          "Tout le site est lent, même les pages simples",
          "Pas d'extension de cache, ou hébergement saturé",
          "Geste n° 4, puis avis d'un pro sur l'hébergement"
        ],
        [
          "Le site ralentit progressivement depuis des mois",
          "Extensions accumulées, base de données encombrée",
          "Gestes n° 2 et n° 6 : ménage et nettoyage"
        ],
        [
          "Même le tableau de bord WordPress rame",
          "Version PHP dépassée ou hébergement sous-dimensionné",
          "Geste n° 5 : mettre à jour PHP"
        ],
        [
          "La page « saute » pendant le chargement",
          "Vidéos hébergées sur le site, thème mal construit",
          "Geste n° 7, puis avis d'un pro sur le thème"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Bonne nouvelle : le plus gros gisement est aussi le plus simple à exploiter. Les images peuvent représenter jusqu'à 50 % du poids total d'une page web (WPMarmite, septembre 2022). La vitesse est d'ailleurs l'un des premiers points techniques que nous vérifions lors d'un [audit SEO](/conseils/seo/audit-seo/)."
    },
    {
      "type": "h2",
      "id": "etape-2-sauvegarder",
      "text": "Étape 2 : sauvegardez votre site avant d'y toucher"
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "Le réflexe qui évite toutes les catastrophes",
      "text": "Ne modifiez jamais votre site sans une sauvegarde complète et récente. Avec une sauvegarde, n'importe quelle erreur se répare en quelques minutes. Sans elle, une mauvaise manipulation peut vous coûter votre site."
    },
    {
      "type": "p",
      "text": "Une **sauvegarde** est une copie complète de votre site : ses fichiers (textes, images, thème) et sa base de données (le contenu de vos pages). La méthode la plus simple sans compétence technique : l'extension gratuite **UpdraftPlus**."
    },
    {
      "type": "ol",
      "items": [
        "Dans votre tableau de bord WordPress, allez dans **Extensions → Ajouter une extension**, cherchez « UpdraftPlus », cliquez sur **Installer** puis **Activer**.",
        "Ouvrez **Réglages → Sauvegardes UpdraftPlus**.",
        "Dans l'onglet **Sauvegarder/restaurer**, cliquez sur le bouton bleu **Sauvegarder**, en laissant cochées la base de données et les fichiers.",
        "Quand la sauvegarde apparaît dans la liste, téléchargez-la sur votre ordinateur ou connectez UpdraftPlus à votre Google Drive : une copie stockée hors du site, c'est la vraie sécurité."
      ]
    },
    {
      "type": "screenshot",
      "caption": "UpdraftPlus : le bouton « Sauvegarder » crée une copie complète du site en quelques minutes.",
      "alt": "Onglet Sauvegarder/restaurer de l'extension UpdraftPlus dans WordPress, avec le bouton bleu Sauvegarder à droite.",
      "src": "/images/conseils/wp-updraftplus-sauvegarde.webp",
      "width": 1400,
      "height": 294
    },
    {
      "type": "p",
      "text": "Votre hébergeur propose peut-être aussi des sauvegardes automatiques : tant mieux. Gardez quand même votre propre copie : ceinture et bretelles."
    },
    {
      "type": "h2",
      "id": "etape-3-sept-gestes",
      "text": "Étape 3 : 7 gestes pour accélérer WordPress sans toucher au code"
    },
    {
      "type": "p",
      "text": "Voici les 7 gestes que nous appliquons en priorité pour **accélérer WordPress**, classés du plus rentable au plus situationnel. Chacun est noté en temps, difficulté et impact. Tous sont réversibles, aucun ne demande de code."
    },
    {
      "type": "h3",
      "text": "1. Allégez vos images avant de les téléverser"
    },
    {
      "type": "p",
      "text": "**Temps : 10 min · Difficulté : facile · Impact : fort.** Une photo qui sort d'un smartphone pèse plusieurs mégaoctets : beaucoup trop pour le web. Redimensionnez vos images avant de les envoyer : 1 920 pixels de large suffisent largement. Installez ensuite une extension de compression comme **Imagify** ou **Smush**. Elle réduit le poids des images déjà en ligne et les convertit au format **WebP**, un format moderne nettement plus léger à qualité visuelle égale."
    },
    {
      "type": "h3",
      "text": "2. Faites le ménage dans vos extensions"
    },
    {
      "type": "p",
      "text": "**Temps : 10 min · Difficulté : facile · Impact : moyen à fort.** Chaque extension active ajoute du code qui se charge à chaque visite. Dans **Extensions → Extensions installées**, repérez celles que vous n'utilisez plus : désactivez-les, puis supprimez-les. Une extension désactivée ne ralentit plus le site, mais elle reste une porte d'entrée pour les pirates si elle n'est plus mise à jour, d'où la suppression."
    },
    {
      "type": "callout",
      "variant": "attention",
      "text": "Désactivez les extensions une par une et vérifiez votre site après chacune. Si une page se dérègle, réactivez la dernière extension touchée. Dans le doute sur le rôle d'une extension, laissez-la et notez son nom pour en parler à un pro."
    },
    {
      "type": "screenshot",
      "caption": "La liste des extensions installées : repérez celles que vous n'utilisez plus avant de les désactiver puis de les supprimer.",
      "alt": "Page Extensions de WordPress listant les extensions installées, chacune avec son lien Désactiver.",
      "src": "/images/conseils/wp-extensions-installees.webp",
      "width": 807,
      "height": 543
    },
    {
      "type": "h3",
      "text": "3. Mettez à jour WordPress, votre thème et vos extensions"
    },
    {
      "type": "p",
      "text": "**Temps : 10 min · Difficulté : facile · Impact : moyen.** Les mises à jour corrigent des failles de sécurité et améliorent souvent les performances. Rendez-vous dans **Tableau de bord → Mises à jour**, puis mettez à jour WordPress, le thème et les extensions."
    },
    {
      "type": "callout",
      "variant": "attention",
      "text": "Toujours après la sauvegarde de l'étape 2. Lancez les mises à jour par petits lots et rechargez votre site entre chaque lot. En cas de problème, votre sauvegarde UpdraftPlus permet de revenir en arrière."
    },
    {
      "type": "h3",
      "text": "4. Activez une extension de cache (une seule !)"
    },
    {
      "type": "p",
      "text": "**Temps : 15 min · Difficulté : moyenne · Impact : fort.** Le **cache** prépare à l'avance une version « toute prête » de vos pages, au lieu de les reconstruire à chaque visite : l'affichage devient nettement plus rapide pour tous vos visiteurs. Les extensions gratuites **WP Super Cache** ou **LiteSpeed Cache** (si votre hébergeur utilise la technologie LiteSpeed, comme o2switch) s'installent comme n'importe quelle extension. Leurs réglages par défaut suffisent dans la plupart des cas."
    },
    {
      "type": "callout",
      "variant": "attention",
      "text": "Une seule extension de cache à la fois : deux caches se marchent dessus et peuvent rendre le site instable. Vérifiez qu'aucune n'est déjà active : certains hébergeurs en préinstallent une. Après activation, contrôlez vos pages principales en navigation privée."
    },
    {
      "type": "screenshot",
      "caption": "WP Super Cache, onglet Avancé : cochez « Activer le cache », enregistrez, c'est tout.",
      "alt": "Réglages avancés de l'extension WP Super Cache dans WordPress, avec la case Activer le cache cochée.",
      "src": "/images/conseils/wp-super-cache.webp",
      "width": 823,
      "height": 442
    },
    {
      "type": "h3",
      "text": "5. Passez à une version récente de PHP chez votre hébergeur"
    },
    {
      "type": "p",
      "text": "**Temps : 10 min · Difficulté : moyenne · Impact : fort.** Le **PHP** est le langage qui fait fonctionner WordPress sur votre serveur, et chaque nouvelle version est plus rapide que la précédente. Le changement se fait depuis l'espace client de votre hébergeur (OVH, o2switch, Ionos…), dans un menu nommé « PHP » ou « Configuration ». Sélectionnez la version la plus récente proposée, validez, vérifiez votre site."
    },
    {
      "type": "callout",
      "variant": "attention",
      "text": "Après le changement, ouvrez immédiatement vos pages principales. Si une erreur apparaît, revenez à la version précédente depuis le même menu : l'opération est réversible en deux clics, sans perte de données."
    },
    {
      "type": "screenshot",
      "caption": "Chez OVH, la version PHP de l'hébergement se lit et se change dans l'espace client, onglet Informations générales.",
      "alt": "Espace client OVH affichant la page d'un hébergement web et sa version PHP globale.",
      "src": "/images/conseils/wp-version-php-ovh.webp",
      "width": 1400,
      "height": 380
    },
    {
      "type": "h3",
      "text": "6. Nettoyez la base de données"
    },
    {
      "type": "p",
      "text": "**Temps : 10 min · Difficulté : moyenne · Impact : moyen.** La **base de données** est l'armoire à dossiers de votre site. Avec les années, elle accumule d'anciennes versions de pages (les « révisions »), des éléments en corbeille et des données temporaires. L'extension gratuite **WP-Optimize** fait le ménage en quelques clics : cochez les nettoyages proposés par défaut et lancez l'optimisation."
    },
    {
      "type": "callout",
      "variant": "attention",
      "text": "Un nettoyage supprime définitivement des données. C'est exactement pour cela que la sauvegarde de l'étape 2 existe : ne lancez jamais WP-Optimize sans elle."
    },
    {
      "type": "h3",
      "text": "7. Hébergez vos vidéos sur YouTube, jamais sur votre site"
    },
    {
      "type": "p",
      "text": "**Temps : 15 min · Difficulté : facile · Impact : fort (si vous avez des vidéos).** Une vidéo de quelques minutes pèse plus lourd que tout le reste de votre site réuni. Téléversez vos vidéos sur YouTube, puis intégrez-les dans vos pages avec le bouton « Partager → Intégrer » : la vidéo se charge depuis les serveurs de Google, pas depuis les vôtres."
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "Si vous ne devez retenir que trois gestes : compressez vos images, activez une seule extension de cache et passez à une version récente de PHP. À eux trois, ils concentrent l'essentiel du gain de vitesse."
    },
    {
      "type": "h2",
      "id": "confier-a-un-professionnel",
      "text": "Ce qu'il vaut mieux confier à un professionnel (et pourquoi)"
    },
    {
      "type": "p",
      "text": "Soyons francs : certaines optimisations sont efficaces, mais elles touchent au cœur technique du site. Mal exécutées, elles peuvent afficher une page blanche à la place de votre accueil. Voici celles que nous vous déconseillons de bricoler vous-même :"
    },
    {
      "type": "ul",
      "items": [
        "La **minification** : compresser les fichiers de code (CSS, JavaScript) pour les alléger. Un mauvais réglage casse l'affichage ou le formulaire de contact.",
        "Le **CDN** : un réseau de serveurs qui rapproche physiquement votre site de vos visiteurs. Utile, mais la configuration demande de la méthode.",
        "Les fichiers serveur (`.htaccess`, compression Gzip) : une seule ligne erronée et le site devient totalement inaccessible.",
        "Le changement de **thème** ou d'**hébergeur** : souvent la vraie solution quand tout le reste a échoué, mais c'est un chantier qui se prépare, pas un réglage du dimanche soir."
      ]
    },
    {
      "type": "p",
      "text": "Quand faut-il passer la main ? Trois signaux ne trompent pas :"
    },
    {
      "type": "ul",
      "items": [
        "votre score PageSpeed mobile reste sous 50 (la zone rouge de l'outil) malgré les 7 gestes de ce tutoriel ;",
        "votre site a plus de 5 ans et son thème n'est plus mis à jour : dans ce cas, une [refonte de site internet](/conseils/creation-site-internet/refonte-site-internet/) coûte souvent moins cher qu'une optimisation acharnée ;",
        "votre hébergement est une offre d'entrée de gamme qui plafonne, quoi que vous fassiez."
      ]
    },
    {
      "type": "p",
      "text": "Avant d'engager le moindre budget, situez les prix du marché : notre guide [combien coûte un site internet](/conseils/creation-site-internet/combien-coute-un-site-internet/) donne des fourchettes honnêtes, poste par poste."
    },
    {
      "type": "cta",
      "title": "Un doute sur votre site ?",
      "text": "Envoyez-nous l'adresse de votre site : nous le passons au crible et nous vous disons ce qui relève de vous… et ce qui relève d'un pro. Sans jargon, sans engagement.",
      "button": "Demander un avis gratuit",
      "href": "/contact/"
    },
    {
      "type": "h2",
      "id": "checklist-vitesse-30-minutes",
      "text": "Votre checklist pour optimiser WordPress en 30 minutes"
    },
    {
      "type": "p",
      "text": "Récapitulons. Les gestes essentiels (mesure, sauvegarde, images, extensions, cache) tiennent dans une demi-heure. Le reste peut attendre un autre créneau dans la semaine."
    },
    {
      "type": "table",
      "caption": "Plan d'action : geste, temps, difficulté, impact",
      "headers": [
        "Geste",
        "Temps",
        "Difficulté",
        "Impact"
      ],
      "rows": [
        [
          "Mesurer avec PageSpeed Insights",
          "5 min",
          "Très facile",
          "Point de départ indispensable"
        ],
        [
          "Sauvegarde complète (UpdraftPlus)",
          "10 min",
          "Facile",
          "Filet de sécurité obligatoire"
        ],
        [
          "Compresser les images (Imagify, Smush)",
          "10 min",
          "Facile",
          "Fort"
        ],
        [
          "Supprimer les extensions inutiles",
          "10 min",
          "Facile",
          "Moyen à fort"
        ],
        [
          "Mettre à jour WordPress, thème, extensions",
          "10 min",
          "Facile",
          "Moyen"
        ],
        [
          "Activer une extension de cache (une seule)",
          "15 min",
          "Moyenne",
          "Fort"
        ],
        [
          "Passer à une version récente de PHP",
          "10 min",
          "Moyenne",
          "Fort"
        ],
        [
          "Nettoyer la base de données (WP-Optimize)",
          "10 min",
          "Moyenne",
          "Moyen"
        ],
        [
          "Déplacer les vidéos vers YouTube",
          "15 min",
          "Facile",
          "Fort si vidéos"
        ]
      ]
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "Votre checklist en 9 points",
      "items": [
        "Score PageSpeed mobile noté avant toute modification",
        "Sauvegarde complète téléchargée hors du site",
        "Images redimensionnées, compressées et converties en WebP",
        "Extensions inutilisées supprimées (pas seulement désactivées)",
        "WordPress, thème et extensions à jour",
        "Une seule extension de cache, activée et testée",
        "Version PHP récente activée chez l'hébergeur",
        "Base de données nettoyée avec WP-Optimize",
        "Nouveau test PageSpeed une semaine plus tard pour mesurer le progrès"
      ]
    },
    {
      "type": "p",
      "text": "Dernier conseil : re-testez votre site quelques jours après vos modifications, puis [connectez votre site à Google Search Console](/conseils/tutoriels/connecter-site-google-search-console/) pour suivre gratuitement l'effet de vos efforts sur votre visibilité Google."
    },
    {
      "type": "h2",
      "id": "besoin-d-aide",
      "text": "Besoin d'aide ? On regarde votre site avec vous"
    },
    {
      "type": "p",
      "text": "Vous avez suivi le check-up et le compte n'y est pas ? Le problème dépasse probablement les réglages : thème vieillissant, hébergement à bout de souffle, site mal construit dès le départ."
    },
    {
      "type": "p",
      "text": "Chez MKZ, nous vous disons les choses simplement : ce que vous pouvez faire vous-même, et ce qui mérite un professionnel. Vous restez propriétaire de votre site, à 100 %. Posez-nous votre question via la [page contact](/contact/) : nous répondons sans jargon."
    },
    {
      "type": "cta",
      "title": "Audit vitesse offert : 30 minutes au téléphone",
      "text": "Réservez un créneau : nous testons votre site en direct avec vous, nous identifions ce qui le ralentit vraiment, et vous repartez avec un plan d'action clair, étape par étape. Sans engagement.",
      "button": "Réserver mon audit gratuit",
      "href": "https://calendly.com/mkz-consulting/30min"
    }
  ],
  "faq": [
    {
      "q": "Pourquoi mon site WordPress est lent ?",
      "a": "Dans la grande majorité des cas, un site WordPress lent souffre de l'une de ces cinq causes : images trop lourdes, trop d'extensions, absence de cache, version PHP dépassée ou hébergement sous-dimensionné. Un test gratuit sur PageSpeed Insights, l'outil de Google, permet d'identifier la cause principale en moins de cinq minutes."
    },
    {
      "q": "Comment puis-je accélérer mon site WordPress gratuitement ?",
      "a": "Cinq actions gratuites donnent l'essentiel du résultat : compresser les images avec une extension comme Imagify ou Smush, supprimer les extensions inutilisées, mettre WordPress à jour, activer une extension de cache gratuite comme WP Super Cache, et passer à une version récente de PHP depuis votre espace hébergeur. Faites toujours une sauvegarde complète avant."
    },
    {
      "q": "Qu'est-ce que l'optimisation WordPress ?",
      "a": "L'optimisation WordPress regroupe les réglages qui rendent un site plus rapide, plus stable et mieux référencé : compression des images, mise en cache des pages, ménage dans les extensions, mises à jour régulières et hébergement adapté. La partie essentielle ne demande aucune compétence en code et se fait en une trentaine de minutes."
    },
    {
      "q": "Quel est un bon temps de chargement pour un site de TPE ?",
      "a": "Visez moins de 2,5 secondes pour l'affichage de l'élément principal de la page : c'est le seuil LCP recommandé par Google. À titre de repère, les sites positionnés en première page de Google se chargent en moyenne en 1,65 seconde, selon une étude Backlinko citée par Shopify France en 2025."
    },
    {
      "q": "La vitesse influence-t-elle vraiment ma position sur Google ?",
      "a": "Oui. Google intègre les Core Web Vitals (vitesse, réactivité, stabilité visuelle) à son algorithme de classement depuis juin 2021. L'effet le plus fort reste indirect : 53 % des visiteurs mobiles abandonnent un site qui met plus de 3 secondes à charger selon Google, et ces visiteurs perdus pèsent sur votre référencement et vos demandes de devis."
    },
    {
      "q": "Faut-il quitter WordPress si mon site reste lent ?",
      "a": "Non, presque jamais. WordPress n'est pas lent en soi : ce sont les images lourdes, les extensions accumulées ou un hébergement faible qui le ralentissent. Si le site reste lent après les optimisations de base, c'est généralement le thème ou l'hébergement qu'il faut changer, voire envisager une refonte, et non l'outil lui-même."
    }
  ],
  "related": [
    "refonte-site-internet",
    "connecter-site-google-search-console",
    "audit-seo"
  ],
  "keywords": [
    "optimiser wordpress",
    "accélérer wordpress",
    "wordpress lent",
    "optimiser vitesse site wordpress",
    "pagespeed insights",
    "plugin cache wordpress",
    "compresser images wordpress"
  ]
};

export default article;
