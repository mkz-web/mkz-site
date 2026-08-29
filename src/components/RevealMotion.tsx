"use client";

// Apparition discrète des sections au défilement (lot 2 du check UX du
// 28/08/2026 : 2 keyframes sur tout le site, aucun motion d'entrée). Translation
// de 14 px sur 0,5 s, une seule fois par élément. Inactif si
// prefers-reduced-motion, et inoffensif sans JavaScript : les classes ne sont
// posées qu'ici, le HTML statique reste entièrement visible.
// CLS : transform + opacity uniquement, jamais de layout.

import { Global, css } from "@emotion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const styles = css`
  @media (prefers-reduced-motion: no-preference) {
    .rvl {
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .rvl.rvl-vu {
      opacity: 1;
      transform: none;
    }
  }
`;

export default function RevealMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cibles = document.querySelectorAll<HTMLElement>("main section");
    if (!cibles.length) return;
    const io = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) {
            e.target.classList.add("rvl-vu");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    for (const el of cibles) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        // Déjà à l'écran au montage : visible tout de suite, aucun flash.
        el.classList.add("rvl", "rvl-vu");
      } else {
        el.classList.add("rvl");
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, [pathname]);

  return <Global styles={styles} />;
}
