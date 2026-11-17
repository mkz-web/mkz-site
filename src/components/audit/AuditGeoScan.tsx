"use client";

// Audit GEO : le composant interactif de /audit-geo/. Deux mesures menées de front, affichées à
// mesure qu'elles arrivent :
//   1. trois questions posées à un modèle d'OpenAI avec recherche web (phase « citations » de
//      /api/scan, une question par appel, l'une après l'autre : le compteur du plafond quotidien
//      se lit puis s'écrit, des appels simultanés le fausseraient) ;
//   2. la lisibilité du site par les IA (phases « robots » et « page » du scan, mesures du bloc
//      « ia » seulement).
// Rien n'est estimé : la réponse du modèle est montrée telle qu'elle est revenue, et le verdict
// dit seulement ce qui s'y lit (site parmi les sources, nom écrit). Une IA ne répond pas deux
// fois pareil : c'est écrit sous le résultat.
//
// Le formulaire est posé par la page (id passé en `formulaire`, champs name="site", "nom",
// "metier", "zone") ; sans JavaScript il renvoie vers /audit-geo/?site=… et rien ne se lance.
// Avec ces quatre paramètres dans l'adresse (lien partagé), le formulaire est PRÉREMPLI et c'est
// le clic qui lance : un test coûte trois questions payantes, et un robot qui suit un lien n'a pas
// à les déclencher. Lancé au clic, le résultat n'ajoute pas non plus de décalage au chargement
// (0,90 mesuré le 17/11/2026 quand il partait tout seul à l'arrivée).
//
// Stabilité : toute la trame du résultat (bilan, trois questions, lisibilité) est rendue dès
// l'envoi, avec des hauteurs réservées, puis remplie. Sans cela, chaque réponse qui arrive
// poussait la suite de la page (décalage cumulé de 0,30 mesuré le 17/11/2026 au premier jet).
// Les textes passent par typoFr (insécables, apostrophes) ; la réponse de l'IA, elle, reste
// telle quelle.

import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { gaEvent } from "@/lib/ga";
import { ui } from "@/lib/i18n";
import { typoFr } from "@/lib/typo";

const WEB3FORMS_KEY = "5f80cd7f-a0fb-484c-995c-a6a1a5534c34";

const C = {
  nuit: "var(--nuit, #202748)",
  violet: "var(--violet, #705398)",
  texteDoux: "var(--texte-doux, #4A4F66)",
  lavande: "var(--lavande-clair, #EEF0FF)",
  filet: "rgba(32, 39, 72, .14)",
  succes: "#1E7A4F",
  succesFond: "#E8F5EE",
  defaut: "#B42318",
  defautFond: "#FDECEA",
  neutreFond: "#F1F1F6",
  titre: 'var(--f-titre, "Montserrat", "Helvetica Neue", Arial, sans-serif)',
  rayon: "var(--r-grand, 28px)",
};

interface Citation {
  n: number;
  type: "recommandation" | "marque";
  question: string;
  statut: "ok" | "na";
  reason?: string;
  cite?: boolean;
  source?: boolean;
  domaineEcrit?: boolean;
  nomEcrit?: boolean;
  reponse?: string;
  coupee?: boolean;
  autres?: string[];
  modele?: string;
  releve?: string;
}

interface Mesure {
  id: string;
  bloc: string;
  status: "ok" | "warn" | "fail" | "na";
  points: number;
  max: number;
  data: Record<string, unknown>;
}

const CHAMP = /^[\p{L}\p{N}][\p{L}\p{N} '’&.,+-]{1,59}$/u;
const ORDRE = [1, 2, 3] as const;

// ── Styles ──────────────────────────────────────────────────────────────────
// « && » : la feuille de la charte pose `.charte p { margin: 0 0 1em }`, plus précise qu'une
// classe seule.

const Entree = styled.h2`
  && {
    margin: 0 0 clamp(20px, 2.6vw, 30px);
  }
  scroll-margin-top: 96px;
  font: 700 clamp(1.5rem, 1.2rem + 1.1vw, 2.1rem) / 1.15 ${C.titre};
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: ${C.nuit};
`;

const Bilan = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: 860px) {
    grid-template-columns: 1.15fr 1fr;
    gap: 20px;
  }
