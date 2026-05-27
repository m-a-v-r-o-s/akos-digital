import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Θεόδωρος Ι. Μαύρος — Akos Digital Services",
  description:
    "Digital strategist & web architect building bespoke digital experiences for ambitious brands across Greece and Europe.",
  openGraph: {
    title: "Θεόδωρος Ι. Μαύρος — Akos Digital Services",
    description:
      "Digital strategist & web architect building bespoke digital experiences for ambitious brands.",
    locale: "el_GR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
