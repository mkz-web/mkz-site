"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { useState } from "react";
import { theme } from "@/lib/theme";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
  { name: "La m\u00e9thode", href: "/#methode" },
  { name: "T\u00e9moignages", href: "/#temoignages" },
  { name: "Contact", href: "/contact" },
];

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${theme.colors.border};
`;

const Nav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
`;

const NavLinks = styled.ul`
  display: none;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  transition: color 0.2s;
  font-weight: 500;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const CTALink = styled.a`
  display: none;
  padding: 10px 20px;
  background: ${theme.colors.cta};
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${theme.radius.md};
  transition: all 0.25s;
  text-decoration: none;
  box-shadow: ${theme.shadows.cta};

  &:hover {
    background: ${theme.colors.ctaHover};
    box-shadow: ${theme.shadows.ctaHover};
    transform: translateY(-1px);
  }

  @media (min-width: ${theme.breakpoints.md}) {
    display: inline-flex;
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

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MenuBar = styled.span<{ open: boolean; position: "top" | "mid" | "bot" }>`
  display: block;
  width: 22px;
  height: 2px;
  background: ${theme.colors.text};
  border-radius: 1px;
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
  background: white;
  padding: 16px 24px;

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MobileCTA = styled.a`
  display: inline-flex;
  padding: 10px 20px;
  background: ${theme.colors.cta};
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${theme.radius.md};
  text-decoration: none;
  box-shadow: ${theme.shadows.cta};
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
            width={80}
            height={41}
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

        <CTALink href={CALENDLY} target="_blank" rel="noopener noreferrer">
          Audit gratuit
        </CTALink>

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
