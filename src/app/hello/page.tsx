import type { Metadata } from "next";
import HelloGate from "@/components/HelloGate";

export const metadata: Metadata = {
  title: "Hello there",
  robots: { index: false, follow: false },
};

export default function HelloPage() {
  return <HelloGate />;
}
