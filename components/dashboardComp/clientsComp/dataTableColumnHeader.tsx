"use client";

import { LuChevronsUpDown } from "react-icons/lu";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import { BiReset } from "react-icons/bi";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { mergeSortEmailQueryParams } from "@/helpers/mergeQueryParams";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-colorText/10">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <FaArrowDownWideShort className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <FaArrowDownShortWide className="ml-2 h-4 w-4" />
            ) : (
              <LuChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              router.push(`clients?${mergeSortEmailQueryParams(`sort${title}`, "asc", searchParams)}`, { scroll: false });
              column.toggleSorting(false);
            }}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`clients?${mergeSortEmailQueryParams(`sort${title}`, "desc", searchParams)}`, { scroll: false });
              column.toggleSorting(true);
            }}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push(`clients?${mergeSortEmailQueryParams("reset", "reset", searchParams)}`, { scroll: false });
              column.clearSorting();
            }}
          >
            <BiReset className="mr-2 h-3.5 w-3.5" />
            Reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
