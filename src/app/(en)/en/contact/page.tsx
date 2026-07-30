import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = createMetadata("en", {
  title: "Contact: free 30-minute French SEO review",
  description:
    "Contact MKZ for a free 30-minute review of your French search visibility. Phone +33 7 69 09 39 09 or email contact@mkz-consulting.fr. Reply within 24h, in English.",
  path: "/en/contact/",
});

export default function EnContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: "Home", url: "/en/" }, { name: "Contact" }])}
      />
      <ContactContent locale="en" />
    </>
  );
}
