#!/usr/bin/env node
/*
 * Générateur de la plaquette tarifaire MKZ 2026 (DOCX).
 * Tarifs par type de site + prestations SEO + référencement IA (GEO),
 * avec repères de marché 2026 sourcés et datés.
 *
 * Exécution : node _tarifs/_build/generate-plaquette-tarifs-standalone.js
 * Runtime minimal : Node >= 14 (modules natifs fs, path, zlib uniquement).
 * Dépendances : aucune. DOCX assemblé à la main (XML + ZIP).
 *
 * Sortie : _tarifs/Plaquette-Tarifs-MKZ-2026.docx
 *
 * Sources marché citées dans le document (relevées le 18/08/2026) :
 *  - Grille France Num / Afnic, guide mis à jour en juin 2025 (déjà citée sur mkz-consulting.fr).
 *  - seo.fr, juin 2026 : prestation SEO mensuelle 500 à 2 500 € (déjà citée sur le pilier /referencement-seo/).
 *  - Relevés web du 18/08/2026 : fenxi.fr, ipaoo.fr, lafabriquedunet.fr (683 budgets réels),
 *    premiere.page, referenseo.com, deux.io, komunike.fr, extern-market.com, octolinks.fr,
 *    newp.fr, clickdev.fr, devwp.fr, vigeon.fr, wecomm.fr, iaba.tech.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/* ============================== CONSTANTES ============================== */

const EMETTEUR = {
  nom: 'MKZ',
  forme: 'SAS à associé unique',
  titre: 'Création de sites internet · Référencement SEO · Référencement IA',
  adresse1: '1 rue Françoise Sagan',
  adresse2: '77230 Dammartin-en-Goële',
  siret: '983 662 784 00013',
  rcs: 'RCS Meaux',
  email: 'contact@mkz-consulting.fr',
  tel: '07 69 09 39 09',
  site: 'mkz-consulting.fr'
};

const VALIDITE = '31 décembre 2026';
const FICHIER = 'Plaquette-Tarifs-MKZ-2026.docx';

const NAVY = '003764';        // navy MKZ (theme.ts)
const NAVY_CLAIR = '0B5394';
const GRIS_CADRE = 'F2F2F2';
const GRIS_BORD = 'BFBFBF';
const NBSP = String.fromCharCode(160);

