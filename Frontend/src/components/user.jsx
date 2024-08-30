import React, { useState } from 'react';

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('cross joseph');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/160');

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    // Handle the form submission logic here
    setIsModalOpen(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
      {/* Profile Section */}
      <div className={`bg-white text-black p-16 rounded-3xl shadow-lg flex flex-col items-center ${isModalOpen ? 'blur-sm' : ''}`}>
        {/* Profile Picture */}
        <div className="relative">
          <div className="bg-gray-200 rounded-full h-40 w-40 flex items-center justify-center text-black text-6xl border-4 border-purple-500">
            <span className="text-6xl">{username.charAt(0).toUpperCase()}</span>
          </div>
          <img
            src={profilePicture}
            alt="Profile"
            className="absolute top-0 left-0 rounded-full h-40 w-40 object-cover border-4 border-purple-500"
          />
        </div>

        {/* User Info */}
        <h2 className="mt-6 text-5xl font-extrabold">{username}</h2>
        <span className="text-2xl font-semibold mt-2">1 following</span>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-6">
          <button
            className="bg-purple-600 hover:bg-purple-800 text-white text-lg font-semibold py-3 px-8 rounded-full transition duration-200"
            onClick={handleEditProfileClick}
          >
            + Edit Profile
          </button>
        </div>

        {/* Created and Saved */}
        <div className="mt-12 flex justify-around w-full max-w-xl">
          <div className="text-2xl font-bold cursor-pointer hover:text-purple-600 transition duration-200">Created</div>
          <div className="text-2xl font-bold cursor-pointer hover:text-purple-600 transition duration-200">Saved</div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-10 relative animate-fadeIn text-gray-700 z-10">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold mb-8 text-center text-purple-600">Edit Profile</h3>
            <form className="space-y-6">
              {/* Profile Picture */}
              <div className="text-center">
                <label className="block text-base font-semibold mb-3">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="block w-full text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-purple-500"
                />
                <div className="mt-4 flex justify-center">
                  <img
                    src={profilePicture}
                    alt="Preview"
                    className="h-32 w-32 rounded-full object-cover border-2 border-purple-500"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-base font-semibold mb-3">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-base font-semibold mb-3">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="New password"
                />
              </div>
            </form>

            {/* Modal Buttons */}
            <div className="mt-8 flex justify-end space-x-6">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
