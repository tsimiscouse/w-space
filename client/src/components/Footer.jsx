import React from "react";
import Logo from '../assets/LogoWhite.png';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#191B1D] text-white py-8 px-4">
            <div className="container max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo and Contact Section */}
                <div className="flex w-full items-start text-lg gap-5">
                    <img src={Logo} alt="Logo" className="h-[100px] mt-5 mb-4" />
                    <span className="ml-5 w-[3px] h-full bg-white" />
                    <div className="flex flex-col text-md items-start gap-2">
                        <a href="/search" className="hover:text-gray-300">Find a Space</a>
                        <a href="/about-us" className="mb-9 hover:text-gray-300">About Us</a>
                        <p className="">© {new Date().getFullYear()} W. Space. All rights reserved.</p>
                    </div>
                </div>
                
                {/* Contact Section */}
                <div className="flex flex-col items-end">
                    {/* Social Media Icons */}
                    <div className="flex space-x-4 mb-4 text-4xl">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaInstagram />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaFacebook />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaLinkedin />
                        </a>
                    </div>
                    <div className="text-md">
                        <div className="flex items-center mb-2">
                            <FaMapMarkerAlt className="mr-2" />
                            <span>123 Main St, Your City</span>
                        </div>
                        <div className="mt-2 flex items-center mb-2">
                            <FaEnvelope className="mr-2" />
                            <span>contact@example.com</span>
                        </div>
                        <div className="mt-2 flex items-center mb-2">
                            <FaPhone className="mr-2" />
                            <span>+123 456 7890</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
