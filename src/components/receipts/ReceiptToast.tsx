"use client";
import { useCallback, useContext, useEffect } from "react";
import { useToast } from "~/components/ui/use-toast";
import {
  EventSourceContext,
  EventSourceProvider,
} from "../providers/EventSourceProvider";
import { syncSchema } from "~/server/schema/syncSchema";
import { ToastAction } from "~/components/ui/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const ReceiptToast = () => {
  const { toast } = useToast();
  const router = useRouter();
  const stringSchema = z.string();
  const eventSource = useContext(EventSourceContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");
  const updateToastText = useCallback(
    (event: MessageEvent) => {
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

        if (parsed.data.sync_status === "sync_complete" && id) {
          toast({
            title: parsed.data.sync_message,
            description: parsed.data.sync_date,
            action: (
              <ToastAction
                altText="Refresh"
                onClick={() => {
                  router.push(pathname);
                  return router.refresh();
                }}
              >
                Refresh to see the changes
              </ToastAction>
            ),
          });

          eventSource?.close();
        }
      }
    },
    [id],
  );

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

const ReceiptToastWrapped = () => (
  <EventSourceProvider>
    <ReceiptToast />
  </EventSourceProvider>
);

export { ReceiptToastWrapped };

// export default ReceiptToast;
