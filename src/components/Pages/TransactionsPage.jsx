import React from "react";
import TransactionList from "../TransactionList";
import CreditDebtList from "../CreditDebtList";
import MonthlyData from "../MonthlyData";

function TransactionsPage({ transactions, creditsDebts }) {
  return (
    <div className="container mx-auto p-4"> {/* Added container for centering and padding */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transactions</h2> {/* Main heading */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid layout for responsiveness */}
        <div className="bg-white p-4 rounded-lg shadow-md"> {/* Card styling */}
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Recent Transactions</h3> {/* Improved heading */}
          <TransactionList transactions={transactions} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md"> {/* Card styling */}
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Savings</h3> {/* Improved heading */}
          <CreditDebtList creditsDebts={creditsDebts} transactions={transactions} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2"> {/* Expenses span both columns on larger screens */}
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Expenses</h3> {/* Improved heading */}
          <MonthlyData transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;