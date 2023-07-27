import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateUserForm from "../components/CreateUserForm";
import axios from "axios";

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
    <div className="offset-lg-3 col-lg-6">
      <CreateUserForm
        state={state}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AccountRequest;
