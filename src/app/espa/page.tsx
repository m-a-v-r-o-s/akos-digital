import type { Metadata } from "next";
import EspaPage from "@/components/EspaPage";

export const metadata: Metadata = {
  title: "Ιστοσελίδες μέσω ΕΣΠΑ · Akos Digital Services",
  description:
    "Build or upgrade your business website with ESPA funding. Free, no-obligation eligibility assessment — I check if you qualify and handle the build and the audit paperwork.",
  openGraph: {
    title: "Ιστοσελίδες μέσω ΕΣΠΑ · Akos Digital Services",
    description:
      "Build or upgrade your website with ESPA funding. Free eligibility assessment within 24 hours.",
    locale: "el_GR",
    type: "website",
    images: [{ url: "/og/cover.jpg", width: 1280, height: 720 }],
  },
};

export default function Espa() {
  return <EspaPage />;
}
