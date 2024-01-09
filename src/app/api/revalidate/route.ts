import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath(`/groups/[id]/page`, "page");
  revalidatePath(`/groups/[id]`);
  revalidatePath(`/groups`);
  revalidatePath("/");
  return new Response();
}
