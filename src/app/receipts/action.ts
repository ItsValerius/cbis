"use server";

import { redirect } from "next/navigation";
import { env } from "~/env";

export async function postReceipt(formData: FormData) {
  const receipt = formData.get("receipt") as File;
  if (receipt.size === 0) return;
  console.log(formData);

  await fetch(env.RECEIPT_PROCESSOR_URL, { method: "POST", body: formData });
  return redirect("/receipts/list");
}
