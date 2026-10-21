"use client";

// Animations et comportements de l'accueil (port de js/main.js de la maquette codée,
// 18/10/2026). Même découpage que l'original : menu mobile, avis en défilement continu,
// hero animé en boucle, séquence de 48 images de l'ordinateur lue au scroll, entrées des
// blocs, chiffres qui se comptent, barre de navigation en verre sombre sur les zones foncées.
//
// GSAP 3.13.0 et ScrollTrigger sont servis par le site (public/vendor/gsap/3.13.0/),
// chargés à la demande ; sans eux, la page reste entière et visible (la classe js est
// retirée). Tout ce qui est posé ici est défait au démontage (navigation vers une autre
// page) : contexte GSAP annulé, copies des avis retirées, écouteurs débranchés.

import { useEffect } from "react";
import { openConsent } from "@/lib/consent";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Gsap = any;

declare global {
  interface Window {
    gsap?: Gsap;
    ScrollTrigger?: Gsap;
    mkzSecours?: number;
  }
}

const GSAP = "/vendor/gsap/3.13.0/gsap.min.js";
const SCROLLTRIGGER = "/vendor/gsap/3.13.0/ScrollTrigger.min.js";
const NB_IMAGES = 48;

function chargerScript(src: string): Promise<void> {
  return new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => ok();
    s.onerror = () => ko(new Error("script non chargé : " + src));
    document.head.appendChild(s);
  });
}

let gsapPret: Promise<void> | null = null;
function chargerGsap(): Promise<void> {
  if (window.gsap && window.ScrollTrigger) return Promise.resolve();
  if (!gsapPret) {
    gsapPret = chargerScript(GSAP)
      .then(() => chargerScript(SCROLLTRIGGER))
      .catch((e) => {
        gsapPret = null;
        throw e;
      });
  }
  return gsapPret;
}

// toLocaleString("fr-FR") sépare les milliers par une espace fine insécable (U+202F) ;
// la maquette affiche une espace insécable classique (U+00A0).
const formatNombre = (n: number) =>
  Math.round(n).toLocaleString("fr-FR").split(String.fromCharCode(0x202f)).join(String.fromCharCode(160));

export default function AccueilScripts() {
  useEffect(() => {
    const racine = document.documentElement;
    const page = document.querySelector<HTMLElement>(".charte");
    const nav = page?.querySelector<HTMLElement>("#nav");
    if (!page || !nav) return;

    let actif = true;
    const nettoyages: Array<() => void> = [];

    // Amorce : le script en ligne de ChartePage ne s'exécute pas sur une navigation
    // côté client, on repose donc les classes ici (sans effet si elles y sont déjà). Un seul
    // minuteur de secours vit à la fois, rangé dans window.mkzSecours.
    racine.classList.add("js");
    if (!racine.classList.contains("js-secours")) {
      window.clearTimeout(window.mkzSecours);
      window.mkzSecours = window.setTimeout(() => racine.classList.add("js-secours"), 2500);
    }
    nettoyages.push(() => {
      window.clearTimeout(window.mkzSecours);
      racine.classList.remove("js", "js-secours");
    });

    // Menu mobile
    const boutonMenu = nav.querySelector<HTMLButtonElement>(".nav__menu");
    const basculerMenu = () => {
      const ouvert = nav.classList.toggle("nav--ouvert");
      boutonMenu?.setAttribute("aria-expanded", ouvert ? "true" : "false");
    };
    boutonMenu?.addEventListener("click", basculerMenu);
    nettoyages.push(() => boutonMenu?.removeEventListener("click", basculerMenu));

    // « Gérer les cookies » du pied de page : rouvre le bandeau de consentement
    const boutonCookies = page.querySelector<HTMLButtonElement>(".pied__cookies");
    const ouvrirConsentement = () => openConsent();
    boutonCookies?.addEventListener("click", ouvrirConsentement);
    nettoyages.push(() => boutonCookies?.removeEventListener("click", ouvrirConsentement));

    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Avis : on double la piste pour un défilement continu (sauf mouvement réduit)
    const avis = page.querySelector<HTMLElement>(".avis");
    const piste = avis?.querySelector<HTMLElement>(".avis__piste");
    if (avis && piste && !mouvementReduit) {
      const copies = Array.from(piste.children).map((carte) => {
        const copie = carte.cloneNode(true) as HTMLElement;
        copie.setAttribute("aria-hidden", "true");
        piste.appendChild(copie);
        return copie;
      });
      avis.classList.add("avis--defile");
      nettoyages.push(() => {
        copies.forEach((c) => c.remove());
        avis.classList.remove("avis--defile");
      });
    }

    // Villes : même principe, la ligne n'est écrite qu'une fois dans le HTML
    const defile = page.querySelector<HTMLElement>(".defile");
    const ligne = defile?.querySelector<HTMLElement>(".defile__ligne");
    if (defile && ligne && !mouvementReduit) {
      const copie = ligne.cloneNode(true) as HTMLElement;
      defile.appendChild(copie);
      defile.classList.add("defile--double");
      nettoyages.push(() => {
        copie.remove();
        defile.classList.remove("defile--double");
      });
    }

    chargerGsap()
      .then(() => {
        if (actif) nettoyages.push(animer(page, nav));
      })
      .catch(() => {
        // Sans GSAP (hors ligne, fichier absent), tout reste visible
        if (actif) racine.classList.remove("js");
      });

    return () => {
      actif = false;
      nettoyages.reverse().forEach((f) => f());
    };
  }, []);

  return null;
}

