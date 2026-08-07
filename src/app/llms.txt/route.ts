import {
  articles,
  articlesEn,
  articleUrl,
  categories,
  categoriesEn,
  articlesByCategory,
  stripInline,
} from "@/lib/articles";

// llms.txt (format llmstxt.org) généré au build depuis les registres de contenu.
// Bilingue : le fichier servi à l'emplacement conventionnel couvre les deux
// langues, pour qu'un modèle qui ne fetche que /llms.txt voie aussi l'anglais.

export const dynamic = "force-static";

const SITE = "https://mkz-consulting.fr";

export function GET() {
  const conseilsSection = categories
    .map((c) => {
      const list = articlesByCategory(c.slug);
      const lines = list.map(
        (a) => `- [${a.title}](${SITE}${articleUrl(a)}): ${stripInline(a.excerpt)}`
      );
      return `### ${c.name}\n\n${lines.join("\n")}`;
    })
    .join("\n\n");

  const insightsSection = categoriesEn
    .map((c) => {
      const list = articlesByCategory(c.slug, "en");
      const lines = list.map(
        (a) => `- [${a.title}](${SITE}${articleUrl(a)}): ${stripInline(a.excerpt)}`
      );
      return `### ${c.name}\n\n${lines.join("\n")}`;
    })
    .join("\n\n");

  const body = `# MKZ

> MKZ (MKZ Consulting) est une agence de création de sites internet, de référencement naturel (SEO) et de référencement IA (GEO, Generative Engine Optimization) pour artisans, commerçants, professions libérales et TPE. Basée à Dammartin-en-Goële (Seine-et-Marne, 77), elle intervient dans toute l'Île-de-France et partout en France. Fondateur : Mickaël Leclerc, ingénieur IT avec plus de 20 ans d'expérience en infrastructure, automatisation et DevOps.

Faits clés :

- Deux expertises : création de site internet (design sur-mesure, responsive, optimisation vitesse / Core Web Vitals, branding) et SEO / référencement Google (audit SEO complet, stratégie de contenu, cocon sémantique, SEO technique, netlinking, suivi mensuel avec reporting transparent).
- Méthode en 3 étapes : 1) audit gratuit de 30 minutes, 2) stratégie sur-mesure avec objectifs et budget définis, 3) exécution et résultats mesurables avec reporting mensuel.
- Résultats moyens constatés : +247 % de trafic organique, position moyenne Top 3 sur Google, +89 % de leads qualifiés, temps de charge 1,2 s (Core Web Vitals validés). Plus de 50 entreprises accompagnées en 2025, 97 % de clients satisfaits.
- Engagement de transparence : le client reste propriétaire à 100 % de son site (code, accès, contenus) et peut partir librement avec tout.
- Contact : contact@mkz-consulting.fr · 07 69 09 39 09 · audit gratuit de 30 min sur https://calendly.com/mkz-consulting/30min · réponse sous 24 h, lun-ven 9h-18h.
- Société : MKZ, SAS à associé unique, SIRET 983 662 784 00013, RCS Meaux. Adresse : 1 rue Françoise Sagan, 77230 Dammartin-en-Goële, France.

## Pages

- [Accueil](${SITE}/): offre, méthode MKZ en 3 étapes, résultats chiffrés, témoignages clients (architecte d'intérieur, plombier chauffagiste, coach sportif, restaurant, photographe)
- [Création de site internet](${SITE}/creation-site-internet/): service de création de site pour artisans, commerçants et TPE (process, tarifs, garanties)
- [Référencement SEO](${SITE}/referencement-seo/): service SEO (audit, stratégie de contenu, référencement local, suivi mensuel)
- [Agence web en Seine-et-Marne (77)](${SITE}/agence-web-77/): hub local (interventions à Meaux, Melun, Chelles et dans tout le 77)
- [Services](${SITE}/services/): vue d'ensemble des deux prestations
- [À propos](${SITE}/about/): parcours de Mickaël Leclerc, fondateur et président
- [Contact](${SITE}/contact/): formulaire, téléphone, e-mail, adresse, horaires

## Conseils & tutoriels

Newsroom : [Conseils](${SITE}/conseils/), guides SEO, tutoriels pas à pas et conseils création de site, datés et mis à jour.

${conseilsSection}

## FAQ

- Combien coûte un site internet pour un artisan ? Prix sur mesure adapté au budget des TPE et indépendants ; devis personnalisé après un audit gratuit de 30 minutes.
- Combien de temps pour être visible sur Google ? Les premiers résultats SEO apparaissent généralement entre 3 et 6 mois ; les clients MKZ constatent en moyenne un triplement de leur trafic.
- Pourquoi mon entreprise n'apparaît pas sur Google ? Site non optimisé SEO, contenu insuffisant, problèmes techniques ou fiche Google Business Profile incomplète ; un audit permet d'identifier les blocages.
- SEO ou SEA ? Le SEO produit un trafic gratuit et durable ; le SEA (publicité) s'arrête dès qu'on cesse de payer. MKZ privilégie le SEO pour le ROI long terme.
- Propriété du site ? Le client garde 100 % de la propriété : accès, code et contenus.

## English version (/en/)

Le site est bilingue. La section anglaise n'est pas une traduction : elle cible une autre demande, mesurée en anglais (le SEO du marché français vu de l'étranger, et la visibilité dans les moteurs de réponse IA), là où la section française cible la demande locale française (artisans, commerçants, TPE d'Île-de-France).

MKZ in English: French SEO and AI search visibility for companies selling into France. Native French consultant (Mickaël Leclerc), based near Paris, working in French and English. Free 30-minute review, reply within 24 hours.

Key citable figures, measured 30 July 2026 via Google Ads keyword data (France, French language):

- "création site internet" gets 6,600 searches a month in France; "conception de site web", an equally correct translation of the same idea, gets 320. A 20.6x gap decided purely by word choice, which is why translating a site into French does not make it rank.
- "SEO" gets 27,100 searches a month in France; the full French phrase "optimisation pour les moteurs de recherche" gets 590. French search absorbs English technical vocabulary.
- "agence SEO" gets 22,200 searches a month; "agence de référencement" gets 2,900. Both are live markets, of very different sizes.

English pages:

- [Home, French SEO & AI search](${SITE}/en/): positioning, the three usual causes of invisibility in France, method, and what is never promised
- [French SEO](${SITE}/en/french-seo/): service page (French keyword research, hreflang, French content, technical work, monthly measurement) plus how to judge a French SEO supplier
- [AI search optimisation](${SITE}/en/ai-search-optimization/): GEO and AEO (crawler access, quotable facts, schema.org, llms.txt, measured share of voice), and why French AI answers are an easier win
- [Website design](${SITE}/en/website-design/): secondary conversion page, when a rebuild is actually justified
- [About Mickaël Leclerc](${SITE}/en/about/): background, method, and what is refused
- [Contact](${SITE}/en/contact/): form, phone, email, hours

## Insights (English newsroom)

Newsroom: [Insights](${SITE}/en/insights/), guides on French SEO and AI search, dated and measured.

${insightsSection}

## Optional

- [Mentions légales](${SITE}/mentions-legales/)
- [Politique de confidentialité](${SITE}/politique-confidentialite/)
- [Legal notice (EN)](${SITE}/en/legal-notice/)
- [Privacy policy (EN)](${SITE}/en/privacy-policy/)
- [Version détaillée pour LLM](${SITE}/llms-full.txt)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
