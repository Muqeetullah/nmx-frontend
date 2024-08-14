import { EditNotifications } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Delete from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const useOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

const ListingTable = ({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  roles,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const navigate = useNavigate();
  const overlay = useOverlay();

  const theme = useTheme();
  const isMdOrLarger = useMediaQuery(theme.breakpoints.up("lg"));

  const filteredData = data.filter(
    (item) =>
      columns.some((column) =>
        item[column.accessor]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) &&
      (selectedRole === "All" || item.category === selectedRole)
  );

  const handleRowClick = (item) => {
    if (!isMdOrLarger) {
      onEdit(item);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (!isMdOrLarger) {
      overlay.close();
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row w-full bg-gray-50 min-h-screen overflow-hidden">
      {/* Role panel for larger screens */}
      {isMdOrLarger && (
        <div className="w-64 bg-white shadow-lg p-6 border-r border-gray-200 overflow-y-auto">
          <RolePanel
            roles={roles}
            selectedRole={selectedRole}
            onSelectRole={handleRoleSelect}
          />
        </div>
      )}

      {/* Overlay for smaller screens */}
      {!isMdOrLarger && (
        <>
          <button
            onClick={overlay.open}
            className="fixed top-4 left-4 z-20 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <MenuIcon />
          </button>
          {overlay.isOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 transition-opacity duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto">
                <button
                  onClick={overlay.close}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                  <CloseIcon />
                </button>
                <div className="p-6">
                  <RolePanel
                    roles={roles}
                    selectedRole={selectedRole}
                    onSelectRole={handleRoleSelect}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Main content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              {title}
            </h1>
            <button
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
              onClick={onAdd}
            >
              Add {title}
            </button>
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder={`Search ${title}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="bg-white overflow-x-auto shadow-xl sm:rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.accessor}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.header}
                    </th>
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => handleRowClick(item)}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.accessor}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {item[column.accessor]}
                        </td>
                      ))}
                      <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4 "
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                          }}
                        >
                          {isMdOrLarger ? "Edit" : null}
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item);
                          }}
                        >
                          {isMdOrLarger ? (
                            "Delete"
                          ) : (
                            <Delete className="text-blue-600 hover:text-blue-800" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const RolePanel = ({ roles, selectedRole, onSelectRole }) => (
  <>
    <h2 className="text-xl font-semibold mb-6 text-gray-800">Roles</h2>
    <ul className="space-y-2">
      <li
        className={`cursor-pointer py-2 px-4 rounded-md transition-colors duration-150 ${
          selectedRole === "All"
            ? "bg-blue-100 text-blue-800 font-medium"
            : "hover:bg-gray-100"
        }`}
        onClick={() => onSelectRole("All")}
      >
        All
      </li>
      {roles?.map((role) => (
        <li
          key={role}
          className={`cursor-pointer py-2 px-4 rounded-md transition-colors duration-150 ${
            selectedRole === role
              ? "bg-blue-100 text-blue-800 font-medium"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onSelectRole(role)}
        >
          {role}
        </li>
      ))}
    </ul>
  </>
);

export default ListingTable;
