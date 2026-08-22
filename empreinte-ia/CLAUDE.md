# Contexte projet : Empreinte d'une requête IA

> Décisions tranchées du projet. Lu en début de session. Ne pas rouvrir un arbitrage
> sans instruction explicite de Mickaël.

## Emplacement (depuis le 21 août 2026)

Ce projet vit dans le dépôt git du site, `Client/MKZ/empreinte-ia/`, et non plus
dans `Projet/Mon empreinte ia`, qui n'était pas un dépôt (un `DEPLACE.md` y
renvoie ici). Le build écrit directement dans `../public/empreinte-ia/`, et
`npm run build` du site l'enchaîne avant Next : une seule source, versionnée,
zéro copie à la main. **Ne jamais éditer `public/empreinte-ia/`** : c'est une
sortie, régénérée à chaque build. Contexte du site et invariants de livraison :
`AGENTS.md` à la racine du dépôt (section « Empreinte d'une requête IA »).

## Décision domaine (tranchée le 15 août 2026)

**La page se publie sur `https://mkz-consulting.fr/empreinte-ia/`, pas sur un
domaine dédié.** Le domaine `mon-empreinte-ia.fr` (réservé par Mickaël, OVH) est
conservé en **redirection 301** vers cette URL. Il sert d'adresse mémorisable à
l'oral (rendez-vous, conférences, slides), rien de plus.

**Pourquoi (mesuré le 15 août 2026, DataForSEO, France) :**

- Autorité backlinks : mkz-consulting.fr **34/100**, mon-empreinte-ia.fr **néant**
  (domaine absent des index).
- mkz-consulting.fr n'a encore que **1 mot-clé positionné** (~42 visites/mois
  estimées) : pas le carburant pour nourrir deux domaines.
- Volume du cluster cible : « empreinte carbone IA » 140/mois (x3 sur un an),
  « empreinte carbone chatgpt » 70, « combien consomme une requête chatgpt » 50,
  « consommation énergie chatgpt » 50. Environ 320 recherches/mois au total :
  trop mince pour justifier un domaine autonome.
- GEO : la citabilité vient de l'entité éditrice (Organization MKZ, coordonnées,
  jeu de données versionné), pas du nom de domaine. Un one-pager sur domaine
  neuf est le pire profil possible.
- Commercial : la spec (§1, fonction 3) impose d'amener les décideurs vers
  l'offre d'audit. Pas de saut de domaine entre la démo et l'offre.
- Les articles IA du site mkz linkent la page en **maillage interne** (hub du
  cocon IA), jamais vers un domaine externe.

**Seuil de bascule vers le domaine propre** (les trois conditions ensemble) :

1. Le projet compte 10 pages ou plus.
2. Le jeu de données est réellement sourcé pièce par pièce et maintenu.
3. Des backlinks entrants tiers existent (pas de liens venant de Mickaël).

Le jour où ces trois conditions sont réunies, la bascule se fait en inversant la
redirection : le contenu part sur mon-empreinte-ia.fr et l'URL mkz redirige en
301 vers lui. Jamais l'inverse (démarrer sur le domaine neuf ferait perdre
historique et indexation en cas de repli).

**Conséquences techniques :**

- L'URL canonique `https://mkz-consulting.fr/empreinte-ia/` codée dans
  `build/content.mjs` est donc **validée** : le point d'arbitrage listé dans le
  README est clos.
- La redirection OVH est décrite dans `REDIRECTION-OVH.md` à la racine du projet.

## Décision version anglaise (tranchée le 15 août 2026)

**Pas de version anglaise de la page.** La règle bilingue du site mkz impose de
mesurer avant d'écrire ; mesures du 15/08/2026 (DataForSEO, États-Unis, et
SERP réelle) :

- Volumes gros mais en chute libre : « how much energy does chatgpt use »
  passe d'une médiane d'environ 2 150/mois au S2 2025 à 490 au S1 2026
  (140 en juillet 2026, pic à 3 600 en octobre 2025). « ai water usage »
  affiche 14 800/mois mais fait 27 100 en février 2026 et 6 600 en juillet.
  Même pente sur les dix requêtes mesurées : c'est un sujet d'actualité qui
  retombe, pas une demande durable qui monte.
- SERP mesurée : page 1 tenue par Epoch AI, IEEE Spectrum, Hannah Ritchie,
  Reddit et de grands médias. Intenable pour un simulateur d'agence française.
- Doctrine du site : la section anglaise vise les entreprises étrangères qui
  achètent du SEO pour le marché français, plus la visibilité IA. Une page
  d'information générique mondiale ne sert pas cette intention.

À revisiter uniquement si l'offre d'audit d'empreinte IA devient
internationale. La décision est aussi notée en commentaire dans le
`sitemap.ts` du site.

## Rappels hérités de la spec (toujours valables)

- Positionnement : jamais culpabilisant. « Problème de conception, pas de
  renoncement. »
- Zéro backend, zéro stockage navigateur, zéro dépendance runtime.
- Bleu MKZ `#2C5F7C`. Le violet `#7C2C5F` est interdit ici (réservé au scoring GEO).
- Coefficients v0.2.0 = préfiguration non sourcée. Pas de mise en ligne sans
  remplacement par EcoLogits ou ML.ENERGY (licences vérifiées) ni sans traiter
  `data/CHANGELOG.md`.
