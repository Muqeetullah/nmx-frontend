import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const storedUser = localStorage.getItem("userData");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    const token = user.token;
    return token !== null && token !== undefined && token !== "";
  }

  return false;
};

const PublicRoutes = ({ children }) => {
  // Check if user is authenticated
  const authenticated = isAuthenticated();

  return authenticated ? (
    // Redirect to root path if authenticated
    <Navigate to="/" />
  ) : (
    // Render children (public routes) if not authenticated
    <>{children}</>
  );
};

export default PublicRoutes;
