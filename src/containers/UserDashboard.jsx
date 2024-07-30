import React from "react";
import { useBook } from "../context/BookContext";

const UserDashboard = () => {
  const { books, issueBook } = useBook();

  const handleIssueBook = (bookId) => {
    const user = { name: "John Doe", email: "johndoe@me.com" }; // Assuming the user is John Doe for this example
    issueBook(bookId, user);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 sm:pb-10">
        <h1 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">
          Books List
        </h1>
      </div>
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Book Title
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Author
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-3 sm:px-6 font-medium text-gray-900">
                  {book.name}
                </td>
                <td className="px-4 py-3 sm:px-6">{book.author}</td>
                <td className="px-4 py-3 sm:px-6 text-right">
                  {!book.issued ? (
                    <button
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => handleIssueBook(book.id)}
                    >
                      Issue Book
                    </button>
                  ) : (
                    <span className="text-gray-500">Issued</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
