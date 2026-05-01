import Link from "next/link";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6">
        <Link
          href="/admin/projekte"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Projekte
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold">Neues Projekt</h1>

      <ProjectForm mode="create" />
    </main>
  );
}
