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

function TransactionHistory({ customerId, limitTransactions }) {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const startIndex = (currentPage - 1) * 2;

        let response;

        if (limitTransactions) {
          // Fetch the last 10 transactions for the specific customer using the customerId parameter
          response = await axios.get(
            `http://localhost:8000/Transactions?customerId=${customerId}&_limit=10&_sort=createdAt&_order=desc`
          );
        } else {
          // Fetch all transactions for the specific customer using the customerId parameter
          response = await axios.get(
            `http://localhost:8000/Transactions?customerId=${customerId}&_start=${startIndex}&_limit=2&_sort=createdAt&_order=desc`
          );
        }

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
  }, [customerId, limitTransactions, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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
        {/* Pagination controls */}
        {!limitTransactions && (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary me-2"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={transactions.length < 2}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHistory;
