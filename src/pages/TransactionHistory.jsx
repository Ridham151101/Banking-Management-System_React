import React, { useEffect, useState } from "react";
import axios from "axios";

async function fetchAccountDetailsByAccountNumber(accountNumber) {
  try {
    const response = await axios.get(
      `http://localhost:8000/accounts?accountNumber=${accountNumber}`
    );
    return response.data[0];
  } catch (error) {
    console.error("Error fetching account details:", error);
    return null;
  }
}

function TransactionHistory({ customerId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/Transactions?customerId=${customerId}`
        );
        const transactionsData = response.data;

        // Fetch recipient account details for transfer transactions
        const transactionsWithRecipientNames = await Promise.all(
          transactionsData.map(async (transaction) => {
            if (transaction.transactionType === "transfer") {
              const recipientAccount = await fetchAccountDetailsByAccountNumber(
                transaction.receipentAccountNumber
              );

              if (recipientAccount) {
                const recipientCustomerId = recipientAccount.customerId;
                const recipientUserResponse = await axios.get(
                  `http://localhost:8000/users/${recipientCustomerId}`
                );
                const recipientName = recipientUserResponse.data.name;

                return { ...transaction, recipientName };
              }
            }
            return transaction;
          })
        );

        setTransactions(transactionsWithRecipientNames);
      } catch (error) {
        console.error("Error fetching Transactions:", error);
      }
    };
    fetchTransactions();
  }, [customerId]);

  return (
    <div className="container">
      <h1>Transaction History</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Starting Balance</th>
              <th>Ending Balance</th>
              <th>Recipient Name</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                <td>{transaction.transactionType}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>${transaction.startingBalance.toFixed(2)}</td>
                <td>${transaction.endingBalance.toFixed(2)}</td>
                {transaction.transactionType === "transfer" ? (
                  <td>{transaction.recipientName}</td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
