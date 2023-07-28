// UserProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch user data from the server or API and set it in the state
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        const userData = response.data.find(
          (user) => user.email === sessionStorage.getItem("email")
        );
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
        </div>
      </div>
      <div className="mt-3">
        <Link to="/edit-profile" className="btn btn-primary">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
