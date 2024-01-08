"use server";
import { cache } from "react";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import {
  type NewReceiptItem,
  receiptItems,
  receipts,
} from "~/server/db/schema";
export const getReceipts = cache(async () => {
  return await db.query.receipts.findMany({
    with: { receiptItems: true, paidBy: true },
    orderBy: (receipts, { asc }) => [asc(receipts.id)],
  });
});
export const getReceipt = cache(async (id: number) => {
  return await db.query.receipts.findFirst({
    where: (receipts, { eq }) => eq(receipts.id, id),
    with: { receiptItems: true, paidBy: true },
  });
});

export const getGroups = cache(async (userId: string) => {
  return await db.query.usersToGroups.findMany({
    with: {
      group: true,
    },
    columns: {},
    where: (usersToGroups, { eq }) => eq(usersToGroups.userId, userId),
  });
});

export const getGroupUsers = cache(async (groupId: number) => {
  return await db.query.usersToGroups.findMany({
    with: { user: true },
    where: (usersToGroups) => eq(usersToGroups.groupId, groupId),
  });
});

export const getGroupsAndMembers = async (userId: string) => {
  // Get groups for the user
  const userGroups = await getGroups(userId);

  // Fetch members for each group
  const groupsWithMembers = await Promise.all(
    userGroups.map(async (userGroup) => {
      const groupId = userGroup.group.id;

      // Get members for the group
      const groupMembers = await getGroupUsers(groupId);

      // Combine group data with members
      return {
        group: userGroup.group,
        members: groupMembers.map((userToGroup) => userToGroup.user),
      };
    }),
  );

  return groupsWithMembers;
};

export const getReceiptsByGroup = cache(async (groupId: number) => {
  return await db.query.receipts.findMany({
    orderBy: (receipts, { desc }) => [desc(receipts.id)],
    where: (receipts) => eq(receipts.groupId, groupId),
    with: { receiptItems: true, paidBy: true },
  });
});

export const deleteReceiptItemById = async (id: number) => {
  return await db.delete(receiptItems).where(eq(receiptItems.id, id));
};

export const upsertReceiptItems = async (item: NewReceiptItem) => {
  return await db
    .insert(receiptItems)
    .values(item)
    .onConflictDoUpdate({ target: receiptItems.id, set: item })
    .returning();
};

export const updateTotalPrice = async (newPrice: string, receiptId: number) => {
  return await db
    .update(receipts)
    .set({ total: newPrice })
    .where(eq(receipts.id, receiptId));
};
