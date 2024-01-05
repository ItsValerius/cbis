"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import {
  receiptItems,
  receipts,
  type NewReceiptItem,
} from "~/server/db/schema";

export const updateReceiptsItems = async (
  items: NewReceiptItem[],
  deletedItemIds: number[],
) => {
  console.log(items);
  console.log(deletedItemIds);

  items.map(async (item) => {
    if (item.id && deletedItemIds.includes(item.id)) {
      console.log(item.id);

      const deleted = await db
        .delete(receiptItems)
        .where(eq(receiptItems.id, item.id))
        .returning();
      console.log(deleted);

      return;
    }
    await db
      .insert(receiptItems)
      .values(item)
      .onConflictDoUpdate({ target: receiptItems.id, set: item })
      .returning();
  });
  revalidatePath(`/receipts/${items.at(0)?.id}`);
};

export const deleteReceipt = async (id: number) => {
  await db.delete(receipts).where(eq(receipts.id, id));
  redirect("/receipts/list");
};
