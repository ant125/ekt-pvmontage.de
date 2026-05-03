import type { ReactNode } from "react";
import CookieNoticeBanner from "@/components/layout/CookieNoticeBanner";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata = {
  title: "PV Montage",
  description: "B2B монтаж солнечных модулей",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {children}

        <Footer />
        <CookieNoticeBanner />
      </body>
    </html>
  );
}
