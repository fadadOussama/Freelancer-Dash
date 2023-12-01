import { fetchCalendar } from "./fetchCalendar";
import { fetchClients } from "./fetchClients";
import { fetchKanban } from "./fetchKanban";
import { barChartType, donutChartType } from "@/type";
import { fetchProjects } from "./fetchProjects";

export async function fetchHomeKanban() {
  const kanbanData = await fetchKanban();
  const totalItemCount = kanbanData.reduce((sum, obj) => sum + obj.items.length, 0);

  return totalItemCount;
}

export async function fetchHomeCalendar() {
  const calendarData = await fetchCalendar();

  return calendarData.length;
}

export async function fetchHomeClients() {
  const { clientsData } = await fetchClients({});

  const donutChartArray: donutChartType = [];

  clientsData.forEach((client) => {
    const clientType = client.referralSource;
    const existingType = donutChartArray.find((item) => item.name === clientType);

    if (existingType) {
      existingType.number += 1;
    } else {
      donutChartArray.push({ name: clientType, number: 1 });
    }
  });

  return { clientDataLength: clientsData.length, donutChartArray };
}

export async function fetchHomeProjects() {
  const { fullProjects: projectsData } = await fetchProjects({});

  const barChartArray: barChartType = [];

  projectsData.forEach((project) => {
    const projectType = project.type;
    const existingType = barChartArray.find((item) => item.name === projectType);

    if (existingType) {
      existingType["Project type count"] += 1;
    } else {
      barChartArray.push({ name: projectType, "Project type count": 1 });
    }
  });

  return { projectDataLength: projectsData.length, barChartArray };
}
