import { z } from "zod";

export const syncSchema = z.object({
  sync_status: z.enum([
    "begin_stream",
    "error",
    "sync_update",
    "sync_complete",
  ]),
  sync_message: z.string(),
  sync_date: z.string(),
});
