"use client";
import { useCallback, useEffect } from "react";
import { useToast } from "~/components/ui/use-toast";
import { useID } from "../providers/EventSourceProvider";
import { syncSchema } from "~/server/schema/syncSchema";
import { ToastAction } from "~/components/ui/toast";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const ReceiptToast = () => {
  const { toast } = useToast();
  const router = useRouter();
  const stringSchema = z.string();
  const { eventSource } = useID();
  const updateToastText = useCallback((event: MessageEvent) => {
    const parsedEventData = stringSchema.safeParse(event.data);
    if (!parsedEventData.success) return;
    const parsed = syncSchema.safeParse(JSON.parse(parsedEventData.data));
    if (parsed.success) {
      if (parsed.data.sync_status === "begin_stream") {
        toast({
          title: parsed.data.sync_message,
          description: parsed.data.sync_date,
        });
      }
      console.log(parsed.data.sync_status);

      if (parsed.data.sync_status === "sync_complete") {
        toast({
          title: parsed.data.sync_message,
          description: parsed.data.sync_date,
          action: (
            <ToastAction altText="Refresh" onClick={() => router.refresh()}>
              Refresh to see the changes
            </ToastAction>
          ),
        });
        console.log("sync_complete");

        eventSource?.close();
      }
    }
  }, []);

  useEffect(() => {
    if (eventSource) {
      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
      };
      eventSource.addEventListener("update", updateToastText);

      return () => {
        eventSource.removeEventListener("update", updateToastText);
      };
    }
  }, [eventSource]);
  return <></>;
};

export default ReceiptToast;
