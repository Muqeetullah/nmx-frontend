import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// Define Book interface with id property

// Initial list of books with ids

// Create context with initial values
const BookContext = createContext({
  books: [],
  addBook: () => {},
  updateBook: () => {},
  issueBook: () => {},
});

// Custom hook to use Book context
export const useBook = () => useContext(BookContext);

// Book provider component
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // Function to generate a unique id
  const generateId = () => {
    return books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
  };

  // Function to add a new book
  const addNewBook = (newBook) => {
    const id = generateId(); // Generate a new id
    const bookWithId = { ...newBook, id };
    setBooks([...books, bookWithId]);
  };

  // Function to update an existing book based on id
  const updateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
  };
  const issueBook = (bookId, user) => {
    setBooks((prevBooks) => {
      const book = prevBooks.find((book) => book.id === bookId);
      if (book) {
        toast.success(`Book titled "${book.name}" issued to ${user.name}`);
        return prevBooks.map((book) =>
          book.id === bookId ? { ...book, issued: true } : book
        );
      }
      return prevBooks;
    });
  };

  return (
    <BookContext.Provider
      value={{ books, addBook: addNewBook, updateBook, issueBook }}
    >
      {children}
    </BookContext.Provider>
  );
};
