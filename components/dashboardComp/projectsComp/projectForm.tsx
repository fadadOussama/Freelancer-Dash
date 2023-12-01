"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, FormEvent, SetStateAction, startTransition, useRef, useState } from "react";
import { projectType, projectsType } from "@/type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StartCalendarForm } from "./projectCalendarStart";
import { projectTypesInput } from "@/array/projectTypesArr";
import { EndCalendarForm } from "./projectCalendarEnd";
import projectFormValidation from "@/helpers/projectFormValidation";
import { generateUniqueId } from "@/helpers/generateUniqueId";
import { toast } from "sonner";
import updateProjectInDb from "@/serverActions/updateProjectInDb";
import checkIfProjectDataDiff from "@/helpers/checkIfProjectDataDiff";
import { useSearchParams } from "next/navigation";

type propsTypes = {
  project: projectType | undefined;
  editOpen?: boolean;
  setEditOpen?: Dispatch<SetStateAction<boolean>>;

  projects: projectsType;
  setProjects: (action: projectsType) => void;
  originalProjects: projectsType;
};

export default function ProjectForm({ project, editOpen, setEditOpen, projects, setProjects, originalProjects }: propsTypes) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedType, setSelectedType] = useState<string>(project ? project.type : "");
  const [startDate, setStartDate] = useState<Date | undefined>(project?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(project?.endDate);

  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const resetState = () => {
    if (!project) {
      setSelectedType("");
      setStartDate(undefined);
      setEndDate(undefined);
    } else {
      setSelectedType(project.type);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
    }
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();

    const projectFormValidationResult = projectFormValidation(titleRef, descriptionRef, selectedType, startDate, endDate);

    if (!projectFormValidationResult) {
      return;
    }

    const { title, description, type, theStartDate, theEndDate } = projectFormValidationResult;

    const newProjectDetails = {
      id: generateUniqueId(),
      title,
      description,
      type,
      startDate: theStartDate.getTime() as any,
      endDate: theEndDate.getTime() as any,
    };

    // Optimistic Update
    if (!typeParam || typeParam === type) {
      const optimisticData = JSON.parse(JSON.stringify(projects));
      optimisticData.unshift(newProjectDetails);

      startTransition(() => setProjects(optimisticData));
    }

    if (setEditOpen) setEditOpen(false);
    toast.success("Project added successfully");

    // Data base update
    const newOriginalProjects = JSON.parse(JSON.stringify(originalProjects));
    newOriginalProjects.unshift(newProjectDetails);
    const res = await updateProjectInDb(newOriginalProjects);
    res.error && toast.error("Failed to add a new project!");
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    const projectFormValidationResult = projectFormValidation(titleRef, descriptionRef, selectedType, startDate, endDate);
    if (!projectFormValidationResult) {
      return;
    }

    const { title, description, type, theStartDate, theEndDate } = projectFormValidationResult;

    const checkIfProjectDataDiffResult = checkIfProjectDataDiff(project, title, description, type, theStartDate, theEndDate);

    if (checkIfProjectDataDiffResult) {
      const updatedProject = {
        id: project?.id as string,
        title,
        description,
        type,
        startDate: theStartDate.getTime() as any,
        endDate: theEndDate.getTime() as any,
      };

      // Optimistic Update
      const projectsCopy: projectsType = JSON.parse(JSON.stringify(projects));
      const projectIndex = projectsCopy.findIndex((pr) => pr.id === project?.id);
      typeParam && typeParam !== type ? projectsCopy.splice(projectIndex, 1) : projectsCopy.splice(projectIndex, 1, updatedProject);
      startTransition(() => {
        setProjects(projectsCopy);
      });

      if (setEditOpen) setEditOpen(false);
      toast.success("Project updated successfully");

      // Database update
      const originalProjectsCopy: projectsType = JSON.parse(JSON.stringify(originalProjects));
      const originalProjectIndex = originalProjectsCopy.findIndex((pr) => pr.id === project?.id);
      originalProjectsCopy.splice(originalProjectIndex, 1, updatedProject);
      const res = await updateProjectInDb(originalProjectsCopy);
      res.error && toast.error("Failed to update the project!");
    } else {
      return;
    }
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent onInteractOutside={resetState} onEscapeKeyDown={resetState} onCloseAutoFocus={resetState}>
        <DialogHeader className="mb-4">
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            {project
              ? "Make changes to your project's data here. click save when you're done."
              : "Fill out the inputs with your project's data. Click add when you're done."}
          </DialogDescription>
        </DialogHeader>

        <form className="grid w-full max-w-lg gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-center text-sm font-medium">
              Title
            </label>
            <input
              defaultValue={project?.title}
              autoComplete="off"
              ref={titleRef}
              id="title"
              className="placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Title Here"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4   ">
            <label htmlFor="description" className="text-center text-sm font-medium">
              Description
            </label>
            <textarea
              defaultValue={project?.description}
              autoComplete="off"
              ref={descriptionRef}
              id="description"
              className="max-h-[200px] min-h-[40px] placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Description Here"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-center text-sm font-medium">Project type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none">
                <SelectValue placeholder={"Select project type"}>{selectedType}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {projectTypesInput.map((projectType) => (
                  <SelectItem key={projectType} value={projectType}>
                    {projectType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-center text-sm font-medium">Start date</label>
            <StartCalendarForm startDate={startDate} setStartDate={setStartDate} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-center text-sm font-medium">End date</label>
            <EndCalendarForm endDate={endDate} setEndDate={setEndDate} />
          </div>

          {project ? (
            <Button variant={"default"} onClick={handleEdit} className="active:scale-[.98] active:duration-75 transition-all">
              Save Changes
            </Button>
          ) : (
            <Button variant={"default"} onClick={handleAdd} className="active:scale-[.98] active:duration-75 transition-all">
              Add Project
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
