// AddBook.tsx
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import BookFormUI from "../components/BookFormUI";
import { useBook } from "../context/BookContext";
import { useToast } from "../context/ToastContext";

const AddBook = () => {
  const [newBook, setNewBook] = useState({
    id: undefined,
    name: "",
    author: "",
    genre: "",
    price: 0,
  });
  const [status, setStatus] = useState("");
  const { addBook, updateBook } = useBook();
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const { showToast } = useToast();

  const handleInputChange = (e, fieldName) => {
    const value =
      fieldName === "price" ? parseFloat(e.target.value) : e.target.value;
    setNewBook({ ...newBook, [fieldName]: value });
  };

  const handleAddOrUpdateBook = () => {
    if (status === "Edit") {
      updateBook(newBook);
    } else {
      showToast("Login successful", { type: "success" });
      addBook(newBook);
    }

    navigate("/admin/view-book-list");
    setNewBook({
      name: "",
      author: "",
      genre: "",
      price: 0,
    });
    setErrors([]);
  };

  useEffect(() => {
    if (location.state) {
      setStatus(location.state.status);
      setNewBook(location.state.book);
    }
  }, [location.state]);

  return (
    <BookFormUI
      newBook={newBook}
      handleInputChange={handleInputChange}
      handleAddOrUpdateBook={handleAddOrUpdateBook}
      status={status}
      errors={errors}
    />
  );
};

export default AddBook;
