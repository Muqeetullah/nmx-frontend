import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import ListingTable from "../components/Listings";
import { useLazyQuery } from "@apollo/client";
import { GET_USERS } from "../graphQL/Queries";

const UserListing = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("userData");
  const authToken = JSON.parse(token).token;

  const [Users] = useLazyQuery(GET_USERS, {
    fetchPolicy: "no-cache",
    context: {
      clientName: "backend",
      headers: {
        Authorization: `Bearer ${authToken}`, // Pass the token here
      },
    },
    onCompleted(data) {
      console.log(data.users);
    },
    onError(error) {
      console.log("Something went wrong", error);
    },
  });

  useEffect(() => {
    Users();
  }, []);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Education", accessor: "education" },
    { header: "Age", accessor: "age" },
    { header: "Gender", accessor: "gender" },
    { header: "Role", accessor: "role" },
  ];

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  const handleEditUser = (user) => {
    navigate(`/admin/add-user`, {
      state: { user: user, status: "Edit" },
    });
  };

  return "aa";
  // <ListingTable
  //   title="User Listing"
  //   // data={users}
  //   columns={columns}
  //   onAdd={handleAddUser}
  //   onEdit={handleEditUser}
  // />
};

export default UserListing;
