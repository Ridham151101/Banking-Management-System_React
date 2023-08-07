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
import { useAppContext } from "./utils/AppContext";
import Customers from "./pages/Customers";
import Private from "./utils/PrivateRoute";
import Public from "./utils/PublicRoute";
import CustomerAccountDetails from "./pages/CustomerAccountDetails";
import Transactions from "./pages/Transactions";
import TransactionHistory from "./pages/TransactionHistory";

const App = () => {
  const { isLoggedIn } = useAppContext();

  const userId = sessionStorage.getItem("userId");

  const role = sessionStorage.getItem("role");

  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        {isLoggedIn && <Navigationbar customerId={userId} />}
        <Routes>
          <Route
            path="/"
            element={
              <Public>
                <LandingPage />
              </Public>
            }
          />
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/account-request"
            element={
              <Public>
                <AccountRequest />
              </Public>
            }
          />
          <Route
            path="/home"
            element={
              <Private>
                <Home customerId={userId} role={role} />
              </Private>
            }
          />
          <Route
            path="/profile"
            element={
              <Private>
                <UserProfile />
              </Private>
            }
          />
          <Route
            path="/add-employee"
            element={
              <Private>
                <AddEmployee />
              </Private>
            }
          />
          <Route
            path="/employees"
            element={
              <Private>
                <Employees role={role} />
              </Private>
            }
          />
          <Route
            path="/customers"
            element={
              <Private>
                <Customers />
              </Private>
            }
          />
          <Route
            path="/account-details/:customerId"
            element={
              <Private>
                <CustomerAccountDetails />
              </Private>
            }
          />
          <Route
            path="/transactions"
            element={
              <Private>
                <Transactions userId={userId} role={role} />
              </Private>
            }
          />
          <Route
            path="/transaction-history/:customerId"
            element={
              <Private>
                <TransactionHistory
                  customerId={userId}
                  limitTransactions={false}
                />
              </Private>
            }
          />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
