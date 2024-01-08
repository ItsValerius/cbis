import Link from "next/link";
import React from "react";
import { getGroupUsersByGroupId, getReceipt } from "~/lib/helper";
import ReceiptCard from "../../../components/receipts/ReceiptCard";
import { Button } from "~/components/ui/button";
import ReceiptDeleteDialog from "~/components/receipts/ReceiptDeleteDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);
  const receipt = await getReceipt(params.id);
  if (!receipt) return redirect("/dashboard");

  const groupUsers = await getGroupUsersByGroupId(receipt.groupId);

  if (
    !session?.user ||
    !groupUsers ||
    !groupUsers.users.some(({ user }) => user.id === session?.user.id)
  )
    return redirect("/dashboard");

  const users = groupUsers?.users.map((user) => user?.user);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-4">
      <ReceiptCard receipt={receipt} users={users}>
        <div className="flex w-full justify-between">
          <Button className="flex w-fit justify-start" asChild>
            <Link href={`/groups/${receipt.groupId}`}>Back</Link>
          </Button>
          <ReceiptDeleteDialog id={params.id} />
        </div>
      </ReceiptCard>
    </main>
  );
};

export default Page;
