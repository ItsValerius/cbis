// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";

import {
  pgTableCreator,
  serial,
  varchar,
  decimal,
  integer,
  text,
  timestamp,
  primaryKey,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export type Receipt = typeof receipts.$inferSelect;
export type ReceiptWithItems = typeof receipts.$inferSelect & {
  receiptItems: ReceiptItem[];
};
export type ReceiptWithItemsUsers = typeof receipts.$inferSelect & {
  receiptItems: ReceiptItem[];
  users: User;
};
export type ReceiptItem = typeof receiptItems.$inferSelect;
export type User = typeof users.$inferSelect;

export const receipts = pgTable("receipt", {
  id: serial("id").primaryKey(),
  merchantAdress: varchar("merchantAdress", { length: 256 }),
  merchantName: varchar("merchantName", { length: 256 }),
  merchantPhone: varchar("merchantPhone", { length: 256 }),
  total: decimal("total"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  updated: boolean("updated"),
});

export const receiptRelation = relations(receipts, ({ many, one }) => ({
  receiptItems: many(receiptItems),
  users: one(users, {
    fields: [receipts.userId],
    references: [users.id],
  }),
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
  receipt: one(receipts, {
    fields: [receiptItems.receiptId],
    references: [receipts.id],
  }),
}));

export const groups = pgTable("group", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const insertGroupSchema = createInsertSchema(groups, {
  name: z.string().min(1),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(users),
}));

export const usersToGroups = pgTable("usersToGroups", {
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  groupId: integer("groupId")
    .notNull()
    .references(() => groups.id),
});

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
}));

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  receipts: many(receipts),
  gruops: many(groups),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
