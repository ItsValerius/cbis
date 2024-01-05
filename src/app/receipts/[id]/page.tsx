import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { getReceipt } from "~/lib/helper";
import ReceiptCard from "../../../components/receipts/ReceiptCard";
import { Button } from "~/components/ui/button";
import ReceiptDeleteDialog from "~/components/receipts/ReceiptDeleteDialog";

const Page = async ({ params }: { params: { id: number } }) => {
  const receipt = await getReceipt(params.id);
  if (!receipt) return notFound();
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-4">
      <ReceiptCard receipt={receipt}>
        <div className="flex w-full justify-between">
          <Button className="flex w-fit justify-start" asChild>
            <Link href="/receipts/list">Back</Link>
          </Button>
          <ReceiptDeleteDialog id={params.id} />
        </div>
      </ReceiptCard>
    </main>
  );
};

export default Page;
