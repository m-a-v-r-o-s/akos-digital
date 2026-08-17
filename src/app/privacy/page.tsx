import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy · Akos Digital Services",
  robots: { index: false, follow: false },
};

export default function Privacy() {
  return <PrivacyPage />;
}
