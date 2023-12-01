"use client";

import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { Table } from "@tanstack/react-table";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { mergePageIndexQueryParams, mergePageSizeQueryParams } from "@/helpers/mergeQueryParams";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handlePageStart() {
    router.push(`clients?${mergePageIndexQueryParams("pageIndex", 0, searchParams)}`, { scroll: false });
    table.setPageIndex(0);
  }

  function handlePagePrev() {
    router.push(`clients?${mergePageIndexQueryParams("pageIndex", table.getState().pagination.pageIndex - 1, searchParams)}`, { scroll: false });
    table.previousPage();
  }

  function handlePageNext() {
    router.push(`clients?${mergePageIndexQueryParams("pageIndex", table.getState().pagination.pageIndex + 1, searchParams)}`, { scroll: false });
    table.nextPage();
  }

  function handlePageEnd() {
    router.push(`clients?${mergePageIndexQueryParams("pageIndex", table.getPageCount() - 1, searchParams)}`, { scroll: false });
    table.setPageIndex(table.getPageCount() - 1);
  }

  return (
    <div className="flex sm:flex-row flex-col-reverse items-center justify-between mt-5 mb-10 gap-y-4">
      <div className="flex sm:flex-row flex-col items-center sm:justify-between gap-x-6 gap-y-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-8 w-8 p-0 flex" onClick={handlePageStart} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to first page</span>
            <LuChevronsLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="h-8 w-8 p-0" onClick={handlePagePrev} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            <LuChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="h-8 w-8 p-0" onClick={handlePageNext} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            <LuChevronRight className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="h-8 w-8 p-0 flex" onClick={handlePageEnd} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to last page</span>
            <LuChevronsRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="sm:w-[100px] text-sm font-normal">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-sm font-normal">Rows per page</p>
        <div className="rounded-md">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              table.setPageIndex(0);
              router.push(`clients?${mergePageSizeQueryParams("pageSize", value, searchParams)}`, { scroll: false });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
