"use client";

// Formulaire de la page contact à la nouvelle charte : balisage de la maquette codée
// (20/10/2026), branché sur la même logique que ContactForm.tsx (Web3Forms, même clé publique,
// sujet préfixé, événement GA4 « envoi_contact », sujet prérempli par /contact/?sujet=...).
// Le retour (envoi, succès, erreur) s'affiche dans le paragraphe .formulaire__retour de la
// maquette ; le formulaire reste en place et se vide après un envoi réussi.

import { useEffect, useRef, useState } from "react";
import { ui, type Locale } from "@/lib/i18n";
import { gaEvent } from "@/lib/ga";

const WEB3FORMS_KEY = "5f80cd7f-a0fb-484c-995c-a6a1a5534c34";

export default function FormulaireContact({ locale = "fr" }: { locale?: Locale }) {
  const t = ui[locale].contact.form;
  // Libellés : ceux de la maquette en français, ceux du dictionnaire en anglais (22/10/2026)
  const l =
    locale === "en"
      ? { nom: t.name, nomEx: t.namePlaceholder, email: t.email, emailEx: t.emailPlaceholder, sujet: t.subject, sujetEx: t.subjectPlaceholder, message: t.message, messageEx: t.messagePlaceholder, envoyer: t.submit }
      : { nom: "Nom complet", nomEx: "Jean Dupont", email: "Email", emailEx: "jean@exemple.fr", sujet: "Sujet", sujetEx: "Nouveau projet web", message: "Message", messageEx: "Décrivez votre projet...", envoyer: "Envoyer le message" };
  const [etat, setEtat] = useState<"repos" | "envoi" | "succes" | "erreur">("repos");
  const sujetRef = useRef<HTMLInputElement>(null);

  // Un lien peut préremplir le sujet : /contact/?sujet=... (test gratuit de /tarifs/).
  useEffect(() => {
    const sujet = new URLSearchParams(window.location.search).get("sujet");
    if (sujet && sujetRef.current && !sujetRef.current.value) sujetRef.current.value = sujet.slice(0, 120);
  }, []);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: d.nom,
          email: d.email,
          subject: t.mailSubjectPrefix + (d.sujet || t.defaultSubject),
          message: d.message,
          from_name: "MKZ Site Web",
        }),
      });
      const resultat = await res.json();
      if (resultat.success) {
        setEtat("succes");
        gaEvent("envoi_contact");
        form.reset();
      } else {
        console.error("Web3Forms error:", resultat);
        setEtat("erreur");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setEtat("erreur");
    }
  }

  const retour =
    etat === "envoi" ? t.sending : etat === "succes" ? t.successTitle + " " + t.successText : etat === "erreur" ? t.errorText : "";

  return (
    <>
      <form onSubmit={envoyer}>
        <div className="formulaire__grille">
          <p className="champ"><label htmlFor="nom">{l.nom}</label><input id="nom" name="nom" type="text" autoComplete="name" placeholder={l.nomEx} required /></p>
          <p className="champ"><label htmlFor="email">{l.email}</label><input id="email" name="email" type="email" autoComplete="email" placeholder={l.emailEx} required /></p>
          <p className="champ champ--large"><label htmlFor="sujet">{l.sujet}</label><input ref={sujetRef} id="sujet" name="sujet" type="text" placeholder={l.sujetEx} required /></p>
          <p className="champ champ--large"><label htmlFor="message">{l.message}</label><textarea id="message" name="message" placeholder={l.messageEx} required></textarea></p>
        </div>
        <button className="bouton bouton--plein" type="submit" disabled={etat === "envoi"}>{l.envoyer}</button>
      </form>
      <p className="formulaire__retour" role="status" aria-live="polite">{retour}</p>
    </>
  );
}
