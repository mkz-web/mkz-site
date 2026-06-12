# MKZ — Création de sites internet & SEO pour artisans et indépendants

> **Votre site web visible sur Google, enfin.**

MKZ aide les artisans, commerçants, professions libérales et TPE à obtenir un site internet professionnel qui génère des clients grâce au référencement naturel (SEO).

**Site web :** [mkz-consulting.fr](https://mkz-consulting.fr)
**Contact :** [contact@mkz-consulting.fr](mailto:contact@mkz-consulting.fr) | 07 69 09 39 09
**Audit gratuit :** [Réserver 30 min](https://calendly.com/mkz-consulting/30min)

---

## Nos services

### Création de site internet

Un site qui vous ressemble et qui convertit. Design sur-mesure, UX optimisée, et performances au top pour transformer vos visiteurs en clients.

- Image de marque et direction artistique
- Design responsive (mobile, tablette, desktop)
- Optimisation vitesse (Core Web Vitals)
- Branding complet

### SEO & Référencement Google

Montez sur le podium Google. Stratégie de mots-clés, optimisation technique, contenu optimisé et netlinking pour un trafic qualifié et durable.

- Audit SEO complet
- Stratégie de contenu et cocon sémantique
- SEO technique (vitesse, structure, balisage)
- Suivi mensuel avec reporting transparent

---

## Résultats

| Métrique | Résultat |
|---|---|
| Trafic organique moyen | **+247%** |
| Position moyenne Google | **Top 3** |
| Leads qualifiés | **+89%** |
| Temps de charge | **1.2s** (Core Web Vitals validé) |

---

## La méthode MKZ

1. **Audit gratuit** — 30 min pour analyser votre situation et identifier les quick wins
2. **Stratégie sur-mesure** — Plan d’action personnalisé avec objectifs clairs et budget défini
3. **Résultats mesurables** — Exécution, suivi mensuel, reporting transparent

---

## FAQ

### Combien coûte un site internet pour un artisan ?

Le prix varie selon vos besoins. Chez MKZ, nous proposons des solutions sur mesure adaptées au budget des TPE et indépendants. Réservez un [audit gratuit](https://calendly.com/mkz-consulting/30min) pour obtenir un devis personnalisé.

### Combien de temps faut-il pour être visible sur Google ?

Les premiers résultats SEO apparaissent généralement entre 3 et 6 mois. Nos clients constatent en moyenne un triplement de leur trafic.

### Pourquoi mon entreprise n’apparaît pas sur Google ?

Plusieurs raisons possibles : site non optimisé pour le SEO, absence de contenu pertinent, problèmes techniques, ou fiche Google Business Profile incomplète. Un audit gratuit permet d’identifier les blocages.

### Quelle est la différence entre SEO et SEA ?

Le SEO génère du trafic gratuit et durable en optimisant votre site pour Google. Le SEA (publicité payante) donne des résultats immédiats mais s’arrête dès que vous cessez de payer. Chez MKZ, nous privilégions le SEO pour un ROI long terme.

### Est-ce que je garde la propriété de mon site ?

Oui, absolument. Votre site vous appartient à 100%. Vos accès, votre code, vos contenus. Si vous décidez de partir, vous partez avec tout.

---

## Zones d’intervention

Basé à **Dammartin-en-Goële (77)**, MKZ intervient dans toute l’Île-de-France et partout en France.

**Villes :** Paris, Meaux, Chelles, Melun, Roissy, Senlis, Marne-la-Vallée, Serris, Provins, Fontainebleau, Créteil, Saint-Denis, Bobigny, Montreuil, Cergy, Pontoise, Versailles, Évry, Nanterre

**Départements :** Seine-et-Marne (77), Val-de-Marne (94), Seine-Saint-Denis (93), Val-d’Oise (95), Hauts-de-Seine (92), Yvelines (78), Essonne (91)

---

## Stack technique

| Technologie | Usage |
|---|---|
| [Next.js 16](https://nextjs.org) | Framework React (App Router, export statique) |
| [Emotion](https://emotion.sh) | CSS-in-JS (styled-components) |
| TypeScript | Typage statique |
| JSON-LD | Données structurées (Organization, LocalBusiness, Service, FAQPage) |
| [Cloudflare Pages](https://pages.cloudflare.com) | Hébergement (export statique, direct upload) |

## Développement

```bash
# Installation
npm install

# Serveur de développement
npm run dev

# Build (génère le dossier out/)
npm run build

# Validation SEO du build (JSON-LD, titles/metas, maillage interne)
node scripts/validate-out.mjs
```

## Newsroom `/conseils/`

Le site embarque une newsroom organisée en 3 cocons sémantiques (tutoriels clients, création de site internet, SEO), reliés aux pages piliers `/creation-site-internet/`, `/referencement-seo/` et `/agence-web-77/`.

- Les articles vivent dans `src/content/articles/*.ts` (générés par `node scripts/ingest-content.mjs`).
- `sitemap.xml`, `llms.txt` et `llms-full.txt` sont **générés au build** depuis le registre d'articles.
- Les emplacements de captures d'écran des tutoriels s'activent en ajoutant `src` aux blocs `screenshot` (images dans `public/images/conseils/`).

## Déploiement (Cloudflare Pages)

Le build génère un dossier `out/` contenant le site statique complet, déployé sur le projet Cloudflare Pages `mkz-site` (production : `https://mkz-site.pages.dev` → `https://mkz-consulting.fr`).

```bash
# Build + déploiement
npm run deploy:build

# Déploiement seul (out/ existant)
npm run deploy
```

Variables d'environnement requises : `CLOUDFLARE_API_TOKEN_MKZ` (token API avec permission *Cloudflare Pages:Edit* — fallback `CLOUDFLARE_API_TOKEN`) et `CLOUDFLARE_ACCOUNT_ID`. Aucune dépendance npm : `wrangler` est récupéré à la volée par `npx`.

Les en-têtes HTTP (sécurité, cache) sont définis dans `public/_headers`. La redirection www → apex est une règle de redirection dans la zone Cloudflare (Pages ne supporte pas les redirections inter-hôtes via `_redirects`). HTTPS forcé, compression et clean URLs sont natifs chez Cloudflare Pages (l'ancien `.htaccess` OVH a été retiré).

---

## À propos de MKZ

**MKZ** — SAS à associé unique
SIRET : 983 662 784 00013 | RCS Meaux
1 rue Françoise Sagan, 77230 Dammartin-en-Goële

Fondé par **Mickaël Leclerc**, ingénieur IT avec +20 ans d’expérience en infrastructure, automatisation et DevOps.

---

*© 2026 MKZ. Tous droits réservés.*
