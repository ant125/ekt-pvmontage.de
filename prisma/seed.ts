import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { projects as staticProjects } from "../src/lib/projects";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();
const ADMIN_EMAIL = "info.ekt@gmx.de";

async function seedAdmin() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.warn("ADMIN_PASSWORD is not set, skipping admin seed");
    return;
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      email: ADMIN_EMAIL,
      passwordHash,
    },
  });
}

async function seedProjects() {
  for (let index = 0; index < staticProjects.length; index += 1) {
    const project = staticProjects[index];
    const slug = project.id;

    await prisma.project.upsert({
      where: { slug },
      update: {
        title: project.title,
        shortText: project.shortText,
        fullText: project.fullText,
        coverImage: project.coverImage,
        images: project.images,
        location: project.location ?? null,
        year: project.year ?? null,
        sortOrder: index,
      },
      create: {
        slug,
        title: project.title,
        shortText: project.shortText,
        fullText: project.fullText,
        coverImage: project.coverImage,
        images: project.images,
        location: project.location ?? null,
        year: project.year ?? null,
        published: true,
        sortOrder: index,
      },
    });
  }
}

async function main() {
  await seedAdmin();
  await seedProjects();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
