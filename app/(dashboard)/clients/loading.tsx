import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs";

export default function Loading() {
  const { userId } = auth();

  if (!userId) {
    return <></>;
  }

  return (
    <div className="case">
      <div className="mt-10 flex sm:flex-row flex-col gap-y-5 justify-between sm:items-end items-center">
        <Skeleton className="w-[126px] h-[40px] rounded-lg bg-colorText/10" />
        <div className="sm:w-auto w-full">
          <Skeleton className="sm:w-[300px] w-full h-[40px] bg-colorText/10 rounded-lg" />
          <Skeleton className="sm:w-[300px] w-full h-[40px] bg-colorText/10 mt-5 rounded-lgx" />
        </div>
      </div>

      <Skeleton className="w-full h-[370px] mt-5 bg-colorText/10" />

      <div className="flex sm:flex-row flex-col-reverse items-center justify-between mt-5 mb-10 gap-y-4">
        <div className="flex sm:flex-row flex-col items-center sm:justify-between gap-x-6 gap-y-4">
          <Skeleton className="w-[152px] h-[32px] bg-colorText/10" />
          <Skeleton className="w-[60px] h-[32px] bg-colorText/10" />
        </div>
        <Skeleton className="w-[174px] h-[32px] bg-colorText/10" />
      </div>
    </div>
  );
}
