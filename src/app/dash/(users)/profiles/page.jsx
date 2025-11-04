'use client';
import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-100 w-full max-w-3xl mx-auto px-4 py-6 rounded-lg shadow-sm flex flex-col gap-6 sm:gap-8 transition-all duration-300">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-pink-400 text-white text-xl sm:text-2xl font-bold rounded-full uppercase">
          {user?.userName?.slice(0, 1) || user?.user?.userName?.slice(0, 1) || "U"}
        </div>

        {/* Username */}
        <div>
          <p className="text-black capitalize text-lg sm:text-xl font-semibold">
            {user?.userName || user?.user?.userName || "User"}
          </p>
          <p className="text-gray-600 text-sm sm:text-base">Your personal reading dashboard</p>
        </div>
      </div>

      {/* Reading List Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-black text-xl sm:text-2xl font-bold border-b border-gray-300 pb-1">
          Reading List
        </h2>

        <p className="text-gray-600 text-sm sm:text-base italic">
          No stories added yet. Start exploring and save your favorites here!
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
