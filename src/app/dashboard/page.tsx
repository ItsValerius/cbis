import { getServerSession } from "next-auth/next";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { authOptions } from "~/lib/auth";
import Image from "next/image";
import fallbackUserImage from "~/assets/fallback-user-image.webp";
import GroupsOverview from "~/components/groups/dashboard/GroupsOverview";

import CreateGroupButton from "~/components/groups/dashboard/CreateGroupButton";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user.id) {
    return redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl">
      <Card>
        <CardHeader className="flex w-full flex-row justify-between">
          <h1 className="text-4xl">
            Hallo{" "}
            <span className="text-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {session?.user.name}
            </span>
          </h1>
          <Avatar className=" h-12 w-12  rounded-full border shadow-xl">
            {session?.user.image ? (
              <AvatarImage asChild src="/img/profile-image.png">
                <Image
                  priority
                  src={session?.user.image}
                  alt="User Profile"
                  fill
                />
              </AvatarImage>
            ) : (
              <AvatarFallback>
                <Image
                  priority
                  src={fallbackUserImage}
                  alt="Fallback User Image"
                  fill
                />
              </AvatarFallback>
            )}
          </Avatar>
        </CardHeader>
        <CardContent>
          <CreateGroupButton />
        </CardContent>
      </Card>

      <GroupsOverview userId={session?.user.id} />
    </main>
  );
};

export default DashboardPage;
