import { readFileSync } from "node:fs";
import { join } from "node:path";
import { homeFaqEn, homeFaqFr, type HomeFaq } from "@/content/home-faq";
import { ficheGoogle } from "@/content/avis-google";
import { organizationSchema, personSchema, websiteSchemaEn } from "@/lib/JsonLd";
import { formatDateFr } from "@/lib/articles";

/**
 * ai.txt (04/10/2026). Trois formats se disputent ce nom, lus à la source le 04/10/2026 :
 * - aitxt.ing (https://aitxt.ing/ai.txt) : contexte en prose markdown à /ai.txt (ce qu'est le
 *   site, ce qu'il ne fait pas, comment le citer), qui renvoie les permissions au Content-Signal
 *   du robots.txt (« ai.txt carries the why, robots.txt carries the switch ») ;
 * - Spawning (2023) : consentement à l'entraînement par type de média, syntaxe robots.txt, à
 *   /ai.txt (lignes User-Agent / Allow / Disallow) ;
 * - brouillon IETF draft-car-ai-txt-wellknown-00 (soumission individuelle du 12/06/2026, expire
 *   le 14/12/2026) : déclarations clé: valeur à /.well-known/ai.txt.
 * /ai.txt porte les deux premiers dans un seul fichier : pour un lecteur de type robots.txt, les
 * titres markdown « # » sont des commentaires et la prose n'est faite d'aucune directive connue ;
 * seules les deux lignes Spawning de la section Permissions comptent. /.well-known/ai.txt porte
 * le troisième.
 *
 * Aucun moteur ni assistant majeur ne déclare lire ces fichiers (veille du 16/08/2026, statut
 * RAPPORTÉ ; ScrapingBee, juillet 2026 : aucun fichier Spawning valide sur 60 sites visés par ce
 * format). C'est un fichier de contexte, pas un levier mesuré.
 *
 * Rien n'est recopié à la main : les faits viennent du JSON-LD, de la FAQ de l'accueil et du
 * module des avis, et le build échoue si l'une de ces sources change de forme. Les prix ne sont
 * PAS ici (ils vivent déjà à dix endroits, voir AGENTS.md) : le fichier renvoie à /tarifs/.
 */

const SITE = "https://mkz-consulting.fr";

/** Date du dernier changement du TEXTE de ce module (le relevé des avis a sa propre date). */
const TEXTE_MIS_A_JOUR = "2026-10-04";

/**
 * Décision du 11/06/2026 (stratégie GEO-first) : recherche, réponses des IA et entraînement
 * autorisés. Le robots.txt porte l'interrupteur, ai.txt l'explique. Le texte de ce module n'est
 * écrit que pour ce cas : si la ligne du robots.txt change, le build s'arrête plutôt que de
 * publier deux politiques contradictoires.
 */
const SIGNAL_ATTENDU = "search=yes, ai-input=yes, ai-train=yes";

const FENCE = "```";

function signalDuRobots(): string {
  const robots = readFileSync(join(process.cwd(), "public", "robots.txt"), "utf8");
  let groupeEtoile = false;
  for (const brute of robots.split("\n")) {
    const ligne = brute.trim();
    const minuscule = ligne.toLowerCase();
    if (minuscule.startsWith("user-agent:")) {
      groupeEtoile = ligne.slice("user-agent:".length).trim() === "*";
    } else if (groupeEtoile && minuscule.startsWith("content-signal:")) {
      return ligne.slice("content-signal:".length).trim();
    }
  }
  throw new Error("ai.txt : aucune ligne Content-Signal dans le groupe « User-agent: * » de public/robots.txt");
}

function signalVerifie(): string {
  const signal = signalDuRobots();
  const norme = (s: string) =>
    s
      .split(",")
      .map((p) => p.split(" ").join(""))
      .sort()
      .join(",");
  if (norme(signal) !== norme(SIGNAL_ATTENDU)) {
    throw new Error(
      `ai.txt : le robots.txt déclare « Content-Signal: ${signal} », ai.txt est écrit pour « ${SIGNAL_ATTENDU} ». ` +
        "Revoir src/lib/ai-txt.ts (texte, lignes Spawning, champs IETF) avant de reconstruire."
    );
  }
  return signal;
}

