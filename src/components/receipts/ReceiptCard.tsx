import React from "react";
import type { ReceiptWithItemsUser, User } from "~/server/db/schema";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import ReceiptItemsAccordion from "./ReceiptItemsAccordion";
import { Skeleton } from "../ui/skeleton";

const ReceiptCard = async ({
  receipt,
  children,
  users,
}: {
  receipt: ReceiptWithItemsUser;
  children?: React.JSX.Element;
  users: User[];
}) => {
  return (
    <Card className="flex w-[480px] max-w-full flex-col transition-shadow duration-500 hover:shadow-xl xl:w-full">
      <CardHeader>
        <CardTitle>Receipt ID: {receipt.id}</CardTitle>
      </CardHeader>
      {receipt.updated ? (
        <CardContent className="flex flex-col gap-y-2">
          <div className="flex justify-between gap-2">
            <p>Merchant Name:</p>
            <p className=" w-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right">
              {receipt.merchantName ?? "-"}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p>Merchant Adress:</p>
            <p className=" w-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right">
              {receipt.merchantAdress ?? "-"}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p>Merchant Phone:</p>
            <p className=" w-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right">
              {receipt.merchantPhone ?? "-"}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p>Receipt Total:</p>
            <p className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right">
              {receipt.total ?? "-"}€
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p>Created By:</p>
            <p className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-right">
              {receipt.createdBy.name ?? "-"}
            </p>
          </div>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col gap-y-2">
          <div className="flex justify-between gap-2">
            <p>Merchant Name:</p>
            <Skeleton className="h-[24px] w-1/3" />
          </div>
          <div className="flex justify-between gap-2">
            <p>Merchant Adress:</p>
            <Skeleton className="h-[24px] w-1/2" />
          </div>
          <div className="flex justify-between gap-2">
            <p>Merchant Phone:</p>
            <Skeleton className="h-[24px] w-1/2" />
          </div>
          <div className="flex justify-between gap-2">
            <p>Receipt Total:</p>
            <Skeleton className="h-[24px] w-1/4" />
          </div>
          <div className="flex justify-between gap-2">
            <p>Created By:</p>
            <Skeleton className="h-[24px] w-1/4" />
          </div>
        </CardContent>
      )}

      <CardContent>
        <ReceiptItemsAccordion
          receiptItems={receipt.receiptItems}
          receiptId={receipt.id}
          users={users}
        />
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
};

export default ReceiptCard;
