import React, { useState } from "react";
import axios from "axios";

const AccountForm = ({ customerId, onClose, handleApproveRequest }) => {
  const [formData, setFormData] = useState({
    accountType: "savings", // Default account type
    balance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountNumber = generateAccountNumber(); // Generate a unique account number
    const accountData = { ...formData, customerId, accountNumber };

    try {
      // Make a POST request to add the new account to the server
      await axios.post("http://localhost:8000/accounts", accountData);
      onClose(); // Close the form after successful submission
      handleApproveRequest(customerId);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const generateAccountNumber = () => {
    // Generate a unique 14-digit account number using uuidv4
    return Math.floor(Math.random() * 100000000000000)
      .toString()
      .padStart(14, "0");
  };

  return (
    <div className="container">
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="accountType" className="form-label">
            Account Type
          </label>
          <select
            id="accountType"
            name="accountType"
            className="form-select"
            value={formData.accountType}
            onChange={handleChange}
          >
            <option value="savings">Savings</option>
            <option value="current">Current</option>
            <option value="fixed-deposit">Fixed Deposit</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="balance" className="form-label">
            Balance
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            className="form-control"
            value={formData.balance}
            onChange={handleChange}
          />
        </div>
        <button id="buttons" type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
