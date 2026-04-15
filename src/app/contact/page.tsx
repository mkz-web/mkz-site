import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = createMetadata({
  title: "Contact \u2014 Audit SEO gratuit 30 min",
  description:
    "Contactez MKZ pour un audit SEO gratuit de 30 minutes. T\u00e9l : 07 69 09 39 09. Email : contact@mkz-consulting.fr. 1 rue Fran\u00e7oise Sagan, 77230 Dammartin-en-Go\u00eble.",
  alternates: { canonical: "https://mkz.fr/contact/" },
});

export default function ContactPage() {
  return <ContactContent />;
}
