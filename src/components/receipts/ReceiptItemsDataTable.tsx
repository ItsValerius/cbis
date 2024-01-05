"use client";

import {
  type ColumnDef,
  type RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { ReceiptItem, NewReceiptItem } from "~/server/db/schema";
import { Button } from "../ui/button";
import { updateReceiptsItems } from "~/app/receipts/[id]/action";
import { Plus } from "lucide-react";

interface DataTableProps<ReceiptItem> {
  columns: ColumnDef<NewReceiptItem>[];
  defaultColumn: Partial<ColumnDef<NewReceiptItem>>;
  data: ReceiptItem[];
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export function ReceiptItemsDataTable({
  columns,
  data,
  defaultColumn,
}: DataTableProps<NewReceiptItem>) {
  const [tableData, setTableData] = useState(data);
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const table = useReactTable({
    data: tableData,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
  });
  const edit = searchParams.get("edit");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="data-[state=selected]:bg-background data-[state=selected]:line-through"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
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
          {edit === "true" && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Button
                  className="w-full"
                  onClick={() => {
                    setTableData((oldTableData) => {
                      return [
                        ...oldTableData,
                        {
                          name: "",
                          price: "",
                          receiptId: 3,
                        },
                      ];
                    });
                  }}
                >
                  <Plus size={16}></Plus>
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pathname !== "/receipts/list" && (
        <Button
          variant="secondary"
          className="w-full rounded-b-sm rounded-t-none "
          onClick={async () => {
            if (edit === "true") {
              console.log(table.getSelectedRowModel());
              const deletedItemIds = table
                .getSelectedRowModel()
                .rows.map((row) => row.original.id)
                .filter((r): r is number => !!r);

              await updateReceiptsItems(tableData, deletedItemIds);
            }
            router.push(
              pathname +
                "?" +
                createQueryString("edit", edit === "true" ? "false" : "true"),
              { scroll: false },
            );
          }}
        >
          {edit === "true" ? "Save" : "Edit"}
        </Button>
      )}
    </div>
  );
}
