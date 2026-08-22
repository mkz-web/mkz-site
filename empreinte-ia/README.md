# Empreinte d'une requête IA

Site public d'une page qui rend visible le coût en ressources d'une requête à un
modèle de langage. Démonstration pédagogique, actif SEO/GEO et vitrine pour
l'offre d'audit d'empreinte IA de MKZ Consulting.

Le message n'est pas « arrêtez d'utiliser l'IA ». Il est : **le choix du modèle
pèse cent fois plus que le fait d'utiliser l'IA ou non.** C'est un problème de
conception, pas de renoncement.

---

## Prérequis

Node 14 ou supérieur, **et rien d'autre**. Aucune dépendance à installer, pas de
`node_modules`, pas de gestionnaire de paquets. Le `package.json` présent ne
déclare aucune dépendance : il sert uniquement à indiquer à Node que les fichiers
`.js` du projet sont des modules ES.

La page est servie par le site mkz-consulting.fr (Cloudflare Pages, statique
pur) à l'adresse `/empreinte-ia/`. Aucun Node en production, pas de processus
persistant : la sortie du build est du statique pur.

## Emplacement dans le dépôt du site (depuis le 21 août 2026)

Ce dossier est un sous-projet du dépôt du site (`Client/MKZ/empreinte-ia/`).
Le build écrit **directement** dans `../public/empreinte-ia/`, le `public/` du
site Next, et `npm run build` du site l'enchaîne avant `next build`. Une seule
source, versionnée, zéro copie à la main. `public/empreinte-ia/` est une sortie :
ne jamais l'éditer, elle est régénérée à chaque build.

## Régénérer la page

Depuis la racine du dépôt du site :

```bash
npm run build:empreinte
```

ou, depuis ce dossier, `node build/build.mjs` (même chose). Le build fait
exactement trois choses :

1. Lit les fichiers de `data/*.yaml` et écrit `src/dataset.generated.js`.
2. Assemble `build/index.template.html`, `src/engine.js` et `src/ui.js` en un
   `../public/empreinte-ia/index.html` autonome, avec le jeu de données inséré
   en dur.
3. Écrit `../public/empreinte-ia/llms.txt` à partir du contenu réel de la page.

Le fichier produit ne charge aucune ressource externe. La sortie est
déterministe (aucune date, aucun aléa) : un build à vide ne produit aucun diff
git, et c'est l'invariant à vérifier après toute modification du générateur.

**Le build refuse de livrer une page dégradée.** Il échoue, plutôt que d'écrire
un fichier, si l'un de ces contrôles ne passe pas :

| Contrôle | Motif |
|---|---|
| Marqueur d'injection non remplacé | `{{CLE}}` ou `<!--__BLOC-->` visible en production |
| Plus d'un `<h1>` | Hiérarchie de titres cassée |
| `title` au delà de 65 caractères | Tronqué dans les résultats de recherche |
| `meta description` au delà de 160 caractères | Idem |
| `canonical` ou `lang` absent | Exigence bloquante du cahier des charges |
| Stockage navigateur détecté | Interdit par la commande |
| Ressource chargée depuis un domaine externe | Aucun lien externe vivant |
| JSON-LD illisible, ou sans `WebApplication`, `Organization`, `FAQPage` | Exigence bloquante |
| Question ou réponse du `FAQPage` absente du HTML visible | Divergence pénalisée au référencement |

### Ce qui n'est écrit nulle part en dur

Aucun chiffre de la page n'est saisi à la main, ni dans le gabarit, ni dans la
FAQ. Le tableau comparatif, les indicateurs, les encarts et les réponses de la
FAQ sont calculés au build par le moteur, puis écrits en HTML statique. Les
sources portent des marqueurs `{{FACTEUR_TOTAL}}`, `{{E_MOYEN}}` et
consorts, remplacés à la génération. Le texte ne peut donc pas diverger du
calcul, et un robot voit le tableau sans exécuter la moindre ligne de script.

## Lancer les tests

```bash
node src/engine.test.js
```

Les tests régénèrent le module de données avant d'importer le moteur : il est
impossible de tester une version périmée du jeu de données.

Le rapport imprime la valeur mesurée et l'écart de chaque cas, y compris quand
le test passe. C'est ce rapport qui sert à arbitrer les coefficients.

## Arborescence

