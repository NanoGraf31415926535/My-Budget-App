// src/components/CreditDebtList.jsx
import React from "react";

function CreditDebtList({ creditsDebts, transactions }) {
  const getPaymentsForCreditDebt = (creditDebt) => {
    return transactions
      .filter((t) => t.type === "payment" && t.name === creditDebt.name)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Credit/Debt List</h2>
      <ul>
        {creditsDebts.map((item, index) => {
          const payments = getPaymentsForCreditDebt(item);
          const progress = Math.min((payments / item.amount) * 100, 100);

          if (progress === 100) {
            return null; // Don't render if fully paid
          }

          return (
            <li
              key={index}
              className="flex flex-col border-b py-2"
            >
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.amount.toFixed(2)}</span>
                <span>{item.type}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CreditDebtList;