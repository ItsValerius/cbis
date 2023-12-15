import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { receiptItems, receipts } from "~/server/db/schema";
import { schema } from "~/server/schema/APIResponseSchema";
export async function POST(req: Request, res: Response) {
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

  await db.transaction(async (ctx) => {
    const receiptsReturn = await ctx
      .insert(receipts)
      .values({
        merchantAdress: fields.merchantAddress?.value,
        merchantPhone: fields.merchantPhoneNumber?.value,
        merchantName: fields.merchantName?.value,
        total: fields.total?.value.replace(/[^0-9,.]/g, "").replace(",", "."), //Remove all strings that might be here
      })
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
  });
  revalidatePath("/");

  return new Response();
}
