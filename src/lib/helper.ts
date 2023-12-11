import { db } from "~/server/db"
import { receiptItems } from "~/server/db/schema"

export const getReceipts = async () => {
    return await db.query.receipts.findMany({ with: { receiptItems: true } })
}