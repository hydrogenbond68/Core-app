import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/Navbar';
import UserProfile from '../components/user';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cores, setCores] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Optionally, fetch user data
      // setUser(fetchedUserData);
    } else {
      setIsLoggedIn(false);
      setUser({});
      navigate('/login');
    }

    const storedCores = localStorage.getItem('cores');
    if (storedCores) {
      setCores(JSON.parse(storedCores));
    }

    if (location.state && location.state.core) {
      const newCore = location.state.core;
      setCores(prevCores => {
        const updatedCores = [...prevCores, newCore];
        localStorage.setItem('cores', JSON.stringify(updatedCores));
        return updatedCores;
      });
    }
  }, [navigate, location.state]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddCore = (newCore) => {
    setCores(prevCores => {
      const updatedCores = [...prevCores, newCore];
      localStorage.setItem('cores', JSON.stringify(updatedCores));
      return updatedCores;
    });
  };

  const handleDeleteCore = (index) => {
    setCores(prevCores => {
      const updatedCores = prevCores.filter((_, i) => i !== index);
      localStorage.setItem('cores', JSON.stringify(updatedCores));
      return updatedCores;
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <NavbarComponent isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />

      {/* User Profile Section */}
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <div className="flex items-center justify-between">
            {/* Left side: Profile initials and name */}
            <div className="flex items-center space-x-4">
              {/* Profile initials */}
              <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center rounded-full text-2xl font-bold">
                JT
              </div>
              {/* User info */}
              <div>
                <h1 className="text-xl font-semibold">Dr.Bond</h1>
                <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full">Admin</span>
              </div>
            </div>

            {/* Right side: User information */}
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Email Address:</strong> bhydrogen11@hotmail.com</p>
              <p className="text-gray-700"><strong>Phone Number:</strong> +254115843340</p>
            </div>

            {/* Refresh Button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Cores Section */}
      <div className="container mx-auto mt-8 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Cores</h2>
          {cores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cores.map((core, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <img
                    src={core.image}
                    alt="Core"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{core.title}</h3>
                  <p className="text-gray-600 text-sm truncate">{core.description}</p>
                  <a href={core.link} className="text-blue-500 text-sm hover:underline">{core.link}</a>
                  <p className="text-gray-500 text-xs mt-2 truncate">Hashtag: {core.hashtag}</p>
                  <button
                    onClick={() => handleDeleteCore(index)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete Core
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No cores created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
