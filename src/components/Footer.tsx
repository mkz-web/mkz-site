"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

// Méga-footer « second héros » : accroche éditoriale + colonnes + signature.

const FooterWrapper = styled.footer`
  background: ${theme.colors.dark};
  color: ${theme.colors.textOnDark};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 24px 40px;
`;

const TopBlock = styled.div`
  display: grid;
  gap: 32px;
  padding-bottom: 64px;
  border-bottom: 1px solid ${theme.colors.darkBorder};

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 7fr 4fr;
    align-items: end;
  }
`;

const Tagline = styled.p`
  font-family: ${theme.fonts.display};
  font-size: clamp(30px, 4.5vw, 52px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.01em;
  max-width: 18ch;

  em {
    font-style: italic;
    color: ${theme.colors.cta};
  }
`;

const TopActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  @media (min-width: ${theme.breakpoints.lg}) {
    align-items: flex-end;
  }
`;

const TopPhone = styled.a`
  font-family: ${theme.fonts.mono};
  font-size: 14px;
  color: ${theme.colors.textOnDarkSecondary};

  strong { color: ${theme.colors.textOnDark}; font-weight: 500; }
  &:hover strong { color: ${theme.colors.cta}; }
`;

const Grid = styled.div`
  display: grid;
  gap: 40px;
  padding: 56px 0;

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
  }
`;

const BrandDescription = styled.p`
  margin-top: 16px;
  max-width: 320px;
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textOnDarkSecondary};
`;

const BrandLegal = styled.p`
  margin-top: 14px;
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  line-height: 1.8;
  color: ${theme.colors.textOnDarkSecondary};
`;

const GroupTitle = styled.h3`
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.cta};
  margin-bottom: 18px;
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  color: ${theme.colors.textOnDarkSecondary};
  transition: color 0.18s ${theme.easing};

  &:hover {
    color: ${theme.colors.textOnDark};
  }
`;

const FooterExtLink = styled.a`
  font-size: 14px;
  color: ${theme.colors.textOnDarkSecondary};
  transition: color 0.18s ${theme.easing};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.textOnDark};
  }
`;

const ContactInfo = styled.p`
  font-size: 14px;
  color: ${theme.colors.textOnDarkSecondary};
  line-height: 1.7;
`;

const BottomBar = styled.div`
  padding-top: 28px;
  border-top: 1px solid ${theme.colors.darkBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  color: ${theme.colors.textOnDarkSecondary};
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
        <TopBlock>
          <Tagline>
            Votre t&eacute;l&eacute;phone devrait <em>sonner</em> plus souvent.
          </Tagline>
          <TopActions>
            <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
            <TopPhone href="tel:0769093909">
              ou directement : <strong>07 69 09 39 09</strong>
            </TopPhone>
          </TopActions>
        </TopBlock>

        <Grid>
          <div>
            <Link href="/">
              <Image
                src="/images/mkz-logo.svg"
                alt="MKZ"
                width={88}
                height={45}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <BrandDescription>
              Cr&eacute;ation de sites web et SEO pour artisans, commer&ccedil;ants
              et ind&eacute;pendants. Bas&eacute;s en Seine-et-Marne, partout en France.
            </BrandDescription>
            <BrandLegal>
              MKZ · SIRET 983 662 784 00013 · RCS Meaux
              <br />
              1 rue Fran&ccedil;oise Sagan, 77230 Dammartin-en-Go&euml;le
            </BrandLegal>
          </div>

          <div>
            <GroupTitle>Services</GroupTitle>
            <LinkList>
              <li><FooterLink href="/creation-site-internet">Cr&eacute;ation de site internet</FooterLink></li>
              <li><FooterLink href="/referencement-seo">R&eacute;f&eacute;rencement SEO</FooterLink></li>
              <li><FooterLink href="/agence-web-77">Agence web Seine-et-Marne</FooterLink></li>
              <li><FooterExtLink href={CALENDLY} target="_blank" rel="noopener noreferrer">Audit gratuit</FooterExtLink></li>
            </LinkList>
          </div>

          <div>
            <GroupTitle>Conseils</GroupTitle>
            <LinkList>
              <li><FooterLink href="/conseils/tutoriels">Tutoriels pas &agrave; pas</FooterLink></li>
              <li><FooterLink href="/conseils/creation-site-internet">Cr&eacute;ation de site</FooterLink></li>
              <li><FooterLink href="/conseils/seo">SEO &amp; visibilit&eacute;</FooterLink></li>
              <li><FooterLink href="/conseils">Tous les conseils</FooterLink></li>
            </LinkList>
          </div>

          <div>
            <GroupTitle>Contact</GroupTitle>
            <LinkList>
              <li><FooterExtLink href="tel:0769093909">07 69 09 39 09</FooterExtLink></li>
              <li><FooterExtLink href="mailto:contact@mkz-consulting.fr">contact@mkz-consulting.fr</FooterExtLink></li>
              <li><ContactInfo>Lun-ven 9h-18h<br />R&eacute;ponse sous 24 h</ContactInfo></li>
            </LinkList>
          </div>

          <div>
            <GroupTitle>Liens</GroupTitle>
            <LinkList>
              <li><FooterLink href="/">Accueil</FooterLink></li>
              <li><FooterLink href="/services">Services</FooterLink></li>
              <li><FooterLink href="/about">&Agrave; propos</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </LinkList>
          </div>
        </Grid>

        <BottomBar>
          <p>&copy; 2026 MKZ · Tous droits r&eacute;serv&eacute;s</p>
          <LegalLinks>
            <FooterLink href="/mentions-legales">Mentions l&eacute;gales</FooterLink>
            <FooterLink href="/politique-confidentialite">Politique de confidentialit&eacute;</FooterLink>
          </LegalLinks>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}
