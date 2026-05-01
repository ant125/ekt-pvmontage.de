"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { ProjectFormState } from "@/lib/admin-projects-types";

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

function parseImagesField(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
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
  coverImage: string;
  location: string;
  year: string;
  imagesRaw: string;
  published: boolean;
  sortOrderRaw: string;
};

function readPayload(formData: FormData): FormPayload {
  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    shortText: getString(formData, "shortText"),
    fullText: getString(formData, "fullText"),
    coverImage: getString(formData, "coverImage"),
    location: getString(formData, "location"),
    year: getString(formData, "year"),
    imagesRaw: getString(formData, "images"),
    published: formData.get("published") === "on",
    sortOrderRaw: getString(formData, "sortOrder"),
  };
}

function validatePayload(p: FormPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!p.title) errors.title = "Pflichtfeld";
  if (!p.slug) errors.slug = "Pflichtfeld";
  else if (!SLUG_REGEX.test(p.slug)) errors.slug = "Nur a-z, 0-9 und -";
  if (!p.shortText) errors.shortText = "Pflichtfeld";
  if (!p.fullText) errors.fullText = "Pflichtfeld";
  if (!p.coverImage) errors.coverImage = "Pflichtfeld";
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

  await prisma.project.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      shortText: payload.shortText,
      fullText: payload.fullText,
      coverImage: payload.coverImage,
      images: parseImagesField(payload.imagesRaw),
      location: payload.location || null,
      year: payload.year || null,
      published: payload.published,
      sortOrder,
    },
  });

  revalidatePublic(payload.slug);
  redirect("/admin/projekte");
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
      coverImage: payload.coverImage,
      images: parseImagesField(payload.imagesRaw),
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
