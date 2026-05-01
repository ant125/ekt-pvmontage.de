import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = ["impressum", "datenschutz"] as const;
type LegalType = (typeof ALLOWED_TYPES)[number];

function isLegalType(value: unknown): value is LegalType {
  return typeof value === "string" && (ALLOWED_TYPES as readonly string[]).includes(value);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!isLegalType(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const page = await prisma.legalPage.findFirst({ where: { type } });

  return NextResponse.json({ content: page?.content ?? "" });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, content } = (body ?? {}) as { type?: unknown; content?: unknown };

  if (!isLegalType(type) || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const page = await prisma.legalPage.upsert({
    where: { type },
    update: { content },
    create: { type, content },
  });

  return NextResponse.json({ ok: true, page });
}
