# Cahier des charges — Site de démonstration « Empreinte d'une requête IA »

**Commanditaire** : MKZ Consulting
**Version du document** : 1.0 — 28 juillet 2026
**Destinataire** : agent de développement (Claude Code)

---

## 1. Objectif

Construire un site public d'une seule page qui rend visible le coût en ressources d'une requête à un modèle de langage, et qui serve simultanément trois fonctions :

1. **Pédagogique** — faire comprendre que le choix du modèle pèse cent fois plus que le fait d'utiliser l'IA ou non.
2. **Acquisition SEO/GEO** — se positionner sur les requêtes du type « combien consomme ChatGPT » et devenir une source citée par les moteurs génératifs.
3. **Vitrine commerciale** — amener les décideurs vers une offre d'audit d'empreinte IA.

Le site n'est pas un outil de reporting réglementaire. C'est une démonstration. Il doit néanmoins être assez rigoureux pour ne pas être attaquable.

### Positionnement éditorial — non négociable

Le site **n'est pas culpabilisant**. Le message n'est pas « arrêtez d'utiliser l'IA », c'est « le sujet est un problème de conception, pas de renoncement ». Toute formulation moralisatrice est à rejeter : elle dessert la crédibilité auprès de l'audience visée (dirigeants, DSI, responsables RSE).

---

## 2. Contraintes techniques

| Contrainte | Détail |
|---|---|
| Hébergement cible | OVH mutualisé — PHP 8.x, **pas de Node en production**, pas de processus persistant |
| Backend | **Aucun**. Tout le calcul se fait côté client |
| Stockage navigateur | **Interdit** — pas de `localStorage`, pas de `sessionStorage`, pas de cookies |
| Dépendances runtime | Zéro framework. Vanilla JS. Polices Google autorisées, ou auto-hébergées (préférable) |
| Build | Toléré en local (Node/Vite) si la sortie est du statique pur |
| Portabilité | Le HTML final doit pouvoir être converti en template WordPress sans réécriture de la logique |
| Navigateurs | Deux dernières versions majeures de Chrome, Firefox, Safari, Edge |

---

## 3. Arborescence attendue

```
empreinte-ia/
├── data/
│   ├── models.yaml           # coefficients par classe de modèle
│   ├── grid.yaml             # facteurs d'émission par région
│   ├── water.yaml            # coefficients hydriques
│   ├── embodied.yaml         # impacts de fabrication amortis
│   ├── equivalences.yaml     # repères du quotidien
│   └── CHANGELOG.md          # journal des révisions du jeu de données
├── src/
│   ├── engine.js             # moteur de calcul — fonction pure, zéro I/O
│   ├── engine.test.js        # tests golden (voir §6)
│   └── ui.js                 # liaison DOM
├── build/
│   └── build.mjs             # YAML → JSON, injection dans le HTML
├── public/
│   └── index.html            # page finale déployable
└── README.md
```

Le moteur doit être **importable indépendamment de l'interface**. Il sera réutilisé dans un module PowerShell et une éventuelle API.

---

## 4. Modèle de calcul

### 4.1 Principe

```
E_requête  = surcoût_fixe + (tokens_sortie × Wh_par_token)
                          + (tokens_entrée × Wh_par_token / RATIO_PREFILL)

CO2e       = (E_requête / 1000) × (facteur_réseau + facteur_fabrication)
Eau        = (E_requête / 1000) × coefficient_hydrique × 1000
```

Chaque coefficient est un **triplet `[min, central, max]`**. Les trois branches sont calculées en parallèle jusqu'à l'affichage. Une valeur affichée sans ses deux bornes est un bug.

### 4.2 Points de rigueur à respecter

**Le prefill n'est pas le decode.** Les tokens d'entrée sont traités en parallèle, les tokens de sortie séquentiellement. `RATIO_PREFILL = 8` : un token d'entrée coûte un huitième d'un token de sortie. Ne jamais additionner entrée et sortie avec le même coefficient.

