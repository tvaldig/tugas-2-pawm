"use client";

import React, { useState } from "react";
import Link from "next/link";
interface RegisterCardProps {
  onRegister: (username: string, email: string, school: string, password: string) => void;
}
export const RegisterCard: React.FC<RegisterCardProps> = ({onRegister}) => {
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, school, password);
  };

  return (
    <div className="border border-black lg:h-[500px] lg:w-[600px] h-[500px] rounded-lg shadow-lg p-5 text-center font-sans bg-white flex flex-col border-2 justify-center">
      <h2 className="text-3xl font-spbutchlite font-bold text-gray-800 mb-4 text-left">Sign up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        
        {/* Username Field */}
        <div className="text-left">
          <label htmlFor="username" className="text-gray-800 font-spbutchlite font-bold mb-2">Username</label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
         {/* Email Field */}
         <div className="text-left">
          <label htmlFor="email" className="text-gray-800 font-spbutchlite font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* University/School Field */}
        <div className="text-left">
          <label htmlFor="university" className="text-gray-800 font-spbutchlite font-bold mb-2">University/School</label>
          <input
            type="text"
            id="university"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your university/school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />
        </div>

       

        {/* Password Field */}
        <div className="text-left">
          <label htmlFor="password" className="text-gray-800 font-spbutchlite font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white font-bold font-spbutchlite transition-transform duration-300 hover:scale-100 px-4 py-2 rounded-lg border border-[#729762] bg-[#000000] hover:bg-[#FFFFFF] hover:text-black shadow-md"
        >
          Sign up
        </button>
      </form>
      <p className="text-left text-gray-600 mt-4 font-spbutchlite font-bold">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterCard;

