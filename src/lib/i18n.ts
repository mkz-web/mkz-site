// Socle bilingue du site (fr par défaut, en secondaire).
//
// Choix d'architecture : les URLs françaises NE BOUGENT PAS (historique GSC).
// L'anglais vit sous /en/ via un second root layout (route groups (fr) et (en)),
// parce que `output: "export"` interdit le proxy/middleware que réclame le
// pattern `[lang]` documenté par Next.
//
// Les paires d'URLs ci-dessous alimentent à la fois les balises hreflang et le
// sélecteur de langue. Une page sans équivalent (ex. /agence-web-77/, dont le
// ciblage local n'a aucun volume en anglais) ne déclare pas d'alternative.

export const SITE = "https://mkz-consulting.fr";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/** Code hreflang complet par locale. */
export const hreflangOf: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
};

/** Code JSON-LD `inLanguage` par locale. */
export const inLanguageOf: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
};

/** Code openGraph `locale` par locale. */
export const ogLocaleOf: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
};

// ── Paires d'URLs traduites ──────────────────────────────────────────────────
// Chaque entrée = une même intention servie dans les deux langues.
// L'anglais n'est pas un miroir : /referencement-seo/ (SEO local pour artisans)
// répond en anglais par /en/french-seo/ (SEO du marché français pour clients
// internationaux), parce que c'est l'intention réellement recherchée en anglais.

export const pagePairs: { fr: string; en: string }[] = [
  { fr: "/", en: "/en/" },
  { fr: "/referencement-seo/", en: "/en/french-seo/" },
  // Seule paire où les deux versions visent la même prestation : le GEO. Elles
  // ne visent pas le même client (TPE françaises ici, entreprises étrangères
  // là), mais l'intention de recherche est la même dans les deux langues.
  { fr: "/referencement-ia/", en: "/en/ai-search-optimization/" },
  { fr: "/creation-site-internet/", en: "/en/website-design/" },
  // Outil d'audit : la page FR vise « audit seo (gratuit) » (1 600 + 880/mois,
  // DataForSEO 20/08/2026) ; la page EN est une page de conversion assumée
  // (« french seo audit » : zéro volume mesuré le 21/08/2026), même logique
  // que /en/website-design/.
  { fr: "/audit-seo/", en: "/en/seo-audit/" },
  { fr: "/conseils/", en: "/en/insights/" },
  { fr: "/about/", en: "/en/about/" },
  { fr: "/contact/", en: "/en/contact/" },
  { fr: "/mentions-legales/", en: "/en/legal-notice/" },
  { fr: "/politique-confidentialite/", en: "/en/privacy-policy/" },
];

const frToEn = new Map(pagePairs.map((p) => [p.fr, p.en]));
const enToFr = new Map(pagePairs.map((p) => [p.en, p.fr]));

/** URL équivalente dans l'autre langue, ou undefined si la page est monolingue. */
export function counterpartOf(path: string, locale: Locale): string | undefined {
  return locale === "fr" ? frToEn.get(path) : enToFr.get(path);
}

/** Accueil d'une locale. */
export function homeOf(locale: Locale): string {
  return locale === "en" ? "/en/" : "/";
}

/**
 * Cible du sélecteur de langue POUR LA PAGE COURANTE.
 *
 * Sur une page traduite, le sélecteur emmène vers sa traduction (et non vers
 * l'accueil) : c'est la seule attente raisonnable quand on clique « English »
 * en lisant /referencement-seo/. Sur une page monolingue assumée
 * (/agence-web-77/, les articles), il retombe sur l'accueil de l'autre langue
 * et `isCounterpart` vaut false, ce qui permet de le signaler à l'utilisateur
 * au lieu de le téléporter en silence.
 */
export function switcherTargetFor(
  path: string,
  locale: Locale
): { href: string; isCounterpart: boolean } {
  // `trailingSlash: true` : les clés de pagePairs portent le slash final.
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const counterpart = counterpartOf(normalized, locale);
  return counterpart
    ? { href: counterpart, isCounterpart: true }
    : { href: homeOf(locale === "fr" ? "en" : "fr"), isCounterpart: false };
}

/**
 * Bloc `alternates` Next (canonical + hreflang) pour un chemin donné.
 * x-default pointe vers la version française (langue par défaut du site),
 * sauf pour une page qui n'existe qu'en anglais : elle se désigne elle-même.
 */
export function alternatesFor(path: string, locale: Locale) {
  const counterpart = counterpartOf(path, locale);
  const languages: Record<string, string> = {
    [hreflangOf[locale]]: `${SITE}${path}`,
  };

  if (counterpart) {
    const other: Locale = locale === "fr" ? "en" : "fr";
    languages[hreflangOf[other]] = `${SITE}${counterpart}`;
    languages["x-default"] = `${SITE}${locale === "fr" ? path : counterpart}`;
  } else {
    languages["x-default"] = `${SITE}${path}`;
  }

  return { canonical: `${SITE}${path}`, languages };
}

// ── Dictionnaire d'interface ─────────────────────────────────────────────────
// Uniquement le « chrome » (navigation, libellés, gabarits). Le positionnement
// et les contenus vivent dans src/content/ et src/content/en/, séparément :
// ce sont deux discours, pas deux traductions.

export interface NavItem {
  name: string;
  href: string;
}

