import "./globals.css";
import { Quicksand } from "next/font/google";
import SessionWrapper from "@/lib/sessionWrapper";
import { Toaster } from "@/components/ui/sonner";

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
        <body className={`${quicksand.className} antialiased`}>
          <Toaster />
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
