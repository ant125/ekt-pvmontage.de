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
      className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_6px_30px_-8px_rgba(15,23,42,0.09)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:border-zinc-300/90 hover:shadow-[0_18px_50px_-14px_rgba(15,23,42,0.18)]">
        <div className="relative overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-52 w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.92]"
          />
        </div>

        <div className={compact ? "flex flex-1 flex-col p-4" : "flex flex-1 flex-col p-6 md:p-7"}>
          <h3
            className={
              compact
                ? "line-clamp-2 text-sm font-semibold leading-tight tracking-tight text-zinc-900"
                : "line-clamp-2 text-base font-semibold leading-tight tracking-tight text-zinc-900 sm:text-lg"
            }
          >
            {project.title}
          </h3>

          <p
            className={
              compact
                ? "mt-1.5 line-clamp-2 text-sm leading-snug text-zinc-500"
                : "mt-2 line-clamp-2 text-sm leading-snug text-zinc-600 sm:text-[0.95rem]"
            }
          >
            {project.shortText}
          </p>
        </div>
      </article>
    </Link>
  );
}
