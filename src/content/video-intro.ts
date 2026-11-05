// Vidéo d'intro de l'accueil (motion design à la charte, 05/11/2026), une par langue.
// Source unique du lecteur (VideoIntro), de sa transcription et du balisage VideoObject (JsonLd).
// Les fichiers sont produits hors du dépôt par le générateur de _research/video-intro-2026-11-05/
// (scène GSAP rendue image par image, H.264, relecture comparée aux captures) : changer un texte ici
// sans régénérer la vidéo ferait mentir la transcription.
// Le français reprend des phrases déjà publiées sur l'accueil ; l'anglais est écrit pour le public
// de /en/ (entreprises étrangères qui visent la France), pas traduit.

const NBSP = String.fromCharCode(160);

export type VideoIntro = {
  src: string;
  affiche: string;
  vignette: string;
  duree: string;
  dureeIso: string;
  libelle: string;
  titre: string;
  description: string;
  fermer: string;
  texteLibelle: string;
  transcription: string[];
  langue: string;
  chemin: string;
};

export const videoIntro: Record<"fr" | "en", VideoIntro> = {
  fr: {
    src: "/videos/mkz-intro-fr.mp4",
    affiche: "/videos/mkz-intro-fr.webp",
    vignette: "/videos/mkz-intro-fr-vignette.webp",
    duree: `34${NBSP}s`,
    dureeIso: "PT34S",
    libelle: "Voir la vidéo",
    titre: "MKZ en 34 secondes",
    description:
      "Création de site internet, SEO et référencement IA par Mickaël Leclerc, consultant en Seine-et-Marne : un site visible sur Google, cité par ChatGPT, et à vous.",
    fermer: "Fermer la vidéo",
    texteLibelle: "Le texte de la vidéo",
    transcription: [
      "MKZ, création de site internet et référencement.",
      "Un site sans référencement, c’est une vitrine dans une rue sans passage.",
      "Vos clients cherchent sur Google, et le demandent à ChatGPT. À l’écran, une recherche de plombier à Meaux, et un assistant IA qui recommande votre entreprise.",
      "Visible sur Google, cité par ChatGPT, et à vous.",
      "Trois étapes, zéro jargon. Je crée votre site. Je le référence. Je vous l’explique en français.",
      "Un consultant, pas une agence. Mickaël Leclerc, fondateur, c’est lui qui décroche. Dammartin-en-Goële (77), partout en France.",
      `Un site internet qui fait sonner le téléphone. mkz-consulting.fr, devis gratuit, réponse sous 24${NBSP}h.`,
    ],
    langue: "fr-FR",
    chemin: "/",
  },
  en: {
    src: "/videos/mkz-intro-en.mp4",
    affiche: "/videos/mkz-intro-en.webp",
    vignette: "/videos/mkz-intro-en-vignette.webp",
    duree: "34 s",
    dureeIso: "PT34S",
    libelle: "Watch the video",
    titre: "MKZ in 34 seconds",
    description:
      "French SEO and AI search for companies that sell in France, by Mickaël Leclerc, a native French consultant based near Paris.",
    fermer: "Close the video",
    texteLibelle: "Video transcript",
    transcription: [
      "MKZ, French SEO and AI search.",
      "Your site ranks in English. In France, it’s flat.",
      "French buyers search on Google, and ask ChatGPT, in French. On screen, a French search for a CRM, and an AI assistant that recommends your company.",
      "Found on Google in France, cited by AI in French, and all yours.",
      "Three steps, and you can stop after the first. A free 30-minute review. A plan built on French data. Execution and monthly numbers.",
      "A consultant, not an agency. Mickaël Leclerc, founder, the person you actually talk to. Native French, based near Paris.",
      "Where your site really stands in France, in thirty minutes. mkz-consulting.fr/en, free review, reply within 24h.",
    ],
    langue: "en",
    chemin: "/en/",
  },
};
