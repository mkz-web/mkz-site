# Redirection mon-empreinte-ia.fr vers mkz-consulting.fr/empreinte-ia/

> Dossier d'exécution préparé le 15 août 2026. Décision de fond : voir `CLAUDE.md`.
> Tout ce qui suit repose sur des mesures du 15 août 2026, pas sur des suppositions.

## Cible

Toutes les variantes du domaine renvoient un **301 permanent** vers l'URL unique :

| Source | Destination |
|---|---|
| `http://mon-empreinte-ia.fr/*` | `https://mkz-consulting.fr/empreinte-ia/` |
| `https://mon-empreinte-ia.fr/*` | `https://mkz-consulting.fr/empreinte-ia/` |
| `http://www.mon-empreinte-ia.fr/*` | `https://mkz-consulting.fr/empreinte-ia/` |
| `https://www.mon-empreinte-ia.fr/*` | `https://mkz-consulting.fr/empreinte-ia/` |

Le HTTPS sur le domaine source est **non négociable** : les navigateurs tentent
HTTPS d'abord, et une adresse donnée à l'oral qui affiche une erreur de
certificat est pire que pas d'adresse du tout.

## État mesuré le 15 août 2026

| Élément | Valeur relevée |
|---|---|
| NS de mon-empreinte-ia.fr | `dns106.ovh.net` / `ns106.ovh.net` (zone chez OVH) |
| NS de mkz-consulting.fr | `maxim.ns.cloudflare.com` / `katja.ns.cloudflare.com` (**site servi par Cloudflare**, pas par le mutualisé OVH) |
| A @ et A www (mon-empreinte-ia.fr) | `213.186.33.5` (IP de parking OVH) |
| TXT @ | `"1\|www.mon-empreinte-ia.fr"` (redirection de parking OVH apex vers www) |
| TXT www | `"3\|welcome"` (page « welcome » du parking OVH) |
| MX | `mx1.mail.ovh.net` (1), `mx2.mail.ovh.net` (5), `mx3.mail.ovh.net` (100) + SPF `include:mx.ovh.com` |
| `http://mon-empreinte-ia.fr/` | répond **302** (service de parking OVH, HTTP seulement) |
| `https://mkz-consulting.fr/empreinte-ia/` | répond **404** : la page n'est pas encore déployée |
| Hébergement OVH `mkz-consulting.fr` | existe (offre `hosting-starter`, cluster021, IP mesurée `188.165.53.185`) mais **dormant** : le DNS du site ne pointe plus dessus |

## Ordre d'exécution

**D'abord publier la page, ensuite activer la redirection.** Tant que
`https://mkz-consulting.fr/empreinte-ia/` répond 404, une redirection ne mène
nulle part. Le domaine peut rester en parking sans dommage : personne ne le
connaît encore.

## Plan A (recommandé) : la redirection vit chez Cloudflare

Le site cible est déjà derrière Cloudflare. Y placer aussi le domaine met la
redirection au même endroit que le reste de l'infrastructure mkz, donne le
HTTPS gratuit sur le domaine source (Universal SSL), et rend triviale la bascule
future prévue au `CLAUDE.md` (le jour où le contenu part sur le domaine propre,
la règle s'inverse dans le même écran).

OVH garde deux rôles, et deux seulement : registrar du domaine, et serveur mail
(les MX restent chez OVH, seuls les enregistrements DNS déménagent).

### Étapes (manuel, tableau de bord Cloudflare + manager OVH, ~15 min)

1. **Cloudflare, Add a site** : `mon-empreinte-ia.fr`, plan Free.
2. **Recréer la zone DNS dans Cloudflare AVANT de changer les NS** :

   | Type | Nom | Valeur | Proxy |
   |---|---|---|---|
   | A | `@` | `192.0.2.1` (IP factice, le proxy sert la redirection) | Activé (orange) |
   | CNAME | `www` | `mon-empreinte-ia.fr` | Activé (orange) |
   | MX | `@` | `mx1.mail.ovh.net` priorité 1 | DNS only |
   | MX | `@` | `mx2.mail.ovh.net` priorité 5 | DNS only |
   | MX | `@` | `mx3.mail.ovh.net` priorité 100 | DNS only |
   | TXT | `@` | `v=spf1 include:mx.ovh.com -all` | DNS only |

   Ne PAS recréer : les deux TXT de parking (`1\|www...`, `3\|welcome`) ni le
   CNAME `ftp`. Ils appartiennent au parking OVH qu'on abandonne.
3. **Manager OVH** : Noms de domaine, `mon-empreinte-ia.fr`, onglet Serveurs DNS,
   remplacer `dns106.ovh.net` / `ns106.ovh.net` par les deux NS attribués par
   Cloudflare à l'étape 1. Propagation : quelques heures, 48 h au pire.
4. **Cloudflare, Rules, Redirect Rules**, une seule règle :
   - Expression : `http.host in {"mon-empreinte-ia.fr" "www.mon-empreinte-ia.fr"}`
   - Action : Static redirect, code **301**, URL `https://mkz-consulting.fr/empreinte-ia/`
   - Preserve query string : désactivé.
5. **SSL/TLS** : rien à configurer, Universal SSL couvre apex + www dès
   l'activation de la zone. Le mode (Full ou autre) est sans effet : aucune
   origine n'est jamais contactée, la règle répond avant.

### Point de vigilance

La règle maison Cloudflare du CLAUDE.md global (« Cloudflare bloque les
crawlers IA par défaut sur les nouvelles zones ») est sans conséquence ici :
la zone ne sert aucun contenu, tout est 301, et le robots.txt qui fait foi est
celui de mkz-consulting.fr. Rien à débloquer.

## Plan B (repli, sans Cloudflare) : multisite OVH + .htaccess

Si le domaine doit rester à 100 % chez OVH : on attache le domaine à
l'hébergement mutualisé dormant `mkz-consulting.fr` uniquement pour qu'il serve
le 301 avec un vrai certificat Let's Encrypt.

1. Attacher `mon-empreinte-ia.fr` et `www.mon-empreinte-ia.fr` en multisite sur
   l'hébergement `mkz-consulting.fr`, dossier racine `www`, SSL Let's Encrypt
   coché. Exécutable via l'API OVH (je peux le faire sur ton feu vert).
   Réserve : l'offre `hosting-starter` peut refuser un domaine supplémentaire,
   le refus serait immédiat et sans dégât.
2. Zone DNS `mon-empreinte-ia.fr` (exécutable via l'API OVH, ids relevés) :
   - modifier A `@` (id 5426347031) : `213.186.33.5` vers `188.165.53.185` ;
   - modifier A `www` (id 5426347032) : idem ;
   - supprimer TXT `@` id 5426347035 et TXT `www` id 5426347036 (parking) ;
   - rafraîchir la zone. MX, SPF, NS : ne pas toucher.
3. Déposer en tête du `.htaccess` du dossier `www` de l'hébergement (FTP ou
   explorateur de fichiers OVH), avant toute règle existante :

   ```apache
   # 301 mon-empreinte-ia.fr vers la page Empreinte IA (decision du 15/08/2026)
   RewriteEngine On
   RewriteCond %{HTTP_HOST} ^(www\.)?mon-empreinte-ia\.fr$ [NC]
   RewriteRule ^ https://mkz-consulting.fr/empreinte-ia/ [R=301,L]
   ```
4. Attendre la génération Let's Encrypt (jusqu'à 1 h après propagation DNS).

