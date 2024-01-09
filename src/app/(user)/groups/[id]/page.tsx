import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import MemberAvatar from "~/components/groups/dashboard/MemberAvatar";
import ReceiptCard from "~/components/receipts/ReceiptCard";
import { getGroupUsersByGroupId, getReceiptsByGroup } from "~/lib/helper";
import ReceiptForm from "~/components/receipts/ReceiptForm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CopyInviteId from "~/components/groups/CopyInviteId";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";
import ReceiptCardEmpty from "~/components/receipts/ReceiptCardEmpty";

export default async function GroupIdPage({
  params,
}: {
  params: { id: number };
}) {
  const groupId = params.id;
  const session = await getServerSession(authOptions);

  const groupUsers = await getGroupUsersByGroupId(groupId);
  if (
    !session?.user ||
    !groupUsers ||
    !groupUsers.users.some(({ user }) => user.id === session?.user.id)
  )
    return redirect("/dashboard");

  const users = groupUsers?.users.map((user) => user?.user);
  const receipts = await getReceiptsByGroup(groupId);

  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full">
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`/groups/${groupId}`}>Group</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
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

        <CardFooter>
          <Button
            className="flex w-fit justify-start"
            asChild
            variant="secondary"
          >
            <Link href="/dashboard">
              <ChevronLeft />
              Back
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="flex w-full flex-col gap-2  md:grid md:grid-cols-3 md:gap-4">
        <ReceiptCardEmpty groupdId={groupId} />
        {receipts.map((receipt) => (
          <ReceiptCard receipt={receipt} users={users} key={receipt.id}>
            <div className="flex w-full justify-between">
              <Button variant="secondary" asChild>
                <Link href={`/receipts/${receipt.id}`}>
                  Details <ChevronRight />
                </Link>
              </Button>
            </div>
          </ReceiptCard>
        ))}
      </div>
    </div>
  );
}