**Les modèles de raisonnement produisent des tokens invisibles.** Ils sont modélisés par un multiplicateur de tokens de sortie (`mult`), pas par un coefficient énergétique plus élevé. Le token coûte la même chose, il y en a simplement sept fois plus.

**Le surcoût fixe empêche l'effondrement à zéro.** Routage, orchestration, serveur hors GPU : une requête d'un mot ne consomme pas zéro.

**Estimation des tokens.** Heuristique `caractères / 3,6` pour le français. Ne pas embarquer de tokenizer WASM par défaut — l'erreur de ±10 % est négligeable face à l'incertitude de ±300 % du modèle énergétique. Charger un tokenizer réel uniquement à la demande, si cette option est un jour retenue.

### 4.3 Coefficients de départ

> ⚠️ **Ces valeurs sont une dérivation à partir des chiffres publics, pas un jeu validé.** Elles sont fournies pour amorcer le développement et faire passer les tests golden. **Avant mise en ligne**, elles doivent être remplacées par les coefficients d'EcoLogits ou du ML.ENERGY Leaderboard, et chaque valeur doit porter sa source et sa date. Vérifier au préalable la compatibilité des licences avec un usage commercial.

`models.yaml` — Wh par token de sortie :

| Classe | min | central | max | mult tokens |
|---|---|---|---|---|
| `petit` | 0,00018 | 0,00045 | 0,0011 | 1 |
| `moyen` | 0,00030 | 0,00090 | 0,0028 | 1 |
| `grand` | 0,00090 | 0,00280 | 0,0085 | 1 |
| `raisonnement` | 0,00050 | 0,00150 | 0,0045 | 7 |

Surcoût fixe (Wh) : `[0,005 ; 0,02 ; 0,08]`

`grid.yaml` — g CO₂e par kWh :

| Région | min | central | max |
|---|---|---|---|
| `fr` | 30 | 56 | 90 |
| `eu` | 150 | 230 | 320 |
| `us` | 330 | 400 | 500 |
| `monde` | 400 | 480 | 580 |

`embodied.yaml` — fabrication amortie, en g CO₂e par kWh équivalent : `[15 ; 50 ; 130]`

`water.yaml` — litres par kWh, refroidissement direct + production électrique : `[0,5 ; 1,4 ; 3,5]`

### 4.4 Interface du moteur

```js
estimate({
  text: string,          // requête saisie
  modelClass: 'petit' | 'moyen' | 'grand' | 'raisonnement',
  region: 'fr' | 'eu' | 'us' | 'monde',
  lengthMultiplier: number   // 0.6 courte | 1 standard | 2.2 longue
}) => {
  tokensIn: number,
  tokensOut: number,
  energyWh:  [min, mid, max],
  co2eG:     [min, mid, max],
  waterMl:   [min, mid, max],
  datasetVersion: string
}
```

Fonction **pure** : aucun accès au DOM, aucun `fetch`, aucune date système. Les données sont injectées en argument ou importées d'un module de constantes.

---

## 5. Contenu de la page

Sections dans cet ordre. La copie ci-dessous décrit l'intention, pas le texte final — à réécrire, mais sans en changer le fond.

### 5.1 En-tête
Marque MKZ Consulting, lien vers le site principal, **version du jeu de données visible** (ex. `jeu de données v0.1.0 · 28 juillet 2026`). Cette mention est un signal d'autorité, pas un détail.

### 5.2 Simulateur (au-dessus de la ligne de flottaison)
- Titre portant la requête cible : « Combien consomme une requête à une IA ? »
- Zone de saisie libre, pré-remplie avec un exemple réaliste
- Trois contrôles : classe de modèle, région du centre de données, longueur de réponse
- Compteur de tokens entrée/sortie, mis à jour à la frappe
- **Trois indicateurs** : énergie (Wh), émissions (g CO₂e), eau (mL)
- Chaque indicateur affiche **une fourchette visible**, pas un chiffre seul
- Un bloc d'équivalences concrètes sous les indicateurs
- Une mention d'avertissement : estimation, pas mesure

