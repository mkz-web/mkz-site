"use client";

import { Global, css } from "@emotion/react";
import { theme } from "./theme";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

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
          color: ${theme.colors.text};
          line-height: 1.6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
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
          background-color: ${theme.colors.cta};
          color: white;
        }

        input,
        textarea,
        button {
          font-family: inherit;
        }
      `}
    />
  );
}
