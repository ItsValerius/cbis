import { revalidatePath } from "next/cache";

export async function GET(req: Request, res: Response) {
  revalidatePath("/receipts/list", "page");
  revalidatePath("/receipts");
  revalidatePath("/");
  return new Response();
}
