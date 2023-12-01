"use client";

import { projectType, projectsType } from "@/type";
import { FiCheckCircle, FiClock, FiLoader } from "react-icons/fi";

import ProjectActions from "./projectActions";

type Props = {
  project: projectType;
  projects: projectsType;
  setProjects: (action: projectsType) => void;
  originalProjects: projectsType;
};

export default function ProjectCard({ project, projects, setProjects, originalProjects }: Props) {
  return (
    <div className="text-colorText hover:bg-colorText/5 p-6 rounded-lg border border-colorText/10 group transition-colors duration-300">
      <header className="flex justify-between items-center">
        <div className="">
          <h1 className="max-w-[160px] truncate text-lg font-medium group-hover:underline group-hover:underline-offset-2">{project.title}</h1>
          <p className="text-sm font-medium text-colorBlue">{project.type}</p>
        </div>

        <ProjectActions project={project} projects={projects} setProjects={setProjects} originalProjects={originalProjects} />
      </header>

      <div className="text-sm font-normal text-colorText/90 mt-2 break-all">{project.description}</div>

      <hr className="border-colorText/10 my-4" />

      <div className="flex md:justify-normal justify-center gap-4 items-center">
        <div className="text-center p-2 bg-colorText/5 rounded-lg">
          <h4 className="text-xs text-colorBlue font-semibold">Start Date</h4>
          <p className="text-sm">{project.startDate.toLocaleDateString()}</p>
        </div>

        <div className="text-center p-2 bg-colorText/5 rounded-lg">
          <h4 className="text-xs text-colorBlue font-semibold">End Date</h4>
          <p className="text-sm">{project.endDate.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-4 md:max-w-none md:mx-0 max-w-max mx-auto">
        {project.endDate <= new Date() ? (
          <div className="flex items-center gap-2 text-xs text-[#59f166ce] p-2 bg-[#72f1591f] w-fit rounded-full border border-colorText/5">
            <span>
              <FiCheckCircle />
            </span>
            <p>Completed</p>
          </div>
        ) : project.startDate > new Date() ? (
          <div className="flex items-center gap-2 text-xs text-[#CF7500] p-2 bg-[#cf75002c] w-fit rounded-full border border-colorText/5">
            <span>
              <FiLoader />
            </span>
            <p>Not started yet</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#F1595C] p-2 bg-[#f1595b3d] w-fit rounded-full border border-colorText/5">
            <span>
              <FiClock />
            </span>
            <p>Remaining days {Math.ceil((project.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}</p>
          </div>
        )}
      </div>
    </div>
  );
}
