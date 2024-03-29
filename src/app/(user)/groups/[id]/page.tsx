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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";
import ReceiptCardEmpty from "~/components/receipts/ReceiptCardEmpty";
import GroupExpenses from "~/components/groups/GroupExpenses";

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
              <BreadcrumbLink as={Link} href="/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} href={`/groups/${groupId}`}>
                Group
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {groupUsers?.name}
          </h2>
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
        <CardContent>
          <GroupExpenses receipts={receipts} users={users} />
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