/* ============================ OUTILS TEXTE / XML ============================ */

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Typographie française : espaces insécables avant : ; % € » et après «.
function typo(s) {
  return String(s)
    .split(' :').join(NBSP + ':').split(' ;').join(NBSP + ';')
    .split(' %').join(NBSP + '%').split(' €').join(NBSP + '€')
    .split('« ').join('«' + NBSP).split(' »').join(NBSP + '»');
}
function runXml(text, o) {
  o = o || {};
  let rpr = '<w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>';
  if (o.b) rpr += '<w:b/>';
  if (o.i) rpr += '<w:i/>';
  rpr += '<w:sz w:val="' + (o.sz || 21) + '"/><w:szCs w:val="' + (o.sz || 21) + '"/>';
  if (o.color) rpr += '<w:color w:val="' + o.color + '"/>';
  rpr += '</w:rPr>';
  return '<w:r>' + rpr + '<w:t xml:space="preserve">' + esc(typo(text)) + '</w:t></w:r>';
}
// **gras** dans les chaînes.
function rich(text, o) {
  o = o || {};
  return String(text).split('**').map(function (t, i) {
    return t ? runXml(t, i % 2 ? Object.assign({}, o, { b: true }) : o) : '';
  }).join('');
}
function p(content, o) {
  o = o || {};
  let ppr = '<w:pPr>';
  ppr += '<w:spacing w:before="' + (o.before || 0) + '" w:after="' + (o.after === undefined ? 120 : o.after) + '" w:line="' + (o.line || 264) + '" w:lineRule="auto"/>';
  if (o.jc) ppr += '<w:jc w:val="' + o.jc + '"/>';
  if (o.ind) ppr += '<w:ind w:left="' + (o.ind.left || 0) + '" w:hanging="' + (o.ind.hanging || 0) + '"/>';
  if (o.keepNext) ppr += '<w:keepNext/>';
  ppr += '</w:pPr>';
  const inner = Array.isArray(content) ? content.join('') : rich(content, o.r || {});
  return '<w:p>' + ppr + inner + '</w:p>';
}
function h1(text) { return p(text, { r: { b: true, sz: 30, color: NAVY }, before: 260, after: 120, keepNext: true }); }
function h2(text) { return p(text, { r: { b: true, sz: 24, color: NAVY_CLAIR }, before: 200, after: 90, keepNext: true }); }
function bullet(text) {
  return p([runXml('•  ')].concat([rich(text)]), { ind: { left: 340, hanging: 227 }, after: 60 });
}
function note(text) { return p(text, { r: { i: true, sz: 18, color: '595959' }, after: 100 }); }
function cell(paras, o) {
  o = o || {};
  let tcpr = '<w:tcPr><w:tcW w:w="' + (o.w || 0) + '" w:type="dxa"/>';
  if (o.shd) tcpr += '<w:shd w:val="clear" w:color="auto" w:fill="' + o.shd + '"/>';
  tcpr += '<w:vAlign w:val="center"/></w:tcPr>';
  return '<w:tc>' + tcpr + paras.join('') + '</w:tc>';
}
function tbl(widths, rowsXml, o) {
  o = o || {};
  const borders = o.borders === false ? '' :
    '<w:tblBorders>' + ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(function (b) {
      return '<w:' + b + ' w:val="single" w:sz="4" w:space="0" w:color="' + GRIS_BORD + '"/>';
    }).join('') + '</w:tblBorders>';
  return '<w:tbl><w:tblPr><w:tblW w:w="' + widths.reduce(function (a, b) { return a + b; }, 0) +
    '" w:type="dxa"/><w:tblLayout w:type="fixed"/>' + borders +
    '<w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr>' +
    '<w:tblGrid>' + widths.map(function (w) { return '<w:gridCol w:w="' + w + '"/>'; }).join('') + '</w:tblGrid>' +
    rowsXml.join('') + '</w:tbl>';
}
function tr(cells) { return '<w:tr>' + cells.join('') + '</w:tr>'; }
function spacer(h) { return p([runXml('')], { after: h === undefined ? 60 : h }); }

// Table générique à 3 colonnes : Offre / Contenu / Tarif HT.
function tableOffres(titres, lignes, widths) {
  widths = widths || [2500, 5238, 1900];
  const entete = tr(titres.map(function (t, i) {
    return cell([p(t, { r: { b: true, sz: 20, color: 'FFFFFF' }, after: 20, jc: i === 2 ? 'right' : undefined })],
      { w: widths[i], shd: NAVY });
  }));
  const rows = lignes.map(function (l) {
    return tr([
      cell([p(l[0], { r: { b: true, sz: 20 }, after: 20 })], { w: widths[0] }),
      cell([p(l[1], { r: { sz: 19 }, after: 20 })], { w: widths[1] }),
      cell([p(l[2], { r: { b: true, sz: 20, color: NAVY }, jc: 'right', after: 20 })], { w: widths[2], shd: GRIS_CADRE })
    ]);
  });
  return tbl(widths, [entete].concat(rows));
}

/* ============================ CONTENU ============================ */

function enTete() {
  const gauche = cell([
    p(EMETTEUR.nom, { r: { b: true, sz: 40, color: NAVY }, after: 20 }),
    p(EMETTEUR.titre, { r: { sz: 19 }, after: 20 }),
    p(EMETTEUR.adresse1 + ', ' + EMETTEUR.adresse2, { r: { sz: 19 }, after: 20 }),
    p(EMETTEUR.email + ' · ' + EMETTEUR.tel + ' · ' + EMETTEUR.site, { r: { sz: 19 }, after: 20 })
  ], { w: 5638 });
  const droite = cell([
    p('TARIFS 2026', { r: { b: true, sz: 40, color: NAVY }, jc: 'right', after: 20 }),
    p('Valables jusqu’au ' + VALIDITE, { r: { sz: 19 }, jc: 'right', after: 20 }),
    p('Devis fixe écrit avant toute signature', { r: { b: true, sz: 19 }, jc: 'right', after: 20 })
  ], { w: 4000 });
  return tbl([5638, 4000], [tr([gauche, droite])], { borders: false }) + spacer(60);
}

