import { ClientType } from "@/components/dashboardComp/clientsComp/columns";
import { db } from "@/firebase/setup";
import { auth } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function fetchClients(searchParams: { [key: string]: string | string[] | undefined }) {
  const pageIndex = searchParams?.pageIndex ? +searchParams?.pageIndex : 0;

  const pageSize = searchParams?.pageSize ? +searchParams?.pageSize : 10;

  const sort = searchParams.hasOwnProperty("sortEmail")
    ? [{ id: "email", desc: searchParams?.sortEmail === "desc" ? true : false }]
    : searchParams.hasOwnProperty("sortProjects")
    ? [{ id: "projects", desc: searchParams?.sortProjects === "desc" ? true : false }]
    : [];

  const filter =
    searchParams["referralSource"] && searchParams["nameSearch"]
      ? [
          { id: "referralSource", value: searchParams["referralSource"] },
          { id: "name", value: searchParams["nameSearch"] },
        ]
      : searchParams["referralSource"]
      ? [{ id: "referralSource", value: searchParams["referralSource"] }]
      : searchParams["nameSearch"]
      ? [{ id: "name", value: searchParams["nameSearch"] }]
      : [];

  const { userId } = auth();
  let clientsData: ClientType[] = [];

  try {
    const docRef = doc(db, userId as string, "clients");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, userId as string, "clients"), {
        data: [],
      });
    } else {
      clientsData = docSnap.data()?.data as ClientType[];
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to fetch`);
  }

  return { clientsData, pageIndex, pageSize, sort, filter };
}
