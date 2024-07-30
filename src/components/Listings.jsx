import React from "react";
import { useNavigate } from "react-router-dom";

const ListingTable = ({ title, data, columns, onAdd, onEdit }) => {
  const navigate = useNavigate();

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
            {data.map((item, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingTable;
