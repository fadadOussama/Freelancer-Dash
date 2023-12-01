import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs";
import React from "react";

export default function Loading() {
  const { userId } = auth();

  if (!userId) {
    return <></>;
  }

  return (
    <div className="case">
      <div className="my-10">
        <div className="flex md:flex-row flex-col items-center justify-between gap-y-2 mb-6">
          <Skeleton className="w-[170px] h-[40px] bg-colorText/10" />
          <Skeleton className="w-[208px] h-[40px] bg-colorText/10" />
          <Skeleton className="w-[223px] h-[40px] bg-colorText/10" />
        </div>

        <Skeleton className="w-full h-[725px] bg-colorText/10" />
      </div>
    </div>
  );
}
