import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { getReceipt } from "~/lib/helper";

const Page = async ({ params }: { params: { id: number } }) => {
  const receipt = await getReceipt(params.id);
  if (!receipt) return notFound();
  return (
    <main className="  flex min-h-screen  flex-col items-center justify-center bg-slate-900 p-4 text-slate-100 ">
      <div
        key={receipt.id}
        className="flex flex-col  gap-4 rounded border border-slate-500 bg-slate-800 p-4 shadow-md shadow-slate-700"
      >
        <Link
          className="w-fit rounded border p-2 transition-colors duration-500 hover:bg-slate-100 hover:text-slate-900"
          href="/receipts/list"
        >
          Back
        </Link>
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
        <table className="w-full">
          <caption className="underline">Receipt Items </caption>
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {receipt?.receiptItems.map((receiptItem) => {
              return (
                <tr key={receiptItem.id} className="border-y border-yellow-100">
                  <td className="">{receiptItem.name}</td>
                  <td className="text-right">{receiptItem.price}€</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Page;
