import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath(`/(user)/groups/[id]`);

  return new Response();
}
