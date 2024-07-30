import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toastConfig, setToastConfig] = useState({
    open: false,
    message: "",
    options: {},
  });
  const [isPending, startTransition] = useTransition();

  const toastRef = useRef();

  useLayoutEffect(() => {
    if (toastRef.current) {
      toastRef.current.style.backgroundColor = "red";
    }
  }, [toastConfig]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastConfig({ ...toastConfig, open: false });
  };

  const showToast = (message, options = {}) => {
    startTransition(() => {
      setToastConfig({ open: true, message, options });
    });
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <ToastContext.Provider value={{ showToast, isPending }}>
      {children}
      <Snackbar
        ref={toastRef}
        open={toastConfig.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={toastConfig.message}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </ToastContext.Provider>
  );
};
