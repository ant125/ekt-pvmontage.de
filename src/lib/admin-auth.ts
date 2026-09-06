import "server-only";

import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  readAdminSessionFromCookieValue,
  type AdminSessionPayload,
} from "@/lib/admin-session";

export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const cookieStore = await cookies();
  const session = await readAdminSessionFromCookieValue(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  return readAdminSessionFromCookieValue(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );
}
