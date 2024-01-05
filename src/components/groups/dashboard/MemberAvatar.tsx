"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
import { User } from "~/server/db/schema";
import Image from "next/image";
import fallbackUserImage from "~/assets/fallback-user-image.webp";
const MemberAvatar = (member: User) => {
  return (
    <Avatar className=" block h-12  w-12 rounded-full border  ">
      {member.image ? (
        <AvatarImage asChild src="/img/profile-image.png" className="h-12 w-12">
          <Image priority src={member.image} alt="User Profile" />
        </AvatarImage>
      ) : (
        <AvatarFallback>
          <Image priority src={fallbackUserImage} alt="Fallback User Image" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default MemberAvatar;
