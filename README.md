<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/readme/logo-sombre.svg">
    <img src=".github/readme/logo-clair.svg" alt="MKZ" width="160">
  </picture>
</p>

<h1 align="center">mkz-consulting.fr</h1>

<p align="center">
  <strong>Le code source du site de MKZ Consulting, le cabinet de Mickaël Leclerc, consultant indépendant : création de sites internet, SEO et référencement IA pour les artisans, commerçants et TPE.</strong><br>
  Un site statique construit pour être trouvé sur Google <em>et</em> cité par ChatGPT, Perplexity ou Gemini. Chaque chiffre technique de ce dépôt est mesuré et daté.
</p>

<p align="center">
  <a href="https://mkz-consulting.fr">Site</a> ·
  <a href="https://mkz-consulting.fr/outils/">Outils gratuits</a> ·
  <a href="https://mkz-consulting.fr/conseils/">Conseils</a> ·
  <a href="https://mkz-consulting.fr/tarifs/">Tarifs</a> ·
  <a href="https://mkz-consulting.fr/contact/">Contact</a> ·
  <a href="https://mkz-consulting.fr/en/">English site</a>
</p>

<p align="center">
  <a href="https://mkz-consulting.fr"><img alt="État du site" src="https://img.shields.io/website?url=https%3A%2F%2Fmkz-consulting.fr&label=mkz-consulting.fr&up_message=en%20ligne&down_message=hors%20ligne"></a>
  <a href="https://github.com/mkz-web/mkz-site/actions/workflows/mise-en-production.yml"><img alt="Mise en production" src="https://github.com/mkz-web/mkz-site/actions/workflows/mise-en-production.yml/badge.svg?branch=master"></a>
  <a href="https://github.com/mkz-web/mkz-site/commits/master"><img alt="Dernier commit" src="https://img.shields.io/github/last-commit/mkz-web/mkz-site?label=dernier%20commit"></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white">
  <img alt="Langues FR et EN" src="https://img.shields.io/badge/langues-FR%20%7C%20EN-2E7D32">
</p>

<p align="center"><sub>Ce README est en français. <a href="#in-english">English summary at the end.</a></sub></p>

<p align="center">
  <img src=".github/readme/accueil-1280.webp" alt="Accueil de mkz-consulting.fr à 1 280 px : titre « Un site internet qui fait sonner le téléphone. », boutons « 30 min avec Mickaël, gratuites » et « Voir les prix », note 5,0 sur Google, aperçu d'un site dans une fenêtre de navigateur" width="640">
  <img src=".github/readme/accueil-375.webp" alt="Le même accueil à 375 px : une colonne, logo, bouton « Audit gratuit » et bouton « Menu » dans le premier écran" width="185">
</p>
<p align="center"><sub>Accueil en production, capturé le 27/10/2026 à 1 280 px et à 375 px, bandeau de consentement refusé avant le chargement. Logo extrait du site servi par le même script.</sub></p>

## Ce que ce dépôt contient

