import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { z } from "zod";
import { getSSEWriter } from "ts-sse";
import type { EventNotifier } from "ts-sse";
import { redisSub } from "~/server/db/redis";
import { syncSchema } from "~/server/schema/syncSchema";

export const dynamic = "force-dynamic";

type SyncEvents = EventNotifier<{
  update: {
    data: z.infer<typeof syncSchema>;
    event: "update";
  };
  complete: {
    data: z.infer<typeof syncSchema>;
    event: "update";
  };
  close: {
    data: never;
  };
  error: {
    data: never;
  };
}>;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  let abort = false;

  request.signal.onabort = async () => {
    console.log("aborted");

    abort = true;
    await writer.close();
  };
  await redisSub.subscribe(`receipt-${params.id}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  const beforeFn = (message: {
    data: {
      sync_status: "error" | "begin_stream" | "sync_update" | "sync_complete";
      sync_message: string;
      sync_date: string;
    };
    event: "update";
  }) => {
    console.log(message.data);

    syncSchema.parse(message.data);
    if (abort) {
      throw new Error("Closed");
    }
  };

  const syncStatusStream = async (notifier: SyncEvents) => {
    if (abort) return;
    // Begin the stream
    notifier.update(
      {
        data: {
          sync_status: "begin_stream",
          sync_date: new Date().toDateString(),
          sync_message: "Upload Successfull, waiting for processing to finish",
        },
        event: "update",
      },
      {
        beforeFn,
      },
    );

    // send update to stream
    redisSub.on("message", (channel, message) => {
      if (abort) return;
      notifier.update(
        {
          data: {
            sync_status: "sync_complete",
            sync_date: new Date().toDateString(),
            sync_message: "Processing finished",
          },
          event: "update",
        },
        {
          beforeFn,
        },
      );
      console.log(`received ${message} from ${channel}`);
      redisSub
        .unsubscribe(`receipt-${params.id}`)
        .catch((err) => console.log(err));
    });
  };

  await syncStatusStream(getSSEWriter(writer, encoder));

  return new NextResponse(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