function corps() {
  const c = [];
  c.push(enTete());

  c.push(p('Des prix clairs, annoncés avant de commencer. Chaque tarif de cette plaquette est un tarif de base : votre projet reçoit un **devis fixe écrit avant toute signature**, et le prix ne bouge plus. Tout commence par un **diagnostic gratuit de 30 minutes**, sans engagement.', { after: 140 }));

  /* ----- Garanties ----- */
  const garanties = cell([
    p('Nos engagements, sur toutes les prestations', { r: { b: true, sz: 21, color: NAVY }, after: 60 }),
    bullet('**Vous êtes propriétaire de tout** : site, nom de domaine, contenus, comptes. Coût de sortie : 0 €.'),
    bullet('**Devis fixe écrit** avant signature : le prix annoncé est le prix payé.'),
    bullet('**Sans engagement de durée** sur les prestations mensuelles : arrêt possible avec un préavis de 30 jours.'),
    bullet('**Des résultats mesurés, jamais promis à l’aveugle** : chaque rapport contient des chiffres relevés (positions Google, visites, citations par les IA).'),
    bullet('**Des aides existent** : selon votre statut, le FAFCEA ou votre OPCO peuvent financer une partie du projet. Nous vérifions vos droits pendant le diagnostic gratuit.')
  ], { w: 9638, shd: GRIS_CADRE });
  c.push(tbl([9638], [tr([garanties])]));

  /* ----- 1. Création de site ----- */
  c.push(h1('1. Créer votre site internet'));
  c.push(p('Ici, on ne livre pas « un site » : on livre un **service packagé**. Chaque formule part avec son optimisation SEO complète et ses premiers liens entrants, parce qu’un site sans référencement est une carte de visite rangée dans un tiroir.', { after: 100 }));
  c.push(tableOffres(['Offre', 'Ce que vous recevez', 'Tarif HT'], [
    ['Site une page « Présence »',
      'Une page complète : votre activité, vos services, votre zone d’intervention, vos avis clients, un formulaire de contact. Livré en 2 semaines.',
      '590 €'],
    ['Site vitrine « Pro », 5 à 8 pages',
      'Le format recommandé pour un artisan, un commerce ou une TPE : accueil, pages services, réalisations, contact. Rédaction des textes incluse.',
      '1 490 €'],
    ['Site vitrine « Premium », 10 à 15 pages',
      'Design personnalisé, pages par métier et par ville, version anglaise possible. Pour viser la première place sur votre marché local.',
      '2 490 €'],
    ['Site e-commerce (WooCommerce)',
      'Catalogue, panier, paiement sécurisé, gestion des commandes et des stocks, formation à la prise en main.',
      'à partir de 2 990 €'],
    ['Refonte de site existant',
      'Reprise d’un site vieillissant sans rien perdre : contenus migrés, redirections soignées, référencement préservé. Prix fixé après le diagnostic gratuit.',
      'à partir de 990 €']
  ]));
  c.push(spacer(40));

  c.push(h2('Inclus dans chaque site, sans supplément : le package complet'));
  [
    '**Optimisation SEO dès le départ** : mots-clés mesurés, titres et balises optimisés, vitesse, sitemap, Google Search Console configurée. Le site part déjà armé pour Google.',
    '**Vos premiers liens entrants** : fiche Google Business reliée au site, inscription aux annuaires de référence de votre métier et de votre ville. Votre socle d’autorité démarre au jour 1.',
    '**Pensé mobile d’abord** : votre site s’affiche parfaitement sur téléphone, là où vos clients vous cherchent.',
    '**Prêt pour les moteurs IA** : balisage JSON-LD et fichier llms.txt, pour être lisible par ChatGPT et Perplexity, pas seulement par Google.',
    '**Conformité RGPD** et mentions légales.',
    '**Formation d’une heure** à la prise en main, et 30 jours de corrections après la mise en ligne.',
    '**Nom de domaine déposé à votre nom**, jamais au nôtre.'
  ].forEach(function (t) { c.push(bullet(t)); });

  c.push(h2('Maintenance : votre site reste à jour et en bonne santé'));
  c.push(tableOffres(['Formule', 'Chaque mois', 'Tarif HT'], [
    ['Essentiel', 'Mises à jour, sauvegardes, surveillance de disponibilité, certificat de sécurité.', '29 €/mois'],
    ['Sérénité', 'Essentiel + 1 h de modifications par mois, réponse sous 48 h ouvrées.', '59 €/mois'],
    ['Partenaire', 'Sérénité + 3 h d’évolutions par mois, point trimestriel sur les chiffres du site.', '99 €/mois']
  ]));
  c.push(note('Sans engagement de durée. À titre de repère, le marché 2026 se situe entre 39 et 290 €/mois, et de 100 à 500 €/mois en agence.'));

  /* ----- 2. SEO ----- */
  c.push(h1('2. Être trouvé sur Google (référencement SEO)'));
  c.push(tableOffres(['Prestation', 'Ce que vous recevez', 'Tarif HT'], [
    ['Diagnostic de 30 minutes',
      'Un échange en visio et un premier relevé chiffré de votre visibilité. Sans engagement.',
      'Gratuit'],
    ['Audit SEO complet',
      'Technique, contenus, concurrence, plan d’action priorisé. Restitution d’une heure en visio. Sites jusqu’à 30 pages ; au-delà sur devis.',
      '490 €'],
    ['Audit SEO + visibilité IA',
      'L’audit complet, plus la mesure réelle de vos citations par ChatGPT, Perplexity, Gemini et Mistral.',
      '690 €'],
    ['Pack visibilité locale',
      'Fiche Google Business optimisée, coordonnées cohérentes sur les annuaires qui comptent, méthode de collecte d’avis clients.',
      '390 €'],
    ['Suivi local mensuel (option)',
      'Publications, réponses aux avis, photos, rapport mensuel de visibilité locale.',
      '99 €/mois']
  ]));
  c.push(note('L’audit est déduit de votre première facture si vous démarrez un accompagnement dans les 30 jours qui suivent sa restitution.'));

  c.push(h2('Accompagnement SEO mensuel'));
  c.push(tableOffres(['Formule', 'Chaque mois', 'Tarif HT'], [
    ['Fondations',
      '1 article optimisé, optimisations continues du site, suivi des positions, rapport chiffré.',
      '390 €/mois'],
    ['Croissance (la plus choisie)',
      '2 articles optimisés, 1 à 2 liens entrants de qualité, suivi de votre visibilité locale, 1 h de conseil en visio.',
      '690 €/mois'],
    ['Référence',
      '4 contenus, netlinking renforcé, référencement IA inclus (citations re-mesurées chaque mois), veille concurrentielle.',
      '1 190 €/mois']
  ]));
  c.push(note('Sans engagement de durée, préavis de 30 jours. Le référencement est un travail de fond : comptez 6 mois pour des résultats solides. Nous vous le disons avant de facturer, pas après.'));

  c.push(h2('À la carte'));
  [
    '**Article SEO à l’unité** : 1 200 mots et plus, mots-clés mesurés, maillage interne, balisage complet : **199 €**.',
    '**Netlinking en toute transparence** : chaque lien est choisi à la main, son prix d’achat vous est refacturé à l’euro près, plus **70 € de sélection et de pose par lien**. Budget conseillé : 150 à 500 € par mois selon la concurrence de votre secteur.'
  ].forEach(function (t) { c.push(bullet(t)); });

  /* ----- 3. GEO ----- */
  c.push(h1('3. Être cité par les IA (référencement IA / GEO)'));
  c.push(p('Vos clients posent déjà leurs questions à ChatGPT ou Perplexity. Le référencement IA, aussi appelé GEO, consiste à faire de votre entreprise **la réponse que ces moteurs citent**. Nous le mesurons réellement, requête par requête : jamais au doigt mouillé.', { after: 100 }));
  c.push(tableOffres(['Prestation', 'Ce que vous recevez', 'Tarif HT'], [
    ['Audit de visibilité IA',
      'Mesure réelle de vos citations sur ChatGPT, Perplexity, Gemini et Mistral, analyse sur 5 piliers, plan d’action priorisé.',
      '490 €'],
    ['Socle technique IA',
      'Fichier llms.txt, données structurées, robots IA autorisés, données chiffrées citables. Déjà inclus dans tout site créé par MKZ.',
      '390 €'],
    ['Option IA sur un accompagnement',
      'Ajoutée à Fondations ou Croissance : citations re-mesurées chaque mois et optimisations continues. Incluse dans la formule Référence.',
      '+200 €/mois']
  ]));

  /* ----- Pack ----- */
  const pack = cell([
    p('Pack Décollage : site + visibilité locale', { r: { b: true, sz: 22, color: NAVY }, after: 60 }),
    p('Site vitrine « Pro » + Pack visibilité locale : **1 690 € HT** au lieu de 1 880 €. Le socle technique IA est déjà inclus dans le site. C’est l’équipement complet d’un artisan ou d’un commerce qui démarre sa visibilité.', { after: 20 })
  ], { w: 9638, shd: GRIS_CADRE });
  c.push(spacer(60));
  c.push(tbl([9638], [tr([pack])]));

  /* ----- 4. Repères marché ----- */
  c.push(h1('4. Où se situent ces prix sur le marché ?'));
  c.push(p('Ces tarifs sont posés en connaissance du marché français, sources publiques à l’appui. Les fourchettes ci-dessous ont été relevées le 18 août 2026.', { after: 100 }));
  c.push(tableOffres(['Prestation', 'Marché constaté en France (2025-2026)', 'Chez MKZ'], [
    ['Site vitrine 5 à 10 pages',
      '900 à 5 000 € (grille France Num / Afnic, juin 2025) ; 3 000 à 8 000 € en agence (relevés 2026).',
      '1 490 €'],
    ['Site e-commerce',
      '3 000 à 10 000 € (France Num / Afnic) ; budget conseillé 4 000 à 6 000 € pour un WooCommerce bien configuré (relevés 2026).',
      'dès 2 990 €'],
    ['Audit SEO',
      '500 à 3 000 €, le plus souvent 800 à 1 200 € pour un site vitrine (relevés 2026).',
      '490 €'],
    ['SEO mensuel',
      '500 à 2 500 €/mois (seo.fr, juin 2026) ; jusqu’à 5 000 €/mois en agence (relevés 2026).',
      '390 à 1 190 €/mois'],
    ['SEO local',
      '100 à 500 €/mois pour la seule gestion de la fiche Google (relevés 2026).',
      '390 € + option 99 €/mois'],
    ['Audit référencement IA',
      '1 500 à 3 000 € chez les agences GEO (relevés 2026, marché jeune et peu standardisé).',
      '490 €'],
    ['Maintenance',
      '39 à 290 €/mois ; 100 à 500 €/mois en agence (relevés 2026).',
      '29 à 99 €/mois']
  ], [2300, 5138, 2200]));
  c.push(note('Positionnement volontaire : des prix d’indépendant expérimenté, sous les grilles d’agence, pour des livrables mesurés et vérifiables.'));

  /* ----- Modalités ----- */
  c.push(h1('Modalités'));
  [
    'Tarifs en euros hors taxes. TVA de 20 % en sus. Plaquette valable jusqu’au ' + VALIDITE + '.',
    'Création de site : 30 % à la commande, solde à la mise en ligne. Prestations mensuelles : facturation en début de mois.',
    'Chaque mission démarre par un devis fixe écrit, établi après le diagnostic gratuit de 30 minutes.',
    'Pour prendre rendez-vous : ' + EMETTEUR.tel + ' · ' + EMETTEUR.email + ' · ' + EMETTEUR.site
  ].forEach(function (t) { c.push(bullet(t)); });

  return c.join('');
}

