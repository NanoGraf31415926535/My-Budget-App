// src/components/BudgetChart.jsx
import React from 'react'; // Import React
import { getMonth, getYear } from "date-fns";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

function BudgetChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    const month = getMonth(transaction.date);
    const year = getYear(transaction.date);
    const monthYear = `${year}-${month + 1}`;

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "income") {
      monthlyData[monthYear].income += transaction.amount;
    } else if (transaction.type === "expense") {
      monthlyData[monthYear].expense += transaction.amount;
    }
  });

  // Calculate total income and expense
  let totalIncome = 0;
  let totalExpense = 0;

  Object.values(monthlyData).forEach((data) => {
    totalIncome += data.income;
    totalExpense += data.expense;
  });

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Budget Overview",
        data: [totalIncome, totalExpense],
        backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />; // Return the Pie chart
}

export default BudgetChart;