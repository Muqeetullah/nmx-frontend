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
import { ErrorBoundary } from "../components/ErrorBoundryClass";

// import { ErrorBoundary } from "react-error-boundary";
// import FallbackScreen from "../components/ErrorScreen";
// import FormComponent from "../HOC/validation";

const AppRoutes = () => {
  const jsonString = localStorage.getItem("user");
  const jsonObject = JSON.parse(jsonString || "{}");
  const role = jsonObject.role;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoutes>
          <Layout>
            {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
            <Outlet />
          </Layout>
        </PrivateRoutes>
      ),
    },
    {
      path: "admin",
      element: (
        <PrivateRoutes>
          <Layout>
            <Outlet />
          </Layout>
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
        <ErrorBoundary>
          <CarouselController />
        </ErrorBoundary>
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
          <ErrorBoundary>
            <SignIn />
          </ErrorBoundary>
        </PublicRoutes>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