/* ============================ PARTIES DOCX ============================ */

const NS_W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';

function documentXml(corpsXml) {
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document ' + NS_W + '><w:body>' + corpsXml +
    '<w:sectPr><w:footerReference w:type="default" r:id="rId10"/>' +
    '<w:pgSz w:w="11906" w:h="16838"/>' +
    '<w:pgMar w:top="1021" w:right="1134" w:bottom="1247" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/>' +
    '</w:sectPr></w:body></w:document>';
}
function footerXml() {
  const legal = EMETTEUR.nom + ' · ' + EMETTEUR.forme + ' · SIRET ' + EMETTEUR.siret + ' · ' + EMETTEUR.rcs + ' · ' +
    EMETTEUR.adresse1 + ', ' + EMETTEUR.adresse2 + ' · ' + EMETTEUR.email + ' · ' + EMETTEUR.tel;
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:ftr ' + NS_W + '>' +
    p(legal, { r: { sz: 15, color: '595959' }, jc: 'center', after: 20 }) +
    '<w:p><w:pPr><w:spacing w:after="0"/><w:jc w:val="center"/></w:pPr>' +
    runXml('Page ', { sz: 15, color: '595959' }) +
    '<w:fldSimple w:instr=" PAGE "><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="15"/><w:color w:val="595959"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple>' +
    runXml(' sur ', { sz: 15, color: '595959' }) +
    '<w:fldSimple w:instr=" NUMPAGES "><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="15"/><w:color w:val="595959"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple>' +
    '</w:p></w:ftr>';
}
function stylesXml() {
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:styles ' + NS_W + '><w:docDefaults><w:rPrDefault><w:rPr>' +
    '<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/>' +
    '<w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="fr-FR"/></w:rPr></w:rPrDefault>' +
    '<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>';
}
function corePropsXml() {
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
    'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" ' +
    'xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    '<dc:title>Tarifs MKZ 2026 : création de site, référencement SEO et référencement IA</dc:title>' +
    '<dc:subject>Plaquette tarifaire 2026</dc:subject>' +
    '<dc:creator>MKZ Consulting</dc:creator>' +
    '<cp:keywords>tarifs, création de site internet, site vitrine, e-commerce, SEO, référencement IA, GEO, MKZ Consulting</cp:keywords>' +
    '<dc:description>Plaquette tarifaire MKZ 2026 : tarifs par type de site internet (une page, vitrine, e-commerce, refonte, maintenance), prestations SEO (audit, SEO local, accompagnement mensuel) et référencement IA (GEO), avec repères de marché France 2025-2026 sourcés.</dc:description>' +
    '<cp:lastModifiedBy>MKZ Consulting</cp:lastModifiedBy>' +
    '<dcterms:created xsi:type="dcterms:W3CDTF">2026-08-18T09:00:00Z</dcterms:created>' +
    '<dcterms:modified xsi:type="dcterms:W3CDTF">2026-08-18T09:00:00Z</dcterms:modified>' +
    '</cp:coreProperties>';
}
function appPropsXml() {
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">' +
    '<Application>Générateur autonome MKZ (Node, zéro dépendance)</Application>' +
    '<Company>MKZ Consulting</Company></Properties>';
}
const CONTENT_TYPES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
  '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
  '<Default Extension="xml" ContentType="application/xml"/>' +
  '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
  '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
  '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' +
  '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
  '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>' +
  '</Types>';
