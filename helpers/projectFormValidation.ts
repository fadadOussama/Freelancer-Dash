import { projectTypeTypes } from "@/type";
import { RefObject } from "@fullcalendar/core/preact.js";
import { toast } from "sonner";

export default function projectFormValidation(
  titleRef: RefObject<HTMLInputElement>,
  descriptionRef: RefObject<HTMLTextAreaElement>,
  selectedType: string,
  startDate: Date | undefined,
  endDate: Date | undefined
) {
  const title = titleRef.current?.value.trim() as string;
  const description = descriptionRef.current?.value.trim() as string;

  // Custom name format validation using a regular expression
  const titleFormat = /^[A-Za-z0-9\s.,;:'"!?()_-]+$/;
  const isTileValid = title.match(titleFormat);

  if (title === "" || description === "" || selectedType === "" || startDate === undefined || endDate === undefined) {
    toast.error("Please fill out the inputs");
    return false;
  }

  if (!isTileValid) {
    toast.error("Enter a valid title format");
    return false;
  }

  if (endDate <= startDate) {
    toast.success("start date must be before the end date!");
    return false;
  }

  const type = selectedType as projectTypeTypes;
  const theStartDate = startDate;
  const theEndDate = endDate;

  return { title, description, type, theStartDate, theEndDate };
}
