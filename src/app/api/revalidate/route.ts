import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/receipts/list", "page");
  revalidatePath("/receipts");
  revalidatePath("/");
  return new Response();
}
