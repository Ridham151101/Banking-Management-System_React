import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email === null || email === "") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <h1>Welcome to the Bank</h1>

      {/* Display the "Add Employee" button only for admin users
      {sessionStorage.getItem("role") === "admin" && (
        <Link to={"/add-employee"}>
          <button>Add Employee</button>
        </Link>
      )} */}
    </>
  );
};

export default Home;
