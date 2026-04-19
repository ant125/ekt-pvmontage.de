import { projects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjektePage() {
  return (
    <main className="bg-white text-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Referenzen
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          Alle Projekte
        </h1>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
