// Moteur de l'audit SEO + IA gratuit (/audit-seo/).
//
// Règle de la maison : chaque check MESURE (fetch réel, valeur relevée, valeur
// attendue) et ne déduit jamais. Un check qui ne peut pas mesurer répond
// "na" avec la raison, jamais une estimation.
//
// Portable Workers ET Node >= 18 (fetch global, zéro API Node) : le même code
// tourne dans la Pages Function en production et dans le harnais de test
// scripts/test-audit-engine.mjs. Dépendances : aucune.
//
// Découpage en 5 phases, une requête HTTP du front par phase, pour rester loin
// des limites CPU des Workers et donner au visiteur une progression réelle :
//   1 origin    : normalisation + les 4 variantes http/https x www/apex
//   2 robots    : robots.txt live, crawlers IA, llms.txt, sitemap
//   3 page      : la page d'accueil (balises, JSON-LD, en-têtes, indexabilité)
//   4 notfound  : vraie 404 contre soft-404
//   5 autorite  : DataForSEO, liens entrants et positions Google France (Tier 1,
//                 payant : cache 24 h par domaine et plafond quotidien dur)

const UA = "MKZ-Audit/1.0 (+https://mkz-consulting.fr/audit-seo/)";
const TIMEOUT_MS = 8000;
const HTML_CAP = 600 * 1024; // au-delà, on tronque l'analyse (et on le dit)

// Les 6 crawlers IA du verdict, par ordre d'importance métier.
export const AI_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "meta-externalagent",
  "CCBot",
];

// ---------------------------------------------------------------------------
// Outils
// ---------------------------------------------------------------------------

async function fetchTimeout(url, options = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "manual",
      ...options,
      headers: { "User-Agent": UA, ...(options.headers || {}) },
      signal: ctl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

// Suit les redirections à la main (max 5) pour pouvoir RELEVER la chaîne.
async function follow(url, max = 5) {
  const chain = [];
  let current = url;
  for (let i = 0; i <= max; i++) {
    let res;
    try {
      res = await fetchTimeout(current);
    } catch (e) {
      chain.push({ url: current, status: 0, error: String(e && e.name === "AbortError" ? "timeout" : e) });
      return { chain, final: null };
    }
    chain.push({ url: current, status: res.status });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) return { chain, final: res };
      current = new URL(loc, current).href;
      continue;
    }
    return { chain, final: res, finalUrl: current };
  }
  return { chain, final: null, tooMany: true };
}

