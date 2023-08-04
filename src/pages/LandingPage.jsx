import { Button } from "react-bootstrap";
import bankingImage from "../assets/banking.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signIn = sessionStorage.getItem("email") !== null;
    if (signIn) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <img src={bankingImage} alt="Banking" />
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center h-100 sub-container">
        <span className="heading">Welcome to Sahajanand Bank</span>
        <div>
          <Link to="/login">
            <Button id="login-button">Login</Button>
          </Link>
          <Link to="/account-request">
            <Button id="account-request-button">Account Request</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
