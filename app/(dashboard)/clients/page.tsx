import Clients from "@/components/dashboardComp/clients";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "Project | Freelancer Dash",
  description: "project of Freelancer Dash",
};

export default function ClientPage({ searchParams }: Props) {
  const { userId } = auth();

  if (!userId) {
    redirect("/signIn?redirectUrl=/clients");
  }

  return <Clients searchParams={searchParams} />;
}
