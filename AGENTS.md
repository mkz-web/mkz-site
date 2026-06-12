<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Newsroom /conseils/ (cocons sémantiques)

- **Contenu** : les articles vivent dans `src/content/articles/*.ts` (un fichier par article, typé `Article`), générés par `node scripts/ingest-content.mjs` depuis `_content-staging/*.json` (dossier gitignoré). Le registre `src/content/articles/_registry.ts` est généré — ne pas l'éditer à la main.
- **3 cocons** (`src/lib/articles/categories.ts`) : `tutoriels` (valeur gratuite clients), `creation-site-internet`, `seo`. Chaque cocon pousse vers sa page pilier : `/creation-site-internet/`, `/referencement-seo/` (+ hub local `/agence-web-77/`).
- **Captures d'écran** : les blocs `{"type":"screenshot"}` affichent un cadre légendé tant que `src` est absent. Pour ajouter une vraie capture : déposer l'image dans `public/images/conseils/`, ajouter `"src": "/images/conseils/xxx.png"` au bloc dans `src/content/articles/<slug>.ts`, et mettre à jour `dateModified`.
- **Généré au build (jamais à la main)** : `sitemap.xml` (`src/app/sitemap.ts`), `llms.txt` et `llms-full.txt` (route handlers `src/app/llms*.txt/route.ts`) — tous alimentés par le registre d'articles. `robots.txt` reste dans `public/`.
- **Validation avant déploiement** : `node scripts/validate-out.mjs` après `next build` — reparse tous les JSON-LD de `out/` (règles ItemList/BreadcrumbList GSC), vérifie titles ≤ 65 / metas ≤ 165 et le maillage interne. À lancer systématiquement.
- **Nouvel article** : JSON conforme à `_content-staging/SPEC.md` → `node scripts/ingest-content.mjs` → build → validate → deploy → soumettre le sitemap GSC + inspecter l'URL.
- **Recherche & briefs** : `_research/` (gitignoré) contient les briefs SERP data-driven, l'analyse concurrentielle (6 concurrents) et les 8 angles « news » à publier (`tendances-news.json`, synthèse dans `SYNTHESE-CONCURRENCE-NEWSROOM.md`). Pic de recherche local ×4-8 en septembre : publier avant fin août.

# Déploiement

- Hébergement : **Cloudflare Pages** (projet `mkz-site`, compte Mkzcons@gmail.com). Production : `https://mkz-consulting.fr` (+ `mkz-site.pages.dev`).
- `npm run deploy:build` = build statique (`out/`) + direct upload via wrangler (récupéré par npx, pas de dépendance npm). Requiert `CLOUDFLARE_API_TOKEN_MKZ` (fallback `CLOUDFLARE_API_TOKEN`) + `CLOUDFLARE_ACCOUNT_ID` en variables d'environnement.
- En-têtes HTTP : `public/_headers`. Redirection www→apex : règle de redirection **dans la zone Cloudflare** (pas de `_redirects` — Pages ne supporte pas les redirections inter-hôtes). Pas de `.htaccess` (l'hébergement OVH est abandonné depuis juin 2026).
- **Crawlers IA débloqués le 11/06/2026** (stratégie GEO-first) : `ai_bots_protection=disabled` + `is_robots_txt_managed=false` sur la zone Cloudflare — c'est le `public/robots.txt` du repo qui est servi (Allow crawlers IA + Content-Signals tout à yes). **Ne pas réactiver le blocage IA Cloudflare sans décision explicite de Mickaël** : ça remettrait tous les bots IA en 403 et écraserait le robots.txt par la version managée (Disallow GPTBot/ClaudeBot/…).
