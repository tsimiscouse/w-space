import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa"; 
import Logo from '../assets/LogoWhite.png';
import Cookies from 'js-cookie';
import './Navbar.css'; 

const Navbar = () => {
    const [firstName, setFirstName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
            await axios.post("http://localhost:5000/api/auth/logout", { withCredentials: true });
            Cookies.remove("token");
            window.location.href = "/";
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="bg-black p-4 flex justify-between items-center">
            <img src={Logo} alt="Logo" className="ml-5 h-10" />

            <div className="flex space-x-[50px] text-white">
                <Link to="/app" className="relative hover-underline">Home</Link>
                <Link to="/search" className="relative hover-underline">Find a Space</Link>
                <Link to="/about-us" className="relative hover-underline">About Us</Link>
            </div>

            <div className="relative" ref={dropdownRef}>
                <div className="flex items-center mr-5">
                    <div className="flex items-center mr-5">
                        <FaUserCircle className="text-white h-8 w-8" />
                        <span className="text-white ml-2">{firstName}</span>
                    </div>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-white focus:outline-none ml-2"
                    >
                        <FaBars className="h-6 w-6" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div
                        className={`absolute right-0 top-[55px] w-48 bg-white text-black rounded-md shadow-lg z-10 
                                    transition-all duration-200 ease-in-out transform 
                                    ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                    >
                        <div
                            className="absolute top-[-8px] right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"
                        ></div>
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
