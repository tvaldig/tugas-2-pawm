/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

interface ProfileCardProps {
  username: string;
  email: string;
  school: string;
  progress: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ username, email, school}) => {
  return (
    <div className="border border-black lg:h-[400px] lg:w-[600px] w-[300px] h-[400px] rounded-lg shadow-lg p-5 text-center font-sans bg-white flex flex-col border-2 justify-center">
      <img src="profile-icon.png" alt="Profile Icon" className="h-20 w-20 rounded-full border-2 border-blue invert mx-auto" />
      <div className="flex flex-col space-y-4 lg:my-0 my-8">
        <div className="text-left">
          <label className="text-gray-800 font-spbutchlite font-bold lg:text-3xl text-xl">Username:</label>
          <p className="text-gray-600 font-spbutchlite font-bold lg:text-[25px] text-[15px]">{username}</p>
        </div>
        <div className="text-left">
          <label className="text-gray-800 font-spbutchlite font-bold lg:text-3xl text-xl">Email:</label>
          <p className="text-gray-600 font-spbutchlite font-bold lg:text-[25px] text-[15px]">{email}</p>
        </div>
        <div className="text-left">
          <label className="text-gray-800 font-spbutchlite font-bold lg:text-3xl text-xl">School/University:</label>
          <p className="text-gray-600 font-spbutchlite font-bold lg:text-[25px] text-[15px]">{school}</p>
        </div>
        
   
        
      </div>
    </div>
  );
};

export default ProfileCard;
