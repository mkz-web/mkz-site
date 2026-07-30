"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import { ui, type Locale } from "@/lib/i18n";

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

export default function ContactForm({ locale = "fr" }: { locale?: Locale }) {
  const t = ui[locale].contact.form;
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
          subject: t.mailSubjectPrefix + (data.subject || t.defaultSubject),
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
        <SuccessTitle>{t.successTitle}</SuccessTitle>
        <SuccessText>{t.successText}</SuccessText>
      </SuccessBox>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <div>
          <Label htmlFor="name">{t.name}</Label>
          <Input type="text" id="name" name="name" required placeholder={t.namePlaceholder} />
        </div>
        <div>
          <Label htmlFor="email">{t.email}</Label>
          <Input type="email" id="email" name="email" required placeholder={t.emailPlaceholder} />
        </div>
      </Row>
      <div>
        <Label htmlFor="subject">{t.subject}</Label>
        <Input type="text" id="subject" name="subject" required placeholder={t.subjectPlaceholder} />
      </div>
      <div>
        <Label htmlFor="message">{t.message}</Label>
        <Textarea id="message" name="message" rows={5} required placeholder={t.messagePlaceholder} />
      </div>

      {status === "error" && (
        <ErrorBox>{t.errorText}</ErrorBox>
      )}

      <SubmitButton type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </SubmitButton>
    </Form>
  );
}
