// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";

import {
  pgTableCreator,
  serial,
  varchar,
  decimal,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `cbis_${name}`);
export type Receipt = typeof receipts.$inferSelect;
export type ReceiptWithItems = typeof receipts.$inferSelect & {
  receiptItems: ReceiptItem[];
};
export type ReceiptItem = typeof receiptItems.$inferSelect;
export type NewReceiptItem = typeof receiptItems.$inferInsert;
export const receipts = pgTable("receipt", {
  id: serial("id").primaryKey(),
  merchantAdress: varchar("merchantAdress", { length: 256 }),
  merchantName: varchar("merchantName", { length: 256 }),
  merchantPhone: varchar("merchantPhone", { length: 256 }),
  total: decimal("total"),
  updated: boolean("updated"),
});

export const receiptRelation = relations(receipts, ({ many }) => ({
  receiptItems: many(receiptItems),
}));

export const receiptItems = pgTable("receiptItem", {
  id: serial("id").primaryKey(),
  price: decimal("price"),
  name: varchar("name", { length: 256 }),
  amount: integer("amount"),
  receiptId: integer("receipt_id").references(() => receipts.id, {
    onDelete: "cascade",
  }),
});

export const receiptItemsRelation = relations(receiptItems, ({ one }) => ({
  author: one(receipts, {
    fields: [receiptItems.receiptId],
    references: [receipts.id],
  }),
}));
