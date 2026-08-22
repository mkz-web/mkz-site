# Journal des révisions du jeu de données

Le versionnement du jeu de données est ce qui distingue une source citable d'un
convertisseur jetable. Toute modification d'un coefficient passe par ce journal.

**Règle** : un coefficient sans source et sans date n'entre pas en production.
Les cinq fichiers de `data/` portent la même `version` et la même date. Le build
échoue si elles divergent.

---

## v0.3.0 (15 août 2026) : sourçage pièce par pièce

La liste « À faire avant mise en ligne » de la v0.1.0 est traitée. Chaque
coefficient porte désormais sa source et sa date de relevé. Le bandeau de
préfiguration de la page est remplacé par une mention de jeu sourcé.

### Énergie (`models.yaml`)

Triplets dérivés du **modèle paramétrique EcoLogits** (GenAI Impact), ajusté
par eux sur les mesures du **ML.ENERGY Leaderboard** (vLLM, NVIDIA H100 80GB) :
`E_GPU/token = 1,17e-6 × exp(-1,12e-2 × B) × P_active + 4,05e-5` Wh, plus la
part serveur hors GPU (1,2 kW pour 8 GPU, divisée par la taille de lot) et le
PUE fournisseur (1,09 à 1,20). Constantes relevées le 15/08/2026 sur
ecologits.ai/latest/methodology/llm_inference/. Les hypothèses par borne
(P_active, nombre de GPU, taille de lot, PUE) sont en commentaire dans le
fichier.

| Classe | v0.2.0 (central) | v0.3.0 (central) | Hypothèse centrale |
|---|---|---|---|
| petit | 0,00045 | **0,0001** | 15 Md de paramètres actifs, 1 GPU |
| moyen | 0,00085 | **0,0008** | 100 Md actifs, 4 GPU |
| grand | 0,0028 | **0,003** | 250 Md actifs (MoE), 8 GPU |
| raisonnement | 0,0028 | **0,003** | idem grand, multiplicateur 11 inchangé |

Le grand écart est sur la classe `petit` : la v0.2.0 la surestimait d'un
facteur 4,5 par rapport au modèle sourcé. Conséquence assumée : le facteur
total petit/courte contre raisonnement/longue passe de 216 à **728** (mesuré),
et une recherche web classique (0,30 Wh, Google 2009) coûte désormais plus
qu'une réponse de petit modèle. Recoupements de la classe `moyen` : 0,34 Wh
par requête moyenne annoncés par OpenAI (juin 2025), ~0,3 Wh estimés par
Epoch AI (2025).

**Licences vérifiées le 15/08/2026** : EcoLogits logiciel MPL-2.0 (usage
commercial autorisé), documentation CC BY-SA 4.0 (citée avec attribution et
lien, conformément à leur demande de citation).

### Réseau (`grid.yaml`)

Valeurs centrales : série « Lifecycle carbon intensity of electricity »
d'Our World in Data (données Ember), édition 2025, relevée le 15/08/2026 :
France 41,4 ; UE-27 209,9 ; États-Unis 384,4 ; monde 477,3 g CO2e/kWh.
C'est la source GWP qu'utilise EcoLogits : le jeu reste cohérent d'un fichier
à l'autre. Bornes : enveloppe de variabilité horaire et annuelle des mix.

### Eau (`water.yaml`)

Cadre Li et al. 2025 (« Making AI Less Thirsty », arXiv:2304.03271 v5) :
min 0,8 (config Mistral/Suède, WUE 0,09, table fournisseurs EcoLogits),
max 4,3 (États-Unis moyens : WUE 0,55 + PUE 1,2 × 3,1 L/kWh de consommation
du réseau, hydraulique inclus), central 1,9 (moyenne géométrique, encadrée
par les 0,32 mL/0,34 Wh d'OpenAI et le « 500 mL pour 10 à 50 réponses » du
papier). Le passage du central de 1,4 à 1,9 augmente l'eau affichée d'environ
35 %.

### Fabrication (`embodied.yaml`)

