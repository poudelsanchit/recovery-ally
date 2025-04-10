import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import SessionWrapper from "@/lib/sessionWrapper";

const quicksand = Quicksand({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={`${quicksand.className} antialiased`}>{children}</body>
      </SessionWrapper>
    </html>
  );
}
