import type { Metadata } from "next";
import TermsPage from "@/components/TermsPage";

export const metadata: Metadata = {
  title: "Terms of Service · Akos Digital Services",
};

export default function Terms() {
  return <TermsPage />;
}
