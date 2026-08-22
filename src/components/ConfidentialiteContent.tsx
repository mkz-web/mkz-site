"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

const PageWrapper = styled.section`padding: 96px 24px; max-width: 680px; margin: 0 auto;`;
const Title = styled.h1`font-size: 36px; font-weight: 700; margin-bottom: 48px;`;
const SectionTitle = styled.h2`font-size: 24px; font-weight: 600; margin-top: 40px; margin-bottom: 16px; color: ${theme.colors.text};`;
const Text = styled.p`font-size: 16.5px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 12px;`;
const List = styled.ul`font-size: 16.5px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 12px; padding-left: 26px;`;
const ListItem = styled.li`margin-bottom: 6px;`;
const InfoLine = styled.p`font-size: 16.5px; line-height: 1.7; color: ${theme.colors.text}; margin-bottom: 6px;`;
const Link = styled.a`color: ${theme.colors.accent}; text-decoration: none; &:hover { text-decoration: underline; }`;
const LastUpdate = styled.p`font-size: 16px; color: ${theme.colors.textSecondary}; margin-top: 48px; font-style: italic;`;

export default function ConfidentialiteContent() {
  return (
    <PageWrapper>
      <Title>Politique de confidentialit&eacute;</Title>

      <Text>
        La pr&eacute;sente politique de confidentialit&eacute; d&eacute;crit comment MKZ collecte, utilise et prot&egrave;ge
        les informations personnelles que vous nous transmettez via le site <Link href="https://mkz-consulting.fr">mkz-consulting.fr</Link>.
      </Text>

      <SectionTitle>Responsable du traitement</SectionTitle>
      <InfoLine><strong>MKZ</strong>, SAS &agrave; associ&eacute; unique</InfoLine>
      <InfoLine>1 rue Fran&ccedil;oise Sagan, 77230 Dammartin-en-Go&euml;le</InfoLine>
      <InfoLine>Email : <Link href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</Link></InfoLine>
      <InfoLine>T&eacute;l&eacute;phone : <Link href="tel:0769093909">07 69 09 39 09</Link></InfoLine>

      <SectionTitle>Donn&eacute;es collect&eacute;es</SectionTitle>
      <Text>Nous collectons uniquement les donn&eacute;es que vous nous transmettez volontairement via :</Text>
      <List>
        <ListItem><strong>Le formulaire de contact :</strong> nom, adresse email, sujet et message</ListItem>
        <ListItem><strong>La prise de rendez-vous :</strong> nom et adresse email (via Calendly)</ListItem>
        <ListItem><strong>Les appels t&eacute;l&eacute;phoniques :</strong> num&eacute;ro de t&eacute;l&eacute;phone et informations &eacute;chang&eacute;es</ListItem>
        <ListItem><strong>L&rsquo;outil d&rsquo;audit SEO gratuit :</strong> adresse email et adresse du site analys&eacute;,
        uniquement si vous demandez le rapport et cochez la case de consentement. Le scan lui-m&ecirc;me ne
        traite qu&rsquo;une adresse de site publique et ne collecte aucune donn&eacute;e personnelle</ListItem>
      </List>
      <Text>
        Aucune donn&eacute;e n&rsquo;est collect&eacute;e automatiquement &agrave; des fins publicitaires.
        Avec votre consentement, recueilli via le bandeau cookies, nous mesurons en revanche l&rsquo;usage
        du site (pages visit&eacute;es, clics, d&eacute;filement) au moyen des outils Google Analytics 4 et
        Microsoft Clarity, afin d&rsquo;am&eacute;liorer le site. Tant que vous n&rsquo;avez pas accept&eacute;,
        ces outils ne sont pas charg&eacute;s et aucune donn&eacute;e de mesure n&rsquo;est collect&eacute;e
        (voir la section Cookies ci-dessous).
      </Text>

      <SectionTitle>Finalit&eacute;s du traitement</SectionTitle>
      <Text>Vos donn&eacute;es personnelles sont utilis&eacute;es exclusivement pour :</Text>
      <List>
        <ListItem>R&eacute;pondre &agrave; vos demandes de contact ou de devis</ListItem>
        <ListItem>Planifier et r&eacute;aliser un audit gratuit</ListItem>
        <ListItem>Vous envoyer le rapport d&rsquo;audit que vous avez demand&eacute; via l&rsquo;outil gratuit,
        et vous recontacter &agrave; son sujet</ListItem>
        <ListItem>Assurer le suivi de la relation commerciale</ListItem>
        <ListItem>Vous envoyer des informations li&eacute;es &agrave; votre projet (uniquement si vous en avez fait la demande)</ListItem>
      </List>

      <SectionTitle>Base l&eacute;gale</SectionTitle>
      <Text>
        Le traitement de vos donn&eacute;es repose sur votre <strong>consentement</strong> (formulaire de contact,
        prise de rendez-vous, mesure d&rsquo;audience via le bandeau cookies)
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
      <Text>Elles peuvent &ecirc;tre trait&eacute;es par les sous-traitants suivants :</Text>
      <List>
        <ListItem><strong>Cloudflare, Inc.</strong> : h&eacute;bergement et diffusion du site web (&Eacute;tats-Unis)</ListItem>
        <ListItem><strong>Web3Forms</strong> (Web3Creative) : acheminement des messages envoy&eacute;s via le
        formulaire de contact et des demandes de rapport de l&rsquo;outil d&rsquo;audit (Inde)</ListItem>
        <ListItem><strong>Calendly LLC</strong> : gestion de la prise de rendez-vous en ligne (&Eacute;tats-Unis)</ListItem>
        <ListItem><strong>Microsoft Corporation</strong> : mesure d&rsquo;audience et analyse de l&rsquo;usage du site
        via Microsoft Clarity, uniquement apr&egrave;s votre consentement (&Eacute;tats-Unis)</ListItem>
        <ListItem><strong>Google Ireland Limited</strong> : mesure d&rsquo;audience via Google Analytics 4,
        uniquement apr&egrave;s votre consentement (Irlande, avec transfert possible vers Google LLC aux
        &Eacute;tats-Unis)</ListItem>
      </List>

      <SectionTitle>Transferts de donn&eacute;es hors Union europ&eacute;enne</SectionTitle>
      <Text>
        Quatre de nos cinq sous-traitants sont &eacute;tablis hors de l&rsquo;Union europ&eacute;enne : <strong>Cloudflare, Inc.</strong>,
        <strong> Calendly LLC</strong> et <strong>Microsoft Corporation</strong> aux &Eacute;tats-Unis,
        <strong> Web3Forms</strong> en Inde ; <strong>Google Ireland Limited</strong> est &eacute;tabli en Irlande
        mais peut transf&eacute;rer les donn&eacute;es de Google Analytics vers Google LLC aux &Eacute;tats-Unis. L&rsquo;h&eacute;bergement du site, l&rsquo;envoi du formulaire de contact,
        la prise de rendez-vous et la mesure d&rsquo;audience impliquent donc un transfert de
        donn&eacute;es personnelles hors de l&rsquo;Union europ&eacute;enne.
      </Text>
      <Text>
        Ces transferts sont encadr&eacute;s par les garanties pr&eacute;vues au chapitre V du RGPD :
      </Text>
      <List>
        <ListItem>
          un <strong>accord de traitement des donn&eacute;es</strong> (DPA) conclu avec chaque sous-traitant, au sens de
          l&rsquo;article 28 du RGPD ;
        </ListItem>
        <ListItem>
          les <strong>clauses contractuelles types</strong> de la Commission europ&eacute;enne (article 46 du RGPD). Elles
          constituent le seul fondement du transfert vers <strong>Web3Forms</strong>, l&rsquo;Inde ne b&eacute;n&eacute;ficiant
          d&rsquo;aucune d&eacute;cision d&rsquo;ad&eacute;quation ;
        </ListItem>
        <ListItem>
          pour les trois prestataires am&eacute;ricains et Google LLC uniquement, leur certification au
          <strong> Data Privacy Framework UE&nbsp;-&nbsp;&Eacute;tats-Unis</strong>, qui fait l&rsquo;objet d&rsquo;une
          d&eacute;cision d&rsquo;ad&eacute;quation de la Commission europ&eacute;enne du 10&nbsp;juillet 2023
          (article 45 du RGPD).
        </ListItem>
      </List>
      <Text>
        Le d&eacute;tail de ces engagements est consultable sur&nbsp;
        <Link href="https://www.cloudflare.com/trust-hub/gdpr/" target="_blank" rel="noopener noreferrer">le centre de conformit&eacute; de Cloudflare</Link>,&nbsp;
        <Link href="https://web3forms.com/dpa" target="_blank" rel="noopener noreferrer">l&rsquo;accord de traitement de Web3Forms</Link>,&nbsp;
        <Link href="https://calendly.com/legal/data-processing-addendum" target="_blank" rel="noopener noreferrer nofollow">celui de Calendly</Link>,&nbsp;
        <Link href="https://privacy.microsoft.com/fr-fr/privacystatement" target="_blank" rel="noopener noreferrer">la d&eacute;claration de confidentialit&eacute; de Microsoft</Link>
        &nbsp;et&nbsp;
        <Link href="https://business.safety.google/adsprocessorterms/" target="_blank" rel="noopener noreferrer">les conditions de traitement des donn&eacute;es de Google</Link>.
        Le d&eacute;l&eacute;gu&eacute; &agrave; la protection des donn&eacute;es de Cloudflare est joignable &agrave;&nbsp;
        <Link href="mailto:dpo@cloudflare.com">dpo@cloudflare.com</Link>.
      </Text>

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
        Avec votre <strong>consentement</strong>, ce site utilise deux outils de mesure d&rsquo;audience qui
        analysent la fa&ccedil;on dont les visiteurs utilisent le site (pages vues, clics, d&eacute;filement)
        afin de l&rsquo;am&eacute;liorer : <strong>Google Analytics 4</strong>, qui d&eacute;pose les cookies
        _ga et _ga_* (dur&eacute;e de vie de 13 mois, adresse IP non conserv&eacute;e, aucun signal
        publicitaire), et <strong>Microsoft Clarity</strong>, qui d&eacute;pose les cookies _clck (un an),
        _clsk (un jour) et MUID (un an).
      </Text>
      <Text>
        Ces cookies ne sont d&eacute;pos&eacute;s que si vous acceptez la cat&eacute;gorie correspondante dans le
        bandeau affich&eacute; lors de votre premi&egrave;re visite. Sans votre accord, ces outils ne sont
        pas charg&eacute;s et aucun cookie de mesure n&rsquo;est d&eacute;pos&eacute;. Vous pouvez retirer votre
        consentement &agrave; tout moment via le lien &laquo;&nbsp;G&eacute;rer les cookies&nbsp;&raquo; en pied de page : le suivi
        s&rsquo;arr&ecirc;te alors imm&eacute;diatement. Votre choix, accord ou refus, est conserv&eacute; six mois dans un
        cookie technique (mkz-consent) avec sa date et un identifiant al&eacute;atoire qui en tient lieu de preuve ;
        pass&eacute; ce d&eacute;lai, la question vous est repos&eacute;e.
      </Text>
      <Text>
        Ce site n&rsquo;affiche aucune publicit&eacute;. Des cookies techniques strictement n&eacute;cessaires
        au fonctionnement du site, dont la m&eacute;morisation de vos choix de consentement, peuvent &ecirc;tre
        d&eacute;pos&eacute;s sans consentement, conform&eacute;ment &agrave; la r&eacute;glementation en vigueur.
      </Text>

      <SectionTitle>S&eacute;curit&eacute;</SectionTitle>
      <Text>
        MKZ met en &oelig;uvre des mesures techniques et organisationnelles appropri&eacute;es pour prot&eacute;ger vos donn&eacute;es
        contre tout acc&egrave;s non autoris&eacute;, perte, destruction ou alt&eacute;ration. Le site est h&eacute;berg&eacute;
        sur l&rsquo;infrastructure de Cloudflare, Inc. et utilise le protocole HTTPS pour s&eacute;curiser les &eacute;changes.
      </Text>

      <SectionTitle>Modifications</SectionTitle>
      <Text>
        MKZ se r&eacute;serve le droit de modifier la pr&eacute;sente politique de confidentialit&eacute; &agrave; tout moment.
        Toute modification sera publi&eacute;e sur cette page avec une date de mise &agrave; jour.
      </Text>

      <LastUpdate>Derni&egrave;re mise &agrave; jour : ao&ucirc;t 2026</LastUpdate>
    </PageWrapper>
  );
}