### 5.3 « Le logo ne change rien, le modèle change tout »
Tableau comparatif **en HTML statique** — recherche web classique, petit modèle, modèle courant, grand modèle, modèle de raisonnement, avec les trois indicateurs. Ce tableau est un actif SEO/GEO majeur : il ne doit jamais être généré en JavaScript.

Deux encarts : le facteur cent, et le principe « small is sufficient » (une étude d'octobre 2025 estime que généraliser le bon choix de modèle réduirait la consommation mondiale de l'IA de 27,8 %).

### 5.4 « Vous ne faites plus une requête, vous lancez un agent »
Section différenciante. Curseur de 1 à 120 appels, affichage de l'énergie, du CO₂e et d'une équivalence pour un run complet. Argument : les compteurs existants n'observent qu'une fenêtre de chat, alors que le volume réel vient des agents outillés.

### 5.5 Méthodologie
Quatre encarts : impacts d'usage, impacts de fabrication, distinction prefill/decode, propagation de l'incertitude. Puis la liste des sources, avec pour chacune l'organisme et la date.

Sources à citer : Google (mesure Gemini, août 2025), OpenAI (chiffre public sans méthode), Mistral AI (ACV Mistral Large 2, juillet 2025), EcoLogits / GenAI Impact, Boavizta, RTE éCO2mix.

### 5.6 FAQ
Six questions minimum, en `<details>`, chacune répondant à une requête réellement tapée :
1. Combien consomme une requête à ChatGPT ?
2. Pourquoi les estimations varient-elles autant d'une source à l'autre ?
3. Une requête à une IA consomme-t-elle vraiment de l'eau ?
4. Choisir un modèle plus petit change-t-il vraiment quelque chose ?
5. Comment mesurer la consommation IA de mon entreprise ?
6. Faut-il arrêter d'utiliser l'IA ? *(réponse : non — voir positionnement éditorial §1)*

**Règle de rédaction** : chaque réponse doit être autonome et citable hors contexte. Sujet nommé explicitement, chiffre, nuance. Jamais de « comme vu plus haut » ni de pronom sans antécédent dans la même phrase. C'est le format qu'un moteur génératif recopie.

### 5.7 Pied de page
Accroche commerciale sobre, coordonnées complètes, et une mention de responsabilité : valeurs estimatives, non opposables à un tiers, non constitutives d'une donnée officielle d'un fournisseur.

---

## 6. Exigences SEO / GEO

**Bloquantes :**

- [ ] Tout le contenu de référence (tableau, méthodologie, FAQ, sources) présent dans le HTML source. Seul le simulateur est en JS.
- [ ] Un seul `<h1>`, hiérarchie `h2`/`h3` cohérente.
- [ ] `<title>` et `meta description` porteurs de la requête cible.
- [ ] `link rel="canonical"`.
- [ ] JSON-LD `@graph` contenant `WebApplication`, `Organization` (avec `email`, `telephone`, `areaServed`, `knowsAbout`) et `FAQPage`.
- [ ] Le `FAQPage` reprend **mot pour mot** les questions et réponses visibles à l'écran. Toute divergence est une pénalité.
- [ ] `lang="fr"`, Open Graph renseigné.
- [ ] Version du jeu de données visible en page **et** dans le pied.

**À produire en complément :**

- [ ] `llms.txt` à la racine, décrivant la page et pointant vers la méthodologie.
- [ ] `data/CHANGELOG.md` — le versionnement du jeu de données est ce qui distingue une source citable d'un convertisseur jetable.

**Performance** : LCP sous 2 s en 4G simulée, aucun décalage de mise en page. Polices auto-hébergées de préférence, `font-display: swap` sinon.

---

## 7. Direction artistique

**La première version produite a été rejetée pour manque de qualité visuelle. Ne pas coder avant d'avoir fait valider une direction.**

Procédure attendue : proposer **deux ou trois directions distinctes** sous forme de plan compact — palette de 4 à 6 valeurs nommées, choix typographiques pour deux ou trois rôles, concept de mise en page, et l'élément signature dont la page sera retenue. Attendre l'arbitrage avant d'écrire du CSS.

