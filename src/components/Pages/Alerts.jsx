// src/components/Alerts.jsx
import React, { useState, useEffect } from 'react';

function Alerts({ transactions }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const generateAlerts = () => {
      const newAlerts = [];

      // Example 1: Spending by Category Alert
      const spendingByCategory = {};
      transactions.forEach(transaction => {
        if (transaction.type === 'expense') {
          const category = transaction.category || 'Other';
          spendingByCategory[category] = (spendingByCategory[category] || 0) + Math.abs(transaction.amount);
        }
      });

      for (const category in spendingByCategory) {
        if (spendingByCategory[category] > 500) { // Example threshold: $500
          newAlerts.push({
            type: 'spending',
            message: `Spending in ${category} exceeded $500!`,
          });
        }
      }

      // Example 2: Low Balance Alert
      const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      if (totalBalance < 1000) { // Example threshold: $1000
        newAlerts.push({
          type: 'balance',
          message: 'Your total balance is below $1000!',
        });
      }

      setAlerts(newAlerts);
    };

    generateAlerts();
  }, [transactions]);

  return (
    <div className="p-4 bg-white rounded-lg shadow"> {/* Added card styling */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Alerts</h2> {/* Improved heading style */}

      {alerts.length === 0 ? (
        <p className="text-gray-600">No alerts at this time.</p> 
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, index) => (
            <li key={index} className={`p-4 rounded-md shadow ${alert.type === 'spending' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'} border`}> {/* Improved alert styling */}
              <div className="flex items-center"> {/* Added flexbox for icon and message */}
                {alert.type === 'spending' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2m0-5.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4.22a7.5 7.5 0 110-14.44A7.5 7.5 0 015.062 19.22z" />
                  </svg>
                )}
                <span>{alert.message}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Alerts;