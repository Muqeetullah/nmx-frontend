import React from "react";
import { Link } from "react-router-dom";
import ChartsComponent from "./HighCharts";

function AdminDashboard() {
  return (
    <div className="flex w-full min-h-screen pb-10 mt-10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to the Admin Dashboard. Manage users, books, and view
            profiles.
          </p>
        </div>

        {/* Chart Container with Full Width */}
        <div className="w-full mt-8">
          <ChartsComponent />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900">Manage Users</h2>
            <div className="mt-4 space-y-2">
              <Link to="/admin/add-user" className="btn-blue block">
                Add User
              </Link>
              <Link to="/admin/view-user-list" className="btn-blue block">
                View User List
              </Link>
              <Link to="/admin/view-user-profile" className="btn-blue block">
                View User Profile
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900">Manage Books</h2>
            <div className="mt-4 space-y-2">
              <Link to="/admin/add-book" className="btn-blue block">
                Add Book
              </Link>
              <Link to="/admin/view-book-list" className="btn-blue block">
                View Book List
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900">View Profile</h2>
            <div className="mt-4 space-y-2">
              <Link to="/admin/view-profile" className="btn-blue block">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