function animer(page: HTMLElement, nav: HTMLElement): () => void {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  let vivant = true;
  const mm = gsap.matchMedia();

  const ctx = gsap.context(() => {
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-entree]", { opacity: 1 });
    });

    mm.add(
      {
        grand: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        petit: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
      },
      (c: Gsap) => {
        const grand: boolean = c.conditions.grand;

        /* 1 · Entrée du hero */
        gsap.fromTo(
          ".hero [data-entree]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.1 }
        );

        /* 1 bis · Motion design du hero : le site se construit, puis il grimpe sur Google */
        const trait = page.querySelector<SVGPathElement>(".anim__trait");
        const longueur = trait ? trait.getTotalLength() : 0;
        const cartes = [".anim__fenetre", ".anim__enligne", ".anim__optim", ".anim__google", ".anim__courbe", ".anim__appel", ".anim__score"];
        const hero = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: "power3.out" }, delay: 0.6 });
        hero
          .set(cartes, { autoAlpha: 0 })
          .set(".anim__fenetre", { x: 0, y: 30, scale: 0.96 })
          .set(".anim__url-txt", { clipPath: "inset(0 100% 0 0)" })
          .set(".anim__menu > *", { autoAlpha: 0, y: 6 })
          .set(".anim__l", { scaleX: 0 })
          .set(".anim__bouton", { scale: 0 })
          .set(".anim__visuel", { autoAlpha: 0, scale: 0.85 })
          .set(".anim__cartes span", { autoAlpha: 0, y: 12 })
          .set(".anim__enligne", { scale: 0.6, y: 10 })
          .set(".anim__optim", { x: 30, scale: 0.95 })
          .set(".anim__jauges b", { scaleX: 0 })
          .set(".anim__google", { x: 40 })
          .set(".anim__res--vous", { yPercent: 231.25 })
          .set([".anim__res--a", ".anim__res--b"], { yPercent: -115.6 })
          .set(".anim__courbe", { y: 30 })
          .set(".anim__trait", { strokeDasharray: longueur, strokeDashoffset: longueur })
          .set(".anim__aire", { autoAlpha: 0 })
          .set(".anim__score", { y: 30 })
          .set(".anim__anneau-plein", { strokeDashoffset: 150.8 })
          .set(".anim__appel", { scale: 0.6 })
          /* A · création du site */
          .to(".anim__fenetre", { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 })
          .to(".anim__url-txt", { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "steps(13)" }, "-=.2")
          .to(".anim__menu > *", { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.4 }, "-=.4")
          .to(".anim__l", { scaleX: 1, stagger: 0.12, duration: 0.6, ease: "power2.out" }, "-=.1")
          .to(".anim__visuel", { autoAlpha: 1, scale: 1, duration: 0.7 }, "<")
          .to(".anim__bouton", { scale: 1, duration: 0.5, ease: "back.out(2)" }, "-=.3")
          .to(".anim__cartes span", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=.2")
          .to(".anim__enligne", { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2)" }, "-=.1")
          /* A bis · optimisation : les jauges se remplissent */
          .to(".anim__optim", { autoAlpha: 1, x: 0, scale: 1, duration: 0.6 }, "+=.25")
          .to(".anim__jauges b", { scaleX: 1, stagger: 0.15, duration: 0.6, ease: "power2.out" }, "-=.2")
          .addLabel("seo", "+=.8")
          /* B · performance SEO : il grimpe en tête, les visites montent, le téléphone sonne */
          .to(".anim__fenetre", { scale: 0.9, x: "-4%", y: "-3%", duration: 0.8, ease: "power2.inOut" }, "seo")
          .to([".anim__enligne", ".anim__optim"], { autoAlpha: 0, duration: 0.35 }, "seo")
          .to(".anim__google", { autoAlpha: 1, x: 0, duration: 0.7 }, "seo+=.2")
          .to(".anim__res--vous", { yPercent: 0, duration: 0.9, ease: "power3.inOut" }, "seo+=1.1")
          .to([".anim__res--a", ".anim__res--b"], { yPercent: 0, duration: 0.9, ease: "power3.inOut" }, "<")
          .to(".anim__courbe", { autoAlpha: 1, y: 0, duration: 0.6 }, "seo+=1.4")
          .to(".anim__trait", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, ">-.2")
          .to(".anim__aire", { autoAlpha: 1, duration: 0.6 }, "<+.5")
          .to(".anim__score", { autoAlpha: 1, y: 0, duration: 0.6 }, "seo+=1.8")
          .to(".anim__anneau-plein", { strokeDashoffset: 16.6, duration: 1.1, ease: "power2.out" }, "<+.1")
          .to(".anim__appel", { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)" }, "seo+=2.9")
          .to(".anim__appel svg", { rotation: 14, yoyo: true, repeat: 7, duration: 0.07, ease: "none", transformOrigin: "50% 50%" }, ">")
          .to({}, { duration: 2 })
          .to(cartes, { autoAlpha: 0, duration: 0.5, ease: "power1.in" });

        /* On met l'animation en pause quand le hero n'est plus visible */
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          onToggle: (self: Gsap) => (self.isActive ? hero.play() : hero.pause()),
        });

        /* 2 · L'ordinateur : 48 images (une sur deux de la vidéo) lues sur un canvas au
           rythme du scroll, avec un fondu entre deux images voisines. */
        const scene = page.querySelector<HTMLElement>(".ordi__scene");
        const cadre = page.querySelector<HTMLElement>(".ordi__cadre");
        const entete = page.querySelector<HTMLElement>(".ordi__entete");
        const photo = page.querySelector<HTMLElement>(".ordi__photo");
        const canvas = photo?.querySelector<HTMLCanvasElement>(".ordi__canvas");
        const dessin = canvas?.getContext("2d");
        if (scene && cadre && entete && photo && canvas && dessin) {
          const dossier = window.innerWidth >= 900 ? "/images/accueil/ouverture-1080/" : "/images/accueil/ouverture-640/";
          const images: HTMLImageElement[] = new Array(NB_IMAGES);
          let voulue = 0;
          let affichee = "";
          const prete = (k: number) => {
            const im = images[k];
            return !!im && im.complete && im.naturalWidth > 0;
          };
          const proche = (k: number) => {
            /* image chargée la plus proche de celle voulue (les autres arrivent pendant le scroll) */
            for (let d = 0; d < NB_IMAGES; d++) {
              if (prete(k - d)) return k - d;
              if (prete(k + d)) return k + d;
            }
            return -1;
          };
          const dessiner = (x: number) => {
            if (!vivant) return;
            voulue = Math.max(0, Math.min(NB_IMAGES - 1, x));
            const i = Math.floor(voulue);
            const t = voulue - i;
            const a = proche(i);
            if (a < 0) return;
            const b = t > 0.02 && i + 1 < NB_IMAGES && prete(i + 1) && a === i ? i + 1 : -1;
            const cle = a + ":" + (b < 0 ? 0 : Math.round(t * 20));
            if (cle === affichee) return;
            const im = images[a];
            if (canvas.width !== im.naturalWidth) {
              canvas.width = im.naturalWidth;
              canvas.height = im.naturalHeight;
            }
            dessin.globalAlpha = 1;
            dessin.drawImage(im, 0, 0);
            if (b >= 0) {
              dessin.globalAlpha = Math.round(t * 20) / 20;
              dessin.drawImage(images[b], 0, 0);
              dessin.globalAlpha = 1;
            }
            affichee = cle;
            photo.classList.add("ordi--sequence");
          };
          /* chargement progressif : une image sur 8, puis sur 4, sur 2, puis toutes */
          [8, 4, 2, 1].forEach((pas) => {
            for (let k = 0; k < NB_IMAGES; k += pas) {
              if (images[k]) continue;
              const im = new Image();
              im.decoding = "async";
              im.onload = () => dessiner(voulue);
              im.src = dossier + "f" + String(k + 1).padStart(2, "0") + ".webp";
              images[k] = im;
            }
          });

          if (grand) {
            ScrollTrigger.create({ trigger: scene, start: "top top", end: "+=150%", pin: true, anticipatePin: 1 });
          }
          /* le capot fermé (vers 61 % de l'image) démarre 56 px sous le texte */
          const departY = () => entete.offsetTop + entete.offsetHeight + 56 - (cadre.offsetTop + 0.61 * cadre.offsetHeight);
          const lecture = { image: 0 };
          const ordi = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scene,
              start: grand ? "top 55%" : "top 80%",
              end: grand ? "+=205%" : "bottom 60%",
              scrub: grand ? 1 : 0.5,
              invalidateOnRefresh: true,
            },
          });
          if (grand) {
            ordi
              .fromTo(cadre, { y: departY }, { y: 0, ease: "power1.inOut", duration: 2.3 }, 0)
              .fromTo(entete, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -50, ease: "power1.in", duration: 0.4 }, 0.3);
          }
          ordi
            /* la vidéo ouvre le capot vite : on attend que le titre s'efface avant de lancer les images */
            .fromTo(lecture, { image: 0 }, { image: NB_IMAGES - 1, duration: 1.65, onUpdate: () => dessiner(lecture.image) }, grand ? 0.4 : 0)
            .fromTo(".ordi__halo", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.1)
            .fromTo(".ordi__ecran", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 2.05)
            .to({}, { duration: 0.35 });
        }

        /* Les deux cartes sous l'ordinateur arrivent quand on les atteint */
        gsap.from(".ordi__suite > *", {
          y: 50, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".ordi__suite", start: "top 72%", toggleActions: "play none none none" },
        });

        /* 5 · Pièges : le texte arrive de la droite vers sa place */
        gsap.from(".piege", {
          x: 90, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.14,
          scrollTrigger: { trigger: ".pieges__liste", start: "top 62%", toggleActions: "play none none none" },
        });

        /* Jauges du scan réel */
        gsap.from(".scan__rempli", {
          scaleX: 0, duration: 1.2, ease: "power2.out", stagger: 0.12,
          scrollTrigger: { trigger: ".scan", start: "top 62%", toggleActions: "play none none none" },
        });

        /* Anneau des 93 % */
        gsap.from(".chiffre__anneau-plein", {
          strokeDasharray: "0 119.38", duration: 1.4, ease: "power2.out",
          scrollTrigger: { trigger: ".chiffres", start: "top 85%", toggleActions: "play none none none" },
        });

        /* Chiffres qui se comptent à l'entrée */
        const restaurations: Array<() => void> = [];
        page.querySelectorAll<HTMLElement>("[data-compte]").forEach((el) => {
          const cible = parseFloat(el.dataset.compte || "0");
          const etat = { v: 0 };
          const texteInitial = el.textContent;
          el.textContent = formatNombre(0);
          const dansScan = el.closest(".scan");
          gsap.to(etat, {
            v: cible, duration: 1.4, ease: "power2.out",
            onUpdate: () => {
              el.textContent = formatNombre(etat.v);
            },
            scrollTrigger: { trigger: dansScan || el, start: dansScan ? "top 62%" : "top 90%", toggleActions: "play none none none" },
          });
          restaurations.push(() => {
            el.textContent = texteInitial;
          });
        });

        /* 13 · La Terre glisse légèrement sous le texte */
        gsap.fromTo(".terre__image", { yPercent: -4 }, {
          yPercent: 4, ease: "none",
          scrollTrigger: { trigger: ".terre", start: "top bottom", end: "bottom top", scrub: true },
        });

        // Au retour arrière de matchMedia (changement de largeur ou démontage), les chiffres
        // reprennent leur texte d'origine
        return () => restaurations.forEach((f) => f());
      }
    );

    /* Barre de navigation : verre sombre au-dessus des zones foncées (créé après l'épinglage) */
    const zonesSombres: Gsap[] = [];
    let verifPrevue = false;
    const majNav = () => {
      if (verifPrevue) return;
      verifPrevue = true;
      requestAnimationFrame(() => {
        verifPrevue = false;
        nav.classList.toggle("nav--sombre", zonesSombres.some((t) => t.isActive));
      });
    };
    page.querySelectorAll<HTMLElement>('main > [data-theme="sombre"], footer[data-theme="sombre"]').forEach((section) => {
      zonesSombres.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top " + nav.offsetHeight / 2,
          end: "bottom " + nav.offsetHeight / 2,
          onToggle: majNav,
          onRefresh: majNav,
        })
      );
    });
  }, page);

  // Mises en page tardives (images, polices) : on recalcule les déclencheurs
  const rafraichir = () => {
    if (vivant) ScrollTrigger.refresh();
  };
  if (document.readyState === "complete") requestAnimationFrame(rafraichir);
  else window.addEventListener("load", rafraichir);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(rafraichir);

  return () => {
    vivant = false;
    window.removeEventListener("load", rafraichir);
    mm.revert();
    ctx.revert();
    nav.classList.remove("nav--sombre", "nav--ouvert");
  };
}
