import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6 pb-20 md:pb-6 flex flex-col gap-3 items-center text-center md:flex-row md:justify-between md:gap-0 md:text-left text-sm text-zinc-600">
        <p className="break-words max-w-[80vw] md:max-w-none">© {new Date().getFullYear()} EKT PV Montage</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
