"use client";

import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { LuCalendarX2 } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type propsTypes = {
  endDate: Date | undefined;
  setEndDate: Dispatch<SetStateAction<Date | undefined>>;
};

export function EndCalendarForm({ endDate, setEndDate }: propsTypes) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "col-span-3 justify-between text-left font-normal border-[2px] px-3 bg-colorBg hover:bg-colorBg dark:hover:bg-colorBg",
            !endDate && "text-muted-foreground"
          )}
        >
          {endDate ? format(endDate, "PPP") : <span>Pick a end date</span>}
          <LuCalendarX2 className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-colorBg"
          mode="single"
          selected={endDate}
          onSelect={setEndDate}
          defaultMonth={endDate}
          disabled={{ before: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
