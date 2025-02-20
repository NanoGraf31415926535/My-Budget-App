// src/components/TransactionList.jsx
import React from "react";

function TransactionList({ transactions }) {
  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="flex justify-between border-b py-2">
            <span>{transaction.name || transaction.reason}</span> {/* Use name or reason */}
            <span>{transaction.amount.toFixed(2)}</span>
            <span>{transaction.type}</span>
            <span>{transaction.account}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;