// Garde anti-abus : uniquement de l'HTTP(S) public sur port standard.
export function normalizeTarget(input) {
  let raw = String(input || "").trim();
  if (!raw) return { error: "vide" };
  if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw;
  let u;
  try {
    u = new URL(raw);
  } catch {
    return { error: "invalide" };
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return { error: "invalide" };
  if (u.port && u.port !== "80" && u.port !== "443") return { error: "port" };
  const host = u.hostname.toLowerCase();
  const privateHost =
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
    host.includes(":"); // IPv6 littérale
  if (privateHost) return { error: "prive" };
  if (!host.includes(".")) return { error: "invalide" };
  return { host };
}

function check(id, bloc, status, points, max, data = {}) {
  return { id, bloc, status, points, max, data };
}

// ---------------------------------------------------------------------------
// Phase 1 : origine et redirections (11 points max avec l'indexabilité en ph.3)
// ---------------------------------------------------------------------------

// `self` = true quand la cible est le domaine qui HÉBERGE l'outil : depuis un
// Worker, un fetch http:// vers sa propre zone part directement à l'origine
// sans la redirection de bord (mesuré le 21/08/2026 : http répond 200 en
// 0 saut vu du Worker, 301 vu de l'extérieur). Les variantes http sont donc
// non testables en auto-scan : on ne les mesure pas plutôt que de les mesurer
// faux.
export async function phaseOrigin(input, self = false) {
  const norm = normalizeTarget(input);
  if (norm.error) return { error: norm.error };
  const host = norm.host;
  const apex = host.replace(/^www\./, "");
  const variants = self
    ? [`https://${apex}/`, `https://www.${apex}/`]
    : [
        `https://${apex}/`,
        `https://www.${apex}/`,
        `http://${apex}/`,
        `http://www.${apex}/`,
      ];

  const results = [];
  for (const v of variants) {
    results.push({ variant: v, ...(await follow(v)) });
  }

  // Origine retenue : la première variante HTTPS qui répond 200 au bout de sa
  // chaîne (la destination finale, pas le point d'entrée).
  let origin = null;
  for (const r of results) {
    if (r.final && r.final.status === 200 && r.finalUrl && r.finalUrl.startsWith("https://")) {
      origin = new URL(r.finalUrl).origin;
      break;
    }
  }

  const checks = [];

  // HTTPS servi : au moins une variante HTTPS aboutit en 200.
  const httpsOk = origin !== null;
  // Cohérence : TOUTES les variantes qui répondent aboutissent sur LA MÊME
  // origine finale en 200 (pas de site accessible en double).
  const finals = results
    .filter((r) => r.final && r.finalUrl)
    .map((r) => {
      try {
        return new URL(r.finalUrl).origin;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  const distinct = [...new Set(finals)];
  const coherent = httpsOk && distinct.length === 1;

  checks.push(
    check("https-redirections", "technique", httpsOk ? (coherent ? "ok" : "warn") : "fail",
      httpsOk ? (coherent ? 5 : 3) : 0, 5, {
        origin,
        variants: results.map((r) => ({
          from: r.variant,
          to: r.finalUrl || null,
          status: r.final ? r.final.status : (r.chain.at(-1)?.error ? 0 : null),
          hops: Math.max(0, r.chain.length - 1),
        })),
        distinctOrigins: distinct,
        selfScan: self,
      })
  );

  if (!origin) return { checks, origin: null };
  return { checks, origin };
}

// ---------------------------------------------------------------------------
// Phase 2 : robots.txt, crawlers IA, llms.txt, sitemap (23 points)
// ---------------------------------------------------------------------------

// Parseur robots.txt minimal mais honnête : groupes UA -> règles, et pour un
// bot donné le groupe retenu est le plus spécifique (comme les moteurs).
export function parseRobots(text) {
  const groups = [];
  let current = null;
  const sitemaps = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!current || current.rules.length > 0) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if ((key === "disallow" || key === "allow") && current) {
      current.rules.push({ type: key, path: value });
    } else if (key === "sitemap") {
      sitemaps.push(value);
    }
  }
  return { groups, sitemaps };
}

// Verdict par bot : "blocked" uniquement pour un blocage TOTAL (Disallow: /
// effectif sans Allow plus spécifique), "partial" pour des Disallow ciblés.
export function botVerdict(robots, bot) {
  const name = bot.toLowerCase();
  let group = robots.groups.find((g) => g.agents.some((a) => a !== "*" && name.startsWith(a)));
  if (!group) group = robots.groups.find((g) => g.agents.includes("*"));
  if (!group) return "allowed";
  const disallowAll = group.rules.some((r) => r.type === "disallow" && r.path === "/");
  const allowSomething = group.rules.some((r) => r.type === "allow" && r.path !== "");
  if (disallowAll && !allowSomething) return "blocked";
  if (group.rules.some((r) => r.type === "disallow" && r.path !== "")) return "partial";
  return "allowed";
}

export async function phaseRobots(origin) {
  const checks = [];

  // robots.txt LIVE (la seule vérité : jamais celui d'un build).
  let robotsText = null;
  let robotsStatus = null;
  try {
    const res = await follow(`${origin}/robots.txt`);
    robotsStatus = res.final ? res.final.status : 0;
    if (res.final && res.final.status === 200) robotsText = await res.final.text();
  } catch {
    robotsStatus = 0;
  }

  let robots = { groups: [], sitemaps: [] };
  if (robotsText !== null) {
    robots = parseRobots(robotsText);
    const starBlocked = botVerdict(robots, "un-bot-quelconque") === "blocked" &&
      robots.groups.some((g) => g.agents.includes("*") && g.rules.some((r) => r.type === "disallow" && r.path === "/"));
    checks.push(check("robots-txt", "technique", starBlocked ? "fail" : "ok", starBlocked ? 0 : 2, 2, {
      status: robotsStatus,
      bytes: robotsText.length,
      starBlocked,
    }));
  } else {
    // Absent = tout est autorisé par défaut : pas un défaut bloquant, un warn.
    checks.push(check("robots-txt", "technique", "warn", 1, 2, { status: robotsStatus, absent: true }));
  }

  // Crawlers IA : verdict bot par bot sur le robots.txt réellement servi.
  const verdicts = {};
  let blockedCount = 0;
  for (const bot of AI_BOTS) {
    const v = robotsText === null ? "allowed" : botVerdict(robots, bot);
    verdicts[bot] = v;
    if (v === "blocked") blockedCount++;
  }
  const iaPoints = Math.round(((AI_BOTS.length - blockedCount) / AI_BOTS.length) * 15);
  checks.push(
    check("crawlers-ia", "ia", blockedCount === 0 ? "ok" : blockedCount === AI_BOTS.length ? "fail" : "warn",
      iaPoints, 15, { verdicts, blockedCount, robotsAbsent: robotsText === null })
  );

  // llms.txt : 200, texte, non vide, et pas une page HTML déguisée (soft-404).
  try {
    const res = await follow(`${origin}/llms.txt`);
    const status = res.final ? res.final.status : 0;
    if (status === 200) {
      const body = (await res.final.text()).slice(0, 20000);
      const looksHtml = /^\s*<!doctype html|^\s*<html/i.test(body);
      const ok = body.trim().length > 0 && !looksHtml;
      checks.push(check("llms-txt", "ia", ok ? "ok" : "fail", ok ? 8 : 0, 8, {
        status, bytes: body.length, looksHtml,
      }));
    } else {
      checks.push(check("llms-txt", "ia", "fail", 0, 8, { status }));
    }
  } catch {
    checks.push(check("llms-txt", "ia", "fail", 0, 8, { status: 0 }));
  }

  // Sitemap : déclaré dans robots.txt, sinon /sitemap.xml. XML parsable a
  // minima (balises <loc>), nombre d'URLs relevé (index de sitemaps compris).
  const candidates = robots.sitemaps.length ? robots.sitemaps.slice(0, 2) : [`${origin}/sitemap.xml`];
  let sitemapFound = null;
  for (const sm of candidates) {
    try {
      const res = await follow(sm);
      if (res.final && res.final.status === 200) {
        const xml = (await res.final.text()).slice(0, 500000);
        let locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
        const isIndex = /<sitemapindex/i.test(xml);
        if (isIndex && locs.length) {
          // Un index : on compte les URLs du premier sitemap enfant.
          try {
            const child = await follow(locs[0]);
            if (child.final && child.final.status === 200) {
              const childXml = (await child.final.text()).slice(0, 500000);
              locs = [...childXml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
            }
          } catch { /* le comptage enfant est un bonus, pas un verdict */ }
        }
        sitemapFound = { url: sm, declared: robots.sitemaps.length > 0, isIndex, urlCount: locs.length };
        break;
      }
    } catch { /* variante suivante */ }
  }
  checks.push(
    sitemapFound
      ? check("sitemap", "technique", sitemapFound.urlCount > 0 ? "ok" : "warn",
          sitemapFound.urlCount > 0 ? 3 : 1, 3, sitemapFound)
      : check("sitemap", "technique", "fail", 0, 3, { tried: candidates })
  );

  return { checks };
}

// ---------------------------------------------------------------------------
// Phase 3 : la page d'accueil (26 points)
// ---------------------------------------------------------------------------

// Règle « item » des ItemList et BreadcrumbList (celle de GSC) : chaque
// itemListElement d'un ItemList porte un item complet ; un BreadcrumbList
// porte item partout sauf le dernier maillon.
export function checkItemRule(node) {
  const problems = [];
  const visit = (n) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) return n.forEach(visit);
    const type = n["@type"];
    if (type === "BreadcrumbList" && Array.isArray(n.itemListElement)) {
      n.itemListElement.forEach((el, i) => {
        const last = i === n.itemListElement.length - 1;
        if (!last && !el.item) problems.push("BreadcrumbList: maillon " + (i + 1) + " sans item");
      });
    } else if (type === "ItemList" && Array.isArray(n.itemListElement)) {
      n.itemListElement.forEach((el, i) => {
        const item = el.item;
        if (!item || typeof item !== "object" || !item["@type"] || !item.name) {
          problems.push("ItemList: element " + (i + 1) + " sans item complet");
        }
      });
    }
    Object.values(n).forEach(visit);
  };
  visit(node);
  return problems;
}

export async function phasePage(origin) {
  const checks = [];
  let res;
  try {
    res = await follow(`${origin}/`);
  } catch {
    res = null;
  }
  if (!res || !res.final || res.final.status !== 200) {
    return { checks: [check("page", "technique", "fail", 0, 0, { status: res && res.final ? res.final.status : 0 })] };
  }

  const headers = res.final.headers;
  const fullHtml = await res.final.text();
  const truncated = fullHtml.length > HTML_CAP;
  const html = truncated ? fullHtml.slice(0, HTML_CAP) : fullHtml;
  const head = html.match(/<head[\s>][\s\S]*?<\/head>/i)?.[0] ?? html.slice(0, 100000);

  // Indexabilité : X-Robots-Tag ET meta robots. Un noindex ici est LE défaut
  // le plus grave qu'un site puisse porter sans le savoir.
  const xRobots = headers.get("x-robots-tag") || "";
  const metaRobots = head.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] ?? "";
  const noindex = /noindex/i.test(xRobots) || /noindex/i.test(metaRobots);
  checks.push(check("indexabilite", "technique", noindex ? "fail" : "ok", noindex ? 0 : 4, 4, {
    xRobotsTag: xRobots || null,
    metaRobots: metaRobots ? (metaRobots.match(/content=["']([^"']*)["']/i)?.[1] ?? metaRobots) : null,
  }));

  // Title et meta description : les longueurs SERP de la maison (65 / 160).
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null;
  const titleLen = title ? title.length : 0;
  checks.push(check("title", "technique",
    !title ? "fail" : titleLen <= 65 ? "ok" : "warn",
    !title ? 0 : titleLen <= 65 ? 3 : 1, 3, { title, length: titleLen }));

  const metaDesc = head.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]
    ?? head.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1] ?? null;
  const descLen = metaDesc ? metaDesc.length : 0;
  checks.push(check("meta-description", "technique",
    !metaDesc ? "fail" : descLen <= 160 ? "ok" : "warn",
    !metaDesc ? 0 : descLen <= 160 ? 3 : 1, 3, { description: metaDesc, length: descLen }));

  // H1 unique + hiérarchie sans saut.
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  let skip = false;
  let prev = 0;
  for (const l of levels) {
    if (l > prev + 1 && prev !== 0) { skip = true; break; }
    if (l > prev) prev = l;
  }
  checks.push(check("h1-hn", "technique",
    h1s === 1 && !skip ? "ok" : h1s === 0 ? "fail" : "warn",
    h1s === 1 ? (skip ? 2 : 3) : h1s === 0 ? 0 : 1, 3, { h1Count: h1s, levelSkip: skip }));

  // Viewport (limite assumée : la présence de la balise, pas le rendu 375 px).
  const viewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(head);
  checks.push(check("viewport", "technique", viewport ? "ok" : "fail", viewport ? 2 : 0, 2, { present: viewport }));

  // JSON-LD : présent, parsable, types relevés, règle « item » vérifiée.
  const ldBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1]);
  if (ldBlocks.length === 0) {
    checks.push(check("json-ld", "ia", "fail", 0, 12, { blocks: 0 }));
  } else {
    let parsed = 0;
    const types = [];
    const itemProblems = [];
    for (const block of ldBlocks) {
      try {
        const data = JSON.parse(block.trim());
        parsed++;
        const nodes = Array.isArray(data) ? data : data["@graph"] && Array.isArray(data["@graph"]) ? data["@graph"] : [data];
        for (const n of nodes) if (n && n["@type"]) types.push(String(n["@type"]));
        itemProblems.push(...checkItemRule(data));
      } catch { /* bloc illisible : compté par la différence parsed/blocks */ }
    }
    const allParsed = parsed === ldBlocks.length;
    const ruleOk = itemProblems.length === 0;
    const pts = 6 + (allParsed ? 3 : 0) + (allParsed && ruleOk ? 3 : 0);
    checks.push(check("json-ld", "ia",
      allParsed && ruleOk ? "ok" : "warn", pts, 12,
      { blocks: ldBlocks.length, parsed, types: [...new Set(types)].slice(0, 12), itemProblems: itemProblems.slice(0, 5) }));
  }

  // Images sans alt.
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt\s*=/i.test(t)).length;
  const altRatio = imgs.length === 0 ? 1 : (imgs.length - noAlt) / imgs.length;
  checks.push(check("images-alt", "technique",
    imgs.length === 0 ? "ok" : noAlt === 0 ? "ok" : altRatio >= 0.8 ? "warn" : "fail",
    noAlt === 0 ? 1 : 0, 1, { images: imgs.length, sansAlt: noAlt }));

  // En-têtes de sécurité de base.
  const xcto = (headers.get("x-content-type-options") || "").toLowerCase() === "nosniff";
  const frame = Boolean(headers.get("x-frame-options")) ||
    /frame-ancestors/i.test(headers.get("content-security-policy") || "");
  const hsts = Boolean(headers.get("strict-transport-security"));
  const secCount = [xcto, frame, hsts].filter(Boolean).length;
  checks.push(check("en-tetes-securite", "technique",
    secCount === 3 ? "ok" : secCount >= 1 ? "warn" : "fail", secCount, 3,
    { nosniff: xcto, frameProtection: frame, hsts }));

  // Hygiène : lang, charset, favicon, Open Graph (0,5 pt chacun, arrondi).
  const lang = /<html[^>]+lang\s*=\s*["'][a-z]/i.test(html);
  const charset = /<meta[^>]+charset/i.test(head) || /charset=/i.test(headers.get("content-type") || "");
  const favicon = /<link[^>]+rel=["'][^"']*icon[^"']*["']/i.test(head);
  const og = /<meta[^>]+property=["']og:/i.test(head);
  const hygCount = [lang, charset, favicon, og].filter(Boolean).length;
  checks.push(check("hygiene", "technique",
    hygCount === 4 ? "ok" : hygCount >= 2 ? "warn" : "fail",
    Math.floor(hygCount / 2), 2, { lang, charset, favicon, openGraph: og }));

  // Poids du HTML + ressources référencées (approximation déclarée).
  const resources =
    [...html.matchAll(/<script[^>]+src=/gi)].length +
    [...html.matchAll(/<link[^>]+rel=["']stylesheet["']/gi)].length +
    imgs.length;
  const kb = Math.round(fullHtml.length / 1024);
  checks.push(check("poids", "technique",
    kb <= 200 ? "ok" : kb <= 600 ? "warn" : "fail",
    kb <= 200 ? 1 : 0, 1, { htmlKb: kb, resources, truncated }));

  return { checks };
}

// ---------------------------------------------------------------------------
// Phase 4 : vraie 404 (3 points)
// ---------------------------------------------------------------------------

export async function phaseNotFound(origin) {
  // Chemin déterministe et improbable : le statut FINAL après redirections
  // doit être 404 (ou 410). Un 200 est un soft-404, le défaut que Google
  // généralise ensuite à des pages légitimes.
  const probe = `${origin}/verification-404-outil-mkz-audit/`;
  let status = 0;
  try {
    const res = await follow(probe);
    status = res.final ? res.final.status : 0;
  } catch {
    status = 0;
  }
  const ok = status === 404 || status === 410;
  const soft = status === 200;
  return {
    checks: [
      check("vraie-404", "technique", ok ? "ok" : soft ? "fail" : "warn", ok ? 3 : 0, 3, { probe, status, soft }),
    ],
  };
}

// ---------------------------------------------------------------------------
// Phase 5 : autorité et positions Google via DataForSEO (30 points, Tier 1).
//
// Deux appels par domaine, coût RELEVÉ sur le champ `cost` des réponses le
// 03/09/2026 : backlinks/summary/live 0,024 USD, dataforseo_labs/google/
// domain_rank_overview/live 0,012 USD, soit 0,036 USD par domaine mesuré.
// Garde-fous, dans l'ordre :
//   1. cache 24 h par domaine : une lecture par domaine et par jour, quel que
//      soit le nombre de scans ;
//   2. plafond quotidien DUR de domaines lus (ctx.maxParJour, variable
//      AUDIT_TIER1_MAX_JOUR de wrangler.toml, compteur dans le KV AUDIT_QUOTA) :
//      au-delà, les 4 checks sortent en "na" avec la raison "quota" et le scan
//      continue sans ce bloc ;
//   3. identifiants absents, API en erreur ou délai dépassé : "na" avec la
//      raison, jamais une estimation à la place.
// Ce que ces chiffres SONT : une lecture de la base DataForSEO au moment du
// test (liens entrants connus, positions relevées sur Google France, trafic
// ESTIMÉ par DataForSEO). Pas une mesure faite sur le site du visiteur : le
// front le dit à chaque ligne, parce qu'aucun site ne peut mesurer lui-même
// qui le cite.
// ---------------------------------------------------------------------------

// Barème figé et versionné. Chaque échelle se lit de haut en bas : le premier
// seuil (inclusif) atteint donne les points et le statut. Version 1, posée le
// 03/09/2026 sur des ordres de grandeur d'artisans et de TPE (5 à 30 domaines
// référents, 10 à 50 mots-clés pour un site local qui travaille). Changer un
// seuil change le score de tous les visiteurs : incrémenter la version.
export const BAREME_AUTORITE = {
  version: "1 (2026-09-03)",
  // referring_main_domains (DataForSEO backlinks/summary)
  domainesReferents: [[100, 10, "ok"], [20, 8, "ok"], [5, 6, "warn"], [1, 3, "warn"], [0, 0, "fail"]],
  // backlinks_spam_score, 0 à 100 : plus il est bas, mieux c'est.
  spamScore: [[51, 0, "fail"], [31, 1, "warn"], [16, 3, "warn"], [0, 5, "ok"]],
  // metrics.organic.count : mots-clés du top 100 de Google France (Labs)
  motsCles: [[200, 10, "ok"], [50, 8, "ok"], [10, 6, "warn"], [1, 3, "warn"], [0, 0, "fail"]],
  // metrics.organic.etv : visites mensuelles estimées depuis Google France
  traficEstime: [[1000, 5, "ok"], [100, 4, "ok"], [10, 3, "warn"], [1, 1, "warn"], [0, 0, "fail"]],
};

export function noter(echelle, valeur) {
  for (const [seuil, points, statut] of echelle) {
    if (valeur >= seuil) return { points, statut };
  }
  const dernier = echelle[echelle.length - 1];
  return { points: dernier[1], statut: dernier[2] };
}

const DFS_API = "https://api.dataforseo.com/v3";
const CACHE_TTL_S = 24 * 3600;
const QUOTA_TTL_S = 48 * 3600;
export const TIER1_MAX_JOUR_DEFAUT = 50;

// Magasin du compteur et du cache : le KV lié (plafond dur, partagé par tous
// les isolats) ou, à défaut, une Map en mémoire bornée à l'isolat courant et
// remise à zéro à chaque recyclage : approchée, donc pas un plafond dur.
const memoire = new Map();
function magasin(kv) {
  if (kv && typeof kv.get === "function" && typeof kv.put === "function") {
    return {
      dur: true,
      get: (k) => kv.get(k, "json"),
      put: (k, v, ttl) => kv.put(k, JSON.stringify(v), { expirationTtl: ttl }),
    };
  }
  return {
    dur: false,
    get: async (k) => {
      const e = memoire.get(k);
      if (!e) return null;
      if (e.expire < Date.now()) {
        memoire.delete(k);
        return null;
      }
      return e.value;
    },
    put: async (k, v, ttl) => {
      memoire.set(k, { value: v, expire: Date.now() + ttl * 1000 });
    },
  };
}

// Un appel Live DataForSEO : une tâche, réponse normalisée { result, cost }
// ou { error, code, cost }. Le coût est relevé sur la réponse, jamais supposé.
async function dfsPost(chemin, tache, auth) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${DFS_API}${chemin}`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${auth.login}:${auth.password}`),
        "Content-Type": "application/json",
        "User-Agent": UA,
      },
      body: JSON.stringify([tache]),
      signal: ctl.signal,
    });
    if (res.status !== 200) return { error: "http", code: res.status, cost: 0 };
    const json = await res.json();
    const t = json && Array.isArray(json.tasks) ? json.tasks[0] : null;
    if (!t) return { error: "api", code: (json && json.status_code) || null, cost: 0 };
    if (t.status_code !== 20000) return { error: "api", code: t.status_code, cost: Number(t.cost) || 0 };
    return { result: Array.isArray(t.result) && t.result[0] ? t.result[0] : null, cost: Number(t.cost) || 0 };
  } catch (e) {
    return { error: e && e.name === "AbortError" ? "timeout" : "reseau", code: null, cost: 0 };
  } finally {
    clearTimeout(timer);
  }
}