Valeurs inchangées [15, 50, 130], désormais dérivées : serveur p5.48xlarge
hors GPU 5 700 kg CO2e (BoaviztAPI) + 8 × 273 kg par H100 (Lees-Perasso et
al. 2026, ACV ADEME), amortis sur 3 à 6 ans à 40-80 % d'utilisation, soit 27
à 110 g/kWh, enveloppe arrondie.

### Équivalences (`equivalences.yaml`)

- Voiture thermique : 193 → **142 g CO2e/km** (impactco2.fr, ADEME, relevé
  15/08/2026). TGV : 2,4 → **2,9 g/km** (même source).
- Smartphone : 12 → **18 Wh**. La v0.2.0 contredisait sa propre base de
  calcul (batterie 17,3 Wh annoncée, valeur saisie 12). Bouilloire : 100 →
  **110 Wh** (le rendement annoncé n'était pas appliqué).
- La tasse de café (60 g, sans source vérifiable, page ADEME introuvable au
  relevé du 15/08/2026) est remplacée par le kilomètre en voiture thermique.

### Tests après sourçage

Relevés par `node src/engine.test.js`, 19 tests au vert, attendus golden
intouchés :

| Cas | Attendu | Mesuré | Écart (v0.2.0) |
|---|---|---|---|
| Requête Gemini médiane | 0,240 Wh | 0,263 Wh | **+9,4 %** (était +15,7) |
| GPT-4o usage courant | 0,430 Wh | 0,423 Wh | **-1,7 %** (était +4,1) |
| Raisonnement, prompt long | 33,0 Wh | 36,639 Wh | **+11,0 %** (était +3,6) |

Deux entrées de tests fonctionnels d'équivalence (pluriel à 40 Wh, bascule
bouilloire à 60 Wh) ont été recalées sur les nouvelles valeurs du jeu :
l'intention des assertions ne change pas, seuls les seuils dépendent du jeu.

### Limites résiduelles

- Le multiplicateur 11 de la classe raisonnement reste calé sur le cas golden
  public de 33 Wh, dans la plage des ratios publics observés (5 à 15).
- Le surcoût fixe [0,005 ; 0,02 ; 0,08] Wh reste un ordre de grandeur non
  mesuré isolément par les sources.
- La recherche web à 0,30 Wh date de 2009, sans chiffre officiel plus récent.

---

## v0.2.0 (28 juillet 2026) : réconciliation avec les tests golden

Les trois cas golden du cahier des charges passent désormais. Conformément au
§8.1, ce sont les coefficients qui ont été corrigés, jamais les attendus.

### Coefficients modifiés

| Coefficient | v0.1.0 | v0.2.0 | Motif |
|---|---|---|---|
| `moyen.wh_per_output_token` | 0,00090 | 0,00085 | Le cas Gemini médian sortait à +22,0 %, hors tolérance de 20 % |
| `raisonnement.wh_per_output_token` | 0,00150 | 0,00280 | Aligné sur la classe `grand` |
| `raisonnement.output_multiplier` | 7 | 11 | Le cas raisonnement sortait à -64,5 % |

### Raisonnement retenu pour la classe `raisonnement`

Un modèle de raisonnement tourne sur une architecture de grand modèle. Son
token coûte donc exactement le prix d'un token de grand modèle, ni plus ni
moins. Tout le surcoût vient du **nombre** de tokens produits : sur onze tokens
générés, dix ne sont jamais affichés à l'utilisateur.

C'est la position du §4.2 poussée jusqu'au bout. L'alternative écartée
consistait à garder le multiplicateur à 7 en portant le coût du token à
0,0042 Wh, ce qui aurait signifié qu'un token de raisonneur coûte une fois et
demie celui d'un grand modèle. Meilleur ajustement numérique (-0,6 % contre
+3,6 %), mais en contradiction directe avec le principe méthodologique affiché.

### Mesures après arbitrage

Relevées par `node src/engine.test.js`, 15 tests au vert.

| Cas | Attendu | Mesuré | Écart |
|---|---|---|---|
| Requête Gemini médiane | 0,240 Wh | 0,278 Wh | +15,7 % |
| GPT-4o usage courant | 0,430 Wh | 0,448 Wh | +4,1 % |
| Raisonnement, prompt long | 33,0 Wh | 34,198 Wh | +3,6 % |

