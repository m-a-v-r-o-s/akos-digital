import type { Metadata } from "next";
import TermsPage from "@/components/TermsPage";

export const metadata: Metadata = {
  title: "Terms of Service · Akos Digital Services",
  robots: { index: false, follow: false },
};

export default function Terms() {
  return <TermsPage />;
}
