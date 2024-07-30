import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInUI from "../components/SignInUI";
import { useToast } from "../context/ToastContext";
import { ErrorBoundary } from "react-error-boundary";
import FallbackScreen from "../components/ErrorScreen";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (email === "user@gmail.com" && password === "1234") {
        const user = {
          token: "123123",
          role: "user",
          name: "User",
          email: "user@example.com",
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");

        showToast("Login successful", { type: "success" });
      } else if (email === "admin@gmail.com" && password === "1234") {
        const admin = {
          token: "123123",
          role: "admin",
          name: "Admin",
          email: "admin@example.com",
        };
        localStorage.setItem("user", JSON.stringify(admin));
        navigate("/");

        showToast("Login successful", { type: "success" });
      } else {
        showToast("Login failed", { type: "error" });
      }
      setError("Invalid credentials");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignInUI
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  );
};

export default SignIn;
