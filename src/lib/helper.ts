import { cache } from "react";
import { db } from "~/server/db";

export const getReceipts = cache(async () => {
  return await db.query.receipts.findMany({ with: { receiptItems: true } });
});
