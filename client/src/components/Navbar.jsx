import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa"; 
import Logo from '../assets/Logo.jpg';
import Cookies from 'js-cookie';
import './Navbar.css'; 
import api from '../axios';

const Navbar = () => {
    const [firstName, setFirstName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://api.w-space.site/api/auth/profile`, { 
                withCredentials: true 
            }); 
            setFirstName(response.data.user.firstName);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`https://api.w-space.site/api/auth/logout`);
            Cookies.remove("token", { path: "/" });
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="navbar-fixed bg-white p-4 flex justify-between items-center border-b-2 border-gray-300 font-bold">
            <div className="flex items-center space-x-8 ml-[40px] md:ml-[80px] lg:ml-[160px]">
                <img src={Logo} alt="Logo" className="h-10" />
                <div className="hidden lg:flex space-x-[50px] px-[30px]">
                    <Link to="/app" className="relative hover-underline">Home</Link>
                    <Link to="/search" className="relative hover-underline">Find a Space</Link>
                    <Link to="/about-us" className="relative hover-underline">About Us</Link>
                    <Link to="/activity" className="relative hover-underline">Activity</Link>
                </div>
            </div>

            <div className="relative md:mr-[50px] mr-[20px]" ref={dropdownRef}>
                <div className="flex items-center mr-5">
                    {/* Hide profile on small screens, show on md and larger */}
                    <div className="hidden md:flex items-center mr-5">
                        <FaUserCircle className="text-[#191B1D] h-8 w-8" />
                        <span className="text-[#191B1D] ml-2">{firstName}</span>
                    </div>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-[#191B1D] focus:outline-none ml-2"
                    >
                        <FaBars className="h-6 w-6" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div
                        className={`absolute right-0 top-[55px] w-48 bg-[#191B1D] text-white rounded-md shadow-lg z-10 
                                    transition-all duration-200 ease-in-out transform 
                                    ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                    >
                        <div
                            className="absolute top-[-8px] right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-[#191B1D]"
                        ></div>
                        {/* Add mobile-only user profile to dropdown */}
                        <div className="block md:hidden ml-8 my-7 text-left">
                            <div className="flex items-center mb-4">
                                <FaUserCircle className="text-white h-8 w-8 mr-2" />
                                <span>{firstName}</span>
                            </div>
                        </div>
                        <Link
                            to="/app"
                            className="block ml-8 my-7 text-left hover:text-gray-500 lg:hidden"
                        >
                            Home
                        </Link>
                        <Link
                            to="/search"
                            className="block ml-8 my-7 text-left hover:text-gray-500 lg:hidden"
                        >
                            Find a Space
                        </Link>
                        <Link
                            to="/about-us"
                            className="block ml-8 my-7 text-left hover:text-gray-500 lg:hidden"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/contact-us"
                            className="block ml-8 my-7 text-left hover:text-gray-500"
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/our-team"
                            className="block ml-8 my-7 text-left hover:text-gray-500"
                        >
                            Our Team
                        </Link>
                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="block w-full ml-8 text-left my-7 hover:text-gray-500"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative animate-fadeInScale">
                        <h2 className="text-xl font-bold mb-6 text-center text-[#191B1D]">
                            Are you sure you want to log out?
                        </h2>
                        <div className="flex justify-center items-center space-x-6 mt-4">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="px-6 py-2 bg-gray-200 rounded-md font-medium text-gray-600 hover:bg-gray-300 transition duration-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md font-bold text-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                            >
                                Yes, Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
