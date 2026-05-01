import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-zinc-600">
        <p>© 2026 EKT PV Montage</p>
        <nav className="flex items-center gap-6">
          <Link href="/impressum" className="hover:text-zinc-900 transition">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-zinc-900 transition">
            Datenschutz
          </Link>
          <Link href="/#kontakt" className="hover:text-zinc-900 transition">
            Kontakt
          </Link>
        </nav>
      </div>
    </footer>
  );
}
