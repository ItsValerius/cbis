import Link from "next/link";
import { getReceipts } from "~/lib/helper";
import ReceiptCard from "../ReceiptCard";
import { Button } from "~/components/ui/button";
export default async function Page() {
  const receipts = await getReceipts();
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center gap-2 p-2 xl:grid xl:grid-cols-3 xl:items-start xl:gap-4 xl:p-4">
      {receipts.map((receipt) => {
        return (
          <ReceiptCard receipt={receipt} key={receipt.id}>
            <Button asChild>
              <Link href={`/receipts/${receipt.id}`} className=" w-fit">
                Go To Receipt
              </Link>
            </Button>
          </ReceiptCard>
        );
      })}
    </main>
  );
}
