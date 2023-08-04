import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AccountRequest from "./pages/AccountRequest";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import AddEmployee from "./pages/AddEmployee";
import NotFound from "./pages/NotFound";
import Navigationbar from "./components/Navigationbar";
import Employees from "./pages/Employees";
import UserProfile from "./pages/UserProfile";
import { AppContextProvider } from "./utils/AppContext";
import Customers from "./pages/Customers";
import Private from "./utils/PrivateRoute";
import Public from "./utils/PublicRoute";
import CustomerAccountDetails from "./pages/CustomerAccountDetails";
import Transactions from "./pages/Transactions";
import TransactionHistory from "./pages/TransactionHistory";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const signIn = sessionStorage.getItem("email") !== null;

  const userId = sessionStorage.getItem("userId");

  const role = sessionStorage.getItem("role");

  useEffect(() => {
    // console.log("isLoggedIn: ", isLoggedIn);
    if (signIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        <AppContextProvider>
          {isLoggedIn && (
            <Navigationbar customerId={userId} setIsLoggedIn={setIsLoggedIn} />
          )}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <Public isLoggedIn={isLoggedIn}>
                  <Login setIsLoggedIn={setIsLoggedIn} />
                </Public>
              }
            />
            <Route
              path="/account-request"
              element={
                <Public isLoggedIn={isLoggedIn}>
                  <AccountRequest />
                </Public>
              }
            />
            <Route
              path="/home"
              element={<Home customerId={userId} role={role} />}
            />
            <Route
              path="/profile"
              element={
                <Private isLoggedIn={isLoggedIn}>
                  <UserProfile />
                </Private>
              }
            />
            <Route
              path="/add-employee"
              element={
                <Private isLoggedIn={isLoggedIn}>
                  <AddEmployee />
                </Private>
              }
            />
            <Route
              path="/employees"
              element={
                <Private isLoggedIn={isLoggedIn}>
                  <Employees role={role} />
                </Private>
              }
            />
            <Route
              path="/customers"
              element={
                <Private isLoggedIn={isLoggedIn}>
                  <Customers />
                </Private>
              }
            />
            <Route
              path="/account-details/:customerId"
              element={
                <Private isLoggedIn={isLoggedIn}>
                  <CustomerAccountDetails />
                </Private>
              }
            />
            <Route
              path="/transactions"
              element={
                <Private isLoggedIn={isLoggedIn}>
                  <Transactions userId={userId} role={role} />
                </Private>
              }
            />
            <Route
              path="/transaction-history/:customerId"
              element={
                <Private isLoggedIn={isLoggedIn}>
                  <TransactionHistory
                    customerId={userId}
                    limitTransactions={false}
                  />
                </Private>
              }
            />
            <Route path="*" Component={NotFound} />
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
