"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteReceiptItemById,
  updateTotalPrice,
  upsertReceiptItems,
} from "~/lib/helper";
import { db } from "~/server/db";
import { receipts, type NewReceiptItem } from "~/server/db/schema";

export const deleteReceipt = async (id: number) => {
  const deletedReceipt = await db
    .delete(receipts)
    .where(eq(receipts.id, id))
    .returning();
  redirect("/groups/" + deletedReceipt.at(0)?.groupId);
};

export const updateReceiptsItems = async (
  tableData: NewReceiptItem[],
  itemsToRemoveIds: number[],
  receiptId: number,
): Promise<void> => {
  for (const id of itemsToRemoveIds) {
    await deleteReceiptItemById(id);
  }
  let totalPrice = 0;
  for (const remainingItem of tableData) {
    await upsertReceiptItems(remainingItem);
    totalPrice += parseFloat(remainingItem.price ?? "0");
  }

  await updateTotalPrice(totalPrice.toPrecision(3), receiptId);

  console.log("Updated tableData:", tableData);
  revalidatePath(`/receipts/${tableData.at(0)?.receiptId}`);
};

export const updateUserThatPaid = async (
  newUserThatPaid: string,
  receiptId: number,
) => {
  const updated = await db
    .update(receipts)
    .set({ userId: newUserThatPaid })
    .where(eq(receipts.id, receiptId))
    .returning();
  revalidatePath(`/receipts/${updated.at(0)?.id}`);
  return updated;
};