- ✅ **Un site bilingue en export statique.** 56 pages au sitemap le 27/10/2026 (40 en français, 16 en anglais). Le français reste à la racine des URL, l'anglais vit sous `/en/`, et les `hreflang` réciproques sont générés depuis une seule liste de paires.
- ✅ **Une charte graphique unique, en production depuis le 22/10/2026.** Les 59 pages HTML du build la portent, anglais et pages d'erreur compris. Elle a été intégrée composant par composant depuis une maquette HTML : textes, prix, données structurées et formulaires sont lus dans les données du site, pas recopiés dans le gabarit.
- ✅ **Une newsroom en cocons sémantiques.** 21 articles français en 4 cocons (tutoriels, création de site, SEO, référencement IA) et 3 articles anglais en 2 cocons. Chaque cocon pousse vers sa page pilier, et chaque article porte une barre « Résumer avec l'IA ».
- ✅ **Deux outils gratuits, sans inscription.** L'[audit SEO + IA](https://mkz-consulting.fr/audit-seo/) : 20 mesures en une minute, score sur 100, moteur exécuté en Cloudflare Pages Functions. Le [simulateur d'empreinte d'une requête IA](https://mkz-consulting.fr/empreinte-ia/) : énergie, CO2 et eau d'une question posée à un modèle, jeu de données versionné.
- ✅ **Le socle GEO.** `llms.txt`, `llms-full.txt`, `ai.txt` et `.well-known/ai.txt` générés au build depuis les mêmes sources que les pages, JSON-LD reparsé par script avant chaque publication, `robots.txt` ouvert aux robots des IA.
- ✅ **La vie privée par construction.** Bandeau de consentement maison, Google Analytics 4 et Microsoft Clarity chargés uniquement après accord, zéro ressource externe dans le HTML statique.
- ✅ **Une mise en production qui part d'un commit.** Chaque push sur `master` construit le site sous Linux, le contrôle, le publie, puis prouve que le site en ligne sert exactement ce build.
- ✅ **14 scripts Node sans dépendance.** Ingestion des articles, validation du build, contrôle de la charte, déploiement, captures d'écran, harnais de test du moteur d'audit.
- ✅ **Le journal des décisions.** Chaque choix, chaque mesure et chaque piège payé sont consignés avec leur date dans un journal tenu hors du dépôt public depuis le 09/09/2026 (il portait des notes internes). Les décisions qui structurent le code sont reprises plus bas.

## Démarrer en trois commandes

```bash
git clone https://github.com/mkz-web/mkz-site.git && cd mkz-site
npm ci
npm run dev
```

Puis, avant de proposer une modification, construire et valider le site statique comme le fait la mise en production :

```bash
npm run build
node scripts/validate-out.mjs
node scripts/controler-charte.mjs
```

Prérequis : Node 20.9 ou plus récent (exigence de Next 16.2) et Git. La production se construit avec la version du fichier [`.node-version`](.node-version), 26.12.1 le 27/10/2026. Aucun compte ni aucune clé n'est nécessaire pour développer et construire le site : un clone neuf construit seul, mesuré le 23/10/2026. Seul l'outil d'audit demande un peu plus pour tourner en local : `npx wrangler pages dev out --port 8788` sert le build avec ses fonctions, et un fichier `.dev.vars` (ignoré par git) porte les identifiants DataForSEO du bloc « autorité ». Sans eux, ces quatre mesures s'affichent « non mesuré » et le reste du scan fonctionne.

## Pourquoi c'est construit comme ça

Huit décisions structurent le dépôt. Chacune est argumentée en détail dans le journal interne du projet, tenu hors du dépôt public.

| Décision | Pourquoi | Où c'est écrit |
|---|---|---|
| Export statique, pas de serveur applicatif | Une page HTML par URL, servie par un CDN : rapide, sans coût de serveur, sans surface d'attaque applicative. La seule logique serveur, l'API du scan, vit dans une Pages Function. | `next.config.ts`, `functions/api/` |
| Deux root layouts `(fr)` et `(en)` au lieu du gabarit `[lang]` | Seul moyen d'obtenir deux attributs `lang` réels en export statique sans déplacer les URL françaises déjà indexées. | `src/app/` |
| L'anglais n'est jamais une traduction du français | Les deux versions répondent à des demandes différentes, mesurées séparément. Une page dont l'intention n'existe pas en anglais n'est pas créée, et le fichier de contenu dit pourquoi. | `src/content/en/pillars/website-design.ts` |
| « Référencement IA » plutôt que GEO, LLMO ou AEO en français | Volumes France mesurés le 07/08/2026, second semestre 2025 contre premier semestre 2026 : « référencement ia » en hausse de 50 %, « llmo » en baisse de 62 %. Le terme de tête est celui que les gens tapent. | `src/content/pillars/referencement-ia.ts` |
| La charte est intégrée, pas collée | Une maquette collée telle quelle est une photo du site : elle vieillit au premier prix changé. Ici, chaque gabarit lit les données, un article neuf prend la charte sans retouche, et `controler-charte.mjs` refuse un build où un texte des contenus n'est pas affiché sur sa page. | `src/lib/charte.ts`, `src/components/charte/`, `scripts/controler-charte.mjs` |
| Bandeau de consentement écrit maison | Le bandeau tiers occupait 67 % de l'écran mobile (mesuré le 21/08/2026) et rangeait la mesure d'audience sous « Pub personnalisée ». Le nôtre : deux boutons de même taille, refus aussi simple que l'accord, rien dans le HTML statique. | `src/components/ConsentBanner.tsx`, `src/lib/consent.ts` |
| La production est un commit | Le site en ligne est le build d'un commit public, construit sous Linux et contrôlé avant publication, puis comparé au site servi. Un poste ne publie plus qu'en secours. | `.github/workflows/mise-en-production.yml` |
| Un chiffre technique est une mesure, jamais une déduction | « Pas de JSON-LD » n'est pas « pas cité par les IA ». On mesure l'effet, avec sa date, ou on écrit « non mesuré ». | `scripts/validate-out.mjs`, `scripts/test-audit-engine.mjs` |

