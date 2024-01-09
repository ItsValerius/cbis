import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath(`/(user)/groups/[id]/page`, "page");
  revalidatePath(`/(user)/groups/[id]`);
  revalidatePath(`/(user)/groups`);
  revalidatePath("/");
  return new Response();
}
