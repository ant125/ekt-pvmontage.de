import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "info.ekt@gmx.de";

export async function GET() {
  const existing = await prisma.admin.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existing) {
    return NextResponse.json({
      success: true,
      message: "Admin already exists",
    });
  }

  const plainPassword = process.env.ADMIN_PASSWORD;
  if (!plainPassword) {
    return NextResponse.json(
      { success: false, error: "No ADMIN_PASSWORD set" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.create({
    data: {
      email: ADMIN_EMAIL,
      passwordHash,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Admin created",
  });
}
