// Article généré depuis _content-staging/revendiquer-entreprise-chatgpt.json par scripts/ingest-content.mjs.
// Édition manuelle possible (ex. ajouter "src" à un bloc screenshot après dépôt
// de l'image dans public/images/conseils/) ; penser à mettre à jour dateModified.
import type { Article } from "@/lib/articles/types";

const article: Article = {
  "slug": "revendiquer-entreprise-chatgpt",
  "category": "referencement-ia",
  "title": "Revendiquer la fiche de votre entreprise dans ChatGPT (Business Hub)",
  "metaTitle": "Business Hub ChatGPT : revendiquer sa fiche en France",
  "metaDescription": "Business Hub ChatGPT : une entreprise en ligne peut revendiquer sa fiche en France, un commerce de quartier pas encore. Étapes, vérification, limites.",
  "datePublished": "2026-11-26",
  "dateModified": "2026-11-26",
  "readingMinutes": 6,
  "excerpt": "Depuis novembre 2026, une entreprise en ligne éligible qui a un site peut revendiquer sa fiche dans ChatGPT, depuis le Business Hub (chatgpt.com/business-hub). En France, un commerce de proximité ou un restaurant ne le peut pas aujourd'hui. Voici les étapes et ce que la fiche corrige : elle complète le travail pour [être cité par ChatGPT](/conseils/referencement-ia/etre-cite-par-chatgpt/), elle ne le remplace pas.",
  "tldr": [
    "Le **Business Hub** est l'espace de ChatGPT réservé aux entreprises, ouvert en bêta (version d'essai, qui peut encore changer), sans compte publicitaire.",
    "Deux validations se suivent : la preuve du lien avec l'entreprise, puis la vérification d'identité par Persona, un service tiers, qui donne la coche bleue (le badge d'une fiche vérifiée).",
    "La fiche corrige l'information, elle ne garantit aucune visibilité : OpenAI l'écrit dans sa propre aide."
  ],
  "blocks": [
    {
      "type": "p",
      "text": "Revendiquer, c'est déclarer à OpenAI que vous représentez l'entreprise. Vous prenez alors la main sur sa fiche, la page que le lecteur ouvre quand une réponse de ChatGPT la mentionne. Vous la corrigez et vous lisez ses statistiques."
    },
    {
      "type": "h2",
      "id": "qui-peut-revendiquer",
      "text": "Business Hub en France : qui peut revendiquer sa fiche"
    },
    {
      "type": "table",
      "caption": "Ce que le Business Hub ouvre selon votre activité, d'après l'aide d'OpenAI",
      "headers": [
        "Votre activité",
        "Revendiquer sa fiche"
      ],
      "rows": [
        [
          "Commerce ou service en ligne avec un site",
          "Oui, si OpenAI l'accepte après ses contrôles et si la vérification est prise en charge"
        ],
        [
          "Commerce de proximité ou restaurant, hors États-Unis",
          "Non, pas aujourd'hui"
        ]
      ]
    },
    {
      "type": "p",
      "text": "La France n'est ni nommée ni exclue par OpenAI, qui ne publie pas de liste de pays pour le Business Hub. Pour un commerce de quartier, la priorité reste la [fiche Google de votre établissement](/conseils/tutoriels/creer-fiche-google-business-profile/)."
    },
    {
      "type": "callout",
      "variant": "astuce",
      "title": "Avant de commencer",
      "items": [
        "Un accès au téléphone de l'entreprise, à son adresse e-mail professionnelle, à sa boutique Shopify, ou à la zone DNS du domaine (le réglage qui dit à Internet où mène votre adresse web).",
        "Une pièce d'identité, les informations d'immatriculation de l'entreprise et un justificatif de votre droit à la représenter : ils peuvent être demandés.",
        "Si vous créez une fiche qui n'existait pas, elle est publiée automatiquement dès l'accord d'OpenAI sur votre identité : préparez nom, site et description avant."
      ],
      "text": "Le nom, l'adresse et les numéros d'immatriculation ou fiscaux donnés doivent correspondre aux documents officiels de l'entreprise."
    },
    {
      "type": "h2",
      "id": "etapes",
      "text": "Revendiquer votre entreprise : les étapes"
    },
    {
      "type": "p",
      "text": "Je n'ai pas revendiqué de fiche pour écrire ce guide : les étapes et les libellés suivent l'aide d'OpenAI, et l'écran peut employer un mot voisin."
    },
    {
      "type": "ol",
      "items": [
        "**Ouvrez le Business Hub.** Connectez-vous à ChatGPT, puis ouvrez **Business Hub** dans la barre latérale, ou allez directement sur chatgpt.com/business-hub.",
        "**Cherchez votre entreprise par son nom.** Sélectionnez la fiche qui lui correspond. Si elle n'existe pas, une entreprise en ligne éligible peut voir une option pour l'ajouter.",
        "**Prouvez le lien avec l'entreprise.** Choisissez l'une des méthodes affichées : **Téléphone de l'entreprise** (SMS ou appel automatisé, puis **Obtenir un code**), **Adresse e-mail professionnelle**, **Domaine du site web** ou **Boutique Shopify**.",
        "**Attendez la décision d'OpenAI.** Tant que la demande est en examen, le bouton **Annuler la revendication** reste disponible.",
        "**Faites vérifier votre identité** par Persona (un service de vérification d'identité) : sélectionnez **Vérifier avec Persona**, puis **Continuer vers Persona**. La coche bleue n'apparaît qu'une fois cette vérification approuvée, et c'est cette vérification qui ouvre la modification de la fiche et les statistiques."
      ]
    },
    {
      "type": "p",
      "text": "Si vous passez l'étape 5, vous la reprendrez depuis l'onglet **Entreprise** : ouvrez votre profil, puis **Terminer la vérification avec Persona**."
    },
    {
      "type": "h3",
      "text": "La méthode du domaine, si le téléphone ou l'e-mail ne conviennent pas"
    },
    {
      "type": "p",
      "text": "Sélectionnez **Domaine du site web** : ChatGPT affiche une ligne à ajouter dans la zone DNS de votre domaine, une ligne de texte (un enregistrement TXT). Copiez exactement le type, le nom ou l'hôte, et la valeur. Si un prestataire gère votre domaine, envoyez-lui ces trois éléments. Revenez ensuite dans ChatGPT et sélectionnez **Vérifier le domaine**. OpenAI prévient que ce changement peut mettre du temps à apparaître : un échec juste après l'ajout ne veut pas dire que la ligne est fausse."
    },
    {
      "type": "h2",
      "id": "corriger-la-fiche",
      "text": "Ce que la fiche entreprise corrige, et ce qu'elle ne change pas"
    },
    {
      "type": "p",
      "text": "Une fois tout approuvé, ouvrez votre profil dans l'onglet **Entreprise** pour mettre à jour le site web, la description, la catégorie, le logo, les politiques de livraison et de retour."
    },
    {
      "type": "p",
      "text": "OpenAI examine les modifications avant de les publier, sans vérifier chaque détail : l'entreprise reste responsable de ce qu'elle déclare. ChatGPT peut aussi s'appuyer sur d'autres sources. Son aide est nette : la revendication « ne garantit pas une meilleure visibilité »."
    },
    {
      "type": "p",
      "text": "Imaginez le concierge d'un hôtel à qui vous remettez votre carte de visite officielle. Il aura enfin votre bonne adresse, mais il continuera de recommander le restaurant qu'il préfère. La fiche corrige, elle ne recommande pas."
    },
    {
      "type": "h2",
      "id": "statistiques",
      "text": "Statistiques ChatGPT : ce que disent les mentions, les clics et les thèmes"
    },
    {
      "type": "p",
      "text": "Une fois la revendication et la vérification Persona approuvées, l'onglet **Statistiques** montre l'activité des 28 derniers jours : les mentions, les clics vers votre site et les thèmes de découverte (les sujets des réponses qui mentionnent ou citent votre entreprise). Les questions exactes des utilisateurs et leurs conversations ne sont pas transmises aux entreprises."
    },
    {
      "type": "ul",
      "items": [
        "**Le compteur ne retient une réponse que si elle fait référence à votre site** : votre nom écrit seul n'est pas compté.",
        "**Un compteur vide ne veut pas dire zéro** : il n'y a peut-être pas encore assez d'activité pour qu'un chiffre s'affiche, la collecte est en cours, ou le rapport est indisponible.",
        "Rien, dans ces statistiques, ne montre quels concurrents ChatGPT cite à votre place."
      ]
    },
    {
      "type": "p",
      "text": "Pour le savoir, il faut poser vos questions clients aux moteurs, comme dans le [protocole pour mesurer si les IA parlent de vous](/conseils/referencement-ia/mesurer-visibilite-ia/). On mesure, on ne suppose pas."
    },
    {
      "type": "cta",
      "title": "Vérifier ce que les IA peuvent lire sur votre site",
      "text": "L'audit gratuit relève en une minute si les robots des IA ont accès à votre site et si vos informations sont lisibles, avant même de toucher à la fiche.",
      "button": "Lancer l'audit gratuit",
      "href": "/audit-seo/"
    },
    {
      "type": "h2",
      "id": "checklist",
      "text": "Fiche ChatGPT : la checklist avant de fermer l'onglet"
    },
    {
      "type": "callout",
      "variant": "retenir",
      "title": "Votre fiche est en ordre si",
      "items": [
        "La coche bleue est visible sur la fiche.",
        "Le nom, le site et la description sont identiques à ceux de votre site et de votre fiche Google.",
        "Si un prestataire vous aide, il a son propre accès, ajouté depuis le Business Hub."
      ],
      "text": "Les statistiques couvrent 28 jours : elles se lisent au bout d'un mois, pas le lendemain."
    },
    {
      "type": "h2",
      "id": "besoin-d-aide",
      "text": "Vérification bloquée ou démarche à confier"
    },
    {
      "type": "p",
      "text": "Si la vérification bloque, ou si vous préférez confier la démarche, [écrivez-moi depuis la page contact](/contact/). Je vous dirai aussi si la fiche est prioritaire pour vous, ou si le travail est d'abord sur votre site."
    },
    {
      "type": "h2",
      "id": "sources",
      "text": "Sources"
    },
    {
      "type": "ul",
      "items": [
        "OpenAI, [Introducing Businesses in ChatGPT](https://openai.com/index/introducing-businesses-chatgpt/), annonce du 10 novembre 2026, mise à jour le 19 novembre 2026, consultée le 26 novembre 2026.",
        "OpenAI, [Businesses in ChatGPT](https://openai.com/business/businesses-in-chatgpt/), page produit et FAQ, consultée le 26 novembre 2026.",
        "OpenAI, [Configurer votre entreprise sur ChatGPT](https://help.openai.com/fr-fr/articles/20001635-setting-up-your-business-on-chatgpt), aide officielle traduite automatiquement, et sa [version anglaise](https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt), plus récente, consultées le 26 novembre 2026.",
        "OpenAI, [Politique Businesses in ChatGPT](https://openai.com/policies/businesses-in-chatgpt/), mise à jour le 10 novembre 2026, consultée le 17 novembre 2026.",
        "Ce que j'ai mesuré moi-même : la page de résultats de Google en France sur « business hub chatgpt », relevée le 26 novembre 2026 (outil DataForSEO)."
      ]
    }
  ],
  "faq": [
    {
      "q": "Le Business Hub de ChatGPT est-il disponible en France ?",
      "a": "Pour une entreprise de commerce ou de services en ligne, oui en principe : OpenAI l'a ouvert en novembre 2026 hors des États-Unis, là où ChatGPT est disponible et où la vérification est prise en charge, sans publier de liste de pays. Un commerce de quartier ou un restaurant français ne le peut pas aujourd'hui."
    },
    {
      "q": "Revendiquer sa fiche fait-il monter son entreprise dans les réponses de ChatGPT ?",
      "a": "Non. OpenAI écrit que la revendication ne garantit pas une meilleure visibilité et ne donne aucun contrôle direct sur les recommandations indépendantes de ChatGPT. Elle sert à corriger les informations et à lire les statistiques. Pour être cité, le travail porte sur votre site et sur ce que d'autres sources disent de vous."
    },
    {
      "q": "Faut-il acheter de la publicité pour revendiquer son entreprise dans ChatGPT ?",
      "a": "Non. L'aide d'OpenAI précise qu'il ne faut ni compte publicitaire ni contrat payant pour revendiquer une entreprise éligible. Revendiquer et faire de la publicité sont deux démarches distinctes, et la publicité n'influence pas les réponses indépendantes de ChatGPT."
    },
    {
      "q": "Que faire si quelqu'un a déjà revendiqué la fiche de mon entreprise ?",
      "a": "Ouvrez la fiche, sélectionnez le menu à trois points, puis Contester la propriété, et suivez les instructions pour faire vérifier par Persona que vous êtes habilité à représenter l'entreprise. L'aide d'OpenAI précise que cette contestation ne modifie pas la visibilité de la fiche."
    },
    {
      "q": "Un prestataire peut-il gérer la fiche ChatGPT à ma place ?",
      "a": "Oui, si vous lui donnez accès. La personne qui a revendiqué l'entreprise peut ajouter des collègues et un prestataire depuis le Business Hub, chacun avec son propre compte ChatGPT. OpenAI demande de ne jamais transférer une invitation personnelle pour donner cet accès."
    }
  ],
  "related": [
    "mesurer-visibilite-ia",
    "autoriser-robots-ia",
    "llms-txt-a-quoi-ca-sert"
  ],
  "keywords": [
    "business hub chatgpt",
    "fiche entreprise chatgpt",
    "revendiquer entreprise chatgpt",
    "chatgpt business hub france",
    "statistiques chatgpt entreprise"
  ]
};

export default article;
