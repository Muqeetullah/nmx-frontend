import React from "react";

const SearchBar = ({ title, searchQuery, onSearchChange }) => (
  <div className="mb-6">
    <input
      type="text"
      placeholder={`Search ${title}`}
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

export default SearchBar;
