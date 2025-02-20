import React, { useState } from 'react';

function AccountsPage({ transactions }) {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const calculateAccountBalances = () => {
    const accountBalances = {};

    if (transactions && Array.isArray(transactions)) {
      transactions.forEach(transaction => {
        if (transaction && transaction.account && transaction.amount) {
          if (!accountBalances[transaction.account]) {
            accountBalances[transaction.account] = 0;
          }
          accountBalances[transaction.account] += transaction.amount;
        }
      });
    }

    return accountBalances;
  };

  const accountBalances = calculateAccountBalances();

  const getAccountTransactions = (account) => {
    return transactions.filter(transaction => transaction.account === account);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Accounts</h2>

      {Object.keys(accountBalances).length === 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">No accounts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Account Balances</h3>
            <ul className="space-y-2">
              {Object.entries(accountBalances).map(([account, balance]) => (
                <li
                  key={account}
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => setSelectedAccount(account)}
                >
                  <span className="font-medium text-gray-800">{account}</span>
                  <span className="text-gray-600">${balance.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {selectedAccount ? `${selectedAccount} Transactions` : "Select an account to view transactions"}
            </h3>
            {selectedAccount ? (
              <ul className="space-y-2">
                {getAccountTransactions(selectedAccount).map((transaction, index) => (
                  <li key={index} className="border-b border-gray-200 py-1 flex items-center"> {/* Added flex for alignment */}
                    <span className="text-gray-800 w-24"> {/* Fixed width for date */}
                      {transaction.date instanceof Date ? transaction.date.toLocaleDateString() : transaction.date}
                    </span>
                    <span className="text-gray-600 w-24"> {/* Fixed width for category */}
                      {transaction.category}
                    </span>
                    <span className={`text-${transaction.amount > 0 ? 'green-500' : 'red-500'} font-medium w-16 text-right`}> {/* Color based on amount */}
                      ${transaction.amount.toFixed(2)}
                    </span>
                    <span className={`text-${transaction.amount > 0 ? 'green-500' : 'red-500'} ml-2`}> {/* Income/Expense indicator */}
                      {transaction.amount > 0 ? '(Income)' : '(Expense)'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No account selected.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountsPage;