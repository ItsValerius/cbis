"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
import type { User } from "~/server/db/schema";
import Image from "next/image";
import fallbackUserImage from "~/assets/fallback-user-image.webp";
const MemberAvatar = (member: User) => {
  return (
    <Avatar className=" block h-12  w-12 rounded-full border  ">
      {member.image ? (
        <AvatarImage
          asChild
          src={member.image}
          className="h-12 w-12 rounded-full"
        >
          <Image
            priority
            src={member.image}
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
  );
};

export default MemberAvatar;
