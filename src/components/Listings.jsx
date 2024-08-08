import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListingTable = ({ title, data, columns, onAdd, onEdit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    columns.some((column) =>
      item[column.accessor]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 sm:pb-10">
        <h1 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">
          {title}
        </h1>
        <div>
          <button
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onAdd}
          >
            Add {title}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${title}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  scope="col"
                  className="px-4 py-3 sm:px-6"
                >
                  {column.header}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 sm:px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-4 py-3 sm:px-6 font-medium text-gray-900"
                    >
                      {item[column.accessor]}
                    </td>
                  ))}
                  <td className="px-4 py-3 sm:px-6 text-right">
                    <button
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-3 sm:px-6 text-center text-gray-500"
                >
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingTable;