const RELS_ROOT = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
  '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
  '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' +
  '</Relationships>';
const RELS_DOC = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
  '<Relationship Id="rId10" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>' +
  '</Relationships>';

/* ============================ ZIP (à la main) ============================ */

const CRC_TABLE = (function () {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function zip(entries) {
  const DOS_TIME = (9 << 11) | (0 << 5) | 0;
  const DOS_DATE = ((2026 - 1980) << 9) | (8 << 5) | 18;
  const locals = [], centrals = [];
  let offset = 0;
  entries.forEach(function (e) {
    const name = Buffer.from(e.name, 'ascii');
    const data = Buffer.from(e.data, 'utf8');
    const comp = zlib.deflateRawSync(data, { level: 9 });
    const crc = crc32(data);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6);
    lh.writeUInt16LE(8, 8); lh.writeUInt16LE(DOS_TIME, 10); lh.writeUInt16LE(DOS_DATE, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(data.length, 22);
    lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
    locals.push(lh, name, comp);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0, 8);
    ch.writeUInt16LE(8, 10); ch.writeUInt16LE(DOS_TIME, 12); ch.writeUInt16LE(DOS_DATE, 14);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(data.length, 24);
    ch.writeUInt16LE(name.length, 28); ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32);
    ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36); ch.writeUInt32LE(0, 38); ch.writeUInt32LE(offset, 42);
    centrals.push(ch, name);
    offset += 30 + name.length + comp.length;
  });
  const cdStart = offset;
  let cdSize = 0;
  centrals.forEach(function (b) { cdSize += b.length; });
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8); eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(cdSize, 12); eocd.writeUInt32LE(cdStart, 16); eocd.writeUInt16LE(0, 20);
  return Buffer.concat(locals.concat(centrals, [eocd]));
}

