"use server";

import { revalidatePath } from "next/cache";
import { env } from "~/env";
import { db } from "~/server/db";
import { receipts } from "~/server/db/schema";

export async function postReceipt(formData: FormData) {
  const receiptImage = formData.get("receipt") as File;
  if (receiptImage.size === 0) return;
  console.log(formData);
  const returningReceipt = await db
    .insert(receipts)
    .values({ updated: false })
    .returning({ id: receipts.id });

  console.log(returningReceipt);
  if (!returningReceipt[0]) return;

  const newFormData = new FormData();
  newFormData.append("receipt", receiptImage);
  newFormData.append("id", String(returningReceipt[0].id));

  await fetch(env.RECEIPT_PROCESSOR_URL, { method: "POST", body: newFormData });
  revalidatePath("/receipts/list");
  return returningReceipt[0];
}
