import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import CreateUserForm from "../components/CreateUserForm";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "male",
    birthdate: "",
  });

  const handleFieldChange = (field, value) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to create a new employee user
      await axios.post("http://localhost:8000/users", {
        ...state,
        role: "employee", // Set the role as "employee" for the new user
      });

      toast.success("New employee created successfully!");
      navigate("/employees"); // Redirect the admin to the home page
    } catch (error) {
      toast.error("Failed to create new employee.");
    }
  };

  // Function to check if the user is an admin
  const isAdmin = () => {
    const userRole = sessionStorage.getItem("role"); // Get the user's role from sessionStorage
    return userRole === "admin"; // Return true if the user's role is "admin", otherwise false
  };

  // Authorization check: If the user is not an admin, redirect to another page (e.g., login page)
  if (!isAdmin()) {
    navigate("/login"); // Redirect to the login page or any other page you want
    return null; // Render nothing if the user is not authorized
  }

  return (
    <>
      {/* AddEmployee Form as a Modal */}
      <Modal show={true} onHide={() => navigate("/home")}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUserForm
            state={state}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
            showRoleField={false}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEmployee;
