import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { groups, usersToGroups } from "~/server/db/schema";
import { redirect } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  const group = await db.query.groups.findFirst({
    where: eq(groups.inviteUuid, params.id),
    with: {
      users: true,
    },
  });

  if (!group) {
    return new NextResponse("Group Not Found", {
      status: 404,
    });
  }

  const userInGroup = group.users.some(
    (user) => user.userId === session.user.id,
  );

  if (userInGroup) {
    redirect(`/groups/${group.id}`);

    // return new NextResponse("User already in group", {
    //   status: 409,
    // });
  }

  await db.insert(usersToGroups).values({
    groupId: group.id,
    userId: session!.user.id,
  });

  redirect(`/groups/${group.id}`);

  // return new NextResponse();
}
