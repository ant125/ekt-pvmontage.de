import Link from "next/link";
import { getAllProjectsForAdmin } from "@/lib/project-service";
import {
  moveProjectAction,
  togglePublishedAction,
} from "@/lib/admin-projects";
import DeleteProjectButton from "./DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getAllProjectsForAdmin();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-gray-600 hover:underline">
          ← Admin Panel
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Projekte</h1>
          <p className="mt-1 text-sm text-gray-500">
            {projects.length}{" "}
            {projects.length === 1 ? "Projekt" : "Projekte"} insgesamt
          </p>
        </div>
        <Link
          href="/admin/projekte/new"
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Neues Projekt
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          Noch keine Projekte. Klicken Sie auf „Neues Projekt“, um anzufangen.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="flex flex-wrap items-center gap-4 p-4"
            >
              <div className="h-16 w-24 flex-none overflow-hidden rounded bg-gray-100">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate font-medium text-gray-900">
                    {project.title}
                  </span>
                  {project.published ? (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Sichtbar
                    </span>
                  ) : (
                    <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                      Versteckt
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {[project.location, project.year]
                    .filter(Boolean)
                    .join(" • ") || "—"}{" "}
                  · slug: <code className="font-mono">{project.slug}</code> ·
                  Reihenfolge: {project.sortOrder}
                </p>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-y-2 md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-2">
                <div className="flex flex-wrap items-center gap-2 md:contents">
                  <form action={moveProjectAction}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button
                      type="submit"
                      disabled={index === 0}
                      title="Nach oben"
                      className="rounded border border-gray-300 px-2 py-1 text-xs transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↑
                    </button>
                  </form>
                  <form action={moveProjectAction}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      disabled={index === projects.length - 1}
                      title="Nach unten"
                      className="rounded border border-gray-300 px-2 py-1 text-xs transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </form>

                  <form action={togglePublishedAction}>
                    <input type="hidden" name="id" value={project.id} />
                    <button
                      type="submit"
                      className="rounded border border-gray-300 px-3 py-1 text-xs transition hover:bg-gray-50"
                    >
                      {project.published ? "Verstecken" : "Veröffentlichen"}
                    </button>
                  </form>

                  <Link
                    href={`/admin/projekte/${project.id}`}
                    className="rounded border border-gray-300 px-3 py-1 text-xs transition hover:bg-gray-50"
                  >
                    Bearbeiten
                  </Link>
                </div>

                <div className="flex md:contents">
                  <DeleteProjectButton id={project.id} title={project.title} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
