import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs";

export default function Loading() {
  const { userId } = auth();

  if (!userId) {
    return <></>;
  }

  return (
    <div className="case">
      <div className="my-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end items-center gap-y-4">
          <Skeleton className="w-[134px] h-[40px] rounded-lg bg-colorText/10" />
          <Skeleton className="sm:w-[300px] w-full h-[40px] rounded-lg bg-colorText/10" />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
          <Skeleton className="w-full h-[261px] bg-colorText/10" />
          <Skeleton className="w-full h-[261px] bg-colorText/10" />
          <Skeleton className="w-full h-[261px] bg-colorText/10" />
        </div>
      </div>
    </div>
  );
}
