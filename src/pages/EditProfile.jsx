import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";

const EditProfile = () => {
  const { user, setUser } = useAppContext();
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server or API and set it in the context
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const userData = response.data.find(
          (user) => user.email === sessionStorage.getItem("email")
        );
        setUser(userData);
        setFormData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Send the updated profile data to the server or API
      await axios.put(`http://localhost:8000/users/${user.id}`, formData);
      alert("Profile updated successfully!");
      // Redirect back to the UserProfile page after updating the profile
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title">Edit Profile</h1>
          <form onSubmit={handleUpdateProfile}>
            <FormInput
              label="Name"
              name="name"
              value={formData.name || ""}
              onChange={(value) => handleInputChange("name", value)}
            />
            <FormInput
              label="Email"
              name="email"
              value={formData.email || ""}
              onChange={(value) => handleInputChange("email", value)}
            />
            <FormInput
              label="Gender"
              name="gender"
              type="radio"
              value={formData.gender || "male"}
              onChange={(value) => handleInputChange("gender", value)}
            />
            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone || ""}
              onChange={(value) => handleInputChange("phone", value)}
            />
            <FormTextArea
              label="Address"
              name="address"
              value={formData.address || ""}
              onChange={(value) => handleInputChange("address", value)}
            />
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
