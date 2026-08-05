import Script from "next/script";

// Microsoft Clarity (projet xxtffll8xk), chargé UNIQUEMENT après consentement.
//
// Pourquoi pas le snippet officiel tel quel : le HTML est statique (output:
// "export"), un script inline s'exécute au parse, avant que le moteur
// d'autoblocking du bandeau hu-manity (chargé en afterInteractive) ait posé ses
// hooks. Clarity partirait donc sans consentement au premier affichage, et
// l'autoblocking ne sait pas rattraper un script déjà exécuté.
//
// Contrat mesuré dans hu-banner.min.js le 05/08/2026 :
// - cookie « hu-consent » : JSON {categories:{1:bool,2:bool,3:bool,4:bool}} ;
// - à chaque choix, document.dispatchEvent(CustomEvent("set-consent.hu",
//   {detail})) avec le même objet en detail ;
// - la table de vendors du bandeau classe Clarity (clarity.ms/tag/) en
//   catégorie 4 : c'est donc elle qui fait foi ici aussi. Si le bandeau
//   reclasse Clarity un jour, aligner CLARITY_CATEGORY.
//
// Clarity applique son Consent Mode au trafic EEA (obligatoire depuis le
// 31/10/2025) : sans signal explicite via son Consent API, il tourne en mode
// dégradé, sans cookie ni suivi de session (mesuré en local le 05/08/2026 :
// tag chargé mais aucun _clck/_clsk posé tant que consentv2 n'est pas envoyé).
// Comme ce chargeur n'injecte le tag qu'APRÈS acceptation dans le bandeau, il
// envoie consentv2 "granted" dans la même passe, via la file du stub.
//
// Retrait du consentement : clarity("consent", false), l'API documentée qui
// efface les cookies Clarity et coupe le suivi jusqu'à un nouveau
// consentement ; le prochain chargement de page ne charge plus rien.
const clarityLoader = `(function () {
  var w = window, d = document, loaded = false;
  var TAG = "https://www.clarity.ms/tag/xxtffll8xk";
  var CLARITY_CATEGORY = 4;
  function consented() {
    var m = d.cookie.match(/(?:^|;\\s*)hu-consent=([^;]*)/);
    if (!m) return false;
    var raw = m[1];
    try { raw = decodeURIComponent(raw); } catch (e) {}
    try {
      var c = JSON.parse(raw);
      return !!(c && c.categories && c.categories[CLARITY_CATEGORY]);
    } catch (e) { return false; }
  }
  function signalGranted() {
    w.clarity("consentv2", { ad_Storage: "granted", analytics_Storage: "granted" });
  }
  function load() {
    if (loaded) { signalGranted(); return; }
    loaded = true;
    w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments); };
    signalGranted();
    var s = d.createElement("script");
    s.async = true;
    s.src = TAG;
    var f = d.getElementsByTagName("script")[0];
    if (f && f.parentNode) { f.parentNode.insertBefore(s, f); } else { d.head.appendChild(s); }
  }
  function halt() {
    if (loaded && typeof w.clarity === "function") w.clarity("consent", false);
  }
  if (consented()) load();
  d.addEventListener("set-consent.hu", function (e) {
    var c = e && e.detail && e.detail.categories;
    if (!c) return;
    if (c[CLARITY_CATEGORY]) load(); else halt();
  });
})();`;

export default function ClarityScript() {
  return (
    <Script id="clarity-consent-loader" strategy="afterInteractive">
      {clarityLoader}
    </Script>
  );
}
