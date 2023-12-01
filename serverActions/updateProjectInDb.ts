"use server";

import { db } from "@/firebase/setup";
import { actionReturnType, projectsType } from "@/type";
import { auth } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function updateProjectInDb(projectsData: projectsType) {
  const { userId } = auth();

  try {
    await setDoc(doc(db, userId as string, "projects"), { data: projectsData });
    return { error: false } as actionReturnType;
  } catch (err) {
    return {
      error: true,
      message: err instanceof Error ? err.message : "",
    } as actionReturnType;
  } finally {
    revalidatePath("/projects");
    revalidatePath("/");
  }
}
