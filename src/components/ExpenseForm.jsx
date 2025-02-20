// src/components/ExpenseForm.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ExpenseForm({ addTransaction }) {
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("wallet");
    const [type, setType] = useState("income");
    const [reason, setReason] = useState("work");
    const [date, setDate] = useState(new Date());
  
    const incomeReasons = ["Work", "Present", "Help"];
    const expenseReasons = ["Bar", "Entertainment", "Restaurant"];
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (amount) {
        addTransaction({ amount: parseFloat(amount), account, type, reason, date });
        setAmount("");
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          {type === "income"
            ? incomeReasons.map((r) => (
                <option key={r} value={r.toLowerCase()}>
                  {r}
                </option>
              ))
            : expenseReasons.map((r) => (
                <option key={r} value={r.toLowerCase()}>
                  {r}
                </option>
              ))}
        </select>
        <select
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="wallet">Wallet</option>
          <option value="bank">Bank Account</option>
        </select>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </form>
    );
  }
  
  export default ExpenseForm;