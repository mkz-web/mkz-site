"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

const PageWrapper = styled.section`padding: 96px 24px; max-width: 680px; margin: 0 auto;`;
const Title = styled.h1`font-size: 36px; font-weight: 700; margin-bottom: 48px;`;
const SectionTitle = styled.h2`font-size: 24px; font-weight: 600; margin-top: 40px; margin-bottom: 16px; color: ${theme.colors.text};`;
const Text = styled.p`font-size: 16.5px; line-height: 1.8; color: ${theme.colors.textSecondary}; margin-bottom: 12px;`;
const InfoLine = styled.p`font-size: 16.5px; line-height: 1.7; color: ${theme.colors.text}; margin-bottom: 6px;`;

export default function MentionsContent() {
  return (
    <PageWrapper>
      <Title>Mentions l&eacute;gales</Title>

      {/* Pendant du lien que /en/legal-notice/ pose déjà vers cette page.
          Sans lui, la version anglaise n'avait aucun lien contextuel entrant :
          elle n'existait que par le sitemap et le pied de page. */}
      <Text>
        An <Link href="/en/legal-notice/" style={{ color: theme.colors.accent }}>English translation of this legal notice</Link>{" "}
        is available for convenience. Seule la version fran&ccedil;aise ci-dessous fait foi.
      </Text>

      <SectionTitle>&Eacute;diteur du site</SectionTitle>
      <InfoLine><strong>MKZ</strong>, SAS &agrave; associ&eacute; unique</InfoLine>
      <InfoLine>SIRET : 983 662 784 00013</InfoLine>
      <InfoLine>RCS : Meaux</InfoLine>
      <InfoLine>Activit&eacute; : Conseil en syst&egrave;mes et logiciels informatiques</InfoLine>
      <InfoLine>Si&egrave;ge social : 1 rue Fran&ccedil;oise Sagan, 77230 Dammartin-en-Go&euml;le</InfoLine>
      <InfoLine>T&eacute;l&eacute;phone : 07 69 09 39 09</InfoLine>
      <InfoLine>Email : <a href="mailto:contact@mkz-consulting.fr" style={{ color: theme.colors.accent }}>contact@mkz-consulting.fr</a></InfoLine>
      <InfoLine>Directeur de la publication : Micka&euml;l Leclerc, Pr&eacute;sident</InfoLine>

      <SectionTitle>H&eacute;bergement</SectionTitle>
      <InfoLine><strong>Cloudflare, Inc.</strong> (Cloudflare Pages)</InfoLine>
      <InfoLine>101 Townsend Street, San Francisco, CA 94107, &Eacute;tats-Unis</InfoLine>
      <InfoLine>T&eacute;l&eacute;phone : +1 650 319 8930</InfoLine>
      <InfoLine>Site web : <a href="https://www.cloudflare.com" style={{ color: theme.colors.accent }} target="_blank" rel="noopener noreferrer">www.cloudflare.com</a></InfoLine>
      <Text>
        L&rsquo;h&eacute;bergeur est &eacute;tabli hors de l&rsquo;Union europ&eacute;enne. Les conditions de ce transfert et les garanties associ&eacute;es sont d&eacute;taill&eacute;es dans notre <a href="/politique-confidentialite/" style={{ color: theme.colors.accent }}>politique de confidentialit&eacute;</a>.
      </Text>

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
        Avec votre consentement, ce site utilise les outils de mesure d&rsquo;audience Google Analytics 4 et Microsoft Clarity.
        Sans votre accord, donn&eacute; via le bandeau cookies, seuls des cookies techniques strictement
        n&eacute;cessaires au fonctionnement du site sont utilis&eacute;s. Le d&eacute;tail figure dans
        notre <a href="/politique-confidentialite/" style={{ color: theme.colors.accent }}>politique de confidentialit&eacute;</a>.
      </Text>
    </PageWrapper>
  );
}
