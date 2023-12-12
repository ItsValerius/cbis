import Link from "next/link";
import { getReceipts } from "~/lib/helper";
import ReceiptCard from "../ReceiptCard";
export default async function Page() {
  const receipts = await getReceipts();
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-2 bg-slate-900 p-2  text-slate-100 xl:grid xl:auto-rows-fr xl:grid-cols-3 xl:gap-4 xl:p-4 ">
      {receipts.map((receipt) => {
        return (
          <Link href={`/receipts/${receipt.id}`} key={receipt.id}>
            <ReceiptCard receipt={receipt} />
          </Link>
        );
      })}
    </main>
  );
}
