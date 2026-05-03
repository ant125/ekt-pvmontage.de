"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import {
  createProjectAction,
  moveProjectImageAction,
  removeProjectImageAction,
  type ProjectFormActionState,
  updateProjectAction,
  uploadProjectImagesAction,
} from "@/lib/admin-projects";
import type { UploadActionState } from "@/lib/admin-projects-types";import type { ProjectAdminRow } from "@/lib/project-service";

type ProjectFormProps =
  | { mode: "create"; initial?: undefined }
  | { mode: "edit"; initial: ProjectAdminRow };

const inputCls =
  "w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-1 focus:ring-gray-300";

const COMPRESSION_OPTIONS = {
  maxWidthOrHeight: 2000,
  maxSizeMB: 1,
  fileType: "image/webp",
  initialQuality: 0.8,
  useWebWorker: true,
};

const ALLOWED_INPUT_ACCEPT = "image/jpeg,image/png,image/webp";

const HEIC_ERROR =
  "HEIC-Dateien werden derzeit nicht unterstützt. Bitte lade ein JPG, PNG oder WebP hoch.";

function isHeic(file: File): boolean {
  const t = file.type.toLowerCase();
  if (t === "image/heic" || t === "image/heif") return true;
  const n = file.name.toLowerCase();
  return n.endsWith(".heic") || n.endsWith(".heif");
}

async function compressForUpload(file: File): Promise<File> {
  const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
  if (compressed instanceof File) return compressed;
  return new File([compressed], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
    type: "image/webp",
  });
}

export default function ProjectForm({ mode, initial }: ProjectFormProps) {
  const action = mode === "create" ? createProjectAction : updateProjectAction;
  const [state, formAction, pending] = useActionState<
    ProjectFormActionState,
    FormData
  >(action, undefined);

  const fieldErr = state?.fieldErrors ?? {};

  const defaults =
    state?.values ?? {
      title: initial?.title ?? "",
      location: initial?.location ?? "",
      year: initial?.year ?? "",
      shortText: initial?.shortText ?? "",
      fullText: initial?.fullText ?? "",
      published: initial?.published ?? true,
    };

  const formKey = state?.values
    ? `submitted-${defaults.title}-${defaults.location}-${defaults.year}-${defaults.shortText}-${defaults.fullText}-${defaults.published}`
    : `${mode}-${initial?.id ?? "new"}`;

  return (
    <div className="space-y-8">
      <form key={formKey} action={formAction} className="space-y-5">
        {mode === "edit" ? (
          <input type="hidden" name="id" value={initial.id} />
        ) : null}

        <p className="text-xs text-gray-500">* Pflichtfelder</p>

        <Field label="Titel *" error={fieldErr.title}>
          <input
            name="title"
            defaultValue={defaults.title}
            className={inputCls}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Ort *" error={fieldErr.location}>
            <input
              name="location"
              defaultValue={defaults.location}
              className={inputCls}
              placeholder="z. B. Augsburg"
            />
          </Field>
          <Field label="Jahr *" error={fieldErr.year}>
            <input
              name="year"
              defaultValue={defaults.year}
              className={inputCls}
              placeholder="z. B. 2024"
            />
          </Field>
        </div>

        <Field label="Kurztext (für Karte) *" error={fieldErr.shortText}>
          <textarea
            name="shortText"
            defaultValue={defaults.shortText}
            rows={2}
            className={inputCls}
          />
        </Field>

        <Field label="Volltext (für Projektseite) *" error={fieldErr.fullText}>
          <textarea
            name="fullText"
            defaultValue={defaults.fullText}
            rows={6}
            className={inputCls}
          />
        </Field>

        <Field label="Sichtbarkeit">
          <label className="mt-2 inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={defaults.published}
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

      {mode === "edit" ? (
        <ProjectImagesEditor
          projectId={initial.id}
          coverImage={initial.coverImage}
          images={initial.images}
        />
      ) : (
        <p className="rounded border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Bilder können nach dem ersten Speichern hochgeladen werden.
        </p>
      )}
    </div>
  );
}

const MAX_IMAGES_TOTAL = 15;

