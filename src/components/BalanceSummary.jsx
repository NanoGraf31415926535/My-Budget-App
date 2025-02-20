// src/components/BalanceSummary.jsx
import React from "react";

function BalanceSummary({ transactions }) {
  const regularIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const regularExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const credits = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const debts = transactions
    .filter((t) => t.type === "debt")
    .reduce((sum, t) => sum + t.amount, 0);

  const payments = transactions
    .filter((t) => t.type === "payment")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalIncome = regularIncome + credits;
  const totalExpense = regularExpense + debts + payments;

  const balance = totalIncome - totalExpense;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Summary</h2>
      <p className="text-green-600 font-bold">Balance: ${balance.toFixed(2)}</p>
      <p className="text-red-500 font-bold">Expenses: ${totalExpense.toFixed(2)}</p>
    </div>
  );
}

export default BalanceSummary;