## Ce qui est mesuré

Tous les relevés ci-dessous sont reproductibles avec les scripts du dépôt ou les outils cités. Ce qui n'a pas été mesuré n'y figure pas.

| Invariant | Relevé | Date | Méthode |
|---|---|---|---|
| Pages publiées | 56 au sitemap (40 FR, 16 EN), 59 pages HTML dans le build | 27/10/2026 | sitemap servi, build publié |
| Site en ligne identique au build publié | 63 adresses sur 63 identiques à l'octet (57 pages, 6 fichiers techniques) | 27/10/2026 | build du commit `163d867` téléchargé depuis GitHub Actions, comparé au site servi |
| Accès réel des robots IA | 180 requêtes, 180 réponses 200, aucun `X-Robots-Tag` | 27/10/2026 | 20 user-agents (GPTBot, ClaudeBot, PerplexityBot, Googlebot...) sur 9 URL |
| Maillage interne | 56 pages du sitemap atteignables depuis l'accueil, 496 liens contextuels, 0 lien interne cassé | 27/10/2026 | `carte-maillage.js` sur le build publié |
| Ressources externes dans le HTML statique | 0 sur 59 pages | 27/10/2026 | inventaire des balises script, link, img, iframe et source du build publié |
| Recette de livraison en ligne | 0 erreur, 0 attention, sous-domaine technique fermé | 27/10/2026 | `verify-livraison.js` (robots.txt, llms.txt, sitemap, vraie 404, miroir) |
| Score de l'outil d'audit sur ce site | 89 / 100, 0 mesure non mesurée | 27/10/2026 | `node scripts/test-audit-engine.mjs --attendu-mkz` |
| Débordement horizontal | 0 px sur 56 pages, à 360 et à 375 px | 22/10/2026 | mesure au DOM, jour de la mise en production de la charte |
| Performance Lighthouse (simulée) | médiane 88 en mobile, 99 en ordinateur, sur 56 pages | 22/10/2026 | Lighthouse 13.5, 168 rapports |
| Décalage de mise en page (CLS) | 0 sur 55 pages sur 56 ; `/empreinte-ia/` à 0,136 sur un des deux passages mobiles | 22/10/2026 | mêmes rapports Lighthouse |

## Structure du dépôt

```text
.github/workflows/      mise-en-production.yml : build, contrôles, publication, preuve en ligne
.github/readme/         captures et logo de ce README, régénérés par un script
src/app/(fr)/           pages françaises, à la racine des URL
src/app/(en)/en/        pages anglaises
src/app/llms*.txt/      llms.txt et llms-full.txt générés au build ; ai.txt à côté
src/components/charte/  la charte : ChartePage, Nav, Pied, Sprite, pages/, feuilles CSS
src/components/         audit/, bandeau de consentement, chargeurs GA4 et Clarity
src/content/            articles et piliers français ; en/ pour l'anglais
src/lib/                i18n.ts (interface, paires hreflang), charte.ts, consent.ts, ai-txt.ts
functions/api/          /api/scan : moteur de l'outil d'audit (Cloudflare Pages Functions)
empreinte-ia/           simulateur d'empreinte (sans dépendance), construit dans public/
public/                 _headers (CSP, HSTS), _redirects, robots.txt, polices, images
scripts/                14 scripts Node sans dépendance (tableau ci-dessous)
```

