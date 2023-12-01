"use client";

import { projectsType } from "@/type";
import ProjectCard from "./projectCard";
import ProjectAdd from "./projectAdd";
import { useOptimistic } from "react";
import ProjectFilter from "./projectFilter";

type Props = {
  projectsData: projectsType;
  filterdProjects: projectsType;
};

export default function ProjectsContainer({ projectsData, filterdProjects }: Props) {
  const [projects, setProjects] = useOptimistic(filterdProjects, (_, newProjects: projectsType) => newProjects);

  return (
    <div className="my-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end items-center gap-y-4">
        <ProjectAdd projects={projects} setProjects={setProjects} originalProjects={projectsData} />
        <ProjectFilter fullProjects={projectsData} setProjects={setProjects} />
      </div>

      {projects.length ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={{ ...project, endDate: new Date(project.endDate), startDate: new Date(project.startDate) }}
              projects={projects}
              setProjects={setProjects}
              originalProjects={projectsData}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <div className="w-full h-[200px] border border-colorText/10 rounded-lg p-6">
            <div className="w-full h-full flex justify-center items-center border border-dashed border-colorText/10 rounded-lg">
              <p className="text-sm">No project data.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
