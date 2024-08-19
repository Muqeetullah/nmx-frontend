import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AdminDashboard from "../components/AdminDashBoard";
import UserDashboard from "../containers/UserDashboard";
import UserListing from "../containers/UserListing";
import BookLisitng from "../containers/BookListing";
import AddUser from "../containers/AddUser";
import AddBook from "../containers/AddBook";
import SignIn from "../containers/SignIn";
import Layout from "../components/Layout";
import CarouselController from "../components/CarouselController";

import { ErrorBoundary } from "react-error-boundary";
import FallbackScreen from "../components/ErrorScreen";

import AdminPermission from "./AdminRoutes";
import Profile from "../containers/Profile";
import UserPermission from "./UserRoutes";
import Unauthorized from "@components/UnAuth";

const AppRoutes = () => {
  const storedUser = localStorage.getItem("userData");
  const user = JSON.parse(storedUser);
  const role = user?.role;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoutes>
          <Layout>
            {role === "admin" ? <AdminDashboard /> : <BookLisitng />}
            <Outlet />
          </Layout>
        </PrivateRoutes>
      ),
    },
    {
      path: "admin",
      element: (
        <PrivateRoutes>
          <AdminPermission>
            <Outlet />
          </AdminPermission>
        </PrivateRoutes>
      ),
      children: [
        { path: "view-user-list", element: <UserListing /> },
        { path: "view-book-list", element: <BookLisitng /> },
        { path: "add-user", element: <AddUser /> },
        { path: "add-book", element: <AddBook /> },
      ],
    },
    {
      path: "carousel",
      element: (
        <ErrorBoundary FallbackComponent={FallbackScreen}>
          <CarouselController />
        </ErrorBoundary>
      ),
    },

    {
      path: "profile",
      element: (
        <UserPermission>
          <Profile />
        </UserPermission>
      ),
    },

    // {
    //   path: "/view-issued-book-list",
    //   element: (
    //     <PrivateRoute>
    //       <Layout>
    //         <UsersWithBooksListing />
    //       </Layout>
    //       <Outlet />
    //     </PrivateRoute>
    //   ),
    //   children: [{ path: "issue-book", element: <IssueBook /> }],
    // },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <ErrorBoundary FallbackComponent={FallbackScreen}>
            <SignIn />
          </ErrorBoundary>
        </PublicRoutes>
      ),
    },
    {
      path: "unauthorized",
      element: <Unauthorized />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
