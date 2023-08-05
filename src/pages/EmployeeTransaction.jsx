import React, { useState } from "react";
import axios from "axios";
import useCustomersData from "../api/useCustomersData";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";

const EmployeeTransaction = ({ employeeId }) => {
  const { updateAccountBalance } = useCustomersData();
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the customer's account details using the provided account number
      const accountResponse = await axios.get(
        `http://localhost:8000/accounts?accountNumber=${accountNumber}`
      );

      const customerAccount = accountResponse.data[0];

      if (!customerAccount) {
        alert("Account not found. Please enter a valid account number.");
        return;
      }

      // Calculate the new balance based on the transaction type
      let newBalance;
      if (transactionType === "deposit") {
        newBalance = customerAccount.balance + parseFloat(amount);
      } else if (transactionType === "withdrawal") {
        newBalance = customerAccount.balance - parseFloat(amount);
      }

      // Get the current date and time
      const currentDate = new Date();

      // Make a POST request to create the new transaction
      await axios.post("http://localhost:8000/Transactions", {
        accountId: customerAccount.id,
        customerId: customerAccount.customerId,
        employeeId: parseInt(employeeId),
        amount: parseFloat(amount),
        description,
        transactionType,
        startingBalance: customerAccount.balance,
        endingBalance: newBalance,
        createdAt: currentDate.toISOString(),
      });

      // Update the account balance in the database and state
      await updateAccountBalance(customerAccount.id, newBalance);

      alert("Transaction successful!");
      // Reset the form fields after successful transaction
      setAccountNumber("");
      setTransactionType("deposit");
      setAmount("");
      setDescription("");

      navigate("/home");
    } catch (error) {
      console.error("Error processing transaction:", error);
      // alert("Error processing transaction. Please try again later.");
    }
  };

  return (
    <div className="container">
      <center>
        <h1>Employee Transaction</h1>
      </center>
      <TransactionForm
        accountNumber={accountNumber}
        transactionType={transactionType}
        amount={amount}
        description={description}
        setAccountNumber={setAccountNumber}
        setTransactionType={setTransactionType}
        setAmount={setAmount}
        setDescription={setDescription}
        handleSubmit={handleTransactionSubmit}
      />
    </div>
  );
};

export default EmployeeTransaction;
