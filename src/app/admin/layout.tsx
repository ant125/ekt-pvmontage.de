import type { ReactNode } from "react";
import { LogoutButton } from "./LogoutButton";

export const metadata = {
  title: "Admin · PV Montage",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Hide the public site footer rendered by the root layout on admin pages */}
      <style>{`body > footer { display: none !important; }`}</style>
      <div className="flex min-h-screen flex-col bg-white text-zinc-900">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-zinc-500">
            <span>Admin Panel</span>
            <LogoutButton />
          </div>
        </footer>
      </div>
    </>
  );
}
