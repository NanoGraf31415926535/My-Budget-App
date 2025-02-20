// src/components/Reports.jsx
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function Reports({ transactions }) {
  const calculateSpendingByCategory = () => {
    const spendingByCategory = {};
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        const category = transaction.category || 'Other';
        spendingByCategory[category] = (spendingByCategory[category] || 0) + Math.abs(transaction.amount);
      }
    });
    return spendingByCategory;
  };

  const spendingByCategory = calculateSpendingByCategory();

  const pieChartData = {
    labels: Object.keys(spendingByCategory),
    datasets: [
      {
        data: Object.values(spendingByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 255, 0, 0.8)', // Yellow
          'rgba(0, 255, 0, 0.8)',   // Green
          'rgba(0, 0, 255, 0.8)',   // Blue
          'rgba(255, 0, 0, 0.8)',   // Red
        ],
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Spending by Category',
        font: {
          size: 18,
        },
      },
    },
  };

  const calculateMonthlyTotals = () => {
    const monthlyTotals = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        monthlyTotals[monthYear].income += parseFloat(transaction.amount) || 0;
      } else if (transaction.type === 'expense') {
        monthlyTotals[monthYear].expense += Math.abs(parseFloat(transaction.amount)) || 0;
      }
    });
    return monthlyTotals;
  };

  const monthlyTotals = calculateMonthlyTotals();

  const barChartData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyTotals).map(data => data.income),
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
      {
        label: 'Expense',
        data: Object.values(monthlyTotals).map(data => data.expense),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income vs. Expenses',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Reports</h2> {/* Increased main heading size */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap between charts */}
        <div className="bg-white p-6 rounded-lg shadow-md"> {/* Increased padding around charts */}
          <Pie data={pieChartData} options={pieChartOptions} height={400} /> {/* Set a fixed height for the chart */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md"> {/* Increased padding around charts */}
          <Bar data={barChartData} options={barChartOptions} height={400} /> {/* Set a fixed height for the chart */}
        </div>
      </div>
    </div>
  );
}

export default Reports;