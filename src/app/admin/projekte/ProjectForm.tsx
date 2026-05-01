"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createProjectAction,
  updateProjectAction,
} from "@/lib/admin-projects";
import type { ProjectFormState } from "@/lib/admin-projects-types";
import type { ProjectAdminRow } from "@/lib/project-service";

type ProjectFormProps =
  | { mode: "create"; initial?: undefined }
  | { mode: "edit"; initial: ProjectAdminRow };

const inputCls =
  "w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300";

export default function ProjectForm({ mode, initial }: ProjectFormProps) {
  const action = mode === "create" ? createProjectAction : updateProjectAction;
  const [state, formAction, pending] = useActionState<ProjectFormState, FormData>(
    action,
    undefined,
  );

  const fieldErr = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      {mode === "edit" ? (
        <input type="hidden" name="id" value={initial.id} />
      ) : null}

      <Field label="Titel" error={fieldErr.title}>
        <input
          name="title"
          defaultValue={initial?.title ?? ""}
          className={inputCls}
        />
      </Field>

      <Field
        label="Slug (URL-Teil, z. B. projekt-10)"
        error={fieldErr.slug}
        hint="Wird in der URL benutzt: /projekte/<slug>"
      >
        <input
          name="slug"
          defaultValue={initial?.slug ?? ""}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ort">
          <input
            name="location"
            defaultValue={initial?.location ?? ""}
            className={inputCls}
            placeholder="z. B. Augsburg"
          />
        </Field>
        <Field label="Jahr">
          <input
            name="year"
            defaultValue={initial?.year ?? ""}
            className={inputCls}
            placeholder="z. B. 2024"
          />
        </Field>
      </div>

      <Field label="Kurztext (für Karte)" error={fieldErr.shortText}>
        <textarea
          name="shortText"
          defaultValue={initial?.shortText ?? ""}
          rows={2}
          className={inputCls}
        />
      </Field>

      <Field label="Volltext (für Projektseite)" error={fieldErr.fullText}>
        <textarea
          name="fullText"
          defaultValue={initial?.fullText ?? ""}
          rows={6}
          className={inputCls}
        />
      </Field>

      <Field
        label="Hauptbild – URL/Pfad"
        error={fieldErr.coverImage}
        hint="z. B. /projects/projekt-1/cover.jpg"
      >
        <input
          name="coverImage"
          defaultValue={initial?.coverImage ?? ""}
          className={inputCls}
        />
      </Field>

      <Field
        label="Galerie-Bilder"
        hint="Eine URL/ein Pfad pro Zeile"
      >
        <textarea
          name="images"
          defaultValue={(initial?.images ?? []).join("\n")}
          rows={5}
          className={`${inputCls} font-mono text-xs`}
          placeholder={"/projects/projekt-1/img1.jpg\n/projects/projekt-1/img2.jpg"}
        />
      </Field>

      <Field label="Sichtbarkeit">
        <label className="mt-2 inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initial?.published ?? true}
          />
          Veröffentlicht
        </label>
      </Field>

      {state?.error ? (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
        >
          {pending ? "Speichern…" : "Speichern"}
        </button>
        <Link
          href="/admin/projekte"
          className="text-sm text-gray-600 hover:underline"
        >
          Abbrechen
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p className="mt-1 text-xs text-gray-500">{hint}</p>
      ) : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
