import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "logUs Studio — The little things become your story.",
  description:
    "Independent software studio building small products that help people remember more. Based in Korea.",
  metadataBase: new URL("https://logusstudio.com"),
  openGraph: {
    title: "logUs Studio — The little things become your story.",
    description:
      "Independent software studio building small products that help people remember more. Based in Korea.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/brand/logo-symbol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}
