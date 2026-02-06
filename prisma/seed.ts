import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();
const ADMIN_EMAIL = "info.ekt@gmx.de";

async function main() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
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

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
