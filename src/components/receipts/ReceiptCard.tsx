import React from "react";
import type {
  ReceiptWithItems,
  ReceiptWithItemsUsers,
} from "~/server/db/schema";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import ReceiptItemsAccordion from "./ReceiptItemsAccordion";

const ReceiptCard = ({
  receipt,
  children,
}: {
  receipt: ReceiptWithItemsUsers;
  children?: React.JSX.Element;
}) => {
  return (
    <Card className="flex w-[480px] max-w-full flex-col gap-y-4 transition-shadow duration-500 hover:shadow-xl">
      <CardHeader>
        <CardTitle>Receipt ID: {receipt.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-2">
          <p>Merchant Name:</p>
          <p className=" text-right">{receipt.merchantName ?? "-"}</p>
        </div>
        <div className="flex justify-between gap-2">
          <p>Merchant Adress:</p>
          <p className=" text-right">{receipt.merchantAdress ?? "-"}</p>
        </div>
        <div className="flex justify-between gap-2">
          <p>Merchant Phone:</p>
          <p className=" text-right">{receipt.merchantPhone ?? "-"}</p>
        </div>
        <div className="flex justify-between gap-2">
          <p>Receipt Total:</p>
          <p className=" ">{receipt.total ?? "-"}€</p>
        </div>
        <div className="flex justify-between gap-2">
          <p>Created By:</p>
          <p>{receipt.users.name}</p>
        </div>
      </CardContent>
      <CardFooter>
        <ReceiptItemsAccordion receiptItems={receipt.receiptItems} />
      </CardFooter>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
};

export default ReceiptCard;
