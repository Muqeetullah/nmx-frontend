import React from "react";

const BookList = ({ books }) => {
  const handleIssueBook = (bookId) => {
    // Handle book issuing logic here
    console.log(`Issuing book with ID: ${bookId}`);
  };

  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li
          key={book.id}
          className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
        >
          <span>
            {book.title} - {book.issued ? "Issued" : "Available"}
          </span>
          {!book.issued && (
            <button
              onClick={() => handleIssueBook(book.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Issue Book
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
