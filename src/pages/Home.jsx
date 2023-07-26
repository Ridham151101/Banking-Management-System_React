import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let email = sessionStorage.getItem("email");
    if (email === null || email === "") {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Logout</Link>
      </div>

      <br />

      <h1>Welcome to the Bank</h1>
    </>
  );
};

export default Home;
