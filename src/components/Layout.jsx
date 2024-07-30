import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";
import React from "react";
import FallbackScreen from "./ErrorScreen";
const Layout = ({ children }) => {
  return (
    <div className=" w-[100%]">
      <Header />
      <ErrorBoundary FallbackComponent={FallbackScreen}>
        <div className="flex space-x-2 md:space-x-8">{children}</div>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
