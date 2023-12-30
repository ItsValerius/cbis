"use server";

import { RowModel } from "@tanstack/react-table";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { ReceiptItem, receiptItems } from "~/server/db/schema";

export const updateReceiptsItems = async (
  items: ReceiptItem[],
  deletedItemIds: number[],
) => {
  try {
    items.forEach(async (item) => {
      if (deletedItemIds.includes(item.id)) {
        await db.delete(receiptItems).where(eq(receiptItems.id, item.id));
      }
      await db
        .update(receiptItems)
        .set(item)
        .where(eq(receiptItems.id, item.id));
    });
  } catch (err) {
    console.log(err);
  }
};
