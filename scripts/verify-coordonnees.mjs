// Verifie que les coordonnees legales sont lisibles par un crawler.
//
// Usage   : node scripts/verify-coordonnees.mjs https://mkz-consulting.fr
//           node scripts/verify-coordonnees.mjs --local out
// Runtime : Node 18+. Dependances : aucune.
//
// Un crawler basique n'execute PAS le JavaScript : on juge donc le HTML servi,
// pas le DOM apres hydratation. On extrait le texte comme le ferait un parseur
// (retrait des scripts, styles et commentaires, decodage des entites), puis on
// cherche chaque coordonnee obligatoire. On controle aussi le JSON-LD et sa
// coherence avec le texte visible.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const CIBLE = process.argv[2] ?? "https://mkz-consulting.fr";
const LOCAL = CIBLE === "--local";
const RACINE = LOCAL ? process.argv[3] : null;

const PAGES = [
  { url: "/mentions-legales/", type: "lcen" },
  { url: "/politique-confidentialite/", type: "rgpd" },
  { url: "/en/legal-notice/", type: "lcen" },
  { url: "/en/privacy-policy/", type: "rgpd" },
];
// Mentions exigees par type de page.
const REQUIS = {
  lcen: ["raison sociale","SIRET","RCS","adresse (rue)","adresse (CP + ville)","telephone","email","directeur de publication","hebergeur"],
  rgpd: ["raison sociale","SIRET","adresse (rue)","adresse (CP + ville)","email"],
};

// Coordonnees obligatoires (LCEN art. 6-III) et leur forme attendue.
// `motif` est volontairement tolerant sur les espaces : le HTML peut en
// inserer, et React peut fragmenter avec des commentaires.
const ATTENDU = [
  { cle: "raison sociale", motif: /\bMKZ\b/, obligatoire: true },
  { cle: "SIRET", motif: /983\s*662\s*784\s*00013/, obligatoire: true },
  { cle: "RCS", motif: /RCS[^.]{0,20}Meaux/i, obligatoire: true },
  { cle: "adresse (rue)", motif: /1\s*rue\s*Fran[çc]oise\s*Sagan/i, obligatoire: true },
  { cle: "adresse (CP + ville)", motif: /77230\s*Dammartin-en-Go[ëe]le/i, obligatoire: true },
  { cle: "telephone", motif: /(\+33\s*7|0\s*7)[\s.]*69[\s.]*09[\s.]*39[\s.]*09/, obligatoire: true },
  { cle: "email", motif: /contact@mkz-consulting\.fr/, obligatoire: true },
  { cle: "directeur de publication", motif: /Micka[ëe]l\s*Leclerc/i, obligatoire: true },
  { cle: "hebergeur", motif: /Cloudflare/i, obligatoire: true },
  { cle: "telephone hebergeur", motif: /\+1\s*650\s*319\s*8930/, obligatoire: false },
];

const ENTITES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'",
  "&nbsp;": " ", "&thinsp;": " ", "&ensp;": " ", "&emsp;": " ",
  "&eacute;": "é", "&egrave;": "è", "&ecirc;": "ê", "&euml;": "ë",
  "&agrave;": "à", "&acirc;": "â", "&ccedil;": "ç", "&ocirc;": "ô",
  "&icirc;": "î", "&iuml;": "ï", "&ugrave;": "ù", "&ucirc;": "û",
  "&Eacute;": "É", "&Agrave;": "À", "&Icirc;": "Î", "&rsquo;": "’",
  "&laquo;": "«", "&raquo;": "»", "&middot;": "·", "&copy;": "©",
};

function decode(s) {
  for (const [e, c] of Object.entries(ENTITES)) s = s.split(e).join(c);
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

/** Texte tel qu'un parseur HTML le verrait : sans script, style ni commentaire. */
function texteVisible(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, "")     // React fragmente avec des commentaires
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ");
}

function blocsJsonLd(html) {
  const out = [];
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try { out.push(JSON.parse(m[1])); } catch { out.push({ __invalide: true }); }
  }
  return out;
}

