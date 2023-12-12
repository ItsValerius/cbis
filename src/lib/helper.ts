"use server";
import { cache } from "react";
import { db } from "~/server/db";

export const getReceipts = cache(async () => {
  console.log("getting receipts");

  return await db.query.receipts.findMany({ with: { receiptItems: true } });
});
export const getReceipt = cache(async (id: number) => {
  console.log("getting receipt " + id);

  return await db.query.receipts.findFirst({
    where: (receipts, { eq }) => eq(receipts.id, id),
    orderBy: (receipts, { asc }) => [asc(receipts.id)],
    with: { receiptItems: true },
  });
});
