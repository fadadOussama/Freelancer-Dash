import { fetchProjects } from "@/helpers/fetchProjects";
import ProjectsContainer from "./projectsComp/projectsContainer";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Projects({ searchParams }: Props) {
  const { fullProjects, filterdProjects } = await fetchProjects(searchParams);

  return (
    <div className="case">
      <ProjectsContainer projectsData={fullProjects} filterdProjects={filterdProjects} />
    </div>
  );
}
