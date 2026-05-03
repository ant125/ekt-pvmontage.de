"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type {
  ProjectFormState,
  UploadActionState,
} from "@/lib/admin-projects-types";
import {
  ALLOWED_UPLOAD_MIME,
  MAX_UPLOAD_BYTES,
  uploadProjectImage,
} from "@/lib/storage";

const MAX_PROJECT_IMAGES = 15;

async function ensureAdmin() {
  const c = await cookies();
  if (c.get("admin-auth")?.value !== "true") {
    throw new Error("Unauthorized");
  }
}

function getString(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function revalidatePublic(slug?: string, oldSlug?: string) {
  revalidatePath("/");
  revalidatePath("/projekte");
  if (slug) revalidatePath(`/projekte/${slug}`);
  if (oldSlug && oldSlug !== slug) revalidatePath(`/projekte/${oldSlug}`);
  revalidatePath("/admin/projekte");
}

const SLUG_REGEX = /^[a-z0-9-]+$/;

type FormPayload = {
  title: string;
  slug: string;
  shortText: string;
  fullText: string;
  location: string;
  year: string;
  published: boolean;
};

function readPayload(formData: FormData): FormPayload {
  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    shortText: getString(formData, "shortText"),
    fullText: getString(formData, "fullText"),
    location: getString(formData, "location"),
    year: getString(formData, "year"),
    published: formData.get("published") === "on",
  };
}

function validatePayload(p: FormPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!p.title) errors.title = "Pflichtfeld";
  if (!p.slug) errors.slug = "Pflichtfeld";
  else if (!SLUG_REGEX.test(p.slug)) errors.slug = "Nur a-z, 0-9 und -";
  if (!p.shortText) errors.shortText = "Pflichtfeld";
  if (!p.fullText) errors.fullText = "Pflichtfeld";
  return errors;
}

export async function createProjectAction(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await ensureAdmin();

  const payload = readPayload(formData);
  const fieldErrors = validatePayload(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, error: "Bitte Felder prüfen" };
  }

  const existing = await prisma.project.findUnique({ where: { slug: payload.slug } });
  if (existing) {
    return {
      fieldErrors: { slug: "Slug existiert bereits" },
      error: "Slug existiert bereits",
    };
  }

  const min = await prisma.project.aggregate({ _min: { sortOrder: true } });
  const sortOrder = min._min.sortOrder === null ? 0 : min._min.sortOrder - 1;

  const created = await prisma.project.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      shortText: payload.shortText,
      fullText: payload.fullText,
      coverImage: "",
      images: [],
      location: payload.location || null,
      year: payload.year || null,
      published: payload.published,
      sortOrder,
    },
  });

  revalidatePublic(payload.slug);
  redirect(`/admin/projekte/${created.id}`);
}

export async function updateProjectAction(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await ensureAdmin();

  const id = getString(formData, "id");
  if (!id) return { error: "Ungültige ID" };

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: "Projekt nicht gefunden" };

  const payload = readPayload(formData);
  const fieldErrors = validatePayload(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, error: "Bitte Felder prüfen" };
  }

  if (payload.slug !== project.slug) {
    const existing = await prisma.project.findUnique({ where: { slug: payload.slug } });
    if (existing) {
      return {
        fieldErrors: { slug: "Slug existiert bereits" },
        error: "Slug existiert bereits",
      };
    }
  }

  await prisma.project.update({
    where: { id },
    data: {
      title: payload.title,
      slug: payload.slug,
      shortText: payload.shortText,
      fullText: payload.fullText,
      location: payload.location || null,
      year: payload.year || null,
      published: payload.published,
    },
  });

  revalidatePublic(payload.slug, project.slug);
  redirect("/admin/projekte");
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await ensureAdmin();

  const id = getString(formData, "id");
  if (!id) return;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return;

  await prisma.project.delete({ where: { id } });
  revalidatePublic(project.slug);
}

export async function togglePublishedAction(formData: FormData): Promise<void> {
  await ensureAdmin();

  const id = getString(formData, "id");
  if (!id) return;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return;

  await prisma.project.update({
    where: { id },
    data: { published: !project.published },
  });

  revalidatePublic(project.slug);
}

function imagesToStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function buildAllImages(
  coverImage: string,
  images: unknown,
): string[] {
  const list = imagesToStringArray(images);
  return coverImage ? [coverImage, ...list] : list;
}

function splitImages(list: string[]): { coverImage: string; images: string[] } {
  if (list.length === 0) return { coverImage: "", images: [] };
  return { coverImage: list[0], images: list.slice(1) };
}

function validateUploadFile(file: unknown): string | null {
  if (!(file instanceof File)) return "Datei fehlt";
  if (file.size === 0) return "Datei ist leer";
  if (file.size > MAX_UPLOAD_BYTES) {
    return `Datei ist zu groß (max. ${Math.round(
      MAX_UPLOAD_BYTES / (1024 * 1024),
    )} MB)`;
  }
  if (!ALLOWED_UPLOAD_MIME.has(file.type)) {
    return "Dateityp wird nicht unterstützt (erlaubt: WebP, JPG, PNG)";
  }
  return null;
}

