import Link from "next/link";
import { getReceipts } from "~/lib/helper";
export default async function Page() {
  const receipts = await getReceipts();
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-2 bg-slate-900 p-2  text-slate-100 xl:grid xl:auto-rows-fr xl:grid-cols-3 xl:gap-4 xl:p-4 ">
      {receipts.map((receipt) => {
        return (
          <Link
            href={`/receipt/${receipt.id}`}
            key={receipt.id}
            className="gp-y-4 flex flex-col rounded border border-slate-500 bg-slate-800 p-4 shadow-md shadow-slate-700 transition-colors duration-300 hover:bg-slate-700"
          >
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
                    <tr
                      key={receiptItem.id}
                      className="border-y border-yellow-100"
                    >
                      <td className="">{receiptItem.name}</td>
                      <td className="text-right">{receiptItem.price}€</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Link>
        );
      })}
    </main>
  );
}
