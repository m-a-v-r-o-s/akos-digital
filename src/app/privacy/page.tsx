import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy · Akos Digital Services",
};

export default function Privacy() {
  return <PrivacyPage />;
}
