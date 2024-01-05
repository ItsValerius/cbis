"use server";

import { revalidatePath } from "next/cache";
import { env } from "~/env";
import { db } from "~/server/db";
import { receipts } from "~/server/db/schema";
import { auth } from "~/lib/auth";

export async function postReceipt(formData: FormData) {
  const session = await auth();

  const groupId = formData.get("groupId") as String;
  if (!groupId) return;

  if (!session?.user.id) return;

  const receiptImage = formData.get("receipt") as File;
  if (receiptImage.size === 0) return;
  const returningReceipt = await db
    .insert(receipts)
    .values({
      updated: false,
      userId: session.user.id,
      groupId: Number(groupId),
    })
    .returning({ id: receipts.id });

  console.log(returningReceipt);
  if (!returningReceipt[0]) return;

  const newFormData = new FormData();
  newFormData.append("receipt", receiptImage);
  newFormData.append("id", String(returningReceipt[0].id));
  newFormData.append("userId", session.user.id);

  await fetch(env.RECEIPT_PROCESSOR_URL, { method: "POST", body: newFormData });
  revalidatePath("/receipts/list");
  return returningReceipt[0];
}
