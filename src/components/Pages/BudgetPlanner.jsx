// src/components/BudgetPlanner.jsx
import React, { useState } from 'react';
import BudgetForecasting from '../BudgetForecasting';

function BudgetPlanner({ transactions }) {
  const [showForecasting, setShowForecasting] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md"> {/* Added container styling */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Budget Planner</h2> {/* Improved heading styling */}

      <button
        onClick={() => setShowForecasting(!showForecasting)}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300 ease-in-out ${showForecasting ? 'bg-red-500 hover:bg-red-700' : ''}`} // Improved button styling and toggle color
      >
        {showForecasting ? "Hide Forecasting" : "Show Forecasting"}
      </button>

      {showForecasting && (
        <div className="mt-4 border-t border-gray-200 pt-4"> {/* Added a separator */}
          <BudgetForecasting transactions={transactions} />
        </div>
      )}
    </div>
  );
}

export default BudgetPlanner;