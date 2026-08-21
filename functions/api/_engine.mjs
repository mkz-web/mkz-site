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
// Découpage en 4 phases, une requête HTTP du front par phase, pour rester loin
// des limites CPU des Workers et donner au visiteur une progression réelle :
//   1 origin    : normalisation + les 4 variantes http/https x www/apex
//   2 robots    : robots.txt live, crawlers IA, llms.txt, sitemap
//   3 page      : la page d'accueil (balises, JSON-LD, en-têtes, indexabilité)
//   4 notfound  : vraie 404 contre soft-404

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
// Tier 1 (S2) : autorité et positions via DataForSEO. Stub honnête en S1 :
// "na" et zéro point comptabilisé, le front l'affiche comme "à venir".
// ---------------------------------------------------------------------------

export function phaseAuthorityStub() {
  return {
    checks: [
      check("domaines-referents", "autorite", "na", 0, 10, {}),
      check("spam-score", "autorite", "na", 0, 5, {}),
      check("mots-cles", "autorite", "na", 0, 10, {}),
      check("trafic-estime", "autorite", "na", 0, 5, {}),
    ],
  };
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
    case "notfound": {
      const nf = await phaseNotFound(params.origin);
      // Dernière phase : on joint le stub autorité pour que le front affiche
      // le bloc complet avec son état "à venir".
      return { checks: [...nf.checks, ...phaseAuthorityStub().checks] };
    }
    default:
      return { error: "phase" };
  }
}
