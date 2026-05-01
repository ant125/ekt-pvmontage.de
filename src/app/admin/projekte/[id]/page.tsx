import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectByIdForAdmin } from "@/lib/project-service";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectByIdForAdmin(id);

  if (!project) {
    notFound();
  }

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

      <h1 className="mb-1 text-2xl font-semibold">Projekt bearbeiten</h1>
      <p className="mb-6 text-sm text-gray-500">
        Slug: <code className="font-mono">{project.slug}</code>
      </p>

      <ProjectForm mode="edit" initial={project} />
    </main>
  );
}
