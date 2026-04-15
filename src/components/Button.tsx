"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

const baseStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  font-size: 15px;
  font-weight: 600;
  border-radius: ${theme.radius.md};
  transition: all 0.25s ease;
  letter-spacing: 0.01em;
  text-decoration: none;
  cursor: pointer;
`;

const primaryStyles = `
  background-color: ${theme.colors.cta};
  color: white;
  box-shadow: ${theme.shadows.cta};
  &:hover {
    background-color: ${theme.colors.ctaHover};
    box-shadow: ${theme.shadows.ctaHover};
    transform: translateY(-2px) scale(1.02);
  }
  &:active {
    transform: translateY(0) scale(1);
  }
`;

const secondaryStyles = `
  background-color: transparent;
  color: ${theme.colors.accent};
  border: 2px solid ${theme.colors.accent};
  &:hover {
    background-color: ${theme.colors.accent};
    color: white;
  }
`;

const StyledInternalLink = styled(Link)<{ variant: "primary" | "secondary" }>`
  ${baseStyles}
  ${({ variant }) => (variant === "primary" ? primaryStyles : secondaryStyles)}
`;

const StyledExternalLink = styled.a<{ variant: "primary" | "secondary" }>`
  ${baseStyles}
  ${({ variant }) => (variant === "primary" ? primaryStyles : secondaryStyles)}
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
