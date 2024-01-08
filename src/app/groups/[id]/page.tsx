import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-3xl">{groupUsers?.name}</h2>
          <CardDescription>
            {groupUsers && <CopyInviteId inviteId={groupUsers?.inviteUuid} />}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4">
            {groupUsers?.users.map(({ user }) => (
              <div className="flex flex-row items-center" key={user.id}>
                <div className="flex flex-col items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <MemberAvatar {...user} />
                      </TooltipTrigger>
                      <TooltipContent>{user.name}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardContent className="mx-auto w-full md:w-1/2 md:max-w-full">
          <ReceiptForm groupId={groupId} />
        </CardContent>
        <CardContent className="flex w-full flex-col gap-2 pt-4 md:grid md:grid-cols-3 md:gap-4">
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
