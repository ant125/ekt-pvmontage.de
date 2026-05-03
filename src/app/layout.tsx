import type { ReactNode } from "react";
import CookieNoticeBanner from "@/components/layout/CookieNoticeBanner";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata = {
  title: "Photovoltaik Montage & Dachreinigung | EKT PV Montage Bayern",
  description: "Professionelle Montage von Photovoltaikanlagen und Dachreinigung in Bayern. Zuverlässig, schnell und sauber – Ihr Partner für PV-Projekte.",
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
