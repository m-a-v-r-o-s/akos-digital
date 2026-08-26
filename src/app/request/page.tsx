import type { Metadata } from "next";
import RequestPageShell from "@/components/RequestPageShell";

export const metadata: Metadata = {
  title: "Request a Quote | Ζητήστε Προσφορά · Akos Digital Services",
  description:
    "Tell me about your project in a few quick questions and get a clear, no-obligation quote within 24 hours — web developer serving businesses across Greece, in English or Greek. // Πες μου για το έργο σου και έλα μια ξεκάθαρη προσφορά χωρίς δέσμευση εντός 24 ωρών.",
  openGraph: {
    title: "Request a Quote | Ζητήστε Προσφορά · Akos Digital Services",
    description:
      "Tell me about your project in a few quick questions and I'll get back to you within 24 hours.",
    locale: "el_GR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [{ url: "/og/cover.jpg", width: 1280, height: 720 }],
  },
};

export default function RequestPage() {
  return <RequestPageShell />;
}