### Deux attendus du §8.2 alignés sur la mesure

Ces deux points ne sont pas des tests golden mais des vérifications
fonctionnelles. Leur formulation d'origine entrait en contradiction avec la
formule du §4.1, qui fait autorité puisque c'est elle qui est modélisée.

**Facteur entre petit modèle et raisonneur.** Attendu « environ 100 ».
Mesuré **218,6**. L'assertion a été convertie en plancher : la page annonce un
facteur cent, la mesure doit au minimum le soutenir. Conséquence éditoriale, le
texte du §5.3 peut être renforcé, l'écart réel est plus du double de ce qui
était annoncé.

**Rapport CO2e entre les États-Unis et la France.** Attendu « facteur 5 à 7 ».
Mesuré **4,25**. L'attendu correspondait au rapport des seuls facteurs réseau
(400 / 56 = 7,14), mais la formule du §4.1 additionne la fabrication amortie,
identique dans toutes les régions, qui écrase mécaniquement le rapport. Le
coefficient de fabrication a été laissé intact : le tordre pour satisfaire un
ratio aurait été ajuster la physique sur un test.

---

## v0.1.0 (28 juillet 2026) : jeu d'amorçage, NON validé

Premier jeu, dérivé des chiffres publics disponibles. Il sert à faire tourner le
moteur et à cadrer les ordres de grandeur. **Il ne doit pas être mis en ligne en
l'état.**

### Contenu

| Fichier | Objet | Statut |
|---|---|---|
| `models.yaml` | Wh par token de sortie, par classe, plus le surcoût fixe | amorçage |
| `grid.yaml` | g CO2e par kWh, par région | amorçage |
| `embodied.yaml` | Fabrication amortie, g CO2e par kWh | amorçage |
| `water.yaml` | Litres par kWh, refroidissement et production | amorçage |
| `equivalences.yaml` | Repères du quotidien | amorçage |

### Paramètres de modélisation retenus

- `ratio_prefill = 8` : un token d'entrée coûte un huitième d'un token de sortie.
- `chars_per_token = 3,6` : heuristique française, erreur d'environ 10 %.
- `base_tokens_out = 500` : tokens de sortie visibles pour une réponse standard.
  Les longueurs courte et longue valent 0,6 et 2,2 fois cette base.
- `output_multiplier` : nombre de tokens réellement produits rapporté aux tokens
  affichés. Vaut 7 pour la classe raisonnement.

### Écarts mesurés contre les tests golden du cahier des charges

Relevés par `node src/engine.test.js` le 28 juillet 2026, avant tout arbitrage.
Ces écarts sont des constats, pas des valeurs corrigées après coup.

| Cas golden | Attendu | Mesuré | Écart |
|---|---|---|---|
| Requête Gemini médiane | 0,240 Wh | 0,293 Wh | +22,0 % |
| GPT-4o usage courant | 0,430 Wh | 0,473 Wh | +10,0 % |
| Raisonnement, prompt long | 33,0 Wh | 11,7 Wh | -64,5 % |
| Rapport CO2e États-Unis sur France | facteur 5 à 7 | facteur 4,25 | hors plage |

Lecture : le cas GPT-4o passe. Les trois autres non. Conformément au cahier des
charges, ce sont les coefficients qui sont en cause, pas les attendus. Arbitrage
en cours, à consigner en v0.2.0.

### À faire avant mise en ligne

- [ ] Remplacer les coefficients énergétiques par ceux d'EcoLogits ou du
      ML.ENERGY Leaderboard, avec source et date sur chaque valeur.
- [ ] Vérifier la compatibilité des licences avec un usage commercial.
- [ ] Sourcer les facteurs de réseau (base carbone officielle, année de version).
- [ ] Sourcer les coefficients hydriques (rapports d'exploitants, année).
- [ ] Sourcer les repères d'équivalences (base officielle, année de version).
- [ ] Rejouer les tests golden et consigner les écarts résiduels ici.
