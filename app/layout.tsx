"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { SessionProvider } from "next-auth/react";

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
      <SessionProvider>
        <body className={`${quicksand.className} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