export interface UiStrings {
  nav: NavItem[];
  header: { cta: string; menu: string; phoneHref: string; phoneLabel: string };
  switcher: {
    label: string;
    otherName: string;
    /** Infobulle quand la page courante n'a pas de traduction. */
    noCounterpart: string;
  };
  pillar: {
    breadcrumbAria: string;
    home: string;
    faqTitle: string;
    ctaPrimary: string;
    phonePrefix: string;
    fallbackPrefix: string;
    fallbackSuffix: string;
    /** Rappel d'action à mi-parcours des piliers (PillarContent) : before + titre de section + after. */
    midCtaBefore: string;
    midCtaAfter: string;
    /** Rappel d'action avant la FAQ, formulé autrement : deux blocs identiques = bloc répété. */
    preFaqCtaText: string;
  };
  article: {
    breadcrumbAria: string;
    home: string;
    hub: string;
    hubHref: string;
    published: string;
    updated: string;
    readingSuffix: string;
    tldrTitle: (n: number) => string;
    tocTitle: string;
    faqTitle: string;
    authorMore: string;
    relatedTitle: string;
    callouts: { retenir: string; astuce: string; attention: string; definition: string };
    /** Barre « Résumer avec l'IA » (composant AiSummaryBar). */
    aiBar: {
      label: string;
      groupAria: string;
      chipAria: (assistant: string) => string;
      /** Invite pré-remplie, dans la langue de la page, avec l'URL canonique. */
      prompt: (url: string) => string;
    };
  };
  footer: {
    taglineBefore: string;
    taglineEm: string;
    taglineAfter: string;
    cta: string;
    phonePrefix: string;
    description: string;
    legal: string[];
    groups: {
      title: string;
      links: { label: string; href: string; external?: boolean }[];
      /** Ajoute horaires + délai de réponse sous les liens (colonne Contact). */
      showHours?: boolean;
      /**
       * Ajoute le lien vers l'autre langue. Son href est calculé au rendu depuis
       * la page courante (switcherTargetFor), donc il ne peut pas être une
       * entrée statique de `links`.
       */
      showLangLink?: boolean;
    }[];
    contact: { hours: string; reply: string };
    copyright: string;
    legalLinks: NavItem[];
  };
  newsroom: {
    kicker: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    sub: string;
    byTopic: string;
    latest: string;
    explore: string;
    articleCount: (n: number) => string;
    ctaTitleBefore: string;
    ctaTitleEm: string;
    ctaTitleAfter: string;
    ctaText: string;
    ctaButton: string;
    pillarPrompt: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    calendlyTitle: string;
    calendlyDesc: string;
    labels: { phone: string; email: string; address: string; hours: string };
    addressLines: string[];
    hoursLines: string[];
    mapsLabel: string;
    /** Maillage contextuel sortant : la page contact était un cul-de-sac
     *  (carte-maillage du 21/08/2026, zéro lien sortant dans le corps).
     *  Rendu en cellule dans la pile latérale par ContactContent. */
    explore: { label: string; links: { label: string; href: string }[] };
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      successTitle: string;
      successText: string;
      errorText: string;
      /** Préfixe du sujet de l'e-mail reçu, pour trier les leads par langue. */
      mailSubjectPrefix: string;
      defaultSubject: string;
    };
  };
  /** Chrome de l'outil d'audit (/audit-seo/ et /en/seo-audit/). Le contenu
   *  éditorial des deux pages vit dans leurs page.tsx : deux discours,
   *  pas deux traductions. */
  audit: {
    urlLabel: string;
    urlPlaceholder: string;
    start: string;
    phases: { origin: string; robots: string; page: string; notfound: string };
    scoreTitle: string;
    scoreCaption: (points: number, max: number) => string;
    scoreScale: string;
    blocs: { technique: string; ia: string; autorite: string };
    autoriteSoon: string;
    status: { ok: string; warn: string; fail: string; na: string };
    topTitle: string;
    allTitle: string;
    checkLabels: Record<string, string>;
    /** Détail mesuré d'un check, construit depuis ses données brutes. */
    checkDetail: (id: string, data: Record<string, unknown>) => string;
    errors: { cible: string; injoignable: string; serveur: string };
    emailBox: {
      title: string;
      text: string;
      emailLabel: string;
      emailPlaceholder: string;
      consentBefore: string;
      consentLink: string;
      submit: string;
      sending: string;
      successTitle: string;
      successText: string;
      errorText: string;
      mailSubjectPrefix: string;
    };
    rescan: string;
  };
  notFound: { title: string; text: string; back: string };
  whatsapp: string;
  /** Bandeau de consentement maison (ConsentBanner), contrat dans src/lib/consent.ts. */
  consent: {
    title: string;
    text: string;
    privacy: string;
    privacyHref: string;
    acceptAll: string;
    refuseAll: string;
    customise: string;
    save: string;
    necessaryLabel: string;
    necessaryDesc: string;
    audienceLabel: string;
    audienceDesc: string;
    /** Lien du pied de page qui rouvre le bandeau. */
    manage: string;
  };
}

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

