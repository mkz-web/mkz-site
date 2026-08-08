// Article généré depuis _content-staging/connecter-site-google-search-console.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "connecter-site-google-search-console",
  "category": "tutoriels",
  "title": "Connecter son site à Google Search Console : tuto en 15 minutes",
  "metaTitle": "Google Search Console : connecter son site pas à pas",
  "metaDescription": "Ajoutez votre site à Google Search Console en 15 minutes : propriété, vérification, sitemap, indexation. Tutoriel illustré, zéro jargon, 100 % gratuit.",
  "datePublished": "2026-06-12",
  "dateModified": "2026-08-08",
  "readingMinutes": 9,
  "excerpt": "Vous avez un site, mais aucune idée de ce que Google en fait ? **Google Search Console** vous montre gratuitement les recherches qui amènent vos clients. Ce tutoriel pas-à-pas, écrit pour les artisans, commerçants et TPE, vous connecte en 15 minutes, sans jargon et sans rien casser.",
  "tldr": [
    "Google Search Console est 100 % gratuite, API comprise (page Tarifs, Google for Developers, juin 2026).",
    "4 étapes : propriété, vérification, sitemap, indexation. Environ 15 minutes au total.",
    "Pas informaticien ? Propriété « Préfixe d'URL » + balise HTML : le chemin le plus simple.",
    "Le rapport Performances conserve 16 mois d'historique de données (documentation officielle Google).",
    "Lancé en 2006 (Webmaster Tools), l'outil s'appelle Google Search Console depuis le 20 mai 2015."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "Pour connecter votre site à **Google Search Console**, il suffit de 4 étapes : créer une « propriété » (déclarer votre site à Google), prouver que le site vous appartient, envoyer votre **sitemap** (le plan de vos pages), puis demander l'indexation de vos pages importantes. Comptez 15 minutes. C'est gratuit, officiel, et ce tutoriel vous guide écran par écran."
    },
    {
      "type": "p",
      "text": "Vous êtes artisan, commerçant ou patron de TPE ? Pas besoin de parler « DNS » : chaque terme est traduit en français courant, chaque écran important est illustré."
    },
    {
      "type": "h2",
      "id": "google-search-console-cest-quoi",
      "text": "Google Search Console, c'est quoi, et pourquoi vous en avez besoin"
    },
    {
      "type": "callout",
      "variant": "definition",
      "title": "Définition simple",
      "text": "Google Search Console est un outil gratuit de Google, lancé en 2006 sous le nom Webmaster Tools et renommé Google Search Console le 20 mai 2015 (annonce officielle Google). Il montre aux propriétaires de sites comment leurs pages apparaissent dans les résultats de recherche Google : requêtes tapées, clics, impressions et problèmes d'indexation."
    },
    {
      "type": "h3",
      "text": "Ce que l'outil vous montre : comment vos clients vous trouvent"
    },
    {
      "type": "p",
      "text": "Sans elle, votre site est une boîte noire. Avec elle, vous lisez les recherches exactes de vos clients (« plombier dammartin », « boulangerie ouverte dimanche 77 »), votre position sur chacune et les pages que Google n'arrive pas à lire. Une **impression** = votre vitrine aperçue dans Google ; un **clic** = le passant qui pousse la porte."
    },
    {
      "type": "p",
      "text": "65 % des TPE-PME françaises possèdent un site internet, et l'acquisition de nouveaux clients en est le premier bénéfice cité, par 48 % d'entre elles (Baromètre France Num 2025, DGE/Crédoc, septembre 2025). La Search Console vérifie que le vôtre travaille."
    },
    {
      "type": "h3",
      "text": "Combien ça coûte ? Rien : l'outil est 100 % gratuit"
    },
    {
      "type": "p",
      "text": "**Google Search Console est entièrement gratuite** : « L'utilisation de l'API Google Search Console est sans frais », écrit Google sur sa page Tarifs (Google for Developers, juin 2026). Si on vous facture un « abonnement Search Console », on vous facture du temps d'expert, jamais l'outil."
    },
    {
      "type": "h3",
      "text": "Search Console ou Google Analytics : qui fait quoi ?"
    },
    {
      "type": "table",
      "caption": "Google Search Console et Google Analytics : la répartition des rôles",
      "headers": [
        "",
        "Google Search Console",
        "Google Analytics"
      ],
      "rows": [
        [
          "Ce qu'il observe",
          "Votre site vu depuis Google, avant le clic",
          "Les visiteurs une fois sur votre site, après le clic"
        ],
        [
          "Ses questions",
          "Sur quelles recherches j'apparais ? Suis-je indexé ?",
          "Combien de visiteurs ? Quelles pages ? D'où viennent-ils ?"
        ],
        [
          "Par où commencer ?",
          "Indispensable en premier",
          "Utile ensuite"
        ]
      ]
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "La Search Console regarde votre site depuis Google ; Analytics observe le visiteur une fois arrivé. Pour une TPE, la Search Console s'installe en premier."
    },
    {
      "type": "h2",
      "id": "avant-de-commencer-checklist",
      "text": "Avant de commencer : la checklist (2 minutes)"
    },
    {
      "type": "p",
      "text": "À réunir avant de vous lancer :"
    },
    {
      "type": "ul",
      "items": [
        "**Un compte Google** (une adresse Gmail). Celui qui gère votre [fiche d'établissement Google](/conseils/tutoriels/creer-fiche-google-business-profile/) fait parfaitement l'affaire.",
        "**Savoir où est votre site** : WordPress, Wix ? Hébergé chez OVH, Ionos, o2switch ? En cas de doute, regardez la facture de votre prestataire.",
        "**L'accès administrateur** du site ou de l'espace hébergeur, pour ne pas bloquer en route."
      ]
    },
    {
      "type": "h2",
      "id": "etape-1-creer-la-propriete",
      "text": "Étape 1 : Ajoutez votre site en créant une « propriété »"
    },
    {
      "type": "p",
      "text": "Rendez-vous sur [search.google.com/search-console](https://search.google.com/search-console), connectez-vous avec votre compte Google et cliquez sur **Ajouter un site Web** (le bouton s'appelle **Commencer maintenant** tant que vous n'êtes pas connecté). Une **propriété**, c'est simplement votre site déclaré dans l'outil : rien à acheter, rien à installer."
    },
    {
      "type": "screenshot",
      "caption": "L'accueil de la Search Console et son bouton « Ajouter un site Web »",
      "alt": "Page d'accueil de search.google.com/search-console affichant le bouton Ajouter un site Web",
      "src": "/images/conseils/gsc-accueil-ajouter-un-site.webp",
      "width": 997,
      "height": 445
    },
    {
      "type": "h3",
      "text": "Domaine ou Préfixe d'URL : lequel choisir quand on n'est pas informaticien ?"
    },
    {
      "type": "p",
      "text": "Google affiche deux cartes : **Domaine** et **Préfixe d'URL**. Traduction :"
    },
    {
      "type": "table",
      "caption": "Domaine ou Préfixe d'URL : le comparatif pour choisir en 30 secondes",
      "headers": [
        "Critère",
        "Domaine",
        "Préfixe d'URL"
      ],
      "rows": [
        [
          "Ce qui est couvert",
          "Tout : http, https, avec ou sans www, sous-domaines",
          "L'adresse exacte saisie, rien d'autre"
        ],
        [
          "Vérification",
          "Enregistrement DNS uniquement (technique)",
          "Au choix : balise HTML, Analytics, Tag Manager…"
        ],
        [
          "Pour qui ?",
          "Les habitués de leur hébergeur",
          "Tout le monde (recommandé pour débuter)"
        ]
      ]
    },
    {
      "type": "screenshot",
      "caption": "Le choix du type de propriété : Domaine à gauche, Préfixe d'URL à droite",
      "alt": "Écran de Google Search Console présentant les deux cartes Domaine et Préfixe d'URL pour créer une propriété",
      "src": "/images/conseils/gsc-type-de-propriete.webp",
      "width": 1339,
      "height": 1013
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "Notre conseil pour 99 % des TPE",
      "text": "Choisissez **Préfixe d'URL** avec l'adresse exacte de votre site, telle qu'affichée dans le navigateur (https, avec ou sans www, à l'identique). Vous vérifierez sans toucher aux DNS."
    },
    {
      "type": "h2",
      "id": "etape-2-verification-propriete",
      "text": "Étape 2 : Prouvez que le site est à vous (la « vérification »)"
    },
    {
      "type": "p",
      "text": "La **vérification**, c'est le contrôle d'identité : Google exige la preuve que le site est à vous avant d'ouvrir ses données. Rien de visible ne change sur votre site : repérez votre cas dans le tableau, puis allez droit au but."
    },
    {
      "type": "h3",
      "text": "Quelle méthode pour votre cas ? Le tableau d'orientation"
    },
    {
      "type": "table",
      "caption": "La méthode de vérification la plus simple selon votre site",
      "headers": [
        "Votre site est…",
        "Méthode la plus simple",
        "Difficulté"
      ],
      "rows": [
        [
          "Sur WordPress (Yoast, Rank Math, Site Kit)",
          "Balise HTML collée dans le plugin SEO",
          "Très facile"
        ],
        [
          "Sur Wix, Squarespace ou Shopify",
          "Balise HTML via les réglages SEO du CMS",
          "Très facile"
        ],
        [
          "Déjà équipé d'Analytics ou Tag Manager",
          "Validation automatique, même compte Google",
          "Facile (un clic)"
        ],
        [
          "Géré via l'hébergeur (OVH, Ionos, o2switch…)",
          "Enregistrement DNS TXT",
          "Moyen (10 minutes)"
        ]
      ]
    },
    {
      "type": "h3",
      "text": "Méthode 1 : la balise HTML (la plus rapide avec WordPress)"
    },
    {
      "type": "p",
      "text": "La **balise HTML** est une ligne de code invisible fournie par Google, à coller dans l'en-tête du site."
    },
    {
      "type": "ol",
      "items": [
        "Dans l'écran de vérification, dépliez **Balise HTML** et copiez la ligne fournie.",
        "Sur WordPress : collez-la dans votre plugin SEO (Yoast → Réglages → Intégrations ; Rank Math → Outils pour webmasters).",
        "Sur Wix ou Squarespace : réglages SEO, zone Google Search Console, collez la balise.",
        "Revenez dans la Search Console et cliquez sur **Valider**."
      ]
    },
    {
      "type": "screenshot",
      "caption": "L'écran des méthodes de vérification, avec la balise HTML dépliée",
      "alt": "Fenêtre de vérification de la propriété dans Google Search Console montrant la méthode balise HTML avec son code à copier",
      "src": "/images/conseils/gsc-balise-html.webp",
      "width": 700,
      "height": 557
    },
    {
      "type": "h3",
      "text": "Méthode 2 : via Google Analytics ou Tag Manager"
    },
    {
      "type": "p",
      "text": "Analytics ou Tag Manager est déjà en place avec le même compte Google ? La Search Console le détecte toute seule : cliquez sur **Valider** dans la méthode correspondante. Zéro manipulation."
    },
    {
      "type": "h3",
      "text": "Méthode 3 : l'enregistrement DNS, pas-à-pas chez OVH"
    },
    {
      "type": "p",
      "text": "Le **DNS**, c'est l'annuaire qui relie votre nom de domaine à votre site. Y ajouter un « enregistrement TXT », c'est déposer une note que seul Google lira (la seule méthode acceptée en propriété Domaine). Chez OVH :"
    },
    {
      "type": "ol",
      "items": [
        "Copiez le code fourni par Google (il commence par `google-site-verification=`).",
        "Espace client OVH → **Noms de domaine** → votre domaine → onglet **Zone DNS**.",
        "Cliquez sur **Ajouter une entrée**, type **TXT**, sous-domaine vide, collez le code dans le champ Valeur.",
        "Validez, patientez quelques minutes à quelques heures, puis cliquez sur **Valider** dans la Search Console."
      ]
    },
    {
      "type": "screenshot",
      "caption": "Ajout de l'enregistrement TXT de Google dans la zone DNS, ici chez OVH",
      "alt": "Interface OVH de la zone DNS montrant l'ajout d'une entrée TXT contenant le code google-site-verification",
      "src": "/images/conseils/gsc-enregistrement-txt-ovh.webp",
      "width": 1400,
      "height": 632
    },
    {
      "type": "p",
      "text": "Chez Ionos ou o2switch, même principe : rubrique DNS, nouvelle entrée TXT, coller le code. Au besoin, le support de votre hébergeur le fait en quelques minutes."
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "Ne supprimez jamais la balise ni l'enregistrement DNS",
      "text": "Google revérifie périodiquement que vous êtes toujours propriétaire. Si la balise ou l'entrée DNS disparaît (refonte, changement de thème…), vous perdez l'accès à vos données. Laissez-les en place, définitivement."
    },
    {
      "type": "cta",
      "title": "Bloqué à l'étape vérification ?",
      "text": "Dites-nous chez qui est votre site et où ça coince : on vous indique la marche à suivre, sans engagement.",
      "button": "Poser ma question",
      "href": "/contact/"
    },
    {
      "type": "h2",
      "id": "etape-3-envoyer-sitemap",
      "text": "Étape 3 : Envoyez votre sitemap (le plan de votre site)"
    },
    {
      "type": "p",
      "text": "Un **sitemap**, c'est le plan de votre site : un fichier listant vos pages pour que Google n'en oublie aucune. La plupart des CMS le génèrent automatiquement."
    },
    {
      "type": "ol",
      "items": [
        "Trouvez son adresse : essayez `votresite.fr/sitemap.xml` (avec Yoast sur WordPress : souvent `sitemap_index.xml`).",
        "Dans le menu de gauche de la Search Console, cliquez sur **Sitemaps**.",
        "Saisissez la fin de l'adresse (ex. `sitemap.xml`), puis cliquez sur **Envoyer**.",
        "Vérifiez que le statut affiche **Opération effectuée**."
      ]
    },
    {
      "type": "screenshot",
      "caption": "Le sitemap envoyé, avec le statut « Opération effectuée »",
      "alt": "Rapport Sitemaps de Google Search Console listant sitemap.xml avec le statut vert Opération effectuée",
      "src": "/images/conseils/gsc-sitemap-envoye.webp",
      "width": 817,
      "height": 325
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "Ne paniquez pas devant le compteur",
      "text": "Le compteur de pages « indexées » du rapport Sitemaps peut rester à zéro alors que tout va bien. Fiez-vous au statut « Opération effectuée » et à l'inspection d'URL de l'étape 4."
    },
    {
      "type": "h2",
      "id": "etape-4-demander-indexation",
      "text": "Étape 4 : Demandez l'indexation de vos pages importantes"
    },
    {
      "type": "p",
      "text": "L'**indexation**, c'est l'entrée de vos pages dans le grand annuaire de Google. Tant qu'une page n'y figure pas, elle ne peut pas apparaître dans les résultats, même parfaite. Pour accélérer :"
    },
    {
      "type": "ol",
      "items": [
        "Collez l'adresse complète de votre page d'accueil dans la **barre d'inspection**, tout en haut de la Search Console.",
        "Lisez le verdict : « L'URL est sur Google » (tout va bien) ou « L'URL n'est pas sur Google » (à traiter).",
        "Cliquez sur **Demander une indexation** : la page rejoint une file d'attente prioritaire.",
        "Répétez pour vos 3 à 5 pages clés : accueil, services, contact."
      ]
    },
    {
      "type": "screenshot",
      "caption": "L'outil d'inspection d'URL et le bouton « Demander une indexation »",
      "alt": "Résultat d'inspection d'URL dans Google Search Console indiquant que l'URL n'est pas indexée, avec le bouton Demander une indexation sous le verdict",
      "src": "/images/conseils/gsc-demander-indexation.webp",
      "width": 1306,
      "height": 295
    },
    {
      "type": "p",
      "text": "La demande accélère la découverte, mais l'indexation reste à la main de Google : de quelques jours à quelques semaines. Les demandes quotidiennes étant limitées, réservez-les aux pages qui comptent."
    },
    {
      "type": "h2",
      "id": "trois-chiffres-premiere-semaine",
      "text": "Et maintenant ? Les 3 chiffres à regarder la première semaine"
    },
    {
      "type": "p",
      "text": "Laissez l'outil travailler quelques jours, puis ouvrez le rapport **Performances** (menu de gauche). Trois chiffres suffisent pour piloter :"
    },
    {
      "type": "h3",
      "text": "Clics, impressions, position moyenne : la traduction en français"
    },
    {
      "type": "table",
      "caption": "Les 3 chiffres du rapport Performances, traduits en français",
      "headers": [
        "Le chiffre",
        "Ce que ça veut dire",
        "Ce que vous en faites"
      ],
      "rows": [
        [
          "Impressions",
          "Combien de fois votre site s'est affiché dans Google",
          "Votre visibilité : si elles montent, Google vous montre davantage"
        ],
        [
          "Clics",
          "Combien de visiteurs sont venus depuis Google",
          "Beaucoup d'impressions, peu de clics ? Retravaillez vos titres de pages"
        ],
        [
          "Position moyenne",
          "Votre place dans les résultats (1 = tout en haut)",
          "Entre la 5e et la 15e place : vos gains les plus rapides"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Bonus : le rapport Performances conserve **16 mois d'historique** (documentation officielle d'aide Google Search Console). De quoi comparer cet été au précédent."
    },
    {
      "type": "h3",
      "text": "Cas concret : ce qu'un artisan découvre dans son rapport"
    },
    {
      "type": "p",
      "text": "Un plombier de Seine-et-Marne ouvre l'onglet **Requêtes** : il y lit « plombier dammartin-en-goële » et découvre qu'il apparaît en position 12 sur « débouchage canalisation 77 ». Une page dédiée à ce service, et le voilà en première page. C'est tout l'esprit du [référencement local](/conseils/seo/referencement-local/) : agir là où les clients cherchent déjà."
    },
    {
      "type": "p",
      "text": "L'opportunité est réelle : dans le bâtiment, seules 53,4 % des TPE-PME ont un site web, contre 64,6 % tous secteurs confondus (exploitation du Baromètre France Num 2025, data.gouv.fr, mai 2026) : mesurer sa visibilité, c'est déjà une longueur d'avance."
    },
    {
      "type": "screenshot",
      "caption": "Le rapport Performances sur 3 mois : clics, impressions, CTR et position moyenne",
      "alt": "Rapport Performances de Google Search Console affichant les tuiles clics, impressions, CTR moyen et position moyenne au-dessus des courbes",
      "src": "/images/conseils/gsc-rapport-performances.webp",
      "width": 1219,
      "height": 719
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "À retenir",
      "text": "Surveillez impressions (visibilité), clics (visites) et position moyenne. Notez 2 ou 3 recherches où vous êtes en page 2 : vos opportunités les plus rentables. Si ces chiffres restent obscurs, un [audit SEO](/conseils/seo/audit-seo/) les traduit en plan d'action."
    },
    {
      "type": "h2",
      "id": "checklist-finale",
      "text": "Votre checklist finale avant de fermer l'onglet"
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "La checklist du tutoriel",
      "items": [
        "Propriété créée : type Préfixe d'URL, avec l'adresse exacte du site",
        "Vérification validée : balise ou enregistrement DNS laissé en place",
        "Sitemap envoyé : statut « Opération effectuée »",
        "Indexation demandée pour les 3 à 5 pages clés",
        "Rendez-vous dans une semaine : rapport Performances, onglet Requêtes"
      ]
    },
    {
      "type": "p",
      "text": "Et ensuite ? Sous WordPress, le chantier le plus rentable est souvent la rapidité : suivez notre tutoriel pour [optimiser la vitesse de votre site WordPress](/conseils/tutoriels/optimiser-vitesse-wordpress/)."
    },
    {
      "type": "h2",
      "id": "besoin-daide",
      "text": "Besoin d'aide ? On le fait avec vous"
    },
    {
      "type": "p",
      "text": "Chez MKZ, nous configurons la Search Console pour chacun de nos clients, et nous vous apprenons à la lire. C'est votre site, ce sont vos données : vous devez pouvoir vérifier vous-même ce que votre [référencement](/referencement-seo/) produit. Une question sur votre cas ? [Écrivez-nous](/contact/) : on répond en français, sans jargon."
    },
    {
      "type": "cta",
      "title": "30 minutes pour y voir clair sur votre visibilité Google",
      "text": "Audit gratuit, sans engagement : on regarde ensemble votre Search Console (ou on l'installe avec vous) et on vous dit ce qui rapporterait le plus, chiffres à l'appui.",
      "button": "Réserver mon audit gratuit",
      "href": "https://calendly.com/mkz-consulting/30min"
    }
  ],
  "faq": [
    {
      "q": "Pourquoi utiliser la Google Search Console ?",
      "a": "Parce que c'est le seul outil qui montre votre site tel que Google le voit : les recherches exactes tapées par vos clients, le nombre d'affichages et de clics, votre position moyenne et les éventuels problèmes d'indexation. Gratuit et officiel, il permet à un patron de TPE de vérifier lui-même si son site lui ramène des clients."
    },
    {
      "q": "Comment activer Google Search Console ?",
      "a": "Connectez-vous sur search.google.com/search-console avec un compte Google, créez une propriété de type Préfixe d'URL avec l'adresse exacte de votre site, puis prouvez que le site est à vous via une balise HTML, Google Analytics ou un enregistrement DNS. Envoyez ensuite votre sitemap et demandez l'indexation de vos pages clés. Comptez environ 15 minutes."
    },
    {
      "q": "Quel est le prix d'utilisation de Google Search Console ?",
      "a": "Google Search Console est entièrement gratuite : aucune version payante, aucune limite cachée, et même son API est sans frais d'après la page Tarifs de Google for Developers (consultée en juin 2026). Si un prestataire vous facture un abonnement Search Console, il facture en réalité son temps de configuration ou d'analyse, jamais l'outil lui-même."
    },
    {
      "q": "Quelle est la différence entre Google Search Console et Google Analytics ?",
      "a": "La Search Console observe votre site depuis Google, avant le clic : recherches tapées, affichages, position, indexation. Google Analytics observe les visiteurs une fois arrivés sur votre site : pages vues, durée de visite, origine du trafic. Les deux outils sont gratuits et complémentaires ; pour une TPE, la Search Console est la première à installer."
    },
    {
      "q": "Combien de temps avant de voir des données dans la Search Console ?",
      "a": "Les premières données s'affichent généralement quelques jours après la validation de la propriété. Le rapport Performances conserve ensuite 16 mois d'historique, selon la documentation officielle d'aide Google. L'indexation de nouvelles pages, elle, prend de quelques jours à quelques semaines : la demande d'indexation accélère la découverte mais ne garantit aucun délai."
    },
    {
      "q": "La Search Console améliore-t-elle directement mon référencement ?",
      "a": "Non, pas à elle seule : c'est un outil de mesure et de diagnostic, pas une baguette magique. En revanche, elle rend chaque progrès mesurable. Envoyer un sitemap aide Google à découvrir vos pages, et le rapport Performances révèle les recherches où une page mieux travaillée peut gagner des positions, donc des clients."
    }
  ],
  "related": [
    "audit-seo",
    "creer-fiche-google-business-profile",
    "optimiser-vitesse-wordpress"
  ],
  "keywords": [
    "google search console",
    "connecter son site à google search console",
    "ajouter son site à google search console",
    "vérification propriété search console",
    "google search console tuto",
    "sitemap google"
  ]
};

export default article;
