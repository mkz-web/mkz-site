// Gabarit commun des pages à la nouvelle charte (maquette codée du 20/10/2026) :
// conteneur .charte (porte les feuilles préfixées et les classes que la maquette pose sur
// <body>), amorce, sprite, lien d'évitement, en-tête, <main>, pied de page, script partagé.
// Ordre du corps identique à la maquette : sprite, évitement, nav, main, pied, scripts.
// Le layout (SiteChrome) ne rend ni l'ancien en-tête ni l'ancien pied sur ces pages.
import type { ReactNode } from "react";
import { entreeActive } from "@/lib/charte";
import Sprite from "./Sprite";
import Nav from "./Nav";
import Pied from "./Pied";
import CharteScripts from "./CharteScripts";
import Prechargements from "./Prechargements";
import "./charte.css";

// Amorce de la maquette : la classe js arme les entrées du haut de page ([data-entree]) ;
// js-secours les rend visibles après 2,5 s si le script n'est pas venu. Le minuteur vit dans
// window.mkzSecours pour être annulé au démontage (navigation vers une autre page).
const AMORCE =
  "document.documentElement.classList.add('js');window.mkzSecours=setTimeout(function(){document.documentElement.classList.add('js-secours')},2500);";

export default function ChartePage({
  chemin,
  classes = "",
  scripts = "metier",
  children,
}: {
  chemin: string;
  classes?: string;
  // « metier » : CharteScripts (menu, barre sombre, compteurs, apparitions) ;
  // « aucun » : la page apporte les siens (l'accueil, avec GSAP).
  scripts?: "metier" | "aucun";
  children: ReactNode;
}) {
  return (
    <div className={"charte" + (classes ? " " + classes : "")}>
      <Prechargements gsap={chemin === "/"} />
      <script dangerouslySetInnerHTML={{ __html: AMORCE }} />
      <Sprite />
      <a className="evitement" href="#contenu">Aller au contenu</a>
      <Nav actif={entreeActive(chemin)} />
      <main id="contenu">{children}</main>
      <Pied />
      {scripts === "metier" ? <CharteScripts /> : null}
    </div>
  );
}
