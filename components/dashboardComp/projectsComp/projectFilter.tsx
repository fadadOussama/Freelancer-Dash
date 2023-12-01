import { projectTypesInput } from "@/array/projectTypesArr";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projectTypeQueryParams } from "@/helpers/mergeQueryParams";
import { projectTypeTypes, projectsType } from "@/type";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { LuX } from "react-icons/lu";

type Props = {
  fullProjects: projectsType;
  setProjects: (action: projectsType) => void;
};

export default function ProjectFilter({ fullProjects, setProjects }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectVal, setSelectVal] = useState<string | undefined>(searchParams.get("type") ? (searchParams.get("type") as projectTypeTypes) : "");

  async function handleSelectState(e: string) {
    setSelectVal(e);

    const filterdProjects = fullProjects.filter((obj) => {
      return obj.type === e;
    });

    startTransition(() => {
      setProjects(filterdProjects);
    });

    router.push(`projects?${projectTypeQueryParams("type", e, searchParams)}`, { scroll: false });
  }

  async function handleSelectReset() {
    setSelectVal("");

    startTransition(() => {
      setProjects(fullProjects);
    });

    router.push("/projects", { scroll: false });
  }

  return (
    <div>
      <div className="flex gap-4 items-center sm:w-[300px] w-full">
        <Select value={selectVal} onValueChange={handleSelectState}>
          <SelectTrigger className="text-sm py-2 px-3 bg-colorBg border border-colorText/10 rounded-md outline-none sm:w-full w-[242px]">
            <SelectValue placeholder={"Filter by project type"} />
          </SelectTrigger>
          <SelectContent>
            {projectTypesInput.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectVal !== "" && (
          <Button variant="outline" onClick={handleSelectReset} className="flex items-center gap-2 font-normal">
            <LuX />
          </Button>
        )}
      </div>
    </div>
  );
}
