import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { LegalNoticeEn } from "@/components/en/LegalContentEn";

export const metadata: Metadata = createMetadata("en", {
  title: "Legal notice",
  description:
    "Legal notice for the MKZ website. MKZ, SAS à associé unique, SIRET 983 662 784 00013, RCS Meaux, France. The French version is the legally binding one.",
  // Indexable, comme /mentions-legales/ (décision du 30/07/2026) : les deux
  // moitiés d'une paire hreflang doivent avoir la même indexabilité, sinon
  // Google reçoit une alternative qu'il n'a pas le droit d'indexer.
  path: "/en/legal-notice/",
});

export default function EnLegalNoticePage() {
  return <LegalNoticeEn />;
}
