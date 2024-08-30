import React, { useState, useEffect } from "react";

const Admin = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      // Replace with actual API call
      const data = [
        { id: 1, user: "John Doe", action: "Created a new post", time: "2 mins ago" },
        { id: 2, user: "Jane Smith", action: "Updated profile picture", time: "10 mins ago" },
        { id: 3, user: "Alice Johnson", action: "Commented on a post", time: "30 mins ago" },
        // Add more activity logs
      ];
      setActivities(data);
    };

    fetchData();
  }, []);

  const filteredActivities = activities
    .filter((activity) =>
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  return (
    <div className="admin-activity p-6 bg-gray-100 min-h-screen">
      <div className="header mb-8">
        <h2 className="text-3xl font-bold text-teal-700">Admin Activity Logs</h2>
        <p className="text-gray-600">Monitor the latest activities in the application.</p>
      </div>

      <div className="controls mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by user or action..."
          className="border border-gray-300 rounded py-2 px-4 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Time: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="activity-feed">
        {filteredActivities.length === 0 ? (
          <p className="text-gray-600">No activities found.</p>
        ) : (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="activity-item relative mb-8 pl-10">
              <div className="absolute left-0 top-2 w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
                {activity.user[0]}
              </div>
              <div className="activity-details bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-800">
                  <span className="font-bold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-gray-500 text-sm">{activity.time}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        Load More
      </button>
    </div>
  );
};

export default Admin;