type SelectedFile = {
  id: string;
  file: File;
  url: string;
};

function ProjectImagesEditor({
  projectId,
  coverImage,
  images,
}: {
  projectId: string;
  coverImage: string;
  images: string[];
}) {
  const allImages = coverImage ? [coverImage, ...images] : images;
  const remainingSlots = MAX_IMAGES_TOTAL - allImages.length;

  const [uploadState, uploadFormAction, uploadPending] = useActionState<
    UploadActionState,
    FormData
  >(uploadProjectImagesAction, undefined);

  const [localError, setLocalError] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [uploadSuccessFlash, setUploadSuccessFlash] = useState(false);
  const [selected, setSelected] = useState<SelectedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadHadPendingRef = useRef(false);

  useEffect(() => {
    return () => {
      for (const s of selected) {
        URL.revokeObjectURL(s.url);
      }
    };
  }, [selected]);

  useEffect(() => {
    if (uploadPending) {
      uploadHadPendingRef.current = true;
      return;
    }
    if (uploadHadPendingRef.current && uploadState?.ok && !uploadState?.error) {
      uploadHadPendingRef.current = false;
      setUploadSuccessFlash(true);
      const timer = window.setTimeout(() => setUploadSuccessFlash(false), 3000);
      return () => window.clearTimeout(timer);
    }
    if (!uploadPending) uploadHadPendingRef.current = false;
    return undefined;
  }, [uploadPending, uploadState?.ok, uploadState?.error]);

  useEffect(() => {
    if (uploadState?.ok) {
      setSelected((prev) => {
        for (const s of prev) URL.revokeObjectURL(s.url);
        return [];
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [uploadState]);

  function removeSelectedFile(id: string) {
    setSelected((prev) => {
      const next: SelectedFile[] = [];
      for (const s of prev) {
        if (s.id === id) URL.revokeObjectURL(s.url);
        else next.push(s);
      }
      return next;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setLocalError(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    const resetPicker = () => {
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    if (!file) {
      resetPicker();
      return;
    }

    setLocalError(null);

    if (isHeic(file)) {
      setLocalError(HEIC_ERROR);
      resetPicker();
      return;
    }

    if (remainingSlots < 1) {
      setLocalError("Maximal 15 Bilder pro Projekt sind erlaubt.");
      resetPicker();
      return;
    }

    setSelected((prev) => {
      for (const s of prev) URL.revokeObjectURL(s.url);
      return [
        {
          id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          url: URL.createObjectURL(file),
        },
      ];
    });

    resetPicker();
  }

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalError(null);

    if (selected.length === 0) {
      setLocalError("Bitte ein Bild auswählen.");
      return;
    }

    if (allImages.length + selected.length > MAX_IMAGES_TOTAL) {
      setLocalError("Maximal 15 Bilder pro Projekt sind erlaubt.");
      return;
    }

    setCompressing(true);
    try {
      const compressedAll: File[] = [];
      for (const s of selected) {
        const c = await compressForUpload(s.file);
        compressedAll.push(c);
      }
      const fd = new FormData();
      fd.append("id", projectId);
      for (const c of compressedAll) {
        fd.append("files", c, c.name || "image.webp");
      }
      startTransition(() => {
        uploadFormAction(fd);
      });
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Komprimierung fehlgeschlagen",
      );
    } finally {
      setCompressing(false);
    }
  }

  const busy = uploadPending || compressing;

  const pickFilesLabel = "Bild auswählen";

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-1 text-base font-semibold text-gray-800">
        Projektbilder ({allImages.length})
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        Das erste Bild ist das Hauptbild.
      </p>

      {allImages.length === 0 ? (
        <p className="mb-4 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Dieses Projekt hat noch kein Bild. Bitte mindestens ein Bild hochladen,
          sonst bleibt die Projektkarte leer.
        </p>
      ) : (
        <ul className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2 md:gap-3">
          {allImages.map((url, idx) => (
            <li
              key={url}
              className="relative overflow-hidden rounded border border-gray-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-[130px] w-full object-cover"
              />
              {idx === 0 ? (
                <span className="absolute left-1 top-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Hauptbild
                </span>
              ) : null}
              <ImageActions
                projectId={projectId}
                url={url}
                isFirst={idx === 0}
                isLast={idx === allImages.length - 1}
              />
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleUpload} className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            id={`project-files-${projectId}`}
            type="file"
            accept={ALLOWED_INPUT_ACCEPT}
            onChange={handleFileChange}
            disabled={busy || remainingSlots === 0}
            className="sr-only"
            aria-label="Projektbild auswählen"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy || remainingSlots === 0}
            className="rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:opacity-50"
          >
            {pickFilesLabel}
          </button>
          <p className="text-xs text-gray-500">
            Max. 15 Bilder pro Projekt. Bilder werden automatisch verkleinert.
          </p>
        </div>

        {selected.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              1 Bild ausgewählt
            </p>
            <ul className="flex flex-wrap gap-2">
              {selected.map((s) => (
                <li
                  key={s.id}
                  className="relative w-[88px] shrink-0 overflow-hidden rounded border border-dashed border-gray-300 bg-gray-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.url}
                    alt={s.file.name}
                    className="h-[88px] w-[88px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(s.id)}
                    disabled={busy}
                    className="absolute bottom-1 left-1/2 max-w-[calc(100%-8px)] -translate-x-1/2 truncate rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-medium text-white hover:bg-black disabled:opacity-50"
                    title={s.file.name}
                  >
                    Entfernen
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <button
            type="submit"
            disabled={busy || selected.length === 0}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            {compressing
              ? "Wird vorbereitet…"
              : uploadPending
                ? "Wird hochgeladen…"
                : "Ausgewähltes Bild hochladen"}
          </button>
          <p className="text-xs text-gray-500">
            JPG, PNG oder WebP · werden automatisch verkleinert
          </p>
        </div>

        {localError ? (
          <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">
            {localError}
          </p>
        ) : null}
        {uploadState?.error ? (
          <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">
            {uploadState.error}
          </p>
        ) : null}
        {uploadSuccessFlash ? (
          <p className="rounded bg-green-50 px-3 py-2 text-sm text-green-700">
            Bilder hinzugefügt.
          </p>
        ) : null}
      </form>
    </section>
  );
}

function ImageActions({
  projectId,
  url,
  isFirst,
  isLast,
}: {
  projectId: string;
  url: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [removeState, removeAction, removePending] = useActionState<
    UploadActionState,
    FormData
  >(removeProjectImageAction, undefined);
  const [moveState, moveAction, movePending] = useActionState<
    UploadActionState,
    FormData
  >(moveProjectImageAction, undefined);

  function dispatchMove(direction: "up" | "down") {
    const fd = new FormData();
    fd.append("id", projectId);
    fd.append("url", url);
    fd.append("direction", direction);
    startTransition(() => {
      moveAction(fd);
    });
  }

  function dispatchRemove() {
    const fd = new FormData();
    fd.append("id", projectId);
    fd.append("url", url);
    startTransition(() => {
      removeAction(fd);
    });
  }

  const busy = removePending || movePending;
  const error = removeState?.error || moveState?.error;

  return (
    <>
      <div className="absolute right-1 top-1 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => dispatchMove("up")}
          disabled={busy || isFirst}
          title="Nach oben"
          className="rounded bg-black/70 px-2 py-1 text-xs text-white transition hover:bg-black disabled:opacity-30"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => dispatchMove("down")}
          disabled={busy || isLast}
          title="Nach unten"
          className="rounded bg-black/70 px-2 py-1 text-xs text-white transition hover:bg-black disabled:opacity-30"
        >
          ↓
        </button>
      </div>
      <div className="absolute bottom-1 right-1">
        <button
          type="button"
          onClick={dispatchRemove}
          disabled={busy}
          title="Entfernen"
          className="rounded bg-black/70 px-2 py-1 text-xs text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {removePending ? "…" : "Entfernen"}
        </button>
      </div>
      {error ? (
        <span className="absolute bottom-1 left-1 rounded bg-red-600/90 px-1.5 py-0.5 text-[10px] text-white">
          {error}
        </span>
      ) : null}
    </>
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
