import Script from "next/script";

// Microsoft Clarity (projet xxtffll8xk), chargé UNIQUEMENT après consentement.
//
// Pourquoi pas le snippet officiel tel quel : le HTML est statique (output:
// "export"), un script inline s'exécute au parse, avant que le bandeau (un
// composant React monté après hydratation) ait pu recueillir un choix. Clarity
// partirait donc sans consentement au premier affichage.
//
// Contrat du bandeau maison (src/lib/consent.ts, depuis le 21/08/2026) :
// - cookie « mkz-consent » : JSON encodé {v:1, id, date, audience:bool} ;
// - à chaque choix, document.dispatchEvent(CustomEvent("mkz-consent",
//   {detail:{audience:bool}})).
// Jusqu'au 21/08/2026 : bandeau hu-manity, cookie « hu-consent », catégorie 4.
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
  function consented() {
    var m = d.cookie.match(/(?:^|;\\s*)mkz-consent=([^;]*)/);
    if (!m) return false;
    var raw = m[1];
    try { raw = decodeURIComponent(raw); } catch (e) {}
    try {
      var c = JSON.parse(raw);
      return !!(c && c.v === 1 && c.audience === true);
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
  d.addEventListener("mkz-consent", function (e) {
    var dt = e && e.detail;
    if (!dt || typeof dt.audience !== "boolean") return;
    if (dt.audience) load(); else halt();
  });
})();`;

export default function ClarityScript() {
  return (
    <Script id="clarity-consent-loader" strategy="afterInteractive">
      {clarityLoader}
    </Script>
  );
}
