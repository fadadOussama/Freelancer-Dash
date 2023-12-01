import Calendar from "@/components/dashboardComp/calendar";
import { fetchCalendar } from "@/helpers/fetchCalendar";

import { CalendarContainer } from "@/type";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Calendar | Freelancer Dash",
  description: "calendar of Freelancer Dash",
};

export default async function CalendarPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/signIn?redirectUrl=/calendar");
  }

  const calendarData: CalendarContainer = await fetchCalendar();

  return (
    <section className="case">
      <div className="my-10">
        <Calendar calendarData={calendarData} />
      </div>
    </section>
  );
}
