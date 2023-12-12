"use server";

import { env } from "~/env";

export async function postReceipt(formData: FormData) {
    await fetch(env.RECEIPT_PROCESSOR_URL, { method: "POST", body: formData })   
}