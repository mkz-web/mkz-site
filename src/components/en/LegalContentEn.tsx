"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

// Pages légales anglaises (legal notice + privacy policy), en noindex comme
// leurs équivalents français.
//
// ⚠️ Ces pages sont des traductions de courtoisie : la version française fait
// foi juridiquement (LCEN et RGPD s'appliquent à une société française). Chaque
// page le dit explicitement et pointe vers l'originale.
//
// ⚠️ Hébergeur : Cloudflare Pages, conformément à AGENTS.md (« l'hébergement OVH
// est abandonné depuis juin 2026 »). Les pages françaises ont été corrigées le
// 30/07/2026 (commit 455a658, déployé en production) : elles annoncent désormais
// Cloudflare, Inc. Garder les deux langues alignées sur le même hébergeur.
//
// La LCEN art. 6-III-1 d) impose le nom, l'adresse ET le téléphone de
// l'hébergeur. Ne pas retirer la ligne « Phone » de la section Hosting.

const PageWrapper = styled.section`padding: 96px 24px; max-width: 680px; margin: 0 auto;`;
const Title = styled.h1`font-size: 36px; font-weight: 700; margin-bottom: 16px;`;
const Notice = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  border-left: 3px solid ${theme.colors.cta};
  padding-left: 16px;
  margin-bottom: 48px;

  a { color: ${theme.colors.accent}; text-decoration: underline; text-underline-offset: 3px; }
