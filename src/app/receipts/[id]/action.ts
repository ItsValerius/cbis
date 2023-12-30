"use server";

import { RowModel } from "@tanstack/react-table";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { ReceiptItem, receiptItems, receipts } from "~/server/db/schema";

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

export const deleteReceipt = async (id: number) => {
  await db.delete(receipts).where(eq(receipts.id, id));
  redirect("/receipts/list");
};