`src/components/` garde encore les gabarits d'avant la charte (`Header`, `Footer`, `PillarContent`, `ArticleRenderer`...) : plus aucune page ne les rend depuis le 22/10/2026, ils seront retirés. Les dossiers `_content-staging/`, `_research/`, `_veille/` et `_backlinks/` sont ignorés par git : matière de travail éditoriale, pas du site.

## Scripts

Tous en Node natif, sans rien installer. Chaque script porte en tête sa commande, son runtime minimal et « Dépendances : aucune ».

| Script | Rôle |
|---|---|
| `ingest-content.mjs` | Transforme les articles du staging JSON en fichiers TypeScript typés et régénère le registre |
| `validate-out.mjs` | Reparse tous les JSON-LD du build, contrôle titles et metas, hreflang réciproques, maillage interne, `ai.txt` |
| `controler-charte.mjs` | Vérifie après le build que chaque texte des piliers et des articles (titres, paragraphes, tableaux, encadrés, FAQ) est affiché mot pour mot sur sa page ; code 1 sinon |
| `aplatir-segments-export.mjs` | Enchaîné par `npm run build` : remet sous leur nom à points les fichiers de segment que l'export de Next range en sous-dossiers sous Windows (issue vercel/next.js 85374), sans quoi chaque lien préchargé sort en 404 |
| `deploy.mjs` | Publie `out/` et `functions/` sur Cloudflare Pages par upload direct (wrangler via npx) ; refuse un build dont les segments ne sont pas aplatis |
| `test-audit-engine.mjs` | Harnais de vérité terrain du moteur d'audit ; `--attendu-mkz` compare au résultat attendu sur ce site |
| `capturer-accueil-readme.mjs` | Captures réelles de l'accueil en production pour ce README, bandeau refusé, contrôles avant capture ; extrait aussi le logo clair et sombre du site servi |
| `capturer-apercu-scan.mjs` | Capture réelle du résultat du scan ; ses images ne sont plus affichées depuis la charte |
| `convertir-captures.mjs` | Convertit des captures PNG en WebP avec le canvas de Chrome en headless |
| `verify-coordonnees.mjs` | Vérifie qu'un crawler sans JavaScript lit bien les coordonnées légales |
| `ga4-admin.mjs` | Administration GA4 par l'API Admin : événements clés, mesure avancée |
| `download-fonts.mjs` | Récupère les polices d'avant la charte en woff2 ; celles de la charte (Inter, Montserrat) sont déjà dans `public/fonts/` |
| `generate-favicon.mjs` | Génère l'ancien favicon. À ne plus lancer : les icônes de la charte vivent dans `src/app/` (`favicon.ico`, `icon.svg`, `apple-icon.png`) |
| `generate-og-image.mjs` | Génère l'image OpenGraph 1200 × 630 |

Le sous-projet `empreinte-ia/` a ses propres commandes : `npm run build:empreinte` et `npm run test:empreinte` (tests golden du moteur de calcul).

## Déploiement

Hébergement Cloudflare Pages, projet `mkz-site`, production sur `https://mkz-consulting.fr`. Le sous-domaine technique `mkz-site.pages.dev` est fermé par Cloudflare Access et en `noindex` : ce n'est pas une adresse publique.

