import HomeClient from "./HomeClient";
import { getPublishedProjects } from "@/lib/project-service";

export default async function Page() {
  const allProjects = await getPublishedProjects();
  const featuredProjects = allProjects.slice(0, 3);

  return <HomeClient featuredProjects={featuredProjects} />;
}
