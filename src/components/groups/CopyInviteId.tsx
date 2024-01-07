"use client";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "../ui/use-toast";

const CopyInviteId = (props: { inviteId: string }) => {
  const { toast } = useToast();
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CopyToClipboard
              onCopy={() => {
                toast({
                  title: "Copied Invite Link to Clipboard",
                });
              }}
              text={
                (process.env.NEXT_PUBLIC_VERCEL_URL
                  ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
                  : "http://localhost:3000") + `/api/invite/${props.inviteId}`
              }
            >
              <p>Invite your Friends</p>
            </CopyToClipboard>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy Invite Link To Clipboard</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default CopyInviteId;
