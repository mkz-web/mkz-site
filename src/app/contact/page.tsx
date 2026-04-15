import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = createMetadata({
  title: "Contact — Audit SEO gratuit 30 min",
  description:
    "Contactez MKZ pour un audit SEO gratuit de 30 minutes. Tél : 07 69 09 39 09. Email : contact@mkz-consulting.fr. 1 rue Françoise Sagan, 77230 Dammartin-en-Goële.",
  alternates: { canonical: "https://mkz.fr/contact/" },
});

export default function ContactPage() {
  return <ContactContent />;
}
