import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SignInUI from "../components/SignInUI";
import { useToast } from "../context/ToastContext";
import { SIGNIN } from "../graphQL/Mutations";
import { useMutation } from "@apollo/client";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const SignIn = () => {
  const navigate = useNavigate();

  const [LoginUser] = useMutation(SIGNIN, {
    onCompleted(data) {
      const { success, message, loginUser } = data;

      showToast("Login Successful");
      localStorage.setItem("userData", JSON.stringify(loginUser));
      navigate("/");
    },

    onError(error) {
      // toast.error("Something Went Wrong!", error);
      showToast(error.message);
      console.log(error);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { showToast } = useToast();

  const onSubmit = (data) => {
    const { username, password } = data;
    LoginUser({
      variables: {
        username,
        password,
      },
    });
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
