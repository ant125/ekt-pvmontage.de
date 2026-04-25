import Link from "next/link";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import Container from "@/components/ui/Container";

const PROJECTS_PER_PAGE = 6;

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const rawPage = Number(sp.page);
  const page = Math.min(
    Math.max(1, Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1),
    totalPages,
  );

  const start = (page - 1) * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(start, end);

  return (
    <main className="bg-white text-zinc-800">
      <Container>
        <div className="py-16 md:py-20">
        <nav className="text-sm text-zinc-500">
          <Link href="/">Startseite</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">Projekte</span>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Referenzen
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Alle Projekte
        </h1>

        <p className="mt-3 max-w-xl text-zinc-600">
          Ein Überblick unserer abgeschlossenen Arbeiten und Projekte.
        </p>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          {page > 1 && (
            <Link
              href={`/projekte?page=${page - 1}`}
              className="text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
            >
              Zurück
            </Link>
          )}
          <span className="text-sm text-zinc-500">
            Seite {page} von {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/projekte?page=${page + 1}`}
              className="text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-900"
            >
              Weiter
            </Link>
          )}
        </div>

        <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 px-8 py-24 text-center text-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] md:mt-20 md:px-10 md:py-28">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Starten Sie Ihr Projekt mit uns
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-300">
            Lassen Sie uns Ihr Projekt gemeinsam umsetzen – von der Planung bis
            zur Umsetzung.
          </p>
          <a
            href="/#kontakt"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-black shadow-lg transition-all duration-300 hover:scale-[1.04] hover:bg-zinc-200 hover:shadow-xl active:scale-[0.98]"
          >
            Jetzt anfragen
          </a>
        </section>
        </div>
      </Container>
    </main>
  );
}
