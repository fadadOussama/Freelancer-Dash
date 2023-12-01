"use server";

import { DNDType } from "@/components/dashboardComp/kanban";
import { db } from "@/firebase/setup";
import { actionReturnType } from "@/type";
import { auth } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function updateKanbanInDb(kanbanData: DNDType[]) {
  const { userId } = auth();

  try {
    await setDoc(doc(db, userId as string, "kanban"), { data: kanbanData });
    return { error: false } as actionReturnType;
  } catch (err) {
    return {
      error: true,
      message: err instanceof Error ? err.message : "",
    } as actionReturnType;
  } finally {
    revalidatePath("/kanban");
    revalidatePath("/");
  }
}
