import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AccountRequest from "./pages/AccountRequest";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import AddEmployee from "./pages/AddEmployee";
import NotFound from "./pages/NotFound";
import Navigationbar from "./components/Navigationbar";

const App = () => {
  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        <Navigationbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/account-request" element={<AccountRequest />}></Route>
          <Route path="/add-employee" element={<AddEmployee />}></Route>
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
