import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    const token = user.token;
    return token !== null && token !== undefined && token !== "";
  }

  return false;
};

console.log(isAuthenticated());

const PrivateRoutes = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
