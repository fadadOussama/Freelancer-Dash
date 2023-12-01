import { DNDType } from "@/components/dashboardComp/kanban";
import { db } from "@/firebase/setup";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

const initiaKanbanState: DNDType[] = [
  {
    id: "container-todo",
    title: "Todo",
    color: "bg-red-500",
    items: [],
  },
  {
    id: "container-doing",
    title: "Doing",
    color: "bg-green-500",
    items: [],
  },
  {
    id: "container-done",
    title: "Done",
    color: "bg-amber-500",
    items: [],
  },
];

export async function fetchKanban() {
  // Get user id
  const { userId } = auth();

  try {
    const docRef = doc(db, userId as string, "kanban");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "kanban"), {
        data: initiaKanbanState,
      });
      return initiaKanbanState;
    } else {
      return docSnap.data()?.data as DNDType[];
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to fetch`);
  }
}
