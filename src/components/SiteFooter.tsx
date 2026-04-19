export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-sm text-zinc-600 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} EKT PV Montage</p>
        <nav className="flex gap-6">
          <a href="/impressum" className="hover:text-zinc-900">
            Impressum
          </a>
          <a href="/datenschutz" className="hover:text-zinc-900">
            Datenschutz
          </a>
          <a href="/kontakt" className="hover:text-zinc-900">
            Kontakt
          </a>
        </nav>
      </div>
    </footer>
  );
}
