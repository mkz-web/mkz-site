"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${theme.colors.textSecondary};
    opacity: 0.6;
  }

  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.accent}15;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  outline: none;
  resize: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${theme.colors.textSecondary};
    opacity: 0.6;
  }

  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.accent}15;
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background: ${theme.colors.cta};
  color: white;
  box-shadow: ${theme.shadows.cta};
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.ctaHover};
    box-shadow: ${theme.shadows.ctaHover};
    transform: translateY(-1px);
  }
`;

const SuccessBox = styled.div`
  padding: 32px;
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.success}33;
  background: ${theme.colors.success}08;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
  color: ${theme.colors.success};
`;

const SuccessTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const SuccessText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessBox>
        <SuccessIcon>&#10003;</SuccessIcon>
        <SuccessTitle>Message envoy&eacute; !</SuccessTitle>
        <SuccessText>
          Merci pour votre message. Nous vous recontacterons dans les plus brefs
          d&eacute;lais.
        </SuccessText>
      </SuccessBox>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <div>
          <Label htmlFor="name">Nom complet</Label>
          <Input type="text" id="name" name="name" required placeholder="Jean Dupont" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" required placeholder="jean@exemple.fr" />
        </div>
      </Row>
      <div>
        <Label htmlFor="subject">Sujet</Label>
        <Input type="text" id="subject" name="subject" required placeholder="Nouveau projet web" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required placeholder="D&eacute;crivez votre projet..." />
      </div>
      <SubmitButton type="submit">Envoyer le message</SubmitButton>
    </Form>
  );
}
