"use client";

// Outil d'audit SEO + IA : le composant interactif de /audit-seo/ et
// /en/seo-audit/. Enchaîne les 4 phases de la Pages Function /api/scan et
// affiche chaque mesure au fur et à mesure qu'elle arrive : la progression
// visible EST la démonstration (rien n'est estimé, tout vient d'être relevé).
//
// La capture d'email part par Web3Forms, le canal déjà en production pour le
// formulaire de contact : le lead (URL, score, défauts) arrive dans la boîte
// de Mickaël, qui prépare et envoie le rapport sous 24 h. Pas d'envoi
// automatique : choix du cadrage MVP (dossier Projet/Seo-referencement).

import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { ui, type Locale } from "@/lib/i18n";

const WEB3FORMS_KEY = "5f80cd7f-a0fb-484c-995c-a6a1a5534c34";

interface CheckResult {
  id: string;
  bloc: "technique" | "ia" | "autorite";
  status: "ok" | "warn" | "fail" | "na";
  points: number;
  max: number;
  data: Record<string, unknown>;
}

const PHASES = ["origin", "robots", "page", "notfound"] as const;

const COLORS = {
  ok: theme.colors.success,
  warn: theme.colors.ctaInk,
  fail: "#B42318",
  na: theme.colors.textSecondary,
} as const;

// ── Styles ──────────────────────────────────────────────────────────────────

const Wrap = styled.div`
  border: 1px solid ${theme.colors.borderInk};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`;

const InputRow = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

const UrlInput = styled.input`
  flex: 1;
  min-height: 52px;
  padding: 12px 16px;
  font-size: 16px;
  font-family: ${theme.fonts.mono};
  border: 1px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.accent}15;
  }
`;

const StartButton = styled.button`
  min-height: 52px;
  padding: 12px 28px;
  background: ${theme.colors.ctaInk};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${theme.colors.ctaHover};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PhaseLine = styled.p`
  margin-top: ${theme.spacing.md};
  font-family: ${theme.fonts.mono};
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

const ErrorLine = styled.p`
  margin-top: ${theme.spacing.md};
  padding: 12px 16px;
  border: 1px solid #b4231833;
  background: #b4231808;
  color: ${COLORS.fail};
  font-size: 14px;
`;

const ScorePanel = styled.div`
  margin-top: ${theme.spacing.xl};
  display: grid;
  gap: ${theme.spacing.lg};
  align-items: center;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: auto 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const ScoreBig = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: clamp(48px, 10vw, 72px);
  font-weight: 700;
  line-height: 1;
  color: ${theme.colors.accent};

  span {
    font-size: 0.4em;
    color: ${theme.colors.textSecondary};
    font-weight: 400;
  }
`;

const BlocBars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BlocRow = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr auto;
  gap: 12px;
  align-items: center;
  font-size: 14px;
`;

const Bar = styled.div`
  height: 10px;
  background: ${theme.colors.surfaceAlt};
  border: 1px solid ${theme.colors.border};
`;

const BarFill = styled("div", {
  shouldForwardProp: (p) => p !== "ratio" && p !== "tint",
})<{ ratio: number; tint: string }>`
  height: 100%;
  width: ${(p) => Math.round(p.ratio * 100)}%;
  background: ${(p) => p.tint};
`;

const Mono = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  color: ${theme.colors.textSecondary};
`;

const SectionTitle = styled.h3`
  margin-top: ${theme.spacing.xl};
  font-family: ${theme.fonts.display};
  font-size: 20px;
  color: ${theme.colors.text};
`;

const CheckList = styled.ul`
  margin-top: ${theme.spacing.md};
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const CheckItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 12px;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.border};
  font-size: 14px;

  &:last-of-type {
    border-bottom: none;
  }
`;

const StatusChip = styled("span", {
  shouldForwardProp: (p) => p !== "tint",
})<{ tint: string }>`
  align-self: start;
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(p) => p.tint};
  border: 1px solid ${(p) => p.tint}55;
  padding: 2px 8px;
  white-space: nowrap;
`;

const CheckLabel = styled.span`
  font-weight: 600;
`;

const CheckDetail = styled.span`
  display: block;
  color: ${theme.colors.textSecondary};
  margin-top: 2px;
`;

const SoonNote = styled.p`
  margin-top: ${theme.spacing.sm};
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  font-style: italic;
`;

const EmailBox = styled.div`
  margin-top: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.borderInk};
  background: ${theme.colors.surfaceAlt};
  padding: ${theme.spacing.lg};
`;

const EmailTitle = styled.h3`
  font-family: ${theme.fonts.display};
  font-size: 22px;
`;

