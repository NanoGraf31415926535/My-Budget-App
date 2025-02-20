import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function BudgetForecasting({ transactions }) {
  const [forecastPeriod, setForecastPeriod] = useState(7);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const calculateMovingAverage = (data, period) => {
      const averages = [];
      if (data && data.length >= period) { // Check data length
        for (let i = period - 1; i < data.length; i++) {
          let sum = 0;
          for (let j = i - period + 1; j <= i; j++) {
            sum += data[j];
          }
          averages.push(sum / period);
        }
      }
      return averages;
    };

    if (transactions && transactions.length > 0) {
      const dataByDate = {};

      transactions.forEach(transaction => {
          if (transaction && transaction.date && transaction.amount) { // Check for valid transaction
              const date = transaction.date;
              if (!dataByDate[date]) {
                  dataByDate[date] = 0;
              }
              dataByDate[date] += transaction.amount;
          }
      });

      const dates = Object.keys(dataByDate).sort();
      const actualSpending = dates.map(date => dataByDate[date]);
      const forecastedSpending = calculateMovingAverage(actualSpending, forecastPeriod);


      const chartLabels = dates.slice(forecastPeriod - 1).map(dateStr => {
        try {
          const date = new Date(dateStr);
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        } catch (error) {
          console.error("Error parsing date:", dateStr, error);
          return dateStr; // Return original string if parsing fails
        }
      });

      setForecastData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Actual Spending',
            data: actualSpending.slice(forecastPeriod - 1),
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Forecasted Spending',
            data: forecastedSpending,
            borderColor: 'red',
            fill: false,
          },
        ],
      });
    } else {
      // Handle the case where transactions are empty or null
      setForecastData(null); // Or set a default chart data object
    }
  }, [transactions, forecastPeriod]);

  const handleForecastPeriodChange = (event) => {
    setForecastPeriod(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Budget Forecasting</h3>

      <div className="mb-4">
        <label htmlFor="forecastPeriod" className="mr-2">
          Forecast Period:
        </label>
        <select
          id="forecastPeriod"
          value={forecastPeriod}
          onChange={handleForecastPeriodChange}
          className="border rounded px-2 py-1"
        >
          <option value={7}>7 Days</option>
          <option value={14}>14 Days</option>
          <option value={30}>30 Days</option>
        </select>
      </div>

      {forecastData && (
        <Line data={forecastData} />
      )}
      {!forecastData && ( // Display a message if no data is available
        <p>No forecasting data available.</p>
      )}
    </div>
  );
}

export default BudgetForecasting;