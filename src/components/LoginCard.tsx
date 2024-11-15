"use client";

import React, { useState } from "react";
import Link from "next/link";
interface LoginCardProps {
  onLogin: (email: string, password: string) => void;

}
export const LoginCard: React.FC<LoginCardProps> = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="border border-black lg:h-[350px] lg:w-[600px] h-[400px] rounded-lg shadow-lg p-5 text-center font-sans bg-white flex flex-col border-2 justify-center">
  
      <h2 className="text-3xl font-spbutchlite font-bold text-gray-800 mb-4 text-left">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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
          Login
        </button>
      </form>
      <p className="text-left text-gray-600 mt-4 font-spbutchlite font-bold">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginCard;
