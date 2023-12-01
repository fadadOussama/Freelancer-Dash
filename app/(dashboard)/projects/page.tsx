import Projects from "@/components/dashboardComp/projects";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "Clients | Freelancer Dash",
  description: "clients of Freelancer Dash",
};

export default function ClientPage({ searchParams }: Props) {
  const { userId } = auth();

  if (!userId) {
    redirect("/signIn?redirectUrl=/projects");
  }

  return <Projects searchParams={searchParams} />;
}
