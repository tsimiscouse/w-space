import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa"; 
import Logo from '../assets/Logo.jpg';
import Cookies from 'js-cookie';
import './Navbar.css'; 

const Navbar = () => {
    const [firstName, setFirstName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/profile", { withCredentials: true }); 
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
            // Call logout API to clear the token server-side
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    
            // Clear the cookie from the client-side
            Cookies.remove("token", { path: "/" });  
    
            // Clear any other token storage 
            localStorage.removeItem("token");
    
            // Redirect to the login page
            navigate("/");                    
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="navbar-fixed bg-white p-4 flex justify-between items-center border-b-2 border-gray-300 font-bold">
            <div className="flex items-center space-x-8 ml-[160px]">
                <img src={Logo} alt="Logo" className="h-10" />
                <div className="flex space-x-[50px] px-[30px]">
                    <Link to="/app" className="relative hover-underline">Home</Link>
                    <Link to="/search" className="relative hover-underline">Find a Space</Link>
                    <Link to="/about-us" className="relative hover-underline">About Us</Link>
                </div>
            </div>

            <div className="relative mr-[50px]" ref={dropdownRef}>
                <div className="flex items-center mr-5">
                    <div className="flex items-center mr-5">
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
                        <Link
                            to="/contact-us"
                            className="block ml-8 my-7 text-left hover:text-gray-500"
                        >
                            Contact Us
                        </Link>
                        <Link
                            to="/setting"
                            className="block ml-8 my-7 text-left hover:text-gray-500"
                        >
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full ml-8 text-left my-7 hover:text-gray-500"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
