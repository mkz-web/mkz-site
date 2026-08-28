#!/usr/bin/env node
/**
 * ga4-admin.mjs : administration GA4 par l'API Admin officielle, la partie que le
 * MCP analytics (Data API : rapports, temps reel) n'expose pas.
 *
 * Commandes (depuis la racine d'un projet, copie locale dans scripts/) :
 *   node scripts/ga4-admin.mjs proprietes
 *   node scripts/ga4-admin.mjs flux [--propriete=123456789]
 *   node scripts/ga4-admin.mjs cles [--propriete=...] [--creer=evt1,evt2,...]
 *   node scripts/ga4-admin.mjs mesure-avancee [--propriete=...] [--flux=...]
 *
 * Runtime minimal : Node >= 14 natif (https, fs, path, os). Dependances : aucune.
 *
 * Resolution des cibles : argument > variable d'environnement > .env du dossier
 * courant (cles GA4_PROPERTY et GA4_FLUX, numeros nus). Identifiants OAuth :
 * GA4_ADC > %USERPROFILE%\.gcp-keys\adc.json (le fichier du MCP analytics,
 * projet GCP ga4-mcp-mickael). Le script n'affiche JAMAIS un jeton ni un secret :
 * seuls le scope accorde et les statuts HTTP sortent a l'ecran.
 *
 * Ecriture en 403 « insufficient authentication scopes » : le jeton est en
 * analytics.readonly (etat mesure le 28/08/2026). Le regenerer avec le scope
 * d'edition (un ecran Google a valider, geste humain) :
 *   gcloud auth application-default login --scopes "https://www.googleapis.com/auth/analytics.edit,https://www.googleapis.com/auth/cloud-platform"
 * puis, APRES avoir garde une copie de l'ancien fichier (jamais remplacer une
 * cle sans copie, regle maison), en PowerShell (jamais %VAR%, c'est du cmd) :
 *   Copy-Item "$env:APPDATA\gcloud\application_default_credentials.json" "$env:USERPROFILE\.gcp-keys\adc.json" -Force
 */

import https from "https";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

// ---------------------------------------------------------------- arguments
const argv = process.argv.slice(2);
const action = argv.find((a) => !a.startsWith("--")) || "";
const opt = (nom) => {
  const t = argv.find((a) => a.startsWith("--" + nom + "="));
  return t ? t.slice(nom.length + 3) : null;
};

function lireEnv() {
  const chemin = join(process.cwd(), ".env");
  const valeurs = {};
  if (!existsSync(chemin)) return valeurs;
  for (const ligne of readFileSync(chemin, "utf8").split(/\r?\n/)) {
    const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) valeurs[m[1]] = m[2];
  }
  return valeurs;
}
const env = lireEnv();
const PROPRIETE = opt("propriete") || process.env.GA4_PROPERTY || env.GA4_PROPERTY || null;
const FLUX = opt("flux") || process.env.GA4_FLUX || env.GA4_FLUX || null;
const ADC = process.env.GA4_ADC || join(homedir(), ".gcp-keys", "adc.json");

// ---------------------------------------------------------------- HTTP + OAuth
function requete(url, methode, entetes, corps) {
  return new Promise((resoudre, rejeter) => {
    const u = new URL(url);
    const req = https.request(
      { hostname: u.hostname, path: u.pathname + u.search, method: methode, headers: entetes },
      (res) => {
        let texte = "";
        res.on("data", (c) => (texte += c));
        res.on("end", () => {
          let json = null;
          try { json = JSON.parse(texte); } catch { /* reponse non JSON */ }
          resoudre({ statut: res.statusCode, json, texte });
        });
      }
    );
    req.on("error", rejeter);
    if (corps) req.write(corps);
    req.end();
  });
}

async function jeton() {
  const j = JSON.parse(readFileSync(ADC, "utf8"));
  if (j.type !== "authorized_user") {
    throw new Error(`adc.json de type « ${j.type} » : ce script attend un authorized_user`);
  }
  const corps = new URLSearchParams({
    client_id: j.client_id,
    client_secret: j.client_secret,
    refresh_token: j.refresh_token,
    grant_type: "refresh_token",
  }).toString();
  const r = await requete("https://oauth2.googleapis.com/token", "POST",
    { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(corps) }, corps);
  if (!r.json || !r.json.access_token) {
    throw new Error(`echec de generation du jeton (${r.statut}) : ${r.json ? r.json.error + " " + (r.json.error_description || "") : r.texte.slice(0, 200)}`);
  }
  return { acces: r.json.access_token, scope: r.json.scope || "(scope non renvoye)" };
}

function admin(acces, methode, chemin, objet) {
  const corps = objet ? JSON.stringify(objet) : null;
  const entetes = { Authorization: `Bearer ${acces}` };
  if (corps) {
    entetes["Content-Type"] = "application/json";
    entetes["Content-Length"] = Buffer.byteLength(corps);
  }
  return requete(`https://analyticsadmin.googleapis.com/${chemin}`, methode, entetes, corps);
}

