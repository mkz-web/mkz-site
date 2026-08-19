# Archive de contenu : versions mises de côté

Ce dossier garde les versions d'articles retirées volontairement, quand la décision peut être rejouée. Il est suivi par git, contrairement à `_content-staging/` qui est gitignoré : c'est le seul endroit où une version retirée survit vraiment.

## consultant-seo-freelance-tjm-comptabilite, version avec Indy (19/08/2026)

**Pourquoi elle est ici.** L'article citait Indy à 7 endroits, dont un lien dofollow d'ancre « TJM freelance » vers `indy.fr/guide/freelance/salaire/tjm/`, en échange d'un lien retour de leur part. 54 jours après la publication (25/06/2026), le lien retour n'existait toujours pas : mesuré le 18/08/2026 sur deux sources indépendantes, `indy.fr` absent des 33 domaines référents de mkz-consulting.fr chez DataForSEO, et `site:indy.fr "mkz-consulting"` sans résultat. Mickaël a relancé Indy. En attendant leur réponse, les mentions ont été retirées de l'article publié, et la version d'origine est conservée ici pour être remise en ligne telle quelle si Indy honore l'échange.

**Ce qui était cité :** puce TL;DR (« plus de 350 000 indépendants accompagnés »), mention de source sur l'exemple chiffré, paragraphe entier renvoyant au guide (celui qui portait le lien), une ligne du tableau des TJM, un paragraphe de recommandation de l'outil de compta, et deux réponses de FAQ.

**Fichiers :**

- `consultant-seo-freelance-tjm-comptabilite.avec-indy.2026-08-19.json` : la source de vérité, à réinjecter dans `_content-staging/`.
- `consultant-seo-freelance-tjm-comptabilite.avec-indy.2026-08-19.ts` : le fichier généré correspondant, filet de sécurité si l'ingest a changé entre-temps.

## Restaurer la version avec Indy

```bash
cp _content-archive/consultant-seo-freelance-tjm-comptabilite.avec-indy.2026-08-19.json _content-staging/consultant-seo-freelance-tjm-comptabilite.json && node scripts/ingest-content.mjs && git diff --stat src/content/
```

Le `git diff --stat` doit ne montrer qu'un seul fichier modifié. Penser ensuite à remettre `dateModified` à la date du jour (l'archive porte encore `2026-06-25`), puis `npx next build`, `node scripts/validate-out.mjs`, et le skill `livraison-web` avant publication.

⚠️ Ne jamais lancer `node scripts/ingest-content.mjs` sans avoir contrôlé le diff juste après : l'ingest écrase toute édition manuelle des `.ts` non reportée dans `_content-staging/`.
