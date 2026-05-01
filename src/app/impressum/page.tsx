import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getContent(): Promise<string> {
  const page = await prisma.legalPage.findFirst({
    where: { type: "impressum" },
  });
  return page?.content ?? "";
}

export default async function ImpressumPage() {
  const content = await getContent();

  return (
    <main className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Impressum</h1>

      {content ? (
        <article className="prose prose-neutral max-w-none whitespace-pre-wrap">
          {content}
        </article>
      ) : (
        <p className="text-neutral-500">
          Inhalt wird in Kürze ergänzt.
        </p>
      )}
    </main>
  );
}
