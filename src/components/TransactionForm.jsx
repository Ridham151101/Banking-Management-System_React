import React from "react";

const TransactionForm = ({
  accountNumber,
  transactionType,
  amount,
  description,
  setAccountNumber,
  setTransactionType,
  setAmount,
  setDescription,
  handleSubmit,
}) => {
  const isTransfer = transactionType === "transfer";

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        {isTransfer ? (
          <label htmlFor="accountNumber" className="form-label">
            Receipent Account Number
          </label>
        ) : (
          <label htmlFor="accountNumber" className="form-label">
            Customer Account Number
          </label>
        )}
        <input
          type="text"
          className="form-control"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
      </div>
      {!isTransfer && (
        <div className="mb-3">
          <label htmlFor="transactionType" className="form-label">
            Transaction Type
          </label>
          <select
            className="form-control"
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button id="buttons" type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
