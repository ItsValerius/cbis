import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { getReceipt } from "~/lib/helper";
import ReceiptCard from "../_components/ReceiptCard";
import { Button } from "~/components/ui/button";

const Page = async ({ params }: { params: { id: number } }) => {
  const receipt = await getReceipt(params.id);
  if (!receipt) return notFound();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <ReceiptCard receipt={receipt}>
        <Button className="flex w-fit justify-start" asChild>
          <Link href="/receipts/list">Back</Link>
        </Button>
      </ReceiptCard>
    </main>
  );
};

export default Page;
