import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let password = "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { email?: string; password?: string };
    email = body.email ?? "";
    password = body.password ?? "";
  } else {
    const formData = await request.formData();
    email = String(formData.get("email") || "");
    password = String(formData.get("password") || "");
  }

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isValid) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-auth", "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
