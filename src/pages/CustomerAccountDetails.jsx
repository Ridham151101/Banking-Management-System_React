import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import useCustomersData from "../api/useCustomersData";

function CustomerAccountDetails() {
  const { customerId } = useParams();
  const [account, setAccount] = useState(null);
  const { customers } = useCustomersData();

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
    <div>
      <h1>Account Details</h1>
      <p>Customer Name: {customer.name}</p>
      <p>Account Number: {account.accountNumber}</p>
      <p>Account Type: {account.accountType}</p>
      <p>Balance: {account.balance}</p>
      <Link to="/customers">Back to Customers</Link>
    </div>
  );
}

export default CustomerAccountDetails;
