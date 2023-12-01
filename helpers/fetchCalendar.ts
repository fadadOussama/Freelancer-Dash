import { db } from "@/firebase/setup";
import { CalendarContainer } from "@/type";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function fetchCalendar() {
  // Get user id
  const { userId } = auth();

  try {
    const docRef = doc(db, userId as string, "calendar");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "calendar"), {
        data: [],
      });
      return [] as CalendarContainer;
    } else {
      return docSnap.data()?.data as CalendarContainer;
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to fetch`);
  }
}
