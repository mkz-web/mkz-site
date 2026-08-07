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
  notFound: { title: string; text: string; back: string };
  whatsapp: string;
}

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

export const ui: Record<Locale, UiStrings> = {
  fr: {
    nav: [
      { name: "Accueil", href: "/" },
      { name: "Création de site", href: "/creation-site-internet" },
      { name: "SEO", href: "/referencement-seo" },
      // « Témoignages » (ancre vers une section de l'accueil) a laissé sa place
      // au pilier référencement IA : une page de service qui se positionne vaut
      // mieux qu'une ancre interne dans une barre à 6 entrées.
      { name: "Référencement IA", href: "/referencement-ia" },
      { name: "Conseils", href: "/conseils" },
      { name: "Contact", href: "/contact" },
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
      authorMore: "En savoir plus",
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
            { label: "Création de site internet", href: "/creation-site-internet" },
            { label: "Référencement SEO", href: "/referencement-seo" },
            { label: "Référencement IA (GEO)", href: "/referencement-ia" },
            { label: "Agence web Seine-et-Marne", href: "/agence-web-77" },
            { label: "Audit gratuit", href: CALENDLY, external: true },
          ],
        },
        {
          title: "Conseils",
          links: [
            { label: "Tutoriels pas à pas", href: "/conseils/tutoriels" },
            { label: "Création de site", href: "/conseils/creation-site-internet" },
            { label: "SEO & visibilité", href: "/conseils/seo" },
            { label: "Référencement IA", href: "/conseils/referencement-ia" },
            { label: "Tous les conseils", href: "/conseils" },
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
            { label: "Services", href: "/services" },
            { label: "À propos", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
      contact: { hours: "Lun-ven 9h-18h", reply: "Réponse sous 24 h" },
      copyright: "© 2026 MKZ · Tous droits réservés",
      legalLinks: [
        { name: "Mentions légales", href: "/mentions-legales" },
        { name: "Politique de confidentialité", href: "/politique-confidentialite" },
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
    notFound: {
      title: "Page introuvable",
      text: "Désolé, la page que vous recherchez n'existe pas.",
      back: "Retour à l'accueil",
    },
    whatsapp: "Nous contacter sur WhatsApp",
  },

  en: {
    nav: [
      { name: "Home", href: "/en/" },
      { name: "French SEO", href: "/en/french-seo" },
      { name: "AI search", href: "/en/ai-search-optimization" },
      { name: "Websites", href: "/en/website-design" },
      { name: "Insights", href: "/en/insights" },
      { name: "Contact", href: "/en/contact" },
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
      authorMore: "More about me",
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
            { label: "French SEO", href: "/en/french-seo" },
            { label: "AI search optimisation", href: "/en/ai-search-optimization" },
            { label: "Website design", href: "/en/website-design" },
            { label: "Free 30-min review", href: CALENDLY, external: true },
          ],
        },
        {
          title: "Insights",
          links: [
            { label: "French SEO guides", href: "/en/insights/french-seo" },
            { label: "AI search guides", href: "/en/insights/ai-search" },
            { label: "All insights", href: "/en/insights" },
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
            { label: "About Mickaël", href: "/en/about" },
            { label: "Contact", href: "/en/contact" },
          ],
        },
      ],
      contact: { hours: "Mon-Fri, 9am-6pm CET", reply: "Reply within 24h" },
      copyright: "© 2026 MKZ · All rights reserved",
      legalLinks: [
        { name: "Legal notice", href: "/en/legal-notice" },
        { name: "Privacy policy", href: "/en/privacy-policy" },
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
    notFound: {
      title: "Page not found",
      text: "Sorry, the page you are looking for does not exist.",
      back: "Back to home",
    },
    whatsapp: "Contact us on WhatsApp",
  },
};

export { CALENDLY };
