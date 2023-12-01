import { db } from "@/firebase/setup";
import { projectType } from "@/type";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function fetchProjectsFull() {
  // Get user id
  const { userId } = auth();

  try {
    const docRef = doc(db, userId as string, "projects");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "projects"), {
        data: [],
      });

      return [];
    } else {
      return docSnap.data()?.data as projectType[];
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to fetch`);
  }
}

export async function fetchProjects(searchParams: { [key: string]: string | string[] | undefined }) {
  const fullProjects = await fetchProjectsFull();
  let filterdProjects = fullProjects;

  const projectType = searchParams?.type;

  if (projectType) {
    filterdProjects = fullProjects.filter((obj) => {
      return obj.type === projectType;
    });
  }

  return { fullProjects, filterdProjects };
}
