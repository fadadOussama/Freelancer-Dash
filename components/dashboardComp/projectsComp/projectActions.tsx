import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectForm from "./projectForm";
import { useState } from "react";
import { projectType, projectsType } from "@/type";
import ProjectDelete from "./projectDelete";

type Props = {
  project: projectType;
  projects: projectsType;
  setProjects: (action: projectsType) => void;
  originalProjects: projectsType;
};

export default function ProjectActions({ project, projects, setProjects, originalProjects }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4 text-colorText" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>Edit Project</DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setDeleteOpen(true)}>Delete Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectForm
        project={project}
        editOpen={isEditOpen}
        setEditOpen={setIsEditOpen}
        projects={projects}
        setProjects={setProjects}
        originalProjects={originalProjects}
      />
      <ProjectDelete
        project={project}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        projects={projects}
        setProjects={setProjects}
        originalProjects={originalProjects}
      />
    </>
  );
}
