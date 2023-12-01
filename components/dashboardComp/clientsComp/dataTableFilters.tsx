import { Table } from "@tanstack/react-table";
import { LuX, LuSearch } from "react-icons/lu";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { referralSources } from "@/array/referralSourceArr";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import ActionTableAdd from "./actionTableAdd";
import { useRouter, useSearchParams } from "next/navigation";
import { mergeNameSearchQueryParams, mergeReferralSourceQueryParams } from "@/helpers/mergeQueryParams";
import { ClientType } from "./columns";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  data: ClientType[];
  setTableData: (action: unknown) => void;
}

export default function DataTableFilters<TData>({ table, data, setTableData }: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialInputVal = searchParams.get("nameSearch") ? (searchParams.get("nameSearch") as string) : "";
  const [inputVal, setInputVal] = useState<string | undefined>(initialInputVal);

  const initialSelectVal = searchParams.get("referralSource") ? (searchParams.get("referralSource") as string) : "";
  const [selectVal, setSelectVal] = useState<string | undefined>(initialSelectVal);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
    if (event.target.value === "") {
      router.push(`clients?${mergeNameSearchQueryParams("reset", "reset", searchParams)}`, { scroll: false });
    }
  };
  const handleInputState = () => {
    table.setPageIndex(0);
    table.getColumn("name")?.setFilterValue(inputVal);
    router.push(`clients?${mergeNameSearchQueryParams("nameSearch", inputVal, searchParams)}`, { scroll: false });
  };
  const handleInputReset = () => {
    setInputVal("");
    table.getColumn("name")?.setFilterValue("");
    router.push(`clients?${mergeNameSearchQueryParams("reset", "reset", searchParams)}`, { scroll: false });
  };

  const handleSelectState = (e: string) => {
    table.setPageIndex(0);
    table.getColumn("referralSource")?.setFilterValue(e);
    setSelectVal(e);
    router.push(`clients?${mergeReferralSourceQueryParams("referralSource", e, searchParams)}`, { scroll: false });
  };
  const handleSelectReset = () => {
    table.getColumn("referralSource")?.setFilterValue("");
    setSelectVal("");
    router.push(`clients?${mergeReferralSourceQueryParams("reset", "reset", searchParams)}`, { scroll: false });
  };

  return (
    <div className="mt-10 flex sm:flex-row flex-col gap-y-5 justify-between sm:items-end items-center">
      <div>
        <ActionTableAdd data={data} setTableData={setTableData} />
      </div>

      <div className="sm:w-auto w-full">
        <div>
          <div className="flex gap-4 items-center relative sm:w-[300px]">
            <div className="w-full flex items-center overflow-hidden py-2 px-3 border border-colorText/10 rounded-md shadow-sm">
              <input
                placeholder="Filter names..."
                value={inputVal}
                onChange={handleInputChange}
                className="w-full placeholder:text-colorText/50 text-sm bg-colorBg outline-none border-none"
              />
              {inputVal !== "" && (
                <span className="flex items-center h-4 w-4 cursor-pointer" onClick={handleInputReset}>
                  <LuX />
                </span>
              )}
            </div>

            <Button variant="outline" onClick={handleInputState} className="flex items-center gap-2 font-normal border shadow-sm">
              <LuSearch />
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-4 items-center sm:w-[300px]">
            <Select value={selectVal} onValueChange={handleSelectState}>
              <SelectTrigger className="text-sm py-2 px-3 bg-colorBg border border-colorText/10 rounded-md outline-none">
                <SelectValue placeholder={"Select referral source"} />
              </SelectTrigger>
              <SelectContent>
                {referralSources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {table.getColumn("referralSource")?.getIsFiltered() && (
              <Button variant="outline" onClick={handleSelectReset} className="flex items-center gap-2 font-normal">
                <LuX />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