`;

const Carte = styled("div", { shouldForwardProp: (p) => p !== "ton" })<{ ton: "fort" | "doux" }>`
  min-height: 236px;
  padding: clamp(22px, 3vw, 34px);
  border-radius: ${C.rayon};
  background: ${(p) => (p.ton === "fort" ? C.nuit : C.lavande)};
  color: ${(p) => (p.ton === "fort" ? "#fff" : C.nuit)};

  && p {
    margin: 0;
  }

  @media (min-width: 860px) {
    min-height: 212px;
  }
`;

const Sur = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
`;

const Chiffre = styled.p`
  &&& {
    margin-top: 10px;
  }
  font: 800 clamp(2.4rem, 1.6rem + 3vw, 3.6rem) / 1 ${C.titre};
  letter-spacing: -0.03em;
`;

const Phrase = styled.p`
  &&& {
    margin-top: 12px;
  }
  max-width: 46ch;
  font-size: 1.0625rem;
  line-height: 1.55;
`;

const Liste = styled.ol`
  list-style: none;
  margin: clamp(24px, 3vw, 36px) 0 0;
  padding: 0;
  display: grid;
  gap: 16px;
`;

const Question = styled("li", { shouldForwardProp: (p) => p !== "attente" })<{ attente?: boolean }>`
  min-height: ${(p) => (p.attente ? "400px" : "0")};
  padding: clamp(20px, 2.6vw, 28px);
  border: 1px solid ${C.filet};
  border-radius: ${C.rayon};
  background: #fff;

  @media (min-width: 768px) {
    min-height: ${(p) => (p.attente ? "262px" : "0")};
  }

  @media (min-width: 1024px) {
    min-height: ${(p) => (p.attente ? "440px" : "0")};
  }
`;

// À partir de 1 024 px : question et constat à gauche, réponse de l'IA à droite.
const Corps = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: 0 clamp(28px, 3.4vw, 56px);
    align-items: start;
  }
`;

const Entete = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
`;

const Numero = styled.p`
  && {
    margin: 0;
  }
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.violet};
`;

const Pastille = styled("span", { shouldForwardProp: (p) => p !== "ton" })<{ ton: "oui" | "non" | "attente" }>`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 4px 14px;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${(p) => (p.ton === "oui" ? C.succes : p.ton === "non" ? C.defaut : C.texteDoux)};
  background: ${(p) => (p.ton === "oui" ? C.succesFond : p.ton === "non" ? C.defautFond : C.neutreFond)};
`;

const Enonce = styled.blockquote`
  margin: 16px 0 0;
  max-width: 58ch;
  padding: 0 0 0 16px;
  border-left: 3px solid ${C.lavande};
  font-size: 1rem;
  line-height: 1.55;
  color: ${C.nuit};
`;

const Constat = styled.p`
  && {
    margin: 16px 0 0;
  }
  max-width: 58ch;
  font-size: 1rem;
  line-height: 1.55;
  color: ${C.texteDoux};

  strong {
    color: ${C.nuit};
  }
`;

const Reponse = styled.details`
  margin-top: 12px;

  @media (min-width: 1024px) {
    margin-top: 4px;
  }

  summary {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    cursor: pointer;
    font-weight: 600;
    color: ${C.violet};
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  div {
    max-width: 60ch;
    margin-top: 6px;
    padding: 16px 18px;
    border-radius: 14px;
    background: #f6f5fb;
    font-size: 1rem;
    line-height: 1.6;
    white-space: pre-line;
    overflow-wrap: anywhere;
    color: ${C.nuit};
  }
`;

const Titre = styled.h3`
  && {
    margin: clamp(36px, 4.4vw, 56px) 0 0;
  }
  font: 700 clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem) / 1.25 ${C.titre};
  text-wrap: balance;
  color: ${C.nuit};
`;

// Mot composé qui ne doit pas se couper au trait d'union dans un titre.
const Soude = styled.span`
  white-space: nowrap;
`;