La mise en production part de GitHub. Chaque push sur `master` lance le workflow [`mise-en-production.yml`](.github/workflows/mise-en-production.yml) : build sous Linux avec la version de Node du fichier `.node-version`, `validate-out.mjs` et `controler-charte.mjs`, publication de `out/` et `functions/` par `scripts/deploy.mjs` seulement si tout est vert, puis preuve que le site en ligne sert ce build (six fichiers techniques identiques à l'octet, `POST /api/scan` en phase `origin` qui répond 200). Le build publié reste téléchargeable 14 jours dans l'onglet Actions. Secrets du dépôt : `CLOUDFLARE_API_TOKEN` (jeton limité à Cloudflare Pages) et `CLOUDFLARE_ACCOUNT_ID`.

Depuis un poste, en secours seulement (la commande publie aussi en production) :

```bash
npm run deploy:build   # build puis publication
npm run deploy         # publication d'un out/ déjà construit
```

Variables d'environnement attendues sur le poste : `CLOUDFLARE_API_TOKEN_MKZ` (repli sur `CLOUDFLARE_API_TOKEN`) et `CLOUDFLARE_ACCOUNT_ID`. Les identifiants DataForSEO de l'outil d'audit sont des secrets du projet Pages, jamais des fichiers du dépôt. Un secret ou un binding ajouté après coup n'atteint le site qu'à la republication suivante.

Après une mise en production qui ajoute, modifie ou retire des pages, restent deux gestes hors workflow : prévenir Bing par IndexNow (la clé publique est dans `public/`) et resoumettre le sitemap dans la Search Console.

## Contribuer, signaler

Le dépôt est public pour montrer comment le site est fait. Les [issues](https://github.com/mkz-web/mkz-site/issues) sont ouvertes : coquille, lien cassé, défaut d'affichage sur un appareil, chiffre qui a vieilli. Une pull request de correction est la bienvenue si elle respecte trois règles :

1. **Tout contenu existe en français et en anglais**, et l'anglais n'est pas une traduction. Une page dans une seule langue est un travail inachevé.
2. **Un chiffre technique est une mesure datée**, jamais une estimation. S'il ne peut pas être mesuré, on écrit « non mesuré ».
3. **`validate-out.mjs` et `controler-charte.mjs` passent** sur le build avant toute demande de fusion.

Une fusion sur `master` part en production en un peu plus d'une minute (66 s pour le premier passage du workflow, le 23/10/2026) : la relecture se fait avant, jamais après. Les articles ne s'éditent pas directement dans `src/content/articles/` : ils y sont générés depuis le staging, et l'ingestion suivante écraserait la modification.

## À propos

**MKZ**, SAS à associé unique, SIRET 983 662 784 00013, RCS Meaux. 1 rue Françoise Sagan, 77230 Dammartin-en-Goële. Le cabinet de [Mickaël Leclerc](https://mkz-consulting.fr/about/), ingénieur IT depuis plus de vingt ans (infrastructure, automatisation, DevOps), consultant indépendant en SEO et référencement IA en Seine-et-Marne. Un consultant, pas une agence : la personne qui répond est celle qui fait.

Contact : [contact@mkz-consulting.fr](mailto:contact@mkz-consulting.fr) · 07 69 09 39 09 · [Réserver 30 minutes d'audit gratuit](https://calendly.com/mkz-consulting/30min)

## Licence

Pas de licence open source. Le code, les contenus, la marque et les visuels restent la propriété de MKZ : tous droits réservés. Le dépôt est lisible pour la transparence et l'inspiration ; il n'est pas réutilisable tel quel.

## In English

This is the source code of [mkz-consulting.fr](https://mkz-consulting.fr/en/), the website of MKZ Consulting: the practice of Mickaël Leclerc, an independent consultant near Paris (not an agency) who builds websites and handles SEO and AI search visibility. The site is a bilingual static export built with Next.js 16 and hosted on Cloudflare Pages: 56 pages in the sitemap on 27 October 2026 (40 French, 16 English), one design system across every page since 22 October 2026, a newsroom of 24 articles organised in topic clusters, two free tools (a 20-check [SEO + AI audit](https://mkz-consulting.fr/en/seo-audit/) running on Pages Functions, and an AI query footprint simulator), generated `llms.txt` and `ai.txt` files, script-validated JSON-LD, and a home-made consent banner that loads analytics only after opt-in.

The English pages are never translations: each one targets a demand measured separately, mainly foreign companies that need the French market to work for them. Every push to `master` is built on Linux, checked, deployed, then compared byte for byte with the live site by a GitHub Actions workflow. Every technical figure in this README was measured on a stated date; anything unmeasured is left out. Quick start: `npm ci`, `npm run dev`, then `npm run build`, `node scripts/validate-out.mjs` and `node scripts/controler-charte.mjs`. No open source licence: all rights reserved.
