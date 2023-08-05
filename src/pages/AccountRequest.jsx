import React, { useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import bankingImage from "../assets/banking.jpg";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import { Button } from "react-bootstrap";
import "../Styles/AccountRequest.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  gender: "male",
  birthdate: "",
  role: "customer",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const AccountRequest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const isValidate = () => {
    let isproceed = true;
    let errmessage = "Please enter the value in ";

    for (const field in state) {
      if (!state[field]) {
        isproceed = false;
        errmessage += field.charAt(0).toUpperCase() + field.slice(1) + ", ";
      }
    }

    if (!isproceed) {
      toast.warning(errmessage.slice(0, -2));
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)) {
        isproceed = false;
        toast.warning("Please enter a valid email");
      }
    }

    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidate()) {
      axios
        .post("http://localhost:8000/users", state)
        .then((userRes) => {
          // Create the account request associated with the newly created user
          const accountRequestObj = {
            userId: userRes.data.id,
            status: "pending",
          };

          axios
            .post("http://localhost:8000/accountRequests", accountRequestObj)
            .then(() => {
              toast.success("Account request submitted successfully.");
              navigate("/login");
            })
            .catch((err) => {
              toast.error("Failed to create account request:", err.message);
            });
        })
        .catch((err) => {
          toast.error("Failed to create user:", err.message);
        });
    }
  };

  const handleFieldChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  return (
    <>
      <div className="main-container">
        <img src={bankingImage} alt="Banking" />
      </div>
      <div className="vh-100 p-4 d-flex align-items-center">
        <div className="offset-lg-4 col-lg-4">
          <form
            className="container"
            style={{ textAlign: "left" }}
            onSubmit={handleSubmit}
          >
            <div id="card" className="card">
              <div id="card-header" className="card-header">
                <h1>Account Request</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <FormInput
                      label="Name"
                      value={state.name}
                      onChange={(value) => handleFieldChange("name", value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      label="Email"
                      value={state.email}
                      onChange={(value) => handleFieldChange("email", value)}
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <FormInput
                      type="date"
                      label="Birthdate"
                      value={state.birthdate}
                      onChange={(value) =>
                        handleFieldChange("birthdate", value)
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      label="Password"
                      value={state.password}
                      type="password"
                      onChange={(value) => handleFieldChange("password", value)}
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <FormInput
                      label="Phone"
                      value={state.phone}
                      onChange={(value) => handleFieldChange("phone", value)}
                    />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <FormTextArea
                      label="Address"
                      value={state.address}
                      onChange={(value) => handleFieldChange("address", value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <FormInput
                      type="radio"
                      label="Gender"
                      value={state.gender}
                      onChange={(value) => handleFieldChange("gender", value)}
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div id="card-footer" className="card-footer">
                <center>
                  <Button type="submit" id="register-button">
                    Register
                  </Button>
                </center>
                <center>
                  <Link id="account-request" to="/login">
                    <u>Do You Have an Account?</u>
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

export default AccountRequest;
