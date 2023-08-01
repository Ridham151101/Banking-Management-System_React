import { useEffect, useState } from "react";
import axios from "axios";

const useCustomersData = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customer role users' data from the server or API
    const fetchCustomersData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const customersData = response.data.filter(
          (user) => user.role === "customer"
        );

        // Fetch account request data from the server or API
        const accountRequestsResponse = await axios.get(
          "http://localhost:8000/accountRequests"
        );
        const accountRequests = accountRequestsResponse.data;

        // Merge customer data with their account request status
        const customersWithStatus = customersData.map((customer) => {
          const accountRequest = accountRequests.find(
            (request) => request.userId === customer.id
          );

          return {
            ...customer,
            accountRequestStatus: accountRequest
              ? accountRequest.status
              : "not requested",
          };
        });

        setCustomers(customersWithStatus);
      } catch (error) {
        console.error("Error fetching customers data:", error);
      }
    };

    fetchCustomersData();
  }, []);

  const updateAccountBalance = async (accountId, newBalance) => {
    try {
      await axios.patch(`http://localhost:8000/accounts/${accountId}`, {
        balance: newBalance,
      });
    } catch (error) {
      console.error("Error updating account balance:", error);
    }
  };

  return { customers, setCustomers, updateAccountBalance };
};

export default useCustomersData;