function naAutorite(reason, extra = {}) {
  const d = { reason, ...extra };
  return [
    check("domaines-referents", "autorite", "na", 0, 10, d),
    check("spam-score", "autorite", "na", 0, 5, d),
    check("mots-cles", "autorite", "na", 0, 10, d),
    check("trafic-estime", "autorite", "na", 0, 5, d),
  ];
}

// ctx : { login, password, kv, maxParJour, force }
export async function phaseAutorite(origin, ctx = {}) {
  const host = new URL(origin).hostname.toLowerCase().replace(/^www\./, "");
  if (!ctx.login || !ctx.password) return { checks: naAutorite("non-configure"), cost: 0 };

  const store = magasin(ctx.kv);
  const cleCache = `autorite:v1:${host}`;
  const enCache = ctx.force ? null : await store.get(cleCache);
  if (enCache && Array.isArray(enCache.checks)) {
    return {
      checks: enCache.checks.map((c) => ({ ...c, data: { ...c.data, cache: true } })),
      cost: 0,
      cache: true,
    };
  }

  // Plafond du jour (UTC) : lu puis incrémenté AVANT l'appel, un échec
  // consomme donc le crédit, jamais l'inverse. Lecture puis écriture non
  // atomiques : à quelques unités près sous scans simultanés, ce qui suffit
  // à ce volume.
  const max = Number(ctx.maxParJour) > 0 ? Number(ctx.maxParJour) : TIER1_MAX_JOUR_DEFAUT;
  const jour = new Date().toISOString().slice(0, 10);
  const cleQuota = `tier1:${jour}`;
  const deja = Number(await store.get(cleQuota)) || 0;
  if (deja >= max) {
    return { checks: naAutorite("quota", { jour }), cost: 0, quota: { jour, deja, max, dur: store.dur } };
  }
  await store.put(cleQuota, deja + 1, QUOTA_TTL_S);

  const auth = { login: ctx.login, password: ctx.password };
  const [liens, positions] = await Promise.all([
    dfsPost(
      "/backlinks/summary/live",
      {
        target: host,
        include_subdomains: true,
        exclude_internal_backlinks: true,
        backlinks_status_type: "live",
        internal_list_limit: 1,
      },
      auth
    ),
    dfsPost(
      "/dataforseo_labs/google/domain_rank_overview/live",
      {
        target: host,
        location_code: 2250, // France
        language_code: "fr",
        ignore_synonyms: true,
      },
      auth
    ),
  ]);
  const cost = liens.cost + positions.cost;
  const releve = new Date().toISOString();
  const source = "DataForSEO";
  const checks = [];

  if (liens.error) {
    const d = { reason: liens.error, code: liens.code };
    checks.push(check("domaines-referents", "autorite", "na", 0, 10, d));
    checks.push(check("spam-score", "autorite", "na", 0, 5, d));
  } else {
    // Domaine inconnu de la base : result null, compté 0 et signalé `inconnu`.
    const r = liens.result || {};
    const domaines = Number(r.referring_main_domains) || 0;
    const backlinks = Number(r.backlinks) || 0;
    const spam = Number(r.backlinks_spam_score) || 0;
    const nd = noter(BAREME_AUTORITE.domainesReferents, domaines);
    checks.push(
      check("domaines-referents", "autorite", nd.statut, nd.points, 10, {
        domaines,
        backlinks,
        sousDomaines: Number(r.referring_domains) || 0,
        rang: r.rank ?? null,
        premierLien: r.first_seen ? String(r.first_seen).slice(0, 10) : null,
        inconnu: !liens.result,
        releve,
        source,
      })
    );
    if (backlinks === 0) {
      // Rien à noter : pas de lien, pas de spam. "na" et hors du total,
      // plutôt que 5 points offerts ou 0 point infligé deux fois.
      checks.push(check("spam-score", "autorite", "na", 0, 5, { reason: "sans-liens", releve, source }));
    } else {
      const ns = noter(BAREME_AUTORITE.spamScore, spam);
      checks.push(check("spam-score", "autorite", ns.statut, ns.points, 5, { spam, backlinks, releve, source }));
    }
  }

  if (positions.error) {
    const d = { reason: positions.error, code: positions.code };
    checks.push(check("mots-cles", "autorite", "na", 0, 10, d));
    checks.push(check("trafic-estime", "autorite", "na", 0, 5, d));
  } else {
    // Domaine sans position connue : items vide (mesuré sur
    // seo-referencement.fr le 20/08/2026), compté 0 et signalé `inconnu`.
    const item = positions.result && Array.isArray(positions.result.items) ? positions.result.items[0] : null;
    const org = (item && item.metrics && item.metrics.organic) || {};
    const motsCles = Number(org.count) || 0;
    const top3 = (Number(org.pos_1) || 0) + (Number(org.pos_2_3) || 0);
    const top10 = top3 + (Number(org.pos_4_10) || 0);
    const trafic = Math.round(Number(org.etv) || 0);
    const nm = noter(BAREME_AUTORITE.motsCles, motsCles);
    checks.push(
      check("mots-cles", "autorite", nm.statut, nm.points, 10, {
        motsCles,
        top10,
        top3,
        inconnu: !item,
        pays: "France",
        releve,
        source,
      })
    );
    const nt = noter(BAREME_AUTORITE.traficEstime, trafic);
    checks.push(
      check("trafic-estime", "autorite", nt.statut, nt.points, 5, {
        trafic,
        inconnu: !item,
        pays: "France",
        releve,
        source,
      })
    );
  }

  // Seule une lecture complète entre au cache : une réponse partielle se
  // retente au scan suivant (et reconsomme un crédit, c'est voulu).
  const complete = checks.every((c) => c.status !== "na" || c.data.reason === "sans-liens");
  if (complete) await store.put(cleCache, { checks, releve }, CACHE_TTL_S);

  return { checks, cost, quota: { jour, deja: deja + 1, max, dur: store.dur } };
}

// ---------------------------------------------------------------------------
// Orchestration : une phase par appel HTTP du front.
// ---------------------------------------------------------------------------

export async function runPhase(phase, params) {
  switch (phase) {
    case "origin":
      return phaseOrigin(params.url, Boolean(params.self));
    case "robots":
      return phaseRobots(params.origin);
    case "page":
      return phasePage(params.origin);
    case "notfound":
      return phaseNotFound(params.origin);
    case "autorite":
      return phaseAutorite(params.origin, params.ctx || {});
    default:
      return { error: "phase" };
  }
}
