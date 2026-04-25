"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/lib/projects";
import Container from "@/components/ui/Container";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ProjectPage({ params }: PageProps) {
  const { id } = use(params);
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projectIndex >= 0 ? projects[projectIndex] : undefined;

  if (!project) {
    return (
      <main className="bg-white text-zinc-800">
        <Container>
          <div className="py-16 md:py-20">
          <nav className="text-sm text-zinc-500">
            <Link href="/">Startseite</Link>
            <span className="mx-2">/</span>
            <Link href="/projekte">Projekte</Link>
          </nav>
          <p className="mt-8 text-zinc-600">Projekt nicht gefunden</p>
          <Link
            href="/projekte"
            className="mt-4 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4"
          >
            Zurueck zur Uebersicht
          </Link>
          </div>
        </Container>
      </main>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;
  const images = [project.coverImage, ...project.images].filter(Boolean);
  const mainImage = images[0];
  const galleryImages = images.slice(1);
  const galleryPreview = galleryImages.slice(0, 4);
  const remainingImagesCount = Math.max(galleryImages.length - galleryPreview.length, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <main className="bg-white text-zinc-800">
      <Container>
        <div className="py-16 md:py-20">
        <nav className="text-sm text-zinc-500">
          <Link href="/">Startseite</Link>
          <span className="mx-2">/</span>
          <Link href="/projekte">Projekte</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{project.title}</span>
        </nav>

        <h1 className="mt-6 mb-2 text-3xl font-semibold text-zinc-900">
          {project.title}
        </h1>

        {(project.location || project.year) && (
          <p className="mt-3 text-zinc-500">
            {project.location}
            {project.location && project.year ? " • " : ""}
            {project.year ?? ""}
          </p>
        )}

        <div className="mt-8 max-w-3xl whitespace-pre-line leading-relaxed text-zinc-700">
          {project.fullText}
        </div>

        {mainImage && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="mt-12 block w-full overflow-hidden rounded-2xl"
            aria-label="Bild in Vollansicht öffnen"
          >
            <img
              src={mainImage}
              alt={project.title}
              className="aspect-[4/3] w-full rounded-2xl object-cover md:aspect-[16/9]"
            />
          </button>
        )}

        {galleryImages.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {galleryPreview.map((img, i) => {
              const isLastVisible = i === galleryPreview.length - 1;
              const showOverlay = remainingImagesCount > 0 && isLastVisible;

              return (
                <button
                  key={`${project.id}-img-${i}`}
                  type="button"
                  onClick={() => openLightbox(i + 1)}
                  className="group relative block w-full overflow-hidden rounded-2xl"
                  aria-label="Galeriebild in Vollansicht öffnen"
                >
                  <img
                    src={img}
                    alt=""
                    className="aspect-[4/3] w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  {showOverlay && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-lg font-semibold text-white">
                        +{remainingImagesCount} weitere Bilder
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-10 mb-12 flex justify-between border-t border-zinc-200 pt-10 text-sm text-zinc-600">
          {prevProject ? (
            <Link
              href={`/projekte/${prevProject.id}`}
              className="font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-900"
            >
              ← Vorheriges Projekt
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projekte/${nextProject.id}`}
              className="font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-900"
            >
              Nächstes Projekt →
            </Link>
          ) : (
            <div />
          )}
        </div>

        <h3 className="mt-16 text-base font-medium text-zinc-600">
          Weitere Projekte
        </h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {projects
            .filter((p) => p.id !== project.id)
            .slice(0, 3)
            .map((p) => (
              <div
                key={p.id}
                className="opacity-90 transition hover:opacity-100"
              >
                <ProjectCard project={p} compact />
              </div>
            ))}
        </div>

        <section className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 px-8 py-28 text-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] md:px-10 md:py-32">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Gefällt Ihnen dieses Projekt?
            </h2>
            <p className="mt-4 text-zinc-300">
              Lassen Sie uns etwas Ähnliches für Sie umsetzen.
            </p>
            <a
              href="/#kontakt"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-zinc-900 shadow-lg transition-all duration-300 hover:scale-[1.04] hover:bg-zinc-200 hover:shadow-xl active:scale-[0.98]"
            >
              Jetzt anfragen
            </a>
          </div>
        </section>

        {isOpen && images[currentIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Bildergalerie"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-xl text-white transition hover:bg-white/20"
              aria-label="Schließen"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-4 rounded-full bg-white/10 px-4 py-3 text-2xl text-white transition hover:bg-white/20"
              aria-label="Vorheriges Bild"
            >
              ←
            </button>
            <img
              src={images[currentIndex]}
              alt={project.title}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 rounded-full bg-white/10 px-4 py-3 text-2xl text-white transition hover:bg-white/20"
              aria-label="Nächstes Bild"
            >
              →
            </button>
          </div>
        )}
        </div>
      </Container>
    </main>
  );
}
