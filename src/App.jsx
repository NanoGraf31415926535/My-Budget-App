// src/App.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import BalanceSummary from "/src/components/BalanceSummary.jsx";
import Accounts from "/src/components/Accounts";
import BudgetChart from "/src/components/BudgetChart";
import FinancialInsightsChart from "/src/components/FinancialInsightsChart";
import TransactionsPage from "/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/TransactionsPage.jsx";
import ExpenseForm from "/src/components/ExpenseForm";
import CreditDebtForm from "/src/components/CreditDebt";
import BudgetPlanner from '/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/BudgetPlanner.jsx'; 
import AccountsPage from "/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/AccountsPage.jsx"; 
import Reports from "/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/Reports.jsx";
import Alerts from "/Users/artemsakhniuk/Desktop/React/budget-app/src/components/Pages/Alerts.jsx";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [creditsDebts, setCreditsDebts] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showCreditDebtForm, setShowCreditDebtForm] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/loadData');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data.transactions || []);
        setCreditsDebts(data.creditsDebts || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const response = await fetch('/api/saveData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transactions, creditsDebts }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [transactions, creditsDebts]);

  useEffect(() => {
    const generatedMonthlyData = generateMonthlyData(transactions);
    setMonthlyData(generatedMonthlyData);
  }, [transactions]);

  const addTransaction = (transaction) => {
    let normalizedDate = transaction.date;
    if (typeof transaction.date === 'number') {
      normalizedDate = new Date(transaction.date).toISOString().slice(0, 10);
    } else if (transaction.date instanceof Date) {
      normalizedDate = transaction.date.toISOString().slice(0, 10);
    }
    const newTransaction = { ...transaction, date: normalizedDate };
    setTransactions([...transactions, newTransaction]);
    setShowTransactionForm(false);
  };

  const addCreditDebt = (entry) => {
    let normalizedDate = entry.date;
    if (typeof entry.date === 'number') {
      normalizedDate = new Date(entry.date).toISOString().slice(0, 10);
    } else if (entry.date instanceof Date) {
      normalizedDate = entry.date.toISOString().slice(0, 10);
    }
    const newEntry = { ...entry, date: normalizedDate };
    setCreditsDebts([...creditsDebts, newEntry]);
    setTransactions([
      ...transactions,
      { ...newEntry, source: "creditDebt", account: newEntry.account },
    ]);
    setShowCreditDebtForm(false);
  };

  const toggleTransactionForm = () => {
    setShowTransactionForm(!showTransactionForm);
    setShowCreditDebtForm(false);
  };

  const toggleCreditDebtForm = () => {
    setShowCreditDebtForm(!showCreditDebtForm);
    setShowTransactionForm(false);
  };

  const generateMonthlyData = (transactions) => {
    const monthlyData = [];
    const transactionsByMonth = {};

    transactions.forEach((transaction) => {
      let transactionMonth;

      if (!transaction.date) return;

      if (typeof transaction.date === 'string') {
        transactionMonth = transaction.date.slice(0, 7);
      } else if (typeof transaction.date === 'number') {
        const date = new Date(transaction.date);
        transactionMonth = date.toISOString().slice(0, 7);
      } else if (transaction.date instanceof Date) {
        transactionMonth = transaction.date.toISOString().slice(0, 7);
      } else {
        console.warn("Unexpected date type:", transaction.date, typeof transaction.date);
        return;
      }

      if (!transactionsByMonth[transactionMonth]) {
        transactionsByMonth[transactionMonth] = [];
      }
      transactionsByMonth[transactionMonth].push(transaction);
    });

    for (const month in transactionsByMonth) {
      const monthlyTransactions = transactionsByMonth[month];
      const totalExpenses = monthlyTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      const totalIncome = monthlyTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      monthlyData.push({
        month: month,
        expenses: totalExpenses,
        income: totalIncome,
      });
    }

    return monthlyData;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-6">Personal Budget Planner</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <button // Changed to button for accessibility
                className={`block hover:bg-gray-700 p-2 rounded w-full text-left ${activePage === "dashboard" ? "bg-gray-700" : ""}`}
                onClick={() => setActivePage("dashboard")}
              >
                Dashboard
              </button>
            </li>
            {/* ... other navigation links - change <a> to <button> */}
            <li>
              <button
                className={`block hover:bg-gray-700 p-2 rounded w-full text-left ${activePage === "transactions" ? "bg-gray-700" : ""}`}
                onClick={() => setActivePage("transactions")}
              >
                Transactions
              </button>
            </li>
            <li>
              <button
                className={`block hover:bg-gray-700 p-2 rounded w-full text-left ${activePage === "budgetPlanner" ? "bg-gray-700" : ""}`}
                onClick={() => setActivePage("budgetPlanner")}
              >
                Budget Planner
              </button>
            </li>
            <li>
              <button
                className={`block hover:bg-gray-700 p-2 rounded w-full text-left ${activePage === "accounts" ? "bg-gray-700" : ""}`}
                onClick={() => setActivePage("accounts")}
              >
                Accounts
              </button>
            </li>
            <li>
              <button
                className={`block hover:bg-gray-700 p-2 rounded w-full text-left ${activePage === "reports" ? "bg-gray-700" : ""}`}
                onClick={() => setActivePage("reports")}
              >
                Reports
              </button>
            </li>
            <li>
              <button
                className={`block hover:bg-gray-700 p-2 rounded w-full text-left ${activePage === "alerts" ? "bg-gray-700" : ""}`}
                onClick={() => setActivePage("alerts")}
              >
                Alerts
              </button>
            </li>

          </ul>
        </nav>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Help</h3>
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <div className="mt-4">
            <img src="/user-avatar.png" alt="User Avatar" className="w-12 h-12 rounded-full" />
            <p className="mt-2">Artem Sakhniuk</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 overflow-y-auto">
        {activePage === "dashboard" && (
          <div className="grid grid-cols-[1.5fr_1fr] gap-4">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <h1 className="text-2xl font-semibold">Good Morning, Artem</h1>
                <p>Welcome to your financial insights.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-4 rounded shadow w-1/3">
                  <h3 className="text-lg font-semibold">Total Balance</h3>
                  <BalanceSummary transactions={transactions} />
                </div>
                <div className="bg-white p-4 rounded shadow w-1/3">
                  <h3 className="text-lg font-semibold">Income</h3>
                  <Accounts transactions={transactions} />
                </div>
                <div className="w-1/3 flex flex-col gap-2">
                  <button onClick={toggleTransactionForm} className="bg-blue-500 text-white p-2 rounded">
                    Add Transaction
                  </button>
                  <button onClick={toggleCreditDebtForm} className="bg-green-500 text-white p-2 rounded">
                    Add Credit/Debt
                  </button>
                  {showTransactionForm && <ExpenseForm addTransaction={addTransaction} />}
                  {showCreditDebtForm && <CreditDebtForm addCreditDebt={addCreditDebt} />}
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
          <TransactionsPage transactions={transactions} creditsDebts={creditsDebts} />
        )}
        {activePage === "budgetPlanner" && <BudgetPlanner transactions={transactions} />}
        {activePage === "accounts" && <AccountsPage transactions={transactions} />}
        {activePage === "reports" && <Reports transactions={transactions} creditsDebts={creditsDebts} />}
        {activePage === "alerts" && <Alerts transactions={transactions} />}
      </main>
    </div>
  );
}

export default App;