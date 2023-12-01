import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="case">
      <div className="mt-10">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-4">
          <Skeleton className="bg-colorText/5 rounded-lg w-full">
            <div className="flex justify-between items-center p-7">
              <div className="basis-2/3">
                <Skeleton className="h-[20px] w-1/3 bg-red-500 rounded-lg mb-2 bg-colorText/10" />
                <Skeleton className="h-12 w-full bg-red-500 rounded-lg bg-colorText/10" />
              </div>
              <Skeleton className="h-12 w-12 bg-red-500 rounded-full bg-colorText/10" />
            </div>
          </Skeleton>

          <Skeleton className="bg-colorText/5 rounded-lg w-full">
            <div className="flex justify-between items-center p-7">
              <div className="basis-2/3">
                <Skeleton className="h-[20px] w-1/3 bg-red-500 rounded-lg mb-2 bg-colorText/10" />
                <Skeleton className="h-12 w-full bg-red-500 rounded-lg bg-colorText/10" />
              </div>
              <Skeleton className="h-12 w-12 bg-red-500 rounded-full bg-colorText/10" />
            </div>
          </Skeleton>

          <Skeleton className="bg-colorText/5 rounded-lg w-full">
            <div className="flex justify-between items-center p-7">
              <div className="basis-2/3">
                <Skeleton className="h-[20px] w-1/3 bg-red-500 rounded-lg mb-2 bg-colorText/10" />
                <Skeleton className="h-12 w-full bg-red-500 rounded-lg bg-colorText/10" />
              </div>
              <Skeleton className="h-12 w-12 bg-red-500 rounded-full bg-colorText/10" />
            </div>
          </Skeleton>

          <Skeleton className="bg-colorText/5 rounded-lg w-full">
            <div className="flex justify-between items-center p-7">
              <div className="basis-2/3">
                <Skeleton className="h-[20px] w-1/3 bg-red-500 rounded-lg mb-2 bg-colorText/10" />
                <Skeleton className="h-12 w-full bg-red-500 rounded-lg bg-colorText/10" />
              </div>
              <Skeleton className="h-12 w-12 bg-red-500 rounded-full bg-colorText/10" />
            </div>
          </Skeleton>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-y-8 my-10">
        <Skeleton className="md:mr-4 bg-colorText/5 w-full md:basis-2/3 md:w-2/3 rounded-lg">
          <div className="py-6 px-7">
            <div className="mb-6">
              <Skeleton className="h-[20px] w-1/4 bg-red-500 rounded-lg mb-2 bg-colorText/10" />
              <Skeleton className="h-[20px] md:w-1/2 w-full bg-red-500 rounded-lg bg-colorText/10" />
            </div>
            <Skeleton className="h-[300px] w-full bg-red-500 rounded-lg mb-2 bg-colorText/10" />
          </div>
        </Skeleton>

        <Skeleton className="md:ml-4 bg-colorText/5 w-full md:basis-1/3 md:w-1/3 rounded-lg">
          <div className="py-6 px-7">
            <div className="mb-6">
              <Skeleton className="h-[20px] w-1/2 bg-red-500 rounded-lg mb-2 bg-colorText/10" />
              <Skeleton className="h-[20px] w-full bg-red-500 rounded-lg bg-colorText/10" />
            </div>

            <Skeleton className="h-[224px] md:h-[176px] w-[224px] md:w-[176px] bg-red-500 rounded-full mb-2 bg-colorText/10 mx-auto my-12" />
          </div>
        </Skeleton>
      </div>
    </main>
  );
}
