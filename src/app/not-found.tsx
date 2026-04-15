"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";

const Wrapper = styled.section`min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 0 24px;`;
const Code = styled.span`font-size: 72px; font-weight: 700; color: ${theme.colors.accent}; display: block;`;
const Title = styled.h1`font-size: 24px; font-weight: 700; margin-top: 16px;`;
const Text = styled.p`margin-top: 8px; color: ${theme.colors.textSecondary};`;

export default function NotFound() {
  return (
    <Wrapper>
      <div style={{ textAlign: "center" }}>
        <Code>404</Code>
        <Title>Page introuvable</Title>
        <Text>D&eacute;sol&eacute;, la page que vous recherchez n&apos;existe pas.</Text>
        <div style={{ marginTop: 32 }}><Button href="/">Retour &agrave; l&apos;accueil</Button></div>
      </div>
    </Wrapper>
  );
}
