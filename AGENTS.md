<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Site bilingue : RÈGLE ABSOLUE

**Tout nouveau contenu se fait en français ET en anglais.** Décidé le 30/07/2026 à la création de la version anglaise. Une page publiée dans une seule langue est un travail inachevé, pas une étape.

- **L'anglais n'est jamais une traduction du français.** Les deux versions répondent à des demandes différentes, mesurées séparément. Le français vise la demande locale (artisans, commerçants, TPE d'Île-de-France) ; l'anglais vise les entreprises étrangères qui ont besoin que le marché français fonctionne, plus la visibilité dans les moteurs de réponse IA. Avant d'écrire une page anglaise, **mesurer les volumes anglais** (DataForSEO) : si l'intention n'existe pas en anglais, ne pas créer la page et écrire pourquoi dans l'en-tête du fichier de contenu (voir `src/content/en/pillars/website-design.ts`, qui documente 10 recherches/mois et assume d'être une page de conversion, pas une page SEO).
- **Architecture** : URLs françaises inchangées à la racine, anglais sous `/en/`. Deux root layouts via route groups `src/app/(fr)/` et `src/app/(en)/`, seul moyen d'avoir deux attributs `lang` réels avec `output: "export"` (le pattern `[lang]` documenté par Next exige un proxy, impossible en export statique, et déplacerait les URLs indexées).
- **Ajouter une paire de pages** : créer les deux pages, puis déclarer la paire dans `pagePairs` (`src/lib/i18n.ts`). C'est cette liste qui produit les `hreflang` du `<head>` ET du sitemap. Une page sans équivalent (ex. `/agence-web-77/`, `/services/`) ne déclare pas d'alternative : c'est un choix mesuré, pas un oubli.
- **Textes d'interface** : jamais en dur dans un composant, toujours dans le dictionnaire `ui` de `src/lib/i18n.ts`. Les composants de gabarit (`PillarContent`, `ArticleRenderer`, `ConseilsContent`, `CategoryContent`, `ContactForm`, `Header`, `Footer`) prennent une prop `locale`.
- **Titles** : ne JAMAIS écrire « | MKZ » dans un `title` de page, le template du layout l'ajoute. Seule exception : `src/app/(fr)/page.tsx`, car une page du même segment que son layout n'hérite pas du template Next (sinon le suffixe apparaît deux fois).
- **Articles anglais** : `src/content/en/articles/*.ts` avec `locale: "en"`, registre `_registry.ts` tenu **à la main** (`ingest-content.mjs` ne génère que le français). Cocons anglais : `french-seo` et `ai-search` (`src/lib/articles/categories-en.ts`).
- **Validation** : `node scripts/validate-out.mjs` contrôle aussi la cohérence `lang`, la réciprocité hreflang, la présence de `x-default` et l'existence réelle de chaque cible d'alternative. Un hreflang non réciproque est ignoré par Google, qui choisit alors lui-même la version à servir.

# Newsroom /conseils/ (cocons sémantiques)

- **Contenu** : les articles vivent dans `src/content/articles/*.ts` (un fichier par article, typé `Article`), générés par `node scripts/ingest-content.mjs` depuis `_content-staging/*.json` (dossier gitignoré). Le registre `src/content/articles/_registry.ts` est généré, ne pas l'éditer à la main.
- **3 cocons** (`src/lib/articles/categories.ts`) : `tutoriels` (valeur gratuite clients), `creation-site-internet`, `seo`. Chaque cocon pousse vers sa page pilier : `/creation-site-internet/`, `/referencement-seo/` (+ hub local `/agence-web-77/`).
- **Captures d'écran** : les blocs `{"type":"screenshot"}` affichent un cadre légendé tant que `src` est absent. Pour ajouter une vraie capture : déposer l'image dans `public/images/conseils/`, ajouter `"src": "/images/conseils/xxx.png"` au bloc dans `src/content/articles/<slug>.ts`, et mettre à jour `dateModified`.
- **Généré au build (jamais à la main)** : `sitemap.xml` (`src/app/sitemap.ts`), `llms.txt` et `llms-full.txt` (route handlers `src/app/llms*.txt/route.ts`), tous alimentés par le registre d'articles. `robots.txt` reste dans `public/`.
- **Validation avant déploiement** : `node scripts/validate-out.mjs` après `next build` : reparse tous les JSON-LD de `out/` (règles ItemList/BreadcrumbList GSC), vérifie titles ≤ 65 / metas ≤ 165 et le maillage interne. À lancer systématiquement.
- **Nouvel article** : JSON conforme à `_content-staging/SPEC.md` → `node scripts/ingest-content.mjs` → build → validate → deploy → soumettre le sitemap GSC + inspecter l'URL.
- **Recherche & briefs** : `_research/` (gitignoré) contient les briefs SERP data-driven, l'analyse concurrentielle (6 concurrents) et les 8 angles « news » à publier (`tendances-news.json`, synthèse dans `SYNTHESE-CONCURRENCE-NEWSROOM.md`). Pic de recherche local ×4-8 en septembre : publier avant fin août.

# Déploiement

- Hébergement : **Cloudflare Pages** (projet `mkz-site`, compte Mkzcons@gmail.com). Production : `https://mkz-consulting.fr` (+ `mkz-site.pages.dev`).
- `npm run deploy:build` = build statique (`out/`) + direct upload via wrangler (récupéré par npx, pas de dépendance npm). Requiert `CLOUDFLARE_API_TOKEN_MKZ` (fallback `CLOUDFLARE_API_TOKEN`) + `CLOUDFLARE_ACCOUNT_ID` en variables d'environnement.
- En-têtes HTTP : `public/_headers`. Redirection www→apex : règle de redirection **dans la zone Cloudflare** (pas de `_redirects`, Pages ne supporte pas les redirections inter-hôtes). Pas de `.htaccess` (l'hébergement OVH est abandonné depuis juin 2026).
- **Crawlers IA débloqués le 11/06/2026** (stratégie GEO-first) : `ai_bots_protection=disabled` + `is_robots_txt_managed=false` sur la zone Cloudflare : c'est le `public/robots.txt` du repo qui est servi (Allow crawlers IA + Content-Signals tout à yes). **Ne pas réactiver le blocage IA Cloudflare sans décision explicite de Mickaël** : ça remettrait tous les bots IA en 403 et écraserait le robots.txt par la version managée (Disallow GPTBot/ClaudeBot/…).
- **Obfuscation e-mail désactivée le 30/07/2026** (`email_obfuscation=off`, zone `97f939b5ac384f6d885eedacb1da4777`). Elle était sur `on`, la valeur par défaut de Cloudflare, jamais modifiée. Scrape Shield réécrivait chaque `mailto:` en `<span class="__cf_email__">[email protected]</span>` + script de décodage, **sur les 10 pages du site**. Effet mesuré : un crawler sans JavaScript ne lisait pas l'adresse, alors que la LCEN impose un moyen de contact et que la stratégie GEO vise justement la citabilité. **Ne pas réactiver sans décision explicite de Mickaël.** Piège à connaître : le défaut est invisible depuis le dépôt et depuis `*.pages.dev`, la transformation n'ayant lieu que sur la zone. Contrôle : `node scripts/verify-coordonnees.mjs https://mkz-consulting.fr` (ou chercher `__cf_email__` dans le HTML servi).