const Lisibilite = styled("div", { shouldForwardProp: (p) => p !== "attente" })<{ attente?: boolean }>`
  min-height: ${(p) => (p.attente ? "420px" : "0")};

  @media (min-width: 768px) {
    min-height: ${(p) => (p.attente ? "330px" : "0")};
  }
`;

const Mesures = styled.ul`
  list-style: none;
  margin: 16px 0 0;
  padding: 0;

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 6px 14px;
    align-items: start;
    padding: 14px 0;
    border-bottom: 1px solid ${C.filet};
    font-size: 1rem;
    line-height: 1.5;
  }

  li:last-of-type {
    border-bottom: 0;
  }

  li > span {
    min-width: 0;
  }

  small {
    display: block;
    max-width: 58ch;
    overflow-wrap: anywhere;
    margin-top: 2px;
    font-size: 1rem;
    color: ${C.texteDoux};
  }
`;

const Note = styled.p`
  && {
    margin: 20px 0 0;
  }
  max-width: 58ch;
  font-size: 1rem;
  line-height: 1.6;
  color: ${C.texteDoux};

  a {
    color: ${C.violet};
    font-weight: 600;
    text-underline-offset: 0.2em;
  }
`;

const Erreur = styled.p`
  && {
    margin: 0;
  }
  padding: 14px 18px;
  border-radius: 14px;
  background: ${C.defautFond};
  color: ${C.defaut};
  font-size: 1rem;
`;

const Suite = styled.div`
  margin-top: clamp(28px, 3.4vw, 44px);
  padding: clamp(22px, 3vw, 34px);
  border-radius: ${C.rayon};
  background: ${C.lavande};

  && h3 {
    margin: 0;
    max-width: 30ch;
    font: 700 clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem) / 1.25 ${C.titre};
    text-wrap: balance;
    color: ${C.nuit};
  }

  && p {
    margin: 10px 0 0;
    max-width: 58ch;
    line-height: 1.55;
    color: ${C.texteDoux};
  }

  form {
    margin-top: 18px;
    display: grid;
    gap: 12px;
    max-width: 640px;
  }
`;

const Ligne = styled.div`
  display: grid;
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr auto;
  }

  input {
    min-width: 0;
    height: 50px;
    padding: 0 20px;
    border: 1px solid ${C.filet};
    border-radius: 999px;
    background: #fff;
    font: 500 1.0625rem var(--f-texte, "Inter", "Segoe UI", sans-serif);
    color: ${C.nuit};
  }

  input:focus-visible {
    outline: 3px solid rgba(112, 83, 152, 0.55);
    outline-offset: 2px;
  }
`;

const Accord = styled.label`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  font-size: 1rem;
  line-height: 1.5;
  color: ${C.texteDoux};
  cursor: pointer;

  input {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    margin: 0;
    accent-color: ${C.violet};
  }

  a {
    color: ${C.violet};
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 28px;

  button {
    min-height: 44px;
    padding: 8px 0;
    border: 0;
    background: none;
    font: inherit;
    font-weight: 600;
    color: ${C.violet};
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;
  }
`;

// ── Textes ──────────────────────────────────────────────────────────────────

const RAISONS: Record<string, string> = {
  quota: "Le plafond de tests du jour est atteint. Le test revient demain ; d'ici là, Mickaël peut le faire à la main sur simple message.",
  "non-configure": "Le test en direct n'est pas disponible pour le moment.",
  timeout: "L'IA n'a pas répondu à temps sur cette question.",
  vide: "L'IA n'a rien répondu à cette question.",
};

function constat(c: Citation): string {
  if (c.type === "marque") {
    return c.source
      ? "Votre site figure parmi les sources de cette réponse : l'IA s'appuie sur vos propres pages pour parler de vous."
      : "Votre site ne figure pas parmi les sources de cette réponse : l'IA parle de vous d'après d'autres sites, ou sans source.";
  }
  if (c.source) return "Votre site figure parmi les sources de cette réponse.";
  if (c.domaineEcrit) return "L'adresse de votre site est écrite dans la réponse, sans figurer parmi ses sources.";
  if (c.nomEcrit) return "Le nom de votre entreprise est écrit dans la réponse, sans lien vers votre site.";
  return "Ni votre site ni le nom de votre entreprise n'apparaissent dans cette réponse.";
}

