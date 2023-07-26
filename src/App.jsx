import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AccountRequest from "./pages/AccountRequest";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/account-request" element={<AccountRequest />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