export const ui: Record<Locale, UiStrings> = {
  fr: {
    nav: [
      { name: "Accueil", href: "/" },
      { name: "Création de site", href: "/creation-site-internet/" },
      { name: "SEO", href: "/referencement-seo/" },
      // « Témoignages » (ancre vers une section de l'accueil) a laissé sa place
      // au pilier référencement IA : une page de service qui se positionne vaut
      // mieux qu'une ancre interne dans une barre à 6 entrées.
      { name: "Référencement IA", href: "/referencement-ia/" },
      { name: "Conseils", href: "/conseils/" },
      // Tarifs en 6e position le 20/08/2026 : la grille est publique, autant
      // l'assumer dans la barre. 7 entrées : re-mesuré à 1 280 et 375 px.
      { name: "Tarifs", href: "/tarifs/" },
      { name: "Contact", href: "/contact/" },
    ],
    header: {
      cta: "Audit gratuit",
      menu: "Menu",
      phoneHref: "tel:0769093909",
      phoneLabel: "07 69 09 39 09",
    },
    switcher: {
      label: "Langue",
      otherName: "English",
      noCounterpart: "Cette page n'existe pas en anglais : direction l'accueil anglais",
    },
    pillar: {
      breadcrumbAria: "Fil d'Ariane",
      home: "Accueil",
      faqTitle: "Questions fréquentes",
      ctaPrimary: "Réserver mon audit gratuit",
      phonePrefix: "ou",
      fallbackPrefix: "Ou appelez directement :",
      fallbackSuffix: "On décroche.",
      midCtaBefore: "Une question sur « ",
      midCtaAfter: " » ? Trente minutes au téléphone, sans engagement, et vous repartez avec un avis clair.",
      preFaqCtaText: "Votre question n'est pas dans la liste ci-dessous ? Posez-la de vive voix, on y répond en trente minutes.",
    },
    article: {
      breadcrumbAria: "Fil d'Ariane",
      home: "Accueil",
      hub: "Conseils",
      hubHref: "/conseils/",
      published: "Publié le",
      updated: "Mis à jour le",
      readingSuffix: "min de lecture",
      tldrTitle: (n) => `L'essentiel en ${n} points`,
      tocTitle: "Sommaire",
      faqTitle: "Questions fréquentes",
      // Ancre descriptive de sa cible, et non de son emplacement : « En savoir
      // plus » se répétait à l'identique sur les 15 articles et ne disait rien
      // à Google du contenu de /about/.
      authorMore: "Qui est Mickaël Leclerc",
      relatedTitle: "À lire ensuite",
      callouts: {
        retenir: "À retenir",
        astuce: "Astuce",
        attention: "Attention",
        definition: "Définition",
      },
      aiBar: {
        label: "Pressé ? Faites-le lire à votre assistant IA :",
        groupAria: "Résumer cette page avec une intelligence artificielle",
        chipAria: (a) => `Résumer avec ${a} (nouvel onglet)`,
        // Triplet adapté au domaine : à qui ça s'adresse, les chiffres, les
        // étapes. C'est ce que vient chercher un artisan ou un dirigeant de TPE.
        prompt: (url) =>
          `Lis ${url} et fais-m'en un résumé clair : qui est concerné, les chiffres clés, et les étapes concrètes à suivre. Puis réponds à mes questions dessus.`,
      },
    },
    footer: {
      taglineBefore: "Votre téléphone devrait ",
      taglineEm: "sonner",
      taglineAfter: " plus souvent.",
      cta: "Réserver mon audit gratuit",
      phonePrefix: "ou directement :",
      description:
        "Création de sites web et SEO pour artisans, commerçants et indépendants. Basés en Seine-et-Marne, partout en France.",
      legal: [
        "MKZ · SIRET 983 662 784 00013 · RCS Meaux",
        "1 rue Françoise Sagan, 77230 Dammartin-en-Goële",
      ],
      groups: [
        {
          title: "Services",
          links: [
            { label: "Création de site internet", href: "/creation-site-internet/" },
            { label: "Référencement SEO", href: "/referencement-seo/" },
            { label: "Référencement IA (GEO)", href: "/referencement-ia/" },
            { label: "Agence web Seine-et-Marne", href: "/agence-web-77/" },
            // Depuis le 21/08/2026, cette entrée pointe vers l'outil d'audit en
            // libre-service et non plus vers Calendly : le CTA du bloc du haut
            // couvre déjà la prise de rendez-vous, et le lien devient interne.
            { label: "Audit SEO gratuit en ligne", href: "/audit-seo/" },
          ],
        },
        {
          title: "Conseils",
          links: [
            { label: "Tutoriels pas à pas", href: "/conseils/tutoriels/" },
            { label: "Création de site", href: "/conseils/creation-site-internet/" },
            { label: "SEO & visibilité", href: "/conseils/seo/" },
            { label: "Référencement IA", href: "/conseils/referencement-ia/" },
            { label: "Tous les conseils", href: "/conseils/" },
          ],
        },
        {
          title: "Contact",
          showHours: true,
          links: [
            { label: "07 69 09 39 09", href: "tel:0769093909", external: true },
            {
              label: "contact@mkz-consulting.fr",
              href: "mailto:contact@mkz-consulting.fr",
              external: true,
            },
          ],
        },
        {
          title: "Liens",
          showLangLink: true,
          links: [
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services/" },
            { label: "Tarifs", href: "/tarifs/" },
            { label: "À propos", href: "/about/" },
            { label: "Contact", href: "/contact/" },
          ],
        },
      ],
      contact: { hours: "Lun-ven 9h-18h", reply: "Réponse sous 24 h" },
      copyright: "© 2026 MKZ · Tous droits réservés",
      legalLinks: [
        { name: "Mentions légales", href: "/mentions-legales/" },
        { name: "Politique de confidentialité", href: "/politique-confidentialite/" },
      ],
    },
    newsroom: {
      kicker: "Conseils & tutoriels",
      titleBefore: "Nos méthodes, ",
      titleEm: "en accès libre",
      titleAfter: ".",
      sub: "Guides pratiques, tutoriels pas à pas et conseils SEO pour artisans, commerçants et TPE. Exactement ce que nous appliquons pour nos clients, daté et mis à jour.",
      byTopic: "Explorez par thématique",
      latest: "Derniers articles",
      explore: "Explorer",
      articleCount: (n) => `${n} article${n > 1 ? "s" : ""}`,
      ctaTitleBefore: "Besoin d'un ",
      ctaTitleEm: "coup de main",
      ctaTitleAfter: " ?",
      ctaText:
        "Réservez un audit gratuit de 30 minutes : on analyse votre visibilité Google et vous repartez avec un plan d'action concret, que vous travailliez avec nous ou non.",
      ctaButton: "Réserver mon audit gratuit",
      pillarPrompt: "Envie de déléguer plutôt que de tout faire vous-même ?",
    },
    contact: {
      kicker: "Contact",
      title: "Parlons de votre projet.",
      subtitle:
        "Remplissez le formulaire ou contactez-moi directement. Je réponds sous 24 h, et c'est bien moi qui décroche.",
      calendlyTitle: "Réserver un créneau",
      calendlyDesc: "Audit gratuit de 30 min, sans engagement",
      labels: { phone: "Téléphone", email: "Email", address: "Adresse", hours: "Horaires" },
      addressLines: ["1 rue Françoise Sagan", "77230 Dammartin-en-Goële"],
      hoursLines: ["Lundi - vendredi : 9h - 18h", "Réponse sous 24 h garantie"],
      mapsLabel: "Voir sur Google Maps",
      explore: {
        label: "Avant de nous écrire",
        links: [
          { label: "La grille des tarifs", href: "/tarifs/" },
          { label: "Tester votre site : audit SEO gratuit", href: "/audit-seo/" },
          { label: "Nos services en détail", href: "/services/" },
        ],
      },
      form: {
        name: "Nom complet",
        namePlaceholder: "Jean Dupont",
        email: "Email",
        emailPlaceholder: "jean@exemple.fr",
        subject: "Sujet",
        subjectPlaceholder: "Nouveau projet web",
        message: "Message",
        messagePlaceholder: "Décrivez votre projet...",
        submit: "Envoyer le message",
        sending: "Envoi en cours...",
        successTitle: "Message envoyé !",
        successText: "Merci pour votre message. Je vous recontacte dans les 24h.",
        errorText:
          "Une erreur est survenue. Veuillez réessayer ou contactez-moi au 07 69 09 39 09.",
        mailSubjectPrefix: "Nouveau message mkz-consulting.fr : ",
        defaultSubject: "Contact",
      },
    },
    audit: {
      urlLabel: "L'adresse de votre site",
      urlPlaceholder: "votre-site.fr",
      start: "Lancer l'audit gratuit",
      phases: {
        origin: "Connexion au site : HTTPS et redirections...",
        robots: "Lecture du robots.txt servi, des robots IA et du llms.txt...",
        page: "Analyse de la page d'accueil : balises, données structurées, en-têtes...",
        notfound: "Test d'une adresse inventée : vraie 404 ou soft-404...",
      },
      scoreTitle: "Votre score",
      scoreCaption: (points, max) => `${points} points sur ${max} mesurés à l'instant`,
      scoreScale:
        "Chaque point correspond à une mesure réelle faite sur votre site il y a quelques secondes. Rien n'est estimé.",
      blocs: {
        technique: "Technique et hygiène SEO",
        ia: "Lisibilité par les IA",
        autorite: "Autorité et positions Google",
      },
      autoriteSoon:
        "Mesure en cours d'activation : domaines référents, mots-clés positionnés et trafic estimé arrivent dans le rapport complet.",
      status: { ok: "OK", warn: "À améliorer", fail: "Défaut", na: "À venir" },
      topTitle: "Vos priorités",
      allTitle: "Le détail des mesures",
      checkLabels: {
        "https-redirections": "HTTPS et redirections",
        "robots-txt": "robots.txt",
        "crawlers-ia": "Robots des moteurs IA",
        "llms-txt": "Fichier llms.txt",
        sitemap: "Sitemap",
        indexabilite: "Indexabilité",
        title: "Balise title",
        "meta-description": "Meta description",
        "h1-hn": "Titres H1 à H6",
        viewport: "Affichage mobile (viewport)",
        "json-ld": "Données structurées JSON-LD",
        "images-alt": "Textes alternatifs des images",
        "en-tetes-securite": "En-têtes de sécurité",
        hygiene: "Hygiène de base",
        poids: "Poids de la page",
        "vraie-404": "Vraie page 404",
        page: "Page d'accueil",
        "domaines-referents": "Domaines référents",
        "spam-score": "Score de spam des liens",
        "mots-cles": "Mots-clés positionnés",
        "trafic-estime": "Trafic organique estimé",
      },
      checkDetail: (id, d) => {
        switch (id) {
          case "https-redirections":
            return d.origin
              ? (d.distinctOrigins as string[]).length === 1
                ? d.selfScan
                  ? `HTTPS servi, les variantes convergent vers ${d.origin} (variantes http non testables en auto-scan)`
                  : `HTTPS servi, toutes les variantes convergent vers ${d.origin}`
                : `HTTPS servi, mais ${(d.distinctOrigins as string[]).length} adresses finales distinctes répondent : le site existe en double`
              : "aucune variante HTTPS ne répond en 200 : le site n'est pas servi en sécurisé";
          case "robots-txt":
            return d.absent
              ? "fichier absent : tout est autorisé par défaut, mais les moteurs préfèrent le trouver"
              : d.starBlocked
                ? "Disallow: / bloque tout le site pour tous les robots"
                : `servi (${d.bytes} octets), pas de blocage global`;
          case "crawlers-ia": {
            const v = d.verdicts as Record<string, string>;
            const blocked = Object.keys(v).filter((b) => v[b] === "blocked");
            return blocked.length === 0
              ? "les 6 robots IA testés peuvent lire le site (GPTBot, ClaudeBot, PerplexityBot...)"
              : `bloqués : ${blocked.join(", ")}. Un robot bloqué, c'est un moteur de réponse qui ne peut pas vous citer`;
          }
          case "llms-txt":
            return d.status === 200 && !d.looksHtml
              ? `servi (${d.bytes} octets) : les IA disposent d'un plan du site en clair`
              : `absent (HTTP ${d.status || "aucune réponse"})`;
          case "sitemap":
            return d.url
              ? `${d.urlCount} URL(s), ${d.declared ? "déclaré dans le robots.txt" : "trouvé à /sitemap.xml sans être déclaré"}`
              : "introuvable : les moteurs découvrent vos pages au hasard des liens";
          case "indexabilite":
            return d.xRobotsTag || (d.metaRobots && /noindex/i.test(String(d.metaRobots)))
              ? `noindex détecté (${d.xRobotsTag ? "en-tête X-Robots-Tag" : "meta robots"}) : la page demande à ne pas apparaître sur Google`
              : "indexable : aucune balise noindex";
          case "title":
            return d.title
              ? `${d.length} caractères (plafond SERP : 65)${Number(d.length) > 65 ? " : Google le tronquera" : ""}`
              : "balise absente : Google invente votre titre à votre place";
          case "meta-description":
            return d.description
              ? `${d.length} caractères (plafond : 160)${Number(d.length) > 160 ? " : elle sera tronquée" : ""}`
              : "absente : Google choisit lui-même l'extrait affiché";
          case "h1-hn":
            return d.h1Count === 1
              ? d.levelSkip
                ? "un seul H1, mais la hiérarchie saute un niveau"
                : "un seul H1, hiérarchie propre"
              : d.h1Count === 0
                ? "aucun H1 : la page n'annonce pas son sujet"
                : `${d.h1Count} balises H1 : une seule attendue`;
          case "viewport":
            return d.present
              ? "balise viewport présente"
              : "balise viewport absente : le rendu mobile n'est pas maîtrisé";
          case "json-ld":
            return Number(d.blocks) === 0
              ? "aucune donnée structurée : vous ne dites rien aux moteurs de qui vous êtes"
              : `${d.blocks} bloc(s), ${d.parsed} lisible(s)${(d.itemProblems as string[])?.length ? `, ${(d.itemProblems as string[]).length} défaut(s) de structure` : ""}. Types : ${(d.types as string[])?.join(", ") || "aucun"}`;
          case "images-alt":
            return Number(d.images) === 0
              ? "pas d'image sur la page d'accueil"
              : `${d.images} image(s), ${d.sansAlt} sans texte alternatif`;
          case "en-tetes-securite": {
            const manque = [
              !d.nosniff && "X-Content-Type-Options",
              !d.frameProtection && "X-Frame-Options ou CSP",
              !d.hsts && "HSTS",
            ].filter(Boolean);
            return manque.length ? `manquant(s) : ${manque.join(", ")}` : "les 3 en-têtes de base sont servis";
          }
          case "hygiene": {
            const manque = [
              !d.lang && "attribut lang",
              !d.charset && "charset",
              !d.favicon && "favicon",
              !d.openGraph && "balises Open Graph",
            ].filter(Boolean);
            return manque.length ? `manquant(s) : ${manque.join(", ")}` : "lang, charset, favicon et Open Graph présents";
          }
          case "poids":
            return `HTML de ${d.htmlKb} Ko, ${d.resources} ressources référencées`;
          case "vraie-404":
            return d.soft
              ? "une adresse inventée répond 200 : c'est un soft-404, Google s'en méfie"
              : d.status === 404 || d.status === 410
                ? `une adresse inventée répond bien ${d.status}`
                : `réponse inattendue : HTTP ${d.status}`;
          case "page":
            return `la page d'accueil ne répond pas en 200 (HTTP ${d.status})`;
          default:
            return "";
        }
      },
      errors: {
        cible: "Cette adresse n'est pas analysable : donnez un nom de domaine public, par exemple votre-site.fr.",
        injoignable:
          "Impossible de joindre ce site en HTTPS. Vérifiez l'adresse ; si elle est bonne, c'est déjà un constat : votre site n'est pas servi correctement.",
        serveur: "L'outil a rencontré un problème. Réessayez dans une minute.",
      },
      emailBox: {
        title: "Recevez le rapport complet",
        text: "Le détail de chaque mesure, vos 3 priorités expliquées et un premier aperçu de ce que les IA disent de votre secteur. Préparé et envoyé par Mickaël sous 24 h ouvrées, gratuitement.",
        emailLabel: "Votre email",
        emailPlaceholder: "vous@entreprise.fr",
        consentBefore:
          "J'accepte que MKZ utilise mon email et l'adresse de mon site pour m'envoyer ce rapport et me recontacter à son sujet. Détails et droits : ",
        consentLink: "politique de confidentialité",
        submit: "Recevoir mon rapport",
        sending: "Envoi...",
        successTitle: "C'est noté !",
        successText: "Votre rapport arrive sous 24 h ouvrées, préparé par un humain qui a regardé votre site.",
        errorText: "L'envoi a échoué. Réessayez, ou écrivez à contact@mkz-consulting.fr.",
        mailSubjectPrefix: "Lead audit SEO : ",
      },
      rescan: "Tester un autre site",
    },
    notFound: {
      title: "Page introuvable",
      text: "Désolé, la page que vous recherchez n'existe pas.",
      back: "Retour à l'accueil",
    },
    whatsapp: "Nous contacter sur WhatsApp",
    consent: {
      title: "Vos données, votre choix",
      text: "Ce site utilise des cookies de mesure d'audience (Google Analytics 4 et Microsoft Clarity) pour comprendre comment il est utilisé et l'améliorer. Rien n'est déposé sans votre accord, et vous pouvez changer d'avis à tout moment. Détails :",
      privacy: "politique de confidentialité",
      privacyHref: "/politique-confidentialite/",
      acceptAll: "Tout accepter",
      refuseAll: "Tout refuser",
      customise: "Personnaliser mes choix",
      save: "Enregistrer mes choix",
      necessaryLabel: "Nécessaires",
      necessaryDesc: "Fonctionnement du site et mémorisation de votre choix. Toujours actifs.",
      audienceLabel: "Mesure d'audience",
      audienceDesc: "Google Analytics 4 et Microsoft Clarity : pages vues, clics, défilement, jamais de publicité. Cookies _ga (13 mois), _clck et _clsk (1 an).",
      manage: "Gérer les cookies",
    },
  },

  en: {
    nav: [
      { name: "Home", href: "/en/" },
      { name: "French SEO", href: "/en/french-seo/" },
      { name: "AI search", href: "/en/ai-search-optimization/" },
      { name: "Websites", href: "/en/website-design/" },
      { name: "Insights", href: "/en/insights/" },
      { name: "Contact", href: "/en/contact/" },
    ],
    header: {
      cta: "Free 30-min review",
      menu: "Menu",
      phoneHref: "tel:+33769093909",
      phoneLabel: "+33 7 69 09 39 09",
    },
    switcher: {
      label: "Language",
      otherName: "Français",
      noCounterpart: "This page has no French version, going to the French home",
    },
    pillar: {
      breadcrumbAria: "Breadcrumb",
      home: "Home",
      faqTitle: "Frequently asked questions",
      midCtaBefore: "A question about “",
      midCtaAfter: "”? Thirty minutes on the phone, no strings, and you leave with a clear answer.",
      preFaqCtaText: "Your question is not in the list below? Ask it out loud: thirty minutes, answered.",
      ctaPrimary: "Book a free 30-min review",
      phonePrefix: "or",
      fallbackPrefix: "Or call directly:",
      fallbackSuffix: "You get me, not a queue.",
    },
    article: {
      breadcrumbAria: "Breadcrumb",
      home: "Home",
      hub: "Insights",
      hubHref: "/en/insights/",
      published: "Published",
      updated: "Updated",
      readingSuffix: "min read",
      tldrTitle: (n) => `The short version, in ${n} points`,
      tocTitle: "On this page",
      faqTitle: "Frequently asked questions",
      authorMore: "More about Mickaël Leclerc",
      relatedTitle: "Read next",
      callouts: {
        retenir: "Key takeaway",
        astuce: "Tip",
        attention: "Watch out",
        definition: "Definition",
      },
      aiBar: {
        label: "In a hurry? Have your AI assistant read it:",
        groupAria: "Summarise this page with an AI assistant",
        chipAria: (a) => `Summarise with ${a} (opens in a new tab)`,
        // Lectorat anglais : des entreprises étrangères qui ont besoin que le
        // marché français fonctionne. Elles veulent savoir si ça les concerne,
        // ce que ça coûte, et par quoi commencer.
        prompt: (url) =>
          `Read ${url} and give me a clear summary: who it applies to, the key numbers, and the concrete steps to follow. Then answer my questions about it.`,
      },
    },
    footer: {
      taglineBefore: "Your French traffic should ",
      taglineEm: "find you",
      taglineAfter: " first.",
      cta: "Book a free 30-min review",
      phonePrefix: "or directly:",
      description:
        "SEO and AI search visibility for the French market, run by a French consultant near Paris. Native French, measured results, plain English.",
      legal: [
        "MKZ · SIRET 983 662 784 00013 · Registered in Meaux, France",
        "1 rue Françoise Sagan, 77230 Dammartin-en-Goële, France",
      ],
      groups: [
        {
          title: "Services",
          links: [
            { label: "French SEO", href: "/en/french-seo/" },
            { label: "AI search optimisation", href: "/en/ai-search-optimization/" },
            { label: "Website design", href: "/en/website-design/" },
            // Même bascule que côté français le 21/08/2026 : l'entrée vise
            // l'outil d'audit, Calendly reste servi par le CTA du bloc du haut.
            { label: "Free SEO & AI audit", href: "/en/seo-audit/" },
          ],
        },
        {
          title: "Insights",
          links: [
            { label: "French SEO guides", href: "/en/insights/french-seo/" },
            { label: "AI search guides", href: "/en/insights/ai-search/" },
            { label: "All insights", href: "/en/insights/" },
          ],
        },
        {
          title: "Contact",
          showHours: true,
          links: [
            { label: "+33 7 69 09 39 09", href: "tel:+33769093909", external: true },
            {
              label: "contact@mkz-consulting.fr",
              href: "mailto:contact@mkz-consulting.fr",
              external: true,
            },
          ],
        },
        {
          title: "Links",
          showLangLink: true,
          links: [
            { label: "Home", href: "/en/" },
            { label: "About Mickaël", href: "/en/about/" },
            { label: "Contact", href: "/en/contact/" },
          ],
        },
      ],
      contact: { hours: "Mon-Fri, 9am-6pm CET", reply: "Reply within 24h" },
      copyright: "© 2026 MKZ · All rights reserved",
      legalLinks: [
        { name: "Legal notice", href: "/en/legal-notice/" },
        { name: "Privacy policy", href: "/en/privacy-policy/" },
      ],
    },
    newsroom: {
      kicker: "Insights",
      titleBefore: "How French search ",
      titleEm: "actually works",
      titleAfter: ".",
      sub: "Field notes on ranking in France and getting cited by AI answers. Written from inside the French market, with the numbers that back each claim and the date they were measured.",
      byTopic: "Browse by topic",
      latest: "Latest articles",
      explore: "Read more",
      articleCount: (n) => `${n} article${n > 1 ? "s" : ""}`,
      ctaTitleBefore: "Want someone to ",
      ctaTitleEm: "just handle it",
      ctaTitleAfter: "?",
      ctaText:
        "Book a free 30-minute review. We look at where you stand in French search and in AI answers, and you leave with a concrete plan, whether or not you work with us.",
      ctaButton: "Book a free 30-min review",
      pillarPrompt: "Would you rather hand this over than do it yourself?",
    },
    contact: {
      kicker: "Contact",
      title: "Tell me about the French market problem.",
      subtitle:
        "Use the form or contact me directly. I reply within 24 hours, in English, and it is me answering rather than an inbox.",
      calendlyTitle: "Book a slot",
      calendlyDesc: "Free 30-minute review, no commitment",
      labels: { phone: "Phone", email: "Email", address: "Address", hours: "Hours" },
      addressLines: ["1 rue Françoise Sagan", "77230 Dammartin-en-Goële, France"],
      hoursLines: ["Monday to Friday, 9am - 6pm CET", "Reply within 24 hours"],
      mapsLabel: "View on Google Maps",
      explore: {
        label: "Before you write",
        links: [
          { label: "Run the free SEO & AI audit", href: "/en/seo-audit/" },
          { label: "French SEO, the service", href: "/en/french-seo/" },
          { label: "AI search optimisation", href: "/en/ai-search-optimization/" },
        ],
      },
      form: {
        name: "Full name",
        namePlaceholder: "Jane Smith",
        email: "Email",
        emailPlaceholder: "jane@example.com",
        subject: "Subject",
        subjectPlaceholder: "French SEO for our site",
        message: "Message",
        messagePlaceholder: "Your site, your target market in France, and what is not working...",
        submit: "Send message",
        sending: "Sending...",
        successTitle: "Message sent",
        successText: "Thanks. I will get back to you within 24 hours.",
        errorText:
          "Something went wrong. Please try again, or call me on +33 7 69 09 39 09.",
        mailSubjectPrefix: "[EN] New message mkz-consulting.fr: ",
        defaultSubject: "Contact",
      },
    },
    audit: {
      urlLabel: "Your website address",
      urlPlaceholder: "your-site.com",
      start: "Run the free audit",
      phases: {
        origin: "Connecting: HTTPS and redirects...",
        robots: "Reading the live robots.txt, AI crawlers and llms.txt...",
        page: "Analysing the homepage: tags, structured data, headers...",
        notfound: "Testing a made-up URL: real 404 or soft-404...",
      },
      scoreTitle: "Your score",
      scoreCaption: (points, max) => `${points} points out of ${max} measured just now`,
      scoreScale:
        "Every point is a real measurement taken on your site seconds ago. Nothing is estimated.",
      blocs: {
        technique: "Technical and SEO hygiene",
        ia: "Readability by AI engines",
        autorite: "Authority and Google rankings",
      },
      autoriteSoon:
        "Being activated: referring domains, ranked keywords and estimated traffic will land in the full report.",
      status: { ok: "OK", warn: "Improve", fail: "Issue", na: "Coming" },
      topTitle: "Your priorities",
      allTitle: "Every measurement in detail",
      checkLabels: {
        "https-redirections": "HTTPS and redirects",
        "robots-txt": "robots.txt",
        "crawlers-ia": "AI engine crawlers",
        "llms-txt": "llms.txt file",
        sitemap: "Sitemap",
        indexabilite: "Indexability",
        title: "Title tag",
        "meta-description": "Meta description",
        "h1-hn": "H1 to H6 headings",
        viewport: "Mobile viewport",
        "json-ld": "JSON-LD structured data",
        "images-alt": "Image alt texts",
        "en-tetes-securite": "Security headers",
        hygiene: "Basic hygiene",
        poids: "Page weight",
        "vraie-404": "Real 404 page",
        page: "Homepage",
        "domaines-referents": "Referring domains",
        "spam-score": "Link spam score",
        "mots-cles": "Ranked keywords",
        "trafic-estime": "Estimated organic traffic",
      },
      checkDetail: (id, d) => {
        switch (id) {
          case "https-redirections":
            return d.origin
              ? (d.distinctOrigins as string[]).length === 1
                ? d.selfScan
                  ? `HTTPS served, variants converge to ${d.origin} (http variants not testable in self-scan)`
                  : `HTTPS served, every variant converges to ${d.origin}`
                : `HTTPS served, but ${(d.distinctOrigins as string[]).length} distinct final addresses respond: the site exists in duplicate`
              : "no HTTPS variant answers with a 200: the site is not served securely";
          case "robots-txt":
            return d.absent
              ? "file missing: everything is allowed by default, but engines prefer to find it"
              : d.starBlocked
                ? "Disallow: / blocks the whole site for every crawler"
                : `served (${d.bytes} bytes), no global block`;
          case "crawlers-ia": {
            const v = d.verdicts as Record<string, string>;
            const blocked = Object.keys(v).filter((b) => v[b] === "blocked");
            return blocked.length === 0
              ? "all 6 AI crawlers tested can read the site (GPTBot, ClaudeBot, PerplexityBot...)"
              : `blocked: ${blocked.join(", ")}. A blocked crawler is an answer engine that cannot cite you`;
          }
          case "llms-txt":
            return d.status === 200 && !d.looksHtml
              ? `served (${d.bytes} bytes): AI engines get a plain-text map of the site`
              : `missing (HTTP ${d.status || "no response"})`;
          case "sitemap":
            return d.url
              ? `${d.urlCount} URL(s), ${d.declared ? "declared in robots.txt" : "found at /sitemap.xml without being declared"}`
              : "not found: engines discover your pages by chance";
          case "indexabilite":
            return d.xRobotsTag || (d.metaRobots && /noindex/i.test(String(d.metaRobots)))
              ? `noindex detected (${d.xRobotsTag ? "X-Robots-Tag header" : "robots meta"}): the page asks not to appear on Google`
              : "indexable: no noindex directive";
          case "title":
            return d.title
              ? `${d.length} characters (SERP ceiling: 65)${Number(d.length) > 65 ? ": Google will truncate it" : ""}`
              : "missing: Google invents your title for you";
          case "meta-description":
            return d.description
              ? `${d.length} characters (ceiling: 160)${Number(d.length) > 160 ? ": it will be truncated" : ""}`
              : "missing: Google picks the snippet itself";
          case "h1-hn":
            return d.h1Count === 1
              ? d.levelSkip
                ? "a single H1, but the hierarchy skips a level"
                : "a single H1, clean hierarchy"
              : d.h1Count === 0
                ? "no H1: the page does not state its topic"
                : `${d.h1Count} H1 tags: exactly one expected`;
          case "viewport":
            return d.present
              ? "viewport meta present"
              : "viewport meta missing: mobile rendering is not under control";
          case "json-ld":
            return Number(d.blocks) === 0
              ? "no structured data: you tell engines nothing about who you are"
              : `${d.blocks} block(s), ${d.parsed} parseable${(d.itemProblems as string[])?.length ? `, ${(d.itemProblems as string[]).length} structure issue(s)` : ""}. Types: ${(d.types as string[])?.join(", ") || "none"}`;
          case "images-alt":
            return Number(d.images) === 0
              ? "no image on the homepage"
              : `${d.images} image(s), ${d.sansAlt} without alt text`;
          case "en-tetes-securite": {
            const missing = [
              !d.nosniff && "X-Content-Type-Options",
              !d.frameProtection && "X-Frame-Options or CSP",
              !d.hsts && "HSTS",
            ].filter(Boolean);
            return missing.length ? `missing: ${missing.join(", ")}` : "the 3 baseline headers are served";
          }
          case "hygiene": {
            const missing = [
              !d.lang && "lang attribute",
              !d.charset && "charset",
              !d.favicon && "favicon",
              !d.openGraph && "Open Graph tags",
            ].filter(Boolean);
            return missing.length ? `missing: ${missing.join(", ")}` : "lang, charset, favicon and Open Graph present";
          }
          case "poids":
            return `HTML weighs ${d.htmlKb} KB, ${d.resources} referenced resources`;
          case "vraie-404":
            return d.soft
              ? "a made-up URL answers 200: that is a soft-404, Google distrusts it"
              : d.status === 404 || d.status === 410
                ? `a made-up URL correctly answers ${d.status}`
                : `unexpected response: HTTP ${d.status}`;
          case "page":
            return `the homepage does not answer with a 200 (HTTP ${d.status})`;
          default:
            return "";
        }
      },
      errors: {
        cible: "This address cannot be analysed: enter a public domain name, e.g. your-site.com.",
        injoignable:
          "This site cannot be reached over HTTPS. Check the address; if it is correct, that is already a finding: your site is not served properly.",
        serveur: "The tool ran into a problem. Please try again in a minute.",
      },
      emailBox: {
        title: "Get the full report",
        text: "Every measurement explained, your top 3 priorities, and a first look at what AI engines say about your market. Prepared and sent by Mickaël within 24 business hours, free.",
        emailLabel: "Your email",
        emailPlaceholder: "you@company.com",
        consentBefore:
          "I agree that MKZ uses my email and my site address to send me this report and follow up about it. Details and rights: ",
        consentLink: "privacy policy",
        submit: "Send me my report",
        sending: "Sending...",
        successTitle: "Done!",
        successText: "Your report is on its way within 24 business hours, prepared by a human who actually looked at your site.",
        errorText: "Sending failed. Try again, or write to contact@mkz-consulting.fr.",
        mailSubjectPrefix: "[EN] SEO audit lead: ",
      },
      rescan: "Test another site",
    },
    notFound: {
      title: "Page not found",
      text: "Sorry, the page you are looking for does not exist.",
      back: "Back to home",
    },
    whatsapp: "Contact us on WhatsApp",
    consent: {
      title: "Your data, your call",
      text: "This site uses audience measurement cookies (Google Analytics 4 and Microsoft Clarity) to understand how it is used and improve it. Nothing is set without your consent, and you can change your mind at any time. Details:",
      privacy: "privacy policy",
      privacyHref: "/en/privacy-policy/",
      acceptAll: "Accept all",
      refuseAll: "Refuse all",
      customise: "Customise my choices",
      save: "Save my choices",
      necessaryLabel: "Necessary",
      necessaryDesc: "Site operation and remembering your choice. Always on.",
      audienceLabel: "Audience measurement",
      audienceDesc: "Google Analytics 4 and Microsoft Clarity: pages viewed, clicks, scrolling, never advertising. Cookies _ga (13 months), _clck and _clsk (1 year).",
      manage: "Manage cookies",
    },
  },
};

export { CALENDLY };
