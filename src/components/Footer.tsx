/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const Footer: React.FC = () => {
    return (
        <footer
            className="text-stone-50 w-full py-8 px-4 md:px-12 lg:px-24 bg-gradient-to-t from-red-300 to-red-200"
        >
            <div className="flex flex-col md:flex-row justify-between items-center md:space-y-0 gap-4">
                 

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-stone-50 text-lg"  style={{ fontFamily: 'SuperFunky', fontWeight: 'bold' }}>© Chemic.ly 2024</p>
                </div>

                {/* Contact Button */}
                <div className="flex flex-col items-center md:items-end md:gap-2 space-y-4">
                    <a
                        href="mailto:support@timotiusvivaldi.com"
                        className="px-6 py-2 font-bold  text-red-400 border border-red-100 bg-red-100 hover:bg-white hover:borderwhite hover:text-red-400 rounded-lg  transition-transform duration-300 hover:scale-105 transition duration-300 shadow-md"
                        style={{ fontFamily: 'SpButchLite', fontWeight: 'bold' }}
                    >
                        Send Feedback
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;