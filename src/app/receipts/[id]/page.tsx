import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { getReceipt } from "~/lib/helper";
import ReceiptCard from "../ReceiptCard";

const Page = async ({ params }: { params: { id: number } }) => {
  const receipt = await getReceipt(params.id);
  if (!receipt) return notFound();
  return (
    <main className="  flex min-h-screen  flex-col items-center justify-center bg-slate-900 p-4 text-slate-100 ">
      <ReceiptCard receipt={receipt}>
        <Link
          className="w-fit rounded border p-2 transition-colors duration-500 hover:bg-slate-100 hover:text-slate-900"
          href="/receipts/list"
        >
          Back
        </Link>
      </ReceiptCard>
    </main>
  );
};

export default Page;
