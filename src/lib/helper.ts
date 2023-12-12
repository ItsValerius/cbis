import { db } from "~/server/db";

export const getReceipts = async () => {
  return await db.query.receipts.findMany({ with: { receiptItems: true } });
};
