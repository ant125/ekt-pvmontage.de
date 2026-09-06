export const ADMIN_SESSION_COOKIE = "admin_session";

/** 7 days — admin convenience vs. re-login frequency */
export const ADMIN_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export type AdminSessionPayload = {
  sub: string;
  email: string;
  exp: number;
};

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET is not configured (min 16 characters).");
  }
  return secret;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function textToBase64Url(text: string): string {
  return bytesToBase64Url(new TextEncoder().encode(text));
}

async function hmacSign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  return bytesToBase64Url(new Uint8Array(signature));
}

async function hmacVerify(
  message: string,
  signatureB64Url: string,
  secret: string,
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  let signatureBytes: Uint8Array<ArrayBuffer>;
  try {
    const raw = base64UrlToBytes(signatureB64Url);
    signatureBytes = new Uint8Array(raw);
  } catch {
    return false;
  }
  return crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes,
    new TextEncoder().encode(message),
  );
}

export async function createAdminSessionToken(input: {
  sub: string;
  email: string;
  maxAgeSec?: number;
}): Promise<string> {
  const maxAgeSec = input.maxAgeSec ?? ADMIN_SESSION_MAX_AGE_SEC;
  const payload: AdminSessionPayload = {
    sub: input.sub,
    email: input.email,
    exp: Math.floor(Date.now() / 1000) + maxAgeSec,
  };
  const body = textToBase64Url(JSON.stringify(payload));
  const sig = await hmacSign(body, getSecret());
  return `${body}.${sig}`;
}

export async function verifyAdminSessionToken(
  token: string | undefined | null,
): Promise<AdminSessionPayload | null> {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  if (!body || !sig) return null;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return null;
  }

  const valid = await hmacVerify(body, sig, secret);
  if (!valid) return null;

  let payload: unknown;
  try {
    const json = new TextDecoder().decode(base64UrlToBytes(body));
    payload = JSON.parse(json);
  } catch {
    return null;
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as AdminSessionPayload).sub !== "string" ||
    typeof (payload as AdminSessionPayload).email !== "string" ||
    typeof (payload as AdminSessionPayload).exp !== "number"
  ) {
    return null;
  }

  const session = payload as AdminSessionPayload;
  if (session.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return session;
}

export function adminSessionCookieOptions(maxAgeSec = ADMIN_SESSION_MAX_AGE_SEC) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}

export async function readAdminSessionFromCookieValue(
  cookieValue: string | undefined,
): Promise<AdminSessionPayload | null> {
  return verifyAdminSessionToken(cookieValue);
}
