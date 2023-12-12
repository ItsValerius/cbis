// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  mysqlSchema,
  mysqlTableCreator,
  timestamp,
} from "drizzle-orm/mysql-core";
import {
  pgTableCreator,
  serial,
  varchar,
  decimal,
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `test_${name}`);

export const receipts = pgTable("receipt", {
  id: serial("id").primaryKey(),
  merchantAdress: varchar("merchantAdress", { length: 256 }),
  merchantName: varchar("merchantName", { length: 256 }),
  merchantPhone: varchar("merchantPhone", { length: 256 }),
  total: decimal("total"),
});

export const receiptRelation = relations(receipts, ({ many }) => ({
  receiptItems: many(receiptItems),
}));

export const receiptItems = pgTable("receiptItem", {
  id: serial("id").primaryKey(),
  price: decimal("price"),
  name: varchar("name", { length: 256 }),
  amount: integer("amount"),
  receiptId: integer("receipt_id"),
});

export const receiptItemsRelation = relations(receiptItems, ({ one }) => ({
  author: one(receipts, {
    fields: [receiptItems.receiptId],
    references: [receipts.id],
  }),
}));
