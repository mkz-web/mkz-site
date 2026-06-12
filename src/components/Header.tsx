"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { useState } from "react";
import { theme } from "@/lib/theme";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Création de site", href: "/creation-site-internet" },
  { name: "SEO", href: "/referencement-seo" },
  { name: "Conseils", href: "/conseils" },
  { name: "Témoignages", href: "/#temoignages" },
  { name: "Contact", href: "/contact" },
];

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

const RightSide = styled.div`
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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <HeaderWrapper>
      <Nav>
        <Link href="/">
          <Image
            src="/images/mkz-logo.svg"
            alt="MKZ"
            width={72}
            height={37}
            priority
          />
        </Link>

        <NavLinks>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink href={item.href}>{item.name}</NavLink>
            </li>
          ))}
        </NavLinks>

        <RightSide>
          <Phone href="tel:0769093909">07 69 09 39 09</Phone>
          <CTALink href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Audit gratuit
          </CTALink>
        </RightSide>

        <MenuButton
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <MenuBar open={mobileOpen} position="top" />
          <MenuBar open={mobileOpen} position="mid" />
          <MenuBar open={mobileOpen} position="bot" />
        </MenuButton>
      </Nav>

      {mobileOpen && (
        <MobileMenu>
          <MobileLinks>
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <MobilePhone href="tel:0769093909">07 69 09 39 09</MobilePhone>
            </li>
            <li>
              <MobileCTA href={CALENDLY} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                Audit gratuit
              </MobileCTA>
            </li>
          </MobileLinks>
        </MobileMenu>
      )}
    </HeaderWrapper>
  );
}
