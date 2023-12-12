"use server";

import { redirect } from "next/navigation";
import { env } from "~/env";

export async function postReceipt(formData: FormData) {
  const receipt = formData.get("receipt") as File;
  if (receipt.size === 0) return;
  console.log(formData);
  const newFormData = new FormData();
  newFormData.append("receipt", receipt);

  await fetch(env.RECEIPT_PROCESSOR_URL, { method: "POST", body: newFormData });
  return redirect("/receipts/list");
}
