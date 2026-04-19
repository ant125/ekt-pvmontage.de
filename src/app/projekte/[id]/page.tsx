import Link from "next/link";
import { projects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projectIndex >= 0 ? projects[projectIndex] : undefined;

  if (!project) {
    return (
      <main className="bg-white text-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-zinc-600">Projekt nicht gefunden</p>
          <Link
            href="/projekte"
            className="mt-4 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4"
          >
            Zurueck zur Uebersicht
          </Link>
        </div>
      </main>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;

  return (
    <main className="bg-white text-zinc-800">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-semibold text-zinc-900">{project.title}</h1>

        {(project.location || project.year) && (
          <p className="mt-3 text-zinc-500">
            {project.location}
            {project.location && project.year ? " • " : ""}
            {project.year ?? ""}
          </p>
        )}

        <img
          src={project.coverImage}
          alt={project.title}
          className="mt-8 w-full rounded-2xl object-cover"
        />

        <div className="mt-8 whitespace-pre-line leading-relaxed text-zinc-700">
          {project.fullText}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {project.images.map((img, i) => (
            <img
              key={`${project.id}-img-${i}`}
              src={img}
              alt=""
              className="h-56 w-full rounded-xl object-cover sm:h-64"
            />
          ))}
        </div>

        <div className="mt-16 flex justify-between text-sm">
          {prevProject ? (
            <Link
              href={`/projekte/${prevProject.id}`}
              className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
            >
              ← Vorheriges Projekt
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projekte/${nextProject.id}`}
              className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
            >
              Nächstes Projekt →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
