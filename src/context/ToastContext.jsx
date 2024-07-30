import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const showToast = (message, options) => {
    toast(message, options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