`;
const SectionTitle = styled.h2`font-size: 24px; font-weight: 600; margin-top: 40px; margin-bottom: 16px; color: ${theme.colors.text};`;
const Text = styled.p`font-size: 16.5px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 12px;`;
const InfoLine = styled.p`font-size: 16.5px; line-height: 1.7; color: ${theme.colors.text}; margin-bottom: 6px;`;
const Link = styled.a`color: ${theme.colors.accent};`;

export function LegalNoticeEn() {
  return (
    <PageWrapper>
      <Title>Legal notice</Title>
      <Notice>
        This is a courtesy translation. The{" "}
        <a href="/mentions-legales/">French version</a> is the legally binding one, as
        MKZ is a French company subject to French law.
      </Notice>

      <SectionTitle>Site publisher</SectionTitle>
      <InfoLine><strong>MKZ</strong>, SAS à associé unique (single-shareholder simplified joint-stock company)</InfoLine>
      <InfoLine>SIRET: 983 662 784 00013</InfoLine>
      <InfoLine>Trade register: RCS Meaux, France</InfoLine>
      <InfoLine>Activity: IT systems and software consulting</InfoLine>
      <InfoLine>Registered office: 1 rue Françoise Sagan, 77230 Dammartin-en-Goële, France</InfoLine>
      <InfoLine>Phone: +33 7 69 09 39 09</InfoLine>
      <InfoLine>
        Email: <Link href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</Link>
      </InfoLine>
      <InfoLine>Publication director: Mickaël Leclerc, President</InfoLine>

      <SectionTitle>Hosting</SectionTitle>
      <InfoLine><strong>Cloudflare, Inc.</strong> (Cloudflare Pages)</InfoLine>
      <InfoLine>101 Townsend St, San Francisco, CA 94107, United States</InfoLine>
      <InfoLine>Phone: +1 650 319 8930</InfoLine>
      <InfoLine>
        Website: <Link href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">www.cloudflare.com</Link>
      </InfoLine>

      <SectionTitle>Intellectual property</SectionTitle>
      <Text>
        All content on this site (text, images, graphics, logo, icons, audio, software) is
        the exclusive property of MKZ, with the exception of trademarks, logos or content
        belonging to partner companies or other authors. Any reproduction, distribution,
        modification, adaptation, retransmission or publication of these elements is
        strictly prohibited without the prior written consent of MKZ.
      </Text>

      <SectionTitle>Personal data</SectionTitle>
      <Text>
        Information collected through the contact form is intended solely for MKZ and is
        used only to answer your enquiry. Under the General Data Protection Regulation
        (GDPR), you have the right to access, correct and delete data concerning you. To
        exercise that right, contact us at{" "}
        <Link href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</Link>.
        Full detail is in the <a href="/en/privacy-policy/">privacy policy</a>.
      </Text>

      <SectionTitle>Cookies</SectionTitle>
      <Text>
        With your consent, this site uses Microsoft Clarity for audience measurement.
        Unless you accept it in the cookie banner, only technical cookies strictly
        necessary for the site to function are used. Details are in the{" "}
        <a href="/en/privacy-policy/">privacy policy</a>.
      </Text>
    </PageWrapper>
  );
}

export function PrivacyPolicyEn() {
  return (
    <PageWrapper>
      <Title>Privacy policy</Title>
      <Notice>
        This is a courtesy translation. The{" "}
        <a href="/politique-confidentialite/">French version</a> is the legally binding
        one, as MKZ is a French company subject to the GDPR under French supervision.
      </Notice>

      <SectionTitle>Data controller</SectionTitle>
      <InfoLine><strong>MKZ</strong>, SAS à associé unique, SIRET 983 662 784 00013</InfoLine>
      <InfoLine>1 rue Françoise Sagan, 77230 Dammartin-en-Goële, France</InfoLine>
      <InfoLine>
        Contact: <Link href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</Link>
      </InfoLine>

      <SectionTitle>Data we collect</SectionTitle>
      <Text>
        Only what you send us yourself: your name, your email address, the subject and the
        content of your message through the contact form, plus your name and email address
        if you book a slot. The free SEO audit tool only asks for a public website address;
        your email is collected there solely if you request the full report and tick the
        consent box, together with the address of the site scanned. No account, no
        profiling, no data bought from third parties.
      </Text>
      <Text>
        With your consent, given through the cookie banner, we also measure how the site is
        used (pages viewed, clicks, scrolling) with Microsoft Clarity, in order to improve
        it. Until you accept, the tool is not loaded and no usage data is collected (see the
        Cookies section below).
      </Text>

      <SectionTitle>Why we process it</SectionTitle>
      <Text>
        To answer your enquiry, to send you the audit report you asked for and follow up
        about it and, where relevant, to prepare a proposal. Nothing else. Your data is
        never used for advertising and never sold.
      </Text>

      <SectionTitle>Legal basis</SectionTitle>
      <Text>
        Your consent, given when you submit the contact form or when you accept audience
        measurement in the cookie banner (GDPR Article 6.1.a), and our legitimate interest
        in answering a business enquiry (Article 6.1.f).
      </Text>

      <SectionTitle>How long we keep it</SectionTitle>
      <Text>
        Three years from our last contact, after which the data is deleted. If you ask us
        to delete it sooner, we do so on request.
      </Text>

      <SectionTitle>Who else sees it</SectionTitle>
      <Text>
        Four processors, and no one else. Your data is never sold.
      </Text>
      <Text>
        <strong>Cloudflare, Inc.</strong> hosts and delivers the site (United States).{" "}
        <strong>Web3Forms</strong> (Web3Creative) transmits contact form submissions and
        audit report requests, and nothing else (India). <strong>Calendly LLC</strong> handles online booking if you
        reserve a slot (United States). <strong>Microsoft Corporation</strong> processes
        audience measurement data through Microsoft Clarity, only after your consent
        (United States).
      </Text>

      <SectionTitle>Transfers outside the European Union</SectionTitle>
      <Text>
        All four processors are established outside the EU, so using this site involves
        transferring personal data outside the European Union. These transfers rely on the
        safeguards set out in Chapter V of the GDPR: a data processing agreement with each
        processor (Article 28), and the European Commission&rsquo;s Standard Contractual
        Clauses (Article 46).
      </Text>
      <Text>
        Cloudflare, Calendly and Microsoft are additionally certified under the
        EU&nbsp;-&nbsp;US Data Privacy Framework, covered by the European Commission
        adequacy decision of 10&nbsp;July 2023 (Article 45). India has no adequacy
        decision, so the Standard Contractual Clauses are the sole basis for the transfer
        to Web3Forms. Details are in{" "}
        <Link href="https://www.cloudflare.com/trust-hub/gdpr/" target="_blank" rel="noopener noreferrer">Cloudflare&rsquo;s compliance hub</Link>,{" "}
        <Link href="https://web3forms.com/dpa" target="_blank" rel="noopener noreferrer">the Web3Forms DPA</Link>,{" "}
        <Link href="https://calendly.com/legal/data-processing-addendum" target="_blank" rel="noopener noreferrer nofollow">the Calendly DPA</Link> and{" "}
        <Link href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">the Microsoft privacy statement</Link>.
      </Text>

      <SectionTitle>Your rights</SectionTitle>
      <Text>
        You have the right to access, correct, delete, restrict and port your data, and to
        object to its processing. Email{" "}
        <Link href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</Link> and
        we will answer within 30 days. You may also lodge a complaint with the CNIL, the
        French data protection authority, at{" "}
        <Link href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</Link>.
      </Text>

      <SectionTitle>Cookies</SectionTitle>
      <Text>
        With your <strong>consent</strong>, this site uses <strong>Microsoft Clarity</strong>,
        an audience measurement tool that analyses how visitors use the site (pages viewed,
        clicks, scrolling) in order to improve it. Clarity then sets cookies: _clck (one
        year lifetime), _clsk (one day) and MUID (one year).
      </Text>
      <Text>
        These cookies are only set if you accept the corresponding category in the banner
        shown on your first visit. Without your consent, the tool is not loaded and no
        measurement cookie is set. You can withdraw your consent at any time through the
        cookie banner icon at the bottom of the page: tracking then stops immediately.
      </Text>
      <Text>
        This site shows no advertising. Technical cookies strictly necessary for the site
        to function, including the storage of your consent choices, may be set without
        consent under the applicable rules.
      </Text>

      <SectionTitle>Security</SectionTitle>
      <Text>
        The site is served over HTTPS only and exported as static files, so there is no
        database holding your data on the site itself. Messages arrive in an access
        controlled mailbox.
      </Text>

      <SectionTitle>Changes</SectionTitle>
      <Text>
        This policy may be updated. The French version carries the authoritative wording
        and date of any change.
      </Text>
    </PageWrapper>
  );
}
