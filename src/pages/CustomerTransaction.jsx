import React, { useState } from "react";
import axios from "axios";
import useCustomersData from "../api/useCustomersData";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
// import TransactionForm from "../components/TransactionForm";

const CustomerTransaction = ({ customerId }) => {
  const { updateAccountBalance } = useCustomersData();
  const [receipentAccountNumber, setReceipentAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the customer's account details using the provided account number
      const receipentAccountResponse = await axios.get(
        `http://localhost:8000/accounts?accountNumber=${receipentAccountNumber}`
      );

      const receipentAccount = receipentAccountResponse.data[0];

      if (!receipentAccount) {
        alert("Account not found. Please enter a valid account number.");
        return;
      }

      const customerAccountResponse = await axios.get(
        `http://localhost:8000/accounts?customerId=${customerId}`
      );

      const customerAccount = customerAccountResponse.data[0];

      if (!customerAccount) {
        alert("Account not found. Please enter a valid account number.");
        return;
      }

      // Calculate the new balance based on the transaction type
      let newCustomerBalance = customerAccount.balance - parseFloat(amount);
      let newReceipentBalance = receipentAccount.balance + parseFloat(amount);

      // Get the current date and time
      const currentDate = new Date();

      // Make a POST request to create the new transaction
      await axios.post("http://localhost:8000/Transactions", {
        accountId: receipentAccount.id,
        customerId: receipentAccount.customerId,
        amount: parseFloat(amount),
        description,
        transactionType: "transfer",
        startingBalance: receipentAccount.balance,
        endingBalance: newReceipentBalance,
        receipentAccountNumber: "",
        createdAt: currentDate.toISOString(),
      });

      await axios.post("http://localhost:8000/Transactions", {
        accountId: customerAccount.id,
        customerId: customerAccount.customerId,
        amount: parseFloat(amount),
        description,
        transactionType: "transfer",
        startingBalance: customerAccount.balance,
        endingBalance: newCustomerBalance,
        receipentAccountNumber,
        createdAt: currentDate.toISOString(),
      });

      // Update the account balance in the database and state
      await updateAccountBalance(receipentAccount.id, newReceipentBalance);

      await updateAccountBalance(customerAccount.id, newCustomerBalance);

      alert("Transaction successful!");
      // Reset the form fields after successful transaction
      setReceipentAccountNumber("");
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
      <h1>Customer Transaction</h1>
      <TransactionForm
        accountNumber={receipentAccountNumber}
        setAccountNumber={setReceipentAccountNumber}
        transactionType="transfer"
        amount={amount}
        setAmount={setAmount}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleTransactionSubmit}
      />
    </div>
  );
};

export default CustomerTransaction;
