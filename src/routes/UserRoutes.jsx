import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const UserPermission = ({ children }) => {
  const storedUser = localStorage.getItem("userData");
  const user = JSON.parse(storedUser);
  const role = user?.role;

  return role === "user" ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default UserPermission;
