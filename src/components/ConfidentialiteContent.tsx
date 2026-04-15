"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

const PageWrapper = styled.section`padding: 96px 24px; max-width: 800px; margin: 0 auto;`;
const Title = styled.h1`font-size: 36px; font-weight: 700; margin-bottom: 48px;`;
const SectionTitle = styled.h2`font-size: 20px; font-weight: 600; margin-top: 40px; margin-bottom: 16px; color: ${theme.colors.text};`;
const Text = styled.p`font-size: 14px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 12px;`;
const List = styled.ul`font-size: 14px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 12px; padding-left: 20px;`;
const ListItem = styled.li`margin-bottom: 6px;`;
const InfoLine = styled.p`font-size: 14px; color: ${theme.colors.text}; margin-bottom: 6px;`;
const Link = styled.a`color: ${theme.colors.accent}; text-decoration: none; &:hover { text-decoration: underline; }`;
const LastUpdate = styled.p`font-size: 13px; color: ${theme.colors.textSecondary}; margin-top: 48px; font-style: italic;`;

export default function ConfidentialiteContent() {
  return (
    <PageWrapper>
      <Title>Politique de confidentialit&eacute;</Title>

      <Text>
        La pr&eacute;sente politique de confidentialit&eacute; d&eacute;crit comment MKZ collecte, utilise et prot&egrave;ge
        les informations personnelles que vous nous transmettez via le site <Link href="https://mkz.fr">mkz.fr</Link>.
      </Text>

      <SectionTitle>Responsable du traitement</SectionTitle>
      <InfoLine><strong>MKZ</strong> &mdash; SAS &agrave; associ&eacute; unique</InfoLine>
      <InfoLine>1 rue Fran&ccedil;oise Sagan, 77230 Dammartin-en-Go&euml;le</InfoLine>
      <InfoLine>Email : <Link href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</Link></InfoLine>
      <InfoLine>T&eacute;l&eacute;phone : <Link href="tel:0769093909">07 69 09 39 09</Link></InfoLine>

      <SectionTitle>Donn&eacute;es collect&eacute;es</SectionTitle>
      <Text>Nous collectons uniquement les donn&eacute;es que vous nous transmettez volontairement via :</Text>
      <List>
        <ListItem><strong>Le formulaire de contact :</strong> nom, adresse email, sujet et message</ListItem>
        <ListItem><strong>La prise de rendez-vous :</strong> nom et adresse email (via Calendly)</ListItem>
        <ListItem><strong>Les appels t&eacute;l&eacute;phoniques :</strong> num&eacute;ro de t&eacute;l&eacute;phone et informations &eacute;chang&eacute;es</ListItem>
      </List>
      <Text>
        Aucune donn&eacute;e n&rsquo;est collect&eacute;e automatiquement &agrave; des fins de suivi publicitaire.
        Ce site n&rsquo;utilise pas de cookies de tracking, de publicit&eacute; ou d&rsquo;analyse comportementale.
      </Text>

      <SectionTitle>Finalit&eacute;s du traitement</SectionTitle>
      <Text>Vos donn&eacute;es personnelles sont utilis&eacute;es exclusivement pour :</Text>
      <List>
        <ListItem>R&eacute;pondre &agrave; vos demandes de contact ou de devis</ListItem>
        <ListItem>Planifier et r&eacute;aliser un audit gratuit</ListItem>
        <ListItem>Assurer le suivi de la relation commerciale</ListItem>
        <ListItem>Vous envoyer des informations li&eacute;es &agrave; votre projet (uniquement si vous en avez fait la demande)</ListItem>
      </List>

      <SectionTitle>Base l&eacute;gale</SectionTitle>
      <Text>
        Le traitement de vos donn&eacute;es repose sur votre <strong>consentement</strong> (formulaire de contact, prise de rendez-vous)
        et sur l&rsquo;<strong>int&eacute;r&ecirc;t l&eacute;gitime</strong> de MKZ &agrave; r&eacute;pondre aux demandes commerciales.
      </Text>

      <SectionTitle>Dur&eacute;e de conservation</SectionTitle>
      <Text>
        Vos donn&eacute;es sont conserv&eacute;es pendant une dur&eacute;e maximale de <strong>3 ans</strong> &agrave; compter de votre
        dernier contact avec MKZ. Au-del&agrave;, elles sont supprim&eacute;es d&eacute;finitivement.
      </Text>

      <SectionTitle>Partage des donn&eacute;es</SectionTitle>
      <Text>
        Vos donn&eacute;es personnelles ne sont jamais vendues, lou&eacute;es ou transmises &agrave; des tiers &agrave; des fins commerciales.
      </Text>
      <Text>Elles peuvent &ecirc;tre trait&eacute;es par les sous-traitants suivants, strictement n&eacute;cessaires au fonctionnement du service :</Text>
      <List>
        <ListItem><strong>OVH</strong> &mdash; H&eacute;bergement du site web (France)</ListItem>
        <ListItem><strong>Calendly</strong> &mdash; Gestion de la prise de rendez-vous en ligne</ListItem>
      </List>

      <SectionTitle>Vos droits</SectionTitle>
      <Text>
        Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es (RGPD), vous disposez des droits suivants :
      </Text>
      <List>
        <ListItem><strong>Droit d&rsquo;acc&egrave;s :</strong> obtenir la confirmation que vos donn&eacute;es sont trait&eacute;es et en recevoir une copie</ListItem>
        <ListItem><strong>Droit de rectification :</strong> demander la correction de donn&eacute;es inexactes</ListItem>
        <ListItem><strong>Droit de suppression :</strong> demander l&rsquo;effacement de vos donn&eacute;es</ListItem>
        <ListItem><strong>Droit d&rsquo;opposition :</strong> vous opposer au traitement de vos donn&eacute;es</ListItem>
        <ListItem><strong>Droit &agrave; la portabilit&eacute; :</strong> recevoir vos donn&eacute;es dans un format structur&eacute;</ListItem>
        <ListItem><strong>Droit de retrait du consentement :</strong> retirer votre consentement &agrave; tout moment</ListItem>
      </List>
      <Text>
        Pour exercer vos droits, contactez-nous &agrave; : <Link href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</Link>.
        Nous nous engageons &agrave; r&eacute;pondre dans un d&eacute;lai de 30 jours.
      </Text>
      <Text>
        En cas de litige, vous pouvez &eacute;galement adresser une r&eacute;clamation &agrave; la CNIL :&nbsp;
        <Link href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</Link>.
      </Text>

      <SectionTitle>Cookies</SectionTitle>
      <Text>
        Ce site n&rsquo;utilise <strong>aucun cookie de suivi, de publicit&eacute; ou d&rsquo;analyse</strong>.
        Seuls des cookies techniques strictement n&eacute;cessaires au fonctionnement du site peuvent &ecirc;tre d&eacute;pos&eacute;s
        par votre navigateur. Ils ne n&eacute;cessitent pas votre consentement conform&eacute;ment &agrave; la r&eacute;glementation en vigueur.
      </Text>

      <SectionTitle>S&eacute;curit&eacute;</SectionTitle>
      <Text>
        MKZ met en &oelig;uvre des mesures techniques et organisationnelles appropri&eacute;es pour prot&eacute;ger vos donn&eacute;es
        contre tout acc&egrave;s non autoris&eacute;, perte, destruction ou alt&eacute;ration. Le site est h&eacute;berg&eacute;
        en France chez OVH et utilise le protocole HTTPS pour s&eacute;curiser les &eacute;changes.
      </Text>

      <SectionTitle>Modifications</SectionTitle>
      <Text>
        MKZ se r&eacute;serve le droit de modifier la pr&eacute;sente politique de confidentialit&eacute; &agrave; tout moment.
        Toute modification sera publi&eacute;e sur cette page avec une date de mise &agrave; jour.
      </Text>

      <LastUpdate>Derni&egrave;re mise &agrave; jour : avril 2026</LastUpdate>
    </PageWrapper>
  );
}
