"use server";

import { redirect } from "next/navigation";
import { env } from "~/env";
import { auth } from "~/lib/auth";

export async function postReceipt(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) return;

  const receipt = formData.get("receipt") as File;
  if (receipt.size === 0) return;
  const newFormData = new FormData();
  newFormData.append("receipt", receipt);
  newFormData.append("userId", session.user.id);

  await fetch(env.RECEIPT_PROCESSOR_URL, { method: "POST", body: newFormData });
  return redirect("/receipts/list");
}
