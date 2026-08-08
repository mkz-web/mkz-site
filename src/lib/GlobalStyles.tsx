"use client";

import { Global, css } from "@emotion/react";
import { theme } from "./theme";

// Grain papier : tuile SVG feTurbulence inline (~300 octets, zéro requête).
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        /* Polices auto-hébergées (public/fonts/, voir scripts/download-fonts.mjs) */
        @font-face {
          font-family: "Fraunces";
          src: url("/fonts/fraunces-var.woff2") format("woff2");
          font-weight: 400 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Fraunces";
          src: url("/fonts/fraunces-italic-var.woff2") format("woff2");
          font-weight: 400 700;
          font-style: italic;
          font-display: swap;
        }
        @font-face {
          font-family: "Archivo";
          src: url("/fonts/archivo-var.woff2") format("woff2");
          font-weight: 400 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "IBM Plex Mono";
          src: url("/fonts/plex-mono-400.woff2") format("woff2");
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "IBM Plex Mono";
          src: url("/fonts/plex-mono-500.woff2") format("woff2");
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        /* Replis calés pour que l'arrivée des polices web ne redistribue plus
           les lignes. Sans eux, le H1 de l'accueil s'affiche sur 4 lignes en
           Georgia puis retombe à 3 en Fraunces : tout le hero remonte de 43 px,
           soit 0,125 de CLS à lui seul (mesuré le 08/08/2026).

           Les valeurs sont TROUVÉES PAR BALAYAGE sur les hauteurs réellement
           rendues, jamais calculées depuis des largeurs au canvas : Fraunces a
           un axe de taille optique, donc ses proportions à 1000 px ne sont pas
           celles à 42 px, et un ratio mesuré hors contexte donne 76 % là où il
           faut 104 %. Chaque valeur est le centre de l'INTERSECTION des
           plateaux mesurés à 375 px ET à 412 px, où les 152 éléments de
           l'accueil retrouvent leur hauteur exacte. Croiser deux largeurs n'est
           pas du zèle : réglé sur la seule largeur 412, le repli d'Archivo
           tombait à 101 %, hors du plateau de 375 px, et un paragraphe y
           gagnait une ligne. Une seule face par famille : l'italique est
           obtenue par oblique synthétique, c'est la configuration mesurée.

           Le calage vise la première police locale citée, celle du poste de
           mesure. Ailleurs, l'ajustement reste une approximation.

           Refaire la mesure si une famille, une graisse ou une pile de repli
           change. L'outil vit dans le skill cls-polices-web, qui détecte seul
           les familles de la page et croise les largeurs :
           node ~/.claude/skills/cls-polices-web/scripts/caler-replis-polices.js <url>
           Vérification du résultat, avant et après, sur chargement froid :
           node ~/.claude/skills/cls-polices-web/scripts/sonde-cls.js <url> 5
           (barres obliques : ce commentaire vit dans un littéral de gabarit JS,
           où les antislashs d'un chemin Windows seraient mangés en silence) */
        @font-face {
          font-family: "Fraunces Fallback";
          src: local("Georgia"), local("Times New Roman");
          size-adjust: 104%;
          ascent-override: 93.99%;
          descent-override: 24.52%;
          line-gap-override: 0%;
        }
        @font-face {
          font-family: "Archivo Fallback";
          src: local("Segoe UI"), local("Helvetica Neue"), local("Arial");
          size-adjust: 99.5%;
          ascent-override: 88.19%;
          descent-override: 21.11%;
          line-gap-override: 0%;
        }
        @font-face {
          font-family: "Plex Mono Fallback";
          src: local("Consolas"), local("Menlo"), local("Courier New");
          size-adjust: 110.5%;
          ascent-override: 92.76%;
          descent-override: 24.89%;
          line-gap-override: 0%;
        }

        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          font-family: ${theme.fonts.sans};
          background-color: ${theme.colors.background};
          background-image: url("${GRAIN}");
          color: ${theme.colors.text};
          line-height: 1.6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        h1,
        h2 {
          font-family: ${theme.fonts.display};
          font-weight: 600;
          text-wrap: balance;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          max-width: 100%;
          display: block;
        }

        ::selection {
          background-color: ${theme.colors.ctaInk};
          color: white;
        }

        :focus-visible {
          outline: 2px solid ${theme.colors.ctaInk};
          outline-offset: 2px;
        }

        input,
        textarea,
        button {
          font-family: inherit;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}
    />
  );
}
