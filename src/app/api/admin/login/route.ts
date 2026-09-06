import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SEC,
  adminSessionCookieOptions,
  createAdminSessionToken,
} from "@/lib/admin-session";

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

  email = email.trim();

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

  let token: string;
  try {
    token = await createAdminSessionToken({
      sub: admin.id,
      email: admin.email,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server misconfigured" },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    token,
    adminSessionCookieOptions(ADMIN_SESSION_MAX_AGE_SEC),
  );
  // Clear legacy forgeable cookie if present
  response.cookies.set("admin-auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