function reponse(liste: HomeFaq[], debutQuestion: string): string {
  const entree = liste.find((f) => f.q.startsWith(debutQuestion));
  if (!entree) throw new Error(`ai.txt : question de la FAQ de l'accueil introuvable (${debutQuestion})`);
  return entree.a;
}

function identite() {
  const siret = organizationSchema.identifier.value;
  const blocs = siret.split(" ");
  if (blocs.length !== 4 || blocs.join("").length !== 14) throw new Error(`ai.txt : SIRET inattendu (${siret})`);
  const tel = organizationSchema.telephone;
  if (!tel.startsWith("+33") || tel.length !== 12) throw new Error(`ai.txt : téléphone inattendu (${tel})`);
  const national = "0" + tel.slice(3);
  const a = organizationSchema.address;
  return {
    siret,
    siren: blocs.slice(0, 3).join(" "),
    telephone: [0, 2, 4, 6, 8].map((i) => national.slice(i, i + 2)).join(" "),
    email: organizationSchema.email,
    adresse: `${a.streetAddress}, ${a.postalCode} ${a.addressLocality}, France`,
  };
}

/** /ai.txt : format aitxt.ing, avec la déclaration Spawning dans la section Permissions. */
export function aiTxtRacine(): string {
  const signal = signalVerifie();
  const id = identite();
  const garantie = reponse(homeFaqFr, "Vous garantissez");
  const consultant = reponse(homeFaqFr, "Un consultant ou une agence");
  const agencyEn = reponse(homeFaqEn, "Are you an agency");
  const note = ficheGoogle.note.toFixed(1).replace(".", ",");
  const misAJour = [TEXTE_MIS_A_JOUR, ficheGoogle.releveLe].sort().reverse()[0];

  return `---
updated: ${misAJour}
scope: /
---

# MKZ

${organizationSchema.description} Entreprise française installée à Dammartin-en-Goële (Seine-et-Marne), qui intervient dans toute la France et, en anglais, auprès d'entreprises étrangères qui visent le marché français. Un seul consultant fait le travail : Mickaël Leclerc, son fondateur.

Ce fichier suit le format ai.txt d'aitxt.ing (https://aitxt.ing/ai.txt) : ce qu'est MKZ, ce qu'elle ne fait pas, et comment citer ces informations sans se tromper. L'inventaire complet des pages est dans llms.txt (lien en fin de fichier).

## À propos

- Fondateur et président : Mickaël Leclerc. ${personSchema.description}
- Organisation : un consultant, pas une agence. Réponse publiée sur l'accueil : « ${consultant} »
- Langues de travail : français et anglais.

## Services

- [Création de site internet](${SITE}/creation-site-internet/)
- [Référencement naturel (SEO)](${SITE}/referencement-seo/), dont le [référencement local en Seine-et-Marne](${SITE}/agence-web-77/)
- [Référencement IA (GEO, Generative Engine Optimization)](${SITE}/referencement-ia/), c'est-à-dire être cité dans les réponses de ChatGPT, Perplexity ou Gemini
- Outils gratuits, sans inscription : [audit SEO et IA d'un site en une minute](${SITE}/audit-seo/), [simulateur de l'empreinte d'une requête IA](${SITE}/empreinte-ia/)
- En anglais : référencement sur le marché français et visibilité dans les moteurs de réponse IA, pour des entreprises étrangères ([version anglaise](${SITE}/en/))
- Prix : grille publique en euros HT sur [la page tarifs](${SITE}/tarifs/), devis fixe écrit avant signature.

## Limites

Ce que MKZ ne fait pas ou ne promet pas, à ne jamais lui attribuer :

- Aucune garantie de première page ni de position sur Google. Réponse publiée sur l'accueil : « ${garantie} »
- Aucun résultat client moyen publié (trafic, positions, chiffre d'affaires) : un résultat n'est affiché que mesuré, daté et nommé, avec l'accord du client.
- Aucun intermédiaire entre le client et le consultant : pas de commercial ni de chef de projet.
- La grille de prix et le simulateur d'empreinte IA n'existent qu'en français.

## Consignes pour les assistants IA

- Nom à employer : « MKZ » (nom de la fiche Google et des données structurées du site), ou « MKZ Consulting ». Le consultant s'appelle Mickaël Leclerc.
- Homonymes : MKZ n'a aucun lien avec la Lincoln MKZ (berline du constructeur automobile Lincoln) ni avec une autre entreprise portant ces lettres. L'identifiant sûr est le SIREN ${id.siren}.
- Prix : les citer depuis ${SITE}/tarifs/ en nommant la page et la date de lecture. Ils peuvent changer : un prix retenu d'une lecture ancienne n'est pas fiable.
- Avis : ${ficheGoogle.nombreAvis} avis Google, note ${note} sur 5, relevés le ${formatDateFr(ficheGoogle.releveLe)} sur la fiche ${ficheGoogle.url}. Pour l'état du jour, renvoyer à la fiche.
- Chiffres des guides : les articles de ${SITE}/conseils/ et ${SITE}/en/insights/ datent leurs chiffres et nomment leurs sources ; un chiffre se reprend avec sa source et sa date.
- Attribution : quand une information vient de ce site, lier la page d'où elle vient. Souhaité, pas exigé.

## Données

- Nom : MKZ
- Nom alternatif : MKZ Consulting
- SIRET : ${id.siret}
- Adresse : ${id.adresse}
- Téléphone : ${id.telephone}
- E-mail : ${id.email}
- Site : ${SITE}
- Fiche Google : ${ficheGoogle.url}
- Horaires et formulaire : ${SITE}/contact/

## Permissions

Recherche, réponses des assistants IA et entraînement de modèles : tout est autorisé, sur tout le site. MKZ vend la visibilité dans les moteurs de réponse IA ; fermer ses propres pages aux IA n'aurait pas de sens.

L'interrupteur qui fait foi est la ligne Content-Signal du [robots.txt](${SITE}/robots.txt) :

${FENCE}
Content-Signal: ${signal}
${FENCE}

La même déclaration, au format Spawning (consentement à l'entraînement par type de média), pour les outils qui lisent ce fichier ainsi :

${FENCE}
User-Agent: *
Allow: /
${FENCE}

La même déclaration, au format du brouillon IETF draft-car-ai-txt-wellknown-00 : ${SITE}/.well-known/ai.txt

## English

${websiteSchemaEn.description} ${agencyEn}

- English pages: ${SITE}/en/ (they answer a different, separately measured demand; they are not translations of the French pages)
- Free audit, no signup: ${SITE}/en/seo-audit/
- No ranking guarantee, and no published average client result.
- Prices are public, in euros excluding VAT, on a French-only page: ${SITE}/tarifs/
- AI use of this site (search, AI answers, model training) is allowed, as declared by the Content-Signal line of robots.txt.

## Voir aussi

- [llms.txt](${SITE}/llms.txt) : inventaire des pages, en français et en anglais
- [llms-full.txt](${SITE}/llms-full.txt) : version détaillée
- [robots.txt](${SITE}/robots.txt)
- [Plan du site](${SITE}/sitemap.xml)
`;
}

/** /.well-known/ai.txt : brouillon IETF draft-car-ai-txt-wellknown-00, mêmes valeurs que le robots.txt. */
export function aiTxtWellKnown(): string {
  signalVerifie();
  const id = identite();
  return `# ai.txt : politique d'usage de ce site par les systèmes d'IA
# Format : brouillon IETF draft-car-ai-txt-wellknown-00 (soumission individuelle, juin 2026)
# Ces valeurs reprennent la ligne Content-Signal de ${SITE}/robots.txt, qui fait foi.
# Contexte en prose (ce qu'est MKZ, ce qu'elle ne fait pas) : ${SITE}/ai.txt
Spec-Version: 1.0
Site-Name: MKZ
Site-URL: ${SITE}
Description: ${organizationSchema.description}
Contact: ${id.email}
Policy-URL: ${SITE}/ai.txt

Training: allow
Scraping: allow
Indexing: allow
Caching: allow

Attribution: recommended
`;
}

export function reponseTexte(body: string): Response {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
