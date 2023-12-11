import { db } from "~/server/db";
import { receiptItems, receipts } from "~/server/db/schema";
import mockReq from "../../../../req.json"
export async function POST(req: Request) {


    const fields = mockReq.body.responsev2.predictionOutput.result.fields;
    const items = mockReq.body.responsev2.predictionOutput.result.items;
    await db.transaction(async (ctx) => {
     const receiptsReturn =   await db.insert(receipts).values({
            merchantAdress: fields.merchantAddress.value,
            merchantPhone: fields.merchantPhoneNumber.value,
            merchantName: fields.merchantName.value,
            total: parseFloat(fields.total.value.replace(",", ".")),
        })
        const receiptsItemsReq = items.map((item) => {
            return {
                name: item.fields.name.value,
                price: parseFloat(item.fields.totalPrice.value.replace(",",".")),
                receiptId:receiptsReturn[0].insertId
            }
        })
        await db.insert(receiptItems).values(receiptsItemsReq)
    })

    return new Response();

}