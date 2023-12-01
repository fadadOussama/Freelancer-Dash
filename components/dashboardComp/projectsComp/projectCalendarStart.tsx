"use client";

import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { LuCalendarPlus } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type propsTypes = {
  startDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
};

export function StartCalendarForm({ startDate, setStartDate }: propsTypes) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "col-span-3 justify-between text-left font-normal border-[2px] px-3 bg-colorBg hover:bg-colorBg dark:hover:bg-colorBg",
            !startDate && "text-muted-foreground"
          )}
        >
          {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
          <LuCalendarPlus className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-colorBg"
          mode="single"
          selected={startDate}
          onSelect={setStartDate}
          defaultMonth={startDate}
          disabled={{ before: new Date() }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
