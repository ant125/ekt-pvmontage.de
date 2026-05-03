"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-notice-accepted";

export default function CookieNoticeBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, [pathname]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 pt-2 md:pb-5"
      role="dialog"
      aria-label="Cookie-Hinweis"
    >
      <div className="pointer-events-auto w-full max-w-4xl rounded-lg border border-zinc-200 bg-white p-4 shadow-lg md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 md:justify-between">
          <p className="text-sm leading-relaxed text-zinc-700">
            Diese Website verwendet technisch notwendige Cookies sowie
            Sicherheitsdienste (Google reCAPTCHA), um die Funktionalität zu
            gewährleisten. Weitere Informationen finden Sie in unserer{" "}
            <Link
              href="/datenschutz"
              className="font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-700"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 md:px-5"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
