import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import UserFormUI from "../components/UserFormUI";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import { yupResolver } from "@hookform/resolvers/yup";
import ChangePasswordModal from "../components/PasswordModa";
import { Button } from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  role: yup.string().required("Role is required"),
  education: yup.string().required("Education is required"),
  age: yup.number().positive().integer().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  studentId: yup.string().test({
    name: "studentIdValidation",
    test: function (value) {
      if (this.parent.role === "user") {
        return value && value.length === 7;
      }
      return true;
    },
    message: "Student ID is required and must be 7 characters for users",
  }),
  semester: yup.string().test({
    name: "semesterValidation",
    test: function (value) {
      if (this.parent.role === "user") {
        return value && /^[1-8]$/.test(value);
      }
      return true;
    },
    message: "Semester is required and must be between 1 and 8 for users",
  }),
});

const AddUser = () => {
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { addUser, updateUser } = useUser();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();
  const [showUserFields, setShowUserFields] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      education: "",
      age: 0,
      gender: "",
      studentId: "",
      semester: "",
      books: [{ bookName: "", issueDate: "" }],
    },
  });

  const { handleSubmit, watch, reset } = methods;
  const watchRole = watch("role");

  useEffect(() => {
    if (watchRole === "user") {
      setShowUserFields(true);
    } else {
      setShowUserFields(false);
    }
  }, [watchRole]);

  const handleAddOrUpdateUser = (data) => {
    console.log(data);
    if (status === "Edit") {
      updateUser(data);
      showToast("User Updated", { type: "success" });
    } else {
      addUser(data);
      showToast("User Added", { type: "success" });
    }

    reset();
    navigate("/admin/view-user-list");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("Password Changed");
    setShowModal(false);
  };
  console.log(showModal);

  return (
    <FormProvider {...methods}>
      <UserFormUI
        handleAddOrUpdateUser={handleSubmit(handleAddOrUpdateUser)}
        showUserFields={showUserFields}
        status={status}
      />
      <Button
        variant="outlined"
        onClick={handleOpenModal}
        sx={{ position: "absolute", top: 100, right: 16 }}
      >
        Change Password
      </Button>
      <ChangePasswordModal open={showModal} handleClose={handleCloseModal} />
    </FormProvider>
  );
};

export default AddUser;
