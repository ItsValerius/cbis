"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import type { getGroupUsersByUserId } from "~/lib/helper";
import MemberAvatar from "./MemberAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const GroupCards = ({
  groups,
}: {
  groups: Awaited<ReturnType<typeof getGroupUsersByUserId>>;
}) => {
  return groups?.groups.map(async ({ group }) => {
    return (
      <Card key={group.name}>
        <CardHeader>
          <CardTitle>{group.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row flex-wrap gap-2">
            <TooltipProvider>
              {group.users.map(({ user }) => (
                <Tooltip key={user.id}>
                  <TooltipTrigger>
                    <MemberAvatar {...user} />
                    <TooltipContent>{user.name}</TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/groups/${group.id}`}>Details</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  });
};
