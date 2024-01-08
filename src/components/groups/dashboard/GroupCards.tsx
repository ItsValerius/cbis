"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
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
          <h2 className="text-3xl">{group.name}</h2>
        </CardHeader>
        <CardContent>
          <div>Member:</div>
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
