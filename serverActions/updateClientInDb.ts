"use server";

import { ClientType } from "@/components/dashboardComp/clientsComp/columns";
import { db } from "@/firebase/setup";
import { actionReturnType } from "@/type";
import { auth } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export default async function updateClientInDb(clientsData: ClientType[]) {
  const { userId } = auth();

  try {
    await setDoc(doc(db, userId as string, "clients"), { data: clientsData });
    return { error: false } as actionReturnType;
  } catch (err) {
    return {
      error: true,
      message: err instanceof Error ? err.message : "",
    } as actionReturnType;
  } finally {
    revalidatePath("clients");
    revalidatePath("/");
  }
}