export async function uploadProjectImagesAction(
  _prev: UploadActionState,
  formData: FormData,
): Promise<UploadActionState> {
  await ensureAdmin();

  const id = getString(formData, "id");
  if (!id) return { error: "Ungültige ID" };

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: "Projekt nicht gefunden" };

  const rawFiles = formData.getAll("files");
  const files = rawFiles.filter(
    (f): f is File => f instanceof File && f.size > 0,
  );

  if (files.length === 0) return { error: "Keine Datei ausgewählt" };

  for (const f of files) {
    const fileError = validateUploadFile(f);
    if (fileError) return { error: `${f.name}: ${fileError}` };
  }

  const current = buildAllImages(project.coverImage, project.images);
  const remaining = MAX_PROJECT_IMAGES - current.length;
  if (remaining <= 0) {
    return {
      error: `Maximal ${MAX_PROJECT_IMAGES} Bilder pro Projekt erreicht`,
    };
  }

  const filesToUpload = files.slice(0, remaining);

  const uploadedUrls: string[] = [];
  for (const f of filesToUpload) {
    try {
      const url = await uploadProjectImage({
        slug: project.slug,
        file: f,
        kind: "gallery",
      });
      uploadedUrls.push(url);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Upload fehlgeschlagen";
      if (uploadedUrls.length > 0) {
        const partial = splitImages([...current, ...uploadedUrls]);
        await prisma.project.update({
          where: { id },
          data: { coverImage: partial.coverImage, images: partial.images },
        });
        revalidatePublic(project.slug);
      }
      return { error: `${f.name}: ${message}` };
    }
  }

  const next = splitImages([...current, ...uploadedUrls]);
  await prisma.project.update({
    where: { id },
    data: { coverImage: next.coverImage, images: next.images },
  });

  revalidatePublic(project.slug);

  if (filesToUpload.length < files.length) {
    return {
      ok: true,
      error: `Nur ${filesToUpload.length} von ${files.length} Bildern hinzugefügt (Limit ${MAX_PROJECT_IMAGES}).`,
    };
  }

  return { ok: true };
}

export async function removeProjectImageAction(
  _prev: UploadActionState,
  formData: FormData,
): Promise<UploadActionState> {
  await ensureAdmin();

  const id = getString(formData, "id");
  const url = getString(formData, "url");
  if (!id) return { error: "Ungültige ID" };
  if (!url) return { error: "Ungültige Bild-URL" };

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: "Projekt nicht gefunden" };

  const current = buildAllImages(project.coverImage, project.images);
  const filtered = current.filter((u) => u !== url);

  if (filtered.length === current.length) {
    return { error: "Bild nicht im Projekt gefunden" };
  }

  const next = splitImages(filtered);
  await prisma.project.update({
    where: { id },
    data: { coverImage: next.coverImage, images: next.images },
  });

  revalidatePublic(project.slug);
  return { ok: true };
}

export async function moveProjectImageAction(
  _prev: UploadActionState,
  formData: FormData,
): Promise<UploadActionState> {
  await ensureAdmin();

  const id = getString(formData, "id");
  const url = getString(formData, "url");
  const direction = getString(formData, "direction");
  if (!id) return { error: "Ungültige ID" };
  if (!url) return { error: "Ungültige Bild-URL" };
  if (direction !== "up" && direction !== "down") {
    return { error: "Ungültige Richtung" };
  }

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return { error: "Projekt nicht gefunden" };

  const current = buildAllImages(project.coverImage, project.images);
  const idx = current.indexOf(url);
  if (idx < 0) return { error: "Bild nicht im Projekt gefunden" };

  const swap = direction === "up" ? idx - 1 : idx + 1;
  if (swap < 0 || swap >= current.length) {
    return { ok: true };
  }

  const next = [...current];
  [next[idx], next[swap]] = [next[swap], next[idx]];

  const split = splitImages(next);
  await prisma.project.update({
    where: { id },
    data: { coverImage: split.coverImage, images: split.images },
  });

  revalidatePublic(project.slug);
  return { ok: true };
}

export async function moveProjectAction(formData: FormData): Promise<void> {
  await ensureAdmin();

  const id = getString(formData, "id");
  const direction = getString(formData, "direction");
  if (!id || (direction !== "up" && direction !== "down")) return;

  const all = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const idx = all.findIndex((p) => p.id === id);
  if (idx < 0) return;

  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= all.length) return;

  const a = all[idx];
  const b = all[swapIdx];

  await prisma.$transaction([
    prisma.project.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
    prisma.project.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
  ]);

  revalidatePublic(a.slug);
  revalidatePublic(b.slug);
}
