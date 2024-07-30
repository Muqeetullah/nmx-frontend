import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import UserFormUI from "../components/UserFormUI";
import { useUser } from "../context/UserContext";

const AddUser = () => {
  const { addUser, updateUser } = useUser();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    education: "",
    age: 0,
    gender: "",
  });
  const [errors, setErrors] = useState([]);
  const location = useLocation();
  const [status, setStatus] = useState("");

  const handleInputChange = (e, fieldName) => {
    let value = e.target.value;

    if (fieldName === "age") {
      value = parseInt(value, 10);
    } else if (fieldName === "role" && value === "") {
      value = "User";
    }

    setNewUser({ ...newUser, [fieldName]: value });
  };

  const handleAddOrUpdateUser = (event) => {
    event.preventDefault();

    if (status === "Edit") {
      updateUser(newUser);
    } else {
      showToast()
      addUser(newUser);
    }

    setNewUser({
      name: "",
      email: "",
      role: "User",
      education: "",
      age: 0,
      gender: "",
    });

    navigate("/admin/view-user-list");
    setErrors([]);
  };

  useEffect(() => {
    if (location.state) {
      setStatus(location.state.status);
      setNewUser(location.state.user);
    }
  }, [location.state]);

  return (
    <UserFormUI
      newUser={newUser}
      handleInputChange={handleInputChange}
      handleAddOrUpdateUser={handleAddOrUpdateUser}
      status={status}
    />
  );
};

export default AddUser;
