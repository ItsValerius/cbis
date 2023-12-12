import Link from "next/link";
import React from "react";
import { ReceiptWithItems } from "~/server/db/schema";

const ReceiptCard = ({
  receipt,
  children,
}: {
  receipt: ReceiptWithItems;
  children?: React.JSX.Element;
}) => {
  return (
    <div className="flex h-full flex-col gap-y-4 rounded border border-slate-500 bg-slate-800 p-4 shadow-md shadow-slate-700">
      {children}
      <div>
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
      </div>
      <table>
        <caption className="font-medium underline">Receipt Items </caption>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {receipt?.receiptItems.map((receiptItem) => {
            return (
              <tr key={receiptItem.id} className="border-b border-yellow-100">
                <td className="">{receiptItem.name}</td>
                <td className="text-right">{receiptItem.price}€</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptCard;
