"use client";

import { usePathname } from "next/navigation";

export default function Title() {
  const pathname = usePathname();
  let dashboardTitle;

  if (pathname === "/") {
    dashboardTitle = "Overview";
  } else {
    dashboardTitle = pathname.replace(/\//g, "");
  }

  return <h1 className={`text-6xl sm:text-left text-center font-semibold case mt-10 capitalize font-secondFont`}>{dashboardTitle}</h1>;
}
