import { UniqueIdentifier } from "@dnd-kit/core";
import { ReactNode } from "react";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
};

type KanbanProps = {
  id: UniqueIdentifier;
  children: ReactNode;
  title?: string;
  items?: number;
  color?: string;
};

type CalendarProps = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
};

type CalendarContainer = CalendarProps[];

type projectTypeTypes = "FrontEnd" | "BackEnd" | "FullStack" | "UI/UX";

type projectType = {
  id: string | number;
  title: string;
  description: string;
  type: projectTypeTypes;
  startDate: Date;
  endDate: Date;
};

type projectsType = projectType[];

type actionReturnType = {
  error: boolean;
  message?: string;
};

type barChartType = {
  name: string;
  "Project type count": number;
}[];

type donutChartType = {
  name: string;
  number: number;
}[];
