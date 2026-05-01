"use client";

import { deleteProjectAction } from "@/lib/admin-projects";

type DeleteProjectButtonProps = {
  id: string;
  title: string;
};

export default function DeleteProjectButton({
  id,
  title,
}: DeleteProjectButtonProps) {
  return (
    <form
      action={deleteProjectAction}
      onSubmit={(event) => {
        if (!confirm(`Projekt "${title}" wirklich löschen?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded border border-red-300 px-3 py-1 text-xs text-red-700 transition hover:bg-red-50"
      >
        Löschen
      </button>
    </form>
  );
}
