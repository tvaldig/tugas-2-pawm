/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isLabDropdownOpen, setIsLabDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);  
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
    setIsLabDropdownOpen(false);
  };

  const toggleLabDropdown = () => {
    setIsLabDropdownOpen(!isLabDropdownOpen);
    setIsSubjectDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleRestrictedNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please login first");
    }
  };

  return (
    <header className="text-white shadow-md sticky top-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-600">
      <Toaster toastOptions={{ className: "font-spbutchlite font-bold" }} />
      <nav className="container mx-auto flex items-center justify-between p-4 relative">
        <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-110 group">
          <img src="logo.png" alt="Logo" className="h-16" />
        </Link>

        <button onClick={toggleMenu} className="md:hidden absolute right-4">
          <img src="hamburger.png" alt="Menu" className="h-12 invert" />
        </button>

        <div className="hidden md:flex md:space-x-6 items-center">
          <Link href="/about" className="font-spbutchlite font-bold text-white transition-transform duration-300 hover:scale-105">About</Link>

          <div className="relative">
            <button onClick={toggleSubjectDropdown} className="text-white font-spbutchlite font-bold transition-transform duration-300 hover:scale-105">
              Subject
            </button>
            {isSubjectDropdownOpen && (
              <div className="absolute font-spbutchlite font-bold top-full mt-2 flex flex-col w-40 bg-white shadow-lg rounded transition-all duration-200">
                <Link href="/subject/atoms" onClick={handleRestrictedNavigation} className="block px-4 py-2 text-black hover:bg-gray-200">Atoms & Molecules</Link>
                <Link href="/subject/chemistry" onClick={handleRestrictedNavigation} className="block px-4 py-2 text-black hover:bg-gray-200">Chemistry Reaction</Link>
                <Link href="/subject/stoichiometry" onClick={handleRestrictedNavigation} className="block px-4 py-2 text-black hover:bg-gray-200">Stoichiometry</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={toggleLabDropdown} className="text-white font-spbutchlite font-bold transition-transform duration-300 hover:scale-105">
              Virtual Lab
            </button>
            {isLabDropdownOpen && (
              <div className="absolute font-spbutchlite font-bold top-full mt-2 flex flex-col w-40 bg-white shadow-lg rounded transition-all duration-200">
                <Link href="/lab/experiment1" onClick={handleRestrictedNavigation} className="block px-4 py-2 text-black hover:bg-gray-200">Guess the Element</Link>
                <Link href="/lab/experiment2" onClick={handleRestrictedNavigation} className="block px-4 py-2 text-black hover:bg-gray-200">Balance Equations</Link>
                <Link href="/lab/experiment3" onClick={handleRestrictedNavigation} className="block px-4 py-2 text-black hover:bg-gray-200">Stoichio Equations</Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/profile"><img src="profile-icon.png" alt="Profile Icon" className="h-10 w-10 rounded-full border-2 border-[#87A2FF] mx-auto" /></Link>
                <Link href="/" onClick={handleLogout} className="text-white font-spbutchlite font-bold transition-transform duration-300 px-4 py-2 rounded-lg border border-[#729762] bg-[#87A2FF] hover:bg-white hover:text-biru-tua shadow-md">
                  Log out
                </Link>
              </>
            ) : (
              <Link href="/login" className="text-white font-bold font-spbutchlite transition-transform duration-300 px-4 py-2 rounded-lg border border-[#729762] bg-[#87A2FF] hover:bg-[#FFFFFF] hover:text-biru-tua shadow-md hover:scale-110">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-end transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="bg-white w-64 p-4 shadow-lg">
          <button onClick={toggleMenu} className="text-black mb-4 flex">
            <img src="X.png" alt="Close Menu" className="h-8" />
          </button>
          <div className="flex flex-col pt-8 space-y-4">
            <Link href="/about" className="text-biru-tua font-bold font-spbutchlite transition duration-300 hover:bg-blue-100 px-4 py-2 rounded-lg text-center">About</Link>

            <button onClick={toggleSubjectDropdown} className="text-biru-tua font-bold font-spbutchlite transition duration-300 px-4 py-2 rounded-lg hover:bg-blue-100">
              Subject
            </button>
            {isSubjectDropdownOpen && (
              <div className="flex flex-col pl-4 space-y-2">
                <Link href="/subject/atoms" onClick={handleRestrictedNavigation} className="text-black font-bold font-spbutchlite hover:bg-gray-200 px-4 py-2 rounded-lg">Atoms & Molecules</Link>
                <Link href="/subject/chemistry" onClick={handleRestrictedNavigation} className="text-black font-bold font-spbutchlite hover:bg-gray-200 px-4 py-2 rounded-lg">Chemistry Reaction</Link>
                <Link href="/subject/stoichiometry" onClick={handleRestrictedNavigation} className="text-black font-bold font-spbutchlite hover:bg-gray-200 px-4 py-2 rounded-lg">Stoichiometry</Link>
              </div>
            )}

            <button onClick={toggleLabDropdown} className="text-biru-tua font-bold font-spbutchlite transition duration-300 px-4 py-2 rounded-lg hover:bg-blue-100">
              Virtual Lab
            </button>
            {isLabDropdownOpen && (
              <div className="flex flex-col pl-4 space-y-2">
                <Link href="/lab/experiment1" onClick={handleRestrictedNavigation} className="text-black font-bold font-spbutchlite hover:bg-gray-200 px-4 py-2 rounded-lg">Guess the Element</Link>
                <Link href="/lab/experiment2" onClick={handleRestrictedNavigation} className="text-black font-bold font-spbutchlite hover:bg-gray-200 px-4 py-2 rounded-lg">Balance Equations</Link>
                <Link href="/lab/experiment3" onClick={handleRestrictedNavigation} className="text-black font-bold font-spbutchlite hover:bg-gray-200 px-4 py-2 rounded-lg">Stoichio Equations</Link>
              </div>
            )}

            {isLoggedIn ? (
              <>
                <Link href="/profile"><img src="profile-icon.png" alt="Profile Icon" className="h-12 w-12 rounded-full border-2 border-white invert mx-auto" /></Link>
                <Link href="/" onClick={handleLogout} className="text-white font-bold font-spbutchlite transition duration-300 px-4 py-2 rounded-lg text-center border border-white bg-[#87A2FF] hover:bg-white hover:text-biru-tua shadow-md">
                  Logout
                </Link>
              </>
            ) : (
              <Link href="/login" className="text-white font-bold font-spbutchlite transition duration-300 px-4 py-2 rounded-lg text-center border border-[#87A2FF] bg-[#87A2FF] hover:bg-white hover:text-biru-tua shadow-md hover:scale-110">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
