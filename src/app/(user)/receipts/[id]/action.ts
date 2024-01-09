"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteReceiptItemById, upsertReceiptItems } from "~/lib/helper";
import { db } from "~/server/db";
import { receipts, type NewReceiptItem } from "~/server/db/schema";

export const deleteReceipt = async (id: number) => {
  await db.delete(receipts).where(eq(receipts.id, id));
  redirect("/receipts/list");
};

export const updateReceiptsItems = async (
  tableData: NewReceiptItem[],
  itemsToRemoveIds: number[],
): Promise<void> => {
  // Iterate through the items to be removed
  for (const id of itemsToRemoveIds) {
    // Find the index of the item in the tableData array

    // If the item is found, remove it from the array and delete it from the database
    await deleteReceiptItemById(id);
  }
  for (const remainingItem of tableData) {
    await upsertReceiptItems(remainingItem);
  }
  // At this point, tableData contains items without the ones that were removed
  console.log("Updated tableData:", tableData);
  revalidatePath(`/receipts/${tableData.at(0)?.receiptId}`);
};
