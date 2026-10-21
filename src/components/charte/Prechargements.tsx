"use client";

// Préchargements de la charte (polices, et GSAP sur l'accueil), posés par un composant CLIENT.
// Mesuré le 21/10/2026 : une balise <link rel="preload"> ou un appel preload() dans un composant
// serveur devient une indication (« :HL ») de la charge RSC de la page ; Next l'applique dès qu'il
// PRÉCHARGE cette page depuis un lien, donc sur toutes les pages qui y mènent, et Chrome affiche
// « preloaded but not used » à chaque visite. Appelé ici, preload() n'écrit la balise que dans le
// HTML de la page elle-même (rendu serveur), et React ne la répète pas d'une page à l'autre.
import { preload } from "react-dom";

const POLICES = ["/fonts/montserrat-latin-var.woff2", "/fonts/inter-latin-var.woff2"];
const GSAP = ["/vendor/gsap/3.13.0/gsap.min.js", "/vendor/gsap/3.13.0/ScrollTrigger.min.js"];

export default function Prechargements({ gsap = false }: { gsap?: boolean }) {
  for (const href of POLICES) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  if (gsap) for (const href of GSAP) preload(href, { as: "script" });
  return null;
}
