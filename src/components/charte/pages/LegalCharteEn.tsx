// Pages légales anglaises à la nouvelle charte (22/10/2026) : gabarit des pages légales de la
// maquette codée du 20/10/2026 (en-tête sobre, sommaire collant, colonne de lecture), textes
// repris à l'identique de LegalContentEn.tsx.
//
// ⚠️ Traductions de courtoisie : la version française fait foi (LCEN et RGPD s'appliquent à une
// société française), chaque page le dit et pointe vers l'originale. Hébergeur : Cloudflare
// Pages, aligné sur les pages françaises ; la LCEN art. 6-III-1 d) impose son nom, son adresse ET
// son téléphone : ne pas retirer la ligne « Phone ». Les liens vers les pages françaises sont des
// <a> simples (autre root layout).
import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import ChartePage from "../ChartePage";
import "../metier.css";
import "../pages.css";

type Section = { id: string; titre: string; contenu: ReactNode };

function PageLegale({ chemin, titre, intro, sections }: { chemin: string; titre: string; intro: ReactNode; sections: Section[] }) {
  return (
    <ChartePage chemin={chemin} classes="page-annexe page-clair" locale="en">
      {/* EN-TÊTE · sobre et centré, comme les articles */}
      <header className="legal-tete" data-theme="clair">
        <div className="enveloppe legal-tete__in">
          <nav className="ariane" aria-label="Breadcrumb"><Link href="/en/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">{titre}</span></nav>
          <h1>{titre}</h1>
          <p className="legal-tete__intro">{intro}</p>
        </div>
      </header>

      {/* CORPS · sommaire collant à gauche, colonne de lecture à droite (gabarit des articles) */}
      <div className="enveloppe art-corps">
        <aside className="art-cote">
          <nav className="art-sommaire" aria-label="On this page"><details open><summary>On this page</summary><ol>
            {sections.map((s) => <li key={s.id}><a href={"#" + s.id}>{s.titre}</a></li>)}
          </ol></details></nav>
        </aside>
        <div className="lecture legal-texte">
          {sections.map((s) => (
            <Fragment key={s.id}>
              <h2 id={s.id}>{s.titre}</h2>
              {s.contenu}
            </Fragment>
          ))}
        </div>
      </div>
    </ChartePage>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function LegalNoticeCharteEn() {
  return (
    <PageLegale
      chemin="/en/legal-notice/"
      titre="Legal notice"
      intro={<>This is a courtesy translation. The <a href="/mentions-legales/" hrefLang="fr" lang="fr">French version</a> is the legally binding one, as MKZ is a French company subject to French law.</>}
      sections={[
        {
          id: "site-publisher",
          titre: "Site publisher",
          contenu: (
            <div className="legal-fiche">
              <p><strong>MKZ</strong>, SAS à associé unique (single-shareholder simplified joint-stock company), share capital €1,000</p>
              <p>SIRET: 983 662 784 00013</p>
              <p>Trade register: RCS Meaux 983 662 784, France</p>
              <p>EU VAT number: FR44983662784</p>
              <p>Activity: IT systems and software consulting</p>
              <p>Registered office: 1 rue Françoise Sagan, 77230 Dammartin-en-Goële, France</p>
              <p>Phone: +33 7 69 09 39 09</p>
              <p>Email: <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></p>
              <p>Publication director: Mickaël Leclerc, President</p>
            </div>
          ),
        },
        {
          id: "hosting",
          titre: "Hosting",
          contenu: (
            <div className="legal-fiche">
              <p><strong>Cloudflare, Inc.</strong> (Cloudflare Pages)</p>
              <p>101 Townsend St, San Francisco, CA 94107, United States</p>
              <p>Phone: +1 650 319 8930</p>
              <p>Website: <a href="https://www.cloudflare.com" {...ext}>www.cloudflare.com</a></p>
            </div>
          ),
        },
        {
          id: "intellectual-property",
          titre: "Intellectual property",
          contenu: (
            <p>All content on this site (text, images, graphics, logo, icons, audio, software) is the exclusive property of MKZ, with the exception of trademarks, logos or content belonging to partner companies or other authors. Any reproduction, distribution, modification, adaptation, retransmission or publication of these elements is strictly prohibited without the prior written consent of MKZ.</p>
          ),
        },
        {
          id: "personal-data",
          titre: "Personal data",
          contenu: (
            <p>Information collected through the contact form is intended solely for MKZ and is used only to answer your enquiry. Under the General Data Protection Regulation (GDPR), you have the right to access, correct and delete data concerning you. To exercise that right, contact us at <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a>. Full detail is in the <Link href="/en/privacy-policy/">privacy policy</Link>.</p>
          ),
        },
        {
          id: "cookies",
          titre: "Cookies",
          contenu: (
            <p>With your consent, this site uses Google Analytics 4 and Microsoft Clarity for audience measurement. Unless you accept it in the cookie banner, only technical cookies strictly necessary for the site to function are used. Details are in the <Link href="/en/privacy-policy/">privacy policy</Link>.</p>
          ),
        },
      ]}
    />
  );
}

export function PrivacyCharteEn() {
  return (
    <PageLegale
      chemin="/en/privacy-policy/"
      titre="Privacy policy"
      intro={<>This is a courtesy translation. The <a href="/politique-confidentialite/" hrefLang="fr" lang="fr">French version</a> is the legally binding one, as MKZ is a French company subject to the GDPR under French supervision.</>}
      sections={[
        {
          id: "data-controller",
          titre: "Data controller",
          contenu: (
            <div className="legal-fiche">
              <p><strong>MKZ</strong>, SAS à associé unique, SIRET 983 662 784 00013</p>
              <p>1 rue Françoise Sagan, 77230 Dammartin-en-Goële, France</p>
              <p>Contact: <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a></p>
            </div>
          ),
        },
        {
          id: "data-we-collect",
          titre: "Data we collect",
          contenu: (
            <>
              <p>Only what you send us yourself: your name, your email address, the subject and the content of your message through the contact form, plus your name and email address if you book a slot. The free SEO audit tool only asks for a public website address; your email is collected there solely if you request the full report and tick the consent box, together with the address of the site scanned. No account, no profiling, no data bought from third parties.</p>
              <p>With your consent, given through the cookie banner, we also measure how the site is used (pages viewed, clicks, scrolling) with Google Analytics 4 and Microsoft Clarity, in order to improve it. Until you accept, these tools are not loaded and no usage data is collected (see the Cookies section below).</p>
            </>
          ),
        },
        {
          id: "why-we-process-it",
          titre: "Why we process it",
          contenu: <p>To answer your enquiry, to send you the audit report you asked for and follow up about it and, where relevant, to prepare a proposal. Nothing else. Your data is never used for advertising and never sold.</p>,
        },
        {
          id: "legal-basis",
          titre: "Legal basis",
          contenu: <p>Your consent, given when you submit the contact form or when you accept audience measurement in the cookie banner (GDPR Article 6.1.a), and our legitimate interest in answering a business enquiry (Article 6.1.f).</p>,
        },
        {
          id: "how-long-we-keep-it",
          titre: "How long we keep it",
          contenu: <p>Three years from our last contact, after which the data is deleted. If you ask us to delete it sooner, we do so on request.</p>,
        },
        {
          id: "who-else-sees-it",
          titre: "Who else sees it",
          contenu: (
            <>
              <p>Four processors, and no one else. Your data is never sold.</p>
              <p><strong>Cloudflare, Inc.</strong> hosts and delivers the site (United States). <strong>Web3Forms</strong> (Web3Creative) transmits contact form submissions and audit report requests, and nothing else (India). <strong>Calendly LLC</strong> handles online booking if you reserve a slot (United States). <strong>Microsoft Corporation</strong> processes audience measurement data through Microsoft Clarity, only after your consent (United States). <strong>Google Ireland Limited</strong> processes audience measurement data through Google Analytics 4, only after your consent (Ireland, with possible transfer to Google LLC in the United States).</p>
            </>
          ),
        },
        {
          id: "transfers-outside-the-eu",
          titre: "Transfers outside the European Union",
          contenu: (
            <>
              <p>Four of the five processors are established outside the EU, and Google Ireland Limited may transfer Analytics data to Google LLC in the United States, so using this site involves transferring personal data outside the European Union. These transfers rely on the safeguards set out in Chapter V of the GDPR: a data processing agreement with each processor (Article 28), and the European Commission&rsquo;s Standard Contractual Clauses (Article 46).</p>
              <p>Cloudflare, Calendly, Microsoft and Google LLC are additionally certified under the EU&nbsp;-&nbsp;US Data Privacy Framework, covered by the European Commission adequacy decision of 10&nbsp;July 2023 (Article 45). India has no adequacy decision, so the Standard Contractual Clauses are the sole basis for the transfer to Web3Forms. Details are in{" "}
                <a href="https://www.cloudflare.com/trust-hub/gdpr/" {...ext}>Cloudflare&rsquo;s compliance hub</a>,{" "}
                <a href="https://web3forms.com/dpa" {...ext}>the Web3Forms DPA</a>,{" "}
                <a href="https://calendly.com/legal/data-processing-addendum" target="_blank" rel="noopener noreferrer nofollow">the Calendly DPA</a>,{" "}
                <a href="https://privacy.microsoft.com/en-us/privacystatement" {...ext}>the Microsoft privacy statement</a> and{" "}
                <a href="https://business.safety.google/adsprocessorterms/" {...ext}>the Google data processing terms</a>.</p>
            </>
          ),
        },
        {
          id: "your-rights",
          titre: "Your rights",
          contenu: <p>You have the right to access, correct, delete, restrict and port your data, and to object to its processing. Email <a href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</a> and we will answer within 30 days. You may also lodge a complaint with the CNIL, the French data protection authority, at <a href="https://www.cnil.fr" {...ext}>www.cnil.fr</a>.</p>,
        },
        {
          id: "cookies",
          titre: "Cookies",
          contenu: (
            <>
              <p>With your <strong>consent</strong>, this site uses two audience measurement tools that analyse how visitors use the site (pages viewed, clicks, scrolling) in order to improve it: <strong>Google Analytics 4</strong>, which sets the _ga and _ga_* cookies (13-month lifetime, IP address not stored, no advertising signal), and <strong>Microsoft Clarity</strong>, which sets _clck (one year), _clsk (one day) and MUID (one year).</p>
              <p>These cookies are only set if you accept the corresponding category in the banner shown on your first visit. Without your consent, these tools are not loaded and no measurement cookie is set. You can withdraw your consent at any time through the &ldquo;Manage cookies&rdquo; link in the footer: tracking then stops immediately. Your choice, consent or refusal, is kept for six months in a technical cookie (mkz-consent) with its date and a random identifier that serves as proof; after that, you are asked again.</p>
              <p>This site shows no advertising. Technical cookies strictly necessary for the site to function, including the storage of your consent choices, may be set without consent under the applicable rules.</p>
            </>
          ),
        },
        {
          id: "security",
          titre: "Security",
          contenu: <p>The site is served over HTTPS only and exported as static files, so there is no database holding your data on the site itself. Messages arrive in an access controlled mailbox.</p>,
        },
        {
          id: "changes",
          titre: "Changes",
          contenu: <p>This policy may be updated. The French version carries the authoritative wording and date of any change.</p>,
        },
      ]}
    />
  );
}
