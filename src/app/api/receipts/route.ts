import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { receiptItems, receipts } from "~/server/db/schema";
import { schema } from "~/server/schema/APIResponseSchema";
export async function POST(req: Request) {
  const reqJson = await req.json();
  const parsedRequest = schema.safeParse(reqJson);
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
    const receiptsReturn = await db
      .insert(receipts)
      .values({
        merchantAdress: fields.merchantAddress.value,
        merchantPhone: fields.merchantPhoneNumber.value,
        merchantName: fields.merchantName.value,
        total: fields.total.value.replace(",", "."),
      })
      .returning();
    const receiptsItemsReq = items.map((item) => {
      return {
        name: item.fields.name.value,
        price: item.fields.totalPrice.value.replace(",", "."),
        receiptId: receiptsReturn.at(0)?.id,
      };
    });
    await db.insert(receiptItems).values(receiptsItemsReq);
  });

  return new Response();
}
