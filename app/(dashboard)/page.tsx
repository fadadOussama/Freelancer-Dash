import Header from "@/components/dashboardComp/header";
import Overview from "@/components/dashboardComp/overview";
import { fetchHomeCalendar, fetchHomeClients, fetchHomeKanban, fetchHomeProjects } from "@/helpers/fetchHome";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect("/signIn?redirectUrl=/");
  }

  const kanbanPromise = fetchHomeKanban();
  const eventsPromise = fetchHomeCalendar();
  const clientsPromise = fetchHomeClients();
  const projectsPromise = fetchHomeProjects();

  const [totalTasks, totalEvents, totalClients, totalProjects] = await Promise.all([kanbanPromise, eventsPromise, clientsPromise, projectsPromise]);

  return (
    <main className="case">
      <Header
        totalTasks={totalTasks}
        totalEvents={totalEvents}
        totalClients={totalClients.clientDataLength}
        totalProjects={totalProjects.projectDataLength}
      />
      <Overview barChartProjects={totalProjects.barChartArray} donutChartArray={totalClients.donutChartArray} />
    </main>
  );
}
