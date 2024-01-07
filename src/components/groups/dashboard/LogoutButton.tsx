"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";

const LogoutButton = () => {
  return (
    <Button variant="ghost" onClick={() => signOut()} className="flex gap-2">
      <span className="">Sign out</span>
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
