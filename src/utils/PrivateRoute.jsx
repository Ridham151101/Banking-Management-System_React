import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
function Private({ children }) {
  const { isLoggedIn } = useAppContext();

  console.log("isLoggedIn: ", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Private;
