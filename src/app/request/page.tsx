import type { Metadata } from "next";
import RequestPageShell from "@/components/RequestPageShell";

export const metadata: Metadata = {
  title: "Request a Quote · Akos Digital Services",
  description:
    "Tell me about your project in a few quick questions and I'll get back to you within 24 hours with ideas and a clear, no-obligation quote.",
  openGraph: {
    title: "Request a Quote · Akos Digital Services",
    description:
      "Tell me about your project in a few quick questions and I'll get back to you within 24 hours.",
    locale: "el_GR",
    type: "website",
  },
};

export default function RequestPage() {
  return <RequestPageShell />;
}
