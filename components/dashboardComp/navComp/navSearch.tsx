"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { LuHome, LuKanbanSquare, LuCalendarDays, LuUsers, LuFileCode2 } from "react-icons/lu";

type hrefTypes = "" | "kanban" | "calendar" | "clients" | "projects";

export default function NavSearch() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavigating = (href: hrefTypes) => {
    setOpen(false);
    router.push(`/${href}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="hidden md:flex gap-x-[35px] rounded-[4px] dark:text-neutral-400 text-neutral-600 text-[13px]"
        onClick={() => setOpen(true)}
      >
        <span>Search In Dashboard</span>
        <span className="leading-none flex items-center bg-colorText/5 p-1 rounded-sm border border-colorText/5">
          <span className="text-[10px]">⌘K</span>
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Suggestions">
            <CommandItem className="mt-2" onSelect={() => handleNavigating("")}>
              <div className="w-full flex items-center gap-x-3">
                <LuHome className={"text-[16px]"} /> Overview
              </div>
            </CommandItem>

            <CommandItem onSelect={() => handleNavigating("kanban")}>
              <div className="w-full flex items-center gap-x-3">
                <LuKanbanSquare className={"text-[16px]"} /> Kanban
              </div>
            </CommandItem>

            <CommandItem onSelect={() => handleNavigating("calendar")}>
              <div className="w-full flex items-center gap-x-3">
                <LuCalendarDays className={"text-[16px]"} /> Calendar
              </div>
            </CommandItem>

            <CommandItem onSelect={() => handleNavigating("clients")}>
              <div className="w-full flex items-center gap-x-3">
                <LuUsers className={"text-[16px]"} /> Clients
              </div>
            </CommandItem>

            <CommandItem className="mb-1" onSelect={() => handleNavigating("projects")}>
              <div className="w-full flex items-center gap-x-3">
                <LuFileCode2 className={"text-[16px]"} /> Projects
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