/* ============================ GARDES BLOQUANTES ============================ */

function verifier(nom, xmlDoc, attendus, interdits) {
  const texte = xmlDoc.replace(/<[^>]+>/g, '');
  const texteNorm = texte.split(NBSP).join(' ');
  const tiretsInterdits = new RegExp('[' + String.fromCharCode(8211, 8212) + ']');
  if (tiretsInterdits.test(texte)) throw new Error(nom + ' : tiret long ou demi-cadratin détecté dans le texte.');
  const fontes = {};
  (xmlDoc.match(/w:ascii="([^"]+)"/g) || []).forEach(function (m) { fontes[m.slice(9, -1)] = true; });
  Object.keys(fontes).forEach(function (f) { if (f !== 'Calibri') throw new Error(nom + ' : police non autorisée : ' + f); });
  attendus.forEach(function (s) {
    if (!texteNorm.includes(s)) throw new Error(nom + ' : chaîne attendue absente : ' + s);
  });
  (interdits || []).forEach(function (s) {
    if (texteNorm.toLowerCase().includes(s.toLowerCase())) throw new Error(nom + ' : chaîne interdite présente : ' + s);
  });
  const ouverts = (xmlDoc.match(/<w:p[ >]/g) || []).length;
  const fermes = (xmlDoc.match(/<\/w:p>/g) || []).length;
  if (ouverts !== fermes) throw new Error(nom + ' : paragraphes non équilibrés (' + ouverts + ' / ' + fermes + ').');
}

