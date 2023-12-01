"use server";

import { db } from "@/firebase/setup";
import { CalendarContainer, actionReturnType } from "@/type";
import { auth } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function updateCalendarInDb(calendarData: CalendarContainer) {
  const { userId } = auth();

  try {
    await setDoc(doc(db, userId as string, "calendar"), { data: calendarData });
    return { error: false } as actionReturnType;
  } catch (err) {
    return {
      error: true,
      message: err instanceof Error ? err.message : "",
    } as actionReturnType;
  } finally {
    revalidatePath("/calendar");
    revalidatePath("/");
  }
}
