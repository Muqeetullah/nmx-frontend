import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";
import React from "react";
import FallbackScreen from "./ErrorScreen";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <ErrorBoundary FallbackComponent={FallbackScreen}>
        <div className="flex flex-col space-y-2 md:space-y-8 px-4 md:px-8">
          {children}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
