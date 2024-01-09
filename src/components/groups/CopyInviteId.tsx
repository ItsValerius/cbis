"use client";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "../ui/use-toast";
import { Copy } from "lucide-react";

const CopyInviteId = (props: { inviteId: string }) => {
  const { toast } = useToast();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CopyToClipboard
            onCopy={() => {
              toast({
                title: "Copied Invite Link to Clipboard",
              });
            }}
            text={`https://cbis.vercel.app/api/invite/${props.inviteId}`}
          >
            <div className="flex items-center justify-center gap-1">
              <p>Invite your Friends</p>
              <Copy size={16} />
            </div>
          </CopyToClipboard>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy Invite Link To Clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyInviteId;
