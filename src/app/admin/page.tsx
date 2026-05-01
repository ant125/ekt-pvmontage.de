import Link from "next/link";

const navItems = [
  { href: "/admin/impressum", label: "Impressum" },
  { href: "/admin/datenschutz", label: "Datenschutz" },
  { href: "/admin/projekte", label: "Projekte" },
  { href: "/admin/team", label: "Team" },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold">Admin Panel</h1>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded border border-gray-200 px-4 py-3 text-gray-800 transition hover:bg-gray-50"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