const EmailText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

const EmailForm = styled.form`
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

const ConsentLabel = styled.label`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  cursor: pointer;

  input {
    margin-top: 2px;
    width: 18px;
    height: 18px;
    accent-color: ${theme.colors.accent};
    flex-shrink: 0;
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: underline;
  }
`;

const RescanButton = styled.button`
  margin-top: ${theme.spacing.lg};
  background: none;
  border: none;
  color: ${theme.colors.accent};
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  padding: 8px 0;
`;

// ── Composant ───────────────────────────────────────────────────────────────

export default function AuditScan({ locale = "fr" }: { locale?: Locale }) {
  const t = ui[locale].audit;
  const privacyHref = locale === "fr" ? "/politique-confidentialite/" : "/en/privacy-policy/";

  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [phase, setPhase] = useState<(typeof PHASES)[number] | null>(null);
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [origin, setOrigin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mailStatus, setMailStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const urlRef = useRef<HTMLInputElement>(null);

  async function callScan(body: Record<string, string>) {
    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 422) throw new Error("cible");
    if (!res.ok) throw new Error("serveur");
    return res.json();
  }

  async function run(e: React.FormEvent) {
    e.preventDefault();
    const url = urlRef.current?.value.trim();
    if (!url || status === "running") return;
    setStatus("running");
    setChecks([]);
    setOrigin(null);
    setError(null);
    setMailStatus("idle");

    try {
      setPhase("origin");
      const first = await callScan({ phase: "origin", url });
      setChecks(first.checks ?? []);
      if (!first.origin) {
        setError(t.errors.injoignable);
        setStatus(first.checks?.length ? "done" : "error");
        return;
      }
      setOrigin(first.origin);

      let all: CheckResult[] = first.checks ?? [];
      for (const p of PHASES.slice(1)) {
        setPhase(p);
        const r = await callScan({ phase: p, origin: first.origin });
        all = [...all, ...(r.checks ?? [])];
        setChecks(all);
      }
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error && err.message === "cible" ? t.errors.cible : t.errors.serveur
      );
      setStatus("error");
    } finally {
      setPhase(null);
    }
  }

  async function sendLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMailStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.botcheck) return; // pot de miel : un robot l'a rempli
    const issues = checks
      .filter((c) => c.status === "fail" || c.status === "warn")
      .map((c) => `${c.status.toUpperCase()} ${c.id}: ${t.checkDetail(c.id, c.data)}`)
      .join("\n");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email: data.email,
          subject: t.emailBox.mailSubjectPrefix + (origin ?? ""),
          from_name: "Outil audit MKZ",
          message:
            `Site scanné : ${origin}\nScore : ${points}/${maxMeasurable}\n` +
            `Consentement rapport + recontact : oui (case cochée)\n\n${issues || "Aucun défaut relevé."}`,
        }),
      });
      const result = await res.json();
      setMailStatus(result.success ? "success" : "error");
    } catch {
      setMailStatus("error");
    }
  }

  const measurable = checks.filter((c) => c.status !== "na");
  const points = measurable.reduce((s, c) => s + c.points, 0);
  const maxMeasurable = measurable.reduce((s, c) => s + c.max, 0);

  const blocStats = (bloc: CheckResult["bloc"]) => {
    const list = checks.filter((c) => c.bloc === bloc && c.status !== "na");
    const p = list.reduce((s, c) => s + c.points, 0);
    const m = list.reduce((s, c) => s + c.max, 0);
    return { p, m, ratio: m === 0 ? 0 : p / m };
  };

  const priorities = [...checks]
    .filter((c) => c.status === "fail" || c.status === "warn")
    .sort((a, b) => (a.status === b.status ? b.max - a.max : a.status === "fail" ? -1 : 1))
    .slice(0, 3);

  const tint = (r: number) => (r >= 0.8 ? COLORS.ok : r >= 0.5 ? COLORS.warn : COLORS.fail);
  const hasAutorite = checks.some((c) => c.bloc === "autorite");

  return (
    <Wrap>
      <InputRow onSubmit={run}>
        <label htmlFor="audit-url" style={{ position: "absolute", left: "-9999px" }}>
          {t.urlLabel}
        </label>
        <UrlInput
          id="audit-url"
          ref={urlRef}
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder={t.urlPlaceholder}
          required
        />
        <StartButton type="submit" disabled={status === "running"}>
          {t.start}
        </StartButton>
      </InputRow>

      {status === "running" && phase && <PhaseLine aria-live="polite">{t.phases[phase]}</PhaseLine>}
      {error && <ErrorLine role="alert">{error}</ErrorLine>}

      {checks.length > 0 && (
        <>
          {status === "done" && (
            <ScorePanel>
              <div>
                <Mono>{t.scoreTitle}</Mono>
                <ScoreBig>
                  {points}
                  <span>/{maxMeasurable}</span>
                </ScoreBig>
              </div>
              <BlocBars>
                {(["technique", "ia"] as const).map((b) => {
                  const s = blocStats(b);
                  return (
                    <BlocRow key={b}>
                      <span>{t.blocs[b]}</span>
                      <Bar>
                        <BarFill ratio={s.ratio} tint={tint(s.ratio)} />
                      </Bar>
                      <Mono>
                        {s.p}/{s.m}
                      </Mono>
                    </BlocRow>
                  );
                })}
                {hasAutorite && (
                  <BlocRow>
                    <span>{t.blocs.autorite}</span>
                    <Bar />
                    <Mono>{t.status.na}</Mono>
                  </BlocRow>
                )}
                <SoonNote>{t.scoreScale}</SoonNote>
              </BlocBars>
            </ScorePanel>
          )}

          {status === "done" && priorities.length > 0 && (
            <>
              <SectionTitle>{t.topTitle}</SectionTitle>
              <CheckList>
                {priorities.map((c) => (
                  <CheckItem key={c.id}>
                    <StatusChip tint={COLORS[c.status]}>{t.status[c.status]}</StatusChip>
                    <div>
                      <CheckLabel>{t.checkLabels[c.id] ?? c.id}</CheckLabel>
                      <CheckDetail>{t.checkDetail(c.id, c.data)}</CheckDetail>
                    </div>
                  </CheckItem>
                ))}
              </CheckList>
            </>
          )}

          <SectionTitle>{t.allTitle}</SectionTitle>
          <CheckList aria-live="polite">
            {checks
              .filter((c) => c.status !== "na")
              .map((c) => (
                <CheckItem key={c.id}>
                  <StatusChip tint={COLORS[c.status]}>{t.status[c.status]}</StatusChip>
                  <div>
                    <CheckLabel>{t.checkLabels[c.id] ?? c.id}</CheckLabel>{" "}
                    <Mono>
                      {c.points}/{c.max}
                    </Mono>
                    <CheckDetail>{t.checkDetail(c.id, c.data)}</CheckDetail>
                  </div>
                </CheckItem>
              ))}
          </CheckList>
          {hasAutorite && <SoonNote>{t.autoriteSoon}</SoonNote>}

          {status === "done" && (
            <EmailBox>
              <EmailTitle>{t.emailBox.title}</EmailTitle>
              {mailStatus === "success" ? (
                <>
                  <EmailText style={{ fontWeight: 600, color: theme.colors.success }}>
                    {t.emailBox.successTitle}
                  </EmailText>
                  <EmailText>{t.emailBox.successText}</EmailText>
                </>
              ) : (
                <>
                  <EmailText>{t.emailBox.text}</EmailText>
                  <EmailForm onSubmit={sendLead}>
                    <input
                      type="checkbox"
                      name="botcheck"
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ display: "none" }}
                    />
                    <EmailRow>
                      <label htmlFor="audit-email" style={{ position: "absolute", left: "-9999px" }}>
                        {t.emailBox.emailLabel}
                      </label>
                      <UrlInput
                        id="audit-email"
                        type="email"
                        name="email"
                        required
                        placeholder={t.emailBox.emailPlaceholder}
                        style={{ fontFamily: theme.fonts.sans }}
                      />
                      <StartButton type="submit" disabled={mailStatus === "sending"}>
                        {mailStatus === "sending" ? t.emailBox.sending : t.emailBox.submit}
                      </StartButton>
                    </EmailRow>
                    <ConsentLabel>
                      <input type="checkbox" name="consentement" required />
                      <span>
                        {t.emailBox.consentBefore}
                        <a href={privacyHref}>{t.emailBox.consentLink}</a>.
                      </span>
                    </ConsentLabel>
                    {mailStatus === "error" && <ErrorLine role="alert">{t.emailBox.errorText}</ErrorLine>}
                  </EmailForm>
                </>
              )}
            </EmailBox>
          )}

          {status === "done" && (
            <RescanButton
              type="button"
              onClick={() => {
                setStatus("idle");
                setChecks([]);
                setOrigin(null);
                setError(null);
                if (urlRef.current) {
                  urlRef.current.value = "";
                  urlRef.current.focus();
                }
              }}
            >
              {t.rescan}
            </RescanButton>
          )}
        </>
      )}
    </Wrap>
  );
}
