import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { db } from "~/server/db";
import { groups } from "~/server/db/schema";
import Image from "next/image";

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

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>{groupUsers?.name}</CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-4">
            {groupUsers?.users.map((user, index) => (
              <div key={index} className="flex items-center">
                <div>
                  {user.user.image ? (
                    <Image
                      className="rounded-full"
                      src={user.user.image}
                      width={64}
                      height={64}
                      alt="User"
                    />
                  ) : (
                    <div className="flex aspect-square w-16 items-center justify-center rounded-full bg-green-950 text-xl text-white">
                      {user.user.email!.at(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="ml-4">{user.user.name}</div>
              </div>
            ))}
            <div>
              <div className="">Invite Friends</div>
              <div>
                {process.env.VERCEL_URL ?? "localhost:3000"}/api/invite/
                {groupUsers?.inviteUuid}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
