"use client";
import React, { useEffect, useState } from "react";
import type { ReceiptWithItemsUser, User } from "~/server/db/schema";

const ExpenseSplitter = ({
  receipts,
  users,
}: {
  receipts: ReceiptWithItemsUser[];
  users: User[];
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const calculateBalances = () => {
    const balances: Record<string, number> = {};
    users.forEach((user) => (balances[user.id] = 0));

    receipts.forEach((receipt) => {
      const userWhoPaid = receipt.paidBy.id;
      console.log(userWhoPaid);

      const items = receipt.receiptItems;

      items.forEach((item) => {
        const itemPrice = item.userId
          ? parseFloat(item.price ?? "0")
          : parseFloat(item.price ?? "0") / users.length;

        if (item.userId) {
          balances[item.userId] += itemPrice;
        } else {
          users.forEach((user) => (balances[user.id] += itemPrice));
        }
      });

      balances[userWhoPaid] -= parseFloat(receipt.total ?? "0");
    });

    return balances;
  };
  useEffect(() => {
    const balances = calculateBalances();

    setTransactions(settleBalances(balances));
  }, [users, receipts]);

  useEffect(() => {
    const balances = calculateBalances();

    setTransactions(settleBalances(balances));
  }, []);

  function settleBalances(balances: Balances): Transaction[] {
    const positiveBalances: Balances = {};
    const negativeBalances: Balances = {};

    // Separate positive and negative balances
    for (const [userId, balance] of Object.entries(balances)) {
      if (balance > 0) {
        positiveBalances[userId] = balance;
      } else if (balance < 0) {
        negativeBalances[userId] = -balance;
      }
    }

    const transactions: Transaction[] = [];

    for (const [creditor, creditAmount] of Object.entries(positiveBalances)) {
      let remainingCredit = creditAmount;

      for (const [debtor, debtAmount] of Object.entries(negativeBalances)) {
        if (remainingCredit > 0 && debtAmount > 0) {
          const settledAmount = Math.min(remainingCredit, debtAmount);

          transactions.push({ debtor, creditor, amount: settledAmount });

          remainingCredit -= settledAmount;
          negativeBalances[debtor] -= settledAmount;
        }
      }
    }

    return transactions;
  }

  return (
    <div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Summary
      </h4>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {transactions.map((transaction, i) => {
          return (
            <li key={i}>
              {users.find((user) => user.id === transaction.debtor)?.name} is
              owed by{" "}
              {users.find((user) => user.id === transaction.creditor)?.name}:{" "}
              {transaction.amount.toFixed(2)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseSplitter;

type Balances = Record<string, number>;

interface Transaction {
  debtor: string;
  creditor: string;
  amount: number;
}
