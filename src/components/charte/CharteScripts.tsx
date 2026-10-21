"use client";

// Comportements communs des pages à la charte (port de js/metier.js de la maquette du
// 20/10/2026) : menu mobile, barre de navigation en verre sombre au-dessus des zones foncées,
// entrée du haut de page en cascade, chiffres qui se comptent, apparitions au défilement, et
// bouton « Gérer les cookies » du pied de page. Pas de GSAP ici.
//
// Écart voulu avec la maquette : les apparitions ne masquent rien (translation seule, voir
// metier.css), règle du site depuis le 14/09/2026. Les formulaires factices de la maquette
// ne sont pas repris : chaque page branche ses vrais formulaires.
// Tout ce qui est posé est défait au démontage (navigation vers une autre page).

import { useEffect } from "react";
import { openConsent } from "@/lib/consent";

declare global {
  interface Window {
    mkzSecours?: number;
  }
}

export default function CharteScripts() {
  useEffect(() => {
    const racine = document.documentElement;
    const page = document.querySelector<HTMLElement>(".charte");
    const nav = page?.querySelector<HTMLElement>("#nav");
    if (!page || !nav) return;
    const nettoyages: Array<() => void> = [];

    // Amorce rejouée sur une navigation côté client (le script en ligne ne s'exécute pas)
    racine.classList.add("js");
    if (!racine.classList.contains("js-secours")) {
      window.clearTimeout(window.mkzSecours);
      window.mkzSecours = window.setTimeout(() => racine.classList.add("js-secours"), 2500);
    }
    nettoyages.push(() => {
      window.clearTimeout(window.mkzSecours);
      racine.classList.remove("js", "js-secours", "revele-pret");
    });

    // Menu mobile
    const boutonMenu = nav.querySelector<HTMLButtonElement>(".nav__menu");
    const basculerMenu = () => {
      const ouvert = nav.classList.toggle("nav--ouvert");
      boutonMenu?.setAttribute("aria-expanded", ouvert ? "true" : "false");
    };
    boutonMenu?.addEventListener("click", basculerMenu);
    nettoyages.push(() => boutonMenu?.removeEventListener("click", basculerMenu));

    // « Gérer les cookies » rouvre le bandeau de consentement
    const boutonCookies = page.querySelector<HTMLButtonElement>(".pied__cookies");
    const ouvrirConsentement = () => openConsent();
    boutonCookies?.addEventListener("click", ouvrirConsentement);
    nettoyages.push(() => boutonCookies?.removeEventListener("click", ouvrirConsentement));

    // Barre de navigation : verre sombre quand une zone foncée passe dessous
    let prevu = false;
    const majNav = () => {
      prevu = false;
      const sous = document.elementsFromPoint(window.innerWidth / 2, nav.offsetHeight / 2);
      for (const el of sous) {
        if (nav.contains(el)) continue;
        const zone = el.closest("[data-theme]");
        if (zone) {
          nav.classList.toggle("nav--sombre", zone.getAttribute("data-theme") === "sombre");
          return;
        }
      }
    };
    const surDefilement = () => {
      if (!prevu) {
        prevu = true;
        requestAnimationFrame(majNav);
      }
    };
    window.addEventListener("scroll", surDefilement, { passive: true });
    majNav();
    nettoyages.push(() => {
      window.removeEventListener("scroll", surDefilement);
      nav.classList.remove("nav--sombre", "nav--ouvert");
    });

    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Entrée du haut de page, en cascade
    page.querySelectorAll<HTMLElement>("[data-entree]").forEach((el, i) => {
      el.style.setProperty("--i", String(i));
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("entre")));
    });

    // Chiffres qui se comptent (décimales gardées : 53,4)
    const textes = new Map<HTMLElement, string | null>();
    const compter = (el: HTMLElement) => {
      const brut = el.getAttribute("data-compte") || "0";
      const cible = parseFloat(brut);
      const decimales = (brut.split(".")[1] || "").length;
      if (!textes.has(el)) textes.set(el, el.textContent);
      const ecrire = (v: number) => {
        el.textContent = v
          .toLocaleString("fr-FR", { minimumFractionDigits: decimales, maximumFractionDigits: decimales })
          .replace(/\s/g, String.fromCharCode(0x202f)); // espace fine insécable, comme la maquette
      };
      if (mouvementReduit) {
        ecrire(cible);
        return;
      }
      let debut: number | null = null;
      const pas = (t: number) => {
        if (debut === null) debut = t;
        const p = Math.min(1, (t - debut) / 1300);
        ecrire(cible * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    };
    nettoyages.push(() => textes.forEach((t, el) => (el.textContent = t)));

    if (!("IntersectionObserver" in window) || mouvementReduit) {
      page.querySelectorAll<HTMLElement>("[data-compte]").forEach(compter);
      return () => nettoyages.reverse().forEach((f) => f());
    }

    // Apparitions : chaque enfant d'un groupe [data-revele-groupe] arrive avec un léger décalage
    const ajoutes: HTMLElement[] = [];
    page.querySelectorAll<HTMLElement>("[data-revele-groupe]").forEach((groupe) => {
      Array.from(groupe.children).forEach((enfant, i) => {
        const e = enfant as HTMLElement;
        if (!e.hasAttribute("data-revele")) {
          e.setAttribute("data-revele", "");
          ajoutes.push(e);
        }
        e.style.setProperty("--i", String(i));
      });
    });
    const minuteurs: number[] = [];
    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (!e.isIntersecting) return;
          const cible = e.target as HTMLElement;
          cible.classList.add("vu");
          // une fois arrivé, l'élément retrouve ses propres effets de survol
          const delai = (parseInt(cible.style.getPropertyValue("--i"), 10) || 0) * 90 + 1000;
          minuteurs.push(
            window.setTimeout(() => {
              cible.removeAttribute("data-revele");
              cible.classList.remove("vu");
            }, delai)
          );
          cible.querySelectorAll<HTMLElement>("[data-compte]").forEach(compter);
          if (cible.hasAttribute("data-compte")) compter(cible);
          observateur.unobserve(cible);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    page.querySelectorAll<HTMLElement>("[data-revele], [data-compte]").forEach((el) => {
      if (el.hasAttribute("data-compte") && el.closest("[data-revele]")) return;
      observateur.observe(el);
    });
    racine.classList.add("revele-pret");
    nettoyages.push(() => {
      observateur.disconnect();
      minuteurs.forEach((m) => window.clearTimeout(m));
      ajoutes.forEach((e) => e.removeAttribute("data-revele"));
    });

    return () => nettoyages.reverse().forEach((f) => f());
  }, []);

  return null;
}
