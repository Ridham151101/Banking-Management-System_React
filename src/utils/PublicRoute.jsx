import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
function Public({ children }) {
  const { isLoggedIn } = useAppContext();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
export default Public;
