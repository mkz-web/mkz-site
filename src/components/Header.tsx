"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { theme } from "@/lib/theme";
import { ui, CALENDLY, homeOf, switcherTargetFor, type Locale } from "@/lib/i18n";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(250, 247, 241, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.border};
`;

const Nav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 24px;
`;

const NavLinks = styled.ul`
  display: none;
  align-items: center;
  gap: 28px;
  list-style: none;

  @media (min-width: ${theme.breakpoints.lg}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
  text-decoration: none;
  background-image: linear-gradient(${theme.colors.cta}, ${theme.colors.cta});
  background-size: 0% 1.5px;
  background-repeat: no-repeat;
  background-position: left bottom;
  padding-bottom: 4px;
  transition: background-size 0.22s ${theme.easing};

  &:hover {
    background-size: 100% 1.5px;
  }
`;

// Toujours affiché : le sélecteur de langue doit rester atteignable sans ouvrir
// le menu burger. Le téléphone et le CTA, eux, restent réservés au desktop.
const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (min-width: ${theme.breakpoints.lg}) {
    gap: 20px;
  }
`;

const DesktopOnly = styled.div`
  display: none;
  align-items: center;
  gap: 20px;

  @media (min-width: ${theme.breakpoints.lg}) {
    display: flex;
  }
`;

const Phone = styled.a`
  font-family: ${theme.fonts.mono};
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.text};

  &:hover { color: ${theme.colors.cta}; }
`;

const CTALink = styled.a`
  display: inline-flex;
  padding: 10px 18px;
  background: ${theme.colors.cta};
  color: white;
  font-size: 13.5px;
  font-weight: 600;
  border: 1px solid ${theme.colors.cta};
  border-radius: ${theme.radius.sm};
  transition: all 0.18s ${theme.easing};
  text-decoration: none;

  &:hover {
    background: ${theme.colors.ctaHover};
    border-color: ${theme.colors.ctaHover};
  }
`;

const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  @media (min-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const MenuBar = styled.span<{ open: boolean; position: "top" | "mid" | "bot" }>`
  display: block;
  width: 22px;
  height: 2px;
  background: ${theme.colors.text};
  transition: transform 0.2s, opacity 0.2s;

  ${({ open, position }) => {
    if (!open) return "";
    if (position === "top") return "transform: translateY(7px) rotate(45deg);";
    if (position === "mid") return "opacity: 0;";
    return "transform: translateY(-7px) rotate(-45deg);";
  }}
`;

const MobileMenu = styled.div`
  border-top: 1px solid ${theme.colors.border};
  background: ${theme.colors.background};
  padding: 16px 24px 24px;

  @media (min-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MobilePhone = styled.a`
  font-family: ${theme.fonts.mono};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text};
`;

const MobileCTA = styled.a`
  display: inline-flex;
  padding: 12px 20px;
  background: ${theme.colors.cta};
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${theme.radius.sm};
  text-decoration: none;
`;

// Sélecteur de langue : lien franc (pas de <select>), crawlable et indexable,
// vers la traduction de la page courante. C'est un `<a>` et non un `<Link>` :
// changer de root layout impose de toute façon un rechargement complet.
//
// Forme « FR / EN » avec la langue courante en encre pleine : le visiteur voit
// que le site est bilingue AVANT de cliquer, ce qu'un simple libellé « English »
// ne dit pas. Encre franche et filet fort (borderInk), sinon le bouton disparaît
// à côté du CTA orange : c'est ce qui s'était passé, mesuré le 30/07/2026.
const LangSwitch = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${theme.colors.textSecondary};
  background: ${theme.colors.surface};
  border: 1.5px solid ${theme.colors.borderInk};
  border-radius: ${theme.radius.sm};
  padding: 7px 10px;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.18s ${theme.easing};

  /* Langue actuellement servie */
  .actif {
    color: ${theme.colors.text};
    font-weight: 700;
  }

  .sep {
    color: ${theme.colors.border};
  }

  &:hover {
    background: ${theme.colors.surfaceAlt};
    .cible { color: ${theme.colors.cta}; }
  }
`;

/** Rend « FR / EN » avec la locale courante mise en avant. */
function LangPair({ locale }: { locale: Locale }) {
  return (
    <>
      <span className={locale === "fr" ? "actif" : "cible"}>FR</span>
      <span className="sep" aria-hidden>
        /
      </span>
      <span className={locale === "en" ? "actif" : "cible"}>EN</span>
    </>
  );
}

export default function Header({ locale = "fr" }: { locale?: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = ui[locale];
  const homeHref = homeOf(locale);
  const otherLocale: Locale = locale === "en" ? "fr" : "en";

  // Le sélecteur pointe vers la traduction de la page courante quand elle
  // existe. `usePathname` est renseigné dès le prerender (pas de rewrite ni de
  // proxy dans ce projet), donc le bon href est déjà dans le HTML statique :
  // il fonctionne pour les crawlers et sans JavaScript.
  const langTarget = switcherTargetFor(pathname ?? homeHref, locale);
  const langTitle = langTarget.isCounterpart ? undefined : t.switcher.noCounterpart;

  return (
    <HeaderWrapper>
      <Nav>
        <Link href={homeHref}>
          <Image
            src="/images/mkz-logo.svg"
            alt="MKZ"
            width={72}
            height={37}
            priority
          />
        </Link>

        <NavLinks>
          {t.nav.map((item) => (
            <li key={item.name}>
              <NavLink href={item.href}>{item.name}</NavLink>
            </li>
          ))}
        </NavLinks>

        <RightSide>
          <DesktopOnly>
            <Phone href={t.header.phoneHref}>{t.header.phoneLabel}</Phone>
            <CTALink href={CALENDLY} target="_blank" rel="noopener noreferrer">
              {t.header.cta}
            </CTALink>
          </DesktopOnly>
          <LangSwitch
            href={langTarget.href}
            hrefLang={otherLocale}
            lang={otherLocale}
            title={langTitle}
            aria-label={`${t.switcher.label} : ${t.switcher.otherName}`}
          >
            <LangPair locale={locale} />
          </LangSwitch>
        </RightSide>

        <MenuButton
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t.header.menu}
        >
          <MenuBar open={mobileOpen} position="top" />
          <MenuBar open={mobileOpen} position="mid" />
          <MenuBar open={mobileOpen} position="bot" />
        </MenuButton>
      </Nav>

      {mobileOpen && (
        <MobileMenu>
          <MobileLinks>
            {t.nav.map((item) => (
              <li key={item.name}>
                <NavLink href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <MobilePhone href={t.header.phoneHref}>{t.header.phoneLabel}</MobilePhone>
            </li>
            {/* Pas de sélecteur de langue ici : il vit désormais dans la barre,
                visible sans ouvrir le menu. Le dupliquer ferait deux boutons
                identiques à l'écran quand le menu est ouvert. */}
            <li>
              <MobileCTA href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                {t.header.cta}
              </MobileCTA>
            </li>
          </MobileLinks>
        </MobileMenu>
      )}
    </HeaderWrapper>
  );
}
