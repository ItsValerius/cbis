"use client";
import React, { useEffect, useState } from "react";
import type { ReceiptWithItemsUser, User } from "~/server/db/schema";

const ExpenseSplitter = ({
  receipt,
  users,
}: {
  receipt: ReceiptWithItemsUser;
  users: User[];
}) => {
  const [userBalances, setUserBalances] = useState<Record<string, number>>({});
  const userWhoPaid = receipt.userId;
  const items = receipt.receiptItems;

  useEffect(() => {
    const calculateBalances = () => {
      const balances: Record<string, number> = {};

      // Initialize balances with 0 for all users
      users.forEach((user) => {
        balances[user.id] = 0;
      });

      // Add the total amount paid by the user who paid
      balances[userWhoPaid] += parseFloat(receipt.total ?? "0");

      // Calculate individual item balances
      items.forEach((item) => {
        const itemPrice = item.userId
          ? parseFloat(item.price ?? "0")
          : parseFloat(item.price ?? "0") / users.length;

        if (item.userId) {
          balances[item.userId] += itemPrice;
        } else {
          // Distribute equally among all users if userId is empty
          users.forEach((user) => {
            balances[user.id] += itemPrice;
          });
        }
      });

      // Subtract the total amount paid by the user who paid
      balances[userWhoPaid] -= parseFloat(receipt.total ?? "0");

      setUserBalances(balances);
    };

    calculateBalances();
  }, [users, receipt, receipt.userId]);

  return (
    <div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Summary
      </h4>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {users.map((user) => {
          if (user.id === receipt.userId) return;
          return (
            <li key={user.id}>
              {user.name ?? "Unknown User"} owes{" "}
              {userBalances[user.id]?.toFixed(2)} to{" "}
              {receipt.paidBy.name ?? "Unknown User"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseSplitter;
