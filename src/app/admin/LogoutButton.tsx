"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  if (pathname === "/admin/login") {
    return null;
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="text-zinc-600 underline-offset-2 hover:underline disabled:opacity-50"
    >
      {loading ? "…" : "Logout"}
    </button>
  );
}
