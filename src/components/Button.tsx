"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "onDark";
};

// Boutons « étiquette d'atelier » : rectangle net, aucun dégradé, aucune ombre
// floue ; au survol, léger décalage + ombre dure (signal imprimé).

const baseStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: ${theme.radius.sm};
  transition: all 0.18s ${theme.easing};
  letter-spacing: 0.01em;
  text-decoration: none;
  cursor: pointer;
`;

const primaryStyles = `
  background-color: ${theme.colors.ctaInk};
  color: white;
  border: 1px solid ${theme.colors.ctaInk};
  &:hover {
    background-color: ${theme.colors.ctaHover};
    border-color: ${theme.colors.ctaHover};
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba(34, 31, 26, 0.22);
  }
  &:active {
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

const secondaryStyles = `
  background-color: transparent;
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.borderInk};
  &:hover {
    background-color: ${theme.colors.text};
    color: ${theme.colors.background};
  }
`;

const onDarkStyles = `
  background-color: transparent;
  color: ${theme.colors.textOnDark};
  border: 1px solid rgba(246, 241, 231, 0.55);
  &:hover {
    background-color: ${theme.colors.textOnDark};
    color: ${theme.colors.dark};
  }
`;

const variantStyles = (variant: "primary" | "secondary" | "onDark") => {
  if (variant === "primary") return primaryStyles;
  if (variant === "onDark") return onDarkStyles;
  return secondaryStyles;
};

const StyledInternalLink = styled(Link)<{ variant: "primary" | "secondary" | "onDark" }>`
  ${baseStyles}
  ${({ variant }) => variantStyles(variant)}
`;

const StyledExternalLink = styled.a<{ variant: "primary" | "secondary" | "onDark" }>`
  ${baseStyles}
  ${({ variant }) => variantStyles(variant)}
`;

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <StyledExternalLink
        href={href}
        variant={variant}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </StyledExternalLink>
    );
  }

  return (
    <StyledInternalLink href={href} variant={variant}>
      {children}
    </StyledInternalLink>
  );
}
