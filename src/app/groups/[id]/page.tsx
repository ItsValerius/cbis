import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { db } from "~/server/db";
import { groups } from "~/server/db/schema";

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
                    <img
                      className="h-16 w-16 rounded-full"
                      src={user.user.image}
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
                {process.env.FRONTEND_URL}/api/invite/{groupUsers?.inviteUuid}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
