// src/components/FinancialInsightsChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Legend } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Title, Legend);

function FinancialInsightsChart({ transactions }) {
  // Logic to process transactions and create chart data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: [10000, 12000, 11000, 13000, 14000, 15000, 19573.69, 16000, 17000, 18000, 19000, 20000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Expense",
        data: [8000, 9000, 10000, 11000, 12000, 13000, 14532, 15000, 16000, 17000, 18000, 19000],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  return <Bar data={data} options={options} />;
}

export default FinancialInsightsChart;