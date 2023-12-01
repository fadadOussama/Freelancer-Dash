import { projectType } from "@/type";
import { toast } from "sonner";

export default function checkIfProjectDataDiff(
  project: projectType | undefined,
  title: string,
  description: string,
  type: string,
  theStartDate: Date,
  theEndDate: Date
) {
  if (!project) return;

  if (
    title === project.title &&
    description === project.description &&
    type === project.type &&
    theStartDate.getTime() === project.startDate.getTime() &&
    theEndDate.getTime() === project.endDate.getTime()
  ) {
    toast.error("You don't change any data!");
    return false;
  } else {
    return true;
  }
}
