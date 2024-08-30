// src/pages/dashboard/admin.jsx

import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white h-screen p-4 flex flex-col items-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
            <span className="text-2xl">👤</span>
          </div>
          <h2 className="text-lg font-bold">moderator</h2>
          <p className="text-sm">core admin</p>
          <p className="text-sm mb-2">7 following</p>
          <div className="flex space-x-2">
            <button className="bg-gray-800 px-4 py-2 rounded-md">share</button>
            <button className="bg-gray-800 px-4 py-2 rounded-md">Edit profile</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Flagged Content by Other Users */}
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="font-semibold text-lg mb-2">flagged content by other users</h3>
            {/* Content goes here */}
          </div>

          {/* Flagged Content by Me */}
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="font-semibold text-lg mb-2">flagged content by me</h3>
            {/* Content goes here */}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <div className="w-40 h-40 border-2 border-dashed flex items-center justify-center text-gray-600">
            saved
          </div>
          <div className="w-40 h-40 border-2 border-dashed flex items-center justify-center text-gray-600">
            created
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
