import Nav from "@/components/dashboardComp/nav";
import React from "react";
import Title from "@/components/dashboardComp/title";
import { auth } from "@clerk/nextjs";

export default function DashLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    return <>{children}</>;
  }

  return (
    <div className="bg-colorBg text-colorText">
      <Nav />
      <Title />
      {children}
    </div>
  );
}
