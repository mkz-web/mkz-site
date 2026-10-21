"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { ui, type Locale } from "@/lib/i18n";
import { CONSENT_OPEN_EVENT, readConsent, writeConsent } from "@/lib/consent";

// Bandeau de consentement maison, zéro dépendance, bilingue (textes dans
// ui[locale].consent). Contrat cookie/événement : src/lib/consent.ts.
//
// Règles CNIL appliquées, et mesurables :
// - refuser est aussi simple qu'accepter : deux boutons de même taille, au
//   même rang, « Tout refuser » à gauche ;
// - aucune case pré-cochée : la mesure d'audience part décochée dans le
//   panneau « Personnaliser » ;
// - pas de mur de cookies : aria-modal="false", la page reste lisible et
//   cliquable, Échap referme sans rien enregistrer (la question revient à la
//   page suivante) ;
// - retrait aussi simple que l'octroi : « Gérer les cookies » en pied de page
//   rouvre le panneau avec le choix courant ;
// - preuve et durée : id + date dans le cookie, question reposée après 180 jours.
//
// Rendu UNIQUEMENT après montage : rien dans le HTML statique (les crawlers,
// llms.txt et les moteurs IA ne voient pas le bandeau), aucun désaccord
// d'hydratation, et position:fixed donc aucun décalage de mise en page.
// Pendant l'affichage, html[data-consent-open="1"] masque la bulle WhatsApp
// (règle dans GlobalStyles) qui, sinon, se superpose aux boutons sur mobile.
//
// Gabarit : barre en bas de l'écran sur mobile (le défaut hu-manity couvrait
// 548 px sur 812, soit 67 % de l'écran, mesuré le 21/08/2026), carte en bas à
// gauche à partir de 768 px. Invariant à mesurer après tout changement :
// hauteur du bandeau ≤ 40 % d'un viewport de 812 px à 375 px de large.

// Habillage de la nouvelle charte (22/10/2026) : polices, couleurs et boutons de la maquette codée
// du 20/10/2026 (variables posées sur html:has(.charte), valeurs de repli identiques). La maquette
// n'avait pas de bandeau ; géométrie et règles CNIL inchangées.
const C = {
  texte: "var(--texte, #202748)",
  doux: "var(--texte-doux, #4A4F66)",
  nuit: "var(--nuit, #202748)",
  violet: "var(--violet, #705398)",
  rose: "var(--rose-profond, #B4508C)",
  lavande: "var(--lavande-clair, #EEF0FF)",
  titre: 'var(--f-titre, "Montserrat", "Helvetica Neue", Arial, sans-serif)',
  corps: 'var(--f-texte, "Inter", "Segoe UI", sans-serif)',
  ombre: "var(--ombre-forte, 0 34px 60px -28px rgba(42, 64, 137, .55), 0 4px 14px rgba(32, 39, 72, .08))",
  filet: "rgba(32, 39, 72, .14)",
};

const Dialog = styled.section`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  background: #fff;
  color: ${C.texte};
  border-top: 1px solid ${C.filet};
  border-radius: 22px 22px 0 0;
  box-shadow: 0 -12px 40px -18px rgba(32, 39, 72, .35);
  padding: 14px 16px calc(14px + env(safe-area-inset-bottom, 0px));
  font-family: ${C.corps};
  font-size: 15px;
  line-height: 1.5;
  outline: none;

  @media (min-width: ${theme.breakpoints.md}) {
    left: 24px;
    right: auto;
    bottom: 24px;
    max-width: 440px;
    border: 1px solid ${C.filet};
    border-radius: 22px;
    box-shadow: ${C.ombre};
    padding: 22px 24px;
  }
`;

const Title = styled.p`
  font-family: ${C.titre};
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -.01em;
  color: ${C.nuit};
  margin: 0 0 6px;
`;

