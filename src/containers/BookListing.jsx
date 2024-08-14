import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useBook } from "../context/BookContext";
import ListingTable from "../components/Listings";
import { GET_BOOKS } from "../graphQL/Queries";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { DELETE_BOOK } from "../graphQL/Mutations";
import { SUBSCRIBE_BOOK } from "../graphQL/Subscription";

const BookLisitng = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("userData");

  const authToken = JSON.parse(token).token;
  const role = JSON.parse(token).role;
  const [checkDelete, setCheckDelete] = useState(false);

  const [Query, { loading, error }] = useLazyQuery(GET_BOOKS, {
    fetchPolicy: "no-cache",
    context: {
      clientName: "backend",
      headers: {
        Authorization: `Bearer ${authToken}`, // Pass the token here
      },
    },
    onCompleted(data) {
      setBooks(data.books);
    },
    onError(error) {
      console.log("Something went wrong", error);
    },
  });

  const [
    DeleteBook,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_BOOK, {
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    onCompleted(data) {
      const { book } = data;
      setCheckDelete(!checkDelete);

      // showToast("Book Deleted", { type: "success" });
    },

    onError(error) {
      // toast.error("Something Went Wrong!", error);
      // showToast(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    Query();
  }, [Query, checkDelete]);

  const columns = [
    { header: "Book Title", accessor: "name" },
    { header: "ISBN", accessor: "isbn" },
    { header: "Category", accessor: "category" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Price", accessor: "price" },
  ];

  const handleAddUser = () => {
    navigate("/admin/add-book");
  };

  const handleEditUser = (book) => {
    navigate(`/admin/add-book`, {
      state: { book: book, status: "Edit" },
    });
  };

  const onDelete = (book) => {
    DeleteBook({ variables: { isbn: book.isbn } });
  };
  const { data } = useSubscription(
    SUBSCRIBE_BOOK
    // { variables: { postID } }
  );

  if (loading || deleteLoading) {
    return <div>Loading...</div>;
  }

  if (error || deleteError) {
    return <div>Error: {error?.message || deleteError?.message}</div>;
  }

  return (
    <ListingTable
      role={role}
      title="Book Listing"
      data={books}
      columns={columns}
      onAdd={handleAddUser}
      onEdit={handleEditUser}
      onDelete={onDelete}
      roles={["Health", "Action", "Fighting", "Sports", "Drama"]}
    />
  );
};

export default BookLisitng;