// Sur grand écran la réponse est ouverte d'office, une seule fois : le lecteur peut la replier.
function ouvrirSiLarge(el: HTMLDetailsElement | null) {
  if (!el || el.dataset.vu) return;
  el.dataset.vu = "1";
  if (window.matchMedia("(min-width: 1024px)").matches) el.open = true;
}

function verdict(c: Citation): string {
  if (c.type === "marque") return c.cite ? "Votre site est sa source" : "Votre site n'est pas sa source";
  return c.cite ? "Vous êtes cité" : "Vous n'êtes pas cité";
}

// ── Composant ───────────────────────────────────────────────────────────────

export default function AuditGeoScan({ formulaire }: { formulaire: string }) {
  const t = ui.fr.audit;
  const [etat, setEtat] = useState<"repos" | "cours" | "fini" | "erreur">("repos");
  const [erreur, setErreur] = useState<string | null>(null);
  const [origine, setOrigine] = useState<string | null>(null);
  const [citations, setCitations] = useState<Record<number, Citation>>({});
  const [enCours, setEnCours] = useState<number | null>(null);
  const [mesures, setMesures] = useState<Mesure[] | null>(null);
  const [envoi, setEnvoi] = useState<"repos" | "envoi" | "fait" | "erreur">("repos");
  const [copie, setCopie] = useState(false);
  const champs = useRef<{ site: string; nom: string; metier: string; zone: string } | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const entreeRef = useRef<HTMLHeadingElement>(null);
  const lancer = useRef<(e: Event) => void>(() => {});

  async function appel(corps: Record<string, string | number>) {
    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corps),
    });
    if (res.status === 422) throw new Error("cible");
    if (!res.ok) throw new Error("serveur");
    return res.json();
  }

  async function run(e: Event) {
    e.preventDefault();
    const form = formRef.current;
    if (!form || etat === "cours") return;
    const lu = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const propre = (v: string) => (v || "").replace(/\s+/g, " ").trim();
    const saisie = { site: propre(lu.site), nom: propre(lu.nom), metier: propre(lu.metier), zone: propre(lu.zone) };
    if (!saisie.site) return;
    setCitations({});
    setMesures(null);
    setOrigine(null);
    setEnvoi("repos");
    if (![saisie.nom, saisie.metier, saisie.zone].every((v) => CHAMP.test(v))) {
      setErreur("Nom, métier et zone : 2 à 60 caractères, avec des lettres, des chiffres, des espaces, des apostrophes et des traits d'union seulement.");
      setEtat("erreur");
      return;
    }
    champs.current = saisie;
    setErreur(null);
    setEtat("cours");
    gaEvent("test_geo_lance", { domaine: saisie.site });

    try {
      const premier = await appel({ phase: "origin", url: saisie.site });
      if (!premier.origin) {
        setErreur(t.errors.injoignable);
        setEtat("erreur");
        return;
      }
      const o: string = premier.origin;
      setOrigine(o);

      // Lisibilité par les IA : deux phases du scan, pendant que les questions partent.
      const lisibilite = (async () => {
        try {
          const r = await appel({ phase: "robots", origin: o });
          const p = await appel({ phase: "page", origin: o });
          const toutes: Mesure[] = [...(r.checks ?? []), ...(p.checks ?? [])];
          setMesures(toutes.filter((m) => m.bloc === "ia"));
        } catch {
          setMesures([]);
        }
      })();

      const recues: Citation[] = [];
      for (const n of ORDRE) {
        setEnCours(n);
        try {
          const r = await appel({ phase: "citations", origin: o, nom: saisie.nom, metier: saisie.metier, zone: saisie.zone, n });
          recues.push(r.citation);
          setCitations((avant) => ({ ...avant, [n]: r.citation }));
        } catch {
          const vide: Citation = { n, type: n === 3 ? "marque" : "recommandation", question: "", statut: "na", reason: "serveur" };
          recues.push(vide);
          setCitations((avant) => ({ ...avant, [n]: vide }));
        }
      }
      setEnCours(null);
      await lisibilite;
      const reco = recues.filter((c) => c.type === "recommandation" && c.statut === "ok");
      gaEvent("test_geo_termine", { domaine: o, cite: reco.filter((c) => c.cite).length, mesurees: reco.length });
      setEtat("fini");
    } catch (err) {
      setErreur(err instanceof Error && err.message === "cible" ? t.errors.cible : t.errors.serveur);
      setEtat("erreur");
      setEnCours(null);
    }
  }

  // Le formulaire appelle toujours la version à jour de `run` (elle lit l'état courant).
  useEffect(() => {
    lancer.current = run;
  });

  // La trame du résultat existe dès l'envoi : on y défile une fois qu'elle est rendue.
  useEffect(() => {
    if (etat !== "cours") return;
    entreeRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [etat]);

  // Formulaire de la page : écoute de l'envoi, et préremplissage si l'adresse porte les quatre
  // champs (lien partagé, ou envoi sans JavaScript). Jamais de lancement sans clic.
  useEffect(() => {
    const form = document.getElementById(formulaire) as HTMLFormElement | null;
    if (!form) return;
    formRef.current = form;
    const surEnvoi = (e: Event) => lancer.current(e);
    form.addEventListener("submit", surEnvoi);
    const q = new URLSearchParams(window.location.search);
    const noms = ["site", "nom", "metier", "zone"] as const;
    if (noms.every((n) => q.get(n))) {
      for (const n of noms) {
        const champ = form.querySelector<HTMLInputElement>(`input[name="${n}"]`);
        if (champ) champ.value = q.get(n) as string;
      }
    }
    return () => form.removeEventListener("submit", surEnvoi);
  }, [formulaire]);

  async function copierLien() {
    const s = champs.current;
    if (!s) return;
    try {
      const q = new URLSearchParams({ site: s.site, nom: s.nom, metier: s.metier, zone: s.zone });
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${q}`);
      setCopie(true);
      setTimeout(() => setCopie(false), 2500);
    } catch {
      /* presse-papiers refusé : rien à casser */
    }
  }

  function recommencer() {
    setEtat("repos");
    setCitations({});
    setMesures(null);
    setOrigine(null);
    setErreur(null);
    const premier = formRef.current?.querySelector<HTMLInputElement>('input[name="site"]');
    formRef.current?.scrollIntoView({ block: "center" });
    premier?.focus();
  }

  const liste = ORDRE.map((n) => citations[n]).filter(Boolean) as Citation[];
  const reco = liste.filter((c) => c.type === "recommandation" && c.statut === "ok");
  const cites = reco.filter((c) => c.cite).length;
  const marque = liste.find((c) => c.type === "marque" && c.statut === "ok");
  const pointsIa = (mesures ?? []).filter((m) => m.status !== "na");
  const modele = liste.find((c) => c.modele)?.modele;

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.botcheck) return; // pot de miel : un robot l'a rempli
    setEnvoi("envoi");
    const s = champs.current;
    const lignes = liste.map((c) =>
      c.statut === "ok"
        ? `Question ${c.n} (${c.type}) : ${c.cite ? "CITÉ" : "pas cité"} ; autres sites : ${(c.autres ?? []).join(", ") || "aucun"}\n${c.question}`
        : `Question ${c.n} : non mesurée (${c.reason})`
    );
    const ia = (mesures ?? []).map((m) => `${m.status.toUpperCase()} ${m.id}: ${t.checkDetail(m.id, m.data)}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email: data.email,
          subject: "Lead audit GEO : " + (origine ?? ""),
          from_name: "Outil audit GEO MKZ",
          message:
            `Site : ${origine}\nEntreprise : ${s?.nom}\nMétier : ${s?.metier}\nZone : ${s?.zone}\n` +
            `Consentement lecture + recontact : oui (case cochée)\n\n${lignes.join("\n\n")}\n\nLisibilité par les IA :\n${ia.join("\n") || "non mesurée"}`,
        }),
      });
      const r = await res.json();
      if (r.success) gaEvent("envoi_rapport", { domaine: origine ?? "", outil: "audit-geo" });
      setEnvoi(r.success ? "fait" : "erreur");
    } catch {
      setEnvoi("erreur");
    }
  }

  if (etat === "repos") return null;

  // Champ refusé ou site injoignable : le message seul, sans trame.
  if (etat === "erreur" && !origine) {
    return (
      <section className="section s-blanc audit-resultat" data-theme="clair">
        <div className="enveloppe">
          <Erreur role="alert">{typoFr(erreur ?? t.errors.serveur)}</Erreur>
        </div>
      </section>
    );
  }

  const phraseBilan =
    cites === 0
      ? "Votre entreprise n'apparaît dans aucune des réponses lues. Ce sont d'autres noms que l'IA donne à votre client."
      : cites === reco.length
        ? "Votre entreprise apparaît dans chaque réponse lue. L'IA vous donne quand on lui demande un nom."
        : "Votre entreprise apparaît dans une réponse sur deux. Selon la façon de poser la question, l'IA vous donne ou vous oublie.";

  return (
    <section className="section s-blanc audit-resultat" data-theme="clair">
      <div className="enveloppe">
        <Entree ref={entreeRef} data-bilan-geo>
          Ce que l’IA vient de répondre
        </Entree>
        {erreur && <Erreur role="alert">{typoFr(erreur)}</Erreur>}

        <Bilan aria-live="polite">
          <Carte ton="fort">
            <Sur>Deux demandes de recommandation</Sur>
            {reco.length > 0 ? (
              <>
                <Chiffre>
                  {cites} sur {reco.length}
                </Chiffre>
                <Phrase>{typoFr(phraseBilan)}</Phrase>
              </>
            ) : (
              <Phrase>{etat === "fini" ? "Aucune réponse lue sur ces deux questions." : "Questions posées, réponses en cours de lecture…"}</Phrase>
            )}
          </Carte>
          <Carte ton="doux">
            <Sur>Quand on lui parle de vous</Sur>
            {marque ? (
              <Phrase>
                <strong>{typoFr(marque.source ? "L'IA s'appuie sur votre site." : "L'IA ne s'appuie pas sur votre site.")}</strong>{" "}
                {typoFr(
                  marque.source
                    ? "Vos pages sont dans ses sources : ce que vous écrivez sur vous est ce qu'elle répète."
                    : "Elle parle de vous d'après d'autres sites, ou sans source : vous ne tenez pas la plume."
                )}
              </Phrase>
            ) : (
              <Phrase>{etat === "fini" ? "Question non mesurée." : "Troisième question à venir…"}</Phrase>
            )}
          </Carte>
        </Bilan>

        <Liste>
          {ORDRE.map((n) => {
            const c = citations[n];
            const libelle = n === 3 ? "Question 3 · sur votre entreprise" : `Question ${n} · recommandation`;
            if (!c) {
              return (
                <Question key={n} attente={etat === "cours"}>
                  <Entete>
                    <Numero>{libelle}</Numero>
                    <Pastille ton="attente">{enCours === n ? "Réponse en cours…" : "En attente"}</Pastille>
                  </Entete>
                </Question>
              );
            }
            if (c.statut !== "ok") {
              return (
                <Question key={n}>
                  <Entete>
                    <Numero>{libelle}</Numero>
                    <Pastille ton="attente">Non mesuré</Pastille>
                  </Entete>
                  {c.question && <Enonce>{typoFr(c.question)}</Enonce>}
                  <Constat>{typoFr(RAISONS[c.reason ?? ""] ?? "La question n'a pas pu être posée. Un nouvel essai dans une minute passe le plus souvent.")}</Constat>
                </Question>
              );
            }
            return (
              <Question key={n}>
                <Entete>
                  <Numero>{libelle}</Numero>
                  <Pastille ton={c.cite ? "oui" : "non"}>{typoFr(verdict(c))}</Pastille>
                </Entete>
                <Corps>
                <div>
                <Enonce>{typoFr(c.question)}</Enonce>
                <Constat>
                  {typoFr(constat(c))}
                  {c.autres && c.autres.length > 0 && (
                    <>
                      {" "}
                      <strong>{typoFr(c.type === "marque" ? "Autres sources :" : "Sites cités dans cette réponse :")}</strong> {c.autres.join(", ")}.
                    </>
                  )}
                </Constat>
                </div>
                <Reponse ref={ouvrirSiLarge}>
                  <summary>Lire la réponse de l’IA</summary>
                  <div>{c.reponse}</div>
                </Reponse>
                </Corps>
              </Question>
            );
          })}
        </Liste>

        <Note>
          {typoFr(
            "Une IA ne répond pas deux fois pareil : ce test est un relevé fait à l'instant, pas un classement. Les questions sont posées à un modèle d'OpenAI, l'éditeur de ChatGPT, avec la recherche web activée" +
              (modele ? ` (${modele})` : "") +
              " ; la réponse que vous obtenez dans l'application peut différer."
          )}
        </Note>

        <Titre>
          Votre site <Soude>est-il</Soude> {typoFr("lisible par les IA ?")}
        </Titre>
        <Lisibilite attente={mesures === null}>
          {mesures === null ? (
            <Note>Lecture du robots.txt, du fichier llms.txt et des données structurées…</Note>
          ) : mesures.length === 0 ? (
            <Note>{typoFr("La lisibilité n'a pas pu être mesurée sur ce test.")}</Note>
          ) : (
            <>
              <Mesures>
                {mesures.map((m) => (
                  <li key={m.id}>
                    <Pastille ton={m.status === "ok" ? "oui" : m.status === "na" ? "attente" : "non"}>{t.status[m.status]}</Pastille>
                    <span>
                      <strong>{t.checkLabels[m.id] ?? m.id}</strong>
                      <small>{typoFr(t.checkDetail(m.id, m.data)).replace(/,(?=\p{L})/gu, ", ")}</small>
                    </span>
                  </li>
                ))}
              </Mesures>
              {pointsIa.length > 0 && (
                <Note>
                  {pointsIa.reduce((s, m) => s + m.points, 0)} points sur {pointsIa.reduce((s, m) => s + m.max, 0)}, mesurés sur votre site à l’instant. Un robot bloqué, c’est une IA qui ne peut pas vous lire, donc pas vous citer. Le reste de la technique (HTTPS, balises, vraie page 404, liens entrants) se mesure dans l’<a href="/audit-seo/">audit SEO gratuit</a>.
                </Note>
              )}
            </>
          )}
        </Lisibilite>

        {etat === "fini" && (
          <Suite>
            <h3>{typoFr(envoi === "fait" ? "C'est noté." : "Trois questions, c'est un sondage. Voulez-vous la lecture de Mickaël ?")}</h3>
            {envoi === "fait" ? (
              <p>{typoFr("Mickaël relit vos trois réponses et vous écrit sous 24 h ouvrées : ce qui explique le résultat, et la première chose à corriger.")}</p>
            ) : (
              <>
                <p>{typoFr("Avec votre adresse, Mickaël relit vos trois réponses et vous écrit sous 24 h ouvrées ce qui explique le résultat, et la première chose à corriger. Gratuit.")}</p>
                <form onSubmit={envoyer}>
                  <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />
                  <Ligne>
                    <input type="email" name="email" required autoComplete="email" placeholder="vous@entreprise.fr" aria-label="Votre adresse e-mail" />
                    <button className="bouton bouton--plein" type="submit" disabled={envoi === "envoi"}>
                      {envoi === "envoi" ? "Envoi…" : "Recevoir la lecture"}
                    </button>
                  </Ligne>
                  <Accord>
                    <input type="checkbox" name="consentement" required />
                    <span>
                      {typoFr("J'accepte que MKZ utilise mon adresse et les réponses de ce test pour m'écrire à ce sujet. Détails et droits :")}{" "}
                      <a href="/politique-confidentialite/">politique de confidentialité</a>.
                    </span>
                  </Accord>
                  {envoi === "erreur" && <Erreur role="alert">{typoFr(t.emailBox.errorText)}</Erreur>}
                </form>
              </>
            )}
          </Suite>
        )}

        {etat === "fini" && (
          <Actions>
            <button type="button" onClick={recommencer}>
              Refaire un test
            </button>
            <button type="button" onClick={copierLien}>
              {copie ? "Lien copié" : "Copier le lien de ce test"}
            </button>
          </Actions>
        )}
      </div>
    </section>
  );
}
