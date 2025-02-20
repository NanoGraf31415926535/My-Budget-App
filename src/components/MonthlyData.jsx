// src/components/MonthlyData.jsx
import React from "react";
import { format, getMonth, getYear } from "date-fns";

function MonthlyData({ transactions }) {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    const month = getMonth(transaction.date);
    const year = getYear(transaction.date);
    const monthYear = `${year}-${month + 1}`;

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        income: 0,
        expense: 0,
        credit: 0,
        debt: 0,
        payment: 0,
      };
    }

    if (transaction.type === "income") {
      monthlyData[monthYear].income += transaction.amount;
    } else if (transaction.type === "expense") {
      monthlyData[monthYear].expense += transaction.amount;
    } else if (transaction.type === "credit") {
      monthlyData[monthYear].credit += transaction.amount;
    } else if (transaction.type === "debt") {
      monthlyData[monthYear].debt += transaction.amount;
    } else if (transaction.type === "payment") {
      monthlyData[monthYear].payment += Math.abs(transaction.amount);
    }
  });

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Data</h2>
      {Object.entries(monthlyData).map(([monthYear, data]) => (
        <div key={monthYear} className="border-b py-2">
          <h3>{format(new Date(monthYear), "MMMM yyyy")}</h3>
          <p>Income: ${data.income.toFixed(2)}</p>
          <p>Expense: ${data.expense.toFixed(2)}</p>
          <p>Credit: ${data.credit.toFixed(2)}</p>
          <p>Debt: ${data.debt.toFixed(2)}</p>
          <p>Payment: ${data.payment.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default MonthlyData;