import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="case my-10">
      <div className="mb-5">
        <Skeleton className="w-full h-[40px] bg-colorText/10 rounded-lg mb-5" />
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <Skeleton className="w-full bg-colorText/5 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-1/4 h-[34px] bg-colorText/10 rounded-lg" />
            <Skeleton className="w-[34px] h-[34px] bg-colorText/10 rounded-lg" />
          </div>
          <Skeleton className="w-full h-[68px] bg-colorText/10 rounded-lg" />
        </Skeleton>

        <Skeleton className="w-full bg-colorText/5 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-1/4 h-[34px] bg-colorText/10 rounded-lg" />
            <Skeleton className="w-[34px] h-[34px] bg-colorText/10 rounded-lg" />
          </div>
          <Skeleton className="w-full h-[68px] bg-colorText/10 rounded-lg" />
        </Skeleton>

        <Skeleton className="w-full bg-colorText/5 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-1/4 h-[34px] bg-colorText/10 rounded-lg" />
            <Skeleton className="w-[34px] h-[34px] bg-colorText/10 rounded-lg" />
          </div>
          <Skeleton className="w-full h-[68px] bg-colorText/10 rounded-lg" />
        </Skeleton>
      </div>
    </main>
  );
}
