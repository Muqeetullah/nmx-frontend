import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Overlay = ({ isOpen, onOpen, onClose, children }) => (
  <>
    <button
      onClick={onOpen}
      className="fixed top-4 left-4 z-20 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
    >
      <MenuIcon />
    </button>
    {isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 transition-opacity duration-300 overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <CloseIcon />
          </button>
          <div className="p-6">{children}</div>
        </div>
      </div>
    )}
  </>
);

export default Overlay;
