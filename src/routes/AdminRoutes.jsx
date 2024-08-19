import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const AdminPermission = () => {
  const storedUser = localStorage.getItem("userData");
  const user = JSON.parse(storedUser);
  const role = user?.role;

  return role === "admin" ? (
    <Layout>
      <Outlet />{" "}
    </Layout>
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default AdminPermission;
