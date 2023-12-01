"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ProjectForm from "./projectForm";
import { projectsType } from "@/type";

type Props = {
  projects: projectsType;
  setProjects: (action: projectsType) => void;
  originalProjects: projectsType;
};

export default function ProjectAdd({ projects, setProjects, originalProjects }: Props) {
  const [projectState, setProjectState] = useState(false);

  const handleProjectForm = () => {
    setProjectState(true);
  };

  return (
    <>
      <div>
        <Button
          variant="outline"
          className="font-normal bg-colorText text-colorBg duration-300 active:scale-[.98] active:duration-75 transition-all"
          onClick={handleProjectForm}
        >
          Add New Project
        </Button>
      </div>

      <ProjectForm
        project={undefined}
        editOpen={projectState}
        setEditOpen={setProjectState}
        projects={projects}
        setProjects={setProjects}
        originalProjects={originalProjects}
      />
    </>
  );
}
