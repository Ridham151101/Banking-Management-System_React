import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoginFormInput from "../components/LoginFormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

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
            if (user.password === password) {
              toast.success("Successfully Logged in");
              sessionStorage.setItem("email", user.email);
              navigate("/");
            } else {
              toast.error("Please enter valid credentials");
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
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form onSubmit={ProceedLogin} className="container">
            <div className="card">
              <div className="card-header">
                <h1>User Login</h1>
              </div>
              <div className="card-body">
                <LoginFormInput
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              </div>
              <div className="card-footer">
                <Button type="submit" style={{ marginRight: "10px" }}>
                  Login
                </Button>
                <NavLink className="btn btn-success" to="/account-request">
                  Account Request
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
