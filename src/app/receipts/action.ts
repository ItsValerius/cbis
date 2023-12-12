"use server";

import { env } from "~/env";

export async function postReceipt(formData: FormData) {
  const receipt = formData.get("receipt") as File;
  if (receipt.size === 0) return;

  await fetch(env.RECEIPT_PROCESSOR_URL, { method: "POST", body: formData });
}
