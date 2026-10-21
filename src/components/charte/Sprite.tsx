// Sprite SVG de la charte (logo, chevron, pictos) : généré depuis la maquette du 20/10/2026
// par construire-socle.mjs. Identique sur les 40 pages qui le portent en entier.
import type { CSSProperties } from "react";

export default function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" } as CSSProperties} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-haut" gradientUnits="userSpaceOnUse" x1="965.18" y1="177.82" x2="869.13" y2="273.87"><stop offset="0" stopColor="#3B5BD9"/><stop offset="1" stopColor="#8DB2F8"/></linearGradient>
        <linearGradient id="g-bas" gradientUnits="userSpaceOnUse" x1="942.88" y1="273.88" x2="1038.99" y2="370"><stop offset="0" stopColor="#8DB2F8"/><stop offset=".45" stopColor="#9C9EF7"/><stop offset=".8" stopColor="#705398"/><stop offset="1" stopColor="#EBC49D"/></linearGradient>
        <linearGradient id="g-exergue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2A4089"/><stop offset="1" stopColor="#705398"/></linearGradient>
        <linearGradient id="g-ico" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stopColor="#2A4089"/><stop offset="1" stopColor="#705398"/></linearGradient>
        <linearGradient id="g-ico-sombre" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stopColor="#8DB2F8"/><stop offset="1" stopColor="#C9B6F5"/></linearGradient>
        <linearGradient id="g-anneau" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#705398"/><stop offset=".6" stopColor="#C2558F"/><stop offset="1" stopColor="#E39A5A"/></linearGradient>
        <linearGradient id="g-ico-chaud" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22"><stop offset="0" stopColor="#705398"/><stop offset=".6" stopColor="#C2558F"/><stop offset="1" stopColor="#E39A5A"/></linearGradient>
        <clipPath id="decoupe"><path d="M1025.22 237.86L978.9 237.86L906.02 310.75L906.08 310.81L906.02 310.87L978.91 383.77L1025.21 383.77L1025.22 383.76L952.27 310.81Z"/></clipPath>
        <path id="chevron" d="M1025.22 237.86L978.9 237.86L906.02 310.75L906.08 310.81L906.02 310.87L978.91 383.77L1025.21 383.77L1025.22 383.76L952.27 310.81Z"/>
        <g id="logo-lettres">
          <path d="M882.1 237.86L882.1 383.78L853.54 383.78L853.54 289.14L812.4 356.83L809.04 356.95L768.08 289.5L768.08 383.78L739.32 383.78L739.32 237.86L768.92 237.86L810.75 306.76L852.38 237.86Z"/>
          <path d="M1153.75 265.38L1153.79 265.38L1153.79 237.86L1066.62 237.86L1039.13 265.38L1114.84 265.38L1031.55 348.67L1031.66 348.78L1031.66 348.79L1066.61 383.75L1066.68 383.68L1066.7 383.78L1153.79 383.78L1153.79 356.26L1078.62 356.26L1070.75 348.39Z"/>
          <path d="M1025.22 419.74L906.02 419.74L906.02 404.96L1025.22 404.96Z"/>
        </g>
        <g id="logo-chevron" clipPath="url(#decoupe)">
          <rect x="900" y="230" width="130" height="81" fill="url(#g-haut)"/>
          <rect x="900" y="310.6" width="130" height="80" fill="url(#g-bas)"/>
        </g>
      </defs>
      <symbol id="i-vitrine" viewBox="0 0 24 24"><path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6"/><path d="M3 10a3 3 0 0 0 6 0a3 3 0 0 0 6 0a3 3 0 0 0 6 0"/><path d="M10 20v-5h4v5"/></symbol>
      <symbol id="i-rapport" viewBox="0 0 24 24"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M10 11.5a2 2 0 1 1 2.6 1.9c-.4.2-.6.5-.6.9v.7"/><path d="M12 17.6h.01"/></symbol>
      <symbol id="i-cle" viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8"/><path d="M16 7l2.5 2.5"/><path d="M13.5 9.5l2 2"/></symbol>
      <symbol id="i-bulle" viewBox="0 0 24 24"><path d="M4 5h16v11H9.5L5 20v-4H4z"/><path d="M8 9h8M8 12.2h5"/></symbol>
      <symbol id="i-tel" viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.6 4.6-2.2 1.4a11 11 0 0 0 5.6 5.6l1.4-2.2 4.6 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/></symbol>
      <symbol id="i-oeil" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>
      <symbol id="i-libre" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 7.6-1.8"/><path d="M12 15v2"/></symbol>
      <symbol id="i-etiquette" viewBox="0 0 24 24"><path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8a1.4 1.4 0 0 1 0 2l-7 7a1.4 1.4 0 0 1-2 0z"/><circle cx="8" cy="8" r="1.4"/></symbol>
      <symbol id="i-horloge" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>
      <symbol id="i-chrono" viewBox="0 0 24 24"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5l3-3"/><path d="M10 3h4M12 3v3"/></symbol>
      <symbol id="i-coche" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.6 2.4 3.8 5.2 3.8 8.5s-1.2 6.1-3.8 8.5c-2.6-2.4-3.8-5.2-3.8-8.5s1.2-6.1 3.8-8.5z"/></symbol>
      <symbol id="i-serveur" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/><path d="M8 7.5h.01M8 16.5h.01M12 7.5h4M12 16.5h4"/></symbol>
      <symbol id="i-bouclier" viewBox="0 0 24 24"><path d="M12 3.5l7 2.8v5.2c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9V6.3z"/><path d="M9 12l2.2 2.2L15.5 10"/></symbol>
      <symbol id="i-crayon" viewBox="0 0 24 24"><path d="M5 19l.9-4.1L15.6 5.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L9.1 18.1z"/><path d="M13.8 7l3.2 3.2"/></symbol>
      <symbol id="i-photo" viewBox="0 0 24 24"><rect x="3.5" y="6.5" width="17" height="13" rx="2.5"/><path d="M8.5 6.5l1.4-2.5h4.2l1.4 2.5"/><circle cx="12" cy="13" r="3.5"/></symbol>
      <symbol id="i-etoile" viewBox="0 0 24 24"><path d="M12 3.8l2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8z"/></symbol>
      <symbol id="i-repere" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></symbol>
      <symbol id="i-etincelle" viewBox="0 0 24 24"><path d="M11 3.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5z"/><path d="M18.5 15c.3 1.7 1 2.4 2.5 2.7-1.5.3-2.2 1-2.5 2.7-.3-1.7-1-2.4-2.5-2.7 1.5-.3 2.2-1 2.5-2.7z"/></symbol>
      <symbol id="i-eclair" viewBox="0 0 24 24"><path d="M13 3L5.5 13.5H11l-1 7.5 7.5-10.5H12z"/></symbol>
      <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 15.5h6M9 8.5h2"/></symbol>
      <symbol id="i-lien" viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></symbol>
      <symbol id="i-robot" viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V5"/><circle cx="12" cy="4" r="1"/><path d="M9.5 12.8h.01M14.5 12.8h.01M9.5 15.8h5M3 12.5v3M21 12.5v3"/></symbol>
      <symbol id="i-guillemets" viewBox="0 0 24 24"><path d="M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h5V7zM10 12c0 3-1.4 4.6-4 5.2"/><path d="M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h5V7zM19 12c0 3-1.4 4.6-4 5.2"/></symbol>
      <symbol id="i-code" viewBox="0 0 24 24"><path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5"/><path d="M13.2 5.5l-2.4 13"/></symbol>
      <symbol id="i-courbe" viewBox="0 0 24 24"><path d="M4 4v16h16"/><path d="M7.5 15l3.5-4 3 2.5 5-6"/></symbol>
      <symbol id="i-alerte" viewBox="0 0 24 24"><path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.4h.01"/></symbol>
      <symbol id="i-loupe" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></symbol>
      <symbol id="i-croix" viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></symbol>
      <defs><linearGradient id="g-tableau" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C2558F" stopOpacity=".28"/><stop offset="1" stopColor="#9C9EF7" stopOpacity="0"/></linearGradient></defs>
      <symbol id="i-goutte" viewBox="0 0 24 24"><path d="M12 3.5C9 7.5 6 10.6 6 14a6 6 0 0 0 12 0c0-3.4-3-6.5-6-10.5z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/></symbol>
      <symbol id="i-maison" viewBox="0 0 24 24"><path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></symbol>
    </svg>
  );
}
