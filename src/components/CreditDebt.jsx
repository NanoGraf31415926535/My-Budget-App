// src/components/CreditDebtForm.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreditDebtForm({ addCreditDebt }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("credit");
  const [account, setAccount] = useState("wallet");
  const [reason, setReason] = useState("loan");
  const [date, setDate] = useState(new Date());

  const creditDebtReasons = ["Loan", "Investment", "Gift"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      let adjustedAmount = parseFloat(amount);
      if (type === "payment") {
        adjustedAmount = -adjustedAmount;
      }
      addCreditDebt({ amount: adjustedAmount, type, account, reason, date });
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
        className="border p-2 rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="credit">Credit</option>
        <option value="debt">Debt</option>
        <option value="payment">Payment</option>
      </select>
      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="border p-2 rounded"
      >
        {creditDebtReasons.map((r) => (
          <option key={r} value={r.toLowerCase()}>
            {r}
          </option>
        ))}
      </select>
      <select
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="wallet">Wallet</option>
        <option value="bank">Bank Account</option>
      </select>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Credit/Debt
      </button>
    </form>
  );
}

export default CreditDebtForm;