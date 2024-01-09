import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "~/server/db";
import { redisPub } from "~/server/db/redis";
import { receiptItems, receipts } from "~/server/db/schema";
import { schema } from "~/server/schema/APIResponseSchema";

export async function POST(req: NextRequest) {
  const parsedRequest = schema.safeParse(await req.json());
  if (!parsedRequest.success) {
    const { errors } = parsedRequest.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: 400 },
    );
  }
  const fields =
    parsedRequest.data.body.responsev2.predictionOutput.result.fields;
  const items =
    parsedRequest.data.body.responsev2.predictionOutput.result.items;
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("id");

  if (!query) return;
  const id = parseInt(query);
  const userId = searchParams.get("userId");
  if (!userId) return;

  const receipt = await db.transaction(async (ctx) => {
    const receiptsReturn = await ctx
      .update(receipts)
      .set({
        merchantAdress: fields.merchantAddress?.value,
        merchantPhone: fields.merchantPhoneNumber?.value,
        merchantName: fields.merchantName?.value,
        updated: true,
        total: fields.total?.value.replace(/[^0-9,.]/g, "").replace(",", "."), //Remove all strings that might be here
        userId: userId,
      })
      .where(eq(receipts.id, id))
      .returning();
    const receiptsItemsReq = items.map((item) => {
      return {
        name: item.fields.name.value,
        price: item.fields.totalPrice.value
          .replace(/[^0-9,.]/g, "")
          .replace(",", "."),
        receiptId: receiptsReturn.at(0)?.id,
      };
    });
    await ctx.insert(receiptItems).values(receiptsItemsReq);
    return receiptsReturn[0];
  });

  if (receipt) {
    const message = { created: true, id: receipt.id };
    const channel = `receipt-${receipt.id}`;
    revalidatePath(`/groups/${receipt.groupId}`);

    await redisPub.publish(channel, JSON.stringify(message));
  }

  return new Response();
}
