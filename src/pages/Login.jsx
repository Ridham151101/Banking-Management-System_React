import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoginFormInput from "../components/LoginFormInput";
import bankingImage from "../assets/banking.jpg";
import "../Styles/Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCustomerLogin = (user) => {
    axios
      .get(`http://localhost:8000/accountRequests?userId=${user.id}`)
      .then((res) => {
        const accountRequests = res.data;
        if (
          accountRequests.length === 0 ||
          accountRequests[0].status === "pending"
        ) {
          toast.warning(
            "Your account request is pending. Please wait for approval."
          );
        } else {
          if (user.password === password) {
            toast.success("Successfully Logged in");
            setIsLoggedIn(true);
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("role", user.role);
            navigate("/home");
          } else {
            toast.error("Please enter valid credentials");
          }
        }
      })
      .catch((err) => {
        toast.error("Login Failed due to: " + err.message);
      });
  };

  const ProceedLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      axios
        .get("http://localhost:8000/users")
        .then((res) => {
          const users = res.data;
          const user = users.find((u) => u.email === email);
          if (!user) {
            toast.error("Please enter a valid Email");
          } else {
            if (user.role === "customer") {
              handleCustomerLogin(user);
            } else {
              // Proceed with login for admins and other roles
              if (user.password === password) {
                toast.success("Successfully Logged in");
                setIsLoggedIn(true);
                sessionStorage.setItem("userId", user.id);
                sessionStorage.setItem("email", user.email);
                sessionStorage.setItem("role", user.role);
                navigate("/home");
              } else {
                toast.error("Please enter valid credentials");
              }
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to: " + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;

    if (!email.trim()) {
      result = false;
      toast.warning("Please enter email");
    }
    if (!password.trim()) {
      result = false;
      toast.warning("Please enter password");
    }
    return result;
  };

  return (
    <>
      <div className="main-container">
        <img src={bankingImage} alt="Banking" />
      </div>
      <div className="vh-100 p-4 d-flex align-items-center">
        <div className="offset-lg-4 col-lg-4">
          <form onSubmit={ProceedLogin} className="container">
            <div id="card" className="card">
              <div id="card-header" className="card-header">
                <h1>Login to Sahajanand Bank</h1>
              </div>
              <div className="card-body">
                <LoginFormInput
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              </div>
              <div id="card-footer" className="card-footer">
                <center>
                  <Button onClick={ProceedLogin} id="login">
                    Login
                  </Button>
                </center>
                <center>
                  <Link id="account-request" to="/account-request">
                    <u>Create New Account?</u>
                  </Link>
                </center>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
