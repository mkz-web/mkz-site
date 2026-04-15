"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const FooterWrapper = styled.footer`
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.surfaceAlt};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 24px;
`;

const Grid = styled.div`
  display: grid;
  gap: 48px;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

const BrandDescription = styled.p`
  margin-top: 16px;
  max-width: 360px;
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const GroupTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.colors.text};
  margin-bottom: 16px;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const FooterExtLink = styled.a`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const ContactInfo = styled.p`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
`;

const BottomBar = styled.div`
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  text-align: center;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    text-align: left;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <div>
            <Link href="/">
              <Image
                src="/images/mkz-logo.svg"
                alt="MKZ"
                width={100}
                height={51}
              />
            </Link>
            <BrandDescription>
              Votre visibilit&eacute;, notre mission. Cr&eacute;ation de sites web et SEO pour artisans, commer&ccedil;ants et ind&eacute;pendants.
            </BrandDescription>
            <ContactInfo style={{ marginTop: 12 }}>
              MKZ &mdash; SIRET : 983 662 784 00013 &mdash; RCS Meaux
            </ContactInfo>
          </div>

          <div>
            <GroupTitle>Services</GroupTitle>
            <LinkList>
              <li><FooterLink href="/services">Cr&eacute;ation de site web</FooterLink></li>
              <li><FooterLink href="/services">SEO &amp; R&eacute;f&eacute;rencement</FooterLink></li>
              <li><FooterExtLink href={CALENDLY} target="_blank" rel="noopener noreferrer">Audit gratuit</FooterExtLink></li>
            </LinkList>
          </div>

          <div>
            <GroupTitle>Contact</GroupTitle>
            <LinkList>
              <li><FooterExtLink href="tel:0769093909">07 69 09 39 09</FooterExtLink></li>
              <li><FooterExtLink href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</FooterExtLink></li>
              <li><ContactInfo>1 rue Fran&ccedil;oise Sagan<br />77230 Dammartin-en-Go&euml;le</ContactInfo></li>
            </LinkList>
          </div>

          <div>
            <GroupTitle>Liens</GroupTitle>
            <LinkList>
              <li><FooterLink href="/">Accueil</FooterLink></li>
              <li><FooterLink href="/about">&Agrave; propos</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </LinkList>
          </div>
        </Grid>

        <BottomBar>
          <p>&copy; 2026 MKZ - SIRET 983 662 784 00013. Tous droits r&eacute;serv&eacute;s.</p>
          <LegalLinks>
            <FooterLink href="/mentions-legales">Mentions l&eacute;gales</FooterLink>
            <FooterLink href="/politique-confidentialite">Politique de confidentialit&eacute;</FooterLink>
          </LegalLinks>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}