async function charger(chemin) {
  if (LOCAL) return readFileSync(join(RACINE, chemin, "index.html"), "utf8");
  const r = await fetch(CIBLE + chemin, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; verif-coordonnees/1.0)" },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}

// ── Autotest de la sonde ─────────────────────────────────────────────────────
// Un controle qui ne sait pas dire « absent » ne vaut rien.
function autotest() {
  const bon = '<p>SIRET : 983 662 784 00013</p><script>var x="983 662 784 00013"</script>';
  const mauvais = '<p>SIRET : indisponible</p><script>var x="983 662 784 00013"</script>';
  const motif = ATTENDU.find((a) => a.cle === "SIRET").motif;
  const okPresent = motif.test(texteVisible(bon));
  const okAbsent = !motif.test(texteVisible(mauvais)); // le script ne doit PAS compter
  const fragmente = texteVisible("<p>Tel : <!-- -->07 69 09 39 09</p>");
  const okFragment = /07[\s.]*69[\s.]*09[\s.]*39[\s.]*09/.test(fragmente);
  return { okPresent, okAbsent, okFragment, fiable: okPresent && okAbsent && okFragment };
}

// ── Execution ────────────────────────────────────────────────────────────────
const at = autotest();
console.log("Autotest de la sonde :");
console.log(`  detecte une donnee presente        : ${at.okPresent ? "oui" : "NON"}`);
console.log(`  ignore le contenu des <script>     : ${at.okAbsent ? "oui" : "NON"}`);
console.log(`  resiste a la fragmentation React   : ${at.okFragment ? "oui" : "NON"}`);
if (!at.fiable) { console.error("\nSonde non fiable, on s'arrete."); process.exit(2); }

console.log(`\nCible : ${LOCAL ? RACINE : CIBLE}\n`);

let erreurs = 0;
let avertissements = 0;

for (const { url: page, type } of PAGES) {
  let html;
  try { html = await charger(page); }
  catch (e) { console.error(`[ERREUR] ${page} : ${e.message}`); erreurs++; continue; }

  const texte = texteVisible(html);
  const manquants = [];
  const presents = [];

  for (const { cle, motif } of ATTENDU) {
    if (motif.test(texte)) presents.push(cle);
    else if (REQUIS[type].includes(cle)) manquants.push(cle);
  }

  // Obfuscation : l'email ne doit pas dependre du JavaScript
  const emailDansTexte = /contact@mkz-consulting\.fr/.test(texte);
  const emailDansMailto = /mailto:contact@mkz-consulting\.fr/.test(html);
  const telDansHref = /href="tel:/.test(html);
  // Scrape Shield de Cloudflare reecrit les mailto en __cf_email__ + script de
  // decodage. Rencontre le 30/07/2026 : invisible depuis le depot et depuis
  // *.pages.dev, la transformation n ayant lieu que sur la zone.
  const obfusqueParCloudflare = /__cf_email__|cdn-cgi\/l\/email-protection/.test(html);

  // Coherence avec le JSON-LD
  const blocs = blocsJsonLd(html);
  const plat = JSON.stringify(blocs);
  const jsonLdSiret = /983 662 784 00013/.test(plat);
  const jsonLdTel = /\+33769093909/.test(plat);
  const jsonLdAdresse = /Fran[çc]oise Sagan/.test(plat);
  const jsonLdInvalide = blocs.some((b) => b.__invalide);

  const statut = manquants.length ? "ERREUR" : "OK";
  if (manquants.length) erreurs++;
  console.log(`[${statut}] ${page}`);
  console.log(`   coordonnees trouvees dans le texte servi : ${presents.length}/${ATTENDU.length} (requis pour cette page : ${REQUIS[type].length})`);
  if (manquants.length) console.log(`   MANQUANTES : ${manquants.join(", ")}`);
  console.log(`   email en clair dans le texte : ${emailDansTexte ? "oui" : "NON"}` +
              ` · lien mailto : ${emailDansMailto ? "oui" : "non"}` +
              ` · lien tel : ${telDansHref ? "oui" : "non"}`);
  console.log(`   JSON-LD : ${blocs.length} bloc(s)` +
              ` · SIRET ${jsonLdSiret ? "oui" : "NON"}` +
              ` · telephone ${jsonLdTel ? "oui" : "NON"}` +
              ` · adresse ${jsonLdAdresse ? "oui" : "NON"}`);
  if (jsonLdInvalide) { console.log("   JSON-LD INVALIDE (ne reparse pas)"); erreurs++; }
  if (obfusqueParCloudflare) {
    console.log("   CAUSE : obfuscation e-mail Cloudflare active (Scrape Shield).");
    console.log("           Desactiver : PATCH /zones/{id}/settings/email_obfuscation value=off");
    erreurs++;
  } else if (!emailDansTexte) {
    console.log("   ATTENTION : email absent du texte brut (obfusque ?)");
    avertissements++;
  }
  console.log();
}

console.log(`Bilan : ${erreurs} erreur(s), ${avertissements} avertissement(s)`);
process.exit(erreurs ? 1 : 0);
