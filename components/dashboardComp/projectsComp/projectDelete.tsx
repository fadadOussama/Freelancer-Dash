"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction, startTransition } from "react";
import { projectType, projectsType } from "@/type";
import { toast } from "sonner";
import updateProjectInDb from "@/serverActions/updateProjectInDb";

type propsTypes = {
  deleteOpen: boolean;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  project: projectType;

  projects: projectsType;
  setProjects: (action: projectsType) => void;
  originalProjects: projectsType;
};

export default function ProjectDelete({ deleteOpen, setDeleteOpen, project, projects, setProjects, originalProjects }: propsTypes) {
  const handleDelete = async () => {
    const projectsCopy: projectsType = JSON.parse(JSON.stringify(projects));
    const projectIndex = projectsCopy.findIndex((pr) => pr.id === project?.id);
    projectsCopy.splice(projectIndex, 1);
    startTransition(() => setProjects(projectsCopy));

    toast.success("Project deleted successfuly");

    // Database update
    const originalProjectsCopy: projectsType = JSON.parse(JSON.stringify(originalProjects));
    const originalProjectIndex = originalProjectsCopy.findIndex((pr) => pr.id === project?.id);
    originalProjectsCopy.splice(originalProjectIndex, 1);

    const res = await updateProjectInDb(originalProjectsCopy);
    res.error && toast.error("Failed to delete the project!");
  };

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone and it will permanently delete your project.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
