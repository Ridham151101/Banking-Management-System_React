import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import useCustomersData from "../api/useCustomersData";

function CustomerAccountDetails() {
  const { customerId } = useParams();
  const [account, setAccount] = useState(null);
  const { customers } = useCustomersData();

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    // Fetch the account details for the specific customer using the customerId parameter
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/accounts?customerId=${customerId}`
        );
        if (response.data.length > 0) {
          setAccount(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [customerId]);

  if (!account) {
    return <div>Loading...</div>;
  }

  // Find the customer by customerId from the customers data
  const customer = customers.find(
    (customer) => customer.id === parseInt(customerId)
  );

  // Check if the customer exists before accessing its properties
  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title">Name: {customer.name}</h1>
          <p className="card-text">Account Number: {account.accountNumber}</p>
          <p className="card-text">Account Type: {account.accountType}</p>
          <p className="card-text">
            Account Balance: ${account.balance.toFixed(2)}
          </p>
          {role === "admin" || role === "employee" ? (
            <Link to="/customers" className="btn btn-secondary">
              Back
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CustomerAccountDetails;
