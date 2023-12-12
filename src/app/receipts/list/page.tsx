import Link from "next/link";
import { getReceipts } from "~/lib/helper";
export default async function Page() {
  const receipts = await getReceipts();
  return (
    <main className="mx-auto grid min-h-screen max-w-5xl grid-cols-3  gap-4 bg-slate-900 p-4 text-slate-100 ">
      {receipts.map((receipt) => {
        return (
          <Link
            href={`/receipt/${receipt.id}`}
            key={receipt.id}
            className="flex flex-col  gap-y-4 rounded border border-slate-500 bg-slate-800 p-4 shadow-md shadow-slate-700"
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
              <caption>Receipt Items </caption>
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
