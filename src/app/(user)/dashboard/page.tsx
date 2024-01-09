import { getServerSession } from "next-auth/next";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardHeader } from "~/components/ui/card";
import { authOptions } from "~/lib/auth";
import Image from "next/image";
import fallbackUserImage from "~/assets/fallback-user-image.webp";
import GroupsOverview from "~/components/groups/dashboard/GroupsOverview";

import { redirect } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import LogoutButton from "~/components/groups/dashboard/LogoutButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return redirect("/login");
  }

  return (
    <>
      <Card>
        <CardHeader className="flex w-full flex-row justify-between">
          <div>
            <Breadcrumb>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink as={Link} href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Hallo{" "}
              <span className="text-bold text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {session?.user.name}
              </span>
            </h1>
          </div>
          <Popover>
            <PopoverTrigger>
              <Avatar className=" h-12 w-12  rounded-full border shadow-xl">
                {session?.user.image ? (
                  <AvatarImage asChild src={session?.user.image}>
                    <Image
                      priority
                      src={session?.user.image}
                      alt="User Profile"
                      width={48}
                      height={48}
                    />
                  </AvatarImage>
                ) : (
                  <AvatarFallback>
                    <Image
                      priority
                      src={fallbackUserImage}
                      alt="Fallback User Image"
                      width={48}
                      height={48}
                    />
                  </AvatarFallback>
                )}
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <LogoutButton />
            </PopoverContent>
          </Popover>
        </CardHeader>
      </Card>

      <GroupsOverview userId={session?.user.id} />
    </>
  );
};

export default DashboardPage;
