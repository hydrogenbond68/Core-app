// src/components/UserProfile.jsx
import React from 'react';

const UserProfile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Profile Picture */}
      <div className="relative">
        <div className="bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center text-black text-3xl border border-black">
          <span>C</span>
        </div>
        <img
          src="your-image-url.jpg"
          alt="Profile"
          className="absolute top-0 left-0 rounded-full h-6 w-6 object-cover"
        />
      </div>

      {/* User Info */}
      <h2 className="mt-4 text-2xl font-bold">cross joseph</h2>
      <span className="text-xl font-semibold">1 following</span>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-4">
        <button className="bg-gray-200 text-black text-sm font-semibold py-2 px-4 rounded-full border border-gray-300">
          + share
        </button>
        <button className="bg-gray-200 text-black text-sm font-semibold py-2 px-4 rounded-full border border-gray-300">
          + edit profile
        </button>
      </div>

      {/* Created and Saved */}
      <div className="mt-6 flex justify-around w-full max-w-xs">
        <div className="text-xl font-bold">created</div>
        <div className="text-xl font-bold">saved</div>
      </div>
    </div>
  );
};

export default UserProfile;
