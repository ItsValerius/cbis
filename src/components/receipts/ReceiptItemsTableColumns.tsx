"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { NewReceiptItem } from "~/server/db/schema";
import { Button } from "../ui/button";
import { Trash, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import Image from "next/image";

import fallbackUserImage from "~/assets/fallback-user-image.webp";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
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
  {
    accessorKey: "userId",
    header: "Assigned to",
    id: "userId",

    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally

      const searchParams = useSearchParams()!;
      const edit = searchParams.get("edit");
      const users = table.options.meta?.users;

      const user = users?.find((user) => user.id === initialValue);
      if (edit !== "true") {
        if (!user) return;
        return (
          <Avatar>
            {user.image ? (
              <div className="flex w-full flex-row justify-start gap-2">
                <AvatarImage
                  asChild
                  src={user.image}
                  className="h-6 w-6 rounded-full"
                >
                  <Image
                    priority
                    src={user.image}
                    alt="User Profile"
                    width={48}
                    height={48}
                  />
                </AvatarImage>
                <AvatarFallback asChild className="h-6 w-6 rounded-full">
                  <Image
                    priority
                    src={fallbackUserImage}
                    alt="User Profile"
                    width={48}
                    height={48}
                  />
                </AvatarFallback>
              </div>
            ) : (
              <div className="flex w-full flex-row gap-2">
                <div className="h-6 w-6 rounded-full">
                  <Image
                    priority
                    src={fallbackUserImage}
                    alt="User Profile"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            )}
          </Avatar>
        );
      }
      return (
        <Select
          onValueChange={(e) => table.options.meta?.updateData(index, id, e)}
        >
          <SelectTrigger>
            <Avatar>
              {user?.image ? (
                <div className="flex w-full flex-row justify-start gap-2">
                  <AvatarImage
                    asChild
                    src={user.image}
                    className="h-6 w-6 rounded-full"
                  >
                    <Image
                      priority
                      src={user.image}
                      alt="User Profile"
                      width={48}
                      height={48}
                    />
                  </AvatarImage>
                  <AvatarFallback asChild className="h-6 w-6 rounded-full">
                    <Image
                      priority
                      src={fallbackUserImage}
                      alt="User Profile"
                      width={48}
                      height={48}
                    />
                  </AvatarFallback>
                  <span className="hidden md:block">{user.name}</span>
                </div>
              ) : (
                <div className="flex w-full flex-row gap-2">
                  <div className="h-6 w-6 rounded-full">
                    <Image
                      priority
                      src={fallbackUserImage}
                      alt="User Profile"
                      width={48}
                      height={48}
                    />
                  </div>
                  <span className="hidden md:block">{user?.name ?? "All"}</span>
                </div>
              )}
            </Avatar>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="">
              {users?.map((user) => {
                return (
                  <SelectItem value={user.id} key={user.id}>
                    <Avatar>
                      {user.image ? (
                        <div className="flex w-full flex-row justify-start gap-2">
                          <AvatarImage
                            asChild
                            src={user.image}
                            className="h-6 w-6 rounded-full"
                          >
                            <Image
                              priority
                              src={user.image}
                              alt="User Profile"
                              width={48}
                              height={48}
                            />
                          </AvatarImage>
                          <AvatarFallback
                            asChild
                            className="h-6 w-6 rounded-full"
                          >
                            <Image
                              priority
                              src={fallbackUserImage}
                              alt="User Profile"
                              width={48}
                              height={48}
                            />
                          </AvatarFallback>
                          <span className="hidden md:block">{user.name}</span>
                        </div>
                      ) : (
                        <div className="flex w-full flex-row gap-2">
                          <div className="h-6 w-6 rounded-full">
                            <Image
                              priority
                              src={fallbackUserImage}
                              alt="User Profile"
                              width={48}
                              height={48}
                            />
                          </div>
                          <span className="hidden md:block">{user.name}</span>
                        </div>
                      )}
                    </Avatar>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
];
