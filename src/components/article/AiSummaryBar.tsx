"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { SITE, ui, type Locale } from "@/lib/i18n";

/**
 * Barre « Résumer avec l'IA » : quatre liens profonds qui ouvrent l'assistant
 * du visiteur avec une invite pré-remplie contenant l'URL canonique de la page.
 *
 * Double rôle : service au lecteur pressé, et GEO. Chaque clic fait lire l'URL
 * par un moteur IA, avec citation à la clé : prolongement direct du déblocage
 * des crawlers IA (11/06/2026) et du contenu citable (TL;DR, llms-full.txt).
 *
 * Aucun de ces patterns n'est documenté par son éditeur : ce sont des
 * conventions observées, qui peuvent changer sans préavis. Un bouton qui ouvre
 * une page vierge trahit la promesse de la barre : re-mesurer en NAVIGATEUR
 * RÉEL (jamais en curl, bot-walls) avant chaque déploiement, et dès qu'un
 * bouton semble mort.
 *
 * La barre est du chrome, pas du contenu : elle ne passe ni par les blocs
 * d'article ni par articleToPlainText(), donc elle n'entre ni dans llms.txt ni
 * dans llms-full.txt. Liens utilitaires, donc nofollow.
 */

interface Assistant {
  name: string;
  /** Reçoit l'invite DÉJÀ encodée (encodeURIComponent). */
  href: (encodedPrompt: string) => string;
  /**
   * `rel` du lien. Par défaut « noopener nofollow », valeur sous laquelle
   * Claude, Perplexity et Mistral ont été mesurés verts : ne pas la changer
   * pour eux sans les remesurer. ChatGPT, lui, EXIGE `noreferrer` (voir son
   * commentaire ci-dessous).
   */
  rel?: string;
}

const REL_DEFAUT = "noopener nofollow";

// Ordre : les trois majeurs d'abord, puis Mistral.
//
// État au 07/08/2026 : les QUATRE patterns vont au bout, invite intacte à
// l'arrivée (URL canonique, apostrophe, accents, deux-points). Deux passent
// sans compte, deux ont été vérifiés depuis un navigateur connecté.
//
// Le Mode IA de Google (`google.com/search?udm=50&q=`) a été retiré le
// 07/08/2026 sur décision de Mickaël. Il était pourtant mesuré vert : si on
// veut le remettre, le pattern est là, et surtout PAS `gemini.google.com/app`,
// qui est mort (composer vide).
const ASSISTANTS: Assistant[] = [
  // ✅ VÉRIFIÉ par Mickaël depuis sa session : le composer est pré-rempli.
  // Sans session, /new?q= redirige vers /login et `q` disparaît de l'URL
  // visible : c'est le comportement normal, PAS un bouton mort.
  { name: "Claude", href: (q) => `https://claude.ai/new?q=${q}` },
  // ✅ MESURÉ (Chrome connecté, clic sur la vraie puce en prod) : invite
  // envoyée mot pour mot, ChatGPT ouvre l'URL de lui-même et répond
  // « J'ai lu l'article demandé ». DEUX conditions, toutes deux nécessaires,
  // isolées une à une après un « KO chez moi » de Mickaël le 07/08/2026 :
  //   1. `?q=` SEUL. Pas de `hints=search`, que recommandait le skill :
  //      ChatGPT le consomme, réécrit l'URL pour l'en retirer, et emporte `q`
  //      au passage.
  //   2. `noreferrer`. Avec un referrer tiers, ChatGPT REFUSE de soumettre :
  //      la page d'accueil s'ouvre, composer vide (reproduit 18 s puis 12 s,
  //      0 tour de conversation). Referrer vide, la même URL part aussitôt.
  //      C'est visiblement une garde anti-abus : sans elle, n'importe quel
  //      site posterait des invites dans le compte de son visiteur.
  // Symptôme à reconnaître : la page d'accueil au lieu du composer rempli.
  {
    name: "ChatGPT",
    href: (q) => `https://chatgpt.com/?q=${q}`,
    rel: "noopener noreferrer nofollow",
  },
  // ✅ MESURÉ : réécrit vers /search/<uuid>, requête exécutée, SANS COMPTE.
  { name: "Perplexity", href: (q) => `https://www.perplexity.ai/search?q=${q}` },
  // ✅ MESURÉ : invite ENVOYÉE automatiquement, page ouverte et lue
  // (« Ouverture de la page »), le tout SANS COMPTE. Le meilleur des quatre.
  { name: "Mistral", href: (q) => `https://chat.mistral.ai/chat?q=${q}` },
];

// Libellé sur sa propre ligne : dans la colonne d'article (680 px), les puces
// tiennent alors sur UNE rangée, là où un libellé en ligne les cassait
// (mesuré à 1280 px). À 375 px, deux rangées de puces, sans débordement.
const Bar = styled.div`
  margin-top: 24px;
  padding: 14px 18px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surfaceAlt};
`;

const Label = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  line-height: 1.5;
  color: ${theme.colors.text};
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  margin-top: 10px;
`;

const Chip = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.accent};
  font-size: 14.5px;
  font-weight: 600;
  transition: border-color 0.2s ${theme.easing}, color 0.2s ${theme.easing};

  &:hover {
    border-color: ${theme.colors.ctaInk};
    color: ${theme.colors.ctaInk};
  }
`;

export default function AiSummaryBar({
  path,
  locale = "fr",
}: {
  /** Chemin canonique de la page (ex. /conseils/seo/audit-seo/). */
  path: string;
  locale?: Locale;
}) {
  const t = ui[locale].article.aiBar;
  const encoded = encodeURIComponent(t.prompt(`${SITE}${path}`));

  return (
    <Bar role="group" aria-label={t.groupAria}>
      <Label>{t.label}</Label>
      <ChipRow>
        {ASSISTANTS.map((a) => (
          <Chip
            key={a.name}
            href={a.href(encoded)}
            target="_blank"
            rel={a.rel ?? REL_DEFAUT}
            aria-label={t.chipAria(a.name)}
          >
            {a.name}
          </Chip>
        ))}
      </ChipRow>
    </Bar>
  );
}
