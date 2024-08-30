// src/Pages/dashboard.jsx
import React from "react";
import AdminDashboard from "../components/admin"; // Import AdminDashboard from the components folder
import UserProfile from "../components/user"; // Import UserProfile from the components folder

const Dashboard = () => {
  return (
    <div>
      <AdminDashboard />
      <UserProfile /> {/* Add UserProfile component */}
      {/* Add other components or layout elements as needed */}
    </div>
  );
};

export default Dashboard;
