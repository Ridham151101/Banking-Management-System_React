import React from "react";
import { Navigate } from "react-router-dom";
function Public({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
export default Public;
