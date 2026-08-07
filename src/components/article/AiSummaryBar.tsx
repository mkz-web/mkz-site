"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { SITE, ui, type Locale } from "@/lib/i18n";

/**
 * Barre « Résumer avec l'IA » : cinq liens profonds qui ouvrent l'assistant du
 * visiteur avec une invite pré-remplie contenant l'URL canonique de la page.
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
}

// Ordre : les trois majeurs d'abord, puis Mistral et Gemini.
//
// État mesuré le 07/08/2026 : quatre patterns sur cinq vont au bout, invite
// intacte à l'arrivée (URL canonique, apostrophe, accents, deux-points).
// Deux passent sans compte, deux ont été mesurés dans un Chrome connecté.
// Claude reste le seul non bouclé, faute de session ouverte pour le vérifier.
const ASSISTANTS: Assistant[] = [
  // ⚠️ NON BOUCLÉ : /new?q= redirige vers /login?from=logout et `q` disparaît
  // de l'URL visible. Le pré-remplissage ne s'observe que connecté, et aucun
  // des deux navigateurs testés n'avait de session Claude. À revérifier.
  { name: "Claude", href: (q) => `https://claude.ai/new?q=${q}` },
  // ✅ MESURÉ (Chrome connecté) : invite envoyée, réponse produite. `hints`
  // arme bien la recherche : pill `__composer-pill` sur le composer, libellée
  // « Rechercher, cliquez pour supprimer ». Anonyme, c'est le mur de connexion,
  // dont le `next=` conserve l'invite entière.
  { name: "ChatGPT", href: (q) => `https://chatgpt.com/?hints=search&q=${q}` },
  // ✅ MESURÉ : réécrit vers /search/<uuid>, requête exécutée, SANS COMPTE.
  { name: "Perplexity", href: (q) => `https://www.perplexity.ai/search?q=${q}` },
  // ✅ MESURÉ : invite ENVOYÉE automatiquement, page ouverte et lue
  // (« Ouverture de la page »), le tout SANS COMPTE. Le meilleur des cinq.
  { name: "Mistral", href: (q) => `https://chat.mistral.ai/chat?q=${q}` },
  // ✅ MESURÉ (Chrome connecté) : « Conversation en Mode IA », Google ajoute
  // ses paramètres atvm/mstk/mtid et rend une réponse qui cite l'article. Un
  // navigateur automatisé, lui, tombe sur /sorry/index (anti-bot) : ce n'est
  // pas un défaut du pattern, ne pas conclure de là que le bouton est mort.
  // ⚠️ gemini.google.com/app?q= est MORT (composer vide) : jamais l'utiliser.
  { name: "Gemini", href: (q) => `https://www.google.com/search?udm=50&q=${q}` },
];

// Libellé sur sa propre ligne : dans la colonne d'article (680 px), les cinq
// puces tiennent alors sur UNE rangée, là où un libellé en ligne les cassait en
// 3 + 2 (mesuré à 1280 px). À 375 px, deux rangées de puces, sans débordement.
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
            rel="noopener nofollow"
            aria-label={t.chipAria(a.name)}
          >
            {a.name}
          </Chip>
        ))}
      </ChipRow>
    </Bar>
  );
}
