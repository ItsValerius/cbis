import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { groups, usersToGroups } from "~/server/db/schema";

export async function POST(
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
  });

  if (!group) {
    return new NextResponse("Group Not Found", {
      status: 404,
    });
  }

  await db.insert(usersToGroups).values({
    groupId: group.id,
    userId: session!.user.id,
  });

  return new NextResponse();
}
