// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  decimal,
  double,
  float,
  index,
  int,
  mysqlSchema,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `test_${name}`);





export const receipts = mysqlTable("receipt",{
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  merchantAdress: varchar("merchantAdress",{ length: 256 }),
  merchantName: varchar("merchantName",{ length: 256 }),
  merchantPhone: varchar("merchantPhone",{ length: 256 }),
  total: double("total"),
})

export const receiptRelation = relations(receipts, ({ many }) => ({
  receiptItems: many(receiptItems),
}));

export const receiptItems = mysqlTable("receiptItem",{
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  price: double("price"),
  name: varchar("name",{ length: 256 }),
  amount: int("amount"),
  receiptId: bigint("receipt_id",{mode:"number"})
})

export const receiptItemsRelation = relations(receiptItems, ({ one }) => ({
  author: one(receipts, {
    fields: [receiptItems.receiptId],
    references: [receipts.id],
  }),
}));