/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./dataTablePagination";
import { useMemo, useState } from "react";
import DataTableFilters from "./dataTableFilters";
import { ClientType } from "./columns";

import ActionTable from "./actionTable";
import { DataTableColumnHeader } from "./dataTableColumnHeader";

import { useOptimistic } from "react";

interface DataTableProps<TData, TValue> {
  data: TData[];
  pageIndex: number;
  pageSize: number;
  sort: SortingState;
  filter: ColumnFiltersState;
}

export function DataTable<TData, TValue>({ data, pageIndex, pageSize, sort, filter }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(sort);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(filter);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex, pageSize });
  const [tableData, setTableData] = useOptimistic(data, (_, newData) => newData as TData[]);

  const columns = useMemo(() => {
    const columnsArr: ColumnDef<ClientType>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },

      {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => <div className="pl-[17px]">{row.original.email}</div>,
      },

      {
        accessorKey: "country",
        header: "Country",
      },

      {
        accessorKey: "projects",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Projects" />,
        cell: ({ row }) => <div className="pl-10">{row.original.projects}</div>,
      },

      {
        accessorKey: "referralSource",
        header: "Referral Source",
      },

      {
        id: "actions",
        cell: ({ row }) => <ActionTable client={row.original} tableData={tableData as ClientType[]} setTableData={setTableData} />,
      },
    ];

    return columnsArr as ColumnDef<TData, any>[];
  }, [tableData, setTableData]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
  });

  return (
    <>
      <DataTableFilters table={table} data={tableData as ClientType[]} setTableData={setTableData} />

      <div className="border dark:border-neutral-700/60 mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </>
  );
}
