import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
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
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <nav className="text-sm text-zinc-500">
            <Link href="/">Startseite</Link>
            <span className="mx-2">/</span>
            <Link href="/projekte">Projekte</Link>
          </nav>
          <p className="mt-8 text-zinc-600">Projekt nicht gefunden</p>
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
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <nav className="text-sm text-zinc-500">
          <Link href="/">Startseite</Link>
          <span className="mx-2">/</span>
          <Link href="/projekte">Projekte</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{project.title}</span>
        </nav>

        <h1 className="mt-6 mb-2 text-3xl font-semibold text-zinc-900">
          {project.title}
        </h1>

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

        <div className="mt-10 mb-12 flex justify-between border-t border-zinc-200 pt-10 text-sm text-zinc-600">
          {prevProject ? (
            <Link
              href={`/projekte/${prevProject.id}`}
              className="font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-900"
            >
              ← Vorheriges Projekt
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projekte/${nextProject.id}`}
              className="font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-900"
            >
              Nächstes Projekt →
            </Link>
          ) : (
            <div />
          )}
        </div>

        <h3 className="mt-2 text-sm font-medium text-zinc-600">
          Weitere Projekte
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {projects
            .filter((p) => p.id !== project.id)
            .slice(0, 3)
            .map((p) => (
              <div
                key={p.id}
                className="opacity-90 transition hover:opacity-100"
              >
                <ProjectCard project={p} />
              </div>
            ))}
        </div>

        <section className="mt-14 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center md:mt-16 md:p-10">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Starten Sie Ihr Projekt mit uns
          </h2>
          <p className="mt-4 text-zinc-600">
            Lassen Sie uns Ihr Projekt gemeinsam umsetzen.
          </p>
          <a
            href="/#kontakt"
            className="mt-6 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-white"
          >
            Jetzt anfragen
          </a>
        </section>
      </div>
    </main>
  );
}
