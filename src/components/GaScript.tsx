import Script from "next/script";

// Google Analytics 4 (propriété 480932780 « mkz-consulting.fr », flux web 10345084267), chargé
// UNIQUEMENT après consentement, sur le modèle exact de ClarityScript.tsx.
//
// Pourquoi pas le snippet officiel tel quel : le HTML est statique (output:
// "export"), un script inline s'exécute au parse, avant que l'autoblocking du
// bandeau hu-manity (afterInteractive) ait posé ses hooks. gtag.js partirait
// donc sans consentement au premier affichage. Ici, rien n'est injecté tant que
// la catégorie 4 (mesure d'audience, la même que Clarity) n'est pas accordée.
//
// Contrat du bandeau, mesuré dans hu-banner.min.js le 05/08/2026 :
// - cookie « hu-consent » : JSON {categories:{1:bool,2:bool,3:bool,4:bool}} ;
// - à chaque choix, document.dispatchEvent(CustomEvent("set-consent.hu",
//   {detail})) avec le même objet en detail.
//
// Consent Mode v2 : comme le tag n'est injecté qu'APRÈS acceptation, le
// « default » est posé à granted pour analytics_storage et denied pour tout ce
// qui est publicitaire (le site n'a aucune pub, pas de Google Signals).
//
// Durée des cookies _ga et _ga_<flux> : 13 mois (33 696 000 s), plafond CNIL,
// au lieu des 2 ans par défaut de GA4.
//
// Retrait du consentement : consent update à denied, window["ga-disable-ID"]
// à true (gtag n'envoie plus rien, API documentée), et effacement des cookies
// _ga* sur l'hôte et sur le domaine nu. Le prochain chargement ne charge rien.
//
// ⚠️ Toute nouvelle ressource externe passe par la CSP de public/_headers :
// www.googletagmanager.com (script, img, connect) et *.google-analytics.com,
// *.analytics.google.com (connect, img) y sont déclarés. Contrôler la console
// après tout changement ici.
const GA_ID = "G-YE680NFBYZ";

const gaLoader = `(function () {
  var w = window, d = document, loaded = false;
  var ID = "${GA_ID}";
  var CATEGORY = 4;
  function consented() {
    var m = d.cookie.match(/(?:^|;\\s*)hu-consent=([^;]*)/);
    if (!m) return false;
    var raw = m[1];
    try { raw = decodeURIComponent(raw); } catch (e) {}
    try {
      var c = JSON.parse(raw);
      return !!(c && c.categories && c.categories[CATEGORY]);
    } catch (e) { return false; }
  }
  function gtag() { (w.dataLayer = w.dataLayer || []).push(arguments); }
  function load() {
    w["ga-disable-" + ID] = false;
    if (loaded) { gtag("consent", "update", { analytics_storage: "granted" }); return; }
    loaded = true;
    w.dataLayer = w.dataLayer || [];
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted"
    });
    gtag("js", new Date());
    gtag("config", ID, {
      cookie_expires: 33696000,
      cookie_flags: "SameSite=Lax;Secure",
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = d.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
    var f = d.getElementsByTagName("script")[0];
    if (f && f.parentNode) { f.parentNode.insertBefore(s, f); } else { d.head.appendChild(s); }
  }
  function halt() {
    if (!loaded) return;
    gtag("consent", "update", { analytics_storage: "denied" });
    w["ga-disable-" + ID] = true;
    var names = d.cookie.split(";").map(function (c) { return c.split("=")[0].trim(); })
      .filter(function (n) { return n === "_ga" || n.indexOf("_ga_") === 0; });
    var bare = location.hostname.replace(/^www\\./, "");
    names.forEach(function (n) {
      d.cookie = n + "=; Max-Age=0; path=/";
      d.cookie = n + "=; Max-Age=0; path=/; domain=" + location.hostname;
      d.cookie = n + "=; Max-Age=0; path=/; domain=." + bare;
    });
  }
  if (consented()) load();
  d.addEventListener("set-consent.hu", function (e) {
    var c = e && e.detail && e.detail.categories;
    if (!c) return;
    if (c[CATEGORY]) load(); else halt();
  });
})();`;

export default function GaScript() {
  return (
    <Script id="ga4-consent-loader" strategy="afterInteractive">
      {gaLoader}
    </Script>
  );
}
