"use client";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "../ui/use-toast";

const CopyInviteId = (props: { inviteId: string }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" className="hover:cursor-pointer">
              <CopyToClipboard
                onCopy={() => {
                  setCopied(true);
                  toast({
                    title: "Copied Invite Link to Clipboard",
                  });
                }}
                text={
                  process.env.VERCEL_URL ??
                  "localhost:3000" + `/api/invite/${props.inviteId}`
                }
              >
                {copied ? <Check /> : <Copy />}
              </CopyToClipboard>
            </Button>
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
