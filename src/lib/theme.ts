// Design system MKZ v2 : « papier & encre, éditorial chantier ».
// Fond papier chaud + encre quasi-noire, navy en encre de titre, orange rationné
// (CTA, kickers, détails), filets 1px, angles francs, aucune ombre floue.

export const theme = {
  colors: {
    background: "#FAF7F1", // papier
    surface: "#FFFDF8", // carte sur papier
    surfaceAlt: "#F1EBDF", // sable
    dark: "#0C1B2A", // encre nuit (sections sombres)
    darkSurface: "#13253B",
    darkBorder: "rgba(255, 255, 255, 0.14)",
    text: "#221F1A", // encre chaude
    textSecondary: "#5E574B",
    textOnDark: "#F6F1E7",
    textOnDarkSecondary: "rgba(246, 241, 231, 0.72)",
    accent: "#003764", // navy MKZ
    accentLight: "#0B5394",
    cta: "#E8590C", // orange MKZ, budget strict
    ctaHover: "#C84A05",
    border: "#E3DACA", // filet discret (papier)
    borderInk: "#221F1A", // filet fort (chapitres)
    hoverSurface: "#F1EBDF",
    success: "#1E7A4F",
    star: "#E8590C",
  },
  fonts: {
    sans: "'Archivo', 'Segoe UI', system-ui, -apple-system, sans-serif",
    display: "'Fraunces', Georgia, 'Times New Roman', serif",
    mono: "'IBM Plex Mono', Consolas, 'Courier New', monospace",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px",
    "5xl": "128px",
  },
  radius: {
    sm: "2px",
    md: "2px",
    lg: "4px",
    xl: "6px",
    full: "9999px",
  },
  shadows: {
    // Ombres dures décalées (signal « imprimé »), jamais de flou
    sm: "none",
    md: "4px 4px 0 rgba(34, 31, 26, 0.10)",
    lg: "6px 6px 0 rgba(34, 31, 26, 0.12)",
    cta: "none",
    ctaHover: "none",
  },
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export type Theme = typeof theme;
