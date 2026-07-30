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