function erreurLisible(r) {
  const e = r.json && r.json.error;
  return e ? `${r.statut} ${e.status || ""} : ${(e.message || "").slice(0, 160)}` : `${r.statut} : ${r.texte.slice(0, 160)}`;
}

function exigerPropriete() {
  if (!PROPRIETE) {
    console.log("Propriete GA4 inconnue : passer --propriete=NUM, ou poser GA4_PROPERTY dans le .env du projet.");
    console.log("Pour lister les proprietes accessibles : node scripts/ga4-admin.mjs proprietes");
    process.exit(1);
  }
}

// ---------------------------------------------------------------- actions
const { acces, scope } = await jeton();
console.log(`Jeton genere depuis ${ADC}`);
console.log(`Scope accorde : ${scope}\n`);

let echec = false;

if (action === "proprietes") {
  const r = await admin(acces, "GET", "v1beta/accountSummaries?pageSize=200");
  if (r.statut !== 200) { console.log(`[ECHEC]   ${erreurLisible(r)}`); echec = true; }
  else {
    for (const compte of r.json.accountSummaries || []) {
      console.log(`Compte ${compte.account.replace("accounts/", "")} : ${compte.displayName}`);
      for (const p of compte.propertySummaries || []) {
        console.log(`  propriete ${p.property.replace("properties/", "")} : ${p.displayName}`);
      }
    }
  }
} else if (action === "flux") {
  exigerPropriete();
  const r = await admin(acces, "GET", `v1beta/properties/${PROPRIETE}/dataStreams`);
  if (r.statut !== 200) { console.log(`[ECHEC]   ${erreurLisible(r)}`); echec = true; }
  else {
    for (const f of r.json.dataStreams || []) {
      const mid = f.webStreamData ? ` · ${f.webStreamData.measurementId} · ${f.webStreamData.defaultUri || ""}` : "";
      console.log(`flux ${f.name.split("/").pop()} : ${f.type}${mid} : ${f.displayName}`);
    }
  }
} else if (action === "cles") {
  exigerPropriete();
  const liste = await admin(acces, "GET", `v1beta/properties/${PROPRIETE}/keyEvents`);
  if (liste.statut !== 200) { console.log(`[ECHEC]   lecture : ${erreurLisible(liste)}`); echec = true; }
  else {
    const existants = (liste.json.keyEvents || []).map((k) => k.eventName);
    console.log(`Evenements cles existants (${existants.length}) : ${existants.join(", ") || "aucun"}`);
    const aCreer = (opt("creer") || "").split(",").map((s) => s.trim()).filter(Boolean);
    for (const nom of aCreer) {
      if (existants.includes(nom)) { console.log(`[OK]      ${nom} : deja evenement cle`); continue; }
      const r = await admin(acces, "POST", `v1beta/properties/${PROPRIETE}/keyEvents`, {
        eventName: nom,
        countingMethod: "ONCE_PER_EVENT",
      });
      if (r.statut === 200) console.log(`[CREE]    ${nom} : marque evenement cle`);
      else { console.log(`[ECHEC]   ${nom} : ${erreurLisible(r)}`); echec = true; }
    }
    if (!aCreer.length) console.log("(lecture seule : passer --creer=evt1,evt2 pour en marquer)");
  }
} else if (action === "mesure-avancee") {
  exigerPropriete();
  if (!FLUX) {
    console.log("Flux inconnu : passer --flux=NUM ou poser GA4_FLUX dans le .env.");
    console.log(`Pour lister les flux : node scripts/ga4-admin.mjs flux --propriete=${PROPRIETE}`);
    process.exit(1);
  }
  // enhancedMeasurementSettings n'existe qu'en v1alpha de l'API Admin.
  const r = await admin(acces, "GET", `v1alpha/properties/${PROPRIETE}/dataStreams/${FLUX}/enhancedMeasurementSettings`);
  if (r.statut !== 200) { console.log(`[ECHEC]   ${erreurLisible(r)}`); echec = true; }
  else {
    const m = r.json;
    console.log("Mesure avancee du flux :");
    console.log(`  activee globalement    : ${m.streamEnabled}`);
    console.log(`  defilements            : ${m.scrollsEnabled}`);
    console.log(`  clics sortants         : ${m.outboundClicksEnabled}`);
    console.log(`  recherche sur site     : ${m.siteSearchEnabled}`);
    console.log(`  interactions formulaire: ${m.formInteractionsEnabled}`);
    console.log(`  engagement video       : ${m.videoEngagementEnabled}`);
    console.log(`  telechargements        : ${m.fileDownloadsEnabled}`);
  }
} else {
  console.log("Action inconnue. Commandes : proprietes | flux | cles [--creer=...] | mesure-avancee");
  echec = true;
}

process.exit(echec ? 1 : 0);
