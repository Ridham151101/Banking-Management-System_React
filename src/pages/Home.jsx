import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHistory from "./TransactionHistory";
import EmployeeCustomerPieChart from "../components/EmployeeCustomerPieChart";
import GenderPieChart from "../components/GenderPieChart";
import axios from "axios";

const Home = ({ customerId, role }) => {
  const navigate = useNavigate();
  const [employeesCount, setEmployeesCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email === null || email === "") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch the list of users from the API and count employees and customers
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const users = response.data;
        const employees = users.filter((user) => user.role === "employee");
        const customers = users.filter((user) => user.role === "customer");

        setEmployeesCount(employees.length);
        setCustomersCount(customers.length);

        // Count male and female customers
        const maleCustomers = customers.filter(
          (customer) => customer.gender === "male"
        );
        const femaleCustomers = customers.filter(
          (customer) => customer.gender === "female"
        );

        setMaleCount(maleCustomers.length);
        setFemaleCount(femaleCustomers.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="welcome-heading">Welcome to the Sahajanand Bank</h1>

      {role === "customer" && (
        <>
          {/* <CustomerAccountDetails /> */}
          <h2 className="last-10-transaction-heading">Last 10 Transactions</h2>
          <TransactionHistory
            customerId={customerId}
            limitTransactions={true}
          />
        </>
      )}

      {role === "admin" || role === "employee" ? (
        <>
          {/* <p className="role-paragraph">You are an {role} user.</p> */}
          <div className="home-container">
            <EmployeeCustomerPieChart
              employeesCount={employeesCount}
              customersCount={customersCount}
            />
            <br />
            <GenderPieChart maleCount={maleCount} femaleCount={femaleCount} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
