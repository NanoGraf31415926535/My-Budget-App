import React from "react";

function Accounts({ transactions }) {
  const walletTransactions = transactions.filter((t) => t.account === "wallet");
  const walletBalance = walletTransactions.reduce((sum, t) => {
    if (t.type === "credit" || t.type === "income") { // Add income
      return sum + t.amount;
    } else if (t.type === "debt" || t.type === "expense") {
      return sum - t.amount;
    } else {
      return sum;
    }
  }, 0);

  const bankTransactions = transactions.filter((t) => t.account === "bank");
  const bankBalance = bankTransactions.reduce((sum, t) => {
    if (t.type === "credit" || t.type === "income") { // Add income
      return sum + t.amount;
    } else if (t.type === "debt" || t.type === "expense") {
      return sum - t.amount;
    } else {
      return sum;
    }
  }, 0);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Accounts</h2>
      <p>Wallet: ${walletBalance.toFixed(2)}</p>
      <p>Bank Account: ${bankBalance.toFixed(2)}</p>
    </div>
  );
}

export default Accounts;