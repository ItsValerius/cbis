"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { NewReceiptItem } from "~/server/db/schema";
import { Button } from "../ui/button";
import { Trash, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

// Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<NewReceiptItem>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const searchParams = useSearchParams()!;
    const edit = searchParams.get("edit");
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    if (edit !== "true")
      return <div className="font-medium">{value as string}</div>;
    return (
      <Input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

export const columns: ColumnDef<NewReceiptItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "delete",

    cell: ({ row }) => {
      const isSelected = row.getIsSelected();
      const searchParams = useSearchParams()!;
      const edit = searchParams.get("edit");
      if (edit !== "true") return;
      return (
        <Button
          variant={isSelected ? "secondary" : "destructive"}
          className="text-right"
          onClick={() => {
            row.toggleSelected();
          }}
        >
          {!isSelected ? <Trash size={16} /> : <X size={16} />}
        </Button>
      );
    },
  },
];
