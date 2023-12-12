import { getReceipts } from "~/lib/helper";
export default async function Page() {
  const receipts = await getReceipts();
  return (
    <main className="grid min-h-screen grid-cols-3 grid-rows-3 gap-4 bg-slate-900 p-4 text-slate-50 ">
      {receipts.map((receipt) => {
        return (
          <div className="rounded border p-4 shadow-md shadow-slate-50">
            <div key={receipt.id} className="border-b">
              <div className="flex justify-between gap-2">
                Merchant Name:
                <p className=" text-red-300">{receipt.merchantName ?? "-"}</p>
              </div>
              <div className="flex justify-between gap-2">
                Merchant Adress:
                <p className=" text-red-300">{receipt.merchantAdress ?? "-"}</p>
              </div>
              <div className="flex justify-between gap-2">
                Merchant Phone:{" "}
                <p className=" text-red-300">{receipt.merchantPhone ?? "-"}</p>
              </div>
              <div className="flex justify-between gap-2">
                Receipt Total:{" "}
                <p className=" text-red-300">{receipt.total ?? "-"}€</p>
              </div>
            </div>
            Receipt Items:
            <ul>
              {receipt?.receiptItems.map((receiptItem) => {
                return (
                  <li key={receiptItem.id}>
                    <div className="flex gap-2">
                      Item Name:
                      <p className=" text-red-300">{receiptItem.name}</p>- Item
                      Price:
                      <p className=" text-red-300">{receiptItem.price}€</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </main>
  );
}
