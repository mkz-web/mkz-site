"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";
import { ui } from "@/lib/i18n";

// 404 de la branche anglaise. La 404 globale (out/404.html), celle que
// Cloudflare Pages sert réellement pour une URL inconnue, reste la française :
// c'est la langue par défaut du site.

const Wrapper = styled.section`min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 0 24px;`;
const Code = styled.span`font-size: 72px; font-weight: 700; color: ${theme.colors.accent}; display: block;`;
const Title = styled.h1`font-size: 24px; font-weight: 700; margin-top: 16px;`;
const Text = styled.p`margin-top: 8px; color: ${theme.colors.textSecondary};`;

export default function EnNotFound() {
  const t = ui.en.notFound;
  return (
    <Wrapper>
      <div style={{ textAlign: "center" }}>
        <Code>404</Code>
        <Title>{t.title}</Title>
        <Text>{t.text}</Text>
        <div style={{ marginTop: 32 }}>
          <Button href="/en/">{t.back}</Button>
        </div>
      </div>
    </Wrapper>
  );
}
