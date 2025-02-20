// src/App.jsx
import React, { useState, useEffect } from "react";
import BalanceSummary from "/src/components/BalanceSummary.jsx";
import Accounts from "/src/components/Accounts";
import BudgetChart from "/src/components/BudgetChart";
import FinancialInsightsChart from "/src/components/FinancialInsightsChart";
import TransactionsPage from "/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/TransactionsPage.jsx";
import ExpenseForm from "/src/components/ExpenseForm";
import CreditDebtForm from "/src/components/CreditDebt";
import BudgetPlanner from '/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/BudgetPlanner.jsx'; 
import AccountsPage from "/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/AccountsPage.jsx"; // Import AccountsPage

function App() {
  const [transactions, setTransactions] = useState([]);
  const [creditsDebts, setCreditsDebts] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showCreditDebtForm, setShowCreditDebtForm] = useState(false);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);

    const storedCreditsDebts = JSON.parse(localStorage.getItem("creditsDebts")) || [];
    setCreditsDebts(storedCreditsDebts);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("creditsDebts", JSON.stringify(creditsDebts));
  }, [creditsDebts]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setShowTransactionForm(false);
  };

  const addCreditDebt = (entry) => {
    setCreditsDebts([...creditsDebts, entry]);
    setTransactions([...transactions, { ...entry, source: "creditDebt", account: entry.account }]);
    setShowCreditDebtForm(false);
  };

  const monthlyData = BudgetChart({ transactions });

  const toggleTransactionForm = () => {
    setShowTransactionForm(!showTransactionForm);
    setShowCreditDebtForm(false);
  };

  const toggleCreditDebtForm = () => {
    setShowCreditDebtForm(!showCreditDebtForm);
    setShowTransactionForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">Personal Budget Planner</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className={`block hover:bg-gray-700 p-2 rounded ${
                  activePage === "dashboard" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("dashboard")}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block hover:bg-gray-700 p-2 rounded ${
                  activePage === "transactions" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("transactions")}
              >
                Transactions
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block hover:bg-gray-700 p-2 rounded ${
                  activePage === "budgetPlanner" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("budgetPlanner")}
              >
                Budget Planner
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block hover:bg-gray-700 p-2 rounded ${
                  activePage === "accounts" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("accounts")}
              >
                Accounts
              </a>
            </li>
            <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Reports</a></li>
            <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Alerts</a></li>
          </ul>
        </nav>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Help</h3>
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <div className="mt-4">
            <img src="/user-avatar.png" alt="User Avatar" className="w-12 h-12 rounded-full" />
            <p className="mt-2">Artem Sakhniuk</p>
            <p></p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4">
        {activePage === "dashboard" && (
          <div className="grid grid-cols-[2fr_1fr] grid-rows-[auto,1fr] gap-4">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <h1 className="text-2xl font-semibold">Good Morning, Artem</h1>
                <p>Welcome to your financial insights.</p>
              </div>
              <div className="flex space-x-4">
                <div className="bg-white p-4 rounded shadow w-1/3">
                  <h3 className="text-lg font-semibold">Total Balance</h3>
                  <BalanceSummary transactions={transactions} />
                </div>
                <div className="bg-white p-4 rounded shadow w-1/3">
                  <h3 className="text-lg font-semibold">Income</h3>
                  <Accounts transactions={transactions} />
                </div>
                <div className="w-1/3">
                  <button
                    onClick={toggleTransactionForm}
                    className={`bg-blue-500 text-white p-2 rounded ${
                      showTransactionForm ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    Add Transaction
                  </button>
                  <button
                    onClick={toggleCreditDebtForm}
                    className={`bg-green-500 text-white p-2 rounded ${
                      showCreditDebtForm ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    Add Credit/Debt
                  </button>
                  {showTransactionForm && (
                    <div className="mt-2">
                      <ExpenseForm addTransaction={addTransaction} />
                    </div>
                  )}
                  {showCreditDebtForm && (
                    <div className="mt-2">
                      <CreditDebtForm addCreditDebt={addCreditDebt} />
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Financial Insights</h3>
                <FinancialInsightsChart monthlyData={monthlyData} />
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <BudgetChart transactions={transactions} />
            </div>
          </div>
        )}
        {activePage === "transactions" && (
          <TransactionsPage
            transactions={transactions}
            creditsDebts={creditsDebts}
          />
        )}
        {activePage === "budgetPlanner" && (
          <BudgetPlanner transactions={transactions} />
        )}
        {activePage === "accounts" && (
          <AccountsPage transactions={transactions} /> // Pass transactions prop!
        )}
      </main>
    </div>
  );
}

export default App;