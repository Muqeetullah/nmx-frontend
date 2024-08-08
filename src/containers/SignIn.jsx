import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SignInUI from "../components/SignInUI";
import { useToast } from "../context/ToastContext";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { showToast } = useToast();

  const onSubmit = (data) => {
    const { email, password } = data;

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
        showToast("Invalid credentials", { type: "error" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignInUI
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
    />
  );
};

export default SignIn;
