import type { ReactNode } from "react";

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
      <body>{children}</body>
    </html>
  );
}
