import Link from "next/link";
import Container from "@/components/ui/Container";
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
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <Container>
          <div className="py-16 md:py-20">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 text-sm text-zinc-500"
            >
              <ol className="flex items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-zinc-800 transition-colors"
                  >
                    Startseite
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-400">
                  →
                </li>
                <li aria-current="page" className="text-zinc-700">
                  Impressum
                </li>
              </ol>
            </nav>

            <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Impressum
            </h1>

            {content ? (
              <article className="prose prose-neutral max-w-3xl whitespace-pre-wrap leading-relaxed">
                {content}
              </article>
            ) : (
              <p className="max-w-3xl text-zinc-500">
                Inhalt wird in Kürze ergänzt.
              </p>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}
