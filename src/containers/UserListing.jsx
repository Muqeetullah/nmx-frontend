import React from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import ListingTable from "../components/Listings";

const UserListing = () => {
  const navigate = useNavigate();
  const { users } = useUser();

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

  return (
    <ListingTable
      title="User Listing"
      data={users}
      columns={columns}
      onAdd={handleAddUser}
      onEdit={handleEditUser}
    />
  );
};

export default UserListing;
