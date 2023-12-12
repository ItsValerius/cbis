import { revalidatePath } from "next/cache";

export async function POST(req: Request, res: Response) {
  revalidatePath("/receipts/list", "page");
  revalidatePath("/receipts");
  revalidatePath("/");
}
