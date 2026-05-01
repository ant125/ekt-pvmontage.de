import { notFound } from "next/navigation";
import {
  getOtherPublishedProjects,
  getPublishedProjectBySlug,
  getPublishedProjects,
} from "@/lib/project-service";
import ProjectDetail from "./ProjectDetail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;

  const project = await getPublishedProjectBySlug(id);

  if (!project) {
    notFound();
  }

  const allProjects = await getPublishedProjects();
  const projectIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    projectIndex > 0 ? allProjects[projectIndex - 1] : undefined;
  const nextProject =
    projectIndex >= 0 && projectIndex < allProjects.length - 1
      ? allProjects[projectIndex + 1]
      : undefined;

  const otherProjects = await getOtherPublishedProjects(project.slug, 3);

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      otherProjects={otherProjects}
    />
  );
}
