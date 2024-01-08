"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

import Image from "next/image";

import fallbackUserImage from "~/assets/fallback-user-image.webp";
import type { ReceiptWithItemsUser, User } from "~/server/db/schema";
import { updateUserThatPaid } from "~/app/receipts/[id]/action";
const ReceiptPaidBySelect = ({
  receipt,
  users,
}: {
  receipt: ReceiptWithItemsUser;
  users: User[];
}) => {
  const [selected, setSelected] = useState(receipt.paidBy.id);
  const selectedUser = users.find((user) => user.id === selected);

  return (
    <Select
      onValueChange={async (val) => {
        setSelected(val);
        await updateUserThatPaid(val, receipt.id);
      }}
    >
      <SelectTrigger className="max-w-1/2 flex  w-fit  items-center">
        <div className=" flex w-full flex-row items-center justify-center gap-2">
          <Avatar className="h-6 w-6 rounded-full">
            <AvatarImage asChild src={selectedUser?.image ?? undefined}>
              <Image
                src={selectedUser?.image ?? fallbackUserImage}
                alt="User Image"
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
          </Avatar>
          <span className="hidden md:block">{selectedUser?.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {users?.map((user) => {
          return (
            <SelectItem className="p-2" value={user.id} key={user.id}>
              <div className=" flex w-full flex-row items-center justify-center gap-2">
                <Avatar className="h-6 w-6 rounded-full">
                  <AvatarImage asChild src={user.image ?? undefined}>
                    <Image
                      src={user.image ?? fallbackUserImage}
                      alt="User Image"
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
                </Avatar>
                <span className="hidden md:block">{user.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ReceiptPaidBySelect;
