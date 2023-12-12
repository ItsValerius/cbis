import { cache } from "react";
import { db } from "~/server/db";

export const getReceipts = cache(async () => {
  return await db.query.receipts.findMany({ with: { receiptItems: true } });
});
export const getReceipt = cache(async (id: number) => {
  return await db.query.receipts.findFirst({
    where: (receipts, { eq }) => eq(receipts.id, id),
    with: { receiptItems: true },
  });
});
