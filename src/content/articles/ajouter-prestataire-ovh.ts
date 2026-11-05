// Article généré depuis _content-staging/ajouter-prestataire-ovh.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "ajouter-prestataire-ovh",
  "category": "tutoriels",
  "title": "Ajouter un prestataire sur son environnement OVH : le tutoriel",
  "metaTitle": "Ajouter un utilisateur OVH : donner accès à un prestataire",
  "metaDescription": "Ajouter un utilisateur OVH pour votre prestataire, sans lui confier votre mot de passe : le tutoriel écran par écran, et comment couper l'accès à la fin.",
  "datePublished": "2026-11-05",
  "dateModified": "2026-11-05",
  "readingMinutes": 12,
  "excerpt": "Votre prestataire vous demande vos accès OVH ? Votre mot de passe peut rester chez vous : OVH sait créer un **accès à son nom**, que vous coupez quand vous voulez. Voici l'intérêt de déléguer, le bon niveau d'accès, puis le tutoriel écran par écran, boutons à cliquer surlignés.",
  "tldr": [
    "Créez un utilisateur local au nom du prestataire : depuis l'accueil de l'espace client OVH, ouvrez Gestion des contacts, puis Identité, Sécurité & Opérations, Identités, onglet Utilisateurs locaux, bouton Ajouter un utilisateur.",
    "OVH déconseille de donner à un tiers les identifiants de votre espace client, et prend le contact technique comme exemple pour un webmaster (guide « Gérer les contacts de ses services »).",
    "Le groupe ADMIN donne un accès en écriture à toutes les sections de l'espace client, gestion des utilisateurs comprise. DEFAULT donne le même accès sans cette gestion. UNPRIVILEGED ne donne que la lecture.",
    "Un utilisateur local se connecte avec un identifiant qui associe le numéro du compte et son nom, par exemple 1234-567-89/johnsmith dans la documentation OVH.",
    "Pour limiter l'accès à un seul service, OVH propose le contact technique (ni factures, ni moyens de paiement, mais le prestataire doit avoir son propre compte OVH), et les politiques IAM pour un réglage plus fin."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "Pour **ajouter un prestataire sur votre environnement OVH**, créez-lui un **utilisateur local** : dans l'espace client, ouvrez Identité, Sécurité & Opérations, puis Identités, onglet Utilisateurs locaux, bouton Ajouter un utilisateur. Il reçoit son propre identifiant et son propre mot de passe. Vous ne communiquez jamais le vôtre, et vous coupez son accès quand vous voulez. Pressé ? [Le tutoriel écran par écran est ici](#ajouter-utilisateur-ovh)."
    },
    {
      "type": "p",
      "text": "Une précision, parce qu'elle change le choix : ce n'est pas la voie qu'OVH met en avant pour un prestataire. Son [guide sur les utilisateurs locaux](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/ovhcloud-users-management) parle des « membres de votre entreprise », et son [exemple pour un webmaster](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/managing-contacts) est le **contact technique**, décrit plus bas. L'utilisateur local évite au prestataire d'avoir un compte OVH et couvre plusieurs services d'un coup, mais avec les groupes par défaut il ouvre tout l'espace client."
    },
    {
      "type": "p",
      "text": "Quand un prestataire demande « vos accès OVH », le réflexe peut être de lui envoyer votre mot de passe. C'est comme lui prêter votre trousseau de clés : vous ne savez plus qui entre, et pour le récupérer, il faut changer toutes les serrures. Un accès à son nom ressemble plutôt à un badge : vous le désactivez le jour où le chantier s'arrête, sans toucher à vos clés."
    },
    {
      "type": "h2",
      "id": "pourquoi-deleguer",
      "text": "Pourquoi déléguer l'accès à votre espace OVH ?"
    },
    {
      "type": "callout",
      "variant": "definition",
      "text": "Un **utilisateur local** est un accès secondaire rattaché à votre compte OVHcloud. Il a son propre identifiant et son propre mot de passe. Ses droits viennent de son groupe et, si vous en posez, des politiques IAM d'OVH (des règles d'accès fines)."
    },
    {
      "type": "p",
      "text": "Une partie de la vie d'un site se joue dans l'espace client de l'hébergeur : la [version de PHP](/conseils/tutoriels/optimiser-vitesse-wordpress/) qui fait tourner WordPress, l'[enregistrement DNS](/conseils/tutoriels/connecter-site-google-search-console/) (une ligne dans l'annuaire de votre nom de domaine) que Google peut demander pour prouver que le site est à vous, le certificat SSL qui met le cadenas dans le navigateur. Sans accès, chaque geste de votre prestataire passe par vous : un rendez-vous, un écran partagé, un code de sécurité à relayer. Vous devenez le standard téléphonique de votre propre hébergement."
    },
    {
      "type": "p",
      "text": "Déléguer, ce n'est pas céder. Vous prêtez un accès, sans céder votre compte. Que le prestataire s'occupe de la [création de votre site](/creation-site-internet/) ou de son [référencement](/referencement-seo/), le principe ne change pas :"
    },
    {
      "type": "ul",
      "items": [
        "**Votre mot de passe reste chez vous.** OVH qualifie de [« pratiques hasardeuses »](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/ovhcloud-users-management) le partage de mot de passe, à propos des membres d'une entreprise, et [déconseille](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/managing-contacts) de donner à un tiers les identifiants de votre espace client. Un utilisateur local évite de partager les vôtres, pas de donner un accès large.",
        "**Chacun entre sous son nom.** OVH [recommande](https://docs.ovhcloud.com/fr/guides/manage-and-operate/iam/identities-management) des utilisateurs locaux, à des fins de traçabilité, dès que plus d'une personne doit se connecter sur le compte. La CNIL, dans ses [fiches sur la sécurité des données personnelles](https://www.cnil.fr/fr/securite-authentifier-les-utilisateurs), range parmi les précautions élémentaires un identifiant unique par utilisateur et l'interdiction des comptes partagés, sauf cas incontournable encadré.",
        "**Votre compte principal garde ses droits.** OVH le décrit comme un [« compte root »](https://docs.ovhcloud.com/fr/guides/manage-and-operate/iam/identities-management) (le compte maître), qu'aucune politique d'accès ne peut restreindre. Cela ne dit pas ce qu'un utilisateur en écriture peut modifier : OVH ne cite aucune exception sur les contacts de vos services.",
        "**Vous fermez quand vous voulez**, depuis une seule page, sans toucher à votre propre accès."
      ]
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "La limite à connaître",
      "text": "Avec les groupes par défaut, un utilisateur local n'est pas limité à votre hébergement. OVH écrit « toutes ses sections », sans exception citée pour les noms de domaine ni pour les factures : partez du principe qu'il y accède. Cet accès se réserve donc à un prestataire identifié, en qui vous avez confiance."
    },
    {
      "type": "h2",
      "id": "quel-acces",
      "text": "Quel accès donner à votre prestataire ?"
    },
    {
      "type": "p",
      "text": "Ce tutoriel compare quatre accès, à partir des guides d'OVH sur les [utilisateurs locaux](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/ovhcloud-users-management) et les [contacts](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/managing-contacts). La question à poser au prestataire tient en une phrase : de quoi avez-vous besoin, et pourquoi ?"
    },
    {
      "type": "table",
      "caption": "Les quatre accès possibles : les droits viennent de la documentation d'OVH, les missions sont mon conseil.",
      "headers": [
        "Accès",
        "Ce que le prestataire peut faire",
        "Pour quelle mission"
      ],
      "rows": [
        [
          "Utilisateur local, groupe **ADMIN**",
          "Écrire dans toutes les sections de l'espace client, y compris la gestion des utilisateurs",
          "Il doit pouvoir ouvrir d'autres accès, par exemple à son équipe"
        ],
        [
          "Utilisateur local, groupe **DEFAULT**",
          "Écrire dans toutes les sections, sauf la gestion des utilisateurs",
          "Il doit modifier des réglages, sans ouvrir d'autres accès"
        ],
        [
          "Utilisateur local, groupe **UNPRIVILEGED**",
          "Lire toutes les sections, sans rien modifier",
          "Il doit seulement lire : un audit, un diagnostic"
        ],
        [
          "**Contact technique** d'un service",
          "Gérer la partie technique de ce service, sans accès aux factures, aux commandes ni aux moyens de paiement",
          "Une mission limitée à un hébergement ou à un nom de domaine. Il lui faut son propre compte OVH"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Le nom « DEFAULT » est trompeur. Il sonne comme un accès minimal, alors qu'OVH le décrit comme un « administrateur restreint » : il écrit partout, sauf dans la gestion des utilisateurs."
    },
    {
      "type": "p",
      "text": "La capture de l'étape 4 montre **ADMIN**, le plus large. Réservez-le au prestataire qui doit ouvrir d'autres accès. Sinon, **DEFAULT** s'il doit écrire, **UNPRIVILEGED** s'il doit seulement lire. La CNIL range d'ailleurs le fait de [« donner des droits d'administrateurs à des utilisateurs n'en ayant pas besoin »](https://www.cnil.fr/fr/securite-gerer-les-habilitations) dans ce qu'il ne faut pas faire."
    },
    {
      "type": "p",
      "text": "OVH permet aussi d'affiner les droits par des [politiques IAM](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/iam-policy-ui) : des règles qui autorisent une action précise, sur une ressource précise, pour un utilisateur précis (l'exemple d'OVH : redémarrer un VPS). Ce tutoriel ne les couvre pas, et je n'ai pas vérifié qu'elles couvrent chaque offre d'hébergement web. OVH précise que les actions liées à la commande et à la facturation n'y sont pas encore disponibles."
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "Ne cédez jamais le contact administrateur",
      "text": "Le contact administrateur d'un service peut modifier tous ses contacts et changer les informations de son titulaire, par exemple sur un nom de domaine. Pour les manipulations de mise en ligne d'un site, OVH indique que le contact technique suffit : ce rôle reste à votre nom."
    },
    {
      "type": "h2",
      "id": "ajouter-utilisateur-ovh",
      "text": "Comment ajouter un utilisateur OVH pour votre prestataire"
    },
    {
      "type": "p",
      "text": "Une fois connecté, comptez moins de 2 minutes, du premier écran au formulaire rempli. La première fois, prévoyez un peu plus, le temps de repérer les écrans."
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "Le raccourci",
      "text": "Déjà connecté à votre espace client ? Pour un compte européen, [ce lien](https://www.ovh.com/manager/#/iam/identities/users) ouvre directement la page de l'étape 3."
    },
    {
      "type": "h3",
      "id": "etape-1",
      "text": "Étape 1 : ouvrez « Gestion des contacts »"
    },
    {
      "type": "p",
      "text": "Connectez-vous à votre [espace client OVHcloud](https://www.ovh.com/manager/) avec votre compte principal. Sur la page d'accueil, dans le bloc **Raccourcis**, cliquez sur **Gestion des contacts**. Vous ne changez rien sur cette page : elle sert de passage, car comme la page Mon compte, elle fait apparaître le menu du compte à gauche."
    },
    {
      "type": "screenshot",
      "caption": "Sur la page d'accueil de l'espace client, la tuile Gestion des contacts dans le bloc Raccourcis.",
      "alt": "Bloc Raccourcis de l'espace client OVHcloud, six tuiles, la tuile Gestion des contacts encadrée en orange.",
      "src": "/images/conseils/ovh-gestion-des-contacts.webp",
      "width": 868,
      "height": 968,
      "maxWidth": 434
    },
    {
      "type": "h3",
      "id": "etape-2",
      "text": "Étape 2 : ouvrez le menu « Identités »"
    },
    {
      "type": "p",
      "text": "Dans le menu de gauche, cliquez sur **Identité, Sécurité & Opérations** pour le déplier (1), puis sur **Identités** (2)."
    },
    {
      "type": "screenshot",
      "caption": "Dans le menu de gauche : Identité, Sécurité & Opérations (1), puis Identités (2).",
      "alt": "Menu latéral de l'espace client OVHcloud, les entrées Identité, Sécurité et Opérations puis Identités encadrées en orange et numérotées 1 et 2.",
      "src": "/images/conseils/ovh-menu-identites.webp",
      "width": 1044,
      "height": 542,
      "maxWidth": 522
    },
    {
      "type": "h3",
      "id": "etape-3",
      "text": "Étape 3 : cliquez sur « Ajouter un utilisateur »"
    },
    {
      "type": "p",
      "text": "Restez sur l'onglet **Utilisateurs locaux** (1), puis cliquez sur **Ajouter un utilisateur** (2). Une fenêtre s'ouvre."
    },
    {
      "type": "screenshot",
      "caption": "L'onglet Utilisateurs locaux (1) et le bouton Ajouter un utilisateur (2).",
      "alt": "Page Identités de l'espace client OVHcloud, l'onglet Utilisateurs locaux et le bouton Ajouter un utilisateur encadrés en orange et numérotés 1 et 2.",
      "src": "/images/conseils/ovh-ajouter-un-utilisateur.webp",
      "width": 792,
      "height": 498,
      "maxWidth": 396
    },
    {
      "type": "h3",
      "id": "etape-4",
      "text": "Étape 4 : remplissez le formulaire et validez"
    },
    {
      "type": "ul",
      "items": [
        "**Identifiant** : le nom du prestataire ou sa fonction. Juste en dessous, OVH affiche l'identifiant complet que vous lui transmettrez.",
        "**Email** : l'adresse du prestataire.",
        "**Mot de passe** : au moins 12 caractères, avec majuscule, minuscule, chiffre et caractère spécial, selon les [recommandations d'OVH](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/manage-ovh-password). Il est provisoire : vous demanderez au prestataire de le changer à l'étape 5.",
        "**Groupe principal** (1) : le groupe retenu plus haut, ADMIN sur la capture. L'écran dit que ce champ sert à l'affichage dans la liste des utilisateurs, alors que le guide d'OVH ne décrit qu'un seul champ Groupe. Je n'ai pas testé son effet sur les droits : d'où la vérification de l'étape 5.",
        "**Groupes supplémentaires** : rien à sélectionner dans ce tutoriel.",
        "**Description** : facultative, mais utile. Une ligne du type « Prestataire site internet, mission de novembre 2026 » vous dira dans deux ans pourquoi cet accès existe."
      ]
    },
    {
      "type": "p",
      "text": "Cliquez sur **Valider** (2) : l'utilisateur est créé."
    },
    {
      "type": "screenshot",
      "caption": "Le formulaire rempli : le groupe principal (1) et le bouton Valider (2). Le numéro de compte est masqué sur cette capture, et l'adresse remplacée par une adresse fictive.",
      "alt": "Formulaire Ajouter un utilisateur de l'espace client OVHcloud, champs identifiant, e-mail et mot de passe remplis, le groupe principal ADMIN et le bouton Valider encadrés en orange et numérotés 1 et 2.",
      "src": "/images/conseils/ovh-formulaire-utilisateur.webp",
      "width": 1034,
      "height": 1642,
      "maxWidth": 517
    },
    {
      "type": "h3",
      "id": "etape-5",
      "text": "Étape 5 : transmettez l'accès, pas votre mot de passe"
    },
    {
      "type": "ol",
      "items": [
        "Envoyez au prestataire son **identifiant complet** : le numéro de votre compte (le « NIC » de l'écran), une barre oblique, puis son nom. Dans l'exemple d'OVH : `1234-567-89/johnsmith`. Ne recomposez rien : recopiez telle quelle la ligne affichée sous le champ Identifiant.",
        "Envoyez le **mot de passe** par un autre canal. Le guide d'OVH sur les utilisateurs locaux ne dit pas comment le transmettre ; mon conseil : un SMS si l'identifiant part par mail. Les deux dans le même message, c'est laisser la clé sur la porte.",
        "Demandez-lui de **changer ce mot de passe** dès sa première connexion, comme la CNIL le [recommande](https://www.cnil.fr/fr/securite-authentifier-les-utilisateurs) pour un mot de passe attribué par un administrateur, et d'activer la **double authentification** (un second contrôle à la connexion, en plus du mot de passe). OVH le lui permet, et ce réglage ne concerne que son accès, pas le vôtre.",
        "À cette première connexion, demandez-lui de vérifier qu'il a bien les droits prévus, et pas davantage."
      ]
    },
    {
      "type": "cta",
      "title": "Bloqué à une étape ?",
      "text": "Décrivez-moi ce que vous voyez à l'écran, on regarde ça ensemble.",
      "button": "Me contacter",
      "href": "/contact/"
    },
    {
      "type": "h2",
      "id": "fin-de-mission",
      "text": "Fin de mission : comment couper l'accès"
    },
    {
      "type": "p",
      "text": "Retournez sur la page **Identités**, onglet **Utilisateurs locaux**, et cliquez sur les **…** à droite de l'utilisateur. Deux choix : **Désactiver l'utilisateur** si vous pensez le rappeler (**Activer l'utilisateur** le rétablit), **Supprimer l'utilisateur** si la mission est bien finie."
    },
    {
      "type": "p",
      "text": "S'il était en groupe ADMIN, relisez toute la liste : coupez aussi les accès qu'il a pu ouvrir à son équipe. Vérifiez enfin que le contact administrateur de vos services est toujours à votre nom. Les [fiches de la CNIL](https://www.cnil.fr/fr/securite-gerer-les-habilitations) recommandent de supprimer les permissions d'accès dès qu'une personne n'est plus habilitée, ainsi qu'à la fin de son contrat."
    },
    {
      "type": "callout",
      "variant": "attention",
      "title": "Couper l'accès OVH ne coupe pas le reste",
      "text": "Le FTP (l'accès qui sert à déposer les fichiers du site), la base de données (là où le site range ses contenus) et l'administration de votre site ont leurs propres mots de passe. Changez ceux que le prestataire connaît, et retirez son compte de votre site s'il en a un."
    },
    {
      "type": "h2",
      "id": "contact-technique",
      "text": "L'autre porte : le contact technique, pour un seul service"
    },
    {
      "type": "p",
      "text": "Si la mission se limite à un hébergement ou à un nom de domaine, OVH propose une voie plus étroite, et c'est celle de [son propre exemple pour un webmaster](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/managing-contacts) : le **contact technique**. Le prestataire peut alors ajouter un nom de domaine ou un sous-domaine à l'hébergement (son « multisite »), installer un module en 1 clic, modifier le mot de passe FTP ou de la base de données, créer un certificat SSL. Il n'accède ni à vos factures, ni à vos commandes, ni au renouvellement, ni à vos moyens de paiement. Il ne peut pas non plus modifier les contacts administrateur ou facturation, transférer votre nom de domaine ni en changer le titulaire."
    },
    {
      "type": "p",
      "text": "Sur la page de l'étape 1, cliquez sur les **…** à droite du service, puis sur **Modifier les contacts**, et renseignez l'identifiant client du prestataire. Conditions : être contact administrateur du service, que le prestataire ait son propre compte OVH, dans la même zone géographique que le vôtre, et qu'aucun des deux comptes n'ait de facture impayée. La demande se valide ensuite par e-mail des deux côtés. Si le nom de domaine n'est pas relié à l'hébergement, la même opération se fait sur sa zone DNS. En tant que contact administrateur, vous pouvez récupérer ce rôle à tout moment."
    },
    {
      "type": "h2",
      "id": "checklist",
      "text": "La checklist avant de fermer l'onglet"
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "Votre accès est délégué proprement si :",
      "items": [
        "l'utilisateur porte le nom du prestataire et son adresse e-mail ;",
        "le groupe a été choisi en connaissance de cause : ADMIN, DEFAULT ou UNPRIVILEGED ;",
        "l'identifiant et le mot de passe sont partis par deux canaux différents ;",
        "le prestataire a changé le mot de passe, activé la double authentification et vérifié ses droits ;",
        "votre mot de passe principal n'a jamais été transmis, et le contact administrateur reste à votre nom ;",
        "la fin de mission est notée quelque part : accès à couper, y compris ceux qu'il a pu ouvrir, et mots de passe à changer."
      ]
    },
    {
      "type": "p",
      "text": "Et si un prestataire insiste pour avoir votre mot de passe principal, montrez-lui cette page. Un accès à son nom lui permet de travailler, et vous le coupez sans toucher au vôtre."
    },
    {
      "type": "h2",
      "id": "sources",
      "text": "Sources"
    },
    {
      "type": "ul",
      "items": [
        "Documentation OVHcloud, consultée le 5 novembre 2026 : [Créer et gérer des utilisateurs locaux](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/ovhcloud-users-management) (mise à jour le 16 mai 2025), [Gérer les contacts de ses services](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/managing-contacts) (27 octobre 2026), [Présentation des identités](https://docs.ovhcloud.com/fr/guides/manage-and-operate/iam/identities-management) (21 octobre 2024), [Comment utiliser les politiques IAM](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/iam-policy-ui) (27 octobre 2025), [Modifier le mot de passe de votre compte](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/manage-ovh-password) (28 avril 2025).",
        "CNIL, fiches sur la sécurité des données personnelles, consultées le 5 novembre 2026 : [Authentifier les utilisateurs](https://www.cnil.fr/fr/securite-authentifier-les-utilisateurs) et [Gérer les habilitations](https://www.cnil.fr/fr/securite-gerer-les-habilitations).",
        "Parcours et boutons : vérifiés dans l'espace client OVHcloud le 5 novembre 2026. Un libellé peut bouger depuis, et le guide d'OVH a parfois du retard sur l'écran : il ne décrit qu'un champ Groupe là où l'écran en affiche deux."
      ]
    },
    {
      "type": "cta",
      "title": "Votre site, votre compte, vos accès",
      "text": "Trente minutes au téléphone pour faire le point sur votre site, sans engagement.",
      "button": "Réserver un appel",
      "href": "https://calendly.com/mkz-consulting/30min"
    }
  ],
  "faq": [
    {
      "q": "Comment donner accès à mon compte OVH à un prestataire ?",
      "a": "Créez-lui un utilisateur local : depuis la page Gestion des contacts de l'espace client OVHcloud, ouvrez Identité, Sécurité & Opérations, puis Identités, onglet Utilisateurs locaux, bouton Ajouter un utilisateur, puis renseignez un identifiant, son e-mail, un mot de passe et un groupe de droits. Il se connecte ensuite avec son propre identifiant. Pour un seul service, OVH propose aussi le contact technique, si le prestataire a son propre compte OVH."
    },
    {
      "q": "Plusieurs personnes peuvent-elles se connecter au même compte OVH ?",
      "a": "Oui, avec des utilisateurs locaux : chacun a son identifiant et son mot de passe, rattachés au même compte. OVH recommande d'en mettre en place dès que plus d'une personne doit se connecter, à des fins de traçabilité. L'identifiant associe le numéro du compte et le nom de l'utilisateur, séparés par une barre oblique."
    },
    {
      "q": "Quelle différence entre un utilisateur local et un contact technique OVH ?",
      "a": "L'utilisateur local accède à toutes les sections de l'espace client, selon son groupe de droits, et se crée depuis votre compte, sans qu'on vous demande l'identifiant client du prestataire. Le contact technique gère la partie technique d'un service, sans accès aux factures ni aux moyens de paiement, mais il doit posséder son propre compte OVH et la demande se valide par e-mail des deux côtés."
    },
    {
      "q": "Quel groupe choisir entre ADMIN, DEFAULT et UNPRIVILEGED ?",
      "a": "ADMIN donne un accès en écriture à toutes les sections, y compris la gestion des utilisateurs. DEFAULT donne le même accès sans la gestion des utilisateurs. UNPRIVILEGED ne donne que la lecture. Choisissez le niveau le plus bas qui permet la mission : UNPRIVILEGED s'il n'a rien à modifier, DEFAULT s'il doit écrire sans ouvrir d'autres accès, ADMIN seulement s'il doit en ouvrir."
    },
    {
      "q": "Comment retirer l'accès d'un prestataire sur OVH ?",
      "a": "Dans Identités, onglet Utilisateurs locaux, cliquez sur les points de suspension à droite de l'utilisateur, puis sur Désactiver l'utilisateur ou Supprimer l'utilisateur. Un prestataire en groupe ADMIN a pu ouvrir d'autres accès : relisez toute la liste. Pensez ensuite à ce qui ne dépend pas de l'espace client : mot de passe FTP, base de données et administration du site."
    },
    {
      "q": "Où trouver son identifiant OVH (NIC handle) ?",
      "a": "Votre NIC handle est votre identifiant client OVH, reçu par e-mail à la création du compte, le plus souvent deux lettres suivies de chiffres, comme aa00000-ovh. Pour un utilisateur local, inutile de le chercher : le formulaire affiche l'identifiant complet à transmettre, juste sous le champ Identifiant. L'écran emploie « votre NIC » pour le début de cet identifiant : recopiez la ligne telle quelle."
    }
  ],
  "related": [
    "connecter-site-google-search-console",
    "optimiser-vitesse-wordpress",
    "site-vitrine"
  ],
  "keywords": [
    "ajouter un utilisateur OVH",
    "donner accès OVH prestataire",
    "utilisateur local OVH",
    "contact technique OVH",
    "groupe ADMIN OVH",
    "NIC handle OVH"
  ]
};

export default article;
