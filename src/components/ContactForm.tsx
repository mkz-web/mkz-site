"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";

const WEB3FORMS_KEY = "5f80cd7f-a0fb-484c-995c-a6a1a5534c34";

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

const SubmitButton = styled.button<{ disabled?: boolean }>`
  padding: 15px 30px;
  background: ${theme.colors.cta};
  color: white;
  box-shadow: ${theme.shadows.cta};
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${theme.colors.ctaHover};
    box-shadow: ${theme.shadows.ctaHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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

const ErrorBox = styled.div`
  padding: 16px;
  border-radius: ${theme.radius.md};
  border: 1px solid #ef444433;
  background: #ef444408;
  color: #dc2626;
  font-size: 14px;
  text-align: center;
`;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: data.name,
          email: data.email,
          subject: "Nouveau message mkz.fr : " + (data.subject || "Contact"),
          message: data.message,
          from_name: "MKZ Site Web",
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Web3Forms error:", result);
        setStatus("error");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <SuccessBox>
        <SuccessIcon>&#10003;</SuccessIcon>
        <SuccessTitle>Message envoy&eacute; !</SuccessTitle>
        <SuccessText>
          Merci pour votre message. Je vous recontacte dans les 24h.
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

      {status === "error" && (
        <ErrorBox>
          Une erreur est survenue. Veuillez r&eacute;essayer ou contactez-moi au 07 69 09 39 09.
        </ErrorBox>
      )}

      <SubmitButton type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
      </SubmitButton>
    </Form>
  );
}
