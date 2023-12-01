import KanbanPage, { DNDType } from "@/components/dashboardComp/kanban";
import { fetchKanban } from "@/helpers/fetchKanban";

import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Kanban | Freelancer Dash",
  description: "kanban of Freelancer Dash",
};

export default async function Kanban() {
  const { userId } = auth();

  if (!userId) {
    redirect("/signIn?redirectUrl=/kanban");
  }

  const kanbanData: DNDType[] = await fetchKanban();

  return <KanbanPage kanbanData={kanbanData} />;
}
