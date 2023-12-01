import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { countries } from "@/array/countrysArr";
import { cn } from "@/lib/utils";
import { ClientType } from "./clientsComp/columns";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

type propsTypes = {
  isEditClient: ClientType | undefined;
  clientCountry?: string;
  selectedCountry: string;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
};

export function CountriesSelect({ isEditClient, clientCountry, selectedCountry, setSelectedCountry }: propsTypes) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnSelect = (country: string) => {
    setIsOpen(false);
    setSelectedCountry(country);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="col-span-3 px-3 font-normal border-[2px] border-colorText/10 justify-between text-colorText bg-colorBg hover:bg-colorBg dark:hover:bg-colorBg"
        >
          {selectedCountry ? selectedCountry : isEditClient ? clientCountry : "Select client's country"}
          <CaretSortIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 popoverSelectWith">
        <Command>
          <CommandInput placeholder="Search Country..." className="h-9" />
          <CommandEmpty>Country not found.</CommandEmpty>

          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {countries.map(({ code, name }) => (
              <CommandItem className="flex items-center gap-x-1" key={code} onSelect={() => handleOnSelect(name)}>
                <span className={`fi fi-${code} w-5 h-5 mr-1`}></span>
                {name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    isEditClient
                      ? name === selectedCountry
                        ? "opacity-100"
                        : "opacity-0"
                      : name === selectedCountry || clientCountry === name
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
