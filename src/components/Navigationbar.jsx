import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Navigationbar = ({ customerId, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  // const loggedIn = sessionStorage.getItem("email") !== null;
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    // Clear sessionStorage and navigate to the login page
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">Sahajanand Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {/* If user not logged in, display login and account request buttons */}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/account-request" className="navbar-link">
                  Account Request
                </Link>
              </>
            )}

            {/* If user logged in, display appropriate buttons based on role */}
            {isLoggedIn && (
              <>
                {/* Common buttons for all logged-in users */}
                <Link to="/home" className="navbar-link">
                  Home
                </Link>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>

                {/* Buttons for admin and employee */}
                {role === "admin" || role === "employee" ? (
                  <>
                    <Link to="/employees" className="navbar-link">
                      Employees
                    </Link>
                    <Link to="/customers" className="navbar-link">
                      Customers
                    </Link>
                  </>
                ) : (
                  <Link
                    to={`/account-details/${customerId}`}
                    className="navbar-link"
                  >
                    Account Details
                  </Link>
                )}

                <Link to="/transactions" className="navbar-link">
                  Transactions
                </Link>

                {/* Buttons for customer */}
                {role === "customer" && (
                  <Link
                    to={`/transaction-history/${customerId}`}
                    className="navbar-link"
                  >
                    Transaction History
                  </Link>
                )}
              </>
            )}

            {/* Always show the logout button for logged-in users */}
            {isLoggedIn && (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