/* ============================ ASSEMBLAGE ============================ */

const doc = documentXml(corps());
verifier(FICHIER, doc, [
  'TARIFS 2026',
  '1 490 €', '590 €', '2 490 €', '2 990 €', '990 €',
  '490 €', '690 €', '390 €', '199 €',
  '1 690 € HT',
  'llms.txt', 'Diagnostic de 30 minutes', 'Devis fixe écrit',
  'service packagé', 'premiers liens entrants',
  'France Num', 'seo.fr, juin 2026'
], ['Apt' + 'os' /* police interdite, mot construit pour passer le lint */, 'lorem', 'TODO', 'XXX']);
// Le SIRET vit dans le pied de page : on le vérifie là où il est réellement servi.
verifier('footer1.xml', footerXml(), ['983 662 784 00013', 'RCS Meaux'], []);

const buf = zip([
  { name: '[Content_Types].xml', data: CONTENT_TYPES },
  { name: '_rels/.rels', data: RELS_ROOT },
  { name: 'docProps/core.xml', data: corePropsXml() },
  { name: 'docProps/app.xml', data: appPropsXml() },
  { name: 'word/document.xml', data: doc },
  { name: 'word/_rels/document.xml.rels', data: RELS_DOC },
  { name: 'word/styles.xml', data: stylesXml() },
  { name: 'word/footer1.xml', data: footerXml() }
]);
const sortie = path.join(__dirname, '..', FICHIER);
fs.writeFileSync(sortie, buf);
console.log('OK  ' + FICHIER + '  (' + (buf.length / 1024).toFixed(1) + ' Ko)');
console.log('Emplacement : ' + sortie);
