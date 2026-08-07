import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PrivacyPolicyEn } from "@/components/en/LegalContentEn";

export const metadata: Metadata = createMetadata("en", {
  title: "Privacy policy",
  description:
    "How MKZ handles your personal data: what the contact form collects, why, for how long, and how to exercise your GDPR rights. The French version is binding.",
  // Indexable, comme /politique-confidentialite/ (décision du 30/07/2026) : les
  // deux moitiés d'une paire hreflang doivent avoir la même indexabilité.
  path: "/en/privacy-policy/",
});

export default function EnPrivacyPolicyPage() {
  return <PrivacyPolicyEn />;
}
