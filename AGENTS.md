<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Déploiement

- Hébergement : **Cloudflare Pages** (projet `mkz-site`, compte Mkzcons@gmail.com). Production : `https://mkz-consulting.fr` (+ `mkz-site.pages.dev`).
- `npm run deploy:build` = build statique (`out/`) + direct upload via wrangler (récupéré par npx, pas de dépendance npm). Requiert `CLOUDFLARE_API_TOKEN_MKZ` (fallback `CLOUDFLARE_API_TOKEN`) + `CLOUDFLARE_ACCOUNT_ID` en variables d'environnement.
- En-têtes HTTP : `public/_headers`. Redirection www→apex : règle de redirection **dans la zone Cloudflare** (pas de `_redirects` — Pages ne supporte pas les redirections inter-hôtes). Pas de `.htaccess` (l'hébergement OVH est abandonné depuis juin 2026).
