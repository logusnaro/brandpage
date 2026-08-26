import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "logUs Studio — 작은 순간이 당신의 이야기가 됩니다.",
  description: "평범한 하루와 삶의 작은 순간이 사라지지 않도록 돕는 소프트웨어 스튜디오입니다.",
  metadataBase: new URL("https://logusstudio.com"),
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
    <html lang="ko" className="h-full">
      <body className="min-h-full bg-[var(--background)] text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}