Inconvénients face au plan A : un hébergement dormant devient porteur d'un
service qu'il faudra penser à préserver, et la bascule future est plus lourde.

## Plan C (rejeté) : l'onglet « Redirection » du manager OVH

C'est le service de parking actuel (les TXT `1|...` et `3|welcome`). Il ne sert
**pas de HTTPS sur le domaine source** : `https://mon-empreinte-ia.fr` finirait
en erreur de certificat. Rejeté comme mécanisme permanent, quelle que soit sa
simplicité.

## Vérification après mise en place

Les quatre variantes doivent répondre 301 avec la Location exacte, et la chaîne
finir en 200 :

```bash
for u in "http://mon-empreinte-ia.fr/" "https://mon-empreinte-ia.fr/" "http://www.mon-empreinte-ia.fr/" "https://www.mon-empreinte-ia.fr/"; do echo "== $u"; curl -sI "$u" | grep -i "^HTTP\|^location"; curl -sIL -o /dev/null -w "chaine finale: %{http_code} %{url_effective}\n" "$u"; done
```

Attendu par variante : `HTTP/... 301`, `location: https://mkz-consulting.fr/empreinte-ia/`,
`chaine finale: 200 https://mkz-consulting.fr/empreinte-ia/`. Tester aussi une
URL profonde (`https://mon-empreinte-ia.fr/nimporte-quoi`) : même destination.
Un 302 à la place d'un 301, une Location différente, ou un avertissement de
certificat sont des échecs.

## Exécution (15 août 2026) : plan A en place, vérifié

- [x] Page publiée sur `https://mkz-consulting.fr/empreinte-ia/` (jeu de
      données v0.3.0 sourcé).
- [x] Plan A exécuté. Mickaël a ajouté la zone au compte Cloudflare et changé
      les serveurs DNS chez OVH (katja/maxim.ns.cloudflare.com, propagation
      constatée). Par API (jeton MKZ, 15/08/2026) :
      - supprimé les deux TXT de parking OVH (`1|www...`, `3|welcome`) et le
        CNAME `ftp` importés par Cloudflare ;
      - pointé A `@` et A `www` sur `192.0.2.1` en proxy (IP factice, le
        proxy répond avant toute origine) ;
      - conservé MX ×3 `mail.ovh.net` et SPF `include:mx.ovh.com` en DNS only
        (le mail reste chez OVH) ;
      - créé la règle de redirection (ruleset `21fa4cdb...`, phase
        `http_request_dynamic_redirect`) : 301 statique vers
        `https://mkz-consulting.fr/empreinte-ia/`, query string non préservée.
- [x] Vérification du 15/08/2026 : les quatre variantes (http/https ×
      apex/www) et une URL profonde répondent `301` avec la Location exacte,
      chaîne finale `200 https://mkz-consulting.fr/empreinte-ia/`. HTTPS
      servi par Universal SSL sur apex et www, aucun avertissement.
- [ ] Le jour du seuil de bascule (voir `CLAUDE.md`) : inverser la redirection
      dans ce même écran Cloudflare, jamais en refaire une neuve.
