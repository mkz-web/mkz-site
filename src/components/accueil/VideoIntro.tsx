"use client";

// Vidéo d'intro de l'accueil (05/11/2026) : lien sous les boutons du hero, fenêtre de lecture.
// Rien ne se charge avant le clic : vidéo en preload="none", image d'attente posée à l'ouverture,
// seule la vignette du lien (quelques Ko) part avec la page. Sans JavaScript, ou sans <dialog>,
// le lien ouvre le fichier MP4 lui-même. Textes et fichiers : src/content/video-intro.ts.

import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { videoIntro } from "@/content/video-intro";
import { gaEvent } from "@/lib/ga";

export default function VideoIntro({ locale }: { locale: "fr" | "en" }) {
  const v = videoIntro[locale];
  const fenetre = useRef<HTMLDialogElement>(null);
  const lecteur = useRef<HTMLVideoElement>(null);
  const idTexte = `video-intro-texte-${locale}`;

  // Arrêt de la vidéo à la fermeture, sur trois signaux natifs. Mesuré le 05/11/2026 dans un
  // Chrome 152 : après close(), seuls beforetoggle et toggle (newState « closed ») partent,
  // l'événement close jamais, et la vidéo continuait derrière la fenêtre fermée. cancel couvre Échap.
  useEffect(() => {
    const d = fenetre.current;
    if (!d) return;
    const arreter = () => lecteur.current?.pause();
    const bascule = (e: Event) => {
      if ((e as Event & { newState?: string }).newState === "closed") arreter();
    };
    d.addEventListener("close", arreter);
    d.addEventListener("cancel", arreter);
    d.addEventListener("toggle", bascule);
    return () => {
      d.removeEventListener("close", arreter);
      d.removeEventListener("cancel", arreter);
      d.removeEventListener("toggle", bascule);
    };
  }, []);

  const ouvrir = (e: MouseEvent<HTMLAnchorElement>) => {
    const d = fenetre.current;
    const video = lecteur.current;
    if (!d || !video || typeof d.showModal !== "function") return;
    e.preventDefault();
    if (!video.getAttribute("poster")) video.setAttribute("poster", v.affiche);
    d.showModal();
    video.muted = true; // vidéo sans piste son : muette, la lecture est toujours autorisée
    video.currentTime = 0;
    video.play().catch(() => {});
    gaEvent("video_intro", { etape: "ouverture", langue: locale });
  };
  const fermer = () => {
    lecteur.current?.pause();
    fenetre.current?.close();
  };

  return (
    <>
      <a className="hero__video" href={v.src} onClick={ouvrir} data-entree="">
        <span className="hero__video-vignette" aria-hidden="true">
          {/* loading="lazy" : sinon React pose un préchargement de la vignette en tête de page, avant celui
              des polices (mesuré le 05/11/2026), et les polices de la charte se jouent à quelques ms près. */}
          <img src={v.vignette} width={72} height={40} alt="" decoding="async" loading="lazy" />
          <svg viewBox="0 0 24 24"><path d="M9 7v10l8.5-5z" /></svg>
        </span>
        <span>
          {v.libelle} <span className="hero__video-duree">({v.duree})</span>
        </span>
      </a>
      <dialog
        ref={fenetre}
        className="video-intro"
        aria-label={v.titre}
        onClick={(e) => {
          if (e.target === fenetre.current) fermer();
        }}
      >
        <button type="button" className="video-intro__fermer" onClick={fermer} aria-label={v.fermer}>
          <svg aria-hidden="true">
            <use href="#i-croix" />
          </svg>
        </button>
        <video
          ref={lecteur}
          controls
          playsInline
          preload="none"
          width={1920}
          height={1080}
          aria-describedby={idTexte}
          onEnded={() => gaEvent("video_intro", { etape: "fin", langue: locale })}
        >
          <source src={v.src} type="video/mp4" />
        </video>
        <details className="video-intro__texte">
          <summary>{v.texteLibelle}</summary>
          <div id={idTexte}>
            {v.transcription.map((ligne, i) => (
              <p key={i}>{ligne}</p>
            ))}
          </div>
        </details>
      </dialog>
    </>
  );
}