const Text = styled.p`
  margin: 0 0 12px;
  font-size: 14.5px;
  color: ${C.doux};

  a {
    color: ${C.violet};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 0 14px;
  padding: 12px 14px;
  border-radius: 16px;
  background: ${C.lavande};
`;

const Row = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
`;

const Check = styled.input`
  flex: none;
  width: 22px;
  height: 22px;
  margin: 2px 0 0;
  accent-color: ${C.violet};
  cursor: inherit;
`;

const RowText = styled.span`
  display: block;

  strong {
    display: block;
    font-weight: 600;
    color: ${C.nuit};
  }

  small {
    display: block;
    font-size: 13px;
    line-height: 1.45;
    color: ${C.doux};
  }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Btn = styled.button<{ primary?: boolean }>`
  min-height: 44px;
  padding: 10px 12px;
  font: 600 15px/1.2 ${C.corps};
  border-radius: 999px;
  border: 0;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, box-shadow .25s ease;
  ${({ primary }) =>
    primary
      ? `background: ${C.nuit}; color: #fff;
         &:hover { background-image: linear-gradient(100deg, ${C.violet}, ${C.rose}); }`
      : `background: transparent; color: ${C.nuit}; box-shadow: inset 0 0 0 1.5px rgba(32, 39, 72, .3);
         &:hover { background: ${C.nuit}; color: #fff; }`}
`;

const Customise = styled.button`
  grid-column: 1 / -1;
  min-height: 44px;
  padding: 8px;
  background: none;
  border: 0;
  font: 500 14px/1.3 ${C.corps};
  color: ${C.violet};
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;

  &:hover {
    color: ${C.nuit};
  }
`;

export default function ConsentBanner({ locale = "fr" }: { locale?: Locale }) {
  const t = ui[locale].consent;
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [audience, setAudience] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const onOpen = () => {
      setAudience(readConsent()?.audience === true);
      setPanel(true);
      setOpen(true);
    };
    document.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => document.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.dataset.consentOpen = "1";
    // preventScroll : sans lui, focus() fait défiler le document hôte quand la page
    // est rendue dans un cadre plus haut que l'écran (capture pleine page, iframe de
    // mesure) : toutes les tranches de capturer-page.js montraient le pied de page.
    ref.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.documentElement.dataset.consentOpen;
    };
  }, [open]);

  const decide = useCallback((value: boolean) => {
    writeConsent(value);
    setAudience(value);
    setPanel(false);
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <Dialog
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-labelledby="mkz-consent-title"
      aria-describedby="mkz-consent-text"
      tabIndex={-1}
      data-consent=""
    >
      <Title id="mkz-consent-title">{t.title}</Title>
      <Text id="mkz-consent-text">
        {t.text} <Link href={t.privacyHref}>{t.privacy}</Link>.
      </Text>

      {panel && (
        <Panel>
          <Row>
            <Check type="checkbox" checked disabled readOnly aria-label={t.necessaryLabel} />
            <RowText>
              <strong>{t.necessaryLabel}</strong>
              <small>{t.necessaryDesc}</small>
            </RowText>
          </Row>
          <Row>
            <Check
              type="checkbox"
              checked={audience}
              onChange={(e) => setAudience(e.target.checked)}
              aria-label={t.audienceLabel}
            />
            <RowText>
              <strong>{t.audienceLabel}</strong>
              <small>{t.audienceDesc}</small>
            </RowText>
          </Row>
        </Panel>
      )}

      <Actions>
        <Btn type="button" onClick={() => decide(false)}>
          {t.refuseAll}
        </Btn>
        {panel ? (
          <Btn type="button" primary onClick={() => decide(audience)}>
            {t.save}
          </Btn>
        ) : (
          <Btn type="button" primary onClick={() => decide(true)}>
            {t.acceptAll}
          </Btn>
        )}
        {!panel && (
          <Customise type="button" onClick={() => setPanel(true)} aria-expanded={false}>
            {t.customise}
          </Customise>
        )}
      </Actions>
    </Dialog>
  );
}
