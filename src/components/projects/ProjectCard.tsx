import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projekte/${project.id}`}
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
    >
      <article className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_6px_30px_-8px_rgba(15,23,42,0.09)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-zinc-300/90 hover:shadow-[0_14px_44px_-12px_rgba(15,23,42,0.13)]">
        <div className="relative overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
            Referenzprojekt
          </p>
        </div>

        <div className={compact ? "p-4" : "p-6 md:p-7"}>
          <h3
            className={
              compact
                ? "text-base font-semibold tracking-tight text-zinc-900"
                : "text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
            }
          >
            {project.title}
          </h3>

          <p
            className={
              compact
                ? "mt-2 text-sm leading-relaxed text-zinc-500"
                : "mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[0.95rem]"
            }
          >
            {project.shortText}
          </p>
        </div>
      </article>
    </Link>
  );
}
