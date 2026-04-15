"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

const PageWrapper = styled.section`padding: 96px 24px; max-width: 800px; margin: 0 auto;`;
const Title = styled.h1`font-size: 36px; font-weight: 700; margin-bottom: 48px;`;
const SectionTitle = styled.h2`font-size: 20px; font-weight: 600; margin-top: 40px; margin-bottom: 16px; color: ${theme.colors.text};`;
const Text = styled.p`font-size: 14px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 12px;`;
const InfoLine = styled.p`font-size: 14px; color: ${theme.colors.text}; margin-bottom: 6px;`;

export default function MentionsContent() {
  return (
    <PageWrapper>
      <Title>Mentions l&eacute;gales</Title>

      <SectionTitle>&Eacute;diteur du site</SectionTitle>
      <InfoLine><strong>MKZ</strong> &mdash; SAS &agrave; associ&eacute; unique</InfoLine>
      <InfoLine>SIRET : 983 662 784 00013</InfoLine>
      <InfoLine>RCS : Meaux</InfoLine>
      <InfoLine>Activit&eacute; : Conseil en syst&egrave;mes et logiciels informatiques</InfoLine>
      <InfoLine>Si&egrave;ge social : 1 rue Fran&ccedil;oise Sagan, 77230 Dammartin-en-Go&euml;le</InfoLine>
      <InfoLine>T&eacute;l&eacute;phone : 07 69 09 39 09</InfoLine>
      <InfoLine>Email : <a href="mailto:contact@mkz-consulting.fr" style={{ color: theme.colors.accent }}>contact@mkz-consulting.fr</a></InfoLine>
      <InfoLine>Directeur de la publication : Micka&euml;l Leclerc, Pr&eacute;sident</InfoLine>

      <SectionTitle>H&eacute;bergement</SectionTitle>
      <InfoLine><strong>OVH SAS</strong></InfoLine>
      <InfoLine>2 rue Kellermann, 59100 Roubaix, France</InfoLine>
      <InfoLine>T&eacute;l&eacute;phone : 1007</InfoLine>
      <InfoLine>Site web : <a href="https://www.ovhcloud.com" style={{ color: theme.colors.accent }} target="_blank" rel="noopener noreferrer">www.ovhcloud.com</a></InfoLine>

      <SectionTitle>Propri&eacute;t&eacute; intellectuelle</SectionTitle>
      <Text>
        L&rsquo;ensemble du contenu de ce site (textes, images, graphismes, logo, ic&ocirc;nes, sons, logiciels) est la propri&eacute;t&eacute; exclusive de MKZ, &agrave; l&rsquo;exception des marques, logos ou contenus appartenant &agrave; d&rsquo;autres soci&eacute;t&eacute;s partenaires ou auteurs. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces &eacute;l&eacute;ments est strictement interdite sans l&rsquo;accord &eacute;crit pr&eacute;alable de MKZ.
      </Text>

      <SectionTitle>Donn&eacute;es personnelles</SectionTitle>
      <Text>
        Les informations recueillies via le formulaire de contact sont destin&eacute;es exclusivement &agrave; MKZ et sont utilis&eacute;es uniquement pour r&eacute;pondre &agrave; vos demandes. Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es (RGPD), vous disposez d&rsquo;un droit d&rsquo;acc&egrave;s, de rectification et de suppression des donn&eacute;es vous concernant. Pour exercer ce droit, contactez-nous &agrave; : <a href="mailto:contact@mkz-consulting.fr" style={{ color: theme.colors.accent }}>contact@mkz-consulting.fr</a>.
      </Text>

      <SectionTitle>Cookies</SectionTitle>
      <Text>
        Ce site n&rsquo;utilise pas de cookies de suivi ou de publicit&eacute;. Seuls des cookies techniques strictement n&eacute;cessaires au fonctionnement du site peuvent &ecirc;tre utilis&eacute;s.
      </Text>
    </PageWrapper>
  );
}
