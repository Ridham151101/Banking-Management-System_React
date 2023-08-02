import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHistory from "./TransactionHistory";

const Home = ({ customerId, role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email === null || email === "") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to the Bank</h1>

      {role === "customer" && (
        <>
          <h2 className="mb-3">Last 10 Transactions</h2>
          <TransactionHistory customerId={customerId} />
        </>
      )}

      {role === "admin" || role === "employee" ? (
        <p className="mt-4">You are an {role} user.</p>
      ) : null}
    </div>
  );
};

export default Home;
