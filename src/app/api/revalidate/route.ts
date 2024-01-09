import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath(`/(user)/groups/[id]`, "page");

  return new Response();
}
