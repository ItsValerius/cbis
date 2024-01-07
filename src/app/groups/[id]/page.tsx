import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { db } from "~/server/db";
import { groups } from "~/server/db/schema";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import MemberAvatar from "~/components/groups/dashboard/MemberAvatar";
import ReceiptCard from "~/components/receipts/ReceiptCard";
import { getReceiptsByGroup } from "~/lib/helper";
import ReceiptForm from "~/components/receipts/ReceiptForm";
import { ChevronRight } from "lucide-react";
import CopyInviteId from "~/components/groups/CopyInviteId";

export default async function GroupIdPage({
  params,
}: {
  params: { id: number };
}) {
  const groupId = params.id;

  const groupUsers = await db.query.groups.findFirst({
    where: eq(groups.id, groupId),
    with: {
      users: {
        with: {
          user: true,
        },

        columns: {},
      },
    },
  });

  const receipts = await getReceiptsByGroup(groupId);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center ">
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-3xl">{groupUsers?.name}</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-4">
            {groupUsers?.users.map((user) => (
              <div className="flex flex-row items-center" key={user.user.id}>
                <div className="flex flex-col items-center">
                  <div>{user.user.name}</div>
                  {user.user && <MemberAvatar {...user.user} />}
                </div>
              </div>
            ))}
            <div>
              <div className="">Invite Friends</div>
              <div>
                {groupUsers && (
                  <CopyInviteId inviteId={groupUsers?.inviteUuid} />
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent className="mx-auto w-1/2">
          <ReceiptForm groupId={groupId} />
        </CardContent>
        <CardContent className="grid grid-cols-3 gap-4">
          {receipts.map((receipt) => (
            <ReceiptCard receipt={receipt} key={receipt.id}>
              <div className="flex w-full justify-between">
                <Button variant="secondary" asChild>
                  <Link href={`/receipts/${receipt.id}`}>
                    Details <ChevronRight />
                  </Link>
                </Button>
              </div>
            </ReceiptCard>
          ))}
        </CardContent>
        <CardFooter>
          <Button asChild className="flex w-fit justify-start">
            <Link href="/dashboard">Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
