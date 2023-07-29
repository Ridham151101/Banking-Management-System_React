import CustomerRow from "../components/CustomerRow";
import useCustomersData from "../api/useCustomersData";
import axios from "axios";
import AccountForm from "../components/AccountForm";
import { useState } from "react";

const Customers = () => {
  const { customers, setCustomers } = useCustomersData();
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleApproveRequest = async (customerId) => {
    try {
      // Fetch the account request data for the specific customer
      const accountRequestResponse = await axios.get(
        `http://localhost:8000/accountRequests?userId=${customerId}`
      );

      const accountRequestData = accountRequestResponse.data;

      if (accountRequestData.length > 0) {
        // Get the account request id for the specific customer
        const accountRequestId = accountRequestData[0].id;

        // Make a PUT request to update the account request status to "approved"
        await axios.patch(
          `http://localhost:8000/accountRequests/${accountRequestId}`,
          {
            status: "approved",
          }
        );

        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.id === customerId
              ? { ...customer, accountRequestStatus: "approved" }
              : customer
          )
        );
      }
    } catch (error) {
      console.error("Error approving account request:", error);
    }
  };

  const handleCreateAccount = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedCustomerId(null);
    setShowForm(false);
  };

  return (
    <div className="container">
      <h1>Customers</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Account Request Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              handleCreateAccount={handleCreateAccount}
            />
          ))}
        </tbody>
      </table>
      {showForm && (
        <AccountForm
          customerId={selectedCustomerId}
          handleApproveRequest={handleApproveRequest}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Customers;
