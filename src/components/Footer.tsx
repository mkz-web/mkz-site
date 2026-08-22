"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";
import { ui, CALENDLY, homeOf, switcherTargetFor, type Locale } from "@/lib/i18n";
import { openConsent } from "@/lib/consent";

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
    // Fond sombre : orange VIF (4,86:1). L'orange encre y tomberait a 3,17:1.
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
  &:hover strong { color: ${theme.colors.ctaInk}; }
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
  // Fond sombre : orange VIF (4,86:1). L'orange encre y tomberait a 3,17:1.
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
  flex-wrap: wrap;
  gap: 8px 24px;
`;

// Rouvre le bandeau de consentement : le retrait doit être aussi simple que
// l'octroi. Un bouton, pas un lien : il n'y a aucune page derrière.
const ManageCookies = styled.button`
  padding: 0;
  background: none;
  border: 0;
  font: inherit;
  font-size: 14px;
  color: ${theme.colors.textOnDarkSecondary};
  cursor: pointer;
  transition: color 0.18s ${theme.easing};

  &:hover {
    color: ${theme.colors.textOnDark};
  }
`;

export default function Footer({ locale = "fr" }: { locale?: Locale }) {
  const pathname = usePathname();
  const t = ui[locale].footer;
  const homeHref = homeOf(locale);
  const otherLocale: Locale = locale === "en" ? "fr" : "en";

  // Même cible que le sélecteur du header : la traduction de la page courante.
  const langTarget = switcherTargetFor(pathname ?? homeHref, locale);
  const switcher = ui[locale].switcher;

  return (
    <FooterWrapper>
      <Container>
        <TopBlock>
          <Tagline>
            {t.taglineBefore}
            <em>{t.taglineEm}</em>
            {t.taglineAfter}
          </Tagline>
          <TopActions>
            <Button href={CALENDLY}>{t.cta}</Button>
            <TopPhone href={ui[locale].header.phoneHref}>
              {t.phonePrefix} <strong>{ui[locale].header.phoneLabel}</strong>
            </TopPhone>
          </TopActions>
        </TopBlock>

        <Grid>
          <div>
            <Link href={homeHref}>
              <Image
                src="/images/mkz-logo-footer.svg"
                alt="MKZ"
                width={88}
                height={45}
              />
            </Link>
            <BrandDescription>{t.description}</BrandDescription>
            <BrandLegal>
              {t.legal.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </BrandLegal>
          </div>

          {t.groups.map((group) => (
            <div key={group.title}>
              <GroupTitle>{group.title}</GroupTitle>
              <LinkList>
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <FooterExtLink
                        href={link.href}
                        // nofollow comme dans Button : la nav du pied de page est rendue
                        // sur toutes les pages, donc son lien externe (Calendly) sortait
                        // 44 fois en suivi, mesuré le 19/08/2026. Les entrées tel: et
                        // mailto: ne sont pas concernées, elles ne transmettent rien.
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer nofollow" }
                          : {})}
                      >
                        {link.label}
                      </FooterExtLink>
                    ) : (
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    )}
                  </li>
                ))}
                {group.showHours && (
                  <li>
                    <ContactInfo>
                      {t.contact.hours}
                      <br />
                      {t.contact.reply}
                    </ContactInfo>
                  </li>
                )}
                {group.showLangLink && (
                  <li>
                    <FooterExtLink
                      href={langTarget.href}
                      hrefLang={otherLocale}
                      lang={otherLocale}
                      title={langTarget.isCounterpart ? undefined : switcher.noCounterpart}
                    >
                      {switcher.otherName}
                    </FooterExtLink>
                  </li>
                )}
              </LinkList>
            </div>
          ))}
        </Grid>

        <BottomBar>
          <p>{t.copyright}</p>
          <LegalLinks>
            {t.legalLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.name}
              </FooterLink>
            ))}
            <ManageCookies type="button" onClick={openConsent}>
              {ui[locale].consent.manage}
            </ManageCookies>
          </LegalLinks>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}
