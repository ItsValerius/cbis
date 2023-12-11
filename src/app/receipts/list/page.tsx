import { getReceipts } from "~/lib/helper";

export default async function Page() {
  const receipts = await getReceipts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {receipts.map((receipt) => {
        return (<div key={receipt.id}>
          <div className="flex gap-2">
            Merchant Name:
            <p className=" text-red-300">
              {receipt.merchantName}
            </p>
          </div>
          <div className="flex gap-2">
            Merchant Adress:
            <p className=" text-red-300">
              {receipt.merchantAdress}
            </p>
          </div>
          <div className="flex gap-2">
            Merchant Phone:   <p className=" text-red-300">
              {receipt.merchantPhone}
            </p>
          </div>
          <div className="flex gap-2">
            Receipt Total:   <p className=" text-red-300">
              {receipt.total}€
              Receipt Items: </p>
          </div>

          <ul>
            {receipt?.receiptItems.map((receiptItem) => {
              return (
                <li  key={receiptItem.id}>
                 <div className="flex gap-2">
                   Item Name:  
                   <p className=" text-red-300">
                    {receiptItem.name}
                    </p>
                   -
                   Item Price: 
                   <p className=" text-red-300">
                   {receiptItem.price}€
                   </p>
                    </div> 
                </li>)
            })}
          </ul>
        </div>
        )
      })}
    </main>
  );
}
