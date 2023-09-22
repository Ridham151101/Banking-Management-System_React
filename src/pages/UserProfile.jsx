// UserProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import EditProfileModal from "./EditProfileModal";
import { useAppContext } from "../utils/AppContext";

const UserProfile = () => {
  const { user, setUser } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({}); // New state for the form data changes

  useEffect(() => {
    // Fetch user data from the server or API and set it in the state
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const userData = response.data.find(
          (user) => user.email === sessionStorage.getItem("email")
        );
        setUser(userData);
        setFormData(userData); // Set the initial form data from the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Send the updated profile data to the server or API
      await axios.put(`http://localhost:8000/users/${user.id}`, formData);
      alert("Profile updated successfully!");
      // Update the user state with the form data changes
      setUser((prevUser) => ({
        ...prevUser,
        ...formData,
      }));
      // Close the modal after updating the profile
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title">Name: {user.name}</h1>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">Gender: {user.gender}</p>
          <p className="card-text">Phone: {user.phone}</p>
          <p className="card-text">Birthdate: {user.birthdate}</p>
          <p className="card-text">Address: {user.address}</p>
          <p className="card-text">Role: {user.role}</p>
          <Button id="buttons" onClick={handleOpenModal}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Render the Edit Profile modal */}
      <EditProfileModal
        show={showModal}
        handleClose={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default UserProfile;
