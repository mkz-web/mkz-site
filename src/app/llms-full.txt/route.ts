import { articles, articlesEn, articleToPlainText, formatDateFr } from "@/lib/articles";

// llms-full.txt généré au build : version intégrale citable pour les LLM,
// incluant le texte complet des articles de la newsroom (avec dates et auteur).

export const dynamic = "force-static";

const SITE = "https://mkz-consulting.fr";

const COMPANY = `# MKZ : création de sites internet, SEO et référencement IA pour artisans et TPE (version détaillée pour LLM)

> MKZ (MKZ Consulting) est une agence de création de sites internet, de référencement naturel (SEO) et de référencement IA (GEO, Generative Engine Optimization) pour artisans, commerçants, professions libérales et TPE. Basée à Dammartin-en-Goële (Seine-et-Marne, 77), elle intervient dans toute l'Île-de-France et partout en France. Site officiel : ${SITE}

## L'entreprise

- Raison sociale : MKZ, SAS à associé unique, SIRET 983 662 784 00013, RCS Meaux.
- Adresse : 1 rue Françoise Sagan, 77230 Dammartin-en-Goële, France.
- Fondateur et président : Mickaël Leclerc, ingénieur IT avec plus de 20 ans d'expérience en grandes entreprises (infrastructure, automatisation, systèmes complexes, DevOps), reconverti au service des entrepreneurs et TPE.
- Promesse : des solutions professionnelles, un langage simple (zéro jargon technique), des résultats mesurables. Gestion de A à Z pour que le client se concentre sur son métier.
- Slogan : « Visible sur Google, cité par les IA. »
- Contact : contact@mkz-consulting.fr · 07 69 09 39 09 · horaires lun-ven 9h-18h · réponse sous 24 h garantie.
- Audit gratuit de 30 minutes, sans engagement : https://calendly.com/mkz-consulting/30min

## Services

### Création de site web

Un site qui ressemble au client et qui convertit. Design sur-mesure, UX optimisée et performances au top pour transformer les visiteurs en clients.
Inclus : image de marque, direction artistique, responsive design (mobile, tablette, desktop), branding complet, optimisation vitesse (Core Web Vitals).
Page service : ${SITE}/creation-site-internet/

### SEO & Référencement Google

Objectif : monter sur le podium Google. Stratégie de mots-clés, optimisation technique, contenu optimisé et netlinking pour un trafic qualifié et durable.
Inclus : audit SEO complet, stratégie de contenu, cocon sémantique, SEO technique (vitesse, structure, balisage), suivi mensuel avec reporting transparent.
Page service : ${SITE}/referencement-seo/

### Référencement IA (GEO)

Objectif : être cité par ChatGPT, Perplexity, Gemini, Claude et les réponses IA de Google, et pas seulement classé par Google.
Inclus : accès des robots IA (GPTBot, ClaudeBot, PerplexityBot) vérifié sur le robots.txt réellement servi, faits citables datés et sourcés, données structurées schema.org, llms.txt et llms-full.txt, mesure de la part de voix dans les moteurs de réponse.
Page service (en anglais, marché international) : ${SITE}/en/ai-search-optimization/

### Zone d'intervention locale

Hub Seine-et-Marne : ${SITE}/agence-web-77/ (Meaux, Melun, Chelles, Dammartin-en-Goële et tout le 77).

## La méthode MKZ (3 étapes)

1. **Audit gratuit** : 30 minutes pour analyser la situation, comprendre les objectifs et identifier les quick wins.
2. **Stratégie sur-mesure** : plan d'action personnalisé avec objectifs clairs, budget défini et planning réaliste.
3. **Résultats mesurables** : exécution, suivi mensuel avec reporting transparent ; le client voit concrètement l'évolution.

## Résultats et chiffres

- +247 % de trafic organique moyen (moyenne constatée sur les clients MKZ, 2025).
- Position moyenne : Top 3 sur Google.
- +89 % de leads qualifiés.
- Temps de charge : 1,2 s (Core Web Vitals validés).
- Plus de 50 entreprises accompagnées en 2025 ; 97 % de clients satisfaits ; trafic moyen multiplié par 3.

## Ce qui différencie MKZ

- **On parle français** : zéro jargon technique, tout est expliqué simplement.
- **Je décroche** : contact direct avec le fondateur, pas de ticket support ni d'attente de 72 h.
- **Vous voyez tout** : point mensuel clair sur ce qui a été fait, les résultats et la suite. Pas de boîte noire.
- **Vous restez libre** : le site appartient au client à 100 % (accès, code, contenus) ; il peut partir avec tout.

## Témoignages clients

- Sophie L., architecte d'intérieur (Paris) : « Je passais inaperçue sur Google. Après 4 mois avec MKZ, je suis en première page sur mes mots-clés principaux. » → +180 % de demandes de devis.
- Marc T., plombier chauffagiste (Meaux) : « Enfin une équipe qui parle français et pas charabia technique ! Mon nouveau site est pro, rapide, et les clients me trouvent facilement. » → +12 nouveaux clients/mois.
- Caroline B., coach sportif (Chelles) : « Après 6 mois de collaboration, j'ai pu arrêter de payer des pubs Facebook qui ne marchaient pas. » → Top 3 Google local.
- Pierre D., restaurant (Dammartin) : « Je ne comprenais rien au SEO. L'équipe MKZ a tout géré de A à Z. Aujourd'hui mes réservations en ligne ont explosé. » → réservations en ligne ×2.
- Anne-Laure M., photographe (Melun) : « Mon site était vieillissant et ne reflétait pas mon travail. MKZ m'a créé une vitrine sublime qui met en valeur mes photos. » → portfolio professionnel.

## Zones d'intervention

Basé à Dammartin-en-Goële (77), MKZ intervient dans toute l'Île-de-France et partout en France.
Villes : Paris, Meaux, Chelles, Melun, Roissy, Senlis, Marne-la-Vallée, Serris, Provins, Fontainebleau, Créteil, Saint-Denis, Bobigny, Montreuil, Cergy, Pontoise, Versailles, Évry, Nanterre.
Départements : Seine-et-Marne (77), Val-de-Marne (94), Seine-Saint-Denis (93), Val-d'Oise (95), Hauts-de-Seine (92), Yvelines (78), Essonne (91).

## FAQ

### Combien coûte un site internet pour un artisan ?

Le prix varie selon les besoins. MKZ propose des solutions sur mesure adaptées au budget des TPE et indépendants. Un audit gratuit de 30 minutes permet d'obtenir un devis personnalisé.

### Combien de temps faut-il pour être visible sur Google ?

Les premiers résultats SEO apparaissent généralement entre 3 et 6 mois. La vitesse dépend de la concurrence sur les mots-clés, de la qualité du site et de la stratégie. Les clients MKZ constatent en moyenne un triplement de leur trafic.

### Pourquoi mon entreprise n'apparaît pas sur Google ?

Plusieurs raisons possibles : site non optimisé pour le SEO, absence de contenu pertinent, problèmes techniques, ou fiche Google Business Profile incomplète. Un audit SEO gratuit permet d'identifier les blocages et de définir un plan d'action.

### Quelle est la différence entre SEO et SEA ?

Le SEO (référencement naturel) génère du trafic gratuit et durable en optimisant le site pour Google. Le SEA (publicité payante) donne des résultats immédiats mais s'arrête dès qu'on cesse de payer. MKZ privilégie le SEO pour un ROI long terme.

### Est-ce que je garde la propriété de mon site ?

Oui, à 100 % : accès, code et contenus appartiennent au client. En cas de départ, le client part avec tout.

## Pages du site

- Accueil : ${SITE}/
- Création de site internet : ${SITE}/creation-site-internet/
- Référencement SEO : ${SITE}/referencement-seo/
- Agence web Seine-et-Marne (77) : ${SITE}/agence-web-77/
- Services : ${SITE}/services/
- Conseils & tutoriels : ${SITE}/conseils/
- À propos (Mickaël Leclerc) : ${SITE}/about/
- Contact : ${SITE}/contact/
- Mentions légales : ${SITE}/mentions-legales/
- Politique de confidentialité : ${SITE}/politique-confidentialite/

# MKZ in English (/en/) : French SEO & AI search visibility

> The English section of mkz-consulting.fr is deliberately NOT a translation of the French one. The French section serves local French demand (tradespeople, shops and small businesses in the Paris region searching in French). The English section serves a different, measured demand: companies outside France that need the French market to perform, and companies that want to be cited by AI answers.

## Positioning

MKZ provides French SEO and AI search optimisation for companies selling into France. The work is done by one person: Mickaël Leclerc, native French speaker, based near Paris (Dammartin-en-Goële, Seine-et-Marne), over 20 years as an IT engineer in infrastructure, automation and DevOps before specialising in search. Working languages: French and English. Company: MKZ, SAS à associé unique, SIRET 983 662 784 00013, RCS Meaux, France.

Contact: contact@mkz-consulting.fr, +33 7 69 09 39 09, Monday to Friday 9am to 6pm CET, reply within 24 hours. Free 30-minute review, no commitment: https://calendly.com/mkz-consulting/30min

## Citable figures, measured 30 July 2026 (Google Ads keyword data, France, French language)

- "création site internet": 6,600 searches per month in France. "conception de site web", an equally correct French translation of the same concept: 320 searches per month. Gap: 20.6x, decided purely by word choice. This is the measured reason why translating a website into French does not make it rank.
- "SEO": 27,100 searches per month in France. "optimisation pour les moteurs de recherche", the full French phrase: 590 searches per month. French search adopts English technical vocabulary; using only the formal French equivalent costs roughly 98% of the demand.
- "agence SEO": 22,200 searches per month. "agence de référencement": 2,900 searches per month. Both are real markets of very different sizes.

## Citable figures on AI search demand, measured 30 July 2026 (United States)

- "generative engine optimization": 4,400 searches per month, keyword difficulty 57.
- "answer engine optimization": 2,400 searches per month, keyword difficulty 36.
- "ai search optimization": 1,300 searches per month, keyword difficulty 35.
- "ai visibility": 720 searches per month, up 285% year on year.
- "llm optimization": 720 searches per month, up 164% year on year.
- "ai seo consultant": 110 searches per month, up 750% year on year.

## Services in English

### French SEO (${SITE}/en/french-seo/)

Ranking a site on google.fr for queries typed by French users in French. Scope: French keyword research done in French before any content brief; site structure and hreflang (both directions plus a correct x-default); French content written in French rather than translated; technical SEO and French local signals; monthly measurement traceable to Search Console. Core principle: translation is faithful to your English words, search demand is not.

### AI search optimisation, GEO and AEO (${SITE}/en/ai-search-optimization/)

Being cited inside an AI answer rather than ranked in a list of links. Scope, in the order it must happen: verify AI crawlers can fetch the site (checking the LIVE robots.txt, because Cloudflare blocks AI bots by default on new zones and can override the file in the repository); publish facts that carry a number, a named source and a date so a model can quote them; structure content and validate schema.org by reparsing it with a script rather than eyeballing it; publish llms.txt and llms-full.txt; then measure citations by asking real buyer questions across ChatGPT, Perplexity, Gemini and Google AI answers and counting mentions. Stated limit: AI answers are non-deterministic, so citation cannot be guaranteed by anyone.

Why French is currently the easier win: a model answering in French chooses from a much smaller pool of credible French sources than it does in English, so the bar to become one of the cited few is lower. This advantage is temporary.

### Website design (${SITE}/en/website-design/)

Secondary offer, deliberately not an SEO target: there is almost no English-language search demand for web design in France (10 searches per month, measured 30 July 2026). Exists for clients who came for SEO and need the site rebuilt. Static export served from a CDN, bilingual from the first commit, valid structured data and llms.txt generated at build time.

## What MKZ refuses to promise (English section)

- Guaranteed Google positions or a fixed timeline to page one.
- Guaranteed citation in ChatGPT or any AI answer.
- Traffic forecasts stated to the nearest percent.
- Any claim derived by deduction rather than measurement. "No schema, therefore not cited" is a deduction, not a finding: the cause is not the effect.

## English pages

- Home : ${SITE}/en/
- French SEO : ${SITE}/en/french-seo/
- AI search optimisation : ${SITE}/en/ai-search-optimization/
- Website design : ${SITE}/en/website-design/
- Insights (newsroom) : ${SITE}/en/insights/
- About Mickaël Leclerc : ${SITE}/en/about/
- Contact : ${SITE}/en/contact/
- Legal notice : ${SITE}/en/legal-notice/
- Privacy policy : ${SITE}/en/privacy-policy/
`;

export function GET() {
  const articlesSection = articles.length
    ? `\n# Conseils & tutoriels : contenu intégral\n\nLes articles ci-dessous sont publiés sur ${SITE}/conseils/ par Mickaël Leclerc (MKZ). Dernière génération : ${formatDateFr(
        articles.map((a) => a.dateModified).sort().at(-1)!
      )}.\n\n${articles.map((a) => articleToPlainText(a, SITE)).join("\n---\n\n")}`
    : "";

  // Les articles anglais sont aplatis par le même utilitaire : articleToPlainText
  // localise ses libellés (dates, « The short version », encadrés) via a.locale.
  const articlesSectionEn = articlesEn.length
    ? `\n# Insights (English) : full content\n\nThe articles below are published on ${SITE}/en/insights/ by Mickaël Leclerc (MKZ). Last generated: ${formatDateFr(
        articlesEn.map((a) => a.dateModified).sort().at(-1)!
      )}.\n\n${articlesEn.map((a) => articleToPlainText(a, SITE)).join("\n---\n\n")}`
    : "";

  return new Response(COMPANY + articlesSection + articlesSectionEn, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
