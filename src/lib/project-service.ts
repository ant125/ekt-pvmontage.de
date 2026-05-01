import { prisma } from "@/lib/prisma";

export type ProjectDTO = {
  id: string;
  slug: string;
  title: string;
  shortText: string;
  fullText: string;
  coverImage: string;
  images: string[];
  location?: string;
  year?: string;
};

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function mapProject(record: {
  id: string;
  slug: string;
  title: string;
  shortText: string;
  fullText: string;
  coverImage: string;
  images: unknown;
  location: string | null;
  year: string | null;
}): ProjectDTO {
  return {
    id: record.slug,
    slug: record.slug,
    title: record.title,
    shortText: record.shortText,
    fullText: record.fullText,
    coverImage: record.coverImage,
    images: toStringArray(record.images),
    location: record.location ?? undefined,
    year: record.year ?? undefined,
  };
}

export async function getPublishedProjects(): Promise<ProjectDTO[]> {
  const records = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return records.map(mapProject);
}

export async function getPublishedProjectBySlug(
  slug: string,
): Promise<ProjectDTO | null> {
  const record = await prisma.project.findFirst({
    where: { slug, published: true },
  });

  if (!record) return null;

  return mapProject(record);
}

export async function getOtherPublishedProjects(
  slug: string,
  limit: number,
): Promise<ProjectDTO[]> {
  const records = await prisma.project.findMany({
    where: {
      published: true,
      NOT: { slug },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    take: limit,
  });

  return records.map(mapProject);
}

export type ProjectAdminRow = {
  id: string;
  slug: string;
  title: string;
  shortText: string;
  fullText: string;
  coverImage: string;
  images: string[];
  location: string | null;
  year: string | null;
  published: boolean;
  sortOrder: number;
};

function mapAdminRow(record: {
  id: string;
  slug: string;
  title: string;
  shortText: string;
  fullText: string;
  coverImage: string;
  images: unknown;
  location: string | null;
  year: string | null;
  published: boolean;
  sortOrder: number;
}): ProjectAdminRow {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    shortText: record.shortText,
    fullText: record.fullText,
    coverImage: record.coverImage,
    images: toStringArray(record.images),
    location: record.location,
    year: record.year,
    published: record.published,
    sortOrder: record.sortOrder,
  };
}

export async function getAllProjectsForAdmin(): Promise<ProjectAdminRow[]> {
  const rows = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return rows.map(mapAdminRow);
}

export async function getProjectByIdForAdmin(
  id: string,
): Promise<ProjectAdminRow | null> {
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) return null;
  return mapAdminRow(row);
}