```
.
├── data/                     source de vérité des coefficients et du contenu
│   ├── models.yaml           Wh par token de sortie, surcoût fixe, tokenisation
│   ├── grid.yaml             facteurs d'émission par région
│   ├── water.yaml            coefficients hydriques
│   ├── embodied.yaml         fabrication amortie
│   ├── equivalences.yaml     repères du quotidien
│   ├── faq.yaml              source unique du HTML visible ET du JSON-LD
│   └── CHANGELOG.md          journal des révisions du jeu de données
├── src/
│   ├── engine.js             moteur de calcul, fonction pure, zéro I/O
│   ├── engine.test.js        tests golden et vérifications fonctionnelles
│   ├── dataset.generated.js  généré par le build, ne pas éditer
│   └── ui.js                 liaison DOM
├── build/
│   ├── yaml.mjs              analyseur YAML minimal, écrit à la main
│   ├── content.mjs           génération du contenu statique et du JSON-LD
│   ├── index.template.html   gabarit et feuille de style
│   └── build.mjs             assemblage et contrôles bloquants
├── package.json              aucune dépendance, déclare seulement le mode module
└── README.md

../public/empreinte-ia/       SORTIE du build, dans le public/ du site Next
├── index.html                page finale déployée, générée
└── llms.txt                  données citables pour les moteurs génératifs, généré
```

Ce qui se déploie, c'est **la sortie dans `../public/empreinte-ia/`**, emportée
par le déploiement du site (`npm run deploy:build` à la racine du dépôt). Le
reste est l'atelier.

## Modifier un coefficient

1. Éditer le fichier concerné dans `data/`.
2. Incrémenter `version` et `updated` dans **tous** les fichiers de `data/`,
   `faq.yaml` compris. Le build refuse de tourner si elles divergent : une page
   qui affiche « jeu de données v0.1.0 » alors qu'un fichier est en v0.2.0 est
   un mensonge.
3. Consigner la modification et sa source dans `data/CHANGELOG.md`.
4. Rejouer les tests. Si un cas golden casse, c'est le coefficient qui est faux
   ou le modèle qui est faux. **Ne jamais ajuster un attendu pour faire passer
   le code.**
5. Relancer le build.

## Le moteur

`src/engine.js` est une fonction pure : aucun accès au DOM, aucun `fetch`,
aucune date système, aucun état global. Le jeu de données est injecté en
argument, ce qui permet de réutiliser le fichier tel quel dans un module
PowerShell ou une API sans toucher une ligne.

```js
estimate({
  text: string,               // requête saisie
  modelClass: 'petit' | 'moyen' | 'grand' | 'raisonnement',
  region: 'fr' | 'eu' | 'us' | 'monde',
  lengthMultiplier: number    // 0,6 courte | 1 standard | 2,2 longue
}) => {
  tokensIn, tokensOut, tokensOutVisible, tokensOutReasoning,
  energyWh: [min, central, max],
  co2eG:    [min, central, max],
  waterMl:  [min, central, max],
  datasetVersion, meta
}
```

Trois points de rigueur portés par le code :

- **Le prefill n'est pas le decode.** Les tokens d'entrée sont traités en
  parallèle, ceux de sortie un par un. Un token d'entrée coûte un huitième d'un
  token de sortie. Ils ne sont jamais sommés au même coefficient.
- **Les modèles de raisonnement produisent des tokens invisibles.** Ils sont
  modélisés par un multiplicateur de tokens, pas par un coefficient énergétique
  plus élevé. Le token coûte la même chose, il y en a simplement beaucoup plus.
- **Toute grandeur incertaine circule en triplet** `[min, central, max]` du début
  à la fin. Une valeur affichée sans ses deux bornes est un bug.

## Contraintes tenues

| Contrainte | Tenue par |
|---|---|
| Aucun backend | Tout le calcul est côté client |
| Aucun stockage navigateur | Vérifié par test sur les sources |
| Zéro dépendance runtime | Vanilla JS, analyseur YAML écrit à la main |
| Portable vers WordPress | Logique isolée dans `engine.js`, gabarit séparé |

## Statut

Le jeu de données v0.3.0 (15 août 2026) est **sourcé pièce par pièce** :
énergie dérivée du modèle paramétrique EcoLogits (ajusté sur ML.ENERGY,
licences vérifiées), facteurs réseau Our World in Data/Ember 2025, eau
Li et al. 2025, fabrication Boavizta/ADEME, équivalences impactco2.fr. La
liste « à faire avant mise en ligne » de `data/CHANGELOG.md` est traitée, les
trois tests golden passent avec des écarts resserrés, et le bandeau de la
page annonce désormais un jeu sourcé au lieu d'une préfiguration.

- **L'URL canonique est arbitrée (15 août 2026)** :
  `https://mkz-consulting.fr/empreinte-ia/`, telle que déjà codée dans
  `build/content.mjs`. Le domaine `mon-empreinte-ia.fr` est conservé en
  redirection 301 vers cette URL. Décision et seuil de bascule : `CLAUDE.md` ;
  mise en œuvre de la redirection : `REDIRECTION-OVH.md`.

- **Les coefficients sont sourcés depuis la v0.3.0 (15 août 2026)** :
  dérivation EcoLogits/ML.ENERGY documentée valeur par valeur dans
  `data/models.yaml` et `data/CHANGELOG.md`.

---

MKZ Consulting · contact@mkz-consulting.fr · 07 69 09 39 09 · https://mkz-consulting.fr