### Contraintes de marque

| Élément | Valeur |
|---|---|
| Bleu MKZ Consulting | `#2C5F7C` — couleur primaire de tous les livrables clients standard |
| Violet GEO | `#7C2C5F` — **réservé exclusivement au produit de scoring GEO. Ne pas utiliser ici.** |

Ces deux couleurs ne doivent jamais être confondues.

### À éviter explicitement

Les directions suivantes sont devenues des signatures de génération automatique et sont à proscrire :
- fond crème chaud avec serif à fort contraste et accent terracotta,
- fond quasi noir avec un unique accent vert acide ou vermillon,
- mise en page « journal » à filets fins, angles vifs et colonnes denses.

### Plancher qualité

- Responsive jusqu'à 320 px de large.
- Focus clavier visible sur tous les éléments interactifs.
- `prefers-reduced-motion` respecté.
- Contraste WCAG AA sur tout le texte, y compris les libellés secondaires.
- Les contrôles à état utilisent `aria-pressed` ou un `<fieldset>`/`<legend>` correct, pas seulement une classe CSS.

---

## 8. Tests d'acceptation

### 8.1 Tests golden du moteur

Le moteur doit reproduire les chiffres publics à ±20 %. Ces trois cas sont bloquants :

| Cas | Paramètres | Attendu (valeur centrale) |
|---|---|---|
| Requête Gemini médiane | `moyen`, réponse courte, ~300 tokens sortie | ≈ 0,24 Wh |
| GPT-4o usage courant | `moyen`, réponse standard, ~500 tokens sortie | ≈ 0,43 Wh |
| Raisonnement, prompt long | `raisonnement`, réponse longue | ≈ 33 Wh |

Si un ajustement de coefficient casse l'un de ces trois cas, le coefficient est faux ou le modèle est faux. Ne pas ajuster les tests pour faire passer le code.

### 8.2 Vérifications fonctionnelles

- [ ] Modifier la classe de modèle change le résultat d'un facteur cohérent (≈ 100 entre `petit`/courte et `raisonnement`/longue).
- [ ] Passer la région de `fr` à `us` multiplie le CO₂e par un facteur 5 à 7, sans toucher à l'énergie ni à l'eau.
- [ ] Une saisie vide ne produit ni `NaN`, ni zéro, ni erreur console.
- [ ] Une saisie de 50 000 caractères ne fige pas la page.
- [ ] Les trois bornes de chaque indicateur sont toujours ordonnées `min ≤ central ≤ max`.
- [ ] Aucune erreur ni avertissement en console.
- [ ] `grep -c 'localStorage\|sessionStorage'` retourne 0.

---

## 9. Hors périmètre v1

À ne pas construire maintenant, mais à ne pas rendre impossible :

- Mix électrique temps réel via l'API RTE éCO2mix. Les facteurs restent en dur, mais `grid.yaml` doit être structuré pour accepter une injection horaire.
- Propagation d'incertitude par Monte Carlo. Les bornes multiplicatives suffisent, mais l'interface du moteur ne doit pas empêcher un remplacement ultérieur.
- API publique JSON.
- Comptes utilisateurs, historique, agrégation — nécessiteraient un backend, donc une sortie du mutualisé.
- Tokenizer WASM.

---

## 10. Coordonnées à intégrer

Tout livrable MKZ porte les coordonnées complètes :

- **Courriel** : contact@mkz-consulting.fr
- **Téléphone** : 07 69 09 39 09
- **Site** : https://mkz-consulting.fr

---

## 11. Définition du terminé

1. Une direction artistique a été proposée et validée avant le développement.
2. Les trois tests golden passent.
3. Toutes les cases bloquantes du §6 sont cochées.
4. La page se charge et fonctionne intégralement sans backend, servie depuis un simple répertoire statique.
5. `data/CHANGELOG.md` existe et documente la version v0.1.0.
6. Le `README.md` explique comment régénérer `index.html` depuis les fichiers YAML.
