import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
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
        <SiteFooter />
      </body>
    </html>
  );